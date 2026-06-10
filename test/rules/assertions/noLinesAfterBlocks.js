export default {
  invalid: [
    {
      code: `
        /** This is a description of some function!*/






        function someFunction() {}
      `,
      errors: [
        {
          line: 2,
          message: 'There should be no extra lines above structures with JSDoc blocks',
        },
      ],
      output: `
        /** This is a description of some function!*/
        function someFunction() {}
      `,
    },
    {
      code: `
        /** This is a description of some function!*/

        function someFunction() {}
      `,
      errors: [
        {
          line: 2,
          message: 'There should be no extra lines above structures with JSDoc blocks',
        },
      ],
      options: [
        {
          enableFixer: false,
        },
      ],
    },
    {
      code: `
        /** This is a description of some function!*/


        function someFunction() {}
      `,
      errors: [
        {
          line: 2,
          message: 'There should be no extra lines above structures with JSDoc blocks',
        },
      ],
      output: `
        /** This is a description of some function!*/

        function someFunction() {}
      `,
      settings: {
        jsdoc: {
          maxLines: 2,
        },
      },
    },
    {
      code: `
        /** This is a description of some function!*/


        function someFunction() {}
      `,
      errors: [
        {
          line: 2,
          message: 'There should be no extra lines above structures with JSDoc blocks',
        },
      ],
      options: [
        {
          preferMinLines: true,
        },
      ],
      output: `
        /** This is a description of some function!*/
        function someFunction() {}
      `,
      settings: {
        jsdoc: {
          maxLines: 2,
          minLines: 1,
        },
      },
    },
    {
      code: `
        /** @typedef SomeType */

        function someFunction() {}
      `,
      errors: [
        {
          line: 2,
          message: 'There should be no extra lines above structures with JSDoc blocks',
        },
      ],
      options: [
        {
          exemptedBy: [
            'function',
          ],
          overrideDefaultExemptions: true,
        },
      ],
      output: `
        /** @typedef SomeType */
        function someFunction() {}
      `,
    },
  ],
  valid: [
    {
      code: 'function someFunction() {}',
    },
    {
      code: '/** JSDoc */ function someFunction() {}',
    },
    {
      code: `
        /** This is a description of some function! */
        // extra comment
        function someFunction() {}
      `,
    },
    {
      code: `
        /** Standalone comment (e.g. a type definition) */

        /** The actual description */
        function someFunction() {}
      `,
    },
    {
      code: `
        /* Regular block comment */

        function someFunction() {}
      `,
    },
    {
      code: `
        // Regular line comment

        function someFunction() {}
      `,
    },
    {
      code: `
        /** This is a description of some function!*/

        function someFunction() {}
      `,
      settings: {
        jsdoc: {
          maxLines: 2,
        },
      },
    },

    {
      code: `
        /** @typedef {string} SomeType */

        function someFunction() {}
      `,
    },
    {
      code: `
        /** @function SomeType */

        function someFunction() {}
      `,
      options: [
        {
          exemptedBy: [
            'function',
          ],
        },
      ],
    },
    {
      code: `
        /**
         * JSDoc block at top of file without import declaration context.
         */

        import {sth} from 'sth';
      `,
    },
  ],
};
