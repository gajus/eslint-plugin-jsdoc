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
      errors: [
        {
          line: 3,
          message: 'Syntax error in namepath: foo%',
        },
      ],
    },
    {
      code: `
          /**
           * @borrows #foo as bar
           */
          function quux() {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Syntax error in namepath: #foo',
        },
      ],
    },
    {
      code: `
          /**
           * @borrows foo as bar%
           */
          function quux() {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Syntax error in namepath: bar%',
        },
      ],
    },
    {
      code: `
          /**
           * @borrows foo
           */
          function quux() {

          }
      `,
      errors: [
        {
          line: 3,
          message: '@borrows must have an "as" expression. Found ""',
        },
      ],
    },
    {
      code: `
          /**
           * @see foo%
           */
          function quux() {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Syntax error in namepath: foo%',
        },
      ],
      settings: {
        jsdoc: {
          structuredTags: {
            see: {
              name: 'namepath-referencing',
              required: [
                'name',
              ],
            },
          },
        },
      },
    },
    {
      code: `
          /**
           * @mixes module:namespace.SomeClass~
           */
          function quux() {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Syntax error in namepath: module:namespace.SomeClass~',
        },
      ],
    },
    {
      code: `
          /**
           * @callback
           */
          function quux() {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Tag @callback must have a name/namepath.',
        },
      ],
      options: [
        {
          allowEmptyNamepaths: false,
        },
      ],
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
           * @this
           */
           class Bar {};
      `,
      errors: [
        {
          line: 3,
          message: 'Tag @this must have either a type or namepath in "jsdoc" mode.',
        },
      ],
      options: [
        {
          allowEmptyNamepaths: false,
        },
      ],
    },
    {
      code: `
          /**
           * @aCustomTag
           */
      `,
      errors: [
        {
          line: 3,
          message: 'Tag @aCustomTag must have either a type or namepath.',
        },
      ],
      options: [
        {
          allowEmptyNamepaths: false,
        },
      ],
      settings: {
        jsdoc: {
          structuredTags: {
            aCustomTag: {
              required: [
                'typeOrNameRequired',
              ],
            },
          },
        },
      },
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
          message: 'Tag @type must have a type.',
        },
      ],
    },
    {
      code: `
          /**
           * @modifies {bar | foo<}
           */
          function quux (foo, bar, baz) {}
      `,
      errors: [
        {
          line: 3,
          message: 'Syntax error in type: bar | foo<',
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
          line: 3,
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
          line: 3,
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
          message: 'Tag @define must have a type in "closure" mode.',
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
          message: 'Tag @this must have a type in "closure" mode.',
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
          line: 3,
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
          line: 3,
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
       * @module module:name<
       */
      `,
      errors: [
        {
          line: 3,
          message: 'Syntax error in namepath: module:name<',
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
          line: 3,
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
       * @aCustomTag name
       */
      `,
      errors: [
        {
          line: 3,
          message: '@aCustomTag should not have a name.',
        },
      ],
      settings: {
        jsdoc: {
          structuredTags: {
            aCustomTag: {
              name: false,
            },
          },
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
          line: 3,
          message: 'Tag @typedef must have a name/namepath in "jsdoc" mode.',
        },
      ],
      options: [
        {
          allowEmptyNamepaths: false,
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
          line: 3,
          message: '@private should not have a bracketed type in "jsdoc" mode.',
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
       * @aCustomTag {SomeType}
       */
      function quux () {}

      `,
      errors: [
        {
          line: 3,
          message: '@aCustomTag should not have a bracketed type.',
        },
      ],
      settings: {
        jsdoc: {
          structuredTags: {
            aCustomTag: {
              type: false,
            },
          },
        },
      },
    },
    {
      code: `
          /**
           * @see foo%
           */
          function quux() {

          }
      `,
      errors: [
        {
          line: 1,
          message: 'Cannot add "name" to `require` with the tag\'s `name` set to `false`',
        },
      ],
      settings: {
        jsdoc: {
          structuredTags: {
            see: {
              name: false,
              required: [
                'name',
              ],
            },
          },
        },
      },
    },
    {
      code: `
          /**
           * @see foo%
           */
          function quux() {

          }
      `,
      errors: [
        {
          line: 1,
          message: 'Cannot add "type" to `require` with the tag\'s `type` set to `false`',
        },
      ],
      settings: {
        jsdoc: {
          structuredTags: {
            see: {
              required: [
                'type',
              ],
              type: false,
            },
          },
        },
      },
    },
    {
      code: `
          /**
           * @see foo%
           */
          function quux() {

          }
      `,
      errors: [
        {
          line: 1,
          message: 'Cannot add "typeOrNameRequired" to `require` with the tag\'s `name` set to `false`',
        },
      ],
      settings: {
        jsdoc: {
          structuredTags: {
            see: {
              name: false,
              required: [
                'typeOrNameRequired',
              ],
            },
          },
        },
      },
    },
    {
      code: `
          /**
           * @see foo%
           */
          function quux() {

          }
      `,
      errors: [
        {
          line: 1,
          message: 'Cannot add "typeOrNameRequired" to `require` with the tag\'s `type` set to `false`',
        },
      ],
      settings: {
        jsdoc: {
          structuredTags: {
            see: {
              required: [
                'typeOrNameRequired',
              ],
              type: false,
            },
          },
        },
      },
    },
    {
      code: `
      /**
       * @template T<~, R
       * @param {function(!T): !R} parser
       * @return {function(!Array<!T>): !Array<!R>}
       */
      parseArray = function(parser) {
          return function(array) {
              return array.map(parser);
          };
      };
      `,
      errors: [
        {
          line: 3,
          message: 'Syntax error in namepath: T<~',
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
       * @template T, R<~
       * @param {function(!T): !R} parser
       * @return {function(!Array<!T>): !Array<!R>}
       */
      parseArray = function(parser) {
          return function(array) {
              return array.map(parser);
          };
      };
      `,
      errors: [
        {
          line: 3,
          message: 'Syntax error in namepath: R<~',
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
       * @template    T, R<~
       * @param {function(!T): !R} parser
       * @return {function(!Array<!T>): !Array<!R>}
       */
      parseArray = function(parser) {
          return function(array) {
              return array.map(parser);
          };
      };
      `,
      errors: [
        {
          line: 3,
          message: 'Syntax error in namepath: R<~',
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
       * @suppress
       */
      function quux () {}

      `,
      errors: [
        {
          line: 3,
          message: 'Tag @suppress must have a type in "closure" mode.',
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
       * @suppress {visibility} sth
       */
      function quux () {}

      `,
      errors: [
        {
          line: 3,
          message: '@suppress should not have a name in "closure" mode.',
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
       * @suppress {visibility|blah}
       */
      function quux () {}

      `,
      errors: [
        {
          line: 3,
          message: 'Syntax error in supresss type: blah',
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
          makeClass('Menu',
            /**
             * @constructs {abc}
             * @param items
             */
            function (items) { },
            {
                /** @memberof Menu# */
                show: function(){
                }
            }
          );
      `,
      errors: [
        {
          line: 4,
          message: '@constructs should not have a bracketed type.',
        },
      ],
      ignoreReadme: true,
    },
    {
      code: `
            /**
             * @emits
             */
            function quux (items) {
            }
      `,
      errors: [
        {
          line: 3,
          message: 'Tag @emits must have a name/namepath.',
        },
      ],
      ignoreReadme: true,
    },
    {
      code: `
            /**
             * @requires
             */
            function quux (items) {
            }
      `,
      errors: [
        {
          line: 3,
          message: 'Tag @requires must have a name/namepath.',
        },
      ],
      ignoreReadme: true,
    },
    {
      code: `
            /**
             * @exports {SomeType}
             */
            function quux (items) {
            }
      `,
      errors: [
        {
          line: 3,
          message: '@exports should not have a bracketed type in "jsdoc" mode.',
        },
      ],
      ignoreReadme: true,
    },
    {
      code: `
            /**
             * @external {SomeType}
             */
            function quux (items) {
            }
      `,
      errors: [
        {
          line: 3,
          message: '@external should not have a bracketed type.',
        },
      ],
      ignoreReadme: true,
    },
    {
      code: `
          /**
           *
           * @fires {module:namespace.SomeClass#event:ext_anevent} name
           */
          function quux() {

          }
      `,
      errors: [
        {
          line: 4,
          message: '@fires should not have a bracketed type.',
        },
      ],
      ignoreReadme: true,
    },
    {
      code: `
          /**
           *
           * @fires
           */
          function quux() {

          }
      `,
      errors: [
        {
          line: 4,
          message: 'Tag @fires must have a name/namepath.',
        },
      ],
      ignoreReadme: true,
    },
    {
      code: `
          /**
           *
           * @host {SomeType}
           */
          function quux() {

          }
      `,
      errors: [
        {
          line: 4,
          message: '@host should not have a bracketed type.',
        },
      ],
      ignoreReadme: true,
    },
    {
      code: `
      /**
       * @listens
       */
      function quux () {}

      `,
      errors: [
        {
          line: 3,
          message: 'Tag @listens must have a name/namepath.',
        },
      ],
      ignoreReadme: true,
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
      options: [
        {
          allowEmptyNamepaths: true,
        },
      ],
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
      settings: {
        jsdoc: {
          structuredTags: {
            see: {
              name: 'namepath-referencing',
              required: [
                'name',
              ],
            },
          },
        },
      },
    },
    {
      code: `
          /**
           *
           * @fires module:namespace.SomeClass#event:ext_anevent
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
           * @aCustomTag
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
           * @typedef {number | string} UserDefinedType
           */
      `,
    },
    {
      code: `
          /**
           * @typedef {number | string}
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
           * @modifies {foo | bar}
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
       * @interface foo
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
      parser: require.resolve('@typescript-eslint/parser'),
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
      options: [
        {
          allowEmptyNamepaths: false,
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
    {
      code: `
          /**
           * @param
           */
          function quux() {

          }
      `,
      options: [
        {
          allowEmptyNamepaths: false,
        },
      ],
    },
    {
      code: `
          /**
           * @see
           */
          function quux() {

          }
      `,
      settings: {
        jsdoc: {
          structuredTags: {
            see: {
              name: 'namepath-referencing',
            },
          },
        },
      },
    },
    {
      code: `
      /**
       * @template T, R
       * @param {function(!T): !R} parser
       * @return {function(!Array<!T>): !Array<!R>}
       */
      parseArray = function(parser) {
          return function(array) {
              return array.map(parser);
          };
      };
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
       * @template T, R<~
       * @param {function(!T): !R} parser
       * @return {function(!Array<!T>): !Array<!R>}
       */
      parseArray = function(parser) {
          return function(array) {
              return array.map(parser);
          };
      };
      `,
      settings: {
        jsdoc: {
          mode: 'jsdoc',
        },
      },
    },
    {
      code: `
      /**
       * @template {string} K - K must be a string or string literal
       * @template {{ serious: string }} Seriousalizable - must have a serious property
       * @param {K} key
       * @param {Seriousalizable} object
       */
      function seriousalize(key, object) {
        // ????
      }
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
       * @module foo/bar
       */
      `,
    },
    {
      code: `
      /**
       * @module module:foo/bar
       */
      `,
    },
    {
      code: `
      /**
       * @template invalid namepath,T Description
       */
      function f() {}
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
       * Description of complicated type.
       *
       * @template T Description of the T type parameter.
       * @template U - Like other tags, this can have an optional hyphen before the description.
       * @template V,W More parameters
       * @template W,X - Also with a hyphen
       */
      type ComplicatedType<T, U, V, W, X> = never
      `,
      parser: require.resolve('@typescript-eslint/parser'),
    },
    {
      code: `
      /** Multi-line typedef for an options object type.
       *
       * @typedef {{
       *   prop: number
       * }} MyOptions
       */
      `,
    },
    {
      code: `
      /**
       * Foo.
       *
       * @fires Foo#bar
       */
      export default class Foo {

      }
      `,
      ignoreReadme: true,
      parser: require.resolve('@typescript-eslint/parser'),
      parserOptions: {
        sourceType: 'module',
      },
    },
    {
      code: `
      /**
       * @extends {SomeType}
       */
      class quux {}

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
       * @suppress {visibility|underscore}
       */
      function quux() {
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
       * @param {string} id
       * @param {Object} options
       * @param {boolean} options.isSet
       * @param {string} options.module
       */
      function quux ( id, options ) {
      }
      `,
    },
    {
      code: `
            /**
             * @exports {SomeType}
             */
            function quux (items) {
            }
      `,
      ignoreReadme: true,
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
           * @function
           */
          function quux() {

          }
      `,
      ignoreReadme: true,
    },
    {
      code: `
        /**
         * @param {Store}          context
         * @param {Store.commit}   context.commit
         * @param {Store.getters}  context.getters
         * @param {Store.dispatch} context.dispatch
         * @param {object}         payload
         * @param {object}         payload.new
         * @param {string}         payload.libraryType
         */
        const updateStyleVersion = async (
          { commit, getters, dispatch },
          { new: newPayload, libraryType }
        ) => {
        }
      `,
      ignoreReadme: true,
      parserOptions: {
        ecmaVersion: 2_017,
      },
    },
  ],
};
