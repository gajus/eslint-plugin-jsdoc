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
  node: nde,
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

  // Todo: Support more than just VariableDeclaration!

  // 3. For this example, let's assume we are checking VariableDeclarators
  // e.g., `/** @type {number} */ const x = 5;`
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

    const tsNode = services.esTreeNodeToTSNodeMap.get(decl.init);
    const assertedTypeStr = types[0].type;

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

    // 1. Fetch the raw types from the abstract syntax tree
    const rawInferredType = checker.getTypeAtLocation(tsNode);
    const rawAssertedType = checker.getTypeFromTypeNode(jsdocTypeNode);

    // 2. Safely categorize the structure and isolate empty placeholder shapes
    const isObjectOrArray = (rawInferredType.flags & ts.TypeFlags.Object) !== 0;

    let isDefaultPlaceholder = false;
    if (isObjectOrArray) {
      if (checker.isArrayType(rawInferredType)) {
        const [
          elementType,
        ] = checker.getTypeArguments(/** @type {import('typescript').TypeReference} */ (
          rawInferredType
        ));
        if (elementType) {
          // Catches [] -> never[] safely before any widening
          isDefaultPlaceholder = (elementType.flags & (ts.TypeFlags.Never | ts.TypeFlags.Undefined | ts.TypeFlags.Any)) !== 0;
        }
      } else {
        // If the expression has an explicit ObjectLiteral mask with zero keys, it's a default {} placeholder
        const {
          objectFlags,
        } = /** @type {import('typescript').ObjectType} */ (rawInferredType);
        isDefaultPlaceholder = ((objectFlags & ts.ObjectFlags.EmptyObjectLiteral) !== 0 ||
                            checker.getPropertiesOfType(rawInferredType).length === 0);
      }
    }

    // 3. Execute the core redundancy validation rules
    let isRedundant = false;

    if (isObjectOrArray) {
      if (checker.isArrayType(rawInferredType)) {
        // Arrays: standard structural bidirectional assignment matches string[] vs string[]
        const isAssignableForward = checker.isTypeAssignableTo(rawInferredType, rawAssertedType);
        const isAssignableBackward = checker.isTypeAssignableTo(rawAssertedType, rawInferredType);
        isRedundant = isAssignableForward && isAssignableBackward;
      } else {
        // Objects: Strip the literal initialization flags on the structural wrapper
        const inferredBaseType = checker.getBaseTypeOfLiteralType(rawInferredType);
        const assertedBaseType = checker.getBaseTypeOfLiteralType(rawAssertedType);

        // Forward check: Expression fits seamlessly into the JSDoc target
        const isAssignableForward = checker.isTypeAssignableTo(inferredBaseType, assertedBaseType);

        // Backward check: Target structurally satisfies the widened expression
        // This evaluates `{prop: string}` vs `{prop: string}` as TRUE for redundancy,
        // while checking `{prop?: string}` vs `{prop: string}` safely fails backward assignment.
        const isAssignableBackward = checker.isTypeAssignableTo(assertedBaseType, inferredBaseType);

        isRedundant = isAssignableForward && isAssignableBackward;
      }
    } else {
      // Primitives and individual literal values ("text" -> string) use unidirectional verification
      isRedundant = checker.isTypeAssignableTo(rawInferredType, rawAssertedType);
    }

    if (assertedTypeStr === 'const') {
      if (checkLiteralConstAssertions && isLiteralType(rawInferredType)) {
        utils.reportJSDoc(
          'The @type tag declaring "{{ type }}" is redundant as TypeScript infers it automatically for literals.',
          types[0],
          fixer,
          true,
          {
            type: assertedTypeStr,
          },
        );
      }

      return;
    }

    if (
      isRedundant && !isDefaultPlaceholder &&
      (treatAnyAsRedundant || assertedTypeStr !== 'any') &&
      !typesToIgnore.includes(assertedTypeStr)
    ) {
      utils.reportJSDoc(
        'The @type tag declaring "{{ type }}" is redundant as TypeScript infers it automatically.',
        types[0],
        fixer,
        true,
        {
          type: assertedTypeStr,
        },
      );
    }
  }
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
