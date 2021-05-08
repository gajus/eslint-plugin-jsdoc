import iterateJsdoc from '../iterateJsdoc';

export default iterateJsdoc(({
  context,
  jsdoc,
  utils,
}) => {
  const [defaultRequireValue = 'always', {
    tags: tagMap = {},
  } = {}] = context.options;

  const {source} = jsdoc;

  const always = defaultRequireValue === 'always';
  const never = defaultRequireValue === 'never';

  let currentTag;
  source.some(({number, tokens}) => {
    const {delimiter, tag, end} = tokens;

    const neverFix = () => {
      tokens.delimiter = '';
      tokens.postDelimiter = '';
    };
    const checkNever = () => {
      utils.reportJSDoc('Expected JSDoc line to have no prefix.', {
        column: 0,
        line: number,
      }, neverFix);

      return true;
    };

    const alwaysFix = () => {
      tokens.delimiter = '*';
      tokens.postDelimiter = ' ';
    };
    const checkAlways = () => {
      utils.reportJSDoc('Expected JSDoc line to have the prefix.', {
        column: 0,
        line: number,
      }, alwaysFix);

      return true;
    };

    if (tag) {
      // Remove at sign
      currentTag = tag.slice(1);
    }

    if (
      // If this is the end but has a tag, the delimiter will also be
      //  populated and will be safely ignored later
      end && !tag
    ) {
      return false;
    }

    if (!currentTag) {
      if (tagMap.any?.includes('*description')) {
        return false;
      }
      if (delimiter && tagMap.never?.includes('*description')) {
        return checkNever();
      }
      if (!delimiter && tagMap.always?.includes('*description')) {
        return checkAlways();
      }

      return false;
    }

    if (tagMap.any?.includes(currentTag)) {
      return false;
    }

    if (delimiter && (
      never && !tagMap.always?.includes(currentTag) ||
      tagMap.never?.includes(currentTag)
    )) {
      return checkNever();
    }

    if (!delimiter && (
      always && !tagMap.never?.includes(currentTag) ||
      tagMap.always?.includes(currentTag))
    ) {
      return checkAlways();
    }

    return false;
  });
}, {
  iterateAllJsdocs: true,
  meta: {
    fixable: 'code',
    schema: [
      {
        enum: ['always', 'never', 'any'],
        type: 'string',
      },
      {
        additionalProperties: false,
        properties: {
          tags: {
            properties: {
              always: {
                items: {
                  type: 'string',
                },
                type: 'array',
              },
              any: {
                items: {
                  type: 'string',
                },
                type: 'array',
              },
              never: {
                items: {
                  type: 'string',
                },
                type: 'array',
              },
            },
            type: 'object',
          },
        },
        type: 'object',
      },
    ],
    type: 'layout',
  },
});
