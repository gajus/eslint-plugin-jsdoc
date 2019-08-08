export default {
  invalid: [
    {
      code: `
          /**
           * @param {Array<string} foo
           */
          function quux() {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Syntax error in type: Array<string',
        },
      ],
    },
    {
      code: `
          /**
           * @memberof module:namespace.SomeClass<~
           */
          function quux() {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Syntax error in type: module:namespace.SomeClass<~',
        },
      ],
    },
    {
      code: `
          /**
           * @memberof module:namespace.SomeClass~<
           */
          function quux() {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Syntax error in type: module:namespace.SomeClass~<',
        },
      ],
    },
    {
      code: `
          /**
           * @borrows foo% as bar
           */
          function quux() {

          }
      `,
      errors: [{
        line: 3,
        message: 'Syntax error in type: foo%',
      }],
    },
    {
      code: `
          /**
           * @borrows #foo as bar
           */
          function quux() {

          }
      `,
      errors: [{
        line: 3,
        message: 'Syntax error in type: #foo',
      }],
    },
    {
      code: `
          /**
           * @borrows foo as bar%
           */
          function quux() {

          }
      `,
      errors: [{
        line: 3,
        message: 'Syntax error in type: bar%',
      }],
    },
    {
      code: `
          /**
           * @borrows foo
           */
          function quux() {

          }
      `,
      errors: [{
        line: 3,
        message: '@borrows must have an "as" expression. Found ""',
      }],
    },
    {
      code: `
          /**
           * @see foo%
           */
          function quux() {

          }
      `,
      errors: [{
        line: 3,
        message: 'Syntax error in type: foo%',
      }],
      options: [{
        checkSeesForNamepaths: true,
      }],
    },
    {
      code: `
          /** */
          function foo() {}
      `,
      errors: [
        {
          message: '`settings.jsdoc.allowEmptyNamepaths` has been removed, use options in the rule `valid-types` instead.',
        },
        {
          message: '`settings.jsdoc.checkSeesForNamepaths` has been removed, use options in the rule `valid-types` instead.',
        },
      ],
      settings: {
        jsdoc: {
          allowEmptyNamepaths: true,
          checkSeesForNamepaths: true,
        },
      },
    },
    {
      code: `
          /**
           * @alias module:abc#event:foo-bar
           */
          function quux() {

          }
      `,
      errors: [{
        line: 3,
        message: 'Syntax error in type: module:abc#event:foo-bar',
      }],
    },
    {
      code: `
          /**
           * @mixes module:namespace.SomeClass~
           */
          function quux() {

          }
      `,
      errors: [{
        line: 3,
        message: 'Syntax error in type: module:namespace.SomeClass~',
      }],
    },
    {
      code: `
          /**
           * @callback
           */
          function quux() {

          }
      `,
      errors: [{
        line: 3,
        message: 'Tag @callback must have a namepath',
      }],
      options: [{
        allowEmptyNamepaths: false,
      }],
    },
    {
      code: `
          /**
           * @constant {str%ng}
           */
           const FOO = 'foo';
      `,
      errors: [
        {
          line: 3,
          message: 'Syntax error in type: str%ng',
        },
      ],
    },
    {
      code: `
          /**
           * @typedef {str%ng} UserString
           */
      `,
      errors: [
        {
          line: 3,
          message: 'Syntax error in type: str%ng',
        },
      ],
    },
    {
      code: `
          /**
           * @typedef {string} UserStr%ng
           */
      `,
      errors: [
        {
          line: 3,
          message: 'Syntax error in type: UserStr%ng',
        },
      ],
    },
    {
      code: `
          /**
           * @extends
           */
           class Bar {};
      `,
      errors: [
        {
          line: 3,
          message: 'Tag @extends must have either a type or namepath',
        },
      ],
    },
    {
      code: `
          /**
           * @type
           */
           let foo;
      `,
      errors: [
        {
          line: 3,
          message: 'Tag @type must have a type',
        },
      ],
    },
  ],
  valid: [
    {
      code: `
          /**
           * @param {Array<string>} foo
           */
          function quux() {

          }
      `,
    },
    {
      code: `
          /**
           * @param {string} foo
           */
          function quux() {

          }
      `,
    },
    {
      code: `
          /**
           * @param foo
           */
          function quux() {

          }
      `,
    },
    {
      code: `
          /**
           * @borrows foo as bar
           */
          function quux() {

          }
      `,
    },
    {
      code: `
          /**
           * @borrows foo as #bar
           */
          function quux() {

          }
      `,
    },
    {
      code: `
          /**
           * @see foo%
           */
          function quux() {

          }
      `,
    },
    {
      code: `
          /**
           * @alias module:namespace.SomeClass#event:ext_anevent
           */
          function quux() {

          }
      `,
    },
    {
      code: `
          /**
           * @callback foo
           */
          function quux() {

          }
      `,
    },
    {
      code: `
          /**
           * @callback foo
           */
          function quux() {

          }
      `,
      options: [{
        allowEmptyNamepaths: true,
      }],
    },
    {
      code: `
          /**
           * @class
           */
          function quux() {

          }
      `,
    },
    {
      code: `
          /**
           * @see {@link foo}
           */
          function quux() {

          }
      `,
    },
    {
      code: `
          /**
           *
           * @fires {module:namespace.SomeClass#event:ext_anevent}
           */
          function quux() {

          }
      `,
    },
    {
      code: `
          /**
           * @memberof module:namespace.SomeClass~
           */
          function quux() {

          }
      `,
    },
    {
      code: `
          /**
           * @memberof! module:namespace.SomeClass.
           */
          function quux() {

          }
      `,
    },
    {
      code: `
          /**
           *
           */
          function quux() {

          }
      `,
    },
    {
      code: `
          /**
           * @constant {string}
           */
           const FOO = 'foo';
      `,
    },
    {
      code: `
          /**
           * @constant {string} FOO
           */
           const FOO = 'foo';
      `,
    },
    {
      code: `
          /**
           * @extends Foo
           */
           class Bar {};
      `,
    },
    {
      code: `
          /**
           * @extends {Foo<String>}
           */
           class Bar {};
      `,
    },
    {
      code: `
          /**
           * @typedef {number|string} UserDefinedType
           */
      `,
    },
    {
      code: `
          /**
           * @typedef {number|string}
           */
          let UserDefinedGCCType;
      `,
    },
  ],
};
