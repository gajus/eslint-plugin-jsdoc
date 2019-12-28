export default {
  invalid: [
    {
      code: `
        /**
          * @param {Number} foo
         */
        function quux (foo) {
          // with spaces
        }
      `,
      errors: [
        {
          line: 3,
          message: 'Expected JSDoc block to be aligned.',
        },
      ],
      output: `
        /**
         * @param {Number} foo
         */
        function quux (foo) {
          // with spaces
        }
      `,
    },
    {
      code: `
\t\t\t\t/**
\t\t\t\t  * @param {Number} foo
\t\t\t\t */
\t\t\t\tfunction quux (foo) {
\t\t\t\t\t// with tabs
\t\t\t\t}
      `,
      errors: [
        {
          line: 3,
          message: 'Expected JSDoc block to be aligned.',
        },
      ],
      output: `
\t\t\t\t/**
\t\t\t\t * @param {Number} foo
\t\t\t\t */
\t\t\t\tfunction quux (foo) {
\t\t\t\t\t// with tabs
\t\t\t\t}
      `,
    },
    {
      code: `
/**
  * @param {Number} foo
 */
function quux (foo) {
  // with spaces
}
      `,
      errors: [
        {
          line: 3,
          message: 'Expected JSDoc block to be aligned.',
        },
      ],
      output: `
/**
 * @param {Number} foo
 */
function quux (foo) {
  // with spaces
}
      `,
    },
    {
      code: `
/**
* @param {Number} foo
*/
function quux (foo) {
  // with spaces
}
      `,
      errors: [
        {
          line: 3,
          message: 'Expected JSDoc block to be aligned.',
        },
      ],
      output: `
/**
 * @param {Number} foo
 */
function quux (foo) {
  // with spaces
}
      `,
    },
    {
      code: `
        /**
         * @param {Number} foo
          */
        function quux (foo) {

        }
      `,
      errors: [
        {
          line: 4,
          message: 'Expected JSDoc block to be aligned.',
        },
      ],
      output: `
        /**
         * @param {Number} foo
         */
        function quux (foo) {

        }
      `,
    },
    {
      code: `
         /**
         * @param {Number} foo
         */
        function quux (foo) {

        }
      `,
      errors: [
        {
          line: 3,
          message: 'Expected JSDoc block to be aligned.',
        },
      ],
      output: `
         /**
          * @param {Number} foo
          */
        function quux (foo) {

        }
      `,
    },
    {
      code: `
         /**
          * @param {Number} foo
         */
        function quux (foo) {

        }
      `,
      errors: [
        {
          line: 4,
          message: 'Expected JSDoc block to be aligned.',
        },
      ],
      output: `
         /**
          * @param {Number} foo
          */
        function quux (foo) {

        }
      `,
    },
    {
      code: `
       /**
         * @param {Number} foo
         */
        function quux (foo) {

        }
      `,
      errors: [
        {
          line: 3,
          message: 'Expected JSDoc block to be aligned.',
        },
      ],
      output: `
       /**
        * @param {Number} foo
        */
        function quux (foo) {

        }
      `,
    },
    {
      code: `
        /**
           * A jsdoc not attached to any node.
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Expected JSDoc block to be aligned.',
        },
      ],
    },
    {
      code: `
        class Foo {
          /**
           *  Some method
            * @param a
           */
          quux(a) {}
        }
      `,
      errors: [
        {
          line: 5,
          message: 'Expected JSDoc block to be aligned.',
        },
      ],
    },
  ],
  valid: [
    {
      code: `
        /**
         * Desc
         *
         * @param {Number} foo
         */
        function quux (foo) {

        }
      `,
    },
    {
      code: `
        /**
         * Desc
         *
         * @param {{
          foo: Bar,
          bar: Baz
         * }} foo
         *
         */
        function quux (foo) {

        }
      `,
    },
    {
      code: `
        /*  <- JSDoc must start with 2 stars.
          *    So this is unchecked.
         */
        function quux (foo) {}
      `,
    },
    {
      code: `
        /**
          * @param {Number} foo
          * @private
         */
        function quux (foo) {
          // with spaces
        }
      `,
      settings: {
        jsdoc: {
          ignorePrivate: true,
        },
      },
    },
    {
      code: `
        /**
          * @param {Number} foo
          * @access private
         */
        function quux (foo) {
          // with spaces
        }
      `,
      settings: {
        jsdoc: {
          ignorePrivate: true,
        },
      },
    },
  ],
};
