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
          column: 1,
          line: 3,
          message: 'Missing JSDoc @param "foo" type.',
        },
      ],
    },
    {
      code: `
      /**
       * @param {a xxx
       */
      function quux () {
      }
      `,
      errors: [
        {
          column: 1,
          line: 3,
          message: 'Missing JSDoc @param "" type.',
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
          column: 1,
          line: 3,
          message: 'Missing JSDoc @param "foo" type.',
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
          column: 1,
          line: 4,
          message: 'Missing JSDoc @param "foo" type.',
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
          column: 1,
          line: 4,
          message: 'Missing JSDoc @param "foo" type.',
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
          column: 1,
          line: 3,
          message: 'Missing JSDoc @arg "foo" type.',
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
          column: 1,
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
           * @param {number} foo
           * @param root
           * @param {boolean} baz
           */
          function quux (foo, {bar}, baz) {

          }
      `,
      errors: [
        {
          line: 4,
          message: 'Missing root type for @param.',
        },
      ],
      options: [
        {
          setDefaultDestructuredRootType: true,
        },
      ],
      output: `
          /**
           * @param {number} foo
           * @param {object} root
           * @param {boolean} baz
           */
          function quux (foo, {bar}, baz) {

          }
      `,
    },
    {
      code: `
          /**
           * @param {number} foo
           * @param root
           * @param {boolean} baz
           */
          function quux (foo, {bar}, baz) {

          }
      `,
      errors: [
        {
          line: 4,
          message: 'Missing root type for @param.',
        },
      ],
      options: [
        {
          defaultDestructuredRootType: 'Object',
          setDefaultDestructuredRootType: true,
        },
      ],
      output: `
          /**
           * @param {number} foo
           * @param {Object} root
           * @param {boolean} baz
           */
          function quux (foo, {bar}, baz) {

          }
      `,
    },
    {
      code: `
          /**
           * @param {number} foo
           * @param root
           * @param {boolean} baz
           */
          function quux (foo, {bar}, baz) {

          }
      `,
      errors: [
        {
          line: 4,
          message: 'Missing JSDoc @param "root" type.',
        },
      ],
      options: [
        {
          setDefaultDestructuredRootType: false,
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
           * @param {number} foo
           */
          function quux (foo) {

          }
      `,
    },
    {
      code: `
          /**
           * @param {number} foo
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
           * @param {number} foo
           * @param root
           * @param {boolean} baz
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
           * @param {number} foo
           * @param root
           * @param root.bar
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
