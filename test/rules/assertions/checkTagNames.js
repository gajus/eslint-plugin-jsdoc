import {
  jsdocTags,
  typeScriptTags,
  closureTags,
} from '../../../src/tagNames';

const buildTagBlock = (tags) => {
  return '/** \n * @' + Object.keys(tags).map((tagName, idx) => {
    return (idx === 0 ? '' : '\n * @') + tagName;
  })
    .join('') + '\n */';
};

const lineCount = (code) => {
  return code.match(/\n/ug).length;
};

// We avoid testing all closure tags as too many
const ALL_JSDOC_TAGS_COMMENT = buildTagBlock(jsdocTags);
const ALL_TYPESCRIPT_TAGS_COMMENT = buildTagBlock(typeScriptTags);
const ONE_CLOSURE_TAGS_COMMENT = buildTagBlock({
  externs: closureTags.externs,
});

export default {
  invalid: [
    {
      code: `
        /** @type {string} */
        let a;
      `,
      errors: [
        {
          line: 2,
          message: '\'@type\' is redundant when using a type system.',
        },
      ],
      options: [
        {
          typed: true,
        },
      ],
      output: `
        
        let a;
      `,
    },
    {
      code: `
        /** @type {string} - extra info */
        let a;
      `,
      errors: [
        {
          line: 2,
          message: '\'@type\' is redundant when using a type system.',
        },
      ],
      options: [
        {
          typed: true,
        },
      ],
      output: `
        /** - extra info */
        let a;
      `,
    },
    {
      code: `
        /**
         * Existing comment.
         *  @type {string}
         */
        let a;
      `,
      errors: [
        {
          line: 4,
          message: '\'@type\' is redundant when using a type system.',
        },
      ],
      options: [
        {
          typed: true,
        },
      ],
      output: `
        /**
         * Existing comment.
         */
        let a;
      `,
    },
    {
      code: `
        /** @abstract */
        let a;
      `,
      errors: [
        {
          line: 2,
          message: '\'@abstract\' is generally redundant outside of `declare` contexts when using a type system.',
        },
      ],
      options: [
        {
          typed: true,
        },
      ],
      output: `
        
        let a;
      `,
    },
    {
      code: `
        const a = {
          /** @abstract */
          b: true,
        };
      `,
      errors: [
        {
          line: 3,
          message: '\'@abstract\' is generally redundant outside of `declare` contexts when using a type system.',
        },
      ],
      options: [
        {
          typed: true,
        },
      ],
      output: `
        const a = {
          
          b: true,
        };
      `,
    },
    {
      code: `
        /** @template */
        let a;
      `,
      errors: [
        {
          line: 2,
          message: '\'@template\' without a name is redundant when using a type system.',
        },
      ],
      options: [
        {
          typed: true,
        },
      ],
      output: `
        
        let a;
      `,
    },
    {
      code: `
        /**
         * Prior description.
         *  
         * @template
         */
        let a;
      `,
      errors: [
        {
          line: 5,
          message: '\'@template\' without a name is redundant when using a type system.',
        },
      ],
      options: [
        {
          typed: true,
        },
      ],
      output: `
        /**
         * Prior description.
         *  
         */
        let a;
      `,
    },
    {
      code: `
        /** @param {string} */
        function takesOne(param) {}
      `,
      errors: [
        {
          line: 2,
          message: '\'@param\' without a description is redundant when using a type system.',
        },
      ],
      options: [
        {
          typed: true,
        },
      ],
      output: `
        
        function takesOne(param) {}
      `,
    },
    {
      code: `
        /** @param {boolean} param */
        function takesOne(param) {}
      `,
      errors: [
        {
          line: 2,
          message: '\'@param\' without a description is redundant when using a type system.',
        },
      ],
      options: [
        {
          typed: true,
        },
      ],
      output: `
        
        function takesOne(param) {}
      `,
    },
    {
      code: `
        /**
         * Existing comment
         *  @param {boolean} param
         */
        function takesOne(param) {}
      `,
      errors: [
        {
          line: 4,
          message: '\'@param\' without a description is redundant when using a type system.',
        },
      ],
      options: [
        {
          typed: true,
        },
      ],
      output: `
        /**
         * Existing comment
         */
        function takesOne(param) {}
      `,
    },
    {
      code: `
        /** @param {boolean} param - takes description */
        function takesOne(param) {}
      `,
      errors: [
        {
          line: 2,
          message: 'Describing the type of \'@param\' is redundant when using a type system.',
        },
      ],
      options: [
        {
          typed: true,
        },
      ],
      output: `
        /** @param param - takes description */
        function takesOne(param) {}
      `,
    },
    {
      code: `
        /** @typoo {string} */
        let a;
      `,
      errors: [
        {
          line: 2,
          message: 'Invalid JSDoc tag name "typoo".',
        },
      ],
    },
    {
      code: `
        /** @typoo {string} */
        let a;
      `,
      errors: [
        {
          line: 2,
          message: 'Invalid JSDoc tag name "typoo".',
        },
      ],
      settings: {
        jsdoc: {
          structuredTags: {
            parameter: {
              name: 'namepath-referencing',
              required: [
                'type', 'name',
              ],
              type: true,
            },
          },
        },
      },
    },
    {
      code: `
          /**
           * @Param
           */
          function quux () {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Invalid JSDoc tag name "Param".',
        },
      ],
    },
    {
      code: `
          /**
           * @foo
           */
          function quux () {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Invalid JSDoc tag name "foo".',
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
          message: 'Invalid JSDoc tag (preference). Replace "arg" JSDoc tag with "param".',
        },
      ],
      output: `
          /**
           * @param foo
           */
          function quux (foo) {

          }
      `,
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
          message: 'Invalid JSDoc tag (preference). Replace "param" JSDoc tag with "arg".',
        },
      ],
      output: `
          /**
           * @arg foo
           */
          function quux (foo) {

          }
      `,
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
           * @constructor foo
           */
          function quux (foo) {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Invalid JSDoc tag (preference). Replace "constructor" JSDoc tag with "cons".',
        },
      ],
      output: `
          /**
           * @cons foo
           */
          function quux (foo) {

          }
      `,
      settings: {
        jsdoc: {
          tagNamePreference: {
            'tag constructor': 'cons',
          },
        },
      },
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
          message: 'Invalid JSDoc tag (preference). Replace "arg" JSDoc tag with "somethingDifferent".',
        },
      ],
      output: `
          /**
           * @somethingDifferent foo
           */
          function quux (foo) {

          }
      `,
      settings: {
        jsdoc: {
          tagNamePreference: {
            arg: 'somethingDifferent',
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
          message: 'Invalid JSDoc tag (preference). Replace "param" JSDoc tag with "parameter".',
        },
      ],
      output: `
          /**
           * @parameter foo
           */
          function quux (foo) {

          }
      `,
      settings: {
        jsdoc: {
          tagNamePreference: {
            param: 'parameter',
          },
        },
      },
    },
    {
      code: `
          /**
           * @bar foo
           */
          function quux (foo) {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Invalid JSDoc tag name "bar".',
        },
      ],
    },
    {
      code: `
          /**
           * @baz @bar foo
           */
          function quux (foo) {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Invalid JSDoc tag name "baz".',
        },
      ],
      options: [
        {
          definedTags: [
            'bar',
          ],
        },
      ],
    },
    {
      code: `
            /**
             * @bar
             * @baz
             */
            function quux (foo) {

            }
        `,
      errors: [
        {
          line: 4,
          message: 'Invalid JSDoc tag name "baz".',
        },
      ],
      options: [
        {
          definedTags: [
            'bar',
          ],
        },
      ],
    },
    {
      code: `
          /**
           * @todo
           */
          function quux () {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Blacklisted tag found (`@todo`)',
        },
      ],
      settings: {
        jsdoc: {
          tagNamePreference: {
            todo: false,
          },
        },
      },
    },
    {
      code: `
          /**
           * @todo
           */
          function quux () {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Please resolve to-dos or add to the tracker',
        },
      ],
      settings: {
        jsdoc: {
          tagNamePreference: {
            todo: {
              message: 'Please resolve to-dos or add to the tracker',
            },
          },
        },
      },
    },
    {
      code: `
          /**
           * @todo
           */
          function quux () {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Please use x-todo instead of todo',
        },
      ],
      output: `
          /**
           * @x-todo
           */
          function quux () {

          }
      `,
      settings: {
        jsdoc: {
          tagNamePreference: {
            todo: {
              message: 'Please use x-todo instead of todo',
              replacement: 'x-todo',
            },
          },
        },
      },
    },
    {
      code: `
          /**
           * @todo
           */
          function quux () {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Please use x-todo instead of todo',
        },
      ],
      output: `
          /**
           * @x-todo
           */
          function quux () {

          }
      `,
      settings: {
        jsdoc: {
          tagNamePreference: {
            todo: {
              message: 'Please use x-todo instead of todo',
              replacement: 'x-todo',
            },
          },
        },
      },
    },
    {
      code: `
          /**
           * @todo
           */
          function quux () {

          }
      `,
      errors: [
        {
          line: 1,
          message: 'Invalid `settings.jsdoc.tagNamePreference`. Values must be falsy, a string, or an object.',
        },
        {
          line: 3,
          message: 'Invalid JSDoc tag (preference). Replace "todo" JSDoc tag with "55".',
        },
      ],
      output: `
          /**
           * @55
           */
          function quux () {

          }
      `,
      settings: {
        jsdoc: {
          tagNamePreference: {
            todo: 55,
          },
        },
      },
    },
    {
      code: `
          /**
           * @property {object} a
           * @prop {boolean} b
           */
          function quux () {

          }
      `,
      errors: [
        {
          line: 4,
          message: 'Invalid JSDoc tag (preference). Replace "prop" JSDoc tag with "property".',
        },
      ],
      output: `
          /**
           * @property {object} a
           * @property {boolean} b
           */
          function quux () {

          }
      `,
    },
    {
      code: `
          /**
           * @abc foo
           * @abcd bar
           */
          function quux () {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Invalid JSDoc tag (preference). Replace "abc" JSDoc tag with "abcd".',
        },
      ],
      options: [
        {
          definedTags: [
            'abcd',
          ],
        },
      ],
      output: `
          /**
           * @abcd foo
           * @abcd bar
           */
          function quux () {

          }
      `,
      settings: {
        jsdoc: {
          tagNamePreference: {
            abc: 'abcd',
          },
        },
      },
    },
    {
      code: `
          /**
           * @abc
           * @abcd
           */
          function quux () {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Invalid JSDoc tag (preference). Replace "abc" JSDoc tag with "abcd".',
        },
      ],
      output: `
          /**
           * @abcd
           * @abcd
           */
          function quux () {

          }
      `,
      settings: {
        jsdoc: {
          tagNamePreference: {
            abc: 'abcd',
          },
        },
      },
    },
    {
      code: `
      /**
       * @returns
       */
      function quux (foo) {}
      `,
      errors: [
        {
          line: 3,
          message: 'Invalid JSDoc tag (preference). Replace "returns" JSDoc tag with "return".',
        },
      ],
      output: `
      /**
       * @return
       */
      function quux (foo) {}
      `,
      settings: {
        jsdoc: {
          mode: 'closure',
        },
      },
    },
    {
      code: `${ALL_JSDOC_TAGS_COMMENT}\nfunction quux (foo) {}`,
      errors: [
        {
          line: 1,
          message: 'Unrecognized value `badMode` for `settings.jsdoc.mode`.',
        },
      ],
      settings: {
        jsdoc: {
          mode: 'badMode',
        },
      },
    },
    {
      code: `${ALL_TYPESCRIPT_TAGS_COMMENT}\nfunction quux (foo) {}`,
      errors: [
        {
          line: lineCount(ALL_TYPESCRIPT_TAGS_COMMENT) - 1,
          message: 'Invalid JSDoc tag name "internal".',
        },
        {
          line: lineCount(ALL_TYPESCRIPT_TAGS_COMMENT),
          message: 'Invalid JSDoc tag name "template".',
        },
      ],
    },
    {
      code: `${ONE_CLOSURE_TAGS_COMMENT}\nfunction quux (foo) {}`,
      errors: [
        {
          line: lineCount(ONE_CLOSURE_TAGS_COMMENT),
          message: 'Invalid JSDoc tag name "externs".',
        },
      ],
    },
    {
      code: `
        /** @jsx h */
        /** @jsxFrag Fragment */
        /** @jsxImportSource preact */
        /** @jsxRuntime automatic */
      `,
      errors: [
        {
          line: 2,
          message: 'Invalid JSDoc tag name "jsx".',
        },
        {
          line: 3,
          message: 'Invalid JSDoc tag name "jsxFrag".',
        },
        {
          line: 4,
          message: 'Invalid JSDoc tag name "jsxImportSource".',
        },
        {
          line: 5,
          message: 'Invalid JSDoc tag name "jsxRuntime".',
        },
      ],
    },
    {
      code: `
      /**
       * @constructor
       */
      function Test() {
        this.works = false;
      }
      `,
      errors: [
        {
          line: 3,
          message: 'Invalid JSDoc tag (preference). Replace "constructor" JSDoc tag with "class".',
        },
      ],
      output: `
      /**
       * @class
       */
      function Test() {
        this.works = false;
      }
      `,
      settings: {
        jsdoc: {
          tagNamePreference: {
            returns: 'return',
          },
        },
      },
    },
  ],
  valid: [
    {
      code: `
        /** @abstract */
        let a;
      `,
      filename: 'file.d.ts',
      options: [
        {
          typed: true,
        },
      ],
    },
    {
      code: `
        /** @abstract */
        declare let a;
      `,
      filename: 'file.d.ts',
      options: [
        {
          typed: true,
        },
      ],
      parser: require.resolve('@typescript-eslint/parser'),
    },
    {
      code: `
        /** @abstract */
        { declare let a; }
      `,
      filename: 'file.d.ts',
      options: [
        {
          typed: true,
        },
      ],
      parser: require.resolve('@typescript-eslint/parser'),
    },
    {
      code: `
        function test() {
          /** @abstract */
          declare let a;
        }
      `,
      filename: 'file.d.ts',
      options: [
        {
          typed: true,
        },
      ],
      parser: require.resolve('@typescript-eslint/parser'),
    },
    {
      code: `
        /** @abstract - default */
        let a;
      `,
      options: [
        {
          typed: true,
        },
      ],
    },
    {
      code: `
        /** @template name */
        let a;
      `,
      options: [
        {
          definedTags: [
            'template',
          ],
          typed: true,
        },
      ],
    },
    {
      code: `
        /** @param param - takes information */
        function takesOne(param) {}
      `,
      options: [
        {
          typed: true,
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
    },
    {
      code: `
          /**
           * @memberof! foo
           */
          function quux (foo) {

          }
      `,
    },
    {
      code: `
          /**
           * @arg foo
           */
          function quux (foo) {

          }
      `,
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
           * @parameter foo
           */
          function quux (foo) {

          }
      `,
      settings: {
        jsdoc: {
          structuredTags: {
            parameter: {
              name: 'namepath-referencing',
              required: [
                'type', 'name',
              ],
              type: true,
            },
          },
        },
      },
    },
    {
      code: `
          /**
           * @bar foo
           */
          function quux (foo) {

          }
      `,
      options: [
        {
          definedTags: [
            'bar',
          ],
        },
      ],
    },
    {
      code: `
          /**
           * @baz @bar foo
           */
          function quux (foo) {

          }
      `,
      options: [
        {
          definedTags: [
            'baz', 'bar',
          ],
        },
      ],
    },
    {
      code: `
          /**
           * @baz @bar foo
           */
          function quux (foo) {

          }
      `,
      settings: {
        jsdoc: {
          tagNamePreference: {
            param: 'baz',
            returns: {
              message: 'Prefer `bar`',
              replacement: 'bar',
            },
            todo: false,
          },
        },
      },
    },
    {
      code: `
      /**
       * @returns
       */
      function quux (foo) {}
      `,
    },
    {
      code: `
      /**
       * @return
       */
      function quux (foo) {}
      `,
      settings: {
        jsdoc: {
          mode: 'closure',
        },
      },
    },
    {
      code: `${ALL_JSDOC_TAGS_COMMENT}\nfunction quux (foo) {}`,
    },
    {
      code: `${ALL_TYPESCRIPT_TAGS_COMMENT}\nfunction quux (foo) {}`,
      settings: {
        jsdoc: {
          mode: 'typescript',
        },
      },
    },
    {
      code: `${ONE_CLOSURE_TAGS_COMMENT}\nfunction quux (foo) {}`,
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
    {
      code: `
          /**
           * @todo
           */
          function quux () {

          }
      `,
    },
    {
      code: `
          /**
           * @extends Foo
           */
          function quux () {

          }
      `,
      settings: {
        jsdoc: {
          tagNamePreference: {
            augments: {
              message: '@extends is to be used over @augments.',
              replacement: 'extends',
            },
          },
        },
      },
    },
    {
      code: `
          /**
           * (Set tag name preference to itself to get aliases to
           *   work along with main tag name.)
           * @augments Bar
           * @extends Foo
           */
          function quux () {
          }
      `,
      settings: {
        jsdoc: {
          tagNamePreference: {
            extends: 'extends',
          },
        },
      },
    },
    {
      code: `
      /**
       * Registers the \`target\` class as a transient dependency; each time the dependency is resolved a new instance will be created.
       *
       * @param target - The class / constructor function to register as transient.
       *
       * @example \`\`\`ts
      @transient()
      class Foo { }
      \`\`\`
       * @param Time for a new tag
       */
      export function transient<T>(target?: T): T {
        // ...
      }
`,
      parser: require.resolve('@typescript-eslint/parser'),
      parserOptions: {
        sourceType: 'module',
      },
    },
    {
      code: `
        /** @jsx h */
        /** @jsxFrag Fragment */
        /** @jsxImportSource preact */
        /** @jsxRuntime automatic */
      `,
      options: [
        {
          jsxTags: true,
        },
      ],
    },
    {
      code: `
      /**
       * @internal
       */
      `,
      settings: {
        jsdoc: {
          mode: 'typescript',
        },
      },
    },
  ],
};
