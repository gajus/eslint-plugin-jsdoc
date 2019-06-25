import _ from 'lodash';
import iterateJsdoc from '../iterateJsdoc';

const tagsWithDescriptions = ['param', 'arg', 'argument', 'returns', 'return'];

export default iterateJsdoc(({
  jsdoc,
  report,
  context,
  utils
}) => {
  const options = context.options[0] || {};

  const validateDescription = (description, tag) => {
    const tagName = tag.tag;
    const tagOptions = options.tags || {};
    if (tagOptions[tagName] === false) {
      return;
    }
    const regex = new RegExp(
      (typeof tagOptions[tagName] === 'string' ? tagOptions[tagName] :
        options.matchDescription

      // If supporting Node >= 10, we could loosen to this for the
      //   initial letter: \\p{Upper}
      ) || '^[A-Z`\\d_][\\s\\S]*[.?!`]$',
      'u'
    );

    if (!regex.test(description)) {
      report('JSDoc description does not satisfy the regex pattern.', null, tag);
    }
  };

  if (jsdoc.description) {
    validateDescription(jsdoc.description, {
      // Add one as description would typically be into block
      line: jsdoc.line + 1,
      tag: 'main description'
    });
  }

  if (!options.tags || !Object.keys(options.tags).length) {
    return;
  }

  const tags = utils.filterTags(({tag}) => {
    return tagsWithDescriptions.includes(tag) &&
      {}.hasOwnProperty.call(options.tags, tag) && options.tags[tag];
  });

  tags.some((tag) => {
    const description = _.trimStart(tag.description, '- ');

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
            oneOf: [
              {
                items: {
                  type: 'string'
                },
                type: 'array'
              },
              {
                type: 'string'
              }
            ]
          },
          matchDescription: {
            format: 'regex',
            type: 'string'
          },
          noDefaults: {
            default: false,
            type: 'boolean'
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
