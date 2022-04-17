# eslint-plugin-jsdoc

[![GitSpo Mentions](https://gitspo.com/badges/mentions/gajus/eslint-plugin-jsdoc?style=flat-square)](https://gitspo.com/mentions/gajus/eslint-plugin-jsdoc)
[![NPM version](https://img.shields.io/npm/v/eslint-plugin-jsdoc.svg?style=flat-square)](https://www.npmjs.org/package/eslint-plugin-jsdoc)
[![Travis build status](https://img.shields.io/travis/gajus/eslint-plugin-jsdoc/master.svg?style=flat-square)](https://travis-ci.org/gajus/eslint-plugin-jsdoc)
[![js-canonical-style](https://img.shields.io/badge/code%20style-canonical-blue.svg?style=flat-square)](https://github.com/gajus/canonical)
[![Discord Chat](https://img.shields.io/badge/chat-on%20disord-green.svg?logo=discord)](https://discord.gg/kFFy3nc)

JSDoc linting rules for ESLint.

{"gitdown": "contents"}

## Installation

Install [ESLint](https://www.github.com/eslint/eslint) either locally or
globally.

```sh
npm install --save-dev eslint
```

If you have installed `ESLint` globally, you have to install JSDoc plugin
globally too. Otherwise, install it locally.

```sh
npm install --save-dev eslint-plugin-jsdoc
```

## Configuration

Add `plugins` section to [.eslintrc.*](https://eslint.org/docs/user-guide/configuring#configuration-file-formats)
and specify `eslint-plugin-jsdoc` as a plugin.

```json
{
    "plugins": [
        "jsdoc"
    ]
}
```

Finally, enable all of the rules that you would like to use.

```javascript
{
    "rules": {
        "jsdoc/check-access": 1, // Recommended
        "jsdoc/check-alignment": 1, // Recommended
        "jsdoc/check-examples": 1,
        "jsdoc/check-indentation": 1,
        "jsdoc/check-line-alignment": 1,
        "jsdoc/check-param-names": 1, // Recommended
        "jsdoc/check-property-names": 1, // Recommended
        "jsdoc/check-syntax": 1,
        "jsdoc/check-tag-names": 1, // Recommended
        "jsdoc/check-types": 1, // Recommended
        "jsdoc/check-values": 1, // Recommended
        "jsdoc/empty-tags": 1, // Recommended
        "jsdoc/implements-on-classes": 1, // Recommended
        "jsdoc/match-description": 1,
        "jsdoc/multiline-blocks": 1, // Recommended
        "jsdoc/newline-after-description": 1, // Recommended
        "jsdoc/no-bad-blocks": 1,
        "jsdoc/no-defaults": 1,
        "jsdoc/no-missing-syntax": 1,
        "jsdoc/no-multi-asterisks": 1, // Recommended
        "jsdoc/no-restricted-syntax": 1,
        "jsdoc/no-types": 1,
        "jsdoc/no-undefined-types": 1, // Recommended
        "jsdoc/require-asterisk-prefix": 1,
        "jsdoc/require-description": 1,
        "jsdoc/require-description-complete-sentence": 1,
        "jsdoc/require-example": 1,
        "jsdoc/require-file-overview": 1,
        "jsdoc/require-hyphen-before-param-description": 1,
        "jsdoc/require-jsdoc": 1, // Recommended
        "jsdoc/require-param": 1, // Recommended
        "jsdoc/require-param-description": 1, // Recommended
        "jsdoc/require-param-name": 1, // Recommended
        "jsdoc/require-param-type": 1, // Recommended
        "jsdoc/require-property": 1, // Recommended
        "jsdoc/require-property-description": 1, // Recommended
        "jsdoc/require-property-name": 1, // Recommended
        "jsdoc/require-property-type": 1, // Recommended
        "jsdoc/require-returns": 1, // Recommended
        "jsdoc/require-returns-check": 1, // Recommended
        "jsdoc/require-returns-description": 1, // Recommended
        "jsdoc/require-returns-type": 1, // Recommended
        "jsdoc/require-throws": 1,
        "jsdoc/require-yields": 1, // Recommended
        "jsdoc/require-yields-check": 1, // Recommended
        "jsdoc/tag-lines": 1, // Recommended
        "jsdoc/valid-types": 1 // Recommended
    }
}
```

Or you can simply add the following to [.eslintrc.*](https://eslint.org/docs/user-guide/configuring#configuration-file-formats),
which enables the rules commented above as "recommended":


```json
{
  "extends": ["plugin:jsdoc/recommended"]
}
```

You can then selectively add to or override the recommended rules.

## Options

Rules may, as per the [ESLint user guide](https://eslint.org/docs/user-guide/configuring), have their own individual options. In `eslint-plugin-jsdoc`, a few options,
such as, `exemptedBy` and `contexts`, may be used across different rules.

`eslint-plugin-jsdoc` options, if present, are generally in the form of an
object supplied as the second argument in an array after the error level
(any exceptions to this format are explained within that rule's docs).

```js
// `.eslintrc.js`
{
  rules: {
    'jsdoc/require-example': [
        // The Error level should be `error`, `warn`, or `off` (or 2, 1, or 0)
        'error',
        // The options vary by rule, but are generally added to an options
        //  object as follows:
        {
          checkConstructors: true,
          exemptedBy: ['type']
        }
    ]
  }
}
```

## Settings

### Allow tags (`@private` or `@internal`) to disable rules for that comment block

- `settings.jsdoc.ignorePrivate` - Disables all rules for the comment block
  on which a `@private` tag (or `@access private`) occurs. Defaults to
  `false`. Note: This has no effect with the rule `check-access` (whose
  purpose is to check access modifiers) or `empty-tags` (which checks
  `@private` itself).
- `settings.jsdoc.ignoreInternal` - Disables all rules for the comment block
  on which a `@internal` tag occurs. Defaults to `false`. Note: This has no
  effect with the rule `empty-tags` (which checks `@internal` itself).

### `maxLines` and `minLines`

One can use `minLines` and `maxLines` to indicate how many line breaks
(if any) will be checked to find a jsdoc comment block before the given
code block. These settings default to `0` and `1` respectively.

In conjunction with the `require-jsdoc` rule, these settings can
be enforced so as to report problems if a jsdoc block is not found within
the specified boundaries. The settings are also used in the fixer to determine
how many line breaks to add when a block is missing.

### Mode

- `settings.jsdoc.mode` - Set to `typescript`, `closure`, or `jsdoc` (the
  default unless the `@typescript-eslint` parser is in use in which case
  `typescript` will be the default).
  Note that if you do not wish to use separate `.eslintrc.*` files for a
  project containing both JavaScript and TypeScript, you can also use
  [`overrides`](https://eslint.org/docs/user-guide/configuring). You may also
  set to `"permissive"` to try to be as accommodating to any of the styles,
  but this is not recommended. Currently is used for the following:
  - `check-tag-names`: Determine valid tags and aliases
  - `no-undefined-types`: Only check `@template` for types in "closure" and
    "typescript" modes
  - `check-syntax`: determines aspects that may be enforced
  - `valid-types`: in non-Closure mode, `@extends`, `@package` and access tags
     (e.g., `@private`) with a bracketed type are reported as are missing
     names with `@typedef`
  - For type/namepath-checking rules, determine which tags will be checked for
    types/namepaths (Closure allows types on some tags which the others do not,
    so these tags will additionally be checked in "closure" mode)
  - For type-checking rules, impacts parsing of types (through
    [jsdoc-type-pratt-parser](https://github.com/simonseyock/jsdoc-type-pratt-parser)
    dependency)
  - Check preferred tag names
  - Disallows namepath on `@interface` for "closure" mode in `valid-types` (and
      avoids checking in other rules)

### Alias Preference

Use `settings.jsdoc.tagNamePreference` to configure a preferred alias name for
a JSDoc tag. The format of the configuration is:
`<primary tag name>: <preferred alias name>`, e.g.

```json
{
    "rules": {},
    "settings": {
        "jsdoc": {
            "tagNamePreference": {
                "param": "arg",
                "returns": "return"
            }
        }
    }
}
```

Note: ESLint does not allow settings to have keys which conflict with
`Object.prototype` e.g. `'constructor'`. To work around this, you can use the
key `'tag constructor'`.

One may also use an object with a `message` and `replacement`.

The following will report the message
`@extends is to be used over @augments as it is more evocative of classes than @augments`
upon encountering `@augments`.

```json
{
    "rules": {},
    "settings": {
        "jsdoc": {
            "tagNamePreference": {
                "augments": {
                  "message": "@extends is to be used over @augments as it is more evocative of classes than @augments",
                  "replacement": "extends"
                }
            }
        }
    }
}
```

If one wishes to reject a normally valid tag, e.g., `@todo`, one may set the
tag to `false`:

```json
{
    "rules": {},
    "settings": {
        "jsdoc": {
            "tagNamePreference": {
                "todo": false
            }
        }
    }
}
```

A project wishing to ensure no blocks are left excluded from entering the
documentation, might wish to prevent the `@ignore` tag in the above manner.

Or one may set the targeted tag to an object with a custom `message`, but
without a `replacement` property:

```json
{
    "rules": {},
    "settings": {
        "jsdoc": {
            "tagNamePreference": {
                "todo": {
                  "message": "We expect immediate perfection, so don't leave to-dos in your code."
                }
            }
        }
    }
}
```

Note that the preferred tags indicated in the
`settings.jsdoc.tagNamePreference` map will be assumed to be defined by
`check-tag-names`.

See `check-tag-names` for how that fact can be used to set an alias to itself
to allow both the alias and the default (since aliases are otherwise not
permitted unless used in `tagNamePreference`).

#### Default Preferred Aliases

The defaults in `eslint-plugin-jsdoc` (for tags which offer
aliases) are as follows:

- `@abstract` (over `@virtual`)
- `@augments` (over `@extends`)
- `@class` (over `@constructor`)
- `@constant` (over `@const`)
- `@default` (over `@defaultvalue`)
- `@description` (over `@desc`)
- `@external` (over `@host`)
- `@file` (over `@fileoverview`, `@overview`)
- `@fires` (over `@emits`)
- `@function` (over `@func`, `@method`)
- `@member` (over `@var`)
- `@param` (over `@arg`, `@argument`)
- `@property` (over `@prop`)
- `@returns` (over `@return`)
- `@throws` (over `@exception`)
- `@yields` (over `@yield`)

This setting is utilized by the the rule for tag name checking
(`check-tag-names`) as well as in the `@param` and `@require` rules:

- `check-param-names`
- `check-tag-names`
- `require-hyphen-before-param-description`
- `require-description`
- `require-param`
- `require-param-description`
- `require-param-name`
- `require-param-type`
- `require-returns`
- `require-returns-check`
- `require-returns-description`
- `require-returns-type`

### `@override`/`@augments`/`@extends`/`@implements`/`@ignore` Without Accompanying `@param`/`@description`/`@example`/`@returns`/`@throws`/`@yields`

The following settings allows the element(s) they reference to be omitted
on the JSDoc comment block of the function or that of its parent class
for any of the "require" rules (i.e., `require-param`, `require-description`,
`require-example`, `require-returns`, `require-throws`, `require-yields`).

* `settings.jsdoc.ignoreReplacesDocs` (`@ignore`) - Defaults to `true`
* `settings.jsdoc.overrideReplacesDocs` (`@override`) - Defaults to `true`
* `settings.jsdoc.augmentsExtendsReplacesDocs` (`@augments` or its alias
    `@extends`) - Defaults to `false`.
* `settings.jsdoc.implementsReplacesDocs` (`@implements`) - Defaults to `false`

The format of the configuration is as follows:

```json
{
    "rules": {},
    "settings": {
        "jsdoc": {
            "ignoreReplacesDocs": true,
            "overrideReplacesDocs": true,
            "augmentsExtendsReplacesDocs": true,
            "implementsReplacesDocs": true
        }
    }
}
```

### Settings to Configure `check-types` and `no-undefined-types`

- `settings.jsdoc.preferredTypes` An option map to indicate preferred
  or forbidden types (if default types are indicated here, these will
  have precedence over the default recommendations for `check-types`).
  The keys of this map are the types to be replaced (or forbidden).
  These keys may include:
  1. The "ANY" type, `*`
  1. The pseudo-type `[]` which we use to denote the parent (array)
    types used in the syntax `string[]`, `number[]`, etc.
  1. The pseudo-type `.<>` (or `.`) to represent the format `Array.<value>`
    or `Object.<key, value>`
  1. The pseudo-type `<>` to represent the format `Array<value>` or
    `Object<key, value>`
  1. A plain string type, e.g., `MyType`
  1. A plain string type followed by one of the above pseudo-types (except
    for `[]` which is always assumed to be an `Array`), e.g., `Array.`, or
    `SpecialObject<>`.

  If a bare pseudo-type is used, it will match all parent types of that form.
  If a pseudo-type prefixed with a type name is used, it will only match
  parent types of that form and type name.

  The values can be:
  - `false` to forbid the type
  - a string to indicate the type that should be preferred in its place
    (and which `fix` mode can replace); this can be one of the formats
    of the keys described above.
    - Note that the format will not be changed unless you use a pseudo-type
      in the replacement. (For example, `'Array.<>': 'MyArray'` will change
      `Array.<string>` to `MyArray.<string>`, preserving the dot. To get rid
      of the dot, you must use the pseudo-type with `<>`, i.e.,
      `'Array.<>': 'MyArray<>'`, which will change `Array.<string>` to
      `MyArray<string>`).
    - If you use a _bare_ pseudo-type in the replacement (e.g.,
      `'MyArray.<>': '<>'`), the type will be converted to the format
      of the pseudo-type without changing the type name. For example,
      `MyArray.<string>` will become `MyArray<string>` but `Array.<string>`
      will not be modified.
  - an object with:
    - the key `message` to provide a specific error message
      when encountering the discouraged type.
      - The message string will have the substrings with special meaning,
        `{{tagName}}` and `{{tagValue}}`, replaced with their
        corresponding value.
    - an optional key `replacement` with either of the following values:
      - a string type to be preferred in its place (and which `fix` mode
        can replace)
      - `false` (for forbidding the type)

Note that the preferred types indicated as targets in
`settings.jsdoc.preferredTypes` map will be assumed to be defined by
`no-undefined-types`.

See the option of `check-types`, `unifyParentAndChildTypeChecks`, for
how the keys of `preferredTypes` may have `<>` or `.<>` (or just `.`)
appended and its bearing on whether types are checked as parents/children
only (e.g., to match `Array` if the type is `Array` vs. `Array.<string>`).

Note that if a value is present both as a key and as a value, neither the
key nor the value will be reported. Thus in `check-types`, this fact can
be used to allow both `object` and `Object` if one has a `preferredTypes`
key `object: 'Object'` and `Object: 'object'`.

### `structuredTags`

An object indicating tags whose types and names/namepaths (whether defining or
referencing namepaths) will be checked, subject to configuration. If the tags
have predefined behavior or `allowEmptyNamepaths` behavior, this option will
override that behavior for any specified tags, though this option can also be
used for tags without predefined behavior. Its keys are tag names and its
values are objects with the following optional properties:
  - `name` - String set to one of the following:
    - `"text"` - When a name is present, plain text will be allowed in the
      name position (non-whitespace immediately after the tag and whitespace),
      e.g., in `@throws This is an error`, "This" would normally be the name,
      but "text" allows non-name text here also. This is the default.
    - `"namepath-defining"` - As with `namepath-referencing`, but also
      indicates the tag adds a namepath to definitions, e.g., to prevent
      `no-undefined-types` from reporting references to that namepath.
    - `"namepath-referencing"` - This will cause any name position to be
      checked to ensure it is a valid namepath. You might use this to ensure
      that tags which normally allow free text, e.g., `@see` will instead
      require a namepath.
    - `false` - This will disallow any text in the name position.
  - `type`:
      - `true` - Allows valid types within brackets. This is the default.
      - `false` - Explicitly disallows any brackets or bracketed type. You
        might use this with `@throws` to suggest that only free form text
        is being input or with `@augments` (for jsdoc mode) to disallow
        Closure-style bracketed usage along with a required namepath.
      - (An array of strings) - A list of permissible types.
  - `required` - Array of one of the following (defaults to an empty array,
      meaning none are required):
    - One or both of the following strings (if both are included, then both
      are required):
      - `"name"` - Indicates that a name position is required (not just that
        if present, it is a valid namepath). You might use this with `see`
        to insist that a value (or namepath, depending on the `name` value)
        is always present.
      - `"type"` - Indicates that the type position (within curly brackets)
        is required (not just that if present, it is a valid type). You
        might use this with `@throws` or `@typedef` which might otherwise
        normally have their types optional. See the type groups 3-5 above.
    - `"typeOrName"` - Must have either type (e.g., `@throws {aType}`) or
        name (`@throws Some text`); does not require that both exist but
        disallows just an empty tag.

## Advanced

### AST and Selectors

For various rules, one can add to the environments to which the rule applies
by using the `contexts` option.

This option works with [ESLint's selectors](https://eslint.org/docs/developer-guide/selectors) which are [esquery](https://github.com/estools/esquery/#readme)
expressions one may use to target a specific node type or types, including
subsets of the type(s) such as nodes with certain children or attributes.

These expressions are used within ESLint plugins to find those parts of
your files' code which are of interest to check. However, in
`eslint-plugin-jsdoc`, we also allow you to use these selectors to define
additional contexts where you wish our own rules to be applied.

#### `contexts` format

While at their simplest, these can be an array of string selectors, one can
also supply an object with `context` (in place of the string) and one of two
properties:

1. For `require-jsdoc`, there are also `inlineCommentBlock` and
    `minLineCount` properties. See that rule for details.
1. For `no-missing-syntax` and `no-restricted-syntax`, there is also a
    `message` property which allows customization of the message to be shown
    when the rule is triggered.
1. For `no-missing-syntax`, there is also a `minimum` property. See that rule.
1. For other rules, there is a `comment` property which adds to the `context`
    in requiring that the `comment` AST condition is also met, e.g., to
    require that certain tags are present and/or or types and type operators
    are in use. Note that this AST (either for `Jsdoc*` or `JsdocType*` AST)
    has not been standardized and should be considered experimental.
    Note that this property might also become obsolete if parsers begin to
    include JSDoc-structured AST. A
    [parser](https://github.com/brettz9/jsdoc-eslint-parser/) is available
    which aims to support comment AST as
    a first class citizen where comment/comment types can be used anywhere
    within a normal AST selector but this should only be considered
    experimental. When using such a parser, you need not use `comment` and
    can just use a plain string context. The determination of the node on
    which the comment is attached is based more on actual location than
    semantics (e.g., it will be attached to a `VariableDeclaration` if above
    that rather than to the `FunctionExpression` it is fundamentally
    describing). See
    [@es-joy/jsdoccomment](https://github.com/es-joy/jsdoccomment)
    for the precise structure of the comment (and comment type) nodes.

#### Discovering available AST definitions

To know all of the AST definitions one may target, it will depend on the
[parser](https://eslint.org/docs/user-guide/configuring#specifying-parser)
you are using with ESLint (e.g., `espree` is the default parser for ESLint,
and this follows [EStree AST](https://github.com/estree/estree) but
to support the the latest experimental features of JavaScript, one may use
`@babel/eslint-parser` or to be able to have one's rules (including JSDoc rules)
apply to TypeScript, one may use `@typescript-eslint/parser`, etc.

So you can look up a particular parser to see its rules, e.g., browse through
the [ESTree docs](https://github.com/estree/estree) as used by Espree or see
ESLint's [overview of the structure of AST](https://eslint.org/docs/developer-guide/working-with-custom-parsers#the-ast-specification).

However, it can sometimes be even more helpful to get an idea of AST by just
providing some of your JavaScript to the wonderful
[AST Explorer](https://astexplorer.net/) tool and see what AST is built out
of your code. You can set the tool to the specific parser which you are using.

#### Uses/Tips for AST

And if you wish to introspect on the AST of code within your projects, you can
use [eslint-plugin-query](https://github.com/brettz9/eslint-plugin-query).
Though it also works as a plugin, you can use it with its own CLI, e.g.,
to search your files for matching esquery selectors, optionally showing
it as AST JSON.

Tip: If you want to more deeply understand not just the resulting AST tree
structures for any given code but also the syntax for esquery selectors so
that you can, for example, find only those nodes with a child of a certain
type, you can set the "Transform" feature to ESLint and test out
esquery selectors in place of the selector expression (e.g., replace
`'VariableDeclaration > VariableDeclarator > Identifier[name="someVar"]'` as
we have
[here](https://astexplorer.net/#/gist/71a93130c19599d6f197bddb29c13a59/latest))
to the selector you wish so as to get messages reported in the bottom right
pane which match your [esquery](https://github.com/estools/esquery/#readme)
selector).

## Rules

{"gitdown": "include", "file": "./rules/check-access.md"}
{"gitdown": "include", "file": "./rules/check-alignment.md"}
{"gitdown": "include", "file": "./rules/check-examples.md"}
{"gitdown": "include", "file": "./rules/check-indentation.md"}
{"gitdown": "include", "file": "./rules/check-line-alignment.md"}
{"gitdown": "include", "file": "./rules/check-param-names.md"}
{"gitdown": "include", "file": "./rules/check-property-names.md"}
{"gitdown": "include", "file": "./rules/check-syntax.md"}
{"gitdown": "include", "file": "./rules/check-tag-names.md"}
{"gitdown": "include", "file": "./rules/check-types.md"}
{"gitdown": "include", "file": "./rules/check-values.md"}
{"gitdown": "include", "file": "./rules/empty-tags.md"}
{"gitdown": "include", "file": "./rules/implements-on-classes.md"}
{"gitdown": "include", "file": "./rules/match-description.md"}
{"gitdown": "include", "file": "./rules/match-name.md"}
{"gitdown": "include", "file": "./rules/multiline-blocks.md"}
{"gitdown": "include", "file": "./rules/newline-after-description.md"}
{"gitdown": "include", "file": "./rules/no-bad-blocks.md"}
{"gitdown": "include", "file": "./rules/no-defaults.md"}
{"gitdown": "include", "file": "./rules/no-missing-syntax.md"}
{"gitdown": "include", "file": "./rules/no-multi-asterisks.md"}
{"gitdown": "include", "file": "./rules/no-restricted-syntax.md"}
{"gitdown": "include", "file": "./rules/no-types.md"}
{"gitdown": "include", "file": "./rules/no-undefined-types.md"}
{"gitdown": "include", "file": "./rules/require-asterisk-prefix.md"}
{"gitdown": "include", "file": "./rules/require-description-complete-sentence.md"}
{"gitdown": "include", "file": "./rules/require-description.md"}
{"gitdown": "include", "file": "./rules/require-example.md"}
{"gitdown": "include", "file": "./rules/require-file-overview.md"}
{"gitdown": "include", "file": "./rules/require-hyphen-before-param-description.md"}
{"gitdown": "include", "file": "./rules/require-jsdoc.md"}
{"gitdown": "include", "file": "./rules/require-param-description.md"}
{"gitdown": "include", "file": "./rules/require-param-name.md"}
{"gitdown": "include", "file": "./rules/require-param-type.md"}
{"gitdown": "include", "file": "./rules/require-param.md"}
{"gitdown": "include", "file": "./rules/require-property.md"}
{"gitdown": "include", "file": "./rules/require-property-description.md"}
{"gitdown": "include", "file": "./rules/require-property-name.md"}
{"gitdown": "include", "file": "./rules/require-property-type.md"}
{"gitdown": "include", "file": "./rules/require-returns-check.md"}
{"gitdown": "include", "file": "./rules/require-returns-description.md"}
{"gitdown": "include", "file": "./rules/require-returns-type.md"}
{"gitdown": "include", "file": "./rules/require-returns.md"}
{"gitdown": "include", "file": "./rules/require-throws.md"}
{"gitdown": "include", "file": "./rules/require-yields.md"}
{"gitdown": "include", "file": "./rules/require-yields-check.md"}
{"gitdown": "include", "file": "./rules/sort-tags.md"}
{"gitdown": "include", "file": "./rules/tag-lines.md"}
{"gitdown": "include", "file": "./rules/valid-types.md"}
