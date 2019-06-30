export default {
  invalid: [
    {
      code: `
          /**
           * @returns
           */
          function quux (foo) {

          }
      `,
      errors: [
        {
          line: 2,
          message: 'JSDoc @returns declaration present but return expression not available in function.'
        }
      ]
    },
    {
      code: `
          /**
           * @return
           */
          function quux (foo) {

          }
      `,
      errors: [
        {
          line: 2,
          message: 'JSDoc @return declaration present but return expression not available in function.'
        }
      ],
      settings: {
        jsdoc: {
          tagNamePreference: {
            returns: 'return'
          }
        }
      }
    },
    {
      code: `
            /**
             * @returns
             */
            const quux = () => {}
        `,
      errors: [
        {
          line: 2,
          message: 'JSDoc @returns declaration present but return expression not available in function.'
        }
      ]
    },
    {
      code: `
          /**
           * @returns {undefined} Foo.
           * @returns {String} Foo.
           */
          function quux () {

            return foo;
          }
        `,
      errors: [
        {
          line: 2,
          message: 'Found more than one @returns declaration.'
        }
      ]
    },
    {
      code: `
      const language = {
        /**
         * @param {string} name
         * @returns {string}
         */
        get name() {
          this._name = name;
        }
      }
      `,
      errors: [
        {
          line: 3,
          message: 'JSDoc @returns declaration present but return expression not available in function.'
        }
      ]
    },
    {
      code: `
          class Foo {
            /**
             * @returns {string}
             */
            bar () {
            }
          }
      `,
      errors: [
        {
          line: 3,
          message: 'JSDoc @returns declaration present but return expression not available in function.'
        }
      ]
    },
    {
      code: `
          /**
           * @returns
           */
          function quux () {

          }
      `,
      errors: [
        {
          message: 'Unexpected tag `@returns`'
        }
      ],
      settings: {
        jsdoc: {
          tagNamePreference: {
            returns: false
          }
        }
      }
    }
  ],
  valid: [
    {
      code: `
          /**
           * @returns Foo.
           */
          function quux () {

            return foo;
          }
      `
    },
    {
      code: `
          /**
           * @returns {string} Foo.
           */
          function quux () {

            return foo;
          }
      `
    },
    {
      code: `
          /**
           * @returns {string} Foo.
           */
          function quux () {

            return foo;
          }
      `
    },
    {
      code: `
          /**
           *
           */
          function quux () {
          }
      `
    },
    {
      code: `
          /**
           * @returns {*} Foo.
           */
          const quux = () => foo;
      `
    },
    {
      code: `
          /**
           * @returns {undefined} Foo.
           */
          function quux () {}
      `
    },
    {
      code: `
          /**
           * @returns { void } Foo.
           */
          function quux () {}
      `
    },
    {
      code: `
          /**
           * @returns {Promise<void>}
           */
          async function quux() {}
      `,
      parserOptions: {
        ecmaVersion: 8
      }
    },
    {
      code: `
          /**
           * @returns {Promise<void>}
           */
          const quux = async function () {}
      `,
      parserOptions: {
        ecmaVersion: 8
      }
    },
    {
      code: `
          /**
           * @returns {Promise<void>}
           */
          const quux = async () => {}
      `,
      parserOptions: {
        ecmaVersion: 8
      }
    },
    {
      code: `
          /**
           * @returns Foo.
           * @abstract
           */
          function quux () {
            throw new Error('must be implemented by subclass!');
          }
      `
    },
    {
      code: `
          /**
           * @returns Foo.
           * @virtual
           */
          function quux () {
            throw new Error('must be implemented by subclass!');
          }
      `
    },
    {
      code: `
          /**
           * @returns Foo.
           * @constructor
           */
          function quux () {
          }
      `
    },
    {
      code: `
          /**
           * @interface
           */
          class Foo {
            /**
             * @returns {string}
             */
            bar () {
            }
          }
      `
    },
    {
      code: `
          /**
           * @returns {undefined} Foo.
           */
          function quux () {
          }
      `
    },
    {
      code: `
          /**
           * @returns {void} Foo.
           */
          function quux () {
          }
      `
    },
    {
      code: `
          /**
           * @returns {void} Foo.
           */
          function quux () {
            return undefined;
          }
      `
    },
    {
      code: `
          /**
           * @returns {void} Foo.
           */
          function quux () {
            return;
          }
      `
    },
    {
      code: `
          /**
           *
           */
          function quux () {
            return undefined;
          }
      `
    },
    {
      code: `
          /**
           *
           */
          function quux () {
            return;
          }
      `
    },
    {
      code: `
          /**
           * @returns {true}
           */
          function quux () {
            try {
              return true;
            } catch (err) {
            }
            return;
          }
      `
    },
    {
      code: `
          /**
           * @returns {true}
           */
          function quux () {
            try {
            } finally {
              return true;
            }
            return;
          }
      `
    },
    {
      code: `
          /**
           * @returns {true}
           */
          function quux () {
            try {
              return;
            } catch (err) {
            }
            return true;
          }
      `
    },
    {
      code: `
          /**
           * @returns {true}
           */
          function quux () {
            try {
              something();
            } catch (err) {
              return true;
            }
            return;
          }
      `
    },
    {
      code: `
          /**
           * @returns {true}
           */
          function quux () {
            switch (true) {
            case 'abc':
              return true;
            }
            return;
          }
      `
    },
    {
      code: `
          /**
           * @returns {true}
           */
          function quux () {
            switch (true) {
            case 'abc':
              return;
            }
            return true;
          }
      `
    },
    {
      code: `
          /**
           * @returns {true}
           */
          function quux () {
            for (const i of abc) {
              return true;
            }
            return;
          }
      `
    },
    {
      code: `
          /**
           * @returns {true}
           */
          function quux () {
            if (true) {
              return;
            }
            return true;
          }
      `
    },
    {
      code: `
          /**
           * @returns {true}
           */
          function quux () {
            if (true) {
              return true;
            }
          }
      `
    },
    {
      code: `
          /**
           * @returns {true}
           */
          function quux () {
            if (true) {
              return;
            } else {
              return true;
            }
            return;
          }
      `
    }
  ]
};
