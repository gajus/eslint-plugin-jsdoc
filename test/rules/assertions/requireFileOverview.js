export default {
  invalid: [
    {
      code: `
      `,
      errors: [
        {
          line: 1,
          message: 'Missing @file',
        },
      ],
    },
    {
      code: `
      /**
       *
       */
      `,
      errors: [
        {
          line: 1,
          message: 'Missing @file',
        },
      ],
    },
    {
      code: `
      /**
       *
       */
      function quux () {}
      `,
      errors: [
        {
          line: 1,
          message: 'Missing @file',
        },
      ],
    },
    {
      code: `
      /**
       *
       */
      function quux () {}
      `,
      errors: [
        {
          line: 1,
          message: 'Missing @fileoverview',
        },
      ],
      settings: {
        jsdoc: {
          tagNamePreference: {
            file: 'fileoverview',
          },
        },
      },
    },
    {
      code: `
      /**
       *
       */
      function quux () {}
      `,
      errors: [
        {
          line: 1,
          message: 'Missing @overview',
        },
      ],
      settings: {
        jsdoc: {
          tagNamePreference: {
            file: 'overview',
          },
        },
      },
    },
    {
      code: `
      /**
       *
       */
      function quux () {}
      `,
      errors: [
        {
          line: 1,
          message: '`settings.jsdoc.tagNamePreference` cannot block @file ' +
            'for the `require-file-overview` rule',
        },
      ],
      settings: {
        jsdoc: {
          tagNamePreference: {
            file: false,
          },
        },
      },
    },
    {
      code: `
      /**
       *
       */
      function quux () {}
      `,
      errors: [
        {
          line: 1,
          message: '`settings.jsdoc.tagNamePreference` cannot block @file ' +
            'for the `require-file-overview` rule',
        },
      ],
      settings: {
        jsdoc: {
          tagNamePreference: {
            file: {
              message: 'Don\'t use file',
            },
          },
        },
      },
    },
    {
      code: `
      /**
       * @param a
       */
      function quux (a) {}
      `,
      errors: [
        {
          line: 1,
          message: 'Missing @file',
        },
      ],
    },
    {
      code: `
      /**
       * @param a
       */
      function quux (a) {}

      /**
       * @param b
       */
      function bar (b) {}
      `,
      errors: [
        {
          line: 1,
          message: 'Missing @file',
        },
      ],
    },
    {
      code: `
        /**
         * @file
         */

         /**
          * @file
          */
      `,
      errors: [
        {
          line: 1,
          message: 'Duplicate @file',
        },
      ],
    },
    {
      code: `
        function quux () {
        }
        /**
         * @file
         */
      `,
      errors: [
        {
          line: 1,
          message: '@file should be at the beginning of the file',
        },
      ],
    },
  ],
  valid: [
    {
      code: `
        /**
         * @file
         */
      `,
    },
    {
      code: `
        // Ok preceded by comment
        /**
         * @file
         */
      `,
    },
    {
      code: `
        /**
         * @fileoverview
         */
      `,
      settings: {
        jsdoc: {
          tagNamePreference: {
            file: 'fileoverview',
          },
        },
      },
    },
    {
      code: `
        /**
         * @overview
         */
      `,
      settings: {
        jsdoc: {
          tagNamePreference: {
            file: 'overview',
          },
        },
      },
    },
    {
      code: `
        /**
         * @file Description of file
         */
      `,
    },
    {
      code: `
        /**
         * @file Description of file
         */
        function quux () {
        }

        /**
         *
         */
      `,
    },
  ],
};
