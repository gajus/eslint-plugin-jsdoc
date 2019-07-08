import _ from 'lodash';
import iterateJsdoc from '../iterateJsdoc';

const tagsWithNamesAndDescriptions = ['param', 'arg', 'argument'];

// If supporting Node >= 10, we could loosen the default to this for the
//   initial letter: \\p{Upper}
const matchDescriptionDefault = '^[A-Z`\\d_][\\s\\S]*[.?!`]$';

const stringOrDefault = (value, userDefault) => {
  return typeof value === 'string' ?
    value :
    userDefault || matchDescriptionDefault;
};

export default iterateJsdoc(({
  jsdoc,
  report,
  context,
  utils
}) => {
  const options = context.options[0] || {};

  const validateDescription = (description, tag) => {
    if (!tag && options.mainDescription === false) {
      return;
    }

    let tagValue = options.mainDescription;
    if (tag) {
      const tagName = tag.tag;
      tagValue = options.tags[tagName];
    }

    const regex = new RegExp(
      stringOrDefault(tagValue, options.matchDescription),
      'u'
    );

    if (!regex.test(description)) {
      report('JSDoc description does not satisfy the regex pattern.', null, tag || {
        // Add one as description would typically be into block
        line: jsdoc.line + 1
      });
    }
  };

  if (jsdoc.description) {
    validateDescription(jsdoc.description);
  }

  if (!options.tags || !Object.keys(options.tags).length) {
    return;
  }

  const hasOptionTag = (tagName) => {
    return Boolean(options.tags[tagName]);
  };

  let descName;
  utils.forEachPreferredTag('description', (matchingJsdocTag, targetTagName) => {
    descName = targetTagName;
    const description = (matchingJsdocTag.name + ' ' + matchingJsdocTag.description).trim();
    if (hasOptionTag(targetTagName)) {
      validateDescription(description, matchingJsdocTag);
    }
  });

  const tagsWithoutNames = [];
  const tagsWithNames = utils.filterTags((tag) => {
    const {tag: tagName} = tag;
    if (!hasOptionTag(tagName)) {
      return false;
    }
    const tagWithName = tagsWithNamesAndDescriptions.includes(tagName);
    if (!tagWithName && tagName !== descName) {
      tagsWithoutNames.push(tag);
    }

    return tagWithName;
  });

  tagsWithNames.some((tag) => {
    const description = _.trimStart(tag.description, '- ');

    return validateDescription(description, tag);
  });

  tagsWithoutNames.some((tag) => {
    const description = (tag.name + ' ' + tag.description).trim();

    return validateDescription(description, tag);
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
          mainDescription: {
            oneOf: [
              {
                format: 'regex',
                type: 'string'
              },
              {
                type: 'boolean'
              }
            ]
          },
          matchDescription: {
            format: 'regex',
            type: 'string'
          },
          tags: {
            patternProperties: {
              '.*': {
                oneOf: [
                  {
                    format: 'regex',
                    type: 'string'
                  },
                  {
                    enum: [true],
                    type: 'boolean'
                  }
                ]
              }
            },
            type: 'object'
          }
        },
        type: 'object'
      }
    ],
    type: 'suggestion'
  }
});
