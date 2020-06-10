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
  ],
};
