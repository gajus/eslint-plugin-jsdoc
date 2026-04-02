<a name="user-content-no-lines-after-blocks"></a>
<a name="no-lines-after-blocks"></a>
# <code>no-lines-after-blocks</code>

Reports extra lines between functions (and other language structures) and their
JSDoc blocks.

Standalone comments such as `@typedef` and `@callback` will not be reported even
if they are followed by a language structure.

<a name="user-content-no-lines-after-blocks-fixer"></a>
<a name="no-lines-after-blocks-fixer"></a>
## Fixer

Removes extra lines between functions (and other language structures) and their
JSDoc blocks. Uses the `maxLines` setting to determine whether to remove lines.

<a name="user-content-no-lines-after-blocks-options"></a>
<a name="no-lines-after-blocks-options"></a>
## Options

A single options object has the following properties.

<a name="user-content-no-lines-after-blocks-options-contexts"></a>
<a name="no-lines-after-blocks-options-contexts"></a>
### <code>contexts</code>

Set this to an array of strings representing the AST context (or an object with
`context` and `comment` properties) where you wish the rule to be applied.

`context` defaults to `any` and `comment` defaults to no specific comment context.

Overrides the default contexts (`ArrowFunctionExpression`, `FunctionDeclaration`,
`FunctionExpression`). Setting to `"any"` may be problematic if you have
JSDoc-style comments at the top of your files.

See the ["AST and Selectors"](#user-content-eslint-plugin-jsdoc-advanced-ast-and-selectors)
section of our Advanced docs for more on the expected format.
<a name="user-content-no-lines-after-blocks-options-enablefixer"></a>
<a name="no-lines-after-blocks-options-enablefixer"></a>
### <code>enableFixer</code>

Whether to enable the fixer to remove line breaks
<a name="user-content-no-lines-after-blocks-options-exemptedby"></a>
<a name="no-lines-after-blocks-options-exemptedby"></a>
### <code>exemptedBy</code>

Tag names to be added to those which will exempt reporting for a block. Defaults to:

- 'callback'
- 'copyright'
- 'exports'
- 'interface'
- 'event'
- 'external'
- 'file'
- 'fileoverview'
- 'host'
- 'import'
- 'license'
- 'module'
- 'namespace'
- 'overview'
- 'typedef'

<a name="user-content-no-lines-after-blocks-options-overridedefaultexemptions"></a>
<a name="no-lines-after-blocks-options-overridedefaultexemptions"></a>
### <code>overrideDefaultExemptions</code>

Determines whether `exemptedBy` will override the default values. Defaults to `false`.
<a name="user-content-no-lines-after-blocks-options-preferminlines"></a>
<a name="no-lines-after-blocks-options-preferminlines"></a>
### <code>preferMinLines</code>

Whether to use the setting `minLines` as the basis for fixing lines going past `maxLines`


|||
|---|---|
|Context|everywhere|
|Tags|N/A|
|Recommended|false|
|Settings|`maxLines`, `minLines`|
|Options|`contexts`, `enableFixer`, `exemptedBy`, `overrideDefaultExemptions`, `preferMinLines`|

<a name="user-content-no-lines-after-blocks-failing-examples"></a>
<a name="no-lines-after-blocks-failing-examples"></a>
## Failing examples

The following patterns are considered problems:

````ts
/** This is a description of some function!*/






function someFunction() {}
// Message: There should be no extra lines above structures with JSDoc blocks

/** This is a description of some function!*/

function someFunction() {}
// "jsdoc/no-lines-after-blocks": ["error"|"warn", {"enableFixer":false}]
// Message: There should be no extra lines above structures with JSDoc blocks

/** This is a description of some function!*/


function someFunction() {}
// Settings: {"jsdoc":{"maxLines":2}}
// Message: There should be no extra lines above structures with JSDoc blocks

/** This is a description of some function!*/


function someFunction() {}
// Settings: {"jsdoc":{"maxLines":2,"minLines":1}}
// "jsdoc/no-lines-after-blocks": ["error"|"warn", {"preferMinLines":true}]
// Message: There should be no extra lines above structures with JSDoc blocks

/** @typedef SomeType */

function someFunction() {}
// "jsdoc/no-lines-after-blocks": ["error"|"warn", {"exemptedBy":["function"],"overrideDefaultExemptions":true}]
// Message: There should be no extra lines above structures with JSDoc blocks
````



<a name="user-content-no-lines-after-blocks-passing-examples"></a>
<a name="no-lines-after-blocks-passing-examples"></a>
## Passing examples

The following patterns are not considered problems:

````ts
function someFunction() {}

/** JSDoc */ function someFunction() {}

/** This is a description of some function! */
// extra comment
function someFunction() {}

/** Standalone comment (e.g. a type definition) */

/** The actual description */
function someFunction() {}

/* Regular block comment */

function someFunction() {}

// Regular line comment

function someFunction() {}

/** This is a description of some function!*/

function someFunction() {}
// Settings: {"jsdoc":{"maxLines":2}}

/** @typedef {string} SomeType */

function someFunction() {}

/** @function SomeType */

function someFunction() {}
// "jsdoc/no-lines-after-blocks": ["error"|"warn", {"exemptedBy":["function"]}]

/**
 * JSDoc block at top of file without import declaration context.
 */

import {sth} from 'sth';
````

