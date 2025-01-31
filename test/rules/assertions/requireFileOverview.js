export default /** @type {import('../index.js').TestCases} */ ({
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
      `,
      errors: [
        {
          line: 1,
          message: 'Missing @file',
        },
      ],
      options: [
        {
          tags: {
            file: {
              initialCommentsOnly: true,
              mustExist: true,
              preventDuplicates: true,
            },
          },
        },
      ],
    },
    {
      code: `
      `,
      errors: [
        {
          line: 1,
          message: 'Missing @file',
        },
      ],
      options: [
        {
          tags: {
            file: {
              mustExist: true,
            },
          },
        },
      ],
    },
    {
      code: `
      `,
      errors: [
        {
          line: 1,
          message: 'Missing @author',
        },
      ],
      options: [
        {
          tags: {
            author: {
              initialCommentsOnly: false,
              mustExist: true,
              preventDuplicates: false,
            },
          },
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
      options: [
        {
          tags: {
            file: {
              initialCommentsOnly: false,
              mustExist: true,
              preventDuplicates: false,
            },
          },
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
        /**
         * @copyright
         */

         /**
          * @copyright
          */
      `,
      errors: [
        {
          line: 1,
          message: 'Duplicate @copyright',
        },
      ],
      options: [
        {
          tags: {
            copyright: {
              initialCommentsOnly: false,
              mustExist: false,
              preventDuplicates: true,
            },
          },
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
    {
      code: `
        function quux () {
        }
        /**
         * @license
         */
      `,
      errors: [
        {
          line: 1,
          message: '@license should be at the beginning of the file',
        },
      ],
      options: [
        {
          tags: {
            license: {
              initialCommentsOnly: true,
              mustExist: false,
              preventDuplicates: false,
            },
          },
        },
      ],
    },
    {
      code: `
        function quux () {
        }
        /**
         * @license
         */
      `,
      errors: [
        {
          line: 1,
          message: '@license should be at the beginning of the file',
        },
      ],
      options: [
        {
          tags: {
            license: {
              initialCommentsOnly: true,
            },
          },
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
      options: [
        {
          tags: {
            file: {
              initialCommentsOnly: true,
              preventDuplicates: true,
            },
          },
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
            file: {
              replacement: 'fileoverview',
            },
          },
        },
      },
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
       /**
        * @file
        */

       /**
        * @file
        */
      `,
      options: [
        {
          tags: {
            license: {
              initialCommentsOnly: true,
              preventDuplicates: true,
            },
          },
        },
      ],
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
    {
      code: `
        function quux () {
        }
        /**
         *
         */
      `,
      options: [
        {
          tags: {
            license: {
              initialCommentsOnly: true,
              mustExist: false,
              preventDuplicates: false,
            },
          },
        },
      ],
    },
    {
      code: `
        function quux () {
        }
        /**
         *
         */
      `,
      options: [
        {
          tags: {
            license: {
              initialCommentsOnly: false,
              mustExist: false,
              preventDuplicates: false,
            },
          },
        },
      ],
    },
    {
      code: `
        function quux () {
        }
        /**
         *
         */
      `,
      options: [
        {
          tags: {
            license: {
              initialCommentsOnly: false,
              mustExist: false,
              preventDuplicates: true,
            },
          },
        },
      ],
    },
    {
      code: `
      /**
       * @license MIT
       */

       var a

       /**
        * @type {Array}
        */
      `,
      options: [
        {
          tags: {
            license: {
              initialCommentsOnly: true,
              mustExist: false,
              preventDuplicates: false,
            },
          },
        },
      ],
    },
  ],
});
