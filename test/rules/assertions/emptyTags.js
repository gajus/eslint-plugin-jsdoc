export default {
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
          tags: ['event'],
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
  ],
};
