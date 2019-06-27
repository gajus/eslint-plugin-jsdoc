export default {
  invalid: [
    {
      code: `
        /**
          * @param {Number} foo
         */
        function quux (foo) {

        }
      `,
      errors: [
        {
          message: 'Expected JSDoc block to be aligned.'
        }
      ],
      output: `
        /**
         * @param {Number} foo
         */
        function quux (foo) {

        }
      `
    },
    {
      code: `
        /**
         * @param {Number} foo
          */
        function quux (foo) {

        }
      `,
      errors: [
        {
          message: 'Expected JSDoc block to be aligned.'
        }
      ],
      output: `
        /**
         * @param {Number} foo
         */
        function quux (foo) {

        }
      `
    },
    {
      code: `
         /**
         * @param {Number} foo
         */
        function quux (foo) {

        }
      `,
      errors: [
        {
          message: 'Expected JSDoc block to be aligned.'
        }
      ],
      output: `
         /**
          * @param {Number} foo
          */
        function quux (foo) {

        }
      `
    },
    {
      code: `
         /**
          * @param {Number} foo
         */
        function quux (foo) {

        }
      `,
      errors: [
        {
          message: 'Expected JSDoc block to be aligned.'
        }
      ],
      output: `
         /**
          * @param {Number} foo
          */
        function quux (foo) {

        }
      `
    },
    {
      code: `
       /**
         * @param {Number} foo
         */
        function quux (foo) {

        }
      `,
      errors: [
        {
          message: 'Expected JSDoc block to be aligned.'
        }
      ],
      output: `
       /**
        * @param {Number} foo
        */
        function quux (foo) {

        }
      `
    },
    {
      code: `
        /**
           * A jsdoc not attached to any node.
         */
      `,
      errors: [
        {message: 'Expected JSDoc block to be aligned.'}
      ]
    },
    {
      code: `
        class Foo {
          /**
           *  Some method
            * @param a
           */
          quux(a) {}
        }
      `,
      errors: [
        {message: 'Expected JSDoc block to be aligned.'}
      ]
    }
  ],
  valid: [
    {
      code: `
        /**
         * Desc
         *
         * @param {Number} foo
         */
        function quux (foo) {

        }
      `
    },
    {
      code: `
        /**
         * Desc
         *
         * @param {{
          foo: Bar,
          bar: Baz
         * }} foo
         *
         */
        function quux (foo) {

        }
      `
    },
    {
      code: `
        /*  <- JSDoc must start with 2 stars.
          *    So this is unchecked.
         */
        function quux (foo) {}
      `
    }
  ]
};
