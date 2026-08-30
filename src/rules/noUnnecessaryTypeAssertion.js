/* eslint-disable no-bitwise -- Convenient */
/* eslint-disable jsdoc/reject-any-type -- TypeScript types need not be installed */
import iterateJsdoc from '../iterateJsdoc.js';
import {
  createRequire,
} from 'module';

let warned = false;

/** @type {any} */
let ts;

// 1. Create a require function bound to the current file's URL
const require = createRequire(import.meta.url);

try {
  // 2. Attempt to import the package synchronously
  ts = require('typescript');
/* c8 ignore next 10 -- Guard */
} catch (error) {
  // 3. Fall back gracefully if it is not installed
  if (/** @type {{code?: string}} */ (error).code !== 'MODULE_NOT_FOUND') {
    // Re-throw if it's a different error (e.g., syntax error inside the package)
    throw error;
  }

  // eslint-disable-next-line no-console -- Warning user
  console.warn('⚠️ typescript is not installed. `jsdoc/no-unnecessary-type-assertion` will not work. To disable this warning, you must disable the rule.');
}

// Helper to check for standard literals and boolean/enum/template literals
/**
 * @param {any} type The type is `ts.Type`
 * @returns {boolean}
 */
const isLiteralType = (type) => {
  // Standard primitive literals (string, number, bigint, boolean literal flags)
  if (type.isLiteral()) {
    return true;
  }

  // Check using TypeFlags for specific edge cases like boolean or template literals

  if (type.flags & (ts.TypeFlags.BooleanLiteral | ts.TypeFlags.TemplateLiteral)) {
    return true;
  }

  // If dealing with a union (e.g. 'a' | 'b'), you can check if all constituents are literals
  if (type.isUnion()) {
    return type.types.every(
      /**
       * @param {any} typ
       */
      (typ) => {
        return isLiteralType(typ);
      },
    );
  }

  return false;
};

export default iterateJsdoc(({
  context,
  jsdoc,
  jsdocNode,
  node: nde,
  report,
  sourceCode,
  utils,
// eslint-disable-next-line complexity -- Numerous type/option permutations
}) => {
  /* c8 ignore next 4 -- Guard */
  // Already handled
  if (!ts) {
    return;
  }

  const types = utils.getTags('type');

  // 1. Only proceed if there is a @type tag
  if (!types.length) {
    return;
  }

  const {
    // https://typescript-eslint.io/rules/no-unnecessary-type-assertion/
    checkLiteralConstAssertions = false,
    enableFixer = true,
    treatAnyAsRedundant = false,
    typesToIgnore = [],
  } = context.options[0] ?? {};

  /**
   * Removes the redundant `@type` tag, deleting the whole JSDoc block if it
   * is left empty.
   * @returns {void}
   */
  const removeType = () => {
    utils.removeTag(jsdoc.tags.indexOf(/** @type {any} */ (types[0])), {
      removeEmptyBlock: true,
    });

    // `removeTag` only drops the enclosing block for a single-line comment; for
    // a multi-line block whose sole content was the `@type` tag, clear what is
    // left (only the delimiter lines) so the now-empty comment is removed too.
    const blockIsEmpty = jsdoc.source.every(({
      tokens: {
        description,
        name,
        tag,
        type,
      },
    }) => {
      return !tag && !type && !name && !description.trim();
    });
    if (blockIsEmpty) {
      jsdoc.source.splice(0);
    }
  };

  const fixer = enableFixer ? removeType : null;

  const node =
    /**
     * @type {import('@typescript-eslint/utils').TSESTree.Node}
     */ (nde);

  // 2. Safely get TypeScript parser services and TypeChecker
  const services =
    /**
     * @type {import('@typescript-eslint/utils').ParserServices}
     */ (context.sourceCode.parserServices);

  /* c8 ignore next 10 -- Guard */
  if (!services || !services.program) {
    if (!warned) {
      // Cannot proceed without type-aware linting enabled
      // eslint-disable-next-line no-console -- Feedback
      console.warn('⚠️ You must point ESLint to the `typescript-eslint` parser using `languageOptions`. See the documentation for `jsdoc/no-unnecessary-type-assertion`.');
      warned = true;
    }

    return;
  }

  // 1. Grab the parser services and the active TypeChecker
  // const services = ESLintUtils.getParserServices(context);
  const checker = services.program.getTypeChecker();

  const assertedTypeStr = types[0].type;

  const message = assertedTypeStr === 'const' ?
    'The @type tag declaring "{{ type }}" is redundant as TypeScript infers it automatically for literals.' :
    'The @type tag declaring "{{ type }}" is redundant as TypeScript infers it automatically.';

  /**
   * Whether `inferredType` is a generic reference carrying `any` type arguments
   * that `assertedType` replaces with concrete ones (e.g. an untyped
   * `document.querySelectorAll(sel)` giving `NodeListOf<any>`, asserted as
   * `NodeListOf<HTMLElement>`, or `new Map()` giving `Map<any, any>`). Such an
   * assertion supplies real type information, so it is not redundant even though
   * `any` leaves the two types mutually assignable.
   * @param {any} inferredType `ts.Type`
   * @param {any} assertedType `ts.Type`
   * @returns {boolean}
   */
  const tightensAnyTypeArgument = (inferredType, assertedType) => {
    // Only ever called for an object type, which always carries `objectFlags`.
    if ((inferredType.objectFlags & ts.ObjectFlags.Reference) === 0) {
      return false;
    }

    const assertedTypeArguments = checker.getTypeArguments(assertedType);

    return checker.getTypeArguments(inferredType).some((inferredTypeArgument, index) => {
      return (inferredTypeArgument.flags & ts.TypeFlags.Any) !== 0 &&
        assertedTypeArguments[index] !== undefined &&
        (assertedTypeArguments[index].flags & ts.TypeFlags.Any) === 0;
    });
  };

  /**
   * A generic call/`new` expression takes its type arguments partly from the
   * surrounding contextual type, which under a `@type` (a cast, or a
   * declaration) is the asserted type itself. `getTypeAtLocation` then just
   * echoes the asserted type back, so a genuine tightening looks redundant
   * (`document.querySelectorAll(sel)` is really `NodeListOf<Element>`, not the
   * asserted `NodeListOf<HTMLElement>`). The uncontaminated type cannot be
   * recovered here, so such expressions are left alone.
   * @param {any} tsExpression `ts.Node`
   * @returns {boolean}
   */
  const isGenericCall = (tsExpression) => {
    if (!ts.isCallExpression(tsExpression) && !ts.isNewExpression(tsExpression)) {
      return false;
    }

    const signature = /** @type {any} */ (
      checker.getResolvedSignature(tsExpression)
    );
    return Boolean(
      signature &&
      (signature.typeParameters ?? signature.target?.typeParameters)?.length,
    );
  };

  /**
   * Whether the JSDoc-asserted type adds nothing over the type TypeScript
   * already infers for the expression it is attached to.
   * @param {any} rawInferredType `ts.Type`
   * @param {any} rawAssertedType `ts.Type`
   * @returns {boolean}
   */
  const isRedundantAssertion = (rawInferredType, rawAssertedType) => {
    if (assertedTypeStr === 'const') {
      return checkLiteralConstAssertions && isLiteralType(rawInferredType);
    }

    if (!treatAnyAsRedundant && assertedTypeStr === 'any') {
      return false;
    }

    if (typesToIgnore.includes(assertedTypeStr)) {
      return false;
    }

    const isObjectOrArray = (rawInferredType.flags & ts.TypeFlags.Object) !== 0;

    if (!isObjectOrArray) {
      // Primitives and individual literal values ("text" -> string) use unidirectional verification
      return checker.isTypeAssignableTo(rawInferredType, rawAssertedType);
    }

    if (checker.isArrayType(rawInferredType)) {
      const [
        elementType,
      ] = checker.getTypeArguments(/** @type {import('typescript').TypeReference} */ (
        rawInferredType
      ));
      // A default placeholder such as `[]` -> `never[]` carries no structure to compare
      if (elementType &&
        (elementType.flags & (ts.TypeFlags.Never | ts.TypeFlags.Undefined | ts.TypeFlags.Any)) !== 0
      ) {
        return false;
      }

      // Arrays: standard structural bidirectional assignment matches string[] vs string[]
      return checker.isTypeAssignableTo(rawInferredType, rawAssertedType) &&
        checker.isTypeAssignableTo(rawAssertedType, rawInferredType);
    }

    // An explicit ObjectLiteral mask with zero keys is a default `{}` placeholder
    const {
      objectFlags,
    } = /** @type {import('typescript').ObjectType} */ (rawInferredType);
    if ((objectFlags & ts.ObjectFlags.EmptyObjectLiteral) !== 0 ||
      checker.getPropertiesOfType(rawInferredType).length === 0
    ) {
      return false;
    }

    if (tightensAnyTypeArgument(rawInferredType, rawAssertedType)) {
      return false;
    }

    // Objects: strip the literal-initialization flags, then require structural
    // equivalence in both directions, so `{prop: string}` vs `{prop: string}` is
    // redundant while `{prop?: string}` vs `{prop: string}` fails backward.
    const inferredBaseType = checker.getBaseTypeOfLiteralType(rawInferredType);
    const assertedBaseType = checker.getBaseTypeOfLiteralType(rawAssertedType);

    return checker.isTypeAssignableTo(inferredBaseType, assertedBaseType) &&
      checker.isTypeAssignableTo(assertedBaseType, inferredBaseType);
  };

  // Positions where a bare expression of any precedence is valid and equivalent
  // to the parenthesized form, so a redundant `/** @type {T} */ (expr)` cast can
  // be unwrapped to `expr` without changing meaning.
  const unwrappableParentTypes = new Set([
    'ArrayExpression',
    'AssignmentExpression',
    'ReturnStatement',
    'ThrowStatement',
    'VariableDeclarator',
  ]);

  // 3. `/** @type {T} */ const x = 5;`
  if (node?.type === 'VariableDeclaration') {
    // A leading `@type` tag only influences the first declarator (TypeScript
    // leaves the rest to their own inferred types), so checking `[0]` fully
    // determines whether the tag is redundant even for `const a = 1, b = 2;`.
    const decl = node.declarations[0];

    /* c8 ignore next 4 -- How to cover? */
    if (!decl.init) {
      // No initializer, type is likely `any`, so @type isn't redundant
      return;
    }

    // Resolve the `@type` tag through the real TypeNode that TypeScript already
    // parsed and bound as part of the program. Re-parsing the type string into
    // a detached virtual source file (as an earlier approach did) leaves object
    // type literals unbound, so `{prop: string}` collapses to `{}`.
    const jsdocTypeNode = ts.getJSDocType(
      services.esTreeNodeToTSNodeMap.get(decl),
    );

    /* c8 ignore next 3 -- Every `@type` tag reaching here has a bound TypeNode */
    if (!jsdocTypeNode) {
      return;
    }

    const declInitTsNode = services.esTreeNodeToTSNodeMap.get(decl.init);
    if (isGenericCall(declInitTsNode)) {
      return;
    }

    const declInferredType = checker.getTypeAtLocation(declInitTsNode);
    const declAssertedType = checker.getTypeFromTypeNode(jsdocTypeNode);

    if (isRedundantAssertion(declInferredType, declAssertedType)) {
      utils.reportJSDoc(message, types[0], fixer, true, {
        type: assertedTypeStr,
      });
    }

    return;
  }

  // 4. Inline cast: `/** @type {T} */ (expr)` (TypeScript's JSDoc assertion).
  const exprTsNode = services.esTreeNodeToTSNodeMap.get(node);
  const paren = exprTsNode?.parent;
  if (!paren || !ts.isParenthesizedExpression(paren)) {
    return;
  }

  const typeTag = ts.getJSDocTypeTag(paren);

  /* c8 ignore next 4 -- Defensive: `getJSDocTypeTag` can also surface a `@type`
     inherited from an enclosing statement, whose position precedes the paren */
  if (!typeTag || typeTag.pos < paren.pos) {
    return;
  }

  if (isGenericCall(exprTsNode)) {
    return;
  }

  // The `unknown` half of a "cast through `unknown`"
  // (`/** @type {T} */ (/** @type {unknown} */ (x))`) is the load-bearing
  // bridge that lets the outer assertion reach an otherwise-incompatible type;
  // it is never redundant, even though `unknown` is broader than everything.
  if (assertedTypeStr === 'unknown' && ts.isParenthesizedExpression(paren.parent)) {
    const outerTypeTag = ts.getJSDocTypeTag(paren.parent);
    if (outerTypeTag && outerTypeTag.pos >= paren.parent.pos) {
      return;
    }
  }

  const parent = /** @type {any} */ (node.parent);
  const declaration = parent.type === 'VariableDeclarator' ? parent.parent : null;

  // A `/** @type {const} */` cast only fails to do real work on a `const`
  // declarator, which already infers the literal type. Anywhere else (`let`, a
  // return, an object-property value, some generic call arguments, …) it
  // suppresses widening, so it is not redundant.
  if (assertedTypeStr === 'const' && declaration?.kind !== 'const') {
    return;
  }

  // For a mutable binding (`let`/`var`) TypeScript widens the initializer, so a
  // narrowing cast such as `/** @type {5} */` is doing real work; widen the
  // uncast type to match before judging redundancy.
  const mutableBinding = Boolean(declaration) && declaration.kind !== 'const';
  const castInferredType = mutableBinding ?
    checker.getBaseTypeOfLiteralType(checker.getTypeAtLocation(exprTsNode)) :
    checker.getTypeAtLocation(exprTsNode);
  const castAssertedType = checker.getTypeFromTypeNode(typeTag.typeExpression.type);

  if (!isRedundantAssertion(castInferredType, castAssertedType)) {
    return;
  }

  const canUnwrap = enableFixer && (
    unwrappableParentTypes.has(parent.type) ||
    (parent.type === 'ConditionalExpression' && parent.test !== node) ||
    ((parent.type === 'CallExpression' || parent.type === 'NewExpression') &&
      parent.callee !== node)
  );

  report(
    message,
    canUnwrap ?
      /**
       * @param {import('eslint').Rule.RuleFixer} ruleFixer
       * @returns {import('eslint').Rule.Fix}
       */
      (ruleFixer) => {
        const closeParen = /** @type {import('eslint').AST.Token} */ (
          sourceCode.getTokenAfter(/** @type {any} */ (node), {
            filter: ({
              type,
              value,
            }) => {
              return type === 'Punctuator' && value === ')';
            },
          })
        );

        return ruleFixer.replaceTextRange(
          [
            jsdocNode.range[0], closeParen.range[1],
          ],
          sourceCode.getText(/** @type {any} */ (node)),
        );
      } :
      null,
    types[0],
    {
      type: assertedTypeStr,
    },
  );
}, {
  iterateAllJsdocs: true,
  meta: {
    docs: {
      description: 'Reports redundant @type tags that match or broaden the naturally inferred TypeScript type.',
    },
    fixable: 'code',
    schema: [
      {
        additionalProperties: false,
        properties: {
          checkLiteralConstAssertions: {
            description: 'Whether to check `const` type assertions as redundant',
            type: 'boolean',
          },
          enableFixer: {
            description: 'Whether to enable the fixer that removes the redundant `@type` tag (and the JSDoc block if it becomes empty). Defaults to `true`.',
            type: 'boolean',
          },
          treatAnyAsRedundant: {
            description: 'Whether to treat `any` type casts as redundant',
            type: 'boolean',
          },
          typesToIgnore: {
            description: 'An array list of types to ignore',
            items: {
              type: 'string',
            },
            type: 'array',
          },
        },
        type: 'object',
      },
    ],
    type: 'suggestion',
  },
});
