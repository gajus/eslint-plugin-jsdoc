<a name="user-content-no-blank-block-descriptions"></a>
<a name="no-blank-block-descriptions"></a>
### <code>no-blank-block-descriptions</code>



If tags are present, this rule will prevent empty lines in the
block description.

If no tags are present, this rule will prevent extra empty lines
in the block description.

<a name="user-content-fixer"></a>
<a name="fixer"></a>
## Fixer

(TODO)

<a name="user-content-context-and-settings"></a>
<a name="context-and-settings"></a>
## Context and settings

|||
|---|---|
|Context|everywhere|
|Tags|(Block description)|
|Recommended|false|
|Settings||
|Options||

<a name="user-content-failing-examples"></a>
<a name="failing-examples"></a>
## Failing examples

The following patterns are considered problems:

````js
/**
 *
 * @param {number} x
 */
function functionWithClearName(x) {}
// Message: There should be no blank lines in block descriptions followed by tags.

/**
 *
 *
 */
function functionWithClearName() {}
// Message: There should be no extra blank lines in block descriptions not followed by tags.
````



<a name="user-content-passing-examples"></a>
<a name="passing-examples"></a>
## Passing examples

The following patterns are not considered problems:

````js
/**
 * Non-empty description
 * @param {number} x
 */
function functionWithClearName(x) {}

/**
 * @param {number} x
 */
function functionWithClearName(x) {}

/**
 *
 */
function functionWithClearName() {}

/**
 */
function functionWithClearName() {}

/** */
function functionWithClearName() {}

/** Some desc. */
function functionWithClearName() {}

/** @someTag */
function functionWithClearName() {}
````

