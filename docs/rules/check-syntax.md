<a name="user-content-check-syntax"></a>
<a name="check-syntax"></a>
### <code>check-syntax</code>

Reports against syntax not encouraged for the mode (e.g., Google Closure
Compiler in "jsdoc" or "typescript" mode). Note that this rule will not check
for types that are wholly invalid for a given mode, as that is covered by
`valid-types`.

Currently checks against:

- Use of `=` in "jsdoc" or "typescript" mode

Note that "jsdoc" actually allows Closure syntax, but with another
option available for optional parameters (enclosing the name in brackets), the
rule is enforced (except under "permissive" and "closure" modes).

|||
|---|---|
|Context|everywhere|
|Tags|N/A|
|Recommended|false|

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

