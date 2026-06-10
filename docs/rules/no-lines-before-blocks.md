<a name="user-content-no-lines-before-blocks"></a>
<a name="no-lines-before-blocks"></a>
# <code>no-lines-before-blocks</code>

Reports extra lines between functions (and other language structures) and their
JSDoc blocks.

<a name="user-content-no-lines-before-blocks-fixer"></a>
<a name="no-lines-before-blocks-fixer"></a>
## Fixer

Removes extra lines between functions (and other language structures) and their
JSDoc blocks. Uses the `maxLines` setting to determine whether to remove lines.

<a name="user-content-no-lines-before-blocks-options"></a>
<a name="no-lines-before-blocks-options"></a>
## Options

A single options object has the following properties.

<a name="user-content-no-lines-before-blocks-options-enablefixer"></a>
<a name="no-lines-before-blocks-options-enablefixer"></a>
### <code>enableFixer</code>

Whether to enable the fixer to remove line breaks
<a name="user-content-no-lines-before-blocks-options-preferminlines"></a>
<a name="no-lines-before-blocks-options-preferminlines"></a>
### <code>preferMinLines</code>

Whether to use the setting `minLines` as the basis for fixing lines going past `maxLines`


|||
|---|---|
|Context|everywhere|
|Tags|N/A|
|Recommended|true|
|Settings|`maxLines`, `minLines`|
|Options|`enableFixer`, `preferMinLines`|

<a name="user-content-no-lines-before-blocks-failing-examples"></a>
<a name="no-lines-before-blocks-failing-examples"></a>
## Failing examples

The following patterns are considered problems:

````ts
/** This is a description of some function!*/






function someFunction() {}
// Message: There should be no extra lines above structures with JSDoc blocks

/** This is a description of some function!*/

function someFunction() {}
// "jsdoc/no-lines-before-blocks": ["error"|"warn", {"enableFixer":false}]
// Message: There should be no extra lines above structures with JSDoc blocks

/** This is a description of some function!*/


function someFunction() {}
// Settings: {"jsdoc":{"maxLines":2}}
// Message: There should be no extra lines above structures with JSDoc blocks

/** This is a description of some function!*/


function someFunction() {}
// Settings: {"jsdoc":{"maxLines":2,"minLines":1}}
// "jsdoc/no-lines-before-blocks": ["error"|"warn", {"preferMinLines":true}]
// Message: There should be no extra lines above structures with JSDoc blocks
````



<a name="user-content-no-lines-before-blocks-passing-examples"></a>
<a name="no-lines-before-blocks-passing-examples"></a>
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
````

