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
        type: ''
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
    fixable: 'code',
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
