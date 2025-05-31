export default /** @type {import('../index.js').TestCases} */ ({
  invalid: [
    {
      code: `
          /**
           *
           */
          function * quux (foo) {

            yield foo;
          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @yields declaration.',
        },
      ],
    },
    {
      code: `
          /**
           *
           */
          function * quux (foo) {
            someLabel: {
              yield foo;
            }
          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @yields declaration.',
        },
      ],
      ignoreReadme: true,
    },
    {
      code: `
          /**
           * @yields
           */
          function * quux (foo) {

            const retVal = yield foo;
          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @next declaration.',
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
           * @yields
           */
          function * quux (foo) {

            const retVal = yield;
          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @next declaration.',
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
           * @yields {void}
           */
          function * quux () {
          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @next declaration.',
        },
      ],
      options: [
        {
          forceRequireNext: true,
        },
      ],
    },
    {
      code: `
          /**
           * @yields {void}
           */
          function * quux () {
            yield;
          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @next declaration.',
        },
      ],
      options: [
        {
          forceRequireNext: true,
        },
      ],
    },
    {
      code: `
          /**
           *
           */
          function * quux (foo) {

            const a = yield foo;
          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @yields declaration.',
        },
      ],
    },
    {
      code: `
          /**
           *
           */
          function * quux (foo) {
            yield foo;
          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @yield declaration.',
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
           * @yields
           */
          function * quux (foo) {
            const val = yield foo;
          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @yield-returns declaration.',
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
           * @yields
           * @next
           */
          function * quux () {
            const ret = yield 5;
          }
      `,
      errors: [
        {
          line: 4,
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
           *
           */
          function * quux() {
            yield 5;
          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @yields declaration.',
        },
      ],
      languageOptions: {
        ecmaVersion: 8,
      },
      options: [
        {
          forceRequireYields: true,
        },
      ],
    },
    {
      code: `
          /**
           *
           */
          function * quux() {
            yield;
          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @yields declaration.',
        },
      ],
      languageOptions: {
        ecmaVersion: 8,
      },
      options: [
        {
          forceRequireYields: true,
        },
      ],
    },
    {
      code: `
          /**
           *
           */
          const quux = async function * () {
            yield;
          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @yields declaration.',
        },
      ],
      languageOptions: {
        ecmaVersion: 2_018,
      },
      options: [
        {
          forceRequireYields: true,
        },
      ],
    },
    {
      code: `
           /**
            *
            */
           async function * quux () {
             yield;
           }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @yields declaration.',
        },
      ],
      languageOptions: {
        ecmaVersion: 2_018,
      },
      options: [
        {
          forceRequireYields: true,
        },
      ],
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
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @yields declaration.',
        },
      ],
      options: [
        {
          contexts: [
            'any',
          ],
          forceRequireYields: true,
        },
      ],
    },
    {
      code: `
          /**
           * @function
           * @generator
           */
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @yields declaration.',
        },
      ],
      options: [
        {
          contexts: [
            'any',
          ],
          forceRequireYields: true,
        },
      ],
    },
    {
      code: `
          /**
           * @callback
           * @generator
           */
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @yields declaration.',
        },
      ],
      options: [
        {
          contexts: [
            'any',
          ],
          forceRequireYields: true,
        },
      ],
    },
    {
      code: `
          /**
           * @yields {undefined}
           * @yields {void}
           */
          function * quux (foo) {

            return foo;
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
           * @param foo
           */
          function * quux (foo) {
            yield 'bar';
          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @yields declaration.',
        },
      ],
      options: [
        {
          exemptedBy: [
            'notPresent',
          ],
        },
      ],
    },
    {
      code: `
      /**
       * @param {array} a
       */
      async function * foo(a) {
        return;
      }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @yields declaration.',
        },
      ],
      languageOptions: {
        ecmaVersion: 2_018,
      },
      options: [
        {
          forceRequireYields: true,
        },
      ],
    },
    {
      code: `
      /**
       * @param {array} a
       */
      async function * foo(a) {
        yield Promise.all(a);
      }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @yields declaration.',
        },
      ],
      languageOptions: {
        ecmaVersion: 2_018,
      },
      options: [
        {
          forceRequireYields: true,
        },
      ],
    },
    {
      code: `
      class quux {
        /**
         *
         */
        * quux () {
          yield;
        }
      }
      `,
      errors: [
        {
          line: 3,
          message: 'Missing JSDoc @yields declaration.',
        },
      ],
      options: [
        {
          contexts: [
            'any',
          ],
          forceRequireYields: true,
        },
      ],
    },
    {
      code: `
      /**
       * @param {array} a
       */
      async function * foo(a) {
        yield Promise.all(a);
      }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @yields declaration.',
        },
      ],
      languageOptions: {
        ecmaVersion: 2_018,
      },
    },
    {
      code: `
          /**
           * @generator
           */
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @yields declaration.',
        },
      ],
      languageOptions: {
        ecmaVersion: 2_018,
      },
      options: [
        {
          contexts: [
            'any',
          ],
          withGeneratorTag: true,
        },
      ],
    },
    {
      code: `
          /**
           * @generator
           * @yields
           */
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @next declaration.',
        },
      ],
      languageOptions: {
        ecmaVersion: 2_018,
      },
      options: [
        {
          contexts: [
            'any',
          ],
          nextWithGeneratorTag: true,
        },
      ],
    },
    {
      code: `
          /**
           *
           */
          function * quux () {
            if (true) {
              yield;
            }
            yield true;
          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @yields declaration.',
        },
      ],
    },
    {
      code: `
          /**
           *
           */
          function * quux () {
            if (yield false) {

            }
          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @yields declaration.',
        },
      ],
      ignoreReadme: true,
    },
    {
      code: `
          /**
           *
           */
          function * quux () {
            b ? yield false : true
          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @yields declaration.',
        },
      ],
      ignoreReadme: true,
    },
    {
      code: `
          /**
           *
           */
          function * quux () {
            try {
              yield true;
            } catch (err) {
            }
            yield;
          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @yields declaration.',
        },
      ],
    },
    {
      code: `
          /**
           *
           */
          function * quux () {
            try {
            } finally {
              yield true;
            }
            yield;
          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @yields declaration.',
        },
      ],
    },
    {
      code: `
          /**
           *
           */
          function * quux () {
            try {
              yield;
            } catch (err) {
            }
            yield true;
          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @yields declaration.',
        },
      ],
    },
    {
      code: `
          /**
           *
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
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @yields declaration.',
        },
      ],
    },
    {
      code: `
          /**
           *
           */
          function * quux () {
            switch (true) {
            case 'abc':
              yield true;
            }
            yield;
          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @yields declaration.',
        },
      ],
    },
    {
      code: `
          /**
           *
           */
          function * quux () {
            switch (true) {
            case 'abc':
              yield;
            }
            yield true;
          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @yields declaration.',
        },
      ],
    },
    {
      code: `
          /**
           *
           */
          function * quux () {
            for (const i of abc) {
              yield true;
            }
            yield;
          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @yields declaration.',
        },
      ],
    },
    {
      code: `
          /**
           *
           */
          function * quux () {
            for (const a in b) {
              yield true;
            }
          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @yields declaration.',
        },
      ],
    },
    {
      code: `
          /**
           *
           */
          function * quux () {
            for (let i=0; i<n; i+=1) {
              yield true;
            }
          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @yields declaration.',
        },
      ],
    },
    {
      code: `
          /**
           *
           */
          function * quux () {
            while(true) {
              yield true
            }
          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @yields declaration.',
        },
      ],
    },
    {
      code: `
          /**
           *
           */
          function * quux () {
            do {
              yield true
            }
            while(true)
          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @yields declaration.',
        },
      ],
    },
    {
      code: `
          /**
           *
           */
          function * quux () {
            if (true) {
              yield true;
            }
          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @yields declaration.',
        },
      ],
    },
    {
      code: `
          /**
           *
           */
          function * quux () {
            var a = {};
            with (a) {
              yield true;
            }
          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @yields declaration.',
        },
      ],
      languageOptions: {
        sourceType: 'script',
      },
    },
    {
      code: `
          /**
           *
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
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @yields declaration.',
        },
      ],
    },
    {
      code: `
          /**
           *
           */
          function * quux () {
            if (false) {
              return;
            }
            return yield true;
          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @yields declaration.',
        },
      ],
      ignoreReadme: true,
    },
    {
      code: `
          /**
           *
           */
          function * quux () {
            [yield true];
          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @yields declaration.',
        },
      ],
      ignoreReadme: true,
    },
    {
      code: `
          /**
           *
           */
          function * quux () {
            const [a = yield true] = [];
          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @yields declaration.',
        },
      ],
      ignoreReadme: true,
    },
    {
      code: `
          /**
           *
           */
          function * quux () {
            a || (yield true);
          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @yields declaration.',
        },
      ],
      ignoreReadme: true,
    },
    {
      code: `
          /**
           *
           */
          function * quux () {
            (r = yield true);
          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @yields declaration.',
        },
      ],
      ignoreReadme: true,
    },
    {
      code: `
          /**
           *
           */
          function * quux () {
            a + (yield true);
          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @yields declaration.',
        },
      ],
      ignoreReadme: true,
    },
    {
      code: `
          /**
           *
           */
          function * quux () {
            a, yield true;
          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @yields declaration.',
        },
      ],
      ignoreReadme: true,
    },
    {
      code: `
          /**
           *
           */
          function * quux () {
            +(yield);
            [...yield];
            [...+(yield true)];
          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @yields declaration.',
        },
      ],
      ignoreReadme: true,
    },
    {
      code: `
          /**
           *
           */
          function * quux () {
            someLabel: {
              yield true;
            }
          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @yields declaration.',
        },
      ],
      ignoreReadme: true,
    },
    {
      code: `
          /**
           *
           */
          function * quux () {
            var obj = {
              [someKey]: 'val',
              anotherKey: yield true
            }
          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @yields declaration.',
        },
      ],
      ignoreReadme: true,
    },
    {
      code: `
          /**
           *
           */
          function * quux () {
            var obj = {
              [yield true]: 'val',
            }
          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @yields declaration.',
        },
      ],
      ignoreReadme: true,
    },
    {
      code: `
          /**
           *
           */
          function * quux () {
            \`abc$\{yield true}\`;
          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @yields declaration.',
        },
      ],
      ignoreReadme: true,
    },
    {
      code: `
          /**
           *
           */
          function * quux () {
            tagTemp\`abc$\{yield true}\`;
          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @yields declaration.',
        },
      ],
      ignoreReadme: true,
    },
    {
      code: `
          /**
           *
           */
          function * quux () {
            a.b[yield true].c;
          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @yields declaration.',
        },
      ],
      ignoreReadme: true,
    },
    {
      code: `
          /**
           *
           */
          function * quux () {
            abc?.[yield true].d?.e(yield true);
          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @yields declaration.',
        },
      ],
      ignoreReadme: true,
      languageOptions: {
        ecmaVersion: 2_020,
      },
    },
    {
      code: `
          /**
           *
           */
          function * quux () {
            const [a = yield true] = arr;
          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @yields declaration.',
        },
      ],
      ignoreReadme: true,
    },
    {
      code: `
          /**
           *
           */
          function * quux () {
            const {a = yield true} = obj;
          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @yields declaration.',
        },
      ],
      ignoreReadme: true,
    },
    {
      code: `
          /**
           *
           */
          function * quux () {
            import(yield true);
          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @yields declaration.',
        },
      ],
      ignoreReadme: true,
      languageOptions: {
        ecmaVersion: 2_020,
      },
    },
    {
      code: `
          /**
           *
           */
          export function * quux () {
            yield true;
          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @yields declaration.',
        },
      ],
      ignoreReadme: true,
      languageOptions: {
        sourceType: 'module',
      },
      options: [
        {
          contexts: [
            'ExportNamedDeclaration',
          ],
        },
      ],
    },
    {
      code: `
          class A {
            /**
             *
             */
            * quux () {
              yield true;
            }
          }
      `,
      errors: [
        {
          line: 3,
          message: 'Missing JSDoc @yields declaration.',
        },
      ],
      ignoreReadme: true,
      languageOptions: {
        sourceType: 'module',
      },
      options: [
        {
          contexts: [
            'MethodDefinition > FunctionExpression',
          ],
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
           * @yields Foo.
           */
          function * quux () {

            yield foo;
          }
      `,
      options: [
        {
          contexts: [
            'any',
          ],
        },
      ],
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
           *
           */
          function quux (bar) {
            bar.doSomething(function * (baz) {
              yield baz.corge();
            })
          }
      `,
    },
    {
      code: `
          /**
           * @yields {Array}
           */
          function * quux (bar) {
            yield bar.doSomething(function * (baz) {
              yield baz.corge();
            })
          }
      `,
    },
    {
      code: `
          /**
           * @inheritdoc
           */
          function * quux (foo) {
          }
      `,
    },
    {
      code: `
          /**
           * @override
           */
          function * quux (foo) {
          }
      `,
    },
    {
      code: `
          /**
           * @constructor
           */
          function * quux (foo) {
          }
      `,
    },
    {
      code: `
          /**
           * @implements
           */
          function * quux (foo) {
            yield;
          }
      `,
    },
    {
      code: `
          /**
           * @override
           */
          function * quux (foo) {

            yield foo;
          }
      `,
    },
    {
      code: `
          /**
           * @class
           */
          function * quux (foo) {
            yield foo;
          }
      `,
    },
    {
      code: `
          /**
           * @yields {object}
           */
          function * quux () {

            yield {a: foo};
          }
      `,
    },
    {
      code: `
          /**
           * @yields {void}
           */
          function * quux () {
          }
      `,
    },
    {
      code: `
          /**
           * @yields {undefined}
           */
          function * quux () {
          }
      `,
    },
    {
      code: `
          /**
           * @yields {void}
           */
          function quux () {
          }
      `,
      options: [
        {
          forceRequireYields: true,
        },
      ],
    },
    {
      code: `
          /**
           * @yields {void}
           * @next {void}
           */
          function * quux () {
          }
      `,
      options: [
        {
          forceRequireNext: true,
        },
      ],
    },
    {
      code: `
          /**
           * @yields {void}
           */
          function * quux () {
            yield undefined;
          }
      `,
    },
    {
      code: `
          /**
           * @yields {void}
           */
          function * quux () {
            yield undefined;
          }
      `,
      options: [
        {
          forceRequireYields: true,
        },
      ],
    },
    {
      code: `
          /**
           * @yields {void}
           */
          function * quux () {
            yield;
          }
      `,
    },
    {
      code: `
          /**
           * @yields {void}
           */
          function * quux () {
          }
      `,
      options: [
        {
          forceRequireYields: true,
        },
      ],
    },
    {
      code: `
          /**
           * @yields {void}
           */
          function * quux () {
            yield;
          }
      `,
      options: [
        {
          forceRequireYields: true,
        },
      ],
    },
    {
      code: `
          /** @type {SpecialIterator} */
          function * quux () {
            yield 5;
          }
      `,
    },
    {
      code: `
          /**
           * @yields {Something}
           */
          async function * quux () {
          }
      `,
      languageOptions: {
        ecmaVersion: 2_018,
      },
      options: [
        {
          forceRequireYields: true,
        },
      ],
    },
    {
      code: `
          /**
           *
           */
          async function * quux () {}
      `,
      languageOptions: {
        ecmaVersion: 2_018,
      },
    },
    {
      code: `
          /**
           *
           */
          const quux = async function * () {}
      `,
      languageOptions: {
        ecmaVersion: 2_018,
      },
    },
    {
      code: `
          /**
           * @type {MyCallback}
           */
          function * quux () {
            yield;
          }
      `,
      options: [
        {
          exemptedBy: [
            'type',
          ],
        },
      ],
    },
    {
      code: `
      /**
       * @param {array} a
       */
      async function * foo (a) {
        yield;
      }
      `,
      languageOptions: {
        ecmaVersion: 2_018,
      },
    },
    {
      code: `
          /**
           *
           */
      `,
      options: [
        {
          contexts: [
            'any',
          ],
        },
      ],
    },
    {
      code: `
          /**
           * @function
           */
      `,
      options: [
        {
          contexts: [
            'any',
          ],
        },
      ],
    },
    {
      code: `
          /**
           * @function
           */
      `,
      options: [
        {
          forceRequireYields: true,
        },
      ],
    },
    {
      code: `
          /**
           * @callback
           */
      `,
      options: [
        {
          forceRequireYields: true,
        },
      ],
    },
    {
      code: `
          /**
           * @generator
           */
      `,
      options: [
        {
          withGeneratorTag: true,
        },
      ],
    },
    {
      code: `
          /**
           * @generator
           */
      `,
      options: [
        {
          nextWithGeneratorTag: true,
        },
      ],
    },
    {
      code: `
          /**
           * @generator
           * @yields
           */
      `,
      options: [
        {
          contexts: [
            'any',
          ],
          withGeneratorTag: true,
        },
      ],
    },
    {
      code: `
          /**
           * @generator
           * @yields
           * @next
           */
      `,
      options: [
        {
          contexts: [
            'any',
          ],
          nextWithGeneratorTag: true,
        },
      ],
    },
    {
      code: `
          /**
           * @generator
           */
      `,
      options: [
        {
          contexts: [
            'any',
          ],
          withGeneratorTag: false,
        },
      ],
    },
    {
      code: `
          /**
           * @generator
           * @yields
           */
      `,
      options: [
        {
          contexts: [
            'any',
          ],
          nextWithGeneratorTag: false,
        },
      ],
    },
    {
      code: `
          /**
           * @yields
           */
          function * quux (foo) {

            const a = yield foo;
          }
      `,
    },
    {
      code: `
          /**
           * @yields
           * @next
           */
          function * quux (foo) {
            let a = yield;
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
           * @yields
           * @next
           */
          function * quux (foo) {
            const a = yield foo;
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
           *
           */
      `,
      options: [
        {
          contexts: [
            'any',
          ],
          nextWithGeneratorTag: true,
        },
      ],
    },
    {
      code: `
          /**
           *
           */
      `,
      options: [
        {
          contexts: [
            'any',
          ],
          next: true,
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
      options: [
        {
          contexts: [
            'any',
          ],
          next: true,
        },
      ],
    },
    {
      code: `
          /**
           * @yields {void}
           */
          function * quux () {
            yield;
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
           *
           */
          function * quux (foo) {
            const a = function * bar () {
              yield foo;
            }
          }
      `,
    },
    {
      code: `
          /**
           *
           */
          export { foo } from "bar"
      `,
      options: [
        {
          contexts: [
            'ExportNamedDeclaration',
          ],
        },
      ],
    },
  ],
});
