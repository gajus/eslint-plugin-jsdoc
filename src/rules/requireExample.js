import _ from 'lodash';
import iterateJsdoc from '../iterateJsdoc';

export default iterateJsdoc(({
  context,
  jsdoc,
  report,
  utils,
}) => {
  if (utils.avoidDocs()) {
    return;
  }

  const {
    exemptNoArguments = false,
  } = context.options[0] || {};

  const targetTagName = 'example';

  const functionExamples = _.filter(jsdoc.tags, {
    tag: targetTagName,
  });

  if (!functionExamples.length) {
    if (exemptNoArguments && utils.isIteratingFunction() &&
      !utils.hasParams()
    ) {
      return;
    }

    utils.reportJSDoc(`Missing JSDoc @${targetTagName} declaration.`, null, () => {
      utils.addTag(targetTagName);
    });

    return;
  }

  functionExamples.forEach((example) => {
    const exampleContent = _.compact(`${example.name} ${utils.getTagDescription(example)}`.trim().split('\n'));

    if (!exampleContent.length) {
      report(`Missing JSDoc @${targetTagName} description.`);
    }
  });
}, {
  contextDefaults: true,
  meta: {
    docs: {
      description: 'Requires that all functions have examples.',
      url: 'https://github.com/gajus/eslint-plugin-jsdoc#eslint-plugin-jsdoc-rules-require-example',
    },
    fixable: 'code',
    schema: [
      {
        additionalProperties: false,
        properties: {
          checkConstructors: {
            default: true,
            type: 'boolean',
          },
          checkGetters: {
            default: false,
            type: 'boolean',
          },
          checkSetters: {
            default: false,
            type: 'boolean',
          },
          contexts: {
            items: {
              type: 'string',
            },
            type: 'array',
          },
          exemptedBy: {
            items: {
              type: 'string',
            },
            type: 'array',
          },
          exemptNoArguments: {
            default: false,
            type: 'boolean',
          },
        },
        type: 'object',
      },
    ],
    type: 'suggestion',
  },
});
