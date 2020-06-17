import _ from 'lodash';
import iterateJsdoc from '../iterateJsdoc';

export default iterateJsdoc(({
  jsdoc,
  report,
  utils,
  context,
}) => {
  if (utils.avoidDocs()) {
    return;
  }
  const {descriptionStyle = 'body'} = context.options[0] || {};

  let targetTagName = utils.getPreferredTagName({
    // We skip reporting except when `@description` is essential to the rule,
    //  so user can block the tag and still meaningfully use this rule
    //  even if the tag is present (and `check-tag-names` is the one to
    //  normally report the fact that it is blocked but present)
    skipReportingBlockedTag: descriptionStyle !== 'tag',
    tagName: 'description',
  });
  if (!targetTagName) {
    return;
  }
  const isBlocked = typeof targetTagName === 'object' && targetTagName.blocked;
  if (isBlocked) {
    targetTagName = targetTagName.tagName;
  }

  const checkDescription = (description) => {
    const exampleContent = _.compact(description.trim().split('\n'));

    return exampleContent.length;
  };

  if (descriptionStyle !== 'tag') {
    if (checkDescription(jsdoc.description || '')) {
      return;
    }

    if (descriptionStyle === 'body') {
      report('Missing JSDoc block description.');

      return;
    }
  }

  const functionExamples = isBlocked ?
    [] :
    _.filter(jsdoc.tags, {
      tag: targetTagName,
    });

  if (!functionExamples.length) {
    report(
      descriptionStyle === 'any' ?
        `Missing JSDoc block description or @${targetTagName} declaration.` :
        `Missing JSDoc @${targetTagName} declaration.`,
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
    docs: {
      description: 'Requires that all functions have a description.',
    },
    schema: [
      {
        additionalProperties: false,
        properties: {
          checkConstructors: {
            default: true,
            type: 'boolean',
          },
          checkGetters: {
            default: true,
            type: 'boolean',
          },
          checkSetters: {
            default: true,
            type: 'boolean',
          },
          contexts: {
            items: {
              type: 'string',
            },
            type: 'array',
          },
          descriptionStyle: {
            enum: ['body', 'tag', 'any'],
            type: 'string',
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
