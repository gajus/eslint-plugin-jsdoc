<a name="user-content-prefer-import-tag"></a>
<a name="prefer-import-tag"></a>
# <code>prefer-import-tag</code>

Prefer `@import` tags to inline `import()` statements.

<a name="user-content-prefer-import-tag-fixer"></a>
<a name="prefer-import-tag-fixer"></a>
## Fixer

Creates `@import` tags if an already existing matching `@typedef` or
`@import` is not found.

<a name="user-content-prefer-import-tag-options"></a>
<a name="prefer-import-tag-options"></a>
## Options

A single options object has the following properties.

<a name="user-content-prefer-import-tag-options-enablefixer"></a>
<a name="prefer-import-tag-options-enablefixer"></a>
### <code>enableFixer</code>

Whether or not to enable the fixer to add `@import` tags.

<a name="user-content-prefer-import-tag-options-exempttypedefs"></a>
<a name="prefer-import-tag-options-exempttypedefs"></a>
### <code>exemptTypedefs</code>

Whether to allow `import()` statements within `@typedef`

<a name="user-content-prefer-import-tag-options-outputtype"></a>
<a name="prefer-import-tag-options-outputtype"></a>
### <code>outputType</code>

What kind of `@import` to generate when no matching `@typedef` or `@import` is found


|||
|---|---|
|Context|everywhere|
|Tags|`augments`, `class`, `constant`, `enum`, `implements`, `member`, `module`, `namespace`, `param`, `property`, `returns`, `throws`, `type`, `typedef`, `yields`|
|Aliases|`constructor`, `const`, `extends`, `var`, `arg`, `argument`, `prop`, `return`, `exception`, `yield`|
|Closure-only|`package`, `private`, `protected`, `public`, `static`|
|Recommended|false|
|Settings|`mode`|
|Options|`enableFixer`, `exemptTypedefs`, `outputType`|

<a name="user-content-prefer-import-tag-failing-examples"></a>
<a name="prefer-import-tag-failing-examples"></a>
## Failing examples

The following patterns are considered problems:

````ts
/**
 * @type {import('eslint').Rule.Node}
 */
// Message: Inline `import()` found; prefer `@import`

/**
 * @type {import('eslint').Rule.Node}
 */
// Settings: {"jsdoc":{"mode":"permissive"}}
// Message: Inline `import()` found; prefer `@import`

/**
 * @type {import('eslint').Rule.Node}
 */
// "jsdoc/prefer-import-tag": ["error"|"warn", {"enableFixer":false}]
// Message: Inline `import()` found; prefer `@import`

/**
 * @type {import('eslint').Rule.Node}
 */
// "jsdoc/prefer-import-tag": ["error"|"warn", {"outputType":"named-import"}]
// Message: Inline `import()` found; prefer `@import`

/**
 * @type {import('eslint').Rule.Node}
 */
// "jsdoc/prefer-import-tag": ["error"|"warn", {"outputType":"namespaced-import"}]
// Message: Inline `import()` found; prefer `@import`

/**
 * @type {import('eslint').Rule['Node']}
 */
// "jsdoc/prefer-import-tag": ["error"|"warn", {"outputType":"named-import"}]
// Message: Inline `import()` found; prefer `@import`

/**
 * @type {import('eslint').Rule['Node']}
 */
// "jsdoc/prefer-import-tag": ["error"|"warn", {"outputType":"namespaced-import"}]
// Message: Inline `import()` found; prefer `@import`

/** @typedef {import('eslint2').Rule.Node} RuleNode  */
/**
 * @type {import('eslint').Rule.Node}
 */
// "jsdoc/prefer-import-tag": ["error"|"warn", {"exemptTypedefs":false}]
// Message: Inline `import()` found; prefer `@import`

/**
 * @type {import('eslint')}
 */
// Message: Inline `import()` found; prefer `@import`

/**
 * @type {import('eslint')}
 */
// "jsdoc/prefer-import-tag": ["error"|"warn", {"enableFixer":false}]
// Message: Inline `import()` found; prefer `@import`

/**
 * @type {import('eslint').default}
 */
// Message: Inline `import()` found; prefer `@import`

/**
 * @type {import('eslint').default}
 */
// "jsdoc/prefer-import-tag": ["error"|"warn", {"enableFixer":false}]
// Message: Inline `import()` found; prefer `@import`

/** @import * as eslint2 from 'eslint'; */
/**
 * @type {import('eslint')}
 */
// Message: Inline `import()` found; prefer `@import`

/** @import eslint2 from 'eslint'; */
/**
 * @type {import('eslint').default}
 */
// Message: Inline `import()` found; prefer `@import`

/** @import eslint2 from 'eslint'; */
/**
 * @type {import('eslint').default}
 */
// "jsdoc/prefer-import-tag": ["error"|"warn", {"enableFixer":false}]
// Message: Inline `import()` found; prefer `@import`

/** @import {Rule} from 'eslint' */
/**
 * @type {import('eslint').Rule.Node}
 */
// Message: Inline `import()` found; prefer `@import`

/** @import {Rule} from 'eslint' */
/**
 * @type {import('eslint').Rule.Node}
 */
// "jsdoc/prefer-import-tag": ["error"|"warn", {"enableFixer":false}]
// Message: Inline `import()` found; prefer `@import`

/** @import * as eslint2 from 'eslint' */
/**
 * @type {import('eslint').Rule.Node}
 */
// Message: Inline `import()` found; prefer `@import`

/** @import * as eslint2 from 'eslint' */
/**
 * @type {import('eslint').Rule.Node}
 */
// "jsdoc/prefer-import-tag": ["error"|"warn", {"enableFixer":false}]
// Message: Inline `import()` found; prefer `@import`

/** @import LinterDef2, * as LinterDef3 from "eslint" */
/**
 * @type {import('eslint').Rule.Node}
 */
// Message: Inline `import()` found; prefer `@import`

/**
 * @import LinterDef2, * as LinterDef3 from "eslint"
 */
/**
 * @type {import('eslint').Rule.Node}
 */
// Message: Inline `import()` found; prefer `@import`

/**
 * @import LinterDef2,
 *   * as LinterDef3 from "eslint"
 */
/**
 * @type {import('eslint').Rule.Node}
 */
// Message: Inline `import()` found; prefer `@import`

/**
 * @import {
 *   ESLint
 * } from "eslint"
 */
/**
 * @type {import('eslint').ESLint.Node}
 */
// Message: Inline `import()` found; prefer `@import`

/** @typedef {import('eslint').Rule} Rule  */
/**
 * @type {import('eslint').Rule.Node}
 */
// "jsdoc/prefer-import-tag": ["error"|"warn", {"exemptTypedefs":true}]
// Message: Inline `import()` found; using `@typedef`

/** @typedef {import('eslint').Rule} Rule  */
/**
 * @type {import('eslint').Rule.Node.Abc.Def}
 */
// "jsdoc/prefer-import-tag": ["error"|"warn", {"exemptTypedefs":true}]
// Message: Inline `import()` found; using `@typedef`

/** @typedef {import('eslint').Rule} Rule  */
/**
 * @type {import('eslint').Rule.Node.Abc['Def']}
 */
// "jsdoc/prefer-import-tag": ["error"|"warn", {"exemptTypedefs":true}]
// Message: Inline `import()` found; using `@typedef`

/** @typedef {import('eslint').Rule.Node} RuleNode  */
/**
 * @type {import('eslint').Rule.Node}
 */
// "jsdoc/prefer-import-tag": ["error"|"warn", {"exemptTypedefs":true}]
// Message: Inline `import()` found; using `@typedef`

/**
 * @type {number|import('eslint').Rule.Node}
 */
// Message: Inline `import()` found; prefer `@import`

/** @typedef {import('eslint').Rule.Node} Rule  */
/**
 * @type {import('eslint').Rule}
 */
// "jsdoc/prefer-import-tag": ["error"|"warn", {"exemptTypedefs":true}]
// Message: Inline `import()` found; prefer `@import`

/** @typedef {import('eslint').Rule.Node} Rule  */
/**
 * @type {import('eslint').Rule.Abc}
 */
// "jsdoc/prefer-import-tag": ["error"|"warn", {"exemptTypedefs":true}]
// Message: Inline `import()` found; prefer `@import`

/** @typedef {import('eslint').Rule} Rule  */
/**
 * @type {import('eslint').Rule.Node.Abc.Rule}
 */
// "jsdoc/prefer-import-tag": ["error"|"warn", {"exemptTypedefs":true}]
// Message: Inline `import()` found; using `@typedef`

/** @typedef {import('eslint').Rule} Rule  */
/**
 * @type {import('eslint').Rule.Node.Abc.Rule}
 */
// "jsdoc/prefer-import-tag": ["error"|"warn", {"enableFixer":false,"exemptTypedefs":true}]
// Message: Inline `import()` found; using `@typedef`

/** @typedef {import('eslint').Rule.Rule} Rule  */
/**
 * @type {import('eslint').Abc.Rule}
 */
// "jsdoc/prefer-import-tag": ["error"|"warn", {"exemptTypedefs":true}]
// Message: Inline `import()` found; prefer `@import`

/**
 * @type {import('eslint').anchors[keyof DataMap.anchors]}
 */
// Message: Inline `import()` found; prefer `@import`

/** @typedef {import('eslint').Rule[keyof import('eslint').Rule]} Rule  */
/**
 * @type {import('eslint').Abc.Rule}
 */
// "jsdoc/prefer-import-tag": ["error"|"warn", {"exemptTypedefs":true}]
// Message: Inline `import()` found; prefer `@import`

/** @typedef {import('eslint').Rule[keyof import('eslint').Rule]} Rule  */
/**
 * @type {import('eslint').Rule[keyof import('eslint').Rule]}
 */
// "jsdoc/prefer-import-tag": ["error"|"warn", {"exemptTypedefs":true}]
// Message: Inline `import()` found; using `@typedef`

/** @typedef {import('eslint').Rule} Rule  */
/**
 * @type {import('eslint').Rule[keyof import('eslint').Rule]}
 */
// "jsdoc/prefer-import-tag": ["error"|"warn", {"exemptTypedefs":true}]
// Message: Inline `import()` found; using `@typedef`

/** @type {import('foo')} */
let foo;
// Message: Inline `import()` found; prefer `@import`

/** @type {import('foo')} */
let foo;
// Message: Inline `import()` found; prefer `@import`
````



<a name="user-content-prefer-import-tag-passing-examples"></a>
<a name="prefer-import-tag-passing-examples"></a>
## Passing examples

The following patterns are not considered problems:

````ts
/** @typedef {import('eslint').Rule.Node} RuleNode  */
/**
 * @type {RuleNode}
 */
// "jsdoc/prefer-import-tag": ["error"|"warn", {"exemptTypedefs":true}]

/** @import {Rule} from 'eslint' */
/**
 * @type {Rule.Node}
 */

/** @import * as eslint from 'eslint' */
/**
 * @type {eslint.Rule.Node}
 */

/**
 * @type {Rule['Node']}
 */

/**
 * Silently ignores error
 * @type {Rule['Node'}
 */
````

