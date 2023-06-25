<a name="user-content-match-name"></a>
<a name="match-name"></a>
### <code>match-name</code>



Reports the name portion of a JSDoc tag if matching or not matching
a given regular expression.

Note that some tags do not possess names and anything appearing to be a
name will actually be part of the description (e.g., for
`@returns {type} notAName`). If you are defining your own tags, see the
`structuredTags` setting (if `name: false`, this rule will not apply to
that tag).

<a name="user-content-fixer"></a>
<a name="fixer"></a>
## Fixer

Will replace `disallowName` with `replacement` if these are provided.

<a name="user-content-options"></a>
<a name="options"></a>
## Options

A single options object with the following properties:

<a name="user-content-options-match"></a>
<a name="options-match"></a>
### <code>match</code>

`match` is a required option containing an array of objects which determine
the conditions whereby a name is reported as being problematic.

These objects can have any combination of the following groups of optional
properties, all of which act to confine one another:

- `tags` - This array should include tag names or `*` to indicate the
  match will apply for all tags (except as confined by any context
  properties). If `*` is not used, then these rules will only apply to
  the specified tags. If `tags` is omitted, then `*` is assumed.

- `allowName` - Indicates which names are allowed for the given tag (or `*`).
    Accepts a string regular expression (optionally wrapped between two
    `/` delimiters followed by optional flags) used to match the name.
- `disallowName` - As with `allowName` but indicates names that are not
    allowed.
- `replacement` - If `disallowName` is supplied and this value is present, it
    will replace the matched `disallowName` text.

- `context` - AST to confine the allowing or disallowing to jsdoc blocks
    associated with a particular context. See the
    ["AST and Selectors"](#user-content-eslint-plugin-jsdoc-advanced-ast-and-selectors)
    section of our README for more on the expected format.
- `comment` - As with `context` but AST for the JSDoc block comment and types

- `message` - An optional custom message to use when there is a match.

Note that `comment`, even if targeting a specific tag, is used to match the
whole block. So if a `comment` finds its specific tag, it may still apply
fixes found by the likes of `disallowName` even when a different tag has the
disallowed name. An alternative is to ensure that `comment` finds the specific
tag of the desired tag and/or name and no `disallowName` (or `allowName`) is
supplied. In such a case, only one error will be reported, but no fixer will
be applied, however.

<a name="user-content-context-and-settings"></a>
<a name="context-and-settings"></a>
## Context and settings

|||
|---|---|
|Context|everywhere|
|Tags|(The tags specified by `tags`, including any tag if `*` is set)|
|Recommended|false|
|Settings|`structuredTags`|
|Options|`match`|

<a name="user-content-failing-examples"></a>
<a name="failing-examples"></a>
## Failing examples

The following patterns are considered problems:

````js
/**
 * @param opt_a
 * @param opt_b
 */
// "jsdoc/match-name": ["error"|"warn", {"match":[{"disallowName":"/^opt_/i"}]}]
// Message: Only allowing names not matching `/^opt_/i` but found "opt_a".

/**
 * @param opt_a
 * @param opt_b
 */
// "jsdoc/match-name": ["error"|"warn", {"match":[{"disallowName":"/^opt_/i","replacement":""}]}]
// Message: Only allowing names not matching `/^opt_/i` but found "opt_a".

/**
 * @param a
 * @param opt_b
 */
// "jsdoc/match-name": ["error"|"warn", {"match":[{"allowName":"/^[a-z]+$/i"}]}]
// Message: Only allowing names matching `/^[a-z]+$/i` but found "opt_b".

/**
 * @param arg
 * @param opt_b
 */
// "jsdoc/match-name": ["error"|"warn", {"match":[{"allowName":"/^[a-z]+$/i","disallowName":"/^arg/i"}]}]
// Message: Only allowing names not matching `/^arg/i` but found "arg".

/**
 * @param opt_a
 * @param arg
 */
// "jsdoc/match-name": ["error"|"warn", {"match":[{"disallowName":"/^arg$/i"},{"disallowName":"/^opt_/i"}]}]
// Message: Only allowing names not matching `/^opt_/i` but found "opt_a".

/**
 * @property opt_a
 * @param opt_b
 */
// "jsdoc/match-name": ["error"|"warn", {"match":[{"disallowName":"/^opt_/i","tags":["param"]}]}]
// Message: Only allowing names not matching `/^opt_/i` but found "opt_b".

/**
 * @someTag opt_a
 * @param opt_b
 */
// Settings: {"jsdoc":{"structuredTags":{"someTag":{"name":"namepath-defining"}}}}
// "jsdoc/match-name": ["error"|"warn", {"match":[{"disallowName":"/^opt_/i","tags":["param"]}]}]
// Message: Only allowing names not matching `/^opt_/i` but found "opt_b".

/**
 * @property opt_a
 * @param opt_b
 */
// "jsdoc/match-name": ["error"|"warn", {"match":[{"disallowName":"/^opt_/i","tags":["*"]}]}]
// Message: Only allowing names not matching `/^opt_/i` but found "opt_a".

/**
 * @param opt_a
 * @param opt_b
 */
function quux () {
}
// "jsdoc/match-name": ["error"|"warn", {"match":[{"context":"FunctionDeclaration","disallowName":"/^opt_/i"}]}]
// Message: Only allowing names not matching `/^opt_/i` but found "opt_a".

/**
 * @property opt_a
 * @param {Bar|Foo} opt_b
 */
// "jsdoc/match-name": ["error"|"warn", {"match":[{"comment":"JsdocBlock:has(JsdocTag[tag=\"param\"][name=/opt_/] > JsdocTypeUnion:has(JsdocTypeName[value=\"Bar\"]:nth-child(1)))"}]}]
// Message: Prohibited context for "opt_a".

/**
 * @property opt_a
 * @param {Bar|Foo} opt_b
 */
// "jsdoc/match-name": ["error"|"warn", {"match":[{"comment":"JsdocBlock:has(JsdocTag[tag=\"param\"][name=/opt_/] > JsdocTypeUnion:has(JsdocTypeName[value=\"Bar\"]:nth-child(1)))","message":"Don't use `opt_` prefixes with Bar|..."}]}]
// Message: Don't use `opt_` prefixes with Bar|...

/**
 * @param opt_a
 * @param opt_b
 */
function quux () {}
// "jsdoc/match-name": ["error"|"warn", ]
// Message: Rule `no-restricted-syntax` is missing a `match` option.

/**
 * @param {
 *   someType
 * } opt_a
 */
// "jsdoc/match-name": ["error"|"warn", {"match":[{"disallowName":"/^opt_/i","replacement":""}]}]
// Message: Only allowing names not matching `/^opt_/i` but found "opt_a".

/**
 * @template
 */
// "jsdoc/match-name": ["error"|"warn", {"match":[{"disallowName":"/^$/","tags":["template"]}]}]
// Message: Only allowing names not matching `/^$/u` but found "".
````



<a name="user-content-passing-examples"></a>
<a name="passing-examples"></a>
## Passing examples

The following patterns are not considered problems:

````js
/**
 * @param opt_a
 * @param opt_b
 */
// "jsdoc/match-name": ["error"|"warn", {"match":[{"disallowName":"/^arg/i"}]}]

/**
 * @param a
 * @param opt_b
 */
// "jsdoc/match-name": ["error"|"warn", {"match":[{"allowName":"/^[a-z_]+$/i"}]}]

/**
 * @param someArg
 * @param anotherArg
 */
// "jsdoc/match-name": ["error"|"warn", {"match":[{"allowName":"/^[a-z]+$/i","disallowName":"/^arg/i"}]}]

/**
 * @param elem1
 * @param elem2
 */
// "jsdoc/match-name": ["error"|"warn", {"match":[{"disallowName":"/^arg$/i"},{"disallowName":"/^opt_/i"}]}]

/**
 * @someTag opt_a
 * @param opt_b
 */
// Settings: {"jsdoc":{"structuredTags":{"someTag":{"name":"namepath-defining"}}}}
// "jsdoc/match-name": ["error"|"warn", {"match":[{"disallowName":"/^opt_/i","tags":["property"]}]}]

/**
 * @property opt_a
 * @param opt_b
 */
// "jsdoc/match-name": ["error"|"warn", {"match":[{"disallowName":"/^arg/i","tags":["*"]}]}]

/**
 * @param opt_a
 * @param opt_b
 */
class A {
}
// "jsdoc/match-name": ["error"|"warn", {"match":[{"context":"FunctionDeclaration","disallowName":"/^opt_/i"}]}]

/**
 * @property opt_a
 * @param {Foo|Bar} opt_b
 */
// "jsdoc/match-name": ["error"|"warn", {"match":[{"comment":"JsdocBlock:has(JsdocTag[tag=\"param\"]:has(JsdocTypeUnion:has(JsdocTypeName[value=\"Bar\"]:nth-child(1))))","disallowName":"/^opt_/i"}]}]
````

