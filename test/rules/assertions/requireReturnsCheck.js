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
          message: 'Present JSDoc @returns declaration but not available return expression in function.'
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
          message: 'Present JSDoc @return declaration but not available return expression in function.'
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
          message: 'Present JSDoc @returns declaration but not available return expression in function.'
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
           * @returns {void} Foo.
           */
          function quux () {

            return foo;
          }
      `
    },
    {
      code: `
          /**
           * @returns {undefined} Foo.
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
          async () => {}
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
    }
  ]
};
