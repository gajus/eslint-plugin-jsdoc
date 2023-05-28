<a name="user-content-require-example"></a>
<a name="require-example"></a>
# <code>require-example</code>

* [Fixer](#user-content-require-example-fixer)
* [Options](#user-content-require-example-options)
    * [`exemptedBy`](#user-content-require-example-options-exemptedby)
    * [`exemptNoArguments`](#user-content-require-example-options-exemptnoarguments)
    * [`contexts`](#user-content-require-example-options-contexts)
    * [`checkConstructors`](#user-content-require-example-options-checkconstructors)
    * [`checkGetters`](#user-content-require-example-options-checkgetters)
    * [`checkSetters`](#user-content-require-example-options-checksetters)
    * [`enableFixer`](#user-content-require-example-options-enablefixer)
* [Context and settings](#user-content-require-example-context-and-settings)


Requires that all functions have examples.

* All functions must have one or more `@example` tags.
* Every example tag must have a non-empty description that explains the
  method's usage.

<a name="user-content-require-example-fixer"></a>
<a name="require-example-fixer"></a>
## Fixer

The fixer for `require-example` will add an empty `@example`, but it will still
report a missing example description after this is added.

<a name="user-content-require-example-options"></a>
<a name="require-example-options"></a>
## Options

This rule has an object option.

<a name="user-content-require-example-options-exemptedby"></a>
<a name="require-example-options-exemptedby"></a>
### <code>exemptedBy</code>

Array of tags (e.g., `['type']`) whose presence on the document
block avoids the need for an `@example`. Defaults to an array with
`inheritdoc`. If you set this array, it will overwrite the default,
so be sure to add back `inheritdoc` if you wish its presence to cause
exemption of the rule.

<a name="user-content-require-example-options-exemptnoarguments"></a>
<a name="require-example-options-exemptnoarguments"></a>
### <code>exemptNoArguments</code>

Boolean to indicate that no-argument functions should not be reported for
missing `@example` declarations.

<a name="user-content-require-example-options-contexts"></a>
<a name="require-example-options-contexts"></a>
### <code>contexts</code>

Set this to an array of strings representing the AST context (or an object with
`context` and `comment` properties) where you wish the rule to be applied.
(e.g., `ClassDeclaration` for ES6
classes). Overrides the default contexts (see below). Set to `"any"` if you
want the rule to apply to any jsdoc block throughout your files.

See the ["AST and Selectors"](#user-content-eslint-plugin-jsdoc-advanced-ast-and-selectors)
section of our README for more on the expected format.

<a name="user-content-require-example-options-checkconstructors"></a>
<a name="require-example-options-checkconstructors"></a>
### <code>checkConstructors</code>

A value indicating whether `constructor`s should be checked.
Defaults to `true`.

<a name="user-content-require-example-options-checkgetters"></a>
<a name="require-example-options-checkgetters"></a>
### <code>checkGetters</code>

A value indicating whether getters should be checked. Defaults to `false`.

<a name="user-content-require-example-options-checksetters"></a>
<a name="require-example-options-checksetters"></a>
### <code>checkSetters</code>

A value indicating whether setters should be checked. Defaults to `false`.

<a name="user-content-require-example-options-enablefixer"></a>
<a name="require-example-options-enablefixer"></a>
### <code>enableFixer</code>

A boolean on whether to enable the fixer (which adds an empty `@example` block).
Defaults to `true`.

<a name="user-content-require-example-context-and-settings"></a>
<a name="require-example-context-and-settings"></a>
## Context and settings

|||
|---|---|
|Context|`ArrowFunctionExpression`, `FunctionDeclaration`, `FunctionExpression`; others when `contexts` option enabled|
|Tags|`example`|
|Recommended|false|
|Options|`checkConstructors`, `checkGetters`, `checkSetters`, `contexts`, `enableFixer`, `exemptedBy`, `exemptNoArguments`|
|Settings|`ignoreReplacesDocs`, `overrideReplacesDocs`, `augmentsExtendsReplacesDocs`, `implementsReplacesDocs`|

<a name="user-content-failing-examples"></a>
<a name="failing-examples"></a>
# Failing examples

The following patterns are considered problems:

````js
/**
 *
 */
function quux () {

}
// Message: Missing JSDoc @example declaration.

/**
 *
 */
function quux (someParam) {

}
// "jsdoc/require-example": ["error"|"warn", {"exemptNoArguments":true}]
// Message: Missing JSDoc @example declaration.

/**
 *
 */
function quux () {

}
// Message: Missing JSDoc @example declaration.

/**
 * @example
 */
function quux () {

}
// Message: Missing JSDoc @example description.

/**
 * @constructor
 */
function quux () {

}
// Message: Missing JSDoc @example declaration.

/**
 * @constructor
 * @example
 */
function quux () {

}
// Message: Missing JSDoc @example description.

/**
 *
 */
class quux {

}
// "jsdoc/require-example": ["error"|"warn", {"contexts":["ClassDeclaration"]}]
// Message: Missing JSDoc @example declaration.

/**
 *
 */
// "jsdoc/require-example": ["error"|"warn", {"contexts":["any"]}]
// Message: Missing JSDoc @example declaration.

/**
 *
 */
function quux () {
}
// "jsdoc/require-example": ["error"|"warn", {"exemptedBy":["notPresent"]}]
// Message: Missing JSDoc @example declaration.

class TestClass {
  /**
   *
   */
  get Test() { }
}
// "jsdoc/require-example": ["error"|"warn", {"checkGetters":true}]
// Message: Missing JSDoc @example declaration.

class TestClass {
  /**
   * @example
   */
  get Test() { }
}
// "jsdoc/require-example": ["error"|"warn", {"checkGetters":true}]
// Message: Missing JSDoc @example description.

class TestClass {
  /**
   *
   */
  set Test(value) { }
}
// "jsdoc/require-example": ["error"|"warn", {"checkSetters":true}]
// Message: Missing JSDoc @example declaration.

class TestClass {
  /**
   * @example
   */
  set Test(value) { }
}
// "jsdoc/require-example": ["error"|"warn", {"checkSetters":true}]
// Message: Missing JSDoc @example description.

/**
 *
 */
function quux (someParam) {

}
// "jsdoc/require-example": ["error"|"warn", {"enableFixer":true}]
// Message: Missing JSDoc @example declaration.

/**
 *
 */
function quux (someParam) {

}
// "jsdoc/require-example": ["error"|"warn", {"enableFixer":false}]
// Message: Missing JSDoc @example declaration.
````



<a name="user-content-failing-examples-passing-examples"></a>
<a name="failing-examples-passing-examples"></a>
## Passing examples

The following patterns are not considered problems:

````js
/**
 *
 */

/**
 * @example
 * // arbitrary example content
 */
function quux () {

}

/**
 * @example
 * quux(); // does something useful
 */
function quux () {

}

/**
 * @example <caption>Valid usage</caption>
 * quux(); // does something useful
 *
 * @example <caption>Invalid usage</caption>
 * quux('random unwanted arg'); // results in an error
 */
function quux () {

}

/**
 * @constructor
 */
function quux () {

}
// "jsdoc/require-example": ["error"|"warn", {"checkConstructors":false}]

/**
 * @constructor
 * @example
 */
function quux () {

}
// "jsdoc/require-example": ["error"|"warn", {"checkConstructors":false}]

class Foo {
  /**
   *
   */
  constructor () {

  }
}
// "jsdoc/require-example": ["error"|"warn", {"checkConstructors":false}]

/**
 * @inheritdoc
 */
function quux () {

}

/**
 * @type {MyCallback}
 */
function quux () {

}
// "jsdoc/require-example": ["error"|"warn", {"exemptedBy":["type"]}]

/**
 * @example Some example code
 */
class quux {

}
// "jsdoc/require-example": ["error"|"warn", {"contexts":["ClassDeclaration"]}]

/**
 *
 */
function quux () {

}
// "jsdoc/require-example": ["error"|"warn", {"contexts":["ClassDeclaration"]}]

class TestClass {
  /**
   *
   */
  get Test() { }
}

class TestClass {
  /**
   * @example
   */
  get Test() { }
}

class TestClass {
  /**
   * @example Test
   */
  get Test() { }
}
// "jsdoc/require-example": ["error"|"warn", {"checkGetters":true}]

class TestClass {
  /**
   *
   */
  set Test(value) { }
}

class TestClass {
  /**
   * @example
   */
  set Test(value) { }
}
// "jsdoc/require-example": ["error"|"warn", {"checkSetters":false}]

class TestClass {
  /**
   * @example Test
   */
  set Test(value) { }
}
// "jsdoc/require-example": ["error"|"warn", {"checkSetters":true}]

/**
 *
 */
function quux () {

}
// "jsdoc/require-example": ["error"|"warn", {"exemptNoArguments":true}]
````

