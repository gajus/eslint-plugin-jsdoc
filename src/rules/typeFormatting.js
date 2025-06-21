import iterateJsdoc from '../iterateJsdoc.js';
import {
  parse as parseType,
  stringify,
  traverse,
  tryParse as tryParseType,
} from '@es-joy/jsdoccomment';

export default iterateJsdoc(({
  context,
  indent,
  jsdoc,
  settings,
  utils,
}) => {
  const {
    arrayBrackets = 'square',
    enableFixer = true,
    genericDot = false,
    objectFieldIndent = '',
    objectFieldQuote = null,
    objectFieldSeparator = null,
    propertyQuotes = null,
    separatorForSingleObjectField = false,
    stringQuotes = 'single',
  } = context.options[0] || {};

  const {
    mode,
  } = settings;

  /**
   * @param {import('@es-joy/jsdoccomment').JsdocTagWithInline} tag
   */
  const checkTypeFormats = (tag) => {
    const potentialType = tag.type;
    let parsedType;
    try {
      parsedType = mode === 'permissive' ?
        tryParseType(/** @type {string} */ (potentialType)) :
        parseType(/** @type {string} */ (potentialType), mode);
    } catch {
      return;
    }

    const fix = () => {
      const typeLines = stringify(parsedType).split('\n');
      const firstTypeLine = typeLines.shift();
      const lastTypeLine = typeLines.pop();

      const beginNameOrDescIdx = tag.source.findIndex(({
        tokens,
      }) => {
        return tokens.name || tokens.description;
      });

      const nameAndDesc = tag.source.slice(beginNameOrDescIdx);
      const initialNumber = tag.source[0].number;
      const src = [
        // Get inevitably present tag from first `tag.source`
        {
          number: initialNumber,
          source: '',
          tokens: {
            ...tag.source[0].tokens,
            ...(typeLines.length || lastTypeLine ? {
              end: '',
              name: '',
              postName: '',
              postType: '',
            } : {}),
            type: '{' + firstTypeLine + (!typeLines.length && lastTypeLine === undefined ? '}' : ''),
          },
        },
        // Get any intervening type lines
        ...(typeLines.length ? typeLines.map((typeLine, idx) => {
          return {
            number: initialNumber + idx + 1,
            source: '',
            tokens: {
              // Grab any delimiter info from first item
              ...tag.source[0].tokens,
              delimiter: tag.source[0].tokens.delimiter === '/**' ? '*' : tag.source[0].tokens.delimiter,
              end: '',
              name: '',
              postName: '',
              postTag: '',
              postType: '',
              start: indent + ' ',
              tag: '',
              type: typeLine,
            },
          };
        }) : []),
      ];

      // Merge any final type line and name and description
      if (
        // Name and description may be already included if present with the tag
        beginNameOrDescIdx > 0
      ) {
        src.push({
          number: src.length + 1,
          source: '',
          tokens: {
            ...nameAndDesc[0].tokens,
            type: lastTypeLine + '}',
          },
        });

        if (
          // Get any remaining description lines
          nameAndDesc.length > 1
        ) {
          src.push(
            ...nameAndDesc.slice(1).map(({
              source,
              tokens,
            }, idx) => {
              return {
                number: src.length + idx + 2,
                source,
                tokens,
              };
            }),
          );
        }
      } else {
        if (lastTypeLine) {
          src.push({
            number: src.length + 1,
            source: '',
            tokens: {
              ...nameAndDesc[0].tokens,
              delimiter: nameAndDesc[0].tokens.delimiter === '/**' ? '*' : nameAndDesc[0].tokens.delimiter,
              postTag: '',
              start: indent + ' ',
              tag: '',
              type: lastTypeLine + '}',
            },
          });
        }

        if (
          // Get any remaining description lines
          nameAndDesc.length > 1
        ) {
          src.push(
            ...nameAndDesc.slice(1).map(({
              source,
              tokens,
            }, idx) => {
              return {
                number: src.length + idx + 2,
                source,
                tokens,
              };
            }),
          );
        }
      }

      tag.source = src;

      // Properly rewire `jsdoc.source`
      const firstTagIdx = jsdoc.source.findIndex(({
        tokens: {
          tag: tg,
        },
      }) => {
        return tg;
      });

      jsdoc.source = [
        ...jsdoc.source.slice(0, firstTagIdx),
        ...jsdoc.tags.flatMap(({
          source,
        }) => {
          return source;
        }),
      ];
    };

    /** @type {string[]} */
    const errorMessages = [];
    let needToReport = false;
    traverse(parsedType, (nde) => {
      let typeFound = true;
      let errorMessage = '';
      const initialType = stringify(
        /** @type {import('jsdoc-type-pratt-parser').RootResult} */ (nde),
      );
      switch (nde.type) {
        case 'JsdocTypeGeneric': {
          const typeNode = /** @type {import('jsdoc-type-pratt-parser').GenericResult} */ (nde);
          if ('value' in typeNode.left && typeNode.left.value === 'Array') {
            typeNode.meta.brackets = arrayBrackets;
            errorMessage = `Array bracket style should be ${arrayBrackets}`;
          } else {
            typeNode.meta.dot = genericDot;
            errorMessage = `Dot usage should be ${genericDot}`;
          }

          break;
        }

        case 'JsdocTypeObject': {
          const typeNode = /** @type {import('jsdoc-type-pratt-parser').ObjectResult} */ (nde);
          typeNode.meta.separator = objectFieldSeparator ?? undefined;
          typeNode.meta.separatorForSingleObjectField = separatorForSingleObjectField;
          typeNode.meta.propertyIndent = objectFieldIndent;
          errorMessage = `Inconsistent ${objectFieldSeparator} usage`;
          break;
        }

        case 'JsdocTypeObjectField': {
          const typeNode = /** @type {import('jsdoc-type-pratt-parser').ObjectFieldResult} */ (nde);
          if (objectFieldQuote ||
            (typeof typeNode.key === 'string' && !(/\s/v).test(typeNode.key))
          ) {
            typeNode.meta.quote = objectFieldQuote ?? undefined;
            errorMessage = `Inconsistent object field quotes ${objectFieldQuote}`;
          } else {
            typeFound = false;
          }

          break;
        }

        case 'JsdocTypeProperty': {
          const typeNode = /** @type {import('jsdoc-type-pratt-parser').PropertyResult} */ (nde);

          if (propertyQuotes ||
            (typeof typeNode.value === 'string' && !(/\s/v).test(typeNode.value))
          ) {
            typeNode.meta.quote = propertyQuotes ?? undefined;
            errorMessage = `Inconsistent ${propertyQuotes} property quotes usage`;
          } else {
            typeFound = false;
          }

          break;
        }

        case 'JsdocTypeStringValue': {
          const typeNode = /** @type {import('jsdoc-type-pratt-parser').StringValueResult} */ (nde);
          typeNode.meta.quote = stringQuotes;
          errorMessage = `Inconsistent ${stringQuotes} string quotes usage`;
          break;
        }

        default:
          typeFound = false;
          break;
      }

      if (typeFound) {
        const convertedType = stringify(/** @type {import('jsdoc-type-pratt-parser').RootResult} */ (nde));
        if (initialType !== convertedType) {
          needToReport = true;
          errorMessages.push(errorMessage);
        }
      }
    });

    if (needToReport) {
      for (const errorMessage of errorMessages) {
        utils.reportJSDoc(
          errorMessage, tag, enableFixer ? fix : null, true,
        );
      }
    }
  };

  const tags = utils.getPresentTags([
    'param',
    'returns',
  ]);
  for (const tag of tags) {
    checkTypeFormats(tag);
  }
}, {
  iterateAllJsdocs: true,
  meta: {
    docs: {
      description: 'Formats JSDoc type values.',
      url: 'https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/type-formatting.md#repos-sticky-header',
    },
    fixable: 'code',
    schema: [
      {
        additionalProperties: false,
        properties: {
          arrayBrackets: {
            enum: [
              'angle',
              'square',
            ],
          },
          enableFixer: {
            type: 'boolean',
          },
          genericDot: {
            type: 'boolean',
          },
          objectFieldIndent: {
            type: 'string',
          },
          objectFieldQuote: {
            enum: [
              'double',
              'single',
              null,
            ],
          },
          objectFieldSeparator: {
            enum: [
              'comma',
              'comma-and-linebreak',
              'linebreak',
              'semicolon',
              'semicolon-and-linebreak',
              null,
            ],
          },
          propertyQuotes: {
            enum: [
              'double',
              'single',
              null,
            ],
          },
          separatorForSingleObjectField: {
            type: 'boolean',
          },
          stringQuotes: {
            enum: [
              'double',
              'single',
            ],
          },
        },
        type: 'object',
      },
    ],
    type: 'suggestion',
  },
});
