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
          message: 'Syntax error in namepath: module:namespace.SomeClass<~',
        },
      ],
    },
    {
      code: `
          /**
           * @param someParam<~
           */
          function quux() {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Syntax error in namepath: someParam<~',
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
          message: 'Syntax error in namepath: module:namespace.SomeClass~<',
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
        message: 'Syntax error in namepath: foo%',
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
        message: 'Syntax error in namepath: #foo',
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
        message: 'Syntax error in namepath: bar%',
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
        message: 'Syntax error in namepath: foo%',
      }],
      options: [{
        checkSeesForNamepaths: true,
      }],
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
        message: 'Syntax error in namepath: module:abc#event:foo-bar',
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
        message: 'Syntax error in namepath: module:namespace.SomeClass~',
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
        message: 'Tag @callback must have a name/namepath',
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
          message: 'Syntax error in namepath: UserStr%ng',
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
    {
      code: `
          /**
           * @modifies {bar|foo<}
           */
          function quux (foo, bar, baz) {}
      `,
      errors: [
        {
          message: 'Syntax error in type: bar|foo<',
        },
      ],
    },
    {
      code: `
      /**
       * @private {BadTypeChecked<}
       */
      function quux () {}

      `,
      errors: [
        {
          message: 'Syntax error in type: BadTypeChecked<',
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
       * @this {BadTypeChecked<}
       */
      function quux () {}
      `,
      errors: [
        {
          message: 'Syntax error in type: BadTypeChecked<',
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
           * @define
           */
           function quux () {}
      `,
      errors: [
        {
          line: 3,
          message: 'Tag @define must have a type',
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
           * @this
           */
           let foo;
      `,
      errors: [
        {
          line: 3,
          message: 'Tag @this must have a type',
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
       * Foo function.
       *
       * @param {[number, string]} bar - The bar array.
       */
      function foo(bar) {}
      `,
      errors: [
        {
          line: 5,
          message: 'Syntax error in type: [number, string]',
        },
      ],
      settings: {
        jsdoc: {
          mode: 'jsdoc',
        },
      },
    },
    {
      code: `
      /**
       * @interface name<
       */
      `,
      errors: [
        {
          message: 'Syntax error in namepath: name<',
        },
      ],
      settings: {
        jsdoc: {
          mode: 'jsdoc',
        },
      },
    },
    {
      code: `
      /**
       * @module name<
       */
      `,
      errors: [
        {
          message: 'Syntax error in namepath: name<',
        },
      ],
      settings: {
        jsdoc: {
          mode: 'jsdoc',
        },
      },
    },
    {
      code: `
      /**
       * @interface name
       */
      `,
      errors: [
        {
          message: '@interface should not have a name in "closure" mode.',
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
       * @typedef {SomeType}
       */
      function quux () {}

      `,
      errors: [
        {
          message: '@typedef must have a name in "jsdoc" mode.',
        },
      ],
      settings: {
        jsdoc: {
          mode: 'jsdoc',
        },
      },
    },
    {
      code: `
      /**
       * @private {SomeType}
       */
      function quux () {}

      `,
      errors: [
        {
          message: '@private should not have a bracketed type in "jsdoc" mode.',
        },
      ],
      settings: {
        jsdoc: {
          mode: 'jsdoc',
        },
      },
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
           * @callback
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
      options: [{
        checkSeesForNamepaths: true,
      }],
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
           * @extends Foo<String>
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
      settings: {
        jsdoc: {
          mode: 'closure',
        },
      },
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
      settings: {
        jsdoc: {
          mode: 'closure',
        },
      },
    },
    {
      code: `
          /**
           * @modifies {foo|bar}
           */
          function quux (foo, bar, baz) {}
      `,
    },
    {
      code: `
      /**
       * @this {Navigator}
       */
      function quux () {}
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
       * @export {SomeType}
       */
      function quux () {}
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
       * @define {boolean}
       */
      function quux () {}
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
           * @define
           */
           function quux () {}
      `,
    },
    {
      code: `
      /**
       * Foo function.
       *
       * @param {[number, string]} bar - The bar array.
       */
      function foo(bar) {}
      `,
      settings: {
        jsdoc: {
          mode: 'typescript',
        },
      },
    },
    {
      code: `
      /**
       * Foo function.
       *
       * @param {[number, string]} bar - The bar array.
       */
      function foo(bar) {}
      `,
      settings: {
        jsdoc: {
          mode: 'permissive',
        },
      },
    },
    {
      code: `
      /**
       * @typedef {SomeType}
       */
      function quux () {}

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
       * @private {SomeType}
       */
      function quux () {}

      `,
      settings: {
        jsdoc: {
          mode: 'closure',
        },
      },
    },
  ],
};
