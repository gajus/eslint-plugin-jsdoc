<a name="user-content-check-syntax"></a>
<a name="check-syntax"></a>
# <code>check-syntax</code>

* [Context and settings](#user-content-check-syntax-context-and-settings)
* [Failing examples](#user-content-check-syntax-failing-examples)
* [Passing examples](#user-content-check-syntax-passing-examples)


Reports against syntax not encouraged for the mode (e.g., Google Closure
Compiler in "jsdoc" or "typescript" mode). Note that this rule will not check
for types that are wholly invalid for a given mode, as that is covered by
`valid-types`.

Currently checks against:

- Use of `=` in "jsdoc" or "typescript" mode

Note that "jsdoc" actually allows Closure syntax, but with another
option available for optional parameters (enclosing the name in brackets), the
rule is enforced (except under "permissive" and "closure" modes).

<a name="user-content-check-syntax-context-and-settings"></a>
<a name="check-syntax-context-and-settings"></a>
## Context and settings

|||
|---|---|
|Context|everywhere|
|Tags|N/A|
|Recommended|false|

<a name="user-content-check-syntax-failing-examples"></a>
<a name="check-syntax-failing-examples"></a>
## Failing examples

The following patterns are considered problems:

````js
/**
 * @param {string=} foo
 */
function quux (foo) {

}
// Message: Syntax should not be Google Closure Compiler style.
````



<a name="user-content-check-syntax-passing-examples"></a>
<a name="check-syntax-passing-examples"></a>
## Passing examples

The following patterns are not considered problems:

````js
/**
 * @param {string=} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"mode":"closure"}}

/**
 * @param {string} [foo]
 */
function quux (foo) {

}

/**
 *
 */
function quux (foo) {

}
````

