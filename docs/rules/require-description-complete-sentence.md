<a name="require-description"></a>
# <code>require-description</code>

* [`require-description`](#require-description)
    * [Options](#require-description-options)
    * [Context and settings](#require-description-context-and-settings)
    * [Failing examples](#require-description-failing-examples)
    * [Passing examples](#require-description-passing-examples)


Requires that all functions have a description.

* All functions must have an implicit description or have the option
  `descriptionStyle` set to `tag`.
* Every jsdoc block description (or description tag if `descriptionStyle` is
  `"tag"`) must have a non-empty description that explains the purpose of the
  method.

<a name="require-description-options"></a>
## Options

An options object may have any of the following properties:

- `contexts` - Set to an array of strings representing the AST context
  where you wish the rule to be applied (e.g., `ClassDeclaration` for ES6
  classes). Overrides the default contexts (see below).  Set to `"any"` if
  you want the rule to apply to any jsdoc block throughout your files.
- `exemptedBy` - Array of tags (e.g., `['type']`) whose presence on the
    document block avoids the need for a `@description`. Defaults to an
    empty array.
- `descriptionStyle` - Whether to accept implicit descriptions (`"body"`) or
    `@description` tags (`"tag"`) as satisfying the rule. Set to `"any"` to
    accept either style. Defaults to `"body"`.

<a name="require-description-context-and-settings"></a>
## Context and settings

|||
|---|---|
|Context|`ArrowFunctionExpression`, `FunctionDeclaration`, `FunctionExpression`; others when `contexts` option enabled|
|Tags|`description` or jsdoc block|
|Aliases|`desc`|
|Options|`contexts`, `exemptedBy`, `descriptionStyle`|
|Settings|`overrideReplacesDocs`, `augmentsExtendsReplacesDocs`, `implementsReplacesDocs`|

<a name="require-description-failing-examples"></a>
## Failing examples

The following patterns are considered problems:

````js
/**
 *
 */
function quux () {

}
// Options: [{"descriptionStyle":"tag"}]
// Message: Missing JSDoc @description declaration.

/**
 *
 */
function quux () {

}
// Options: [{"descriptionStyle":"any"}]
// Message: Missing JSDoc block description or @description declaration.

/**
 *
 */
function quux () {

}
// Options: [{"descriptionStyle":"body"}]
// Message: Missing JSDoc block description.

/**
 *
 */
class quux {

}
// Options: [{"contexts":["ClassDeclaration"],"descriptionStyle":"tag"}]
// Message: Missing JSDoc @description declaration.

/**
 *
 */
// Options: [{"contexts":["any"],"descriptionStyle":"tag"}]
// Message: Missing JSDoc @description declaration.

/**
 *
 */
class quux {

}
// Options: [{"contexts":["ClassDeclaration"],"descriptionStyle":"tag"}]
// Message: Missing JSDoc @description declaration.

/**
 *
 */
class quux {

}
// Options: [{"contexts":["ClassDeclaration"],"descriptionStyle":"tag"}]
// Message: Missing JSDoc @description declaration.

/**
 * @description
 */
function quux () {

}
// Options: [{"descriptionStyle":"tag"}]
// Message: Missing JSDoc @description description.

/**
 *
 */
interface quux {

}
// Options: [{"contexts":["TSInterfaceDeclaration"],"descriptionStyle":"tag"}]
// Message: Missing JSDoc @description declaration.

/**
 *
 */
var quux = class {

};
// Options: [{"contexts":["ClassExpression"],"descriptionStyle":"tag"}]
// Message: Missing JSDoc @description declaration.

/**
 *
 */
var quux = {

};
// Options: [{"contexts":["ObjectExpression"],"descriptionStyle":"tag"}]
// Message: Missing JSDoc @description declaration.

/**
 * @someDesc
 */
function quux () {

}
// Settings: {"jsdoc":{"tagNamePreference":{"description":{"message":"Please avoid `{{tagName}}`; use `{{replacement}}` instead","replacement":"someDesc"}}}}
// Options: [{"descriptionStyle":"tag"}]
// Message: Missing JSDoc @someDesc description.

/**
 * @description
 */
function quux () {

}
// Settings: {"jsdoc":{"tagNamePreference":{"description":false}}}
// Options: [{"descriptionStyle":"tag"}]
// Message: Unexpected tag `@description`

/**
 * @description
 */
function quux () {

}
// Settings: {"jsdoc":{"tagNamePreference":{"description":false}}}
// Options: [{"descriptionStyle":"any"}]
// Message: Missing JSDoc block description or @description declaration.

/**
 *
 */
function quux () {
}
// Options: [{"exemptedBy":["notPresent"]}]
// Message: Missing JSDoc block description.
````


<a name="require-description-passing-examples"></a>
## Passing examples

The following patterns are not considered problems:

````js
/**
 *
 */

/**
 * @description
 * // arbitrary description content
 */
function quux () {

}
// Options: [{"descriptionStyle":"tag"}]

/**
 * @description
 * quux(); // does something useful
 */
function quux () {

}
// Options: [{"descriptionStyle":"tag"}]

/**
 * @description <caption>Valid usage</caption>
 * quux(); // does something useful
 *
 * @description <caption>Invalid usage</caption>
 * quux('random unwanted arg'); // results in an error
 */
function quux () {

}
// Options: [{"descriptionStyle":"tag"}]

/**
 *
 */
class quux {

}
// Options: [{"descriptionStyle":"tag"}]

/**
 *
 */
function quux () {

}
// Options: [{"contexts":["ClassDeclaration"]}]

/**
 * @type {MyCallback}
 */
function quux () {

}
// Options: [{"exemptedBy":["type"]}]

/**
 *
 */
interface quux {

}
// Options: [{"descriptionStyle":"tag"}]

/**
 *
 */
var quux = class {

};
// Options: [{"descriptionStyle":"tag"}]

/**
 *
 */
var quux = {

};
// Options: [{"descriptionStyle":"tag"}]

/**
 * Has an implicit description
 */
function quux () {

}
// Options: [{"descriptionStyle":"body"}]

/**
 * Has an implicit description
 */
function quux () {

}

/**
 * Has an implicit description
 */
function quux () {

}
// Options: [{"descriptionStyle":"any"}]

/**
 * @description Has an explicit description
 */
function quux () {

}
// Options: [{"descriptionStyle":"any"}]

/**
 *
 */
function quux () {

}
// Settings: {"jsdoc":{"tagNamePreference":{"description":false}}}
````

