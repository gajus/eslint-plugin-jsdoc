<a name="user-content-check-property-names"></a>
<a name="check-property-names"></a>
# <code>check-property-names</code>

* [Fixer](#user-content-check-property-names-fixer)
* [Options](#user-content-check-property-names-options)
    * [`enableFixer`](#user-content-check-property-names-options-enablefixer)
* [Context and settings](#user-content-check-property-names-context-and-settings)
* [Failing examples](#user-content-check-property-names-failing-examples)
* [Passing examples](#user-content-check-property-names-passing-examples)


Ensures that property names in JSDoc are not duplicated on the same block
and that nested properties have defined roots.

<a name="user-content-check-property-names-fixer"></a>
<a name="check-property-names-fixer"></a>
## Fixer

(Todo)

<a name="user-content-check-property-names-options"></a>
<a name="check-property-names-options"></a>
## Options

<a name="user-content-check-property-names-options-enablefixer"></a>
<a name="check-property-names-options-enablefixer"></a>
### <code>enableFixer</code>

Set to `true` to auto-remove `@property` duplicates (based on
identical names).

Note that this option will remove duplicates of the same name even if
the definitions do not match in other ways (e.g., the second property will
be removed even if it has a different type or description).

<a name="user-content-check-property-names-context-and-settings"></a>
<a name="check-property-names-context-and-settings"></a>
## Context and settings

|||
|---|---|
|Context|Everywhere|
|Options|`enableFixer`|
|Tags|`property`|
|Aliases|`prop`|
|Recommended|true|

<a name="user-content-check-property-names-failing-examples"></a>
<a name="check-property-names-failing-examples"></a>
## Failing examples

The following patterns are considered problems:

````js
/**
 * @typedef (SomeType) SomeTypedef
 * @property Foo.Bar
 */
// Message: @property path declaration ("Foo.Bar") appears before any real property.

/**
 * @typedef (SomeType) SomeTypedef
 * @property foo
 * @property Foo.Bar
 */
// Message: @property path declaration ("Foo.Bar") root node name ("Foo") does not match previous real property name ("foo").

/**
 * Assign the project to a list of employees.
 * @typedef (SomeType) SomeTypedef
 * @property {string} employees[].name - The name of an employee.
 * @property {string} employees[].department - The employee's department.
 */
// Message: @property path declaration ("employees[].name") appears before any real property.

/**
 * Assign the project to a list of employees.
 * @typedef (SomeType) SomeTypedef
 * @property {string} employees[].name - The name of an employee.
 * @property {string} employees[].name - The employee's department.
 */
// "jsdoc/check-property-names": ["error"|"warn", {"enableFixer":true}]
// Message: Duplicate @property "employees[].name"

/**
 * @typedef (SomeType) SomeTypedef
 * @property foo
 * @property foo
 */
// "jsdoc/check-property-names": ["error"|"warn", {"enableFixer":true}]
// Message: Duplicate @property "foo"

/**
 * @typedef (SomeType) SomeTypedef
 * @property foo
 * @property foo
 */
// Message: Duplicate @property "foo"

/**
 * @typedef (SomeType) SomeTypedef
 * @property cfg
 * @property cfg.foo
 * @property cfg.foo
 */
function quux ({foo, bar}) {

}
// "jsdoc/check-property-names": ["error"|"warn", {"enableFixer":true}]
// Message: Duplicate @property "cfg.foo"

class Test {
    /**
     * @typedef (SomeType) SomeTypedef
     * @property cfg
     * @property cfg.foo
     * @property cfg.foo
     */
    quux ({foo, bar}) {

    }
}
// "jsdoc/check-property-names": ["error"|"warn", {"enableFixer":true}]
// Message: Duplicate @property "cfg.foo"

/**
 * @typedef (SomeType) SomeTypedef
 * @property cfg
 * @property cfg.foo
 * @property [cfg.foo]
 * @property baz
 */
function quux ({foo, bar}, baz) {

}
// "jsdoc/check-property-names": ["error"|"warn", {"enableFixer":true}]
// Message: Duplicate @property "cfg.foo"

/**
 * @typedef (SomeType) SomeTypedef
 * @property cfg
 * @property cfg.foo
 * @property [cfg.foo="with a default"]
 * @property baz
 */
function quux ({foo, bar}, baz) {

}
// "jsdoc/check-property-names": ["error"|"warn", {"enableFixer":true}]
// Message: Duplicate @property "cfg.foo"

/**
 * @typedef (SomeType) SomeTypedef
 * @prop foo
 * @prop foo
 */
// Settings: {"jsdoc":{"tagNamePreference":{"property":"prop"}}}
// "jsdoc/check-property-names": ["error"|"warn", {"enableFixer":true}]
// Message: Duplicate @prop "foo"

/**
 * @typedef (SomeType) SomeTypedef
 * @property foo
 */
// Settings: {"jsdoc":{"tagNamePreference":{"property":false}}}
// Message: Unexpected tag `@property`
````



<a name="user-content-check-property-names-passing-examples"></a>
<a name="check-property-names-passing-examples"></a>
## Passing examples

The following patterns are not considered problems:

````js
/**
 *
 */

/**
 * @typedef (SomeType) SomeTypedef
 * @property foo
 */

/**
 * @typedef (SomeType) SomeTypedef
 * @prop foo
 */

/**
 * @typedef (SomeType) SomeTypedef
 * @property foo
 * @property bar
 */

/**
 * @typedef (SomeType) SomeTypedef
 * @property foo
 * @property foo.foo
 * @property bar
 */

/**
 * Assign the project to a list of employees.
 * @typedef (SomeType) SomeTypedef
 * @property {object[]} employees - The employees who are responsible for the project.
 * @property {string} employees[].name - The name of an employee.
 * @property {string} employees[].department - The employee's department.
 */

/**
 * @typedef (SomeType) SomeTypedef
 * @property {Error} error Exit code
 * @property {number} [code = 1] Exit code
 */

/**
 * @namespace (SomeType) SomeNamespace
 * @property {Error} error Exit code
 * @property {number} [code = 1] Exit code
 */

/**
 * @class
 * @property {Error} error Exit code
 * @property {number} [code = 1] Exit code
 */
function quux (code = 1) {
  this.error = new Error('oops');
  this.code = code;
}

/**
 * @typedef (SomeType) SomeTypedef
 * @property foo
 * @property foo.bar
 * @property foo.baz
 * @property bar
 */
````

