<a name="user-content-require-description"></a>
<a name="require-description"></a>
# <code>require-description</code>

* [Options](#user-content-require-description-options)
* [Context and settings](#user-content-require-description-context-and-settings)
* [Failing examples](#user-content-require-description-failing-examples)
* [Passing examples](#user-content-require-description-passing-examples)


Requires that all functions (or optionally other structures) with a JSDoc block
have a description.

* All functions must have an implicit description (e.g., text above tags) or
  have the option `descriptionStyle` set to `tag` (requiring `@description`
  (or `@desc` if that is set as your preferred tag name)).
* Every jsdoc block description (or `@description` tag if `descriptionStyle`
  is `"tag"`) must have a non-empty description that explains the purpose of
  the method.

<a name="user-content-require-description-options"></a>
<a name="require-description-options"></a>
## Options

An options object may have any of the following properties:

- `contexts` - Set to an array of strings representing the AST context
  where you wish the rule to be applied (e.g., `ClassDeclaration` for ES6
  classes). Overrides the default contexts (see below).  Set to `"any"` if
  you want the rule to apply to any jsdoc block throughout your files.
- `exemptedBy` - Array of tags (e.g., `['type']`) whose presence on the
    document block avoids the need for a `@description`. Defaults to an
    array with `inheritdoc`. If you set this array, it will overwrite the
    default, so be sure to add back `inheritdoc` if you wish its presence
    to cause exemption of the rule.
- `descriptionStyle` - Whether to accept implicit descriptions (`"body"`) or
    `@description` tags (`"tag"`) as satisfying the rule. Set to `"any"` to
    accept either style. Defaults to `"body"`.
- `checkConstructors` - A value indicating whether `constructor`s should be
    checked. Defaults to `true`.
- `checkGetters` - A value indicating whether getters should be checked.
    Defaults to `true`.
- `checkSetters` - A value indicating whether setters should be checked.
    Defaults to `true`.

<a name="user-content-require-description-context-and-settings"></a>
<a name="require-description-context-and-settings"></a>
## Context and settings

| | |
| -------- | ---------------------- |
| Context  | `ArrowFunctionExpression`, `FunctionDeclaration`, `FunctionExpression`; others when `contexts` option enabled |
| Tags     | `description` or jsdoc block |
| Aliases  | `desc` |
| Recommended | false |
| Options  |`checkConstructors`, `checkGetters`, `checkSetters`, `contexts`, `descriptionStyle`, `exemptedBy`|
| Settings | `ignoreReplacesDocs`, `overrideReplacesDocs`, `augmentsExtendsReplacesDocs`, `implementsReplacesDocs` |

<a name="user-content-require-description-failing-examples"></a>
<a name="require-description-failing-examples"></a>
## Failing examples

The following patterns are considered problems:

````js
/**
 *
 */
function quux () {

}
// "jsdoc/require-description": ["error"|"warn", {"descriptionStyle":"tag"}]
// Message: Missing JSDoc @description declaration.

/**
 *
 */
function quux () {

}
// "jsdoc/require-description": ["error"|"warn", {"descriptionStyle":"any"}]
// Message: Missing JSDoc block description or @description declaration.

/**
 *
 */
function quux () {

}
// "jsdoc/require-description": ["error"|"warn", {"descriptionStyle":"body"}]
// Message: Missing JSDoc block description.

/**
 * @desc Not a blank description
 */
function quux () {

}
// "jsdoc/require-description": ["error"|"warn", {"descriptionStyle":"body"}]
// Message: Remove the @desc tag to leave a plain block description or add additional description text above the @desc line.

/**
 * @description Not a blank description
 */
function quux () {

}
// "jsdoc/require-description": ["error"|"warn", {"descriptionStyle":"body"}]
// Message: Remove the @description tag to leave a plain block description or add additional description text above the @description line.

/**
 *
 */
class quux {

}
// "jsdoc/require-description": ["error"|"warn", {"contexts":["ClassDeclaration"],"descriptionStyle":"tag"}]
// Message: Missing JSDoc @description declaration.

/**
 *
 */
class quux {

}
// Settings: {"jsdoc":{"contexts":["ClassDeclaration"]}}
// "jsdoc/require-description": ["error"|"warn", {"descriptionStyle":"tag"}]
// Message: Missing JSDoc @description declaration.

/**
 *
 */
// "jsdoc/require-description": ["error"|"warn", {"contexts":["any"],"descriptionStyle":"tag"}]
// Message: Missing JSDoc @description declaration.

/**
 *
 */
class quux {

}
// "jsdoc/require-description": ["error"|"warn", {"contexts":["ClassDeclaration"],"descriptionStyle":"tag"}]
// Message: Missing JSDoc @description declaration.

/**
 *
 */
class quux {

}
// "jsdoc/require-description": ["error"|"warn", {"contexts":["ClassDeclaration"],"descriptionStyle":"tag"}]
// Message: Missing JSDoc @description declaration.

/**
 * @description
 */
function quux () {

}
// "jsdoc/require-description": ["error"|"warn", {"descriptionStyle":"tag"}]
// Message: Missing JSDoc @description description.

/**
 *
 */
interface quux {

}
// "jsdoc/require-description": ["error"|"warn", {"contexts":["TSInterfaceDeclaration"],"descriptionStyle":"tag"}]
// Message: Missing JSDoc @description declaration.

/**
 *
 */
var quux = class {

};
// "jsdoc/require-description": ["error"|"warn", {"contexts":["ClassExpression"],"descriptionStyle":"tag"}]
// Message: Missing JSDoc @description declaration.

/**
 *
 */
var quux = {

};
// "jsdoc/require-description": ["error"|"warn", {"contexts":["ObjectExpression"],"descriptionStyle":"tag"}]
// Message: Missing JSDoc @description declaration.

/**
 * @someDesc
 */
function quux () {

}
// Settings: {"jsdoc":{"tagNamePreference":{"description":{"message":"Please avoid `{{tagName}}`; use `{{replacement}}` instead","replacement":"someDesc"}}}}
// "jsdoc/require-description": ["error"|"warn", {"descriptionStyle":"tag"}]
// Message: Missing JSDoc @someDesc description.

/**
 * @description
 */
function quux () {

}
// Settings: {"jsdoc":{"tagNamePreference":{"description":false}}}
// "jsdoc/require-description": ["error"|"warn", {"descriptionStyle":"tag"}]
// Message: Unexpected tag `@description`

/**
 * @description
 */
function quux () {

}
// Settings: {"jsdoc":{"tagNamePreference":{"description":false}}}
// "jsdoc/require-description": ["error"|"warn", {"descriptionStyle":"any"}]
// Message: Missing JSDoc block description or @description declaration.

/**
 *
 */
function quux () {
}
// "jsdoc/require-description": ["error"|"warn", {"exemptedBy":["notPresent"]}]
// Message: Missing JSDoc block description.

class TestClass {
  /**
   *
   */
  constructor() { }
}
// Message: Missing JSDoc block description.

class TestClass {
  /**
   *
   */
  constructor() { }
}
// "jsdoc/require-description": ["error"|"warn", {"checkConstructors":true}]
// Message: Missing JSDoc block description.

class TestClass {
  /**
   *
   */
  get Test() { }
}
// Message: Missing JSDoc block description.

class TestClass {
  /**
   *
   */
  get Test() { }
}
// "jsdoc/require-description": ["error"|"warn", {"checkGetters":true}]
// Message: Missing JSDoc block description.

class TestClass {
  /**
   *
   */
  set Test(value) { }
}
// Message: Missing JSDoc block description.

class TestClass {
  /**
   *
   */
  set Test(value) { }
}
// "jsdoc/require-description": ["error"|"warn", {"checkSetters":true}]
// Message: Missing JSDoc block description.

/**
 *
 */
class Foo {
    /**
     *
     */
    constructor() {}

    /**
     *
     */
    bar() {}
}
// "jsdoc/require-description": ["error"|"warn", {"checkConstructors":false,"contexts":["MethodDefinition"]}]
// Message: Missing JSDoc block description.

/**
 * @implements {Bar}
 */
class quux {

}
// Settings: {"jsdoc":{"implementsReplacesDocs":false}}
// "jsdoc/require-description": ["error"|"warn", {"contexts":[{"comment":"JsdocBlock[postDelimiter=\"\"]:has(JsdocTag[rawType=\"Bar\"])","context":"ClassDeclaration"}],"descriptionStyle":"tag"}]
// Message: Missing JSDoc @description declaration.

/**
 * Has some
 *   description already.
 * @implements {Bar}
 */
class quux {

}
// Settings: {"jsdoc":{"implementsReplacesDocs":false}}
// "jsdoc/require-description": ["error"|"warn", {"contexts":[{"comment":"JsdocBlock[postDelimiter=\"\"]:has(JsdocTag[rawType=\"Bar\"])","context":"ClassDeclaration"}],"descriptionStyle":"tag"}]
// Message: Missing JSDoc @description declaration.

/**
 * @implements {Bar
 *   | Foo}
 */
class quux {

}
// Settings: {"jsdoc":{"implementsReplacesDocs":false}}
// "jsdoc/require-description": ["error"|"warn", {"contexts":[{"comment":"JsdocBlock[postDelimiter=\"\"]:has(JsdocTypeUnion > JsdocTypeName[value=\"Bar\"]:nth-child(1))","context":"ClassDeclaration"}],"descriptionStyle":"tag"}]
// Message: Missing JSDoc @description declaration.

/**
 * @implements {Bar}
 */
class quux {

}
// Settings: {"jsdoc":{"implementsReplacesDocs":false}}
// "jsdoc/require-description": ["error"|"warn", {"contexts":[{"comment":"JsdocBlock[postDelimiter=\"\"]:has(JsdocTag[tag=\"implements\"])","context":"ClassDeclaration"}],"descriptionStyle":"tag"}]
// Message: Missing JSDoc @description declaration.

/**
 * @implements {Bar}
 */
class quux {

}
// Settings: {"jsdoc":{"implementsReplacesDocs":false}}
// "jsdoc/require-description": ["error"|"warn", {"contexts":[{"comment":"JsdocBlock[postDelimiter=\"\"]:has(JsdocTag[tag=\"implements\"])","context":"any"}],"descriptionStyle":"tag"}]
// Message: Missing JSDoc @description declaration.
````



<a name="user-content-require-description-passing-examples"></a>
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
// "jsdoc/require-description": ["error"|"warn", {"descriptionStyle":"tag"}]

/**
 * @description
 * quux(); // does something useful
 */
function quux () {

}
// "jsdoc/require-description": ["error"|"warn", {"descriptionStyle":"tag"}]

/**
 * @description <caption>Valid usage</caption>
 * quux(); // does something useful
 *
 * @description <caption>Invalid usage</caption>
 * quux('random unwanted arg'); // results in an error
 */
function quux () {

}
// "jsdoc/require-description": ["error"|"warn", {"descriptionStyle":"tag"}]

/**
 *
 */
class quux {

}
// "jsdoc/require-description": ["error"|"warn", {"descriptionStyle":"tag"}]

/**
 *
 */
function quux () {

}
// "jsdoc/require-description": ["error"|"warn", {"contexts":["ClassDeclaration"]}]

/**
 * @type {MyCallback}
 */
function quux () {

}
// "jsdoc/require-description": ["error"|"warn", {"exemptedBy":["type"]}]

/**
 *
 */
interface quux {

}
// "jsdoc/require-description": ["error"|"warn", {"descriptionStyle":"tag"}]

interface quux {
  /**
   * If the thing should be checked.
   */
  checked?: boolean
}
// "jsdoc/require-description": ["error"|"warn", {"contexts":["TSPropertySignature"]}]

/**
 *
 */
var quux = class {

};
// "jsdoc/require-description": ["error"|"warn", {"descriptionStyle":"tag"}]

/**
 *
 */
var quux = {

};
// "jsdoc/require-description": ["error"|"warn", {"descriptionStyle":"tag"}]

/**
 * Has an implicit description
 */
function quux () {

}
// "jsdoc/require-description": ["error"|"warn", {"descriptionStyle":"body"}]

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
// "jsdoc/require-description": ["error"|"warn", {"descriptionStyle":"any"}]

/**
 * @description Has an explicit description
 */
function quux () {

}
// "jsdoc/require-description": ["error"|"warn", {"descriptionStyle":"any"}]

/**
 *
 */
function quux () {

}
// Settings: {"jsdoc":{"tagNamePreference":{"description":false}}}

class TestClass {
  /**
   * Test.
   */
  constructor() { }
}

class TestClass {
  /**
   *
   */
  constructor() { }
}
// "jsdoc/require-description": ["error"|"warn", {"checkConstructors":false}]

class TestClass {
  /**
   * Test.
   */
  get Test() { }
}

class TestClass {
  /**
   *
   */
  get Test() { }
}
// "jsdoc/require-description": ["error"|"warn", {"checkGetters":false}]

class TestClass {
  /**
   * Test.
   */
  set Test(value) { }
}

class TestClass {
  /**
   *
   */
  set Test(value) { }
}
// "jsdoc/require-description": ["error"|"warn", {"checkSetters":false}]

/**
 * Multi
 * line
 */
function quux () {

}

/** Single line */
function quux () {

}

/** @description something */
function quux () {

}
// "jsdoc/require-description": ["error"|"warn", {"descriptionStyle":"tag"}]

/**
 * @implements {Bar}
 */
class quux {

}
// Settings: {"jsdoc":{"implementsReplacesDocs":false}}
// "jsdoc/require-description": ["error"|"warn", {"contexts":[{"comment":"JsdocBlock[postDelimiter=/\\s{4}/]:has(JsdocTag[rawType=\"class\"])","context":"ClassDeclaration"}],"descriptionStyle":"tag"}]

/**
 * Has some
 *   description already.
 */
class quux {

}
// "jsdoc/require-description": ["error"|"warn", {"contexts":[{"comment":"JsdocBlock[postDelimiter=\"\"]:has(JsdocTag[rawType=\"{Bar}\"])","context":"ClassDeclaration"}],"descriptionStyle":"tag"}]

/**
 * Has some
 *   description already.
 */
class quux {

}
// "jsdoc/require-description": ["error"|"warn", {"contexts":[{"comment":"JsdocBlock[postDelimiter=\"\"]:has(JsdocTag[rawType=\"{Bar}\"])","context":"any"}],"descriptionStyle":"tag"}]

/**
 * Has some
 *   description already.
 */
// "jsdoc/require-description": ["error"|"warn", {"contexts":[{"comment":"JsdocBlock[postDelimiter=\"\"]:has(JsdocTag[rawType=\"{Bar}\"])","context":"any"}],"descriptionStyle":"tag"}]
````

