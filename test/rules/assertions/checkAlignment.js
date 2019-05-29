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
    }
  ]
};
