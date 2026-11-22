import iterateJsdoc from '../iterateJsdoc.js';
import {
  parse as parseType,
  traverse,
} from '@es-joy/jsdoccomment';
import {
  parse as espree,
} from 'espree';

export default iterateJsdoc(({
  settings,
  utils,
}) => {
  if (settings.mode !== 'typescript') {
    return;
  }

  /**
   * @param {import('@es-joy/jsdoccomment').JsdocTagWithInline} tag
   */
  const checkType = (tag) => {
    const potentialType = tag.type;
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

    traverse(parsedType, (nde, parentNode) => {
      switch (nde.type) {
        case 'JsdocTypeObject': {
          // As with typescript-eslint, `{}` in an intersection (e.g., the
          //   common `string & {}`) does not widen the type
          if (!nde.elements.length && parentNode?.type !== 'JsdocTypeIntersection') {
            utils.reportJSDoc('No empty object type.', tag);
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
      description: 'Warns against use of the empty object type',
      url: 'https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/ts-no-empty-object-type.md#repos-sticky-header',
    },
    schema: [],
    type: 'suggestion',
  },
});
