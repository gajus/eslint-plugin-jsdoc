import iterateJsdoc from '../iterateJsdoc.js';
import {
  getDocumentNamepathDefiningTags,
  strictNativeTypes,
} from '../jsdocUtils.js';
import {
  traverse,
  tryParse as tryParseType,
} from '@es-joy/jsdoccomment';

/**
 * @type {Partial<Record<import('../jsdocUtils.js').ParserMode, import('jsdoc-type-pratt-parser').ParseMode[]>>}
 */
const parseTypeModes = {
  closure: [
    'closure',
  ],
  jsdoc: [
    'jsdoc',
  ],
  typescript: [
    'typescript',
  ],
};

/**
 * @param {import('../iterateJsdoc.js').Utils} utils
 * @param {import('../iterateJsdoc.js').Settings} settings
 * @returns {boolean}
 */
const canSkip = (utils, settings) => {
  const voidingTags = [
    // An abstract function is by definition incomplete
    // so it is perfectly fine if a return is documented but
    // not present within the function.
    // A subclass may inherit the doc and implement the
    // missing return.
    'abstract',
    'virtual',

    // A constructor function returns `this` by default, so may be `@returns`
    //   tag indicating this but no explicit return
    'class',
    'constructor',
    'interface',
  ];

  if (settings.mode === 'closure') {
    // Structural Interface in GCC terms, equivalent to @interface tag as far as this rule is concerned
    voidingTags.push('record');
  }

  return utils.hasATag(voidingTags) ||
    utils.isConstructor() ||
    utils.classHasTag('interface') ||
    settings.mode === 'closure' && utils.classHasTag('record');
};

/**
 * @param {import('jsdoc-type-pratt-parser').RootResult} parsedType
 * @returns {import('jsdoc-type-pratt-parser').RootResult}
 */
const getReturnTypeLevelNode = (parsedType) => {
  return parsedType.type === 'JsdocTypeParenthesis' ?
    parsedType.element :
    parsedType;
};

/**
 * @param {import('eslint').Rule.RuleContext} context
 * @param {import('../jsdocUtils.js').ParserMode} mode
 * @returns {import('../jsdocUtils.js').ParserMode}
 */
const getParseMode = (context, mode) => {
  const {
    jsdoc,
  } = /** @type {{jsdoc?: {mode?: import('../jsdocUtils.js').ParserMode}}} */ (context.settings);

  return jsdoc?.mode ?? mode;
};

export default iterateJsdoc(({
  context,
  node,
  report,
  settings,
  sourceCode,
  utils,
}) => {
  const {
    exemptAsync = true,
    exemptGenerators = settings.mode === 'typescript',
    noNativeTypes = true,
    reportMissingReturnForUndefinedTypes = false,
  } = context.options[0] || {};
  const {
    mode,
  } = settings;
  const parseMode = getParseMode(context, mode);

  if (canSkip(utils, settings)) {
    return;
  }

  const isAsync = utils.isAsync();
  if (exemptAsync && isAsync) {
    return;
  }

  const tagName = /** @type {string} */ (utils.getPreferredTagName({
    tagName: 'returns',
  }));
  if (!tagName) {
    return;
  }

  const tags = utils.getTags(tagName);

  if (tags.length === 0) {
    return;
  }

  if (tags.length > 1) {
    report(`Found more than one @${tagName} declaration.`);

    return;
  }

  const [
    tag,
  ] = tags;

  const type = tag.type.trim();

  // https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html#assertion-functions
  if (/asserts\s/v.test(type)) {
    return;
  }

  const returnNever = type === 'never';
  const typedefs = getDocumentNamepathDefiningTags(sourceCode);

  /**
   * @param {import('comment-parser').Spec} returnTag
   * @returns {boolean}
   */
  const mayReturnUndefined = (returnTag) => {
    if (utils.mayBeUndefinedTypeTag(returnTag)) {
      return true;
    }

    const returnType = returnTag.type.trim();
    let parsedType;
    try {
      parsedType = tryParseType(returnType, parseTypeModes[parseMode]);
    } catch {
      return false;
    }

    const returnTypeLevelNode = getReturnTypeLevelNode(parsedType);
    let returnIsUndefined = false;
    traverse(returnTypeLevelNode, (nde, parentNode) => {
      const isReturnLevelNode = !parentNode ||
        returnTypeLevelNode.type === 'JsdocTypeUnion' && parentNode === returnTypeLevelNode;
      if (!isReturnLevelNode) {
        return;
      }

      const {
        type: nodeType,
      } = /** @type {import('jsdoc-type-pratt-parser').RootResult} */ (nde);

      if (nodeType === 'JsdocTypeUndefined') {
        returnIsUndefined = true;
        return;
      }

      if (nodeType !== 'JsdocTypeName') {
        return;
      }

      const {
        value,
      } = /** @type {import('jsdoc-type-pratt-parser').NameResult} */ (nde);

      if (value === 'void') {
        returnIsUndefined = true;
        return;
      }

      const referencedTypedef = typedefs.find((typedefTag) => {
        return typedefTag.name === value;
      });

      if (referencedTypedef && utils.mayBeUndefinedTypeTag(referencedTypedef)) {
        returnIsUndefined = true;
      }
    });

    return returnIsUndefined;
  };

  if (returnNever && utils.hasValueOrExecutorHasNonEmptyResolveValue(false)) {
    report(`JSDoc @${tagName} declaration set with "never" but return expression is present in function.`);

    return;
  }

  if (noNativeTypes && isAsync && strictNativeTypes.includes(type)) {
    report('Function is async or otherwise returns a Promise but the return type is a native type.');
    return;
  }

  // In case a return value is declared in JSDoc, we also expect one in the code.
  if (
    !returnNever &&
    (
      reportMissingReturnForUndefinedTypes ||
      !mayReturnUndefined(tag)
    ) &&
    (tag.type === '' && !utils.hasValueOrExecutorHasNonEmptyResolveValue(
      exemptAsync,
    ) ||
    tag.type !== '' && !utils.hasValueOrExecutorHasNonEmptyResolveValue(
      exemptAsync,
      true,
    )) &&
    Boolean(
      !exemptGenerators || !node ||
      !('generator' in /** @type {import('../iterateJsdoc.js').Node} */ (node)) ||
      !(/** @type {import('@typescript-eslint/types').TSESTree.FunctionDeclaration} */ (node)).generator,
    )
  ) {
    report(`JSDoc @${tagName} declaration present but return expression not available in function.`);
  }
}, {
  meta: {
    docs: {
      description: 'Requires a return statement in function body if a `@returns` tag is specified in JSDoc comment(and reports if multiple `@returns` tags are present).',
      url: 'https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/require-returns-check.md#repos-sticky-header',
    },
    schema: [
      {
        additionalProperties: false,
        properties: {
          exemptAsync: {
            default: true,
            description: `By default, functions which return a \`Promise\` that are not
detected as resolving with a non-\`undefined\` value and \`async\` functions
(even ones that do not explicitly return a value, as these are returning a
\`Promise\` implicitly) will be exempted from reporting by this rule.
If you wish to insist that only \`Promise\`'s which resolve to
non-\`undefined\` values or \`async\` functions with explicit \`return\`'s will
be exempted from reporting (i.e., that \`async\` functions can be reported
if they lack an explicit (non-\`undefined\`) \`return\` when a \`@returns\` is
present), you can set \`exemptAsync\` to \`false\` on the options object.`,
            type: 'boolean',
          },
          exemptGenerators: {
            description: `Because a generator might be labeled as having a
\`IterableIterator\` \`@returns\` value (along with an iterator type
corresponding to the type of any \`yield\` statements), projects might wish to
leverage \`@returns\` in generators even without a \`return\` statement. This
option is therefore \`true\` by default in \`typescript\` mode (in "jsdoc" mode,
one might be more likely to take advantage of \`@yields\`). Set it to \`false\`
if you wish for a missing \`return\` to be flagged regardless.`,
            type: 'boolean',
          },
          noNativeTypes: {
            description: `Whether to check that async functions do not
indicate they return non-native types. Defaults to \`true\`.`,
            type: 'boolean',
          },
          reportMissingReturnForUndefinedTypes: {
            default: false,
            description: `If \`true\` and no return or
resolve value is found, this setting will even insist that reporting occur
with \`void\` or \`undefined\` (including as an indicated \`Promise\` type).
Unlike \`require-returns\`, with this option in the rule, one can
*discourage* the labeling of \`undefined\` types. Defaults to \`false\`.`,
            type: 'boolean',
          },
        },
        type: 'object',
      },
    ],
    type: 'suggestion',
  },
});
