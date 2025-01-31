export default /** @type {import('../index.js').TestCases} */ ({
  invalid: [
    {
      code: `
          /**
           * @abstract extra text
           */
          function quux () {

          }
      `,
      errors: [
        {
          line: 3,
          message: '@abstract should be empty.',
        },
      ],
      output: `
          /**
           * @abstract
           */
          function quux () {

          }
      `,
    },
    {
      code: `
          /**
           * @interface extra text
           */
      `,
      errors: [
        {
          line: 3,
          message: '@interface should be empty.',
        },
      ],
      output: `
          /**
           * @interface
           */
      `,
      settings: {
        jsdoc: {
          mode: 'closure',
        },
      },
    },
    {
      code: `
      class Test {
          /**
           * @abstract extra text
           */
          quux () {

          }
      }
      `,
      errors: [
        {
          line: 4,
          message: '@abstract should be empty.',
        },
      ],
      output: `
      class Test {
          /**
           * @abstract
           */
          quux () {

          }
      }
      `,
    },
    {
      code: `
          /**
           * @abstract extra text
           * @inheritdoc
           * @async out of place
           */
          function quux () {

          }
      `,
      errors: [
        {
          line: 3,
          message: '@abstract should be empty.',
        },
        {
          line: 5,
          message: '@async should be empty.',
        },
      ],
      output: `
          /**
           * @abstract
           * @inheritdoc
           * @async out of place
           */
          function quux () {

          }
      `,
    },
    {
      code: `
          /**
           * @event anEvent
           */
          function quux () {

          }
      `,
      errors: [
        {
          line: 3,
          message: '@event should be empty.',
        },
      ],
      options: [
        {
          tags: [
            'event',
          ],
        },
      ],
      output: `
          /**
           * @event
           */
          function quux () {

          }
      `,
    },
    {
      code: `
      /**
       * @private {someType}
       */
      function quux () {

      }
      `,
      errors: [
        {
          line: 3,
          message: '@private should be empty.',
        },
      ],
      output: `
      /**
       * @private
       */
      function quux () {

      }
      `,
    },
    {
      code: `
      /**
       * @internal {someType}
       */
      function quux () {

      }
      `,
      errors: [
        {
          line: 3,
          message: '@internal should be empty.',
        },
      ],
      output: `
      /**
       * @internal
       */
      function quux () {

      }
      `,
    },
    {
      code: `
      /**
       * @private {someType}
       */
      function quux () {

      }
      `,
      errors: [
        {
          line: 3,
          message: '@private should be empty.',
        },
      ],
      output: `
      /**
       * @private
       */
      function quux () {

      }
      `,
      settings: {
        jsdoc: {
          ignorePrivate: true,
        },
      },
    },
  ],
  valid: [
    {
      code: `
          /**
           * @abstract
           */
          function quux () {

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
           * @param aName
           */
          function quux () {

          }
      `,
    },
    {
      code: `
          /**
           * @abstract
           * @inheritdoc
           * @async
           */
          function quux () {

          }
      `,
    },
    {
      code: `
      /**
       * @private {someType}
       */
      function quux () {

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
       * @private
       */
      function quux () {

      }
      `,
    },
    {
      code: `
      /**
       * @internal
       */
      function quux () {

      }
      `,
    },
    {
      code: `
      /**
       * Create an array.
       *
       * @private
       *
       * @param {string[]} [elem] - Elements to make an array of.
       * @param {boolean} [clone] - Optionally clone nodes.
       * @returns {string[]} The array of nodes.
       */
      function quux () {}
      `,
    },
  ],
});
