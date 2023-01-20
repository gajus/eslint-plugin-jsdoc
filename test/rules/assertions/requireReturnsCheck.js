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
          message: 'JSDoc @returns declaration present but return expression not available in function.',
        },
      ],
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
          message: 'JSDoc @return declaration present but return expression not available in function.',
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
             * @returns
             */
            const quux = () => {}
        `,
      errors: [
        {
          line: 2,
          message: 'JSDoc @returns declaration present but return expression not available in function.',
        },
      ],
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
          message: 'Found more than one @returns declaration.',
        },
      ],
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
          message: 'JSDoc @returns declaration present but return expression not available in function.',
        },
      ],
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
          message: 'JSDoc @returns declaration present but return expression not available in function.',
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
          line: 3,
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
         * @returns {string}
         */
        function f () {
          function g() {
            return 'foo'
          }

          () => {
            return 5
          }
        }
      `,
      errors: [
        {
          line: 2,
          message: 'JSDoc @returns declaration present but return expression not available in function.',
        },
      ],
    },
    {
      code: `
          /**
           * @returns {Promise<void>}
           */
          async function quux() {}
      `,
      errors: [
        {
          line: 2,
          message: 'JSDoc @returns declaration present but return expression not available in function.',
        },
      ],
      options: [
        {
          exemptAsync: false,
        },
      ],
      parserOptions: {
        ecmaVersion: 8,
      },
    },
    {
      code: `
          /**
           * @returns {IterableIterator<any>}
           */
          function * quux() {}
      `,
      errors: [
        {
          line: 2,
          message: 'JSDoc @returns declaration present but return expression not available in function.',
        },
      ],
      parserOptions: {
        ecmaVersion: 8,
      },
      settings: {
        jsdoc: {
          mode: 'jsdoc',
        },
      },
    },
    {
      code: `
          /**
           * @returns {IterableIterator<any>}
           */
          function * quux() {}
      `,
      errors: [
        {
          line: 2,
          message: 'JSDoc @returns declaration present but return expression not available in function.',
        },
      ],
      options: [
        {
          exemptGenerators: false,
        },
      ],
      parserOptions: {
        ecmaVersion: 8,
      },
      settings: {
        jsdoc: {
          mode: 'typescript',
        },
      },
    },
    {
      code: `
          /**
           * @returns {Promise<void>}
           */
          function quux() {
            return new Promise((resolve, reject) => {})
          }
      `,
      errors: [
        {
          line: 2,
          message: 'JSDoc @returns declaration present but return expression not available in function.',
        },
      ],
      options: [
        {
          exemptAsync: false,
        },
      ],
    },
    {
      code: `
          /**
           * @returns {Promise<void>}
           */
          function quux() {
            return new Promise((resolve, reject) => {
              setTimeout(() => {
                resolve();
              });
            })
          }
      `,
      errors: [
        {
          line: 2,
          message: 'JSDoc @returns declaration present but return expression not available in function.',
        },
      ],
      options: [
        {
          exemptAsync: false,
        },
      ],
    },
    {
      code: `
        /**
         * Description.
         * @returns {string}
         */
        async function foo() {
          return new Promise(resolve => resolve());
        }
      `,
      errors: [
        {
          line: 2,
          message: 'JSDoc @returns declaration present but return expression not available in function.',
        },
      ],
      options: [
        {
          exemptAsync: false,
        },
      ],
      parserOptions: {
        ecmaVersion: 8,
      },
    },
    {
      code: `
        /**
         * Description.
         * @returns {void}
         */
        async function foo() {
          return new Promise(resolve => resolve());
        }
      `,
      errors: [
        {
          line: 2,
          message: 'JSDoc @returns declaration present but return expression not available in function.',
        },
      ],
      options: [
        {
          exemptAsync: false,
          reportMissingReturnForUndefinedTypes: true,
        },
      ],
      parserOptions: {
        ecmaVersion: 8,
      },
    },
    {
      code: `
          /**
           * @returns { void } Foo.
           */
          function quux () {}
      `,
      errors: [
        {
          line: 2,
          message: 'JSDoc @returns declaration present but return expression not available in function.',
        },
      ],
      options: [
        {
          reportMissingReturnForUndefinedTypes: true,
        },
      ],
    },
    {
      code: `
          /**
           * @returns {never} Foo.
           */
          function quux () {
            return undefined;
          }
      `,
      errors: [
        {
          line: 2,
          message: 'JSDoc @returns declaration set with "never" but return expression is present in function.',
        },
      ],
    },
    {
      code: `
          /**
           * @returns {never}
           */
          function quux (foo) {
            return foo;
          }
      `,
      errors: [
        {
          line: 2,
          message: 'JSDoc @returns declaration set with "never" but return expression is present in function.',
        },
      ],
    },
    {
      code: `
      /**
       * Reads a test fixture.
       *
       * @param path The path to resolve relative to the fixture base. It will be normalized for the
       * operating system.
       *
       * @returns The file contents as buffer.
       */
      export function readFixture(path: string): void;
      `,
      errors: [
        {
          line: 2,
          message: 'JSDoc @returns declaration present but return expression not available in function.',
        },
      ],
      parser: require.resolve('@typescript-eslint/parser'),
    },
    {
      code: `
      /**
       * Reads a test fixture.
       *
       * @param path The path to resolve relative to the fixture base. It will be normalized for the
       * operating system.
       *
       * @returns The file contents as buffer.
       */
      export function readFixture(path: string);
      `,
      errors: [
        {
          line: 2,
          message: 'JSDoc @returns declaration present but return expression not available in function.',
        },
      ],
      parser: require.resolve('@typescript-eslint/parser'),
    },
    {
      code: `
      /**
       * @returns {SomeType}
       */
      function quux (path) {
        if (true) {
          return;
        }
        return 15;
      };
      `,
      errors: [
        {
          line: 2,
          message: 'JSDoc @returns declaration present but return expression not available in function.',
        },
      ],
    },
    {
      code: `
      /**
       * Reads a test fixture.
       *
       * @param path The path to resolve relative to the fixture base. It will be normalized for the
       * operating system.
       *
       * @returns The file contents as buffer.
       */
      export function readFixture(path: string): void {
        return;
      };
      `,
      errors: [
        {
          line: 2,
          message: 'JSDoc @returns declaration present but return expression not available in function.',
        },
      ],
      parser: require.resolve('@typescript-eslint/parser'),
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
      `,
      errors: [
        {
          line: 2,
          message: 'JSDoc @returns declaration present but return expression not available in function.',
        },
      ],
    },
    {
      code: `
          /**
           * @returns {true}
           */
          function quux () {
            if (true) {
            } else {
              return;
            }
          }
      `,
      errors: [
        {
          line: 2,
          message: 'JSDoc @returns declaration present but return expression not available in function.',
        },
      ],
    },
    {
      code: `
          /**
           * @returns {true}
           */
          function quux (someVar) {
            switch (someVar) {
            case 1:
              return true;
            case 2:
              return;
            }
          }
      `,
      errors: [
        {
          line: 2,
          message: 'JSDoc @returns declaration present but return expression not available in function.',
        },
      ],
    },
    {
      code: `
          /**
           * @returns {boolean}
           */
          const quux = (someVar) => {
            if (someVar) {
              return true;
            }
          };
      `,
      errors: [
        {
          line: 2,
          message: 'JSDoc @returns declaration present but return expression not available in function.',
        },
      ],
    },
    {
      code: `
          /**
           * @returns {true}
           */
          function quux () {
            try {
              return true;
            } catch (error) {
            }
          }
      `,
      errors: [
        {
          line: 2,
          message: 'JSDoc @returns declaration present but return expression not available in function.',
        },
      ],
    },
    {
      code: `
          /**
           * @returns {true}
           */
          function quux () {
            try {
              return true;
            } catch (error) {
              return true;
            } finally {
              return;
            }
          }
      `,
      errors: [
        {
          line: 2,
          message: 'JSDoc @returns declaration present but return expression not available in function.',
        },
      ],
    },
    {
      code: `
          /**
           * @returns {true}
           */
          function quux () {
            if (true) {
              throw new Error('abc');
            }

            throw new Error('def');
          }
      `,
      errors: [
        {
          line: 2,
          message: 'JSDoc @returns declaration present but return expression not available in function.',
        },
      ],
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

            const a = () => {};
          }
      `,
      errors: [
        {
          line: 2,
          message: 'JSDoc @returns declaration present but return expression not available in function.',
        },
      ],
      ignoreReadme: true,
    },
    {
      code: `
      /**
       * @returns Baz.
       */
      function foo() {
          switch (true) {
              default:
                  switch (false) {
                      default: return;
                  }
                  return "baz";
          }
      };
      `,
      errors: [
        {
          line: 2,
          message: 'JSDoc @returns declaration present but return expression not available in function.',
        },
      ],
    },
    {
      code: `
      /**
       * @returns Baz.
       */
      function foo() {
          switch (true) {
              default:
                  switch (false) {
                      default: return;
                  }
                  return "baz";
          }
      };
      `,
      errors: [
        {
          line: 2,
          message: 'JSDoc @returns declaration present but return expression not available in function.',
        },
      ],
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
           * @returns {string} Foo.
           */
          function quux () {

            return foo;
          }
      `,
    },
    {
      code: `
          /**
           * @returns {string} Foo.
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
           * @returns {SomeType} Foo.
           */
          const quux = () => foo;
      `,
    },
    {
      code: `
          /**
           * @returns {undefined} Foo.
           */
          function quux () {}
      `,
    },
    {
      code: `
          /**
           * @returns { void } Foo.
           */
          function quux () {}
      `,
    },
    {
      code: `
          /**
           * @returns {Promise<void>}
           */
          async function quux() {}
      `,
      parserOptions: {
        ecmaVersion: 8,
      },
    },
    {
      code: `
          /**
           * @returns {Promise<void>}
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
           * @returns {Promise<void>}
           */
          const quux = async () => {}
      `,
      parserOptions: {
        ecmaVersion: 8,
      },
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
      `,
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
      `,
    },
    {
      code: `
          /**
           * @returns Foo.
           * @constructor
           */
          function quux () {
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
             * @returns {string}
             */
            bar () {
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
             * @returns {string}
             */
            bar () {
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
           * @returns {undefined} Foo.
           */
          function quux () {
          }
      `,
    },
    {
      code: `
          /**
           * @returns {void} Foo.
           */
          function quux () {
          }
      `,
    },
    {
      code: `
          /**
           * @returns {void} Foo.
           */
          function quux () {
            return undefined;
          }
      `,
    },
    {
      code: `
          /**
           * @returns {never} Foo.
           */
          function quux () {
          }
      `,
    },
    {
      code: `
          /**
           * @returns {void} Foo.
           */
          function quux () {
            return;
          }
      `,
    },
    {
      code: `
          /**
           *
           */
          function quux () {
            return undefined;
          }
      `,
    },
    {
      code: `
          /**
           *
           */
          function quux () {
            return;
          }
      `,
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
            return true;
          }
      `,
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
            return true;
          }
      `,
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
            return true;
          }
      `,
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
            return true;
          }
      `,
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
            return true;
          }
      `,
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
            return true;
          }
      `,
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
            return true;
          }
      `,
    },
    {
      code: `
          /**
           * @returns {true}
           */
          function quux () {
            for (const a in b) {
              return true;
            }
          }
      `,
    },
    {
      code: `
          /**
           * @returns {true}
           */
          function quux () {
            for (const a of b) {
              return true;
            }
          }
      `,
    },
    {
      code: `
          /**
           * @returns {true}
           */
          function quux () {
            loop: for (const a of b) {
              return true;
            }
          }
      `,
    },
    {
      code: `
          /**
           * @returns {true}
           */
          function quux () {
            for (let i=0; i<n; i+=1) {
              return true;
            }
          }
      `,
    },
    {
      code: `
          /**
           * @returns {true}
           */
          function quux () {
            while(true) {
              return true
            }
          }
      `,
    },
    {
      code: `
          /**
           * @returns {true}
           */
          function quux () {
            do {
              return true
            }
            while(true)
          }
      `,
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
            return true;
          }
      `,
    },
    {
      code: `
          /**
           * @returns {true}
           */
          function quux () {
            var a = {};
            with (a) {
              return true;
            }
          }
      `,
    },
    {
      code: `
          /**
           * @returns {true}
           */
          function quux () {
            if (true) {
              return true;
            } else {
              return true;
            }
            return true;
          }
      `,
    },
    {
      code: `
          /**
           * @returns {Promise<number>}
           */
          async function quux() {
            return 5;
          }
      `,
      parserOptions: {
        ecmaVersion: 8,
      },
    },
    {
      code: `
          /**
           * @returns {Promise<number>}
           */
          async function quux() {
            return 5;
          }
      `,
      options: [
        {
          exemptAsync: false,
        },
      ],
      parserOptions: {
        ecmaVersion: 8,
      },
    },
    {
      code: `
          /**
           * @returns {Promise<void>}
           */
          function quux() {
            return new Promise((resolve, reject) => {
              setTimeout(() => {
                resolve(true);
              });
            })
          }
      `,
      options: [
        {
          exemptAsync: false,
        },
      ],
    },
    {
      code: `
        /**
         * Description.
         * @returns {void}
         */
        async function foo() {
          return new Promise(resolve => resolve());
        }
      `,
      options: [
        {
          reportMissingReturnForUndefinedTypes: true,
        },
      ],
      parserOptions: {
        ecmaVersion: 8,
      },
    },
    {
      code: `
          /**
           * @returns { void } Foo.
           */
          function quux () {
            return undefined;
          }
      `,
      options: [
        {
          reportMissingReturnForUndefinedTypes: true,
        },
      ],
    },
    {
      code: `
          /**
           * @returns { string } Foo.
           */
          function quux () {
            return 'abc';
          }
      `,
      options: [
        {
          reportMissingReturnForUndefinedTypes: true,
        },
      ],
    },
    {
      code: `
          /**
           * @returns {IterableIterator<any>}
           */
          function * quux() {}
      `,
      parserOptions: {
        ecmaVersion: 8,
      },
      settings: {
        jsdoc: {
          mode: 'typescript',
        },
      },
    },
    {
      code: `
          /**
           * @returns {IterableIterator<any>}
           */
          function * quux() {}
      `,
      options: [
        {
          exemptGenerators: true,
        },
      ],
      parserOptions: {
        ecmaVersion: 8,
      },
      settings: {
        jsdoc: {
          mode: 'jsdoc',
        },
      },
    },
    {
      code: `
      /**
       * @param {unknown} val
       * @returns { asserts val is number }
       */
      function assertNumber(val) {
        assert(typeof val === 'number');
      }
      `,
    },
    {
      code: `
      /**
       * Reads a test fixture.
       *
       * @param path The path to resolve relative to the fixture base. It will be normalized for the
       * operating system.
       *
       * @returns The file contents as buffer.
       */
      export function readFixture(path: string): Promise<Buffer>;
      `,
      parser: require.resolve('@typescript-eslint/parser'),
    },
    {
      code: `
      /**
       * Reads a test fixture.
       *
       * @param path The path to resolve relative to the fixture base. It will be normalized for the
       * operating system.
       *
       * @returns The file contents as buffer.
       */
      export function readFixture(path: string): Promise<Buffer> {
        return new Promise(() => {});
      }
      `,
      parser: require.resolve('@typescript-eslint/parser'),
    },
    {
      code: `
      /**
       * Reads a test fixture.
       *
       * @param path The path to resolve relative to the fixture base. It will be normalized for the
       * operating system.
       *
       * @returns {void} The file contents as buffer.
       */
      export function readFixture(path: string);
      `,
      parser: require.resolve('@typescript-eslint/parser'),
    },
    {
      code: `
      /**
       * @returns {SomeType}
       */
      function quux (path) {
        if (true) {
          return 5;
        }
        return 15;
      };
      `,
    },
    {
      code: `
      /**
       * @returns {SomeType} Foo.
       */
      const quux = () => new Promise((resolve) => {
        resolve(3);
      });
      `,
    },
    {
      code: `
      /**
       * @returns {SomeType} Foo.
       */
      const quux = function () {
        return new Promise((resolve) => {
          resolve(3);
        });
      };
      `,
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

            throw new Error('Fail');
          }
      `,
    },
    {
      code: `
      /**
       * @returns Baz.
       */
      function foo() {
          switch (true) {
              default:
                  switch (false) {
                      default: break;
                  }
                  return "baz";
          }
      };
      `,
    },
    {
      code: `
      /**
       * Return a V1 style query identifier.
       *
       * @param {string} id - The query identifier.
       * @returns {string} V1 style query identifier.
       */
      function v1QueryId(id) {
          switch (id) {
              case 'addq':
              case 'aliq':
              case 'locq':
                  return id.substring(3);
              case 'lost':
                  return id.substring(4);
              default:
                  return id;
          }
      }
      `,
    },
    {
      code: `
      /**
       * Parses the required header fields for the given SIP message.
       *
       * @param {string} logPrefix - The log prefix.
       * @param {string} sipMessage - The SIP message.
       * @param {string[]} headers - The header fields to be parsed.
       * @returns {object} Object with parsed header fields.
       */
      function parseSipHeaders(logPrefix, sipMessage, headers) {
          try {
              return esappSip.parseHeaders(sipMessage, headers);
          } catch (err) {
              logger.error(logPrefix, 'Failed to parse');
              return {};
          }
      }
      `,
    },
    {
      code: `
          /**
           * @returns {true}
           */
          function quux () {
            try {
            } catch (error) {
            } finally {
              return true;
            }
          }
      `,
    },
    {
      code: `
      /** Returns true.
       *
       * @returns {boolean} true
       */
      function getTrue() {
        try {
          return true;
        } finally {
          console.log('returning...');
        }
      }
      `,
    },
    {
      code: `
      /**
       * Maybe return a boolean.
       * @returns {boolean|void} true, or undefined.
       */
      function maybeTrue() {
        if (Math.random() > 0.5) {
          return true;
        }
      }
      `,
    },
    {
      code: `
      /**
       * Maybe return a boolean.
       * @return {boolean|void} true, or undefined.
       */
      function maybeTrue() {
        if (Math.random() > 0.5) {
          return true;
        }
      }
      `,
      ignoreReadme: true,
      settings: {
        jsdoc: {
          mode: 'permissive',
        },
      },
    },
    {
      code: `
      /**
       * @param {AST} astNode
       * @returns {AST}
       */
      const getTSFunctionComment = function (astNode) {
        switch (greatGrandparent.type) {
        case 'VariableDeclarator':
          if (greatGreatGrandparent.type === 'VariableDeclaration') {
            return greatGreatGrandparent;
          }

        default:
          return astNode;
        }
      };
      `,
    },
    {
      code: `
      const f =
        /**
         * Description.
         *
         * @returns Result.
         */
        () => {
          return function () {};
        };
      `,
    },
    {
      code: `
      /**
       * Description.
       *
       * @returns Result.
       */
      export function f(): string {
        return "";

        interface I {}
      }
      `,
      parser: require.resolve('@typescript-eslint/parser'),
    },
    {
      code: `
      /**
       * @param {boolean} bar A fun variable.
       * @returns {*} Anything at all!
       */
      function foo( bar ) {
        if ( bar ) {
          return functionWithUnknownReturnType();
        }
      }
      `,
    },
  ],
};
