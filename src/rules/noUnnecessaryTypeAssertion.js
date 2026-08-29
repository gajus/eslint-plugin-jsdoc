/* eslint-disable jsdoc/reject-any-type -- TypeScript types need not be installed */
import iterateJsdoc from '../iterateJsdoc.js';
import {
  createRequire,
} from 'module';

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
  // eslint-disable-next-line no-bitwise -- Convenient
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
  node: nde,
  report,
  utils,
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
    treatAnyAsRedundant = false,
    typesToIgnore = [],
  } = context.options[0] ?? {};

  const node =
    /**
     * @type {import('@typescript-eslint/utils').TSESTree.Node}
     */ (nde);

  // 2. Safely get TypeScript parser services and TypeChecker
  const services =
    /**
     * @type {import('@typescript-eslint/utils').ParserServices}
     */ (context.sourceCode.parserServices);

  /* c8 ignore next 6 -- Guard */
  if (!services || !services.program) {
    // Cannot proceed without type-aware linting enabled
    // eslint-disable-next-line no-console -- Feedback
    console.warn('⚠️ You must point ESLint to the `typescript-eslint` parser using `languageOptions`. See the documentation for `jsdoc/no-unnecessary-type-assertion`.');
    return;
  }

  // 1. Grab the parser services and the active TypeChecker
  // const services = ESLintUtils.getParserServices(context);
  const checker = services.program.getTypeChecker();

  /**
   * @param {string} typeStr
   * @returns {any} `ts.Type`
   */
  const getTypeFromString = (typeStr) => {
    // 2. Parse the type string into a virtual TypeScript SourceFile
    const virtualSourceFile = ts.createSourceFile(
      'inline-type-eval.ts',
      `type __TargetType = ${typeStr};`,
      ts.ScriptTarget.Latest,
      true,
    );

    // 3. Find the TypeNode in the AST (type __TargetType = <TypeNode>;)
    // Type `ts.TypeAliasDeclaration`
    const typeAlias = /** @type {any} */ (
      virtualSourceFile.statements[0]
    );
    const typeNode = typeAlias.type;

    // 4. Resolve the type using the TypeChecker
    // Note: If the type string references external symbols or types from your
    // actual codebase, the checker may require a complete program context to resolve them.
    return checker.getTypeFromTypeNode(typeNode);
  };

  // Todo: Support more than just VariableDeclaration!

  // 3. For this example, let's assume we are checking VariableDeclarators
  // e.g., `/** @type {number} */ const x = 5;`
  if (node?.type === 'VariableDeclaration') {
    const decl = node.declarations[0];

    /* c8 ignore next 4 -- How to cover? */
    if (!decl.init) {
      // No initializer, type is likely `any`, so @type isn't redundant
      return;
    }

    // 4. Map the ESLint AST nodes to TypeScript AST nodes
    // const tsNode = services.esTreeNodeToTSNodeMap.get(decl.id);
    const tsInit = services.esTreeNodeToTSNodeMap.get(decl.init);

    // 5. Get the types
    // tsNode type includes the JSDoc explicit type
    // tsInit type is the purely inferred type from the right-hand side
    const inferredType = checker.getTypeAtLocation(tsInit);

    // 6. Compare the types.
    const declaredTypeStr = types[0].type;
    const declaredType = getTypeFromString(declaredTypeStr);

    const isRedundantType = checker.isTypeAssignableTo(
      inferredType,
      declaredType,
    );

    if (declaredTypeStr === 'const') {
      if (checkLiteralConstAssertions && isLiteralType(inferredType)) {
        report(
          'The @type tag declaring "{{ type }}" is redundant as TypeScript infers it automatically for literals.',
          null,
          types[0],
          {
            type: declaredTypeStr,
          },
        );
      }

      return;
    }

    if (
      isRedundantType && (treatAnyAsRedundant || declaredTypeStr !== 'any') &&
      !typesToIgnore.includes(declaredTypeStr)
    ) {
      report(
        'The @type tag declaring "{{ type }}" is redundant as TypeScript infers it automatically.',
        null,
        types[0],
        {
          type: declaredTypeStr,
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
    schema: [
      {
        additionalProperties: false,
        properties: {
          checkLiteralConstAssertions: {
            description: 'Whether to check `const` type assertions as redundant',
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
