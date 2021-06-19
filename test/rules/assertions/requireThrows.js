export default {
  invalid: [
    {
      code: `
          /**
           *
           */
          function quux (foo) {
            throw new Error('err')
          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @throws declaration.',
        },
      ],
    },
    {
      code: `
          /**
           *
           */
          function quux (foo) {
            someLabel: {
              throw new Error('err')
            }
          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @throws declaration.',
        },
      ],
      ignoreReadme: true,
    },
    {
      code: `
          /**
           *
           */
          const quux = function (foo) {
            throw new Error('err')
          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @throws declaration.',
        },
      ],
    },
    {
      code: `
          /**
           *
           */
          const quux = (foo) => {
            throw new Error('err')
          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @throws declaration.',
        },
      ],
    },
    {
      code: `
          /**
           *
           */
          function quux (foo) {
            while(true) {
              throw new Error('err')
            }
          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @throws declaration.',
        },
      ],
    },
    {
      code: `
          /**
           *
           */
          function quux (foo) {
            do {
              throw new Error('err')
            } while(true)
          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @throws declaration.',
        },
      ],
    },
    {
      code: `
          /**
           *
           */
          function quux (foo) {
            for(var i = 0; i <= 10; i++) {
              throw new Error('err')
            }
          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @throws declaration.',
        },
      ],
    },
    {
      code: `
          /**
           *
           */
          function quux (foo) {
            for(num in [1,2,3]) {
              throw new Error('err')
            }
          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @throws declaration.',
        },
      ],
    },
    {
      code: `
          /**
           *
           */
          function quux (foo) {
            for(const num of [1,2,3]) {
              throw new Error('err')
            }
          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @throws declaration.',
        },
      ],
    },
    {
      code: `
          /**
           *
           */
          function quux (foo) {
            for(const index in [1,2,3]) {
              throw new Error('err')
            }
          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @throws declaration.',
        },
      ],
    },
    {
      code: `
          /**
           *
           */
          function quux (foo) {
            with(foo) {
              throw new Error('err')
            }
          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @throws declaration.',
        },
      ],
    },
    {
      code: `
          /**
           *
           */
          function quux (foo) {
            if (true) {
              throw new Error('err')
            }
          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @throws declaration.',
        },
      ],
    },
    {
      code: `
          /**
           *
           */
          function quux (foo) {
            if (false) {
              // do nothing
            } else {
              throw new Error('err')
            }
          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @throws declaration.',
        },
      ],
    },
    {
      code: `
          /**
           *
           */
          function quux (foo) {
            try {
              throw new Error('err')
            } catch(e) {
              throw new Error(e.message)
            }
          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @throws declaration.',
        },
      ],
    },
    {
      code: `
          /**
           *
           */
          function quux (foo) {
            try {
              // do nothing
            } finally {
              throw new Error(e.message)
            }
          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @throws declaration.',
        },
      ],
    },
    {
      code: `
          /**
           *
           */
          function quux (foo) {
            const a = 'b'
            switch(a) {
              case 'b':
                throw new Error('err')
            }
          }
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @throws declaration.',
        },
      ],
    },
    {
      code: `
          /**
           * @throws
           */
          function quux () {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Unexpected tag `@throws`',
        },
      ],
      settings: {
        jsdoc: {
          tagNamePreference: {
            throws: false,
          },
        },
      },
    },
    {
      code: `
        /**
         *
         */
        const directThrowAfterArrow = (b) => {
          const a = () => {};
          if (b) {
            throw new Error('oops')
          }
          return a;
        };
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @throws declaration.',
        },
      ],
    },
  ],
  valid: [
    {
      code: `
          /**
           * @throws An error.
           */
          function quux () {
            throw new Error('err')
          }
      `,
    },
    {
      code: `
          /**
           *
           */
          function quux (foo) {
            try {
              throw new Error('err')
            } catch(e) {}
          }
      `,
    },
    {
      code: `
          /**
           * @inheritdoc
           */
          function quux (foo) {
            throw new Error('err')
          }
      `,
    },
    {
      code: `
          /**
           * @abstract
           */
          function quux (foo) {
            throw new Error('err')
          }
      `,
    },
    {
      code: `
          /**
           *
           */
          function quux (foo) {
          }
      `,
    },
    {
      code: `
          /**
           * @type {MyCallback}
           */
          function quux () {
            throw new Error('err')
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
         *
         */
        const itself = (n) => n;
        `,
    },
    {
      code: `
      /**
       * Not tracking on nested function
       */
      const nested = () => () => {throw new Error('oops');};
      `,
    },
    {
      code: `
      /**
       */
      async function foo() {
        throw Error("bar");
      }
      `,
      parserOptions: {
        ecmaVersion: 8,
      },
    },
  ],
};
