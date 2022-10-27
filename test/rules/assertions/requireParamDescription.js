export default {
  invalid: [
    {
      code: `
          /**
           * @param foo
           */
          function quux (foo) {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Missing JSDoc @param "foo" description.',
        },
      ],
    },
    {
      code: `
          /**
           * @param foo
           */
          function quux (foo) {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Missing JSDoc @param "foo" description.',
        },
      ],
      options: [
        {
          contexts: [
            'any',
          ],
        },
      ],
    },
    {
      code: `
          /**
           * @function
           * @param foo
           */
      `,
      errors: [
        {
          line: 4,
          message: 'Missing JSDoc @param "foo" description.',
        },
      ],
      options: [
        {
          contexts: [
            'any',
          ],
        },
      ],
    },
    {
      code: `
          /**
           * @callback
           * @param foo
           */
      `,
      errors: [
        {
          line: 4,
          message: 'Missing JSDoc @param "foo" description.',
        },
      ],
      options: [
        {
          contexts: [
            'any',
          ],
        },
      ],
    },
    {
      code: `
          /**
           * @arg foo
           */
          function quux (foo) {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Missing JSDoc @arg "foo" description.',
        },
      ],
      settings: {
        jsdoc: {
          tagNamePreference: {
            param: 'arg',
          },
        },
      },
    },
    {
      code: `
          /**
           * @param foo
           */
          function quux (foo) {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Unexpected tag `@param`',
        },
      ],
      settings: {
        jsdoc: {
          tagNamePreference: {
            param: false,
          },
        },
      },
    },
    {
      code: `
          /**
           * @param foo
           */
          function quux (foo) {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Missing JSDoc @param "foo" description.',
        },
      ],
      options: [
        {
          contexts: [
            {
              comment: 'JsdocBlock:has(JsdocTag:not([name=props]))',
              context: 'FunctionDeclaration',
            },
          ],
        },
      ],
    },
    {
      code: `
          /**
           * @param {number} foo Foo description
           * @param {object} root
           * @param {boolean} baz Baz description
           */
          function quux (foo, {bar}, baz) {

          }
      `,
      errors: [
        {
          line: 4,
          message: 'Missing root description for @param.',
        },
      ],
      options: [
        {
          setDefaultDestructuredRootDescription: true,
        },
      ],
      output: `
          /**
           * @param {number} foo Foo description
           * @param {object} root The root object
           * @param {boolean} baz Baz description
           */
          function quux (foo, {bar}, baz) {

          }
      `,
    },
    {
      code: `
          /**
           * @param {number} foo Foo description
           * @param {object} root
           * @param {boolean} baz Baz description
           */
          function quux (foo, {bar}, baz) {

          }
      `,
      errors: [
        {
          line: 4,
          message: 'Missing root description for @param.',
        },
      ],
      options: [
        {
          defaultDestructuredRootDescription: 'Root description',
          setDefaultDestructuredRootDescription: true,
        },
      ],
      output: `
          /**
           * @param {number} foo Foo description
           * @param {object} root Root description
           * @param {boolean} baz Baz description
           */
          function quux (foo, {bar}, baz) {

          }
      `,
    },
    {
      code: `
          /**
           * @param {number} foo Foo description
           * @param {object} root
           * @param {boolean} baz Baz description
           */
          function quux (foo, {bar}, baz) {

          }
      `,
      errors: [
        {
          line: 4,
          message: 'Missing JSDoc @param "root" description.',
        },
      ],
      options: [
        {
          setDefaultDestructuredRootDescription: false,
        },
      ],
    },
  ],
  valid: [
    {
      code: `
          /**
           *
           */
          function quux (foo) {

          }
      `,
    },
    {
      code: `
          /**
           * @param foo Foo.
           */
          function quux (foo) {

          }
      `,
    },
    {
      code: `
          /**
           * @param foo Foo.
           */
          function quux (foo) {

          }
      `,
      options: [
        {
          contexts: [
            'any',
          ],
        },
      ],
    },
    {
      code: `
          /**
           * @function
           * @param foo
           */
      `,
    },
    {
      code: `
          /**
           * @callback
           * @param foo
           */
      `,
    },
    {
      code: `
      /**
       * Checks if the XML document sort of equals another XML document.
       * @param {Object} obj The other object.
       * @param {{includeWhiteSpace: (boolean|undefined),
       *    ignoreElementOrder: (boolean|undefined)}} [options] The options.
       * @return {expect.Assertion} The assertion.
       */
      expect.Assertion.prototype.xmleql = function (obj, options) {
      }
      `,
      ignoreReadme: true,
    },
    {
      code: `
          /**
           * @param props
           */
          function quux (props) {

          }
      `,
      options: [
        {
          contexts: [
            {
              comment: 'JsdocBlock:has(JsdocTag:not([name=props]))',
              context: 'FunctionDeclaration',
            },
          ],
        },
      ],
    },
    {
      code: `
          /**
           * @param {number} foo Foo description
           * @param {object} root
           * @param {boolean} baz Baz description
           */
          function quux (foo, {bar}, baz) {

          }
      `,
      settings: {
        jsdoc: {
          exemptDestructuredRootsFromChecks: true,
        },
      },
    },
    {
      code: `
          /**
           * @param {number} foo Foo description
           * @param {object} root
           * @param {object} root.bar
           */
          function quux (foo, {bar: {baz}}) {

          }
      `,
      settings: {
        jsdoc: {
          exemptDestructuredRootsFromChecks: true,
        },
      },
    },
  ],
};
