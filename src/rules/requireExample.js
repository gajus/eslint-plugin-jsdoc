import _ from 'lodash';
import iterateJsdoc from '../iterateJsdoc';

export default iterateJsdoc(({
  jsdoc,
  report,
  utils,
}) => {
  if (utils.avoidDocs()) {
    return;
  }

  const targetTagName = 'example';

  const functionExamples = _.filter(jsdoc.tags, {
    tag: targetTagName,
  });

  if (!functionExamples.length) {
    utils.reportJSDoc(`Missing JSDoc @${targetTagName} declaration.`, null, () => {
      if (!jsdoc.tags) {
        jsdoc.tags = [];
      }
      const line = jsdoc.tags.length ? jsdoc.tags[jsdoc.tags.length - 1].line + 1 : 0;
      jsdoc.tags.push({
        description: '',
        line,
        name: '',
        optional: false,
        tag: targetTagName,
        type: '',
      });
    });

    return;
  }

  functionExamples.forEach((example) => {
    const exampleContent = _.compact(`${example.name} ${example.description}`.trim().split('\n'));

    if (!exampleContent.length) {
      report(`Missing JSDoc @${targetTagName} description.`);
    }
  });
}, {
  contextDefaults: true,
  meta: {
    docs: {
      description: 'Requires that all functions have examples.',
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
        },
        type: 'object',
      },
    ],
    type: 'suggestion',
  },
});
