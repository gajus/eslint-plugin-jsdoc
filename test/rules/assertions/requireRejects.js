import {
  parser as typescriptEslintParser,
} from 'typescript-eslint';

export default /** @type {import('../index.js').TestCases} */ ({
  invalid: [
    {
      code: `
        /**
         *
         */
        async function quux () {
          throw new Error('abc');
        }
      `,
      errors: [
        {
          line: 2,
          message: 'Promise-rejecting function requires `@reject` tag',
        },
      ],
    },
    {
      code: `
        /**
         *
         */
        const quux = async () => {
          throw new Error('abc');
        };
      `,
      errors: [
        {
          line: 2,
          message: 'Promise-rejecting function requires `@reject` tag',
        },
      ],
    },
    {
      code: `
        /**
         *
         */
        const quux = async function () {
          throw new Error('abc');
        };
      `,
      errors: [
        {
          line: 2,
          message: 'Promise-rejecting function requires `@reject` tag',
        },
      ],
    },
    {
      code: `
        /**
         *
         */
        async function quux () {
          try {
            await sthAsync();
          } catch (err) {
            if (cond) {
              throw err;
            }
          }
        }
      `,
      errors: [
        {
          line: 2,
          message: 'Promise-rejecting function requires `@reject` tag',
        },
      ],
    },
    {
      code: `
        /**
         *
         */
        function quux () {
          return new Promise((resolve, reject) => {
            reject(new Error('abc'));
          });
        }
      `,
      errors: [
        {
          line: 2,
          message: 'Promise-rejecting function requires `@reject` tag',
        },
      ],
    },
    {
      code: `
        /**
         *
         */
        async function quux () {
          if (cond) {
            throw new Error('abc');
          }
        }
      `,
      errors: [
        {
          line: 2,
          message: 'Promise-rejecting function requires `@reject` tag',
        },
      ],
    },
    {
      code: `
        /**
         *
         */
        async function quux () {
          function inner () {
            if (cond) {
              throw new Error('abc');
            }
          }
          inner();
        }
      `,
      errors: [
        {
          line: 2,
          message: 'Promise-rejecting function requires `@reject` tag',
        },
      ],
    },
    {
      code: `
        /**
         *
         */
        async function quux () {
          return Promise.reject(new Error('abc'));
        }
      `,
      errors: [
        {
          line: 2,
          message: 'Promise-rejecting function requires `@reject` tag',
        },
      ],
    },
    {
      code: `
        /**
         *
         */
        function quux () {
          if (cond) {
            return Promise.reject(new Error('abc'));
          }
        }
      `,
      errors: [
        {
          line: 2,
          message: 'Promise-rejecting function requires `@reject` tag',
        },
      ],
    },
    {
      code: `
        /**
         *
         */
        async function quux () {
          for (let i = 0; i < 10; i++) {
            if (i > 5) {
              throw new Error('abc');
            }
          }
        }
      `,
      errors: [
        {
          line: 2,
          message: 'Promise-rejecting function requires `@reject` tag',
        },
      ],
    },
    {
      code: `
        /**
         *
         */
        async function quux () {
          while (cond) {
            throw new Error('abc');
          }
        }
      `,
      errors: [
        {
          line: 2,
          message: 'Promise-rejecting function requires `@reject` tag',
        },
      ],
    },
    {
      code: `
        /**
         *
         */
        async function quux () {
          switch (val) {
            case 1:
              throw new Error('abc');
            case 2:
              break;
          }
        }
      `,
      errors: [
        {
          line: 2,
          message: 'Promise-rejecting function requires `@reject` tag',
        },
      ],
    },
    {
      code: `
        /**
         *
         */
        async function quux () {
          const arr = [1, 2, 3];
          for (const item of arr) {
            if (item > 2) {
              throw new Error('abc');
            }
          }
        }
      `,
      errors: [
        {
          line: 2,
          message: 'Promise-rejecting function requires `@reject` tag',
        },
      ],
    },
    {
      code: `
        /**
         *
         */
        async function quux () {
          const obj = {a: 1, b: 2};
          for (const key in obj) {
            if (key === 'a') {
              throw new Error('abc');
            }
          }
        }
      `,
      errors: [
        {
          line: 2,
          message: 'Promise-rejecting function requires `@reject` tag',
        },
      ],
    },
    {
      code: `
        /**
         *
         */
        async function quux () {
          do {
            throw new Error('abc');
          } while (cond);
        }
      `,
      errors: [
        {
          line: 2,
          message: 'Promise-rejecting function requires `@reject` tag',
        },
      ],
    },
    {
      code: `
        /**
         *
         */
        async function quux () {
          label: {
            throw new Error('abc');
          }
        }
      `,
      errors: [
        {
          line: 2,
          message: 'Promise-rejecting function requires `@reject` tag',
        },
      ],
    },
    {
      code: `
        /**
         *
         */
        async function quux () {
          try {
            doSomething();
          } finally {
            throw new Error('cleanup failed');
          }
        }
      `,
      errors: [
        {
          line: 2,
          message: 'Promise-rejecting function requires `@reject` tag',
        },
      ],
    },
  ],
  valid: [
    {
      code: `
        /**
         * @rejects {Error}
         */
        async function quux () {
          throw new Error('abc');
        }
      `,
    },
    {
      code: `
        /**
         * @abstract
         */
        async function quux () {
          throw new Error('abc');
        }
      `,
    },
    {
      code: `
        /**
         *
         */
        function quux () {
          return 42;
        }
      `,
    },
    {
      code: `
        /**
         *
         */
        async function quux () {
          return await sthAsync();
        }
      `,
    },
    {
      code: `
        /**
         *
         */
        async function quux () {
          if (cond) {
            return;
          }
        }
      `,
    },
    {
      code: `
        /**
         *
         */
        async function quux () {
          const obj = new SomeClass();
        }
      `,
    },
    {
      code: `
        /**
         *
         */
        function quux () {
          const p = new Promise(someVariable);
        }
      `,
    },
    {
      code: `
        /**
         *
         */
        function quux () {
          return new Promise(someVariable);
        }
      `,
    },
    {
      code: `
        /**
         *
         */
        async function quux () {
          someFunction();
        }
      `,
    },
    {
      code: `
        /**
         *
         */
        async function quux () {
          try {
            doSomething();
          } catch (err) {
            console.error(err);
          }
        }
      `,
    },
    {
      code: `
        /**
         *
         */
        async function quux () {
          try {
            throw new Error('wholly caught');
          } catch (err) {
            console.error(err);
          }
        }
      `,
    },
    {
      code: `
        /**
         *
         */
        async function quux () {
          if (cond) {
            doSomething();
          } else {
            doOtherThing();
          }
        }
      `,
    },
    {
      code: `
        /**
         * @callback MyCallback
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
         *
         */
        async function quux () {
          throw new Error('abc');
        }
      `,
      settings: {
        jsdoc: {
          tagNamePreference: {
            rejects: false,
          },
        },
      },
    },
    {
      code: `
        /** @param bar Something. */
        export function foo(bar: string): void {
          throw new Error(\`some error: \${bar}\`);
        }
      `,
      languageOptions: {
        parser: typescriptEslintParser,
        sourceType: 'module',
      },
    },
  ],
});
