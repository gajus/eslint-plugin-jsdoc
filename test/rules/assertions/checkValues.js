export default {
  invalid: [
    {
      code: `
      /**
       * @version
       */
      function quux (foo) {

      }
      `,
      errors: [
        {
          line: 3,
          message: 'Missing JSDoc @version.',
        },
      ],
    },
    {
      code: `
      /**
       * @version 3.1
       */
      function quux (foo) {

      }
      `,
      errors: [
        {
          line: 3,
          message: 'Invalid JSDoc @version: "3.1".',
        },
      ],
    },
    {
      code: `
      /**
       * @since
       */
      function quux (foo) {

      }
      `,
      errors: [
        {
          line: 3,
          message: 'Missing JSDoc @since.',
        },
      ],
    },
    {
      code: `
      /**
       * @since 3.1
       */
      function quux (foo) {

      }
      `,
      errors: [
        {
          line: 3,
          message: 'Invalid JSDoc @since: "3.1".',
        },
      ],
    },
    {
      code: `
      /**
       * @license
       */
      function quux (foo) {

      }
      `,
      errors: [
        {
          line: 3,
          message: 'Missing JSDoc @license.',
        },
      ],
    },
    {
      code: `
      /**
       * @license FOO
       */
      function quux (foo) {

      }
      `,
      errors: [
        {
          line: 3,
          message: 'Invalid JSDoc @license: "FOO"; expected SPDX identifier: https://spdx.org/licenses/.',
        },
      ],
    },
    {
      code: `
      /**
       * @license FOO
       */
      function quux (foo) {

      }
      `,
      errors: [
        {
          line: 3,
          message: 'Invalid JSDoc @license: "FOO"; expected one of BAR, BAX.',
        },
      ],
      options: [
        {
          allowedLicenses: ['BAR', 'BAX'],
        },
      ],
    },
    {
      code: `
      /**
       * @author
       */
      function quux (foo) {

      }
      `,
      errors: [
        {
          line: 3,
          message: 'Missing JSDoc @author.',
        },
      ],
    },
    {
      code: `
      /**
       * @author Brett Zamir
       */
      function quux (foo) {

      }
      `,
      errors: [
        {
          line: 3,
          message: 'Invalid JSDoc @author: "Brett Zamir"; expected one of Gajus Kuizinas, golopot.',
        },
      ],
      options: [
        {
          allowedAuthors: ['Gajus Kuizinas', 'golopot'],
        },
      ],
    },
  ],
  valid: [
    {
      code: `
      /**
       * @version 3.4.1
       */
      function quux (foo) {

      }
      `,
    },
    {
      code: `
      /**
       * @since 3.4.1
       */
      function quux (foo) {

      }
      `,
    },
    {
      code: `
      /**
       * @license MIT
       */
      function quux (foo) {

      }
      `,
    },
    {
      code: `
      /**
       * @license FOO
       */
      function quux (foo) {

      }
      `,
      options: [
        {
          allowedLicenses: ['FOO', 'BAR', 'BAX'],
        },
      ],
    },
    {
      code: `
      /**
       * @license FOO
       */
      function quux (foo) {

      }
      `,
      options: [
        {
          allowedLicenses: true,
        },
      ],
    },
    {
      code: `
      /**
       * @author Gajus Kuizinas
       */
      function quux (foo) {

      }
      `,
    },
    {
      code: `
      /**
       * @author Brett Zamir
       */
      function quux (foo) {

      }
      `,
      options: [
        {
          allowedAuthors: ['Gajus Kuizinas', 'golopot', 'Brett Zamir'],
        },
      ],
    },
  ],
};
