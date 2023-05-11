import {
  parse,
  stringify,
  traverse,
  tryParse,
} from '@es-joy/jsdoccomment';
import iterateJsdoc from '../iterateJsdoc';

const strictNativeTypes = [
  'undefined',
  'null',
  'boolean',
  'number',
  'bigint',
  'string',
  'symbol',
  'object',
  'Array',
  'Function',
  'Date',
  'RegExp',
];

/**
 * Adjusts the parent type node `meta` for generic matches (or type node
 * `type` for `JsdocTypeAny`) and sets the type node `value`.
 *
 * @param {string} type The actual type
 * @param {string} preferred The preferred type
 * @param {boolean} isGenericMatch
 * @param {string} typeNodeName
 * @param {import('jsdoc-type-pratt-parser').NonRootResult} node
 * @param {import('jsdoc-type-pratt-parser').NonRootResult} parentNode
 * @returns {void}
 */
const adjustNames = (type, preferred, isGenericMatch, typeNodeName, node, parentNode) => {
  let ret = preferred;
  if (isGenericMatch) {
    if (preferred === '[]') {
      parentNode.meta.brackets = 'square';
      parentNode.meta.dot = false;
      ret = 'Array';
    } else {
      const dotBracketEnd = preferred.match(/\.(?:<>)?$/u);
      if (dotBracketEnd) {
        parentNode.meta.brackets = 'angle';
        parentNode.meta.dot = true;
        ret = preferred.slice(0, -dotBracketEnd[0].length);
      } else {
        const bracketEnd = preferred.endsWith('<>');
        if (bracketEnd) {
          parentNode.meta.brackets = 'angle';
          parentNode.meta.dot = false;
          ret = preferred.slice(0, -2);
        } else if (
          parentNode.meta?.brackets === 'square' &&
          (typeNodeName === '[]' || typeNodeName === 'Array')
        ) {
          parentNode.meta.brackets = 'angle';
          parentNode.meta.dot = false;
        }
      }
    }
  } else if (type === 'JsdocTypeAny') {
    node.type = 'JsdocTypeName';
  }

  node.value = ret.replace(/(?:\.|<>|\.<>|\[\])$/u, '');

  // For bare pseudo-types like `<>`
  if (!ret) {
    node.value = typeNodeName;
  }
};

/**
 * @param {boolean} upperCase
 * @returns {string}
 */
const getMessage = (upperCase) => {
  return 'Use object shorthand or index signatures instead of ' +
  '`' + (upperCase ? 'O' : 'o') + 'bject`, e.g., `{[key: string]: string}`';
};

export default iterateJsdoc(({
  jsdocNode,
  sourceCode,
  report,
  utils,
  settings,
  context,
}) => {
  const jsdocTagsWithPossibleType = utils.filterTags((tag) => {
    return utils.tagMightHaveTypePosition(tag.tag);
  });

  const {
    preferredTypes: preferredTypesOriginal,
    structuredTags,
    mode,
  } = settings;

  const injectObjectPreferredTypes = !('Object' in preferredTypesOriginal ||
    'object' in preferredTypesOriginal ||
    'object.<>' in preferredTypesOriginal ||
    'Object.<>' in preferredTypesOriginal ||
    'object<>' in preferredTypesOriginal);

  const info = {
    message: getMessage(),
    replacement: false,
  };

  const infoUC = {
    message: getMessage(true),
    replacement: false,
  };

  const typeToInject = mode === 'typescript' ?
    {
      Object: 'object',
      'object.<>': info,
      'Object.<>': infoUC,
      'object<>': info,
      'Object<>': infoUC,
    } :
    {
      Object: 'object',
      'object.<>': 'Object<>',
      'Object.<>': 'Object<>',
      'object<>': 'Object<>',
    };

  const preferredTypes = {
    ...injectObjectPreferredTypes ?
      typeToInject :
      {},
    ...preferredTypesOriginal,
  };

  const {
    noDefaults,
    unifyParentAndChildTypeChecks,
    exemptTagContexts = [],
  } = context.options[0] || {};

  /**
   * Gets information about the preferred type: whether there is a matching
   * preferred type, what the type is, and whether it is a match to a generic.
   *
   * @param {string} _type Not currently in use
   * @param {string} typeNodeName
   * @param {import('jsdoc-type-pratt-parser/dist/src/index.d.ts').NonTerminalResult} parentNode
   * @param {string} property
   * @returns {[hasMatchingPreferredType: boolean, typeName: string, isGenericMatch: boolean]}
   */
  const getPreferredTypeInfo = (_type, typeNodeName, parentNode, property) => {
    let hasMatchingPreferredType = false;
    let isGenericMatch = false;
    let typeName = typeNodeName;

    const isNameOfGeneric = parentNode !== undefined && parentNode.type === 'JsdocTypeGeneric' && property === 'left';
    if (unifyParentAndChildTypeChecks || isNameOfGeneric) {
      const brackets = parentNode?.meta?.brackets;
      const dot = parentNode?.meta?.dot;

      if (brackets === 'angle') {
        const checkPostFixes = dot ? [
          '.', '.<>',
        ] : [
          '<>',
        ];
        isGenericMatch = checkPostFixes.some((checkPostFix) => {
          if (preferredTypes?.[typeNodeName + checkPostFix] !== undefined) {
            typeName += checkPostFix;

            return true;
          }

          return false;
        });
      }

      if (!isGenericMatch && property && parentNode.type === 'JsdocTypeGeneric') {
        const checkPostFixes = dot ? [
          '.', '.<>',
        ] : [
          brackets === 'angle' ? '<>' : '[]',
        ];

        isGenericMatch = checkPostFixes.some((checkPostFix) => {
          if (preferredTypes?.[checkPostFix] !== undefined) {
            typeName = checkPostFix;

            return true;
          }

          return false;
        });
      }
    }

    const directNameMatch = preferredTypes?.[typeNodeName] !== undefined &&
      !Object.values(preferredTypes).includes(typeNodeName);
    const unifiedSyntaxParentMatch = property && directNameMatch && unifyParentAndChildTypeChecks;
    isGenericMatch = isGenericMatch || unifiedSyntaxParentMatch;

    hasMatchingPreferredType = isGenericMatch ||
      directNameMatch && !property;

    return [
      hasMatchingPreferredType, typeName, isGenericMatch,
    ];
  };

  /**
   * Iterates strict types to see if any should be added to `invalidTypes` (and
   * the the relevant strict type returned as the new preferred type).
   *
   * @param {string} typeNodeName
   * @param {string} preferred
   * @param {import('jsdoc-type-pratt-parser/dist/src/index.d.ts').NonTerminalResult} parentNode
   * @param {string[]} invalidTypes
   * @returns {string} The `preferred` type string, optionally changed
   */
  const checkNativeTypes = (typeNodeName, preferred, parentNode, invalidTypes) => {
    let changedPreferred = preferred;
    for (const strictNativeType of strictNativeTypes) {
      if (
        strictNativeType === 'object' &&
        (
          // This is not set to remap with exact type match (e.g.,
          //   `object: 'Object'`), so can ignore (including if circular)
          !preferredTypes?.[typeNodeName] ||
          // Although present on `preferredTypes` for remapping, this is a
          //   parent object without a parent match (and not
          //   `unifyParentAndChildTypeChecks`) and we don't want
          //   `object<>` given TypeScript issue https://github.com/microsoft/TypeScript/issues/20555
          parentNode?.elements?.length && (
            parentNode?.left?.type === 'JsdocTypeName' &&
            parentNode?.left?.value === 'Object'
          )
        )
      ) {
        continue;
      }

      if (strictNativeType !== typeNodeName &&
        strictNativeType.toLowerCase() === typeNodeName.toLowerCase() &&

        // Don't report if user has own map for a strict native type
        (!preferredTypes || preferredTypes?.[strictNativeType] === undefined)
      ) {
        changedPreferred = strictNativeType;
        invalidTypes.push([
          typeNodeName, changedPreferred,
        ]);
        break;
      }
    }

    return changedPreferred;
  };

  /**
   * Collect invalid type info.
   *
   * @param {string} type
   * @param {string} value
   * @param {string} tagName
   * @param {string} nameInTag
   * @param {number} idx
   * @param {string} property
   * @param {import('jsdoc-type-pratt-parser').NonRootResult} node
   * @param {import('jsdoc-type-pratt-parser').NonRootResult} parentNode
   * @param {string[]} invalidTypes
   * @returns {void}
   */
  const getInvalidTypes = (type, value, tagName, nameInTag, idx, property, node, parentNode, invalidTypes) => {
    let typeNodeName = type === 'JsdocTypeAny' ? '*' : value;

    const [
      hasMatchingPreferredType,
      typeName,
      isGenericMatch,
    ] = getPreferredTypeInfo(type, typeNodeName, parentNode, property);

    let preferred;
    let types;
    if (hasMatchingPreferredType) {
      const preferredSetting = preferredTypes[typeName];
      typeNodeName = typeName === '[]' ? typeName : typeNodeName;

      if (!preferredSetting) {
        invalidTypes.push([
          typeNodeName,
        ]);
      } else if (typeof preferredSetting === 'string') {
        preferred = preferredSetting;
        invalidTypes.push([
          typeNodeName, preferred,
        ]);
      } else if (preferredSetting && typeof preferredSetting === 'object') {
        const nextItem = preferredSetting.skipRootChecking && jsdocTagsWithPossibleType[idx + 1];

        if (!nextItem || !nextItem.name.startsWith(`${nameInTag}.`)) {
          preferred = preferredSetting.replacement;
          invalidTypes.push([
            typeNodeName,
            preferred,
            preferredSetting.message,
          ]);
        }
      } else {
        utils.reportSettings(
          'Invalid `settings.jsdoc.preferredTypes`. Values must be falsy, a string, or an object.',
        );

        return;
      }
    } else if (Object.entries(structuredTags).some(([
      tag,
      {
        type: typs,
      },
    ]) => {
      types = typs;

      return tag === tagName &&
        Array.isArray(types) &&
        !types.includes(typeNodeName);
    })) {
      invalidTypes.push([
        typeNodeName, types,
      ]);
    } else if (!noDefaults && type === 'JsdocTypeName') {
      preferred = checkNativeTypes(typeNodeName, preferred, parentNode, invalidTypes);
    }

    // For fixer
    if (preferred) {
      adjustNames(type, preferred, isGenericMatch, typeNodeName, node, parentNode);
    }
  };

  for (const [
    idx,
    jsdocTag,
  ] of jsdocTagsWithPossibleType.entries()) {
    const invalidTypes = [];
    let typeAst;

    try {
      typeAst = mode === 'permissive' ? tryParse(jsdocTag.type) : parse(jsdocTag.type, mode);
    } catch {
      continue;
    }

    const {
      tag: tagName,
      name: nameInTag,
    } = jsdocTag;

    traverse(typeAst, (node, parentNode, property) => {
      const {
        type,
        value,
      } = node;
      if (![
        'JsdocTypeName', 'JsdocTypeAny',
      ].includes(type)) {
        return;
      }

      getInvalidTypes(type, value, tagName, nameInTag, idx, property, node, parentNode, invalidTypes);
    });

    if (invalidTypes.length) {
      const fixedType = stringify(typeAst);

      /**
       * @param {import('eslint').Rule.ReportFixer} fixer The ESLint fixer
       * @returns {string}
       */
      const fix = (fixer) => {
        return fixer.replaceText(
          jsdocNode,
          sourceCode.getText(jsdocNode).replace(
            `{${jsdocTag.type}}`,
            `{${fixedType}}`,
          ),
        );
      };

      for (const [
        badType,
        preferredType = '',
        msg,
      ] of invalidTypes) {
        const tagValue = jsdocTag.name ? ` "${jsdocTag.name}"` : '';
        if (exemptTagContexts.some(({
          tag,
          types,
        }) => {
          return tag === tagName &&
            (types === true || types.includes(jsdocTag.type));
        })) {
          continue;
        }

        report(
          msg ||
            `Invalid JSDoc @${tagName}${tagValue} type "${badType}"` +
            (preferredType ? '; ' : '.') +
            (preferredType ? `prefer: ${JSON.stringify(preferredType)}.` : ''),
          preferredType ? fix : null,
          jsdocTag,
          msg ? {
            tagName,
            tagValue,
          } : null,
        );
      }
    }
  }
}, {
  iterateAllJsdocs: true,
  meta: {
    docs: {
      description: 'Reports invalid types.',
      url: 'https://github.com/gajus/eslint-plugin-jsdoc#eslint-plugin-jsdoc-rules-check-types',
    },
    fixable: 'code',
    schema: [
      {
        additionalProperties: false,
        properties: {
          exemptTagContexts: {
            items: {
              additionalProperties: false,
              properties: {
                tag: {
                  type: 'string',
                },
                types: {
                  oneOf: [
                    {
                      type: 'boolean',
                    },
                    {
                      items: {
                        type: 'string',
                      },
                      type: 'array',
                    },
                  ],
                },
              },
              type: 'object',
            },
            type: 'array',
          },
          noDefaults: {
            type: 'boolean',
          },
          unifyParentAndChildTypeChecks: {
            type: 'boolean',
          },
        },
        type: 'object',
      },
    ],
    type: 'suggestion',
  },
});
