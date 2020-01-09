<a name="check-syntax"></a>
# <code>check-syntax</code>

* [`check-syntax`](#check-syntax)
    * [Context and settings](#check-syntax-context-and-settings)
    * [Failing examples](#check-syntax-failing-examples)
    * [Passing examples](#check-syntax-passing-examples)


Reports against Google Closure Compiler syntax.

<a name="check-syntax-context-and-settings"></a>
## Context and settings

|||
|---|---|
|Context|everywhere|
|Tags|N/A|

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


<a name="check-syntax-passing-examples"></a>
## Passing examples

The following patterns are not considered problems:

````js
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

