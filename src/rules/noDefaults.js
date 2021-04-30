import iterateJsdoc from '../iterateJsdoc';

export default iterateJsdoc(({
  context,
  utils,
}) => {
  const {noOptionalParamNames} = context.options[0] || {};
  const paramTags = utils.getPresentTags(['param', 'arg', 'argument']);
  paramTags.forEach((tag) => {
    if (noOptionalParamNames && tag.optional) {
      utils.reportJSDoc(`Optional param names are not permitted on @${tag.tag}.`, tag, () => {
        utils.changeTag(tag, {
          name: tag.name.replace(/([^=]*)(=.+)?/, '$1'),
        });
      });
    } else if (tag.default) {
      utils.reportJSDoc(`Defaults are not permitted on @${tag.tag}.`, tag, () => {
        utils.changeTag(tag, {
          name: tag.name.replace(/([^=]*)(=.+)?/, '[$1]'),
        });
      });
    }
  });
  const defaultTags = utils.getPresentTags(['default', 'defaultvalue']);
  defaultTags.forEach((tag) => {
    if (tag.description.trim()) {
      utils.reportJSDoc(`Default values are not permitted on @${tag.tag}.`, tag, () => {
        utils.changeTag(tag, {
          description: '',
          postTag: '',
        });
      });
    }
  });
}, {
  contextDefaults: true,
  meta: {
    docs: {
      description: 'This rule reports defaults being used on the relevant portion of `@param` or `@default`.',
      url: 'https://github.com/gajus/eslint-plugin-jsdoc#eslint-plugin-jsdoc-rules-no-defaults',
    },
    fixable: 'code',
    schema: [
      {
        additionalProperties: false,
        properties: {
          contexts: {
            items: {
              anyOf: [
                {
                  type: 'string',
                },
                {
                  additionalProperties: false,
                  properties: {
                    comment: {
                      type: 'string',
                    },
                    context: {
                      type: 'string',
                    },
                  },
                  type: 'object',
                },
              ],
            },
            type: 'array',
          },
          noOptionalParamNames: {
            type: 'boolean',
          },
        },
        type: 'object',
      },
    ],
    type: 'suggestion',
  },
});
