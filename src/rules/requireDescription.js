import _ from 'lodash';
import iterateJsdoc from '../iterateJsdoc';

export default iterateJsdoc(({
  jsdoc,
  report,
  utils
}) => {
  if (utils.avoidDocs()) {
    return;
  }

  const targetTagName = utils.getPreferredTagName('description');
  if (!targetTagName) {
    return;
  }

  const functionExamples = _.filter(jsdoc.tags, {
    tag: targetTagName
  });

  if (!functionExamples.length) {
    report(`Missing JSDoc @${targetTagName} declaration.`);

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
    schema: [
      {
        additionalProperties: false,
        properties: {
          contexts: {
            items: {
              type: 'string'
            },
            type: 'array'
          },
          exemptedBy: {
            items: {
              type: 'string'
            },
            type: 'array'
          }
        },
        type: 'object'
      }
    ],
    type: 'suggestion'
  }
});
