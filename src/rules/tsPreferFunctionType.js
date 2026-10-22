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
 * Parents within which a function type needs no parentheses.
 */
const noParenthesesParents = new Set([
  'JsdocTypeFunction',
  'JsdocTypeGeneric',
  'JsdocTypeKeyValue',
  'JsdocTypeObjectField',
  'JsdocTypeParenthesis',
  'JsdocTypeTuple',
]);

export default iterateJsdoc(({
  context,
  indent,
  jsdoc,
  utils,
}) => {
  const {
    enableFixer = true,
  } = context.options[0] || {};

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
      // @ts-expect-error Adding our own properties for use below
      nde.parentNode = parentNode;
      // @ts-expect-error Adding our own properties for use below
      nde.parentProperty = property;
      // @ts-expect-error Adding our own properties for use below
      nde.parentIndex = index;
    });

    traverse(parsedType, (nde, parentNode, property, index) => {
      switch (nde.type) {
        case 'JsdocTypeCallSignature': {
          const object = /** @type {import('jsdoc-type-pratt-parser').ObjectResult} */ (
            parentNode
          );
          if (typeof index === 'number' && object.elements.length === 1) {
            utils.reportJSDoc(
              'Call signature found; function type preferred.',
              tag,
              enableFixer ? () => {
                const func = /** @type {import('jsdoc-type-pratt-parser').FunctionResult} */ ({
                  arrow: true,
                  constructor: false,
                  meta: /** @type {Required<import('jsdoc-type-pratt-parser').MethodSignatureResult['meta']>} */ (
                    nde.meta
                  ),
                  parameters: nde.parameters,
                  parenthesis: true,
                  returnType: nde.returnType,
                  type: 'JsdocTypeFunction',
                  typeParameters: nde.typeParameters,
                });

                const {
                  parentIndex,
                  parentNode: objectParent,
                  parentProperty,
                } = /**
                     * @type {{
                     *   parentIndex?: number,
                     *   parentNode?: import('jsdoc-type-pratt-parser').NonRootResult,
                     *   parentProperty?: string
                     * }}
                     */ (object);

                if (objectParent && parentProperty) {
                  // A function type must be parenthesized wherever it would
                  //   otherwise bind differently, e.g., in a union or as the
                  //   element of an array type
                  const replacement = noParenthesesParents.has(objectParent.type) &&
                    !(
                      objectParent.type === 'JsdocTypeGeneric' &&
                      objectParent.meta.brackets === 'square'
                    ) ?
                    func :
                    /** @type {import('jsdoc-type-pratt-parser').ParenthesisResult} */ ({
                      element: func,
                      type: 'JsdocTypeParenthesis',
                    });

                  const parentRecord = /** @type {Record<string, unknown>} */ (
                    /** @type {unknown} */ (objectParent)
                  );
                  if (typeof parentIndex === 'number') {
                    /** @type {unknown[]} */ (parentRecord[parentProperty])[parentIndex] = replacement;
                  } else {
                    parentRecord[parentProperty] = replacement;
                  }
                } else {
                  parsedType = func;
                }

                rewireByParsedType(jsdoc, tag, parsedType, indent);
              } : null,
            );
          }

          break;
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
      description: 'Prefers function types over call signatures when there are no other properties.',
      url: 'https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/ts-prefer-function-type.md#repos-sticky-header',
    },
    fixable: 'code',
    schema: [
      {
        additionalProperties: false,
        properties: {
          enableFixer: {
            description: 'Whether to enable the fixer or not',
            type: 'boolean',
          },
        },
        type: 'object',
      },
    ],
    type: 'suggestion',
  },
});
