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
      ]
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
      ]
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
      ]
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
      ]
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
    }
  ]
};
