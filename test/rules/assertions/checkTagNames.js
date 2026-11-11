import {
  closureTags,
  jsdocTags,
  typeScriptTags,
} from '../../../src/tagNames.js';
import {
  parser as typescriptEslintParser,
} from 'typescript-eslint';

/**
 * @param {import('../../../src/tagNames.js').AliasedTags} tags
 * @returns {string}
 */
const buildTagBlock = (tags) => {
  return '/** \n * @' + Object.keys(tags).map((tagName, idx) => {
    return (idx === 0 ? '' : '\n * @') + tagName;
  })
    .join('') + '\n */';
};

/**
 * @typedef {number} Integer
 */

/**
 * @param {string} code
 * @returns {Integer}
 */
const lineCount = (code) => {
  return /** @type {RegExpMatchArray} */ (code.match(/\n/gv)).length;
};

// We avoid testing all closure tags as too many
const ALL_JSDOC_TAGS_COMMENT = buildTagBlock(jsdocTags);
const ALL_TYPESCRIPT_TAGS_COMMENT = buildTagBlock(typeScriptTags);
const ONE_CLOSURE_TAGS_COMMENT = buildTagBlock({
  externs: closureTags.externs,
});

export default /** @type {import('../index.js').TestCases} */ ({
  invalid: [
    {
      code: `/** @type {string} */let a;
      `,
      errors: [
        {
          line: 1,
          message: '\'@type\' is redundant when using a type system.',
        },
      ],
      options: [
        {
          typed: true,
        },
      ],
      output: `let a;
      `,
    },
    {
      code: `/** @type {string} */let a;
      `,
      errors: [
        {
          line: 1,
          message: '\'@type\' is redundant when using a type system.',
        },
      ],
      options: [
        {
          enableFixer: false,
          typed: true,
        },
      ],
    },
    {
      code: `/** @type {string} */ let a;
      `,
      errors: [
        {
          line: 1,
          message: '\'@type\' is redundant when using a type system.',
        },
      ],
      options: [
        {
          typed: true,
        },
      ],
      output: `let a;
      `,
    },
    {
      code: `/** @type {string} */
        let a;
      `,
      errors: [
        {
          line: 1,
          message: '\'@type\' is redundant when using a type system.',
        },
      ],
      options: [
        {
          typed: true,
        },
      ],
      output: `        let a;
      `,
    },
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
          message: '\'@abstract\' is redundant outside of ambient (`declare`/`.d.ts`) contexts when using a type system.',
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
        /** @abstract */
        let a;
      `,
      errors: [
        {
          line: 2,
          message: '\'@abstract\' is redundant outside of ambient (`declare`/`.d.ts`) contexts when using a type system.',
        },
      ],
      options: [
        {
          enableFixer: false,
          typed: true,
        },
      ],
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
          message: '\'@abstract\' is redundant outside of ambient (`declare`/`.d.ts`) contexts when using a type system.',
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
        // TSDoc
        'alpha',
        'beta',
        'decorator',
        'eventProperty',
        'experimental',
        'packageDocumentation',
        'privateRemarks',
        'remarks',
        'sealed',

        // TypeDoc
        'category',
        'categoryDescription',
        'disableGroups',
        'document',
        'expand',
        'expandType',
        'group',
        'groupDescription',
        'hidden',
        'hideCategories',
        'hideGroups',
        'inline',
        'inlineType',
        'mergeModuleWith',
        'preventExpand',
        'preventInline',
        'primaryExport',
        'showCategories',
        'showGroups',
        'sortStrategy',
        'useDeclaredType',

        // JSDoc/TypeScript
        'import', 'internal', 'jsx', 'overload', 'satisfies', 'template',
      ].map((tagName, idx, arr) => {
        return {
          line: lineCount(ALL_TYPESCRIPT_TAGS_COMMENT) - arr.length + idx + 1,
          message: `Invalid JSDoc tag name "${tagName}".`,
        };
      }),
      settings: {
        jsdoc: {
          mode: 'jsdoc',
        },
      },
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
        /** @jsxFrag Fragment */
        /** @jsxImportSource preact */
        /** @jsxRuntime automatic */
      `,
      errors: [
        {
          line: 2,
          message: 'Invalid JSDoc tag name "jsxFrag".',
        },
        {
          line: 3,
          message: 'Invalid JSDoc tag name "jsxImportSource".',
        },
        {
          line: 4,
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
    {
      code: `
      /** @typedef {Object} MyObject
       * @property {string} id - my id
       */
      `,
      errors: [
        {
          line: 2,
          message: '\'@typedef\' is redundant when using a type system.',
        },
        {
          line: 3,
          message: '\'@property\' is redundant when using a type system.',
        },
      ],
      options: [
        {
          typed: true,
        },
      ],
      output: `
      /**
       * @property {string} id - my id
       */
      `,
    },
    {
      code: `
      /**
       * @property {string} id - my id
       */
      `,
      errors: [
        {
          line: 3,
          message: '\'@property\' is redundant when using a type system.',
        },
      ],
      options: [
        {
          typed: true,
        },
      ],
      output: `
      /**
       * id - my id
       */
      `,
    },
    {
      code: `
      /** @typedef {Object} MyObject */
      `,
      errors: [
        {
          line: 2,
          message: '\'@typedef\' is redundant when using a type system.',
        },
      ],
      options: [
        {
          typed: true,
        },
      ],
      output: `
      `,
    },
    {
      code: `
      /** @typedef {Object} MyObject
       */
      `,
      errors: [
        {
          line: 2,
          message: '\'@typedef\' is redundant when using a type system.',
        },
      ],
      options: [
        {
          typed: true,
        },
      ],
      output: `
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
      errors: [
        {
          line: 3,
          message: 'Please don\'t use todo',
        },
      ],
      settings: {
        jsdoc: {
          tagNamePreference: {
            todo: {
              message: 'Please don\'t use todo',
            },
          },
        },
      },
    },
    {
      code: `
        /**
         * An {@inline sth} tag in the description and {@another} with a {@link}.
         * @param {SomeType} name And an {@inlineTag} inside a tag description.
         * @param {AnotherType} anotherName And yet {@another}
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Invalid JSDoc inline tag name "inline"',
        },
        {
          line: 3,
          message: 'Invalid JSDoc inline tag name "another"',
        },
        {
          line: 4,
          message: 'Invalid JSDoc inline tag name "inlineTag"',
        },
        {
          line: 5,
          message: 'Invalid JSDoc inline tag name "another"',
        },
      ],
    },
    {
      code: `
        export class Foo {
          /**
           * Internal.
           * @private
           */
          private bar = 1;
        }
      `,
      errors: [
        {
          line: 5,
          message: '\'@private\' is redundant when using a type system.',
        },
      ],
      filename: 'file.ts',
      languageOptions: {
        parser: typescriptEslintParser,
      },
      options: [
        {
          typed: true,
        },
      ],
      output: `
        export class Foo {
          /**
           * Internal.
           */
          private bar = 1;
        }
      `,
    },
    {
      code: `
        /**
         * @prop BASIC - icon, title, message, expandedMessage, up to two buttons.
         * @prop IMAGE - icon, title, message, expandedMessage, image, up to two buttons.
         */
        declare const TemplateType: {
            BASIC: 'basic',
            IMAGE: 'image',
        }
      `,
      errors: [
        {
          line: 3,
          message: 'Invalid JSDoc tag (preference). Replace "prop" JSDoc tag with "property".',
        },
        {
          line: 4,
          message: 'Invalid JSDoc tag (preference). Replace "prop" JSDoc tag with "property".',
        },
      ],
      filename: 'file.d.ts',
      languageOptions: {
        parser: typescriptEslintParser,
      },
      options: [
        {
          typed: true,
        },
      ],
      output: `
        declare const TemplateType: {
            /**
             * icon, title, message, expandedMessage, up to two buttons.
             */
            BASIC: 'basic',
            /**
             * icon, title, message, expandedMessage, image, up to two buttons.
             */
            IMAGE: 'image',
        }
      `,
    },
    {
      code: `
        /**
         * @prop BASIC - icon, title, message, expandedMessage, up to two buttons.
         * @prop MISSING - not a property of this object.
         */
        declare const TemplateType: {
            BASIC: 'basic',
            IMAGE: 'image',
        }
      `,
      errors: [
        {
          line: 3,
          message: 'Invalid JSDoc tag (preference). Replace "prop" JSDoc tag with "property".',
        },
        {
          line: 4,
          message: 'Invalid JSDoc tag (preference). Replace "prop" JSDoc tag with "property".',
        },
      ],
      filename: 'file.d.ts',
      languageOptions: {
        parser: typescriptEslintParser,
      },
      options: [
        {
          typed: true,
        },
      ],
      output: `
        /**
         * BASIC - icon, title, message, expandedMessage, up to two buttons.
         * MISSING - not a property of this object.
         */
        declare const TemplateType: {
            BASIC: 'basic',
            IMAGE: 'image',
        }
      `,
    },
    {
      code: `
        /**
         * Kinds of template.
         * @property BASIC - icon, title
         *   and up to two buttons.
         * @property IMAGE - image
         */
        export const TemplateType = {
            1: 'one',
            'IMAGE': 'image',
            [extra]: true,
            ...rest,
            BASIC: 'basic',
        };
      `,
      errors: [
        {
          line: 4,
          message: '\'@property\' is redundant when using a type system.',
        },
        {
          line: 6,
          message: '\'@property\' is redundant when using a type system.',
        },
      ],
      filename: 'file.ts',
      languageOptions: {
        parser: typescriptEslintParser,
      },
      options: [
        {
          typed: true,
        },
      ],
      output: `
        /**
         * Kinds of template.
         */
        export const TemplateType = {
            1: 'one',
            /**
             * image
             */
            'IMAGE': 'image',
            [extra]: true,
            ...rest,
            /**
             * icon, title
             * and up to two buttons.
             */
            BASIC: 'basic',
        };
      `,
    },
    {
      code: `
        /**
         * @property BASIC - icon, title, message, expandedMessage, up to two buttons.
         * @property IMAGE - icon, title, message, expandedMessage, image, up to two buttons.
         */
        const TemplateType = {
            /** Already documented. */
            BASIC: 'basic',
            IMAGE: 'image',
        };
      `,
      errors: [
        {
          line: 3,
          message: '\'@property\' is redundant when using a type system.',
        },
        {
          line: 4,
          message: '\'@property\' is redundant when using a type system.',
        },
      ],
      options: [
        {
          typed: true,
        },
      ],
      output: `
        /**
         * BASIC - icon, title, message, expandedMessage, up to two buttons.
         * IMAGE - icon, title, message, expandedMessage, image, up to two buttons.
         */
        const TemplateType = {
            /** Already documented. */
            BASIC: 'basic',
            IMAGE: 'image',
        };
      `,
    },
    {
      code: `
        /**
         * @property a - desc
         */
        const [a] = [];
      `,
      errors: [
        {
          line: 3,
          message: '\'@property\' is redundant when using a type system.',
        },
      ],
      options: [
        {
          typed: true,
        },
      ],
      output: `
        /**
         * a - desc
         */
        const [a] = [];
      `,
    },
    {
      code: `
        /**
         * @property - orphan
         */
        export {};
      `,
      errors: [
        {
          line: 3,
          message: '\'@property\' is redundant when using a type system.',
        },
      ],
      options: [
        {
          typed: true,
        },
      ],
      output: `
        /**
         * - orphan
         */
        export {};
      `,
    },
    {
      code: `
        /**
         * @property BASIC - one
         * @property BASIC - two
         */
        const obj = {
            BASIC: 1,
        };
      `,
      errors: [
        {
          line: 3,
          message: '\'@property\' is redundant when using a type system.',
        },
        {
          line: 4,
          message: '\'@property\' is redundant when using a type system.',
        },
      ],
      options: [
        {
          typed: true,
        },
      ],
      output: `
        /**
         * BASIC - one
         * BASIC - two
         */
        const obj = {
            BASIC: 1,
        };
      `,
    },
    {
      code: `/** @property BASIC */
const obj = {
    BASIC: 1,
};
`,
      errors: [
        {
          line: 1,
          message: '\'@property\' is redundant when using a type system.',
        },
      ],
      options: [
        {
          typed: true,
        },
      ],
      output: `const obj = {
    BASIC: 1,
};
`,
    },
    {
      code: `/** @property BASIC */const obj = {BASIC: 1};
`,
      errors: [
        {
          line: 1,
          message: '\'@property\' is redundant when using a type system.',
        },
      ],
      options: [
        {
          typed: true,
        },
      ],
      output: `const obj = {BASIC: 1};
`,
    },
    {
      code: `/** @property BASIC - icon
 * @param foo
 */
const obj = {
    BASIC: 1,
};
`,
      errors: [
        {
          line: 1,
          message: '\'@property\' is redundant when using a type system.',
        },
      ],
      options: [
        {
          typed: true,
        },
      ],
      output: `/**
 * @param foo
 */
const obj = {
    /**
     * icon
     */
    BASIC: 1,
};
`,
    },
    {
      code: `/**
 * @param foo
 * @property BASIC - icon */
const obj = {
    BASIC: 1,
};
`,
      errors: [
        {
          line: 3,
          message: '\'@property\' is redundant when using a type system.',
        },
      ],
      options: [
        {
          typed: true,
        },
      ],
      output: `/**
 * @param foo
 */
const obj = {
    /**
     * icon
     */
    BASIC: 1,
};
`,
    },
    {
      code: '/**\r\n * Kinds.\r\n * @property BASIC - icon\r\n *\r\n * more\r\n */\r\nconst obj = {\r\n    BASIC: 1,\r\n};\r\n',
      errors: [
        {
          line: 3,
          message: '\'@property\' is redundant when using a type system.',
        },
      ],
      options: [
        {
          typed: true,
        },
      ],
      output: '/**\r\n * Kinds.\r\n */\r\nconst obj = {\r\n    /**\r\n     * icon\r\n     *\r\n     * more\r\n     */\r\n    BASIC: 1,\r\n};\r\n',
    },
    {
      code: `
        /**
         * @property
         */
        const obj = {
            BASIC: 1,
        };
      `,
      errors: [
        {
          line: 3,
          message: '\'@property\' is redundant when using a type system.',
        },
      ],
      options: [
        {
          typed: true,
        },
      ],
      output: `
        const obj = {
            BASIC: 1,
        };
      `,
    },
  ],
  valid: [
    {
      code: `
        /** @default 0 */
        let a;
      `,
      filename: 'file.ts',
      languageOptions: {
        parser: typescriptEslintParser,
      },
      options: [
        {
          typed: true,
        },
      ],
    },
    {
      code: `
        /** @default 0 */
        declare let a;
      `,
      filename: 'file.d.ts',
      languageOptions: {
        parser: typescriptEslintParser,
      },
      options: [
        {
          typed: true,
        },
      ],
    },
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
      languageOptions: {
        parser: typescriptEslintParser,
      },
      options: [
        {
          typed: true,
        },
      ],
    },
    {
      code: `
        /** @abstract */
        { declare let a; }
      `,
      filename: 'file.d.ts',
      languageOptions: {
        parser: typescriptEslintParser,
      },
      options: [
        {
          typed: true,
        },
      ],
    },
    {
      code: `
        function test() {
          /** @abstract */
          declare let a;
        }
      `,
      filename: 'file.d.ts',
      languageOptions: {
        parser: typescriptEslintParser,
      },
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
      languageOptions: {
        parser: typescriptEslintParser,
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
    {
      code: `
        interface WebTwain {
          /**
           * Converts the images specified by the indices to base64 synchronously.
           * @function WebTwain#ConvertToBase64
           * @returns {Base64Result}

          ConvertToBase64(): Base64Result;
          */

          /**
           * Converts the images specified by the indices to base64 asynchronously.
           * @function WebTwain#ConvertToBase64
           * @returns {boolean}
           */
          ConvertToBase64(): boolean;
        }
      `,
      languageOptions: {
        parser: typescriptEslintParser,
      },
    },
    {
      code: `
        /**
         * @overload
         * @satisfies
         */
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
         * @module
         * A comment related to the module
         */
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
         * An {@inline sth} tag in the description and {@another} with a {@link}.
         * @param {SomeType} name And an {@inlineTag} inside a tag description.
         * @param {AnotherType} anotherName And yet {@another}
         */
      `,
      options: [
        {
          inlineTags: [
            'inline',
            'another',
            'inlineTag',
            'link',
          ],
        },
      ],
    },
    {
      code: `
        /**
         * @typeParam T
         */
      `,
      settings: {
        jsdoc: {
          tagNamePreference: {
            template: 'typeParam',
          },
        },
      },
    },
    {
      code: `
        /**
         * @ember/debug etc. etc.
         */
      `,
      options: [
        {
          typed: true,
        },
      ],
    },
    {
      code: `
        /** @public */
        export const docs = {};
      `,
      filename: 'file.ts',
      languageOptions: {
        parser: typescriptEslintParser,
      },
      options: [
        {
          typed: true,
        },
      ],
    },
    {
      code: `
        /**
         * Creates a router.
         *
         * @public
         */
        export function createRouter () {}
      `,
      options: [
        {
          typed: true,
        },
      ],
    },
    {
      code: `
        export interface Options {
          /**
           * @private
           */
          name: string;
        }
      `,
      filename: 'file.ts',
      languageOptions: {
        parser: typescriptEslintParser,
      },
      options: [
        {
          typed: true,
        },
      ],
    },
    {
      code: `
        /** @protected */
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
         * @prop BASIC - kept because \`prop\` is explicitly allowed.
         */
        const TemplateType = {
            BASIC: 'basic',
        };
      `,
      options: [
        {
          typed: true,
        },
      ],
      settings: {
        jsdoc: {
          tagNamePreference: {
            prop: 'prop',
          },
        },
      },
    },
  ],
});
