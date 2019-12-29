export default {
  invalid: [
    {
      code: `
          /**
           * @param {number} foo
           */
          function quux (foo) {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Types are not permitted on @param.',
        },
      ],
      output: `
          /**
           * @param foo
           */
          function quux (foo) {

          }
      `,
    },
    {
      code: `
          /**
           * @param {number} foo
           */
          function quux (foo) {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Types are not permitted on @param.',
        },
      ],
      options: [
        {
          contexts: ['any'],
        },
      ],
      output: `
          /**
           * @param foo
           */
          function quux (foo) {

          }
      `,
    },
    {
      code: `
          /**
           * @function
           * @param {number} foo
           */
      `,
      errors: [
        {
          line: 4,
          message: 'Types are not permitted on @param.',
        },
      ],
      options: [
        {
          contexts: ['any'],
        },
      ],
      output: `
          /**
           * @function
           * @param foo
           */
      `,
    },
    {
      code: `
          /**
           * @callback
           * @param {number} foo
           */
      `,
      errors: [
        {
          line: 4,
          message: 'Types are not permitted on @param.',
        },
      ],
      options: [
        {
          contexts: ['any'],
        },
      ],
      output: `
          /**
           * @callback
           * @param foo
           */
      `,
    },
    {
      code: `
          /**
           * @returns {number}
           */
          function quux () {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Types are not permitted on @returns.',
        },
      ],
      output: `
          /**
           * @returns
           */
          function quux () {

          }
      `,
    },
  ],
  valid: [
    {
      code: `
          /**
           * @param foo
           */
          function quux (foo) {

          }
      `,
    },
    {
      code: `
          /**
           * @param foo
           */
      `,
      options: [
        {
          contexts: ['any'],
        },
      ],
    },
    {
      code: `
          /**
           * @function
           * @param {number} foo
           */
      `,
    },
    {
      code: `
          /**
           * @callback
           * @param {number} foo
           */
      `,
    },
  ],
};
