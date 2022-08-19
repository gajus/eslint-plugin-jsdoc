export default {
  invalid: [
    {
      code: `
          /**
           * @throws
           */
          function quux (foo) {
            throw new Error('err');
          }
      `,
      errors: [
        {
          line: 3,
          message: 'Missing JSDoc @throws type.',
        },
      ],
    },
    {
      code: `
          /**
           * @throws
           */
          function quux (foo) {
            if (true) {
              throw new RangeError('err');
            }
          }
      `,
      errors: [
        {
          line: 3,
          message: 'Missing JSDoc @throws type.',
        },
      ],
    },
    {
      code: `
          /**
           * @throws
           */
          function quux (foo) {
            try {
              // do nothing
            } finally {
              throw new SyntaxError(e.message)
            }
          }
      `,
      errors: [
        {
          line: 3,
          message: 'Missing JSDoc @throws type.',
        },
      ],
    },
  ],
  valid: [
    {
      code: `
          /**
           * @throws {Error} An error.
           */
          function quux () {
            throw new Error('err')
          }
      `,
    },
    {
      code: `
          /**
           * @throws {RangeError}
           */
          function quux (foo) {
            if (true) {
              throw new RangeError('err');
            }
          }
      `,
    },
    {
      code: `
          /**
           * @throws {SyntaxError}
           */
          function quux (foo) {
            try {
              // do nothing
            } finally {
              throw new SyntaxError(e.message)
            }
          }
      `,
    },
  ],
};
