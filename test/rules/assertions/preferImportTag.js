export default {
  invalid: [
    {
      code: `
        /**
         * @type {import('eslint').Rule.Node}
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Inline `import()` found; prefer `@import`',
        },
      ],
      output: `/** @import * as eslint from 'eslint'; */
        /**
         * @type {eslint.Rule.Node}
         */
      `,
    },
    {
      code: `
        /**
         * @type {import('eslint').Rule.Node}
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Inline `import()` found; prefer `@import`',
        },
      ],
      output: `/** @import * as eslint from 'eslint'; */
        /**
         * @type {eslint.Rule.Node}
         */
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
         * @type {import('eslint').Rule.Node}
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Inline `import()` found; prefer `@import`',
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
         * @type {import('eslint').Rule.Node}
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Inline `import()` found; prefer `@import`',
        },
      ],
      options: [
        {
          outputType: 'named-import',
        },
      ],
      output: `/** @import { Rule } from 'eslint'; */
        /**
         * @type {Rule.Node}
         */
      `,
    },
    {
      code: `
        /**
         * @type {import('eslint').Rule.Node}
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Inline `import()` found; prefer `@import`',
        },
      ],
      options: [
        {
          outputType: 'namespaced-import',
        },
      ],
      output: `/** @import * as eslint from 'eslint'; */
        /**
         * @type {eslint.Rule.Node}
         */
      `,
    },
    {
      code: `
        /**
         * @type {import('eslint').Rule['Node']}
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Inline `import()` found; prefer `@import`',
        },
      ],
      options: [
        {
          outputType: 'named-import',
        },
      ],
      output: `/** @import { Rule } from 'eslint'; */
        /**
         * @type {Rule['Node']}
         */
      `,
    },
    {
      code: `
        /**
         * @type {import('eslint').Rule['Node']}
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Inline `import()` found; prefer `@import`',
        },
      ],
      options: [
        {
          outputType: 'namespaced-import',
        },
      ],
      output: `/** @import * as eslint from 'eslint'; */
        /**
         * @type {eslint.Rule['Node']}
         */
      `,
    },
    {
      code: `
        /** @typedef {import('eslint2').Rule.Node} RuleNode  */
        /**
         * @type {import('eslint').Rule.Node}
         */
      `,
      errors: [
        {
          line: 2,
          message: 'Inline `import()` found; prefer `@import`',
        },
        {
          line: 4,
          message: 'Inline `import()` found; prefer `@import`',
        },
      ],
      options: [
        {
          exemptTypedefs: false,
        },
      ],
      output: `/** @import * as eslint2 from 'eslint2'; */
        /** @typedef {eslint2.Rule.Node} RuleNode  */
        /**
         * @type {import('eslint').Rule.Node}
         */
      `,
    },
    {
      code: `
        /**
         * @type {import('eslint')}
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Inline `import()` found; prefer `@import`',
        },
      ],
      output: `/** @import * as eslint from 'eslint'; */
        /**
         * @type {eslint}
         */
      `,
    },
    {
      code: `
        /**
         * @type {import('eslint')}
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Inline `import()` found; prefer `@import`',
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
         * @type {import('eslint').default}
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Inline `import()` found; prefer `@import`',
        },
      ],
      output: `/** @import eslint from 'eslint'; */
        /**
         * @type {eslint}
         */
      `,
    },
    {
      code: `
        /**
         * @type {import('eslint').default}
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Inline `import()` found; prefer `@import`',
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
        /** @import * as eslint2 from 'eslint'; */
        /**
         * @type {import('eslint')}
         */
      `,
      errors: [
        {
          line: 4,
          message: 'Inline `import()` found; prefer `@import`',
        },
      ],
      output: `
        /** @import * as eslint2 from 'eslint'; */
        /**
         * @type {eslint2}
         */
      `,
    },
    {
      code: `
        /** @import eslint2 from 'eslint'; */
        /**
         * @type {import('eslint').default}
         */
      `,
      errors: [
        {
          line: 4,
          message: 'Inline `import()` found; prefer `@import`',
        },
      ],
      output: `
        /** @import eslint2 from 'eslint'; */
        /**
         * @type {eslint2}
         */
      `,
    },
    {
      code: `
        /** @import eslint2 from 'eslint'; */
        /**
         * @type {import('eslint').default}
         */
      `,
      errors: [
        {
          line: 4,
          message: 'Inline `import()` found; prefer `@import`',
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
        /** @import {Rule} from 'eslint' */
        /**
         * @type {import('eslint').Rule.Node}
         */
      `,
      errors: [
        {
          line: 4,
          message: 'Inline `import()` found; prefer `@import`',
        },
      ],
      output: `
        /** @import {Rule} from 'eslint' */
        /**
         * @type {Rule.Node}
         */
      `,
    },
    {
      code: `
        /** @import {Rule} from 'eslint' */
        /**
         * @type {import('eslint').Rule.Node}
         */
      `,
      errors: [
        {
          line: 4,
          message: 'Inline `import()` found; prefer `@import`',
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
        /** @import * as eslint2 from 'eslint' */
        /**
         * @type {import('eslint').Rule.Node}
         */
      `,
      errors: [
        {
          line: 4,
          message: 'Inline `import()` found; prefer `@import`',
        },
      ],
      output: `
        /** @import * as eslint2 from 'eslint' */
        /**
         * @type {eslint2.Rule.Node}
         */
      `,
    },
    {
      code: `
        /** @import * as eslint2 from 'eslint' */
        /**
         * @type {import('eslint').Rule.Node}
         */
      `,
      errors: [
        {
          line: 4,
          message: 'Inline `import()` found; prefer `@import`',
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
        /** @import LinterDef2, * as LinterDef3 from "eslint" */
        /**
         * @type {import('eslint').Rule.Node}
         */
      `,
      errors: [
        {
          line: 4,
          message: 'Inline `import()` found; prefer `@import`',
        },
      ],
      output: `
        /** @import LinterDef2, * as LinterDef3 from "eslint" */
        /**
         * @type {LinterDef3.Rule.Node}
         */
      `,
    },
    {
      code: `
        /**
         * @import LinterDef2, * as LinterDef3 from "eslint"
         */
        /**
         * @type {import('eslint').Rule.Node}
         */
      `,
      errors: [
        {
          line: 6,
          message: 'Inline `import()` found; prefer `@import`',
        },
      ],
      output: `
        /**
         * @import LinterDef2, * as LinterDef3 from "eslint"
         */
        /**
         * @type {LinterDef3.Rule.Node}
         */
      `,
    },
    {
      code: `
        /**
         * @import LinterDef2,
         *   * as LinterDef3 from "eslint"
         */
        /**
         * @type {import('eslint').Rule.Node}
         */
      `,
      errors: [
        {
          line: 7,
          message: 'Inline `import()` found; prefer `@import`',
        },
      ],
      output: `
        /**
         * @import LinterDef2,
         *   * as LinterDef3 from "eslint"
         */
        /**
         * @type {LinterDef3.Rule.Node}
         */
      `,
    },
    {
      code: `
        /**
         * @import {
         *   ESLint
         * } from "eslint"
         */
        /**
         * @type {import('eslint').ESLint.Node}
         */
      `,
      errors: [
        {
          line: 8,
          message: 'Inline `import()` found; prefer `@import`',
        },
      ],
      output: `
        /**
         * @import {
         *   ESLint
         * } from "eslint"
         */
        /**
         * @type {ESLint.Node}
         */
      `,
    },
    {
      code: `
        /** @typedef {import('eslint').Rule} Rule  */
        /**
         * @type {import('eslint').Rule.Node}
         */
      `,
      errors: [
        {
          line: 4,
          message: 'Inline `import()` found; using `@typedef`',
        },
      ],
      options: [
        {
          exemptTypedefs: true,
        },
      ],
      output: `
        /** @typedef {import('eslint').Rule} Rule  */
        /**
         * @type {Rule.Node}
         */
      `,
    },
    {
      code: `
        /** @typedef {import('eslint').Rule} Rule  */
        /**
         * @type {import('eslint').Rule.Node.Abc.Def}
         */
      `,
      errors: [
        {
          line: 4,
          message: 'Inline `import()` found; using `@typedef`',
        },
      ],
      options: [
        {
          exemptTypedefs: true,
        },
      ],
      output: `
        /** @typedef {import('eslint').Rule} Rule  */
        /**
         * @type {Rule.Node.Abc.Def}
         */
      `,
    },
    {
      code: `
        /** @typedef {import('eslint').Rule} Rule  */
        /**
         * @type {import('eslint').Rule.Node.Abc['Def']}
         */
      `,
      errors: [
        {
          line: 4,
          message: 'Inline `import()` found; using `@typedef`',
        },
      ],
      options: [
        {
          exemptTypedefs: true,
        },
      ],
      output: `
        /** @typedef {import('eslint').Rule} Rule  */
        /**
         * @type {Rule.Node.Abc['Def']}
         */
      `,
    },
    {
      code: `
        /** @typedef {import('eslint').Rule.Node} RuleNode  */
        /**
         * @type {import('eslint').Rule.Node}
         */
      `,
      errors: [
        {
          line: 4,
          message: 'Inline `import()` found; using `@typedef`',
        },
      ],
      options: [
        {
          exemptTypedefs: true,
        },
      ],
      output: `
        /** @typedef {import('eslint').Rule.Node} RuleNode  */
        /**
         * @type {RuleNode}
         */
      `,
    },
    {
      code: `
        /**
         * @type {number|import('eslint').Rule.Node}
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Inline `import()` found; prefer `@import`',
        },
      ],
      output: `/** @import * as eslint from 'eslint'; */
        /**
         * @type {number | eslint.Rule.Node}
         */
      `,
    },
    {
      code: `
        /** @typedef {import('eslint').Rule.Node} Rule  */
        /**
         * @type {import('eslint').Rule}
         */
      `,
      errors: [
        {
          line: 4,
          message: 'Inline `import()` found; prefer `@import`',
        },
      ],
      options: [
        {
          exemptTypedefs: true,
        },
      ],
      output: `/** @import * as eslint from 'eslint'; */
        /** @typedef {import('eslint').Rule.Node} Rule  */
        /**
         * @type {eslint.Rule}
         */
      `,
    },
    {
      code: `
        /** @typedef {import('eslint').Rule.Node} Rule  */
        /**
         * @type {import('eslint').Rule.Abc}
         */
      `,
      errors: [
        {
          line: 4,
          message: 'Inline `import()` found; prefer `@import`',
        },
      ],
      options: [
        {
          exemptTypedefs: true,
        },
      ],
      output: `/** @import * as eslint from 'eslint'; */
        /** @typedef {import('eslint').Rule.Node} Rule  */
        /**
         * @type {eslint.Rule.Abc}
         */
      `,
    },
    {
      code: `
        /** @typedef {import('eslint').Rule} Rule  */
        /**
         * @type {import('eslint').Rule.Node.Abc.Rule}
         */
      `,
      errors: [
        {
          line: 4,
          message: 'Inline `import()` found; using `@typedef`',
        },
      ],
      options: [
        {
          exemptTypedefs: true,
        },
      ],
      output: `
        /** @typedef {import('eslint').Rule} Rule  */
        /**
         * @type {Rule.Node.Abc.Rule}
         */
      `,
    },
    {
      code: `
        /** @typedef {import('eslint').Rule} Rule  */
        /**
         * @type {import('eslint').Rule.Node.Abc.Rule}
         */
      `,
      errors: [
        {
          line: 4,
          message: 'Inline `import()` found; using `@typedef`',
        },
      ],
      options: [
        {
          enableFixer: false,
          exemptTypedefs: true,
        },
      ],
    },
    {
      code: `
        /** @typedef {import('eslint').Rule.Rule} Rule  */
        /**
         * @type {import('eslint').Abc.Rule}
         */
      `,
      errors: [
        {
          line: 4,
          message: 'Inline `import()` found; prefer `@import`',
        },
      ],
      options: [
        {
          exemptTypedefs: true,
        },
      ],
      output: `/** @import * as eslint from 'eslint'; */
        /** @typedef {import('eslint').Rule.Rule} Rule  */
        /**
         * @type {eslint.Abc.Rule}
         */
      `,
    },
    {
      code: `
        /**
         * @type {import('eslint').anchors[keyof DataMap.anchors]}
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Inline `import()` found; prefer `@import`',
        },
      ],
      output: `/** @import * as eslint from 'eslint'; */
        /**
         * @type {eslint.anchors[keyof DataMap.anchors]}
         */
      `,
    },
    {
      code: `
        /** @typedef {import('eslint').Rule[keyof import('eslint').Rule]} Rule  */
        /**
         * @type {import('eslint').Abc.Rule}
         */
      `,
      errors: [
        {
          line: 4,
          message: 'Inline `import()` found; prefer `@import`',
        },
      ],
      options: [
        {
          exemptTypedefs: true,
        },
      ],
      output: `/** @import * as eslint from 'eslint'; */
        /** @typedef {import('eslint').Rule[keyof import('eslint').Rule]} Rule  */
        /**
         * @type {eslint.Abc.Rule}
         */
      `,
    },
    {
      code: `
        /** @typedef {import('eslint').Rule[keyof import('eslint').Rule]} Rule  */
        /**
         * @type {import('eslint').Rule[keyof import('eslint').Rule]}
         */
      `,
      errors: [
        {
          line: 4,
          message: 'Inline `import()` found; using `@typedef`',
        },
      ],
      options: [
        {
          exemptTypedefs: true,
        },
      ],
      output: `
        /** @typedef {import('eslint').Rule[keyof import('eslint').Rule]} Rule  */
        /**
         * @type {Rule}
         */
      `,
    },
    {
      code: `
        /** @typedef {import('eslint').Rule} Rule  */
        /**
         * @type {import('eslint').Rule[keyof import('eslint').Rule]}
         */
      `,
      errors: [
        {
          line: 4,
          message: 'Inline `import()` found; using `@typedef`',
        },
      ],
      options: [
        {
          exemptTypedefs: true,
        },
      ],
      output: `
        /** @typedef {import('eslint').Rule} Rule  */
        /**
         * @type {Rule[keyof import('eslint').Rule]}
         */
      `,
    },
    {
      code: `
        /** @type {import('foo')} */
        let foo;
      `,
      errors: [
        {
          line: 2,
          message: 'Inline `import()` found; prefer `@import`',
        },
      ],
      output: `
        /** @import * as foo from 'foo'; */
        /** @type {foo} */
        let foo;
      `,
    },
    {
      code: `/** @type {import('foo')} */
let foo;
      `,
      errors: [
        {
          line: 1,
          message: 'Inline `import()` found; prefer `@import`',
        },
      ],
      output: `/** @import * as foo from 'foo'; */
/** @type {foo} */
let foo;
      `,
    },
    {
      code: `
        /** @type {import('foo').bar} */
        let foo;
      `,
      errors: [
        {
          line: 2,
          message: 'Inline `import()` found; prefer `@import`',
        },
      ],
      output: `
        /** @import * as foo from 'foo'; */
        /** @type {foo.bar} */
        let foo;
      `,
    },
    {
      code: `
        /** @type {import('foo').bar} */
        let foo;
      `,
      errors: [
        {
          line: 2,
          message: 'Inline `import()` found; prefer `@import`',
        },
      ],
      options: [
        {
          outputType: 'named-import',
        },
      ],
      output: `
        /** @import { bar } from 'foo'; */
        /** @type {bar} */
        let foo;
      `,
    },
    {
      code: `
        /** @type {import('foo').default} */
        let foo;
      `,
      errors: [
        {
          line: 2,
          message: 'Inline `import()` found; prefer `@import`',
        },
      ],
      output: `
        /** @import foo from 'foo'; */
        /** @type {foo} */
        let foo;
      `,
    },
  ],
  valid: [
    {
      code: `
        /** @typedef {import('eslint').Rule.Node} RuleNode  */
        /**
         * @type {RuleNode}
         */
      `,
      options: [
        {
          exemptTypedefs: true,
        },
      ],
    },
    {
      code: `
        /** @import {Rule} from 'eslint' */
        /**
         * @type {Rule.Node}
         */
      `,
    },
    {
      code: `
        /** @import * as eslint from 'eslint' */
        /**
         * @type {eslint.Rule.Node}
         */
      `,
    },
    {
      code: `
        /**
         * @type {Rule['Node']}
         */
      `,
    },
    {
      code: `
        /**
         * Silently ignores error
         * @type {Rule['Node'}
         */
      `,
    },
  ],
};
