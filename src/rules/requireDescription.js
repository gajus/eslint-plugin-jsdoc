import _ from 'lodash';
import iterateJsdoc from '../iterateJsdoc';

export default iterateJsdoc(({
  jsdoc,
  report,
  utils,
  context
}) => {
  if (utils.avoidDocs()) {
    return;
  }

  const targetTagName = utils.getPreferredTagName('description');
  if (!targetTagName) {
    return;
  }

  const checkDescription = (description) => {
    const exampleContent = _.compact(description.trim().split('\n'));

    return exampleContent.length;
  };

  const {descriptionStyle = 'body'} = context.options[0] || {};

  if (descriptionStyle !== 'tag') {
    if (checkDescription(jsdoc.description || '')) {
      return;
    }

    if (descriptionStyle === 'body') {
      report('Missing JSDoc block description.');

      return;
    }
  }

  const functionExamples = _.filter(jsdoc.tags, {
    tag: targetTagName
  });

  if (!functionExamples.length) {
    report(
      descriptionStyle === 'any' ?
        `Missing JSDoc block description or @${targetTagName} declaration.` :
        `Missing JSDoc @${targetTagName} declaration.`
    );

    return;
  }

  functionExamples.forEach((example) => {
    if (!checkDescription(`${example.name} ${example.description}`)) {
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
          descriptionStyle: {
            enum: ['body', 'tag', 'any'],
            type: 'string'
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
