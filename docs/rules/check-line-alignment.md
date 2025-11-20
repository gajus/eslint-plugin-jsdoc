<a name="user-content-check-line-alignment"></a>
<a name="check-line-alignment"></a>
# <code>check-line-alignment</code>

* [Fixer](#user-content-check-line-alignment-fixer)
* [Options](#user-content-check-line-alignment-options)
    * [`customSpacings`](#user-content-check-line-alignment-options-customspacings)
    * [`disableWrapIndent`](#user-content-check-line-alignment-options-disablewrapindent)
    * [`preserveMainDescriptionPostDelimiter`](#user-content-check-line-alignment-options-preservemaindescriptionpostdelimiter)
    * [`tags`](#user-content-check-line-alignment-options-tags)
    * [`wrapIndent`](#user-content-check-line-alignment-options-wrapindent)
* [Context and settings](#user-content-check-line-alignment-context-and-settings)
* [Failing examples](#user-content-check-line-alignment-failing-examples)
* [Passing examples](#user-content-check-line-alignment-passing-examples)


Reports invalid alignment of JSDoc block lines. This is a
[standard recommended to WordPress code](https://make.wordpress.org/core/handbook/best-practices/inline-documentation-standards/javascript/#aligning-comments),
for example.

<a name="user-content-check-line-alignment-fixer"></a>
<a name="check-line-alignment-fixer"></a>
## Fixer

Will either add alignment between the tag, type, name, and description across
lines of the JSDoc block or remove it.

<a name="user-content-check-line-alignment-options"></a>
<a name="check-line-alignment-options"></a>
## Options

The first option is a string with the following possible values: "always", "never", "any".
If the string value is
`"always"` then a problem is raised when the lines are not aligned.
If it is `"never"` then a problem should be raised when there is more than
one space between each line's parts. If it is `"any"`, no alignment is made.
Defaults to `"never"`.

Note that in addition to alignment, the "never" and "always" options will both
ensure that at least one space is present after the asterisk delimiter.

The next option is an object with the following properties.

<a name="user-content-check-line-alignment-options-customspacings"></a>
<a name="check-line-alignment-options-customspacings"></a>
### <code>customSpacings</code>


A single options object has the following properties.

An object with any of the following spacing keys set to an integer.
If a spacing is not defined, it defaults to one.

<a name="user-content-check-line-alignment-options-customspacings-postdelimiter"></a>
<a name="check-line-alignment-options-customspacings-postdelimiter"></a>
#### <code>postDelimiter</code>

Affects spacing after the asterisk (e.g., `*   @param`)

<a name="user-content-check-line-alignment-options-customspacings-posthyphen"></a>
<a name="check-line-alignment-options-customspacings-posthyphen"></a>
#### <code>postHyphen</code>

Affects spacing after any hyphens in the description (e.g., `* @param {someType} name -  A description`)

<a name="user-content-check-line-alignment-options-customspacings-postname"></a>
<a name="check-line-alignment-options-customspacings-postname"></a>
#### <code>postName</code>

Affects spacing after the name (e.g., `* @param {someType} name   `)

<a name="user-content-check-line-alignment-options-customspacings-posttag"></a>
<a name="check-line-alignment-options-customspacings-posttag"></a>
#### <code>postTag</code>

Affects spacing after the tag (e.g., `* @param  `)

<a name="user-content-check-line-alignment-options-customspacings-posttype"></a>
<a name="check-line-alignment-options-customspacings-posttype"></a>
#### <code>postType</code>

Affects spacing after the type (e.g., `* @param {someType}   `)

<a name="user-content-check-line-alignment-options-disablewrapindent"></a>
<a name="check-line-alignment-options-disablewrapindent"></a>
### <code>disableWrapIndent</code>

Disables `wrapIndent`; existing wrap indentation is preserved without changes.

<a name="user-content-check-line-alignment-options-preservemaindescriptionpostdelimiter"></a>
<a name="check-line-alignment-options-preservemaindescriptionpostdelimiter"></a>
### <code>preserveMainDescriptionPostDelimiter</code>

A boolean to determine whether to preserve the post-delimiter spacing of the
main description. If `false` or unset, will be set to a single space.

<a name="user-content-check-line-alignment-options-tags"></a>
<a name="check-line-alignment-options-tags"></a>
### <code>tags</code>

Use this to change the tags which are sought for alignment changes. Defaults to an array of
`['param', 'arg', 'argument', 'property', 'prop', 'returns', 'return', 'template']`.

<a name="user-content-check-line-alignment-options-wrapindent"></a>
<a name="check-line-alignment-options-wrapindent"></a>
### <code>wrapIndent</code>

The indent that will be applied for tag text after the first line.
Default to the empty string (no indent).


<a name="user-content-check-line-alignment-context-and-settings"></a>
<a name="check-line-alignment-context-and-settings"></a>
## Context and settings

|||
|---|---|
|Context|everywhere|
|Options|string ("always", "never", "any") followed by object with `customSpacings`, `disableWrapIndent`, `preserveMainDescriptionPostDelimiter`, `tags`, `wrapIndent`|
|Tags|`param`, `property`, `returns` and others added by `tags`|
|Aliases|`arg`, `argument`, `prop`, `return`|
|Recommended|false|

<a name="user-content-check-line-alignment-failing-examples"></a>
<a name="check-line-alignment-failing-examples"></a>
## Failing examples

The following patterns are considered problems:

````ts
/**
 * Function description.
 *
 * @param {string} lorem Description.
 * @param {int} sit Description multi words.
 */
const fn = ( lorem, sit ) => {}
// "jsdoc/check-line-alignment": ["error"|"warn", "always"]
// Message: Expected JSDoc block lines to be aligned.

/**
 * With tabs.
 *
 * @param {string} lorem Description.
 * @param {int} sit Description multi words.
 */
    const fn = ( lorem, sit ) => {}
// "jsdoc/check-line-alignment": ["error"|"warn", "always"]
// Message: Expected JSDoc block lines to be aligned.

/**
 * Function description.
 *
 * @param {string} lorem - Description.
 * @param {int} sit - Description multi words.
 */
const fn = ( lorem, sit ) => {}
// "jsdoc/check-line-alignment": ["error"|"warn", "always"]
// Message: Expected JSDoc block lines to be aligned.

/**
 * Function description.
 *
 * @param  {string} lorem Description.
 *  @param {int}    sit   Description multi words.
 */
const fn = ( lorem, sit ) => {}
// "jsdoc/check-line-alignment": ["error"|"warn", "always"]
// Message: Expected JSDoc block lines to be aligned.

/**
 * Function description.
 *
 * @param  {string} lorem Description.
  * @param {int}    sit   Description multi words.
 */
const fn = ( lorem, sit ) => {}
// "jsdoc/check-line-alignment": ["error"|"warn", "always"]
// Message: Expected JSDoc block lines to be aligned.

/**
 * Function description.
 *
 * @param  {string} lorem Description.
 * @param  {int}    sit   Description multi words.
 */
const fn = ( lorem, sit ) => {}
// "jsdoc/check-line-alignment": ["error"|"warn", "always"]
// Message: Expected JSDoc block lines to be aligned.

/**
 * Function description.
 *
 * @template  {string} Arg Description.
 * @param     {Arg}    arg Description
 */
function hello(arg) {}
// "jsdoc/check-line-alignment": ["error"|"warn", "always"]
// Message: Expected JSDoc block lines to be aligned.

/**
 * Function description.
 *
 * @param {string} lorem Description.
 * @param {int} sit Description multi words.
 */
function fn( lorem, sit ) {}
// "jsdoc/check-line-alignment": ["error"|"warn", "always"]
// Message: Expected JSDoc block lines to be aligned.

const object = {
  /**
   * Function description.
   *
   * @param {string} lorem Description.
   * @param {int} sit Description multi words.
   */
  fn( lorem, sit ) {}
}
// "jsdoc/check-line-alignment": ["error"|"warn", "always"]
// Message: Expected JSDoc block lines to be aligned.

class ClassName {
  /**
   * Function description.
   *
   * @param {string} lorem Description.
   * @param {int} sit Description multi words.
   */
  fn( lorem, sit ) {}
}
// "jsdoc/check-line-alignment": ["error"|"warn", "always"]
// Message: Expected JSDoc block lines to be aligned.

/**
 * Function description.
 *
 * @arg {string} lorem Description.
 * @arg {int} sit Description multi words.
 */
const fn = ( lorem, sit ) => {}
// "jsdoc/check-line-alignment": ["error"|"warn", "always"]
// Message: Expected JSDoc block lines to be aligned.

/**
 * @namespace
 * @property {object} defaults Description.
 * @property {int} defaults.lorem Description multi words.
 */
const config = {
    defaults: {
        lorem: 1
    }
}
// "jsdoc/check-line-alignment": ["error"|"warn", "always"]
// Message: Expected JSDoc block lines to be aligned.

/**
 * My object.
 *
 * @typedef {Object} MyObject
 *
 * @property {string} lorem Description.
 * @property {int} sit Description multi words.
 */
// "jsdoc/check-line-alignment": ["error"|"warn", "always"]
// Message: Expected JSDoc block lines to be aligned.

/**
 * My object.
 *
 * @typedef {Object} MyObject
 *
 * @property {{a: number, b: string, c}} lorem Description.
 * @property {Object.<string, Class>} sit Description multi words.
 * @property {Object.<string, Class>} amet Description} weird {multi} {{words}}.
 * @property {Object.<string, Class>} dolor
 */
// "jsdoc/check-line-alignment": ["error"|"warn", "always"]
// Message: Expected JSDoc block lines to be aligned.

/**
 * My object.
 *
 * @typedef {Object} MyObject
 *
 * @property {{a: number, b: string, c}} lorem Description.
 * @property {Object.<string, Class>} sit Description multi words.
 * @property {Object.<string, Class>} amet Description} weird {multi} {{words}}.
 * @property {Object.<string, Class>} dolor
 */
// "jsdoc/check-line-alignment": ["error"|"warn", "always",{"tags":["typedef","property"]}]
// Message: Expected JSDoc block lines to be aligned.

/**
 * My function.
 *
 * @param {string} lorem  Description.
 * @param {int}    sit    Description multi words.
 */
const fn = ( lorem, sit ) => {}
// "jsdoc/check-line-alignment": ["error"|"warn", "never"]
// Message: Expected JSDoc block lines to not be aligned.

/**
 * My function.
 *
 * @param {string} lorem Description.
 * @param   {int}    sit   Description multi words.
 */
const fn = ( lorem, sit ) => {}
// "jsdoc/check-line-alignment": ["error"|"warn", "never"]
// Message: Expected JSDoc block lines to not be aligned.

/**
 * My function.
 *
 * @param {string} lorem Description.
 * @param   {int}    sit
 */
const fn = ( lorem, sit ) => {}
// "jsdoc/check-line-alignment": ["error"|"warn", "never"]
// Message: Expected JSDoc block lines to not be aligned.

/**
 * My function.
 *
 * @param {string} lorem Description.
 * @param   {int}    sit
 */
const fn = ( lorem, sit ) => {}
// Message: Expected JSDoc block lines to not be aligned.

/**
 * Function description.
 *
 * @param {string} lorem Description.
 * @param {int} sit Description multi
   line without *.
 */
const fn = ( lorem, sit ) => {}
// "jsdoc/check-line-alignment": ["error"|"warn", "always"]
// Message: Expected JSDoc block lines to be aligned.

/**
 * My function.
 *
 * @param {string} lorem Description.
 * @param   {int}    sit
 *
 * @return  {string}  Return description
 *    with multi line, but don't touch.
 */
const fn = ( lorem, sit ) => {}
// "jsdoc/check-line-alignment": ["error"|"warn", "always",{"tags":["param"]}]
// Message: Expected JSDoc block lines to be aligned.

/**
 * Only return doc.
 *
 * @return {boolean}  Return description.
 */
const fn = ( lorem, sit ) => {}
// "jsdoc/check-line-alignment": ["error"|"warn", "always"]
// Message: Expected JSDoc block lines to be aligned.

/**
 * Creates OS based shortcuts for files, folders, and applications.
 *
 * @param  {object}  options  Options object for each OS.
 * @return {boolean}          True = success, false = failed to create the icon
 */
 function quux () {}
// "jsdoc/check-line-alignment": ["error"|"warn", "never"]
// Message: Expected JSDoc block lines to not be aligned.

/**
 * Creates OS based shortcuts for files, folders, and applications.
 *
 * @param {object} options Options object for each OS.
 * @return {boolean}          True = success, false = failed to create the icon
 */
 function quux () {}
// "jsdoc/check-line-alignment": ["error"|"warn", "never"]
// Message: Expected JSDoc block lines to not be aligned.

/**
 * Creates OS based shortcuts for files, folders, and applications.
 *
 * @param {object} options Options object for each OS.
 * @return  True = success, false = failed to create the icon
 */
 function quux () {}
// "jsdoc/check-line-alignment": ["error"|"warn", "never"]
// Message: Expected JSDoc block lines to not be aligned.

/**
 * Creates OS based shortcuts for files, folders, and applications.
 *
 * @param  options Options object for each OS.
 * @return True = success, false = failed to create the icon
 */
 function quux () {}
// "jsdoc/check-line-alignment": ["error"|"warn", "never"]
// Message: Expected JSDoc block lines to not be aligned.

/**
 * Creates OS based shortcuts for files, folders, and applications.
 *
 * @param {object} options Options object for each OS.
 * @param {object} other Other.
 * @return  True = success, false = failed to create the icon
 */
 function quux () {}
// "jsdoc/check-line-alignment": ["error"|"warn", "never",{"tags":["param","return"]}]
// Message: Expected JSDoc block lines to not be aligned.

/**
 * Returns the value stored in the process.env for a given
 * environment variable.
 *
 * @param  {string} withPercents    '%USERNAME%'
 * @param  {string} withoutPercents 'USERNAME'
 * @return {string}                 'bob' || '%USERNAME%'
 */
function quux () {}
// "jsdoc/check-line-alignment": ["error"|"warn", "never"]
// Message: Expected JSDoc block lines to not be aligned.

/**
 * Function description
 *           description with post delimiter.
 *
 * @param {string} lorem Description.
 * @param {int}    sit   Description multi words.
 */
const fn = ( lorem, sit ) => {}
// "jsdoc/check-line-alignment": ["error"|"warn", "always"]
// Message: Expected JSDoc block lines to be aligned.

/**
 * Function description.
 *
 * @param  {string} lorem Description.
 * @param  {int}    sit   Description multi words.
 *
 * @return {string}       Return description.
 */
const fn = ( lorem, sit ) => {}
// "jsdoc/check-line-alignment": ["error"|"warn", "always",{"customSpacings":{"postDelimiter":2,"postTag":3,"postType":2}}]
// Message: Expected JSDoc block lines to be aligned.

/**
 * Function description.
 *
 * @param  {string} lorem Description.
 * @param  {int}    sit   Description multi words.
 *
 * @return {string}       Return description.
 */
const fn = ( lorem, sit ) => {}
// "jsdoc/check-line-alignment": ["error"|"warn", "always",{"customSpacings":{"postName":3}}]
// Message: Expected JSDoc block lines to be aligned.

/**
 * Function description.
 *
 *  @param   {string}  lorem Description.
 * @param {int} sit Description multi words.
 */
const fn = ( lorem, sit ) => {}
// "jsdoc/check-line-alignment": ["error"|"warn", "never",{"customSpacings":{"postDelimiter":2,"postTag":3,"postType":2}}]
// Message: Expected JSDoc block lines to not be aligned.

/**
 * Function description.
 *
 * @param {string} lorem   Description.
 * @param {int} sit Description multi words.
 */
const fn = ( lorem, sit ) => {}
// "jsdoc/check-line-alignment": ["error"|"warn", "never",{"customSpacings":{"postName":3}}]
// Message: Expected JSDoc block lines to not be aligned.


       /**\r
        * Function description.\r
        *\r
        * @param {string} lorem Description.\r
        * @param {int} sit Description multi words.\r
        * @param {string} sth   Multi\r
        *                       line description.\r
        */\r
       const fn = ( lorem, sit ) => {}
// "jsdoc/check-line-alignment": ["error"|"warn", "always"]
// Message: Expected JSDoc block lines to be aligned.

/**
 * Function description.
 *
 * @param {string} lorem Description.
 * @param {int} sit Description multi
 *   line with asterisks.
 */
const fn = ( lorem, sit ) => {}
// "jsdoc/check-line-alignment": ["error"|"warn", "always"]
// Message: Expected JSDoc block lines to be aligned.

/**
 * Function description.
 *
 * @param {string} lorem - Description.
 * @param {int}    sit   -   Description multi words.
 */
const fn = ( lorem, sit ) => {}
// "jsdoc/check-line-alignment": ["error"|"warn", "never"]
// Message: Expected JSDoc block lines to not be aligned.

/**
 * Function description.
 *
 * @param {string} lorem -  Description.
 * @param {int}    sit   -   Description multi words.
 */
const fn = ( lorem, sit ) => {}
// "jsdoc/check-line-alignment": ["error"|"warn", "never",{"customSpacings":{"postHyphen":2}}]
// Message: Expected JSDoc block lines to not be aligned.

/**
 * Function description.
 *
 * @param {string} lorem - Description.
 * @param {int} sit -  Description multi words.
 */
const fn = ( lorem, sit ) => {}
// "jsdoc/check-line-alignment": ["error"|"warn", "never",{"customSpacings":{"postHyphen":2}}]
// Message: Expected JSDoc block lines to not be aligned.

/**
 * Function description.
 *
 * @param {string} lorem - Description.
 * @param {int}    sit   -  Description multi words.
 */
const fn = ( lorem, sit ) => {}
// "jsdoc/check-line-alignment": ["error"|"warn", "always",{"customSpacings":{"postHyphen":2}}]
// Message: Expected JSDoc block lines to be aligned.

/**
 * Function description.
 *
 * @param {string} lorem -  Description.
 * @param {int}    sit   -   Description multi words.
 */
const fn = ( lorem, sit ) => {}
// "jsdoc/check-line-alignment": ["error"|"warn", "always",{"customSpacings":{"postHyphen":2}}]
// Message: Expected JSDoc block lines to be aligned.

/**
 * Function description.
 *
 * @param   {string} lorem -  Description.
 * @param {int} sit -  Description multi words.
 */
const fn = ( lorem, sit ) => {}
// "jsdoc/check-line-alignment": ["error"|"warn", "never",{"customSpacings":{"postHyphen":2}}]
// Message: Expected JSDoc block lines to not be aligned.

/**
 * @param {string} lorem Description
 * with multiple lines.
 */
function quux () {
}
// "jsdoc/check-line-alignment": ["error"|"warn", "any",{"wrapIndent":"  "}]
// Message: Expected wrap indent

/**
 * Function description.
 *
 * @param {string} lorem Description.
 * @param {int} sit Description multi
 * line with asterisks.
 */
const fn = ( lorem, sit ) => {}
// "jsdoc/check-line-alignment": ["error"|"warn", "always",{"wrapIndent":"  "}]
// Message: Expected JSDoc block lines to be aligned.

/**
 * My function.
 *
 * @param {string} lorem Description.
 * @param   {int}    sit   Description multiple
 * lines.
 */
const fn = ( lorem, sit ) => {}
// "jsdoc/check-line-alignment": ["error"|"warn", "never",{"wrapIndent":"  "}]
// Message: Expected JSDoc block lines to not be aligned.

/**
 * @property {boolean} tls_verify_client_certificate - Whether our API should
 *   enable TLS client authentication
 */
function quux () {}
// "jsdoc/check-line-alignment": ["error"|"warn", "never",{"wrapIndent":"   "}]
// Message: Expected wrap indent

/**
 * @property {boolean} tls_verify_client_certificate - Whether our API should
 *   enable TLS client authentication
 */
function quux () {}
// "jsdoc/check-line-alignment": ["error"|"warn", "never",{"wrapIndent":""}]
// Message: Expected wrap indent
````



<a name="user-content-check-line-alignment-passing-examples"></a>
<a name="check-line-alignment-passing-examples"></a>
## Passing examples

The following patterns are not considered problems:

````ts
/**
 * Function description.
 *
 * @param {string} lorem Description.
 * @param {int}    sit   Description multi words.
 */
const fn = ( lorem, sit ) => {}
// "jsdoc/check-line-alignment": ["error"|"warn", "always"]

/**
 * With tabs.
 *
 * @param {string} lorem Description.
 * @param {int}    sit   Description multi words.
 */
    const fn = ( lorem, sit ) => {}
// "jsdoc/check-line-alignment": ["error"|"warn", "always"]

/**
 * Function description.
 *
 * @param {string} lorem - Description.
 * @param {int}    sit   - Description multi words.
 */
const fn = ( lorem, sit ) => {}
// "jsdoc/check-line-alignment": ["error"|"warn", "always"]

/**
 * @param {string} lorem Description.
 * @param {int}    sit
 */
const fn = ( lorem, sit ) => {}
// "jsdoc/check-line-alignment": ["error"|"warn", "always"]

/**
 * @param {int}    sit
 * @param {string} lorem Description.
 */
const fn = ( lorem, sit ) => {}
// "jsdoc/check-line-alignment": ["error"|"warn", "always"]

/**
 * No params.
 */
const fn = () => {}
// "jsdoc/check-line-alignment": ["error"|"warn", "always"]

const fn = ( lorem, sit ) => {}
// "jsdoc/check-line-alignment": ["error"|"warn", "always"]

/**
 * Function description.
 *
 * @param {string} lorem Description.
 * @param {int}    sit   Description multi words.
 */
function fn( lorem, sit ) {}
// "jsdoc/check-line-alignment": ["error"|"warn", "always"]

const object = {
  /**
   * Function description.
   *
   * @param {string} lorem Description.
   * @param {int}    sit   Description multi words.
   */
  fn( lorem, sit ) {},
}
// "jsdoc/check-line-alignment": ["error"|"warn", "always"]

class ClassName {
  /**
   * Function description.
   *
   * @param {string} lorem Description.
   * @param {int}    sit   Description multi words.
   */
  fn( lorem, sit ) {}
}
// "jsdoc/check-line-alignment": ["error"|"warn", "always"]

/**
 * Function description.
 *
 * @arg {string} lorem Description.
 * @arg {int}    sit   Description multi words.
 */
const fn = ( lorem, sit ) => {}
// "jsdoc/check-line-alignment": ["error"|"warn", "always"]

/**
 * @namespace
 * @property {object} defaults       Description.
 * @property {int}    defaults.lorem Description multi words.
 */
const config = {
    defaults: {
        lorem: 1
    }
}
// "jsdoc/check-line-alignment": ["error"|"warn", "always"]

/**
 * My object.
 *
 * @typedef {Object} MyObject
 *
 * @property {string} lorem Description.
 * @property {int}    sit   Description multi words.
 */
// "jsdoc/check-line-alignment": ["error"|"warn", "always"]

/**
 * My object.
 *
 * @typedef {Object} MyObject
 *
 * @property {{a: number, b: string, c}} lorem Description.
 * @property {Object.<string, Class>}    sit   Description multi words.
 * @property {Object.<string, Class>}    amet  Description} weird {multi} {{words}}.
 * @property {Object.<string, Class>}    dolor
 */
// "jsdoc/check-line-alignment": ["error"|"warn", "always"]

/**
 * My object.
 *
 * @typedef  {Object}                    MyObject
 *
 * @property {{a: number, b: string, c}} lorem    Description.
 * @property {Object.<string, Class>}    sit      Description multi words.
 * @property {Object.<string, Class>}    amet     Description} weird {multi} {{words}}.
 * @property {Object.<string, Class>}    dolor
 */
// "jsdoc/check-line-alignment": ["error"|"warn", "always",{"tags":["typedef","property"]}]

/**
 * My object.
 *
 * @template                             T
 * @template                             W,X,Y,Z
 * @template {string}                    K               - K must be a string or string literal
 * @template {{ serious(): string }}     Seriousalizable - must have a serious method
 *
 * @param    {{a: number, b: string, c}} lorem           Description.
 */
// "jsdoc/check-line-alignment": ["error"|"warn", "always",{"tags":["template","param"]}]

/** @param {number} lorem */
const fn = ( lorem ) => {}
// "jsdoc/check-line-alignment": ["error"|"warn", "always"]

/**
 * Creates OS based shortcuts for files, folders, and applications.
 *
 * @param  {object}  options Options object for each OS.
 * @return {boolean}         True = success, false = failed to create the icon
 */
 function quux () {}
// "jsdoc/check-line-alignment": ["error"|"warn", "always"]

/**
 * Creates OS based shortcuts for files, folders, and applications.
 *
 * @param  {object}  options Options object for each OS.
 * @return {boolean}
 */
 function quux () {}
// "jsdoc/check-line-alignment": ["error"|"warn", "always"]

/**
 * Only return doc.
 *
 * @return {boolean} Return description.
 */
 function quux () {}
// "jsdoc/check-line-alignment": ["error"|"warn", "always"]

/**
 * Not validating without option.
 *
 * @param {string} lorem Description.
 * @param {int} sit Description multi words.
 */
const fn = ( lorem, sit ) => {}

/**
 * Creates OS based shortcuts for files, folders, and applications.
 *
 * @param {object} options Options object for each OS.
 * @return {boolean} True = success, false = failed to create the icon
 */
function quux (options) {}

/**
 * Creates OS based shortcuts for files, folders, and applications.
 *
 * @param {object} options Options object for each OS.
 * @param {object} other Other.
 * @return  True = success, false = failed to create the icon
 */
 function quux () {}
// "jsdoc/check-line-alignment": ["error"|"warn", "never",{"tags":["param"]}]

/**
 * @param parameter Description.
 */
function func(parameter){

}

/**
 * Function description
 *           description with post delimiter.
 *
 * @param {string} lorem Description.
 * @param {int}    sit   Description multi words.
 */
const fn = ( lorem, sit ) => {}
// "jsdoc/check-line-alignment": ["error"|"warn", "always",{"preserveMainDescriptionPostDelimiter":true}]

/**
 * Function description.
 *
 *  @param    {string}  lorem Description.
 *  @param    {int}     sit   Description multi words.
 *
 *  @return   {string}        Return description.
 */
const fn = ( lorem, sit ) => {}
// "jsdoc/check-line-alignment": ["error"|"warn", "always",{"customSpacings":{"postDelimiter":2,"postTag":3,"postType":2}}]

/**
 * Function description.
 *
 *  @param   {string}  lorem Description.
 *  @param   {int}  sit Description multi words.
 *
 *  @return   {string}  Return description.
 */
const fn = ( lorem, sit ) => {}
// "jsdoc/check-line-alignment": ["error"|"warn", "never",{"customSpacings":{"postDelimiter":2,"postTag":3,"postType":2}}]

/**
 * @param {{
 *        ids: number[]
 *        }}            params
 */
const fn = ({ids}) => {}
// "jsdoc/check-line-alignment": ["error"|"warn", "always"]


       /**\r
        * Function description.\r
        *\r
        * @param {string} lorem Description.\r
        * @param {int}    sit   Description multi words.\r
        * @param {string} sth   Multi\r
        *                       line description.\r
        */\r
       const fn = ( lorem, sit ) => {}
// "jsdoc/check-line-alignment": ["error"|"warn", "always"]

/**
 * Function description.
 *
 * @param lorem Description.
 * @param sit   Description multi words.
 */
const fn = ( lorem, sit ) => {};

/**
 * Function description.
 *
 * @return Return description.
 */
const fn2 = () => {}
// "jsdoc/check-line-alignment": ["error"|"warn", "always"]

/**
 * Function description.
 *
 * @param lorem Description.
 * @param sit   Description multi words.
 * @return      Return description.
 */
const fn = ( lorem, sit ) => {};

/**
 * Function description.
 *
 * @param lorem Description.
 * @param sit   Description multi words.
 * @returns     Return description.
 */
const fn2 = ( lorem, sit ) => {};

/**
 * Function description.
 *
 * @param a Description.
 * @param b Description multi words.
 * @returns Return description.
 */
const fn3 = ( a, b ) => {};
// "jsdoc/check-line-alignment": ["error"|"warn", "always"]

/**
 * Function description.
 *
 * @argument lorem Description.
 * @return         Return description.
 */
const fn = ( lorem ) => {};

/**
 * Function description.
 *
 * @argument lorem Description.
 * @returns        Return description.
 */
const fn2 = ( lorem ) => {};
// "jsdoc/check-line-alignment": ["error"|"warn", "always"]

/**
 * Function description.
 *
 * @arg a   Description.
 * @returns Return description.
 */
const fn = ( a ) => {};
// "jsdoc/check-line-alignment": ["error"|"warn", "always"]

/**
 * Function description.
 *
 * @arg   lorem Description.
 * @param sit   Return description.
 */
const fn = ( lorem, sit ) => {};
// "jsdoc/check-line-alignment": ["error"|"warn", "always"]

/**
 * Function description.
 *
 * @arg      a Description.
 * @argument b Second description.
 * @returns    Return description.
 */
const fn = ( a, b ) => {};
// "jsdoc/check-line-alignment": ["error"|"warn", "always"]

/**
 * @param {string} lorem Description
 *   with multiple lines.
 */
function quux () {
}
// "jsdoc/check-line-alignment": ["error"|"warn", "any",{"wrapIndent":"  "}]

/**
 * @param {string} lorem Description
 *   with multiple lines.
 */
function quux () {
}
// "jsdoc/check-line-alignment": ["error"|"warn", "never",{"wrapIndent":"  "}]

/**
 * Function description.
 *
 * @param {string} lorem Description.
 * @param {int}    sit   Description multi
 *                         line with asterisks.
 */
const fn = ( lorem, sit ) => {}
// "jsdoc/check-line-alignment": ["error"|"warn", "always",{"wrapIndent":"  "}]

/**
 * Function description.
 *
 * @param {string} lorem Description.
 * @param {int}    sit   Description multi
 *                         line with
 *                         asterisks.
 */
const fn = ( lorem, sit ) => {}
// "jsdoc/check-line-alignment": ["error"|"warn", "always",{"wrapIndent":"  "}]

/**
 * @param {
 *   string | number
 * } lorem Description
 *   with multiple lines.
 */
function quux () {
}
// "jsdoc/check-line-alignment": ["error"|"warn", "never",{"wrapIndent":"  "}]

/**
 * @param {string|string[]|TemplateResult|TemplateResult[]} event.detail.description -
 *    Notification description
 */
function quux () {}
// "jsdoc/check-line-alignment": ["error"|"warn", "never",{"wrapIndent":"   "}]

/**
 * Returns cached value of negative scale of the world transform.
 *
 * @returns {number} -1 if world transform has negative scale, 1 otherwise.
 */
// "jsdoc/check-line-alignment": ["error"|"warn", "never"]

/**
 * @param {string} lorem Description
 *   with multiple lines preserving existing indentation when wrapIndent is disabled.
 */
function quux () {
}
// "jsdoc/check-line-alignment": ["error"|"warn", "any",{"disableWrapIndent":true}]

/**
 * Function description with disableWrapIndent true, but wrapIndent defined.
 * Preserves existing indentation regardless of wrapIndent value.
 *
 * @param {string} lorem Description
 *   with multiple lines.
 */
const fn = ( lorem ) => {}
// "jsdoc/check-line-alignment": ["error"|"warn", "any",{"disableWrapIndent":true,"wrapIndent":"  "}]

/**
 * @return {Promise} A promise.
 *   - On success, resolves.
 *   - On error, rejects with details:
 *     - When aborted, textStatus is "abort".
 *     - On timeout, textStatus is "timeout".
 */
function test() {}
// "jsdoc/check-line-alignment": ["error"|"warn", "never",{"wrapIndent":"  "}]

/**
 * @param {string} lorem Description with list:
 *   - First item
 *   - Second item
 *     - Nested item
 *     - Another nested item
 */
function test() {}
// "jsdoc/check-line-alignment": ["error"|"warn", "never",{"wrapIndent":"  "}]

/**
 * @return {Promise} A promise.
 *   1. First step
 *   2. Second step with continuation
 *      on another line
 *   3. Third step
 */
function test() {}
// "jsdoc/check-line-alignment": ["error"|"warn", "never",{"wrapIndent":"  "}]

/**
 * @param {Object} options Configuration options.
 *   * First option
 *   * Second option with details:
 *     * Nested detail
 *     * Another detail
 */
function test() {}
// "jsdoc/check-line-alignment": ["error"|"warn", "never",{"wrapIndent":"  "}]
````

