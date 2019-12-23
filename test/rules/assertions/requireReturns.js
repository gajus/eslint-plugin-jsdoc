export default {
  invalid: [
    {
      code: `
          /**
           *
           */
          function quux (foo) {

            return foo;
          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @returns declaration.',
        },
      ],
    },
    {
      code: `
          /**
           *
           */
          const foo = () => ({
            bar: 'baz'
          })
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @returns declaration.',
        },
      ],
    },
    {
      code: `
          /**
           *
           */
          const foo = bar=>({ bar })
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @returns declaration.',
        },
      ],
    },
    {
      code: `
          /**
           *
           */
          const foo = bar => bar.baz()
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @returns declaration.',
        },
      ],
    },
    {
      code: `
          /**
           *
           */
          function quux (foo) {

            return foo;
          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @return declaration.',
        },
      ],
      settings: {
        jsdoc: {
          tagNamePreference: {
            returns: 'return',
          },
        },
      },
    },
    {
      code: `
          /**
           *
           */
          function foo() {}

          /**
           *
           */
          function bar() {}
          `,
      errors: [
        {
          message: '`settings.jsdoc.forceRequireReturn` has been removed, use options in the rule `require-returns` instead.',
        },
      ],
      settings: {
        jsdoc: {
          forceRequireReturn: true,
        },
      },
    },
    {
      code: `
          /**
           *
           */
          async function quux() {
          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @returns declaration.',
        },
      ],
      options: [{
        forceRequireReturn: true,
      }],
      parserOptions: {
        ecmaVersion: 8,
      },
    },
    {
      code: `
          /**
           *
           */
          const quux = async function () {}
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @returns declaration.',
        },
      ],
      options: [{
        forceRequireReturn: true,
      }],
      parserOptions: {
        ecmaVersion: 8,
      },
    },
    {
      code: `
          /**
           *
           */
          const quux = async () => {}
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @returns declaration.',
        },
      ],
      options: [{
        forceRequireReturn: true,
      }],
      parserOptions: {
        ecmaVersion: 8,
      },
    },
    {
      code: `
           /**
            *
            */
           async function quux () {}
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @returns declaration.',
        },
      ],
      options: [{
        forceRequireReturn: true,
      }],
      parserOptions: {
        ecmaVersion: 8,
      },
    },
    {
      code: `
          /**
           *
           */
          function quux () {
          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @returns declaration.',
        },
      ],
      options: [{
        forceRequireReturn: true,
      }],
    },
    {
      code: `
      const language = {
        /**
         * @param {string} name
         */
        get name() {
          return this._name;
        }
      }
      `,
      errors: [
        {
          line: 3,
          message: 'Missing JSDoc @returns declaration.',
        },
      ],
    },
    {
      code: `
          /**
           *
           */
          async function quux () {
          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @returns declaration.',
        },
      ],
      options: [{
        forceReturnsWithAsync: true,
      }],
      parserOptions: {
        ecmaVersion: 8,
      },
    },
    {
      code: `
          /**
           * @returns {undefined}
           * @returns {void}
           */
          function quux (foo) {

            return foo;
          }
      `,
      errors: [
        {
          line: 2,
          message: 'Found more than one @returns declaration.',
        },
      ],
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
          message: 'Unexpected tag `@returns`',
        },
      ],
      settings: {
        jsdoc: {
          tagNamePreference: {
            returns: false,
          },
        },
      },
    },
    {
      code: `
          /**
           * @param foo
           */
          function quux (foo) {
            return 'bar';
          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @returns declaration.',
        },
      ],
      options: [
        {
          exemptedBy: ['notPresent'],
        },
      ],
    },
    {
      code: `
      /**
       * @param {array} a
       */
      async function foo(a) {
        return;
      }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @returns declaration.',
        },
      ],
      options: [{
        forceReturnsWithAsync: true,
      }],
      parserOptions: {
        ecmaVersion: 8,
      },
    },
    {
      code: `
      /**
       * @param {array} a
       */
      async function foo(a) {
        return Promise.all(a);
      }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @returns declaration.',
        },
      ],
      options: [{
        forceReturnsWithAsync: true,
      }],
      parserOptions: {
        ecmaVersion: 8,
      },
    },
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
      `,
    },
    {
      code: `
          /**
           *
           */
          function quux () {
          }
      `,
    },
    {
      code: `
          /**
           *
           */
          function quux (bar) {
            bar.filter(baz => {
              return baz.corge();
            })
          }
      `,
    },
    {
      code: `
          /**
           * @returns Array
           */
          function quux (bar) {
            return bar.filter(baz => {
              return baz.corge();
            })
          }
      `,
    },
    {
      code: `
          /**
           * @returns Array
           */
          const quux = (bar) => bar.filter(({ corge }) => corge())
      `,
    },
    {
      code: `
          /**
           * @inheritdoc
           */
          function quux (foo) {
          }
      `,
    },
    {
      code: `
          /**
           * @override
           */
          function quux (foo) {
          }
      `,
    },
    {
      code: `
          /**
           * @constructor
           */
          function quux (foo) {
          }
      `,
    },
    {
      code: `
          /**
           * @implements
           */
          function quux (foo) {
          }
      `,
    },
    {
      code: `
          /**
           * @override
           */
          function quux (foo) {

            return foo;
          }
      `,
    },
    {
      code: `
          /**
           * @class
           */
          function quux (foo) {

          }
      `,
    },
    {
      code: `
          /**
           * @constructor
           */
          function quux (foo) {

          }
      `,
    },
    {
      code: `
          /**
           * @returns {Object}
           */
          function quux () {

            return {a: foo};
          }
      `,
    },
    {
      code: `
          /**
           * @returns {Object}
           */
          const quux = () => ({a: foo});
      `,
    },
    {
      code: `
          /**
           * @returns {Object}
           */
          const quux = () => {
            return {a: foo}
          };
      `,
    },
    {
      code: `
          /**
           * @returns {void}
           */
          function quux () {
          }
      `,
    },
    {
      code: `
          /**
           * @returns {void}
           */
          const quux = () => {

          }
      `,
    },
    {
      code: `
          /**
           * @returns {undefined}
           */
          function quux () {
          }
      `,
    },
    {
      code: `
          /**
           * @returns {undefined}
           */
          const quux = () => {

          }
      `,
    },
    {
      code: `
          /**
           *
           */
          function quux () {
          }
      `,
    },
    {
      code: `
          /**
           *
           */
          const quux = () => {

          }
      `,
    },
    {
      code: `
      class Foo {
        /**
         *
         */
        constructor () {
        }
      }
      `,
      options: [{
        forceRequireReturn: true,
      }],
    },
    {
      code: `
      const language = {
        /**
         * @param {string} name
         */
        set name(name) {
          this._name = name;
        }
      }
      `,
    },
    {
      code: `
          /**
           * @returns {void}
           */
          function quux () {
          }
      `,
      options: [{
        forceRequireReturn: true,
      }],
    },
    {
      code: `
          /**
           * @returns {void}
           */
          function quux () {
            return undefined;
          }
      `,
    },
    {
      code: `
          /**
           * @returns {void}
           */
          function quux () {
            return undefined;
          }
      `,
      options: [{
        forceRequireReturn: true,
      }],
    },
    {
      code: `
          /**
           * @returns {void}
           */
          function quux () {
            return;
          }
      `,
    },
    {
      code: `
          /**
           * @returns {void}
           */
          function quux () {
          }
      `,
      options: [{
        forceRequireReturn: true,
      }],
    },
    {
      code: `
          /**
           * @returns {void}
           */
          function quux () {
            return;
          }
      `,
      options: [{
        forceRequireReturn: true,
      }],
    },
    {
      code: `
          /** @type {RequestHandler} */
          function quux (req, res , next) {
            return;
          }
      `,
    },
    {
      code: `
          /**
           * @returns {Promise}
           */
          async function quux () {
          }
      `,
      options: [{
        forceRequireReturn: true,
      }],
      parserOptions: {
        ecmaVersion: 8,
      },
    },
    {
      code: `
          /**
           * @returns {Promise}
           */
          async function quux () {
          }
      `,
      options: [{
        forceReturnsWithAsync: true,
      }],
      parserOptions: {
        ecmaVersion: 8,
      },
    },
    {
      code: `
          /**
           *
           */
          async function quux () {}
      `,
      parserOptions: {
        ecmaVersion: 8,
      },
    },
    {
      code: `
          /**
           *
           */
          const quux = async function () {}
      `,
      parserOptions: {
        ecmaVersion: 8,
      },
    },
    {
      code: `
          /**
           *
           */
          const quux = async () => {}
      `,
      parserOptions: {
        ecmaVersion: 8,
      },
    },
    {
      code: `
      /** foo class */
      class foo {
        /** foo constructor */
        constructor () {
          // =>
          this.bar = true;
        }
      }

      export default foo;
      `,
      parserOptions: {
        sourceType: 'module',
      },
    },
    {
      code: `
          /**
           *
           */
          function quux () {
          }
      `,
      options: [{
        forceReturnsWithAsync: true,
      }],
    },
    {
      code: `
          /**
           * @type {MyCallback}
           */
          function quux () {

          }
      `,
      options: [
        {
          exemptedBy: ['type'],
        },
      ],
    },
    {
      code: `
      /**
       * @param {array} a
       */
      async function foo(a) {
        return Promise.all(a);
      }
      `,
      parserOptions: {
        ecmaVersion: 8,
      },
    },
    {
      code: `
      /**
       * @param {array} a
       */
      async function foo(a) {
        return;
      }
      `,
      parserOptions: {
        ecmaVersion: 8,
      },
    },
  ],
};
