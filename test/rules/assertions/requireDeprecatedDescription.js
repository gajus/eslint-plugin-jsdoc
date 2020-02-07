export default {
  invalid: [
    {
      code: `
          /**
           * @deprecated
           */
          function foo () {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Missing deprecation description.',
        },
      ],
    },
    {
      code: `
          /**
           * @deprecated
           */
          Foo.prototype.bar
      `,
      errors: [
        {
          line: 3,
          message: 'Missing deprecation description.',
        },
      ],
    },
  ],
  valid: [
    {
      code: `
          /**
           * @deprecated - Use bar() instead
           */
          function foo () {

          }
      `,
    },
    {
      code: `
          /**
           * @deprecated Permanently removed as unsafe
           */
          Foo.prototype.bar
      `,
    },
    {
      code: `
          /**
           * @deprecated oneWordShouldNotBeParsedAsName
           */
          var FOO;
      `,
    },
  ],
};
