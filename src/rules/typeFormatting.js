import iterateJsdoc from '../iterateJsdoc.js';
import {
  parse as parseType,
  stringify,
  traverse,
  tryParse as tryParseType,
} from '@es-joy/jsdoccomment';

const digitRegex = (/^(\d+(\.\d*)?|\.\d+)([eE][\-+]?\d+)?$/v);

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
    objectFieldSeparator = 'comma',
    objectFieldSeparatorTrailingPunctuation = false,
    propertyQuotes = null,
    separatorForSingleObjectField = false,
    stringQuotes = 'single',
    typeBracketSpacing = '',
    unionSpacing = ' ',
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

      const nameAndDesc = beginNameOrDescIdx === -1 ?
        null :
        tag.source.slice(beginNameOrDescIdx);

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
            type: '{' + typeBracketSpacing + firstTypeLine + (!typeLines.length && lastTypeLine === undefined ? typeBracketSpacing + '}' : ''),
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
        nameAndDesc && beginNameOrDescIdx > 0
      ) {
        src.push({
          number: src.length + 1,
          source: '',
          tokens: {
            ...nameAndDesc[0].tokens,
            type: lastTypeLine + typeBracketSpacing + '}',
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
      } else if (nameAndDesc) {
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
              type: lastTypeLine + typeBracketSpacing + '}',
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

      const initialEndSource = jsdoc.source.find(({
        tokens: {
          end,
        },
      }) => {
        return end;
      });

      jsdoc.source = [
        ...jsdoc.source.slice(0, firstTagIdx),
        ...jsdoc.tags.flatMap(({
          source,
        }) => {
          return source;
        }),
      ];

      if (initialEndSource && !jsdoc.source.at(-1)?.tokens?.end) {
        jsdoc.source.push(initialEndSource);
      }
    };

    /** @type {string[]} */
    const errorMessages = [];

    if (typeBracketSpacing && (!tag.type.startsWith(typeBracketSpacing) || !tag.type.endsWith(typeBracketSpacing))) {
      errorMessages.push(`Must have initial and final "${typeBracketSpacing}" spacing`);
    } else if (!typeBracketSpacing && ((/^\s/v).test(tag.type) || (/\s$/v).test(tag.type))) {
      errorMessages.push('Must have no initial spacing');
    }

    // eslint-disable-next-line complexity -- Todo
    traverse(parsedType, (nde) => {
      let errorMessage = '';

      switch (nde.type) {
        case 'JsdocTypeGeneric': {
          const typeNode = /** @type {import('jsdoc-type-pratt-parser').GenericResult} */ (nde);
          if ('value' in typeNode.left && typeNode.left.value === 'Array') {
            if (typeNode.meta.brackets !== arrayBrackets) {
              typeNode.meta.brackets = arrayBrackets;
              errorMessage = `Array bracket style should be ${arrayBrackets}`;
            }
          } else if (typeNode.meta.dot !== genericDot) {
            typeNode.meta.dot = genericDot;
            errorMessage = `Dot usage should be ${genericDot}`;
          }

          break;
        }

        case 'JsdocTypeObject': {
          const typeNode = /** @type {import('jsdoc-type-pratt-parser').ObjectResult} */ (nde);
          if (
            /* c8 ignore next -- Guard */
            (typeNode.meta.separator ?? 'comma') !== objectFieldSeparator ||
            (typeNode.meta.separatorForSingleObjectField ?? false) !== separatorForSingleObjectField ||
            (typeNode.meta.propertyIndent ?? '') !== objectFieldIndent ||
            (typeNode.meta.trailingPunctuation ?? false) !== objectFieldSeparatorTrailingPunctuation
          ) {
            typeNode.meta.separator = objectFieldSeparator;
            typeNode.meta.separatorForSingleObjectField = separatorForSingleObjectField;
            typeNode.meta.propertyIndent = objectFieldIndent;
            typeNode.meta.trailingPunctuation = objectFieldSeparatorTrailingPunctuation;
            errorMessage = `Inconsistent ${objectFieldSeparator} separator usage`;
          }

          break;
        }

        case 'JsdocTypeObjectField': {
          const typeNode = /** @type {import('jsdoc-type-pratt-parser').ObjectFieldResult} */ (nde);
          if ((objectFieldQuote ||
            (typeof typeNode.key === 'string' &&
              (
                (/^[\p{ID_Start}$_][\p{ID_Continue}$\u200C\u200D]*$/v).test(typeNode.key) ||
                digitRegex.test(typeNode.key)
              )
            )) &&
            typeNode.meta.quote !== (objectFieldQuote ?? undefined) &&
            (typeof typeNode.key !== 'string' ||
                !digitRegex.test(typeNode.key))
          ) {
            typeNode.meta.quote = objectFieldQuote ?? undefined;
            errorMessage = `Inconsistent object field quotes ${objectFieldQuote}`;
          }

          break;
        }

        case 'JsdocTypeProperty': {
          const typeNode = /** @type {import('jsdoc-type-pratt-parser').PropertyResult} */ (nde);

          if ((propertyQuotes ||
            (typeof typeNode.value === 'string' && !(/\s/v).test(typeNode.value))) &&
            typeNode.meta.quote !== (propertyQuotes ?? undefined)
          ) {
            typeNode.meta.quote = propertyQuotes ?? undefined;
            errorMessage = `Inconsistent ${propertyQuotes} property quotes usage`;
          }

          break;
        }

        case 'JsdocTypeStringValue': {
          const typeNode = /** @type {import('jsdoc-type-pratt-parser').StringValueResult} */ (nde);
          if (typeNode.meta.quote !== stringQuotes) {
            typeNode.meta.quote = stringQuotes;
            errorMessage = `Inconsistent ${stringQuotes} string quotes usage`;
          }

          break;
        }

        case 'JsdocTypeUnion': {
          const typeNode = /** @type {import('jsdoc-type-pratt-parser').UnionResult} */ (nde);
          /* c8 ignore next -- Guard */
          if ((typeNode.meta?.spacing ?? ' ') !== unionSpacing) {
            typeNode.meta = {
              spacing: unionSpacing,
            };
            errorMessage = `Inconsistent "${unionSpacing}" union spacing usage`;
          }

          break;
        }

        default:
          break;
      }

      if (errorMessage) {
        errorMessages.push(errorMessage);
      }
    });

    const differentResult = tag.type !==
      typeBracketSpacing + stringify(parsedType) + typeBracketSpacing;

    if (errorMessages.length && differentResult) {
      for (const errorMessage of errorMessages) {
        utils.reportJSDoc(
          errorMessage, tag, enableFixer ? fix : null,
        );
      }
    // Stringification may have been equal previously (and thus no error reported)
    //   because the stringification doesn't preserve everything
    } else if (differentResult) {
      utils.reportJSDoc(
        'There was an error with type formatting', tag, enableFixer ? fix : null,
      );
    }
  };

  const tags = utils.getPresentTags([
    'param',
    'property',
    'returns',
    'this',
    'throws',
    'type',
    'typedef',
    'yields',
  ]);
  for (const tag of tags) {
    if (tag.type) {
      checkTypeFormats(tag);
    }
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
            ],
          },
          objectFieldSeparatorTrailingPunctuation: {
            type: 'boolean',
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
          typeBracketSpacing: {
            type: 'string',
          },
          unionSpacing: {
            type: 'string',
          },
        },
        type: 'object',
      },
    ],
    type: 'suggestion',
  },
});
