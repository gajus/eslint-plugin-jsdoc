import iterateJsdoc from '../iterateJsdoc';

export default iterateJsdoc(({
  context,
  jsdoc,
  utils,
}) => {
  // Todo: `tags` option
  /*
  const {
    tags: tagMap,
  } = context.options[1] || {};
  */

  const {source} = jsdoc;

  if (context.options[0] === 'never') {
    source.some(({number, tokens}) => {
      const {delimiter, tag} = tokens;
      if (!tag) {
        // Todo: Reinvestigate upon trying to clean-up non-tag description
        return false;
      }
      if (delimiter) {
        const fix = () => {
          tokens.delimiter = '';
          tokens.postDelimiter = '';
        };

        utils.reportJSDoc('Expected JSDoc line to have no prefix.', {
          column: 0,
          line: number,
        }, fix);

        return true;
      }

      return false;
    });

    return;
  }

  source.some(({number, tokens}) => {
    const {delimiter, tag} = tokens;
    if (!tag) {
      // Todo: Reinvestigate upon trying to clean-up non-tag description
      return false;
    }
    if (!delimiter) {
      const fix = () => {
        tokens.delimiter = '*';
        tokens.postDelimiter = ' ';
      };

      utils.reportJSDoc('Expected JSDoc line to have the prefix.', {
        column: 0,
        line: number,
      }, fix);

      return true;
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
