export default /** @type {import('../index.js').TestCases} */ ({
  invalid: [
    {
      code: `
          /**
           * @param {string=} foo
           */
          function quux (foo) {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Syntax should not be Google Closure Compiler style.',
        },
      ],
    },
    {
      code: `
          /**
           * @param {string=} foo
           */
          function quux (foo) {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Syntax should not be Google Closure Compiler style.',
        },
      ],
      options: [
        {
          enableFixer: false,
        },
      ],
    },
    {
      code: `
          /**
           * @param {string=} foo
           */
          function quux (foo) {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Syntax should not be Google Closure Compiler style.',
        },
      ],
      options: [
        {
          enableFixer: true,
        },
      ],
      output: `
          /**
           * @param {string} [foo]
           */
          function quux (foo) {

          }
      `,
    },
    {
      code: `
          /**
           * @param {string=} foo - The foo.
           * @param {number=} bar
           * @param {Array<string>=} [baz]
           * @property {boolean=} qux.quux
           */
          function quux (foo, bar, baz) {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Syntax should not be Google Closure Compiler style.',
        },
      ],
      options: [
        {
          enableFixer: true,
        },
      ],
      output: `
          /**
           * @param {string} [foo] - The foo.
           * @param {number} [bar]
           * @param {Array<string>} [baz]
           * @property {boolean} [qux.quux]
           */
          function quux (foo, bar, baz) {

          }
      `,
    },
    {
      code: `
          /**
           * @returns {string=}
           */
          function quux () {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Syntax should not be Google Closure Compiler style.',
        },
      ],
      options: [
        {
          enableFixer: true,
        },
      ],
    },
    {
      code: `
          /**
           * @param {string=} [foo=bar]
           */
          function quux (foo) {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Syntax should not be Google Closure Compiler style.',
        },
      ],
      options: [
        {
          enableFixer: true,
        },
      ],
    },
    {
      code: `
          /**
           * @param {string=}
           */
          function quux (foo) {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Syntax should not be Google Closure Compiler style.',
        },
      ],
      options: [
        {
          enableFixer: true,
        },
      ],
    },
    {
      code: `
          /**
           * @param {Array<
           *   string
           * >=} foo
           */
          function quux (foo) {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Syntax should not be Google Closure Compiler style.',
        },
      ],
      options: [
        {
          enableFixer: true,
        },
      ],
    },
  ],
  valid: [
    {
      code: `
          /**
           * @param {string=} foo
           */
          function quux (foo) {

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
           * @param {string} [foo]
           */
          function quux (foo) {

          }
      `,
    },
    {
      code: `
          /**
           * @param {string} [foo]
           */
          function quux (foo) {

          }
      `,
      options: [
        {
          enableFixer: true,
        },
      ],
    },
    {
      code: `
          /**
           * @param {string=} foo
           */
          function quux (foo) {

          }
      `,
      options: [
        {
          enableFixer: true,
        },
      ],
      settings: {
        jsdoc: {
          mode: 'closure',
        },
      },
    },
    {
      code: `
          /**
           *
           */
          function quux (foo) {

          }
      `,
    },
  ],
});
