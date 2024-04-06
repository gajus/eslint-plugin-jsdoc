export default {
  invalid: [
    {
      code: `
          /**
           * @yields
           */
          function * quux (foo) {

          }
      `,
      errors: [
        {
          line: 2,
          message: 'JSDoc @yields declaration present but yield expression not available in function.',
        },
      ],
    },
    {
      code: `
          /**
           * @yields
           */
          function quux (foo) {

          }
      `,
      errors: [
        {
          line: 2,
          message: 'JSDoc @yields declaration present but yield expression not available in function.',
        },
      ],
      options: [
        {
          checkGeneratorsOnly: true,
        },
      ],
    },
    {
      code: `
          /**
           * @next
           */
          function quux (foo) {

          }
      `,
      errors: [
        {
          line: 2,
          message: 'JSDoc @next declaration present but yield expression with return value not available in function.',
        },
      ],
      options: [
        {
          checkGeneratorsOnly: true,
          next: true,
        },
      ],
    },
    {
      code: `
          /**
           * @next {SomeType}
           */
          function * quux (foo) {

          }
      `,
      errors: [
        {
          line: 2,
          message: 'JSDoc @next declaration present but yield expression with return value not available in function.',
        },
      ],
      options: [
        {
          next: true,
        },
      ],
    },
    {
      code: `
          /**
           * @next {SomeType}
           */
          function * quux (foo) {
            yield;
          }
      `,
      errors: [
        {
          line: 2,
          message: 'JSDoc @next declaration present but yield expression with return value not available in function.',
        },
      ],
      options: [
        {
          next: true,
        },
      ],
    },
    {
      code: `
          /**
           * @next {SomeType}
           */
          function * quux (foo) {
            yield 5;
          }
      `,
      errors: [
        {
          line: 2,
          message: 'JSDoc @next declaration present but yield expression with return value not available in function.',
        },
      ],
      options: [
        {
          next: true,
        },
      ],
    },
    {
      code: `
          /**
           * @yield
           */
          function * quux (foo) {

          }
      `,
      errors: [
        {
          line: 2,
          message: 'JSDoc @yield declaration present but yield expression not available in function.',
        },
      ],
      settings: {
        jsdoc: {
          tagNamePreference: {
            yields: 'yield',
          },
        },
      },
    },
    {
      code: `
          /**
           * @yield-returns {Something}
           */
          function * quux (foo) {
            yield;
          }
      `,
      errors: [
        {
          line: 2,
          message: 'JSDoc @yield-returns declaration present but yield expression with return value not available in function.',
        },
      ],
      options: [
        {
          next: true,
        },
      ],
      settings: {
        jsdoc: {
          tagNamePreference: {
            next: 'yield-returns',
          },
        },
      },
    },
    {
      code: `
          /**
           * @yields {undefined} Foo.
           * @yields {String} Foo.
           */
          function * quux () {

            yield foo;
          }
        `,
      errors: [
        {
          line: 2,
          message: 'Found more than one @yields declaration.',
        },
      ],
    },
    {
      code: `
          class Foo {
            /**
             * @yields {string}
             */
            * bar () {
            }
          }
      `,
      errors: [
        {
          line: 3,
          message: 'JSDoc @yields declaration present but yield expression not available in function.',
        },
      ],
    },
    {
      code: `
          /**
           * @yields
           */
          function * quux () {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Unexpected tag `@yields`',
        },
      ],
      settings: {
        jsdoc: {
          tagNamePreference: {
            yields: false,
          },
        },
      },
    },
    {
      code: `
          /**
           * @next
           */
          function * quux () {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Unexpected tag `@next`',
        },
      ],
      options: [
        {
          next: true,
        },
      ],
      settings: {
        jsdoc: {
          tagNamePreference: {
            next: false,
          },
        },
      },
    },
    {
      code: `
        /**
         * @yields {string}
         */
        function * f () {
          function * g() {
            yield 'foo'
          }
        }
      `,
      errors: [
        {
          line: 2,
          message: 'JSDoc @yields declaration present but yield expression not available in function.',
        },
      ],
    },
    {
      code: `
          /**
           * @yields {Promise<void>}
           */
          async function * quux() {}
      `,
      errors: [
        {
          line: 2,
          message: 'JSDoc @yields declaration present but yield expression not available in function.',
        },
      ],
      languageOptions: {
        ecmaVersion: 2_018,
      },
    },
    {
      code: `
          /**
           * @yields {Promise<void>}
           */
          const quux = async function * () {}
      `,
      errors: [
        {
          line: 2,
          message: 'JSDoc @yields declaration present but yield expression not available in function.',
        },
      ],
      languageOptions: {
        ecmaVersion: 2_018,
      },
    },
    {
      code: `
          /**
           * @yields {never} Foo.
           */
          function * quux () {
            yield 5;
          }
      `,
      errors: [
        {
          line: 2,
          message: 'JSDoc @yields declaration set with "never" but yield expression is present in function.',
        },
      ],
    },
    {
      code: `
          /**
           * @next {never}
           */
          function * quux (foo) {
            const a = yield;
          }
      `,
      errors: [
        {
          line: 2,
          message: 'JSDoc @next declaration set with "never" but yield expression with return value is present in function.',
        },
      ],
      options: [
        {
          next: true,
        },
      ],
    },
  ],
  valid: [
    {
      code: `
          /**
           * @yields Foo.
           */
          function * quux () {

            yield foo;
          }
      `,
    },
    {
      code: `
          /**
           * @yields {string} Foo.
           */
          function * quux () {

            yield foo;
          }
      `,
    },
    {
      code: `
          /**
           *
           */
          function * quux () {
          }
      `,
    },
    {
      code: `
          /**
           * @yields {undefined} Foo.
           */
          function * quux () {}
      `,
    },
    {
      code: `
          /**
           * @yields { void } Foo.
           */
          function quux () {}
      `,
    },
    {
      code: `
          /**
           * @yields Foo.
           * @abstract
           */
          function * quux () {
            throw new Error('must be implemented by subclass!');
          }
      `,
    },
    {
      code: `
          /**
           * @yields Foo.
           * @virtual
           */
          function * quux () {
            throw new Error('must be implemented by subclass!');
          }
      `,
    },
    {
      code: `
          /**
           * @yields Foo.
           * @constructor
           */
          function * quux () {
          }
      `,
    },
    {
      code: `
          /**
           * @interface
           */
          class Foo {
            /**
             * @yields {string}
             */
            * bar () {
            }
          }
      `,
    },
    {
      code: `
          /**
           * @record
           */
          class Foo {
            /**
             * @yields {string}
             */
            * bar () {
            }
          }
      `,
      settings: {
        jsdoc: {
          mode: 'closure',
        },
      },
    },
    {
      code: `
          /**
           * @yields {undefined} Foo.
           */
          function * quux () {
          }
      `,
    },
    {
      code: `
          /**
           * @yields {void} Foo.
           */
          function * quux () {
          }
      `,
    },
    {
      code: `
          /**
           * @yields {never} Foo.
           */
          function * quux () {
          }
      `,
    },
    {
      code: `
          /**
           * @yields {void} Foo.
           */
          function * quux () {
            yield undefined;
          }
      `,
    },
    {
      code: `
          /**
           * @yields {void} Foo.
           */
          function * quux () {
            yield;
          }
      `,
    },
    {
      code: `
          /**
           *
           */
          function * quux () {
            yield undefined;
          }
      `,
    },
    {
      code: `
          /**
           *
           */
          function * quux () {
            yield;
          }
      `,
    },
    {
      code: `
          /**
           * @yields {true}
           */
          function * quux () {
            try {
              yield true;
            } catch (err) {
            }
            yield;
          }
      `,
    },
    {
      code: `
          /**
           * @yields {true}
           */
          function * quux () {
            try {
            } finally {
              yield true;
            }
            yield;
          }
      `,
    },
    {
      code: `
          /**
           * @yields {true}
           */
          function * quux () {
            try {
              yield;
            } catch (err) {
            }
            yield true;
          }
      `,
    },
    {
      code: `
          /**
           * @yields {true}
           */
          function * quux () {
            try {
              something();
            } catch (err) {
              yield true;
            }
            yield;
          }
      `,
    },
    {
      code: `
          /**
           * @yields {true}
           */
          function * quux () {
            switch (true) {
            case 'abc':
              yield true;
            }
            yield;
          }
      `,
    },
    {
      code: `
          /**
           * @yields {true}
           */
          function * quux () {
            switch (true) {
            case 'abc':
              yield;
            }
            yield true;
          }
      `,
    },
    {
      code: `
          /**
           * @yields {true}
           */
          function * quux () {
            for (const i of abc) {
              yield true;
            }
            yield;
          }
      `,
    },
    {
      code: `
          /**
           * @yields {true}
           */
          function * quux () {
            for (const a in b) {
              yield true;
            }
          }
      `,
    },
    {
      code: `
          /**
           * @yields {true}
           */
          function * quux () {
            for (let i=0; i<n; i+=1) {
              yield true;
            }
          }
      `,
    },
    {
      code: `
          /**
           * @yields {true}
           */
          function * quux () {
            while(true) {
              yield true
            }
          }
      `,
    },
    {
      code: `
          /**
           * @yields {true}
           */
          function * quux () {
            do {
              yield true
            }
            while(true)
          }
      `,
    },
    {
      code: `
          /**
           * @yields {true}
           */
          function * quux () {
            if (true) {
              yield;
            }
            yield true;
          }
      `,
    },
    {
      code: `
          /**
           * @yields {true}
           */
          function * quux () {
            if (true) {
              yield true;
            }
          }
      `,
    },
    {
      code: `
          /**
           * @yields {true}
           */
          function * quux () {
            var a = {};
            with (a) {
              yield true;
            }
          }
      `,
      languageOptions: {
        sourceType: 'script'
      }
    },
    {
      code: `
          /**
           * @yields {true}
           */
          function * quux () {
            if (true) {
              yield;
            } else {
              yield true;
            }
            yield;
          }
      `,
    },
    {
      code: `
          /**
           * @next {void}
           */
          function * quux (foo) {

          }
      `,
      options: [
        {
          next: true,
        },
      ],
    },
    {
      code: `
          /**
           * @next {SomeType}
           */
          function * quux (foo) {
            const a = yield;
          }
      `,
      options: [
        {
          next: true,
        },
      ],
    },
    {
      code: `
          /**
           * @next {SomeType}
           */
          function * quux (foo) {
            const a = yield 5;
          }
      `,
      options: [
        {
          next: true,
        },
      ],
    },
    {
      code: `
          /**
           * @next {never}
           */
          function * quux (foo) {

          }
      `,
      options: [
        {
          next: true,
        },
      ],
    },
  ],
};
