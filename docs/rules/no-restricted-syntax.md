<a name="user-content-no-restricted-syntax"></a>
<a name="no-restricted-syntax"></a>
# <code>no-restricted-syntax</code>

* [Options](#user-content-no-restricted-syntax-options)
    * [`contexts`](#user-content-no-restricted-syntax-options-contexts)
* [Context and settings](#user-content-no-restricted-syntax-context-and-settings)
* [Failing examples](#user-content-no-restricted-syntax-failing-examples)
* [Passing examples](#user-content-no-restricted-syntax-passing-examples)


Reports when certain comment structures are present.

Note that this rule differs from ESLint's [no-restricted-syntax](https://eslint.org/docs/rules/no-restricted-syntax)
rule in expecting values within a single options object's
`contexts` property, and with the property `context` being used in place of
`selector` (as well as allowing for `comment`). The format also differs from
the format expected by [`eslint-plugin-query`](https://github.com/brettz9/eslint-plugin-query).

Unlike those rules, this is specific to finding comments attached to
structures, (whether or not you add a specific `comment` condition).

Note that if your parser supports comment AST (as [jsdoc-eslint-parser](https://github.com/brettz9/jsdoc-eslint-parser)
is designed to do), you can just use ESLint's rule.

<a name="user-content-no-restricted-syntax-options"></a>
<a name="no-restricted-syntax-options"></a>
## Options

<a name="user-content-no-restricted-syntax-options-contexts"></a>
<a name="no-restricted-syntax-options-contexts"></a>
### <code>contexts</code>

Set this to an array of strings representing the AST context (or an object with
`context` and `comment` properties) where you wish the rule to be applied.

Use the `message` property to indicate the specific error to be shown when an
error is reported for that context being found.

Set to `"any"` if you want the rule to apply to any jsdoc block throughout
your files (as is necessary for finding function blocks not attached to a
function declaration or expression, i.e., `@callback` or `@function` (or its
aliases `@func` or `@method`) (including those associated with an `@interface`).

See the ["AST and Selectors"](#user-content-eslint-plugin-jsdoc-advanced-ast-and-selectors)
section of our README for more on the expected format.

<a name="user-content-no-restricted-syntax-context-and-settings"></a>
<a name="no-restricted-syntax-context-and-settings"></a>
## Context and settings

|||
|---|---|
|Context|None except those indicated by `contexts`|
|Tags|Any if indicated by AST|
|Recommended|false|
|Options|`contexts`|

<a name="user-content-no-restricted-syntax-failing-examples"></a>
<a name="no-restricted-syntax-failing-examples"></a>
## Failing examples

The following patterns are considered problems:

````js
/**
 *
 */
function quux () {

}
// "jsdoc/no-restricted-syntax": ["error"|"warn", {"contexts":["FunctionDeclaration"]}]
// Message: Syntax is restricted: FunctionDeclaration

/**
 *
 */
function quux () {

}
// "jsdoc/no-restricted-syntax": ["error"|"warn", {"contexts":[{"context":"FunctionDeclaration","message":"Oops: `{{context}}`."}]}]
// Message: Oops: `FunctionDeclaration`.

/**
 * @implements {Bar|Foo}
 */
function quux () {

}
// "jsdoc/no-restricted-syntax": ["error"|"warn", {"contexts":[{"comment":"JsdocBlock[postDelimiter=\"\"]:has(JsdocTypeUnion > JsdocTypeName[value=\"Bar\"]:nth-child(1))","context":"FunctionDeclaration"}]}]
// Message: Syntax is restricted: FunctionDeclaration with JsdocBlock[postDelimiter=""]:has(JsdocTypeUnion > JsdocTypeName[value="Bar"]:nth-child(1))

/**
 * @implements {Bar|Foo}
 */
function quux () {

}
// "jsdoc/no-restricted-syntax": ["error"|"warn", {"contexts":[{"comment":"JsdocBlock[postDelimiter=\"\"]:has(JsdocTypeUnion > JsdocTypeName[value=\"Foo\"]:nth-child(1))","context":"FunctionDeclaration","message":"The foo one: {{context}}."},{"comment":"JsdocBlock[postDelimiter=\"\"]:has(JsdocTypeUnion > JsdocTypeName[value=\"Bar\"]:nth-child(1))","context":"FunctionDeclaration","message":"The bar one: {{context}}."}]}]
// Message: The bar one: FunctionDeclaration.

/**
 * @implements {Bar|Foo}
 */
function quux () {

}
// "jsdoc/no-restricted-syntax": ["error"|"warn", {"contexts":[{"comment":"JsdocBlock[postDelimiter=\"\"]:has(JsdocTypeUnion > JsdocTypeName[value=\"Bar\"]:nth-child(1))","context":"FunctionDeclaration","message":"The bar one: {{context}}."},{"comment":"JsdocBlock[postDelimiter=\"\"]:has(JsdocTypeUnion > JsdocTypeName[value=\"Foo\"]:nth-child(1))","context":"FunctionDeclaration","message":"The foo one: {{context}}."}]}]
// Message: The bar one: FunctionDeclaration.

/**
 * @implements {Bar|Foo}
 */
function quux () {

}
// Message: Rule `no-restricted-syntax` is missing a `contexts` option.

/**
 * @implements {Bar|Foo}
 */
function quux () {

}
// Settings: {"jsdoc":{"contexts":["FunctionDeclaration"]}}
// Message: Rule `no-restricted-syntax` is missing a `contexts` option.

/**
 * @param opt_a
 * @param opt_b
 */
function a () {}
// "jsdoc/no-restricted-syntax": ["error"|"warn", {"contexts":[{"comment":"JsdocBlock:has(JsdocTag[name=/opt_/])","context":"FunctionDeclaration","message":"Only allowing names not matching `/^opt_/i`."}]}]
// Message: Only allowing names not matching `/^opt_/i`.

/**
 * @param opt_a
 * @param opt_b
 */
function a () {}
// "jsdoc/no-restricted-syntax": ["error"|"warn", {"contexts":[{"comment":"JsdocBlock:has(JsdocTag[name=/opt_/])","context":"any","message":"Only allowing names not matching `/^opt_/i`."}]}]
// Message: Only allowing names not matching `/^opt_/i`.

/**
 * @param opt_a
 * @param opt_b
 */
function a () {}
// "jsdoc/no-restricted-syntax": ["error"|"warn", {"contexts":[{"comment":"JsdocBlock:has(JsdocTag[name=/opt_/])","message":"Only allowing names not matching `/^opt_/i`."}]}]
// Message: Only allowing names not matching `/^opt_/i`.

/**
 * @param opt_a
 * @param opt_b
 */
function a () {}
// "jsdoc/no-restricted-syntax": ["error"|"warn", {"contexts":[{"comment":"JsdocBlock:has(JsdocTag[name=/not-this/])","context":"any","message":"Only allowing names not matching `/^not-this/i`."},{"comment":"JsdocBlock:has(JsdocTag[name=/opt_/])","context":"any","message":"Only allowing names not matching `/^opt_/i`."}]}]
// Message: Only allowing names not matching `/^opt_/i`.

/**
 * @param opt_a
 * @param opt_b
 */
// "jsdoc/no-restricted-syntax": ["error"|"warn", {"contexts":[{"comment":"JsdocBlock:has(JsdocTag[name=/opt_/])","context":"any","message":"Only allowing names not matching `/^opt_/i`."}]}]
// Message: Only allowing names not matching `/^opt_/i`.

/**
 * @enum {String}
 * Object holding values of some custom enum
 */
const MY_ENUM = Object.freeze({
  VAL_A: "myvala"
} as const);
// "jsdoc/no-restricted-syntax": ["error"|"warn", {"contexts":[{"comment":"JsdocBlock[postDelimiter=\"\"]:has(JsdocTag ~ JsdocTag[tag=/private|protected/])","context":"any","message":"Access modifier tags must come first"},{"comment":"JsdocBlock[postDelimiter=\"\"]:has(JsdocTag[tag=\"enum\"])","context":":declaration","message":"@enum not allowed on declarations"}]}]
// Message: @enum not allowed on declarations

/** @type {React.FunctionComponent<{ children: React.ReactNode }>}*/
const MyComponent = ({ children }) => {
   return children;
}
// "jsdoc/no-restricted-syntax": ["error"|"warn", {"contexts":[{"comment":"JsdocBlock:has(JsdocTag[tag=\"type\"]:has([value=/FunctionComponent/]))","context":"any","message":"The `FunctionComponent` type is not allowed. Please use `FC` instead."}]}]
// Message: The `FunctionComponent` type is not allowed. Please use `FC` instead.

/** Some text and more */
// "jsdoc/no-restricted-syntax": ["error"|"warn", {"contexts":[{"comment":"JsdocBlock[descriptionStartLine=0][descriptionEndLine=0]","context":"any","message":"Requiring descriptive text on 0th line only"}]}]
// Message: Requiring descriptive text on 0th line only

/** Some text and
* more
*/
// "jsdoc/no-restricted-syntax": ["error"|"warn", {"contexts":[{"comment":"JsdocBlock[descriptionStartLine=0][hasPreterminalDescription=0]","context":"any","message":"Requiring descriptive text on 0th line and no preterminal description"}]}]
// Message: Requiring descriptive text on 0th line and no preterminal description

/** Some text
* @param sth Param text followed by no newline */
// "jsdoc/no-restricted-syntax": ["error"|"warn", {"contexts":[{"comment":"JsdocBlock[descriptionStartLine=0][hasPreterminalTagDescription=1]","context":"any","message":"Requiring descriptive text on 0th line but no preterminal description"}]}]
// Message: Requiring descriptive text on 0th line but no preterminal description

/**
 *
 */
// "jsdoc/no-restricted-syntax": ["error"|"warn", {"contexts":[{"comment":"JsdocBlock:not(*:has(JsdocTag[tag=see]))","context":"any","message":"@see required on each block"}]}]
// Message: @see required on each block

/**
 * @type {{a: string}}
 */
// "jsdoc/no-restricted-syntax": ["error"|"warn", {"contexts":[{"comment":"JsdocBlock:has(JsdocTag[tag=type][parsedType.type!=JsdocTypeStringValue][parsedType.type!=JsdocTypeNumber][parsedType.type!=JsdocTypeName])","context":"any","message":"@type should be limited to numeric or string literals and names"},{"comment":"JsdocBlock:has(JsdocTag[tag=type][parsedType.type=JsdocTypeName]:not(*[parsedType.value=/^(true|false|null|undefined|boolean|number|string)$/]))","context":"any","message":"@type names should only be recognized primitive types or literals"}]}]
// Message: @type should be limited to numeric or string literals and names

/**
 * @type {abc}
 */
// "jsdoc/no-restricted-syntax": ["error"|"warn", {"contexts":[{"comment":"JsdocBlock:has(JsdocTag[tag=type][parsedType.type!=JsdocTypeStringValue][parsedType.type!=JsdocTypeNumber][parsedType.type!=JsdocTypeName])","context":"any","message":"@type should be limited to numeric or string literals and names"},{"comment":"JsdocBlock:has(JsdocTag[tag=type][parsedType.type=JsdocTypeName]:not(*[parsedType.value=/^(true|false|null|undefined|boolean|number|string)$/]))","context":"any","message":"@type names should only be recognized primitive types or literals"}]}]
// Message: @type names should only be recognized primitive types or literals

/**
 *
 */
function test(): string { }
// "jsdoc/no-restricted-syntax": ["error"|"warn", {"contexts":[{"comment":"JsdocBlock:not(*:has(JsdocTag[tag=/returns/]))","context":"FunctionDeclaration[returnType.typeAnnotation.type!=/TSVoidKeyword|TSUndefinedKeyword/]","message":"Functions with non-void return types must have a @returns tag"}]}]
// Message: Functions with non-void return types must have a @returns tag

/**
 *
 */
let test = (): string => { };
// "jsdoc/no-restricted-syntax": ["error"|"warn", {"contexts":[{"comment":"JsdocBlock:not(*:has(JsdocTag[tag=/returns/]))","context":"ArrowFunctionExpression[returnType.typeAnnotation.type!=/TSVoidKeyword|TSUndefinedKeyword/]","message":"Functions with non-void return types must have a @returns tag"}]}]
// Message: Functions with non-void return types must have a @returns tag

/**
 * @returns
 */
let test: () => string;
// "jsdoc/no-restricted-syntax": ["error"|"warn", {"contexts":[{"comment":"JsdocBlock:not(*:has(JsdocTag[tag=/returns/]:has(JsdocDescriptionLine)))","context":"VariableDeclaration:has(*[typeAnnotation.typeAnnotation.type=/TSFunctionType/][typeAnnotation.typeAnnotation.returnType.typeAnnotation.type!=/TSVoidKeyword|TSUndefinedKeyword/])","message":"FunctionType's with non-void return types must have a @returns tag with a description"}]}]
// Message: FunctionType's with non-void return types must have a @returns tag with a description

/**
 *
 */
class Test {
  abstract Test(): string;
}
// "jsdoc/no-restricted-syntax": ["error"|"warn", {"contexts":[{"comment":"JsdocBlock:not(*:has(JsdocTag[tag=/returns/]))","context":"TSEmptyBodyFunctionExpression[returnType.typeAnnotation.type!=/TSVoidKeyword|TSUndefinedKeyword/]","message":"methods with non-void return types must have a @returns tag"}]}]
// Message: methods with non-void return types must have a @returns tag

/**
 * This has an inline {@link http://example.com}
 */
function quux () {

}
// "jsdoc/no-restricted-syntax": ["error"|"warn", {"contexts":[{"comment":"JsdocBlock:has(JsdocInlineTag)","context":"FunctionDeclaration"}]}]
// Message: Syntax is restricted: FunctionDeclaration with JsdocBlock:has(JsdocInlineTag)

/**
 * @see This has an inline {@link http://example.com}
 */
function quux () {

}
// "jsdoc/no-restricted-syntax": ["error"|"warn", {"contexts":[{"comment":"JsdocBlock:has(JsdocTag:has(JsdocInlineTag[format=\"plain\"]))","context":"FunctionDeclaration"}]}]
// Message: Syntax is restricted: FunctionDeclaration with JsdocBlock:has(JsdocTag:has(JsdocInlineTag[format="plain"]))
````



<a name="user-content-no-restricted-syntax-passing-examples"></a>
<a name="no-restricted-syntax-passing-examples"></a>
## Passing examples

The following patterns are not considered problems:

````js
/**
 *
 */
function quux () {

}
// "jsdoc/no-restricted-syntax": ["error"|"warn", {"contexts":["FunctionExpression"]}]

/**
 * @implements {Bar|Foo}
 */
function quux () {

}
// "jsdoc/no-restricted-syntax": ["error"|"warn", {"contexts":[{"comment":"JsdocBlock[postDelimiter=\"\"]:has(JsdocTypeUnion > JsdocTypeName[value=\"Foo\"]:nth-child(1))","context":"FunctionDeclaration"}]}]

/**
 * @param ab
 * @param cd
 */
function a () {}
// "jsdoc/no-restricted-syntax": ["error"|"warn", {"contexts":[{"comment":"JsdocBlock:has(JsdocTag[name=/opt_/])","context":"any","message":"Only allowing names not matching `/^opt_/i`."}]}]

/**
 * @param ab
 * @param cd
 */
// "jsdoc/no-restricted-syntax": ["error"|"warn", {"contexts":[{"comment":"JsdocBlock:has(JsdocTag[name=/opt_/])","context":"any","message":"Only allowing names not matching `/^opt_/i`."}]}]

/**
 * @param ab
 * @param cd
 */
// "jsdoc/no-restricted-syntax": ["error"|"warn", {"contexts":[{"comment":"JsdocBlock:has(JsdocTag[name=/opt_/])","message":"Only allowing names not matching `/^opt_/i`."}]}]

/**
 * @enum {String}
 * Object holding values of some custom enum
 */
const MY_ENUM = Object.freeze({
  VAL_A: "myvala"
} as const);
// "jsdoc/no-restricted-syntax": ["error"|"warn", {"contexts":[{"comment":"JsdocBlock[postDelimiter=\"\"]:has(JsdocTag ~ JsdocTag[tag=/private|protected/])","context":"any","message":"Access modifier tags must come first"},{"comment":"JsdocBlock[postDelimiter=\"\"]:has(JsdocTag[tag=\"enum\"])","context":":declaration:not(TSEnumDeclaration):not(:has(ObjectExpression)), :function","message":"@enum is only allowed on potential enum types"}]}]

/**
 * @param {(...args: any[]) => any} fn
 * @returns {(...args: any[]) => any}
 */
// "jsdoc/no-restricted-syntax": ["error"|"warn", {"contexts":[{"comment":"JsdocBlock:has(JsdocTag[tag=\"type\"]:has([value=/FunctionComponent/]))","context":"any","message":"The `FunctionComponent` type is not allowed. Please use `FC` instead."}]}]

/** Does something very important. */
function foo(): string;
// "jsdoc/no-restricted-syntax": ["error"|"warn", {"contexts":[{"comment":"JsdocBlock[endLine=0][description!=/^\\S[\\s\\S]*\\S\\s$/]"}]}]

/** Some text and more */
// "jsdoc/no-restricted-syntax": ["error"|"warn", {"contexts":[{"comment":"JsdocBlock[descriptionStartLine=0][descriptionEndLine=1]","context":"any","message":"Requiring descriptive text on 0th line and no final newline"}]}]

/** Some text and
* more */
// "jsdoc/no-restricted-syntax": ["error"|"warn", {"contexts":[{"comment":"JsdocBlock[descriptionStartLine=0][hasPreterminalDescription=0]","context":"any","message":"Requiring descriptive text on 0th line and no preterminal description"}]}]

/** Some text
* @param sth Param text followed by newline
*/
// "jsdoc/no-restricted-syntax": ["error"|"warn", {"contexts":[{"comment":"JsdocBlock[descriptionStartLine=0][hasPreterminalTagDescription=1]","context":"any","message":"Requiring descriptive text on 0th line but no preterminal description"}]}]

/**
 * @type {123}
 */
// "jsdoc/no-restricted-syntax": ["error"|"warn", {"contexts":[{"comment":"JsdocBlock:has(JsdocTag[tag=type][parsedType.type!=JsdocTypeStringValue][parsedType.type!=JsdocTypeNumber][parsedType.type!=JsdocTypeName])","context":"any","message":"@type should be limited to numeric or string literals and names"},{"comment":"JsdocBlock:has(JsdocTag[tag=type][parsedType.type=JsdocTypeName]:not(*[parsedType.value=/^(true|false|null|undefined|boolean|number|string)$/]))","context":"any","message":"@type names should only be recognized primitive types or literals"}]}]

/**
 * @type {boolean}
 */
// "jsdoc/no-restricted-syntax": ["error"|"warn", {"contexts":[{"comment":"JsdocBlock:has(JsdocTag[tag=type][parsedType.type!=JsdocTypeStringValue][parsedType.type!=JsdocTypeNumber][parsedType.type!=JsdocTypeName])","context":"any","message":"@type should be limited to numeric or string literals and names"},{"comment":"JsdocBlock:has(JsdocTag[tag=type][parsedType.type=JsdocTypeName]:not(*[parsedType.value=/^(true|false|null|undefined|boolean|number|string)$/]))","context":"any","message":"@type names should only be recognized primitive types or literals"}]}]

/**
 *
 */
function test(): void { }
// "jsdoc/no-restricted-syntax": ["error"|"warn", {"contexts":[{"comment":"JsdocBlock:not(*:has(JsdocTag[tag=/returns/]))","context":"FunctionDeclaration[returnType.typeAnnotation.type!=/TSVoidKeyword|TSUndefinedKeyword/]","message":"Functions with return types must have a @returns tag"}]}]

/**
 *
 */
let test = (): undefined => { };
// "jsdoc/no-restricted-syntax": ["error"|"warn", {"contexts":[{"comment":"JsdocBlock:not(*:has(JsdocTag[tag=/returns/]))","context":"ArrowFunctionExpression[returnType.typeAnnotation.type!=/TSVoidKeyword|TSUndefinedKeyword/]","message":"Functions with non-void return types must have a @returns tag"}]}]

/**
 * @returns A description
 */
let test: () => string;
// "jsdoc/no-restricted-syntax": ["error"|"warn", {"contexts":[{"comment":"JsdocBlock:not(*:has(JsdocTag[tag=/returns/]:has(JsdocDescriptionLine)))","context":"VariableDeclaration:has(*[typeAnnotation.typeAnnotation.type=/TSFunctionType/])","message":"FunctionType's with non-void return types must have a @returns tag"}]}]

/**
 *
 */
class Test {
  abstract Test(): void;
}
// "jsdoc/no-restricted-syntax": ["error"|"warn", {"contexts":[{"comment":"JsdocBlock:not(*:has(JsdocTag[tag=/returns/]))","context":"TSEmptyBodyFunctionExpression[returnType.typeAnnotation.type!=/TSVoidKeyword|TSUndefinedKeyword/]","message":"methods with non-void return types must have a @returns tag"}]}]

/**
 * @private
 */
function quux () {}
// "jsdoc/no-restricted-syntax": ["error"|"warn", {"contexts":[{"comment":"JsdocBlock:not(JsdocBlock:has(JsdocTag[tag=/private|protected|public/]))","context":"any","message":"Access modifier tags must be present"}]}]
````

