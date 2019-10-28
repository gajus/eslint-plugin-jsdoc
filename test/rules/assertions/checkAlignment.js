export default {
  invalid: [
    {
      code: `
        /**
          * @param {Number} foo
         */
        function quux (foo) {
          // with spaces
        }
      `,
      errors: [
        {
          line: 3,
          message: 'Expected JSDoc block to be aligned.',
        },
      ],
      output: `
        /**
         * @param {Number} foo
         */
        function quux (foo) {
          // with spaces
        }
      `,
    },
    /* eslint-disable no-tabs */
    {
      code: `
				/**
				  * @param {Number} foo
				 */
				function quux (foo) {
					// with tabs
				}
      `,
      errors: [
        {
          line: 3,
          message: 'Expected JSDoc block to be aligned.',
        },
      ],
      output: `
				/**
				 * @param {Number} foo
				 */
				function quux (foo) {
					// with tabs
				}
      `,
    },
    /* eslint-enable no-tabs */
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
          line: 4,
          message: 'Expected JSDoc block to be aligned.',
        },
      ],
      output: `
        /**
         * @param {Number} foo
         */
        function quux (foo) {

        }
      `,
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
          line: 3,
          message: 'Expected JSDoc block to be aligned.',
        },
      ],
      output: `
         /**
          * @param {Number} foo
          */
        function quux (foo) {

        }
      `,
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
          line: 4,
          message: 'Expected JSDoc block to be aligned.',
        },
      ],
      output: `
         /**
          * @param {Number} foo
          */
        function quux (foo) {

        }
      `,
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
          line: 3,
          message: 'Expected JSDoc block to be aligned.',
        },
      ],
      output: `
       /**
        * @param {Number} foo
        */
        function quux (foo) {

        }
      `,
    },
    {
      code: `
        /**
           * A jsdoc not attached to any node.
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Expected JSDoc block to be aligned.',
        },
      ],
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
        {
          line: 5,
          message: 'Expected JSDoc block to be aligned.',
        },
      ],
    },
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
      `,
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
      `,
    },
    {
      code: `
        /*  <- JSDoc must start with 2 stars.
          *    So this is unchecked.
         */
        function quux (foo) {}
      `,
    },
  ],
};
