export default /** @type {import('../index.js').TestCases} */ ({
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
           * A JSDoc not attached to any node.
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Expected JSDoc block to be aligned.',
        },
      ],
      output: `
        /**
         * A JSDoc not attached to any node.
         */
      `,
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
      output: `
        class Foo {
          /**
           *  Some method
           * @param a
           */
          quux(a) {}
        }
      `,
    },
    {
      code: `
export const myVar = {/**
  * This is JSDoc
  */
  myProperty: 'hello'
}`,
      errors: [
        {
          line: 3,
          message: 'Expected JSDoc block to be aligned.',
        },
      ],
      output: `
export const myVar = {/**
                       * This is JSDoc
                       */
  myProperty: 'hello'
}`,
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
      errors: [
        {
          line: 3,
          message: 'Expected JSDoc block to be aligned.',
        },
      ],
      options: [
        {
          innerIndent: 0,
        },
      ],
      output: `
        /**
        * @param {Number} foo
        * @access private
        */
        function quux (foo) {
          // with spaces
        }
      `,
    },
    {
      code: `
        /**
        Some desc.
        @param {Number} foo
        @access private
         */
        function quux (foo) {
          // with spaces
        }
      `,
      errors: [
        {
          line: 6,
          message: 'Expected JSDoc block to be aligned.',
        },
      ],
      options: [
        {
          innerIndent: 0,
        },
      ],
      output: `
        /**
        Some desc.
        @param {Number} foo
        @access private
        */
        function quux (foo) {
          // with spaces
        }
      `,
    },
    {
      code: `
        /**
         * @typedef {object} MyType
         * @property {string} [property]

         */
      `,
      errors: [
        {
          line: 5,
          message: 'Expected JSDoc block to be aligned.',
        },
      ],
      options: [
        {
          ignoreEmptyLines: false,
        },
      ],
      output: `
        /**
         * @typedef {object} MyType
         * @property {string} [property]
         ${''}
         */
      `,
    },
    {
      code: `
        /**
         * @typedef {object} MyType
         * @property {string} [property]
          *
         */
      `,
      errors: [
        {
          line: 5,
          message: 'Expected JSDoc block to be aligned.',
        },
      ],
      options: [
        {
          ignoreEmptyLines: true,
        },
      ],
      output: `
        /**
         * @typedef {object} MyType
         * @property {string} [property]
         *
         */
      `,
    },
    {
      code: 'class A {\r\n  /**\r\n   * Desc.\r\n\r\n   * More.\r\n   */\r\n  quux () {}\r\n}\r\n',
      errors: [
        {
          line: 4,
          message: 'Expected JSDoc block to be aligned.',
        },
      ],
      output: 'class A {\r\n  /**\r\n   * Desc.\r\n   \r\n   * More.\r\n   */\r\n  quux () {}\r\n}\r\n',
    },
    {
      code: '/**\r\n * Desc.\r\n\r\n * More.\r\n */\r\nfunction quux () {}\r\n',
      errors: [
        {
          line: 3,
          message: 'Expected JSDoc block to be aligned.',
        },
      ],
      output: '/**\r\n * Desc.\r\n \r\n * More.\r\n */\r\nfunction quux () {}\r\n',
    },
    {
      code: '/**\n * Desc.\n\n * More.\n  * @param a The a.\n */\nfunction quux (a) {}\n',
      errors: [
        {
          line: 5,
          message: 'Expected JSDoc block to be aligned.',
        },
      ],
      options: [
        {
          ignoreEmptyLines: true,
        },
      ],
      output: '/**\n * Desc.\n\n * More.\n * @param a The a.\n */\nfunction quux (a) {}\n',
    },
    {
      code: '/**\n * Desc.\n\n\n * More.\n * Other.\n  * @param a The a.\n */\nfunction quux (a) {}\n',
      errors: [
        {
          line: 7,
          message: 'Expected JSDoc block to be aligned.',
        },
      ],
      options: [
        {
          ignoreEmptyLines: true,
        },
      ],
      output: '/**\n * Desc.\n\n\n * More.\n * Other.\n * @param a The a.\n */\nfunction quux (a) {}\n',
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
      options: [
        {
          innerIndent: 0,
        },
      ],
    },
    {
      code: `
        /**
        Some desc.
        @param {Number} foo
        @access private
        */
        function quux (foo) {
          // with spaces
        }
      `,
      options: [
        {
          innerIndent: 0,
        },
      ],
    },
    {
      code: `
        /**
         * @typedef {object} MyType
         * @property {string} [property]

         */
      `,
      options: [
        {
          ignoreEmptyLines: true,
        },
      ],
    },
  ],
});
