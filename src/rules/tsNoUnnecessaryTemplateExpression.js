import iterateJsdoc from '../iterateJsdoc.js';
import {
  rewireByParsedType,
} from '../jsdocUtils.js';
import {
  parse as parseType,
  traverse,
} from '@es-joy/jsdoccomment';
import {
  parse as espree,
} from 'espree';

/**
 * Names of types which a template literal turns into string types (e.g.,
 *   `${number}` is the type of numeric strings, not `number`).
 */
const nonStringNames = new Set([
  'any',
  'bigint',
  'boolean',
  'false',
  'number',
  'true',
]);

/**
 * @param {import('jsdoc-type-pratt-parser').NonRootResult} node
 * @returns {boolean}
 */
const isNonString = (node) => {
  switch (node.type) {
    case 'JsdocTypeKeyof':
    case 'JsdocTypeNull':
    case 'JsdocTypeNumber':
    case 'JsdocTypeUndefined':
      return true;
    case 'JsdocTypeName':
      return nonStringNames.has(node.value);
    case 'JsdocTypeUnion':
      return node.elements.some(isNonString);
    default:
      return false;
  }
};

/**
 * Types which bind more loosely than some of the types around them.
 */
const looseTypes = new Set([
  'JsdocTypeConditional',
  'JsdocTypeIntersection',
  'JsdocTypeUnion',
]);

/**
 * Parents within which no type needs parentheses.
 */
const noParenthesesParents = new Set([
  'JsdocTypeFunction',
  'JsdocTypeKeyValue',
  'JsdocTypeObjectField',
  'JsdocTypeParenthesis',
  'JsdocTypeTemplateLiteral',
  'JsdocTypeTuple',
]);

/**
 * @param {import('jsdoc-type-pratt-parser').NonRootResult} node
 * @param {import('jsdoc-type-pratt-parser').NonRootResult} parentNode
 * @returns {boolean}
 */
const needsParentheses = (node, parentNode) => {
  if (!looseTypes.has(node.type)) {
    return false;
  }

  switch (parentNode.type) {
    case 'JsdocTypeGeneric':
      // `(A | B)[]`, but `Record<A | B, string>`
      return parentNode.meta.brackets === 'square';
    case 'JsdocTypeUnion':
      return node.type === 'JsdocTypeConditional';
    default:
      return !noParenthesesParents.has(parentNode.type);
  }
};

export default iterateJsdoc(({
  context,
  indent,
  jsdoc,
  settings,
  utils,
}) => {
  if (settings.mode !== 'typescript') {
    return;
  }

  const {
    enableFixer = true,
  } = context.options[0] ?? {};

  /**
   * @param {import('@es-joy/jsdoccomment').JsdocTagWithInline} tag
   */
  const checkType = (tag) => {
    const potentialType = tag.type;
    /** @type {import('jsdoc-type-pratt-parser').RootResult} */
    let parsedType;
    try {
      parsedType = parseType(
        /** @type {string} */ (potentialType),
        'typescript',
        {
          computedPropertyParser: espree,
        },
      );
    } catch {
      return;
    }

    traverse(parsedType, (nde, parentNode, property, index) => {
      switch (nde.type) {
        case 'JsdocTypeTemplateLiteral': {
          const stringInterpolationIndex = nde.interpolations.findIndex((interpolation) => {
            return interpolation.type === 'JsdocTypeStringValue';
          });
          if (stringInterpolationIndex > -1) {
            utils.reportJSDoc(
              'Found an unnecessary string literal within a template.',
              tag,
              enableFixer ? () => {
                nde.literals.splice(
                  stringInterpolationIndex,
                  2,
                  nde.literals[stringInterpolationIndex] +
                    /** @type {import('jsdoc-type-pratt-parser').StringValueResult} */
                    (nde.interpolations[stringInterpolationIndex]).value +
                    nde.literals[stringInterpolationIndex + 1],
                );

                nde.interpolations.splice(
                  stringInterpolationIndex, 1,
                );

                rewireByParsedType(jsdoc, tag, parsedType, indent);
              } : null,
            );
          } else if (nde.literals.length === 2 && nde.literals[0] === '' &&
            nde.literals[1] === '' &&
            // Otherwise, the template is what makes the type a string type
            !isNonString(nde.interpolations[0])
          ) {
            utils.reportJSDoc(
              'Found a lone template expression within a template.',
              tag,
              enableFixer ? () => {
                const interpolation = nde.interpolations[0];

                if (parentNode && property) {
                  const replacement = needsParentheses(interpolation, parentNode) ?
                    /** @type {import('jsdoc-type-pratt-parser').ParenthesisResult} */ ({
                      element: interpolation,
                      type: 'JsdocTypeParenthesis',
                    }) :
                    interpolation;
                  if (typeof index === 'number') {
                    // @ts-expect-error Safe
                    parentNode[property][index] = replacement;
                  } else {
                    // @ts-expect-error Safe
                    parentNode[property] = replacement;
                  }
                } else {
                  parsedType = interpolation;
                }

                rewireByParsedType(jsdoc, tag, parsedType, indent);
              } : null,
            );
          }
        }
      }
    });
  };

  const tags = utils.filterTags(({
    tag,
  }) => {
    return Boolean(tag !== 'import' && utils.tagMightHaveTypePosition(tag));
  });

  for (const tag of tags) {
    if (tag.type) {
      checkType(tag);
    }
  }
}, {
  iterateAllJsdocs: true,
  meta: {
    docs: {
      description: 'Catches unnecessary template expressions such as string expressions within a template literal.',
      url: 'https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/ts-no-unnecessary-template-expression.md#repos-sticky-header',
    },
    fixable: 'code',
    schema: [
      {
        additionalProperties: false,
        properties: {
          enableFixer: {
            description: 'Whether to enable the fixer. Defaults to `true`.',
            type: 'boolean',
          },
        },
        type: 'object',
      },
    ],
    type: 'suggestion',
  },
});
