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
      output: `
          /**
           * @returns {string|undefined}
           */
          function quux () {

          }
      `,
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
      output: `
          /**
           * @param {string} [foo=bar]
           */
          function quux (foo) {

          }
      `,
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
      output: `
          /**
           * @param {string|undefined}
           */
          function quux (foo) {

          }
      `,
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
      output: `
          /**
           * @param {Array<
           *   string
           * >} [foo]
           */
          function quux (foo) {

          }
      `,
    },
    {
      code: `
          /**
           * @returns {() => void=}
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
      output: `
          /**
           * @returns {(() => void)|undefined}
           */
          function quux () {

          }
      `,
    },
    {
      code: `
          /**
           * @returns {Array<
           *   string
           * >=}
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
      output: `
          /**
           * @returns {(Array<
           *   string
           * >)|undefined}
           */
          function quux () {

          }
      `,
    },
    {
      code: `
          /**
           * @type {number=}
           */
          const quux = 5;
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
           * @type {number|undefined}
           */
          const quux = 5;
      `,
    },
    {
      code: `
          /**
           * @param {string=} foo
           * @returns {Promise<void>=}
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
           * @returns {(Promise<void>)|undefined}
           */
          function quux (foo) {

          }
      `,
    },
    {
      code: `
          /**
           * @param {string=} foo=bar
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
           * @param {string|undefined} foo=bar
           */
          function quux (foo) {

          }
      `,
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
