import _ from 'lodash';
import iterateJsdoc from '../iterateJsdoc';
import warnRemovedSettings from '../warnRemovedSettings';

export default iterateJsdoc(({
  jsdoc,
  report,
  utils,
  context
}) => {
  warnRemovedSettings(context, 'require-example');

  if (utils.avoidDocs()) {
    return;
  }

  const {avoidExampleOnConstructors = false} = context.options[0] || {};

  const targetTagName = 'example';

  const functionExamples = _.filter(jsdoc.tags, {
    tag: targetTagName
  });

  if (avoidExampleOnConstructors && (
    utils.hasATag([
      'class',
      'constructor'
    ]) ||
    utils.isConstructor()
  )) {
    return;
  }

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
          avoidExampleOnConstructors: {
            default: false,
            type: 'boolean'
          },
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
