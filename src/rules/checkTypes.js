import {
  buildRejectOrPreferRuleDefinition,
} from '../buildRejectOrPreferRuleDefinition.js';

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
 * @callback CheckNativeTypes
 * Iterates strict types to see if any should be added to `invalidTypes` (and
 * the the relevant strict type returned as the new preferred type).
 * @param {import('../iterateJsdoc.js').PreferredTypes} preferredTypes
 * @param {string} typeNodeName
 * @param {string|undefined} preferred
 * @param {import('jsdoc-type-pratt-parser').NonRootResult|undefined} parentNode
 * @param {(string|false|undefined)[][]} invalidTypes
 * @returns {string|undefined} The `preferred` type string, optionally changed
 */

/** @type {CheckNativeTypes} */
const checkNativeTypes = (preferredTypes, typeNodeName, preferred, parentNode, invalidTypes) => {
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
        /**
         * @type {import('jsdoc-type-pratt-parser').GenericResult}
         */
        (
          parentNode
        )?.elements?.length && (
        /**
         * @type {import('jsdoc-type-pratt-parser').GenericResult}
         */
          (
            parentNode
          )?.left?.type === 'JsdocTypeName' &&
          /**
           * @type {import('jsdoc-type-pratt-parser').GenericResult}
           */
          (parentNode)?.left?.value === 'Object'
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

export default buildRejectOrPreferRuleDefinition({
  checkNativeTypes,
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
          description: '@deprecated Use the `preferredTypes[preferredType]` setting of the same name instead',
          type: 'boolean',
        },
      },
      type: 'object',
    },
  ],
});
