<a name="user-content-settings"></a>
<a name="settings"></a>
## Settings

* [Allow tags (`@private` or `@internal`) to disable rules for that comment block](#user-content-settings-allow-tags-private-or-internal-to-disable-rules-for-that-comment-block)
* [`maxLines` and `minLines`](#user-content-settings-maxlines-and-minlines)
* [Mode](#user-content-settings-mode)
* [Alias Preference](#user-content-settings-alias-preference)
    * [Default Preferred Aliases](#user-content-settings-alias-preference-default-preferred-aliases)
* [`@override`/`@augments`/`@extends`/`@implements`/`@ignore` Without Accompanying `@param`/`@description`/`@example`/`@returns`/`@throws`/`@yields`](#user-content-settings-override-augments-extends-implements-ignore-without-accompanying-param-description-example-returns-throws-yields)
* [Settings to Configure `check-types` and `no-undefined-types`](#user-content-settings-settings-to-configure-check-types-and-no-undefined-types)
* [`structuredTags`](#user-content-settings-structuredtags)
* [`contexts`](#user-content-settings-contexts)


<a name="user-content-settings-allow-tags-private-or-internal-to-disable-rules-for-that-comment-block"></a>
<a name="settings-allow-tags-private-or-internal-to-disable-rules-for-that-comment-block"></a>
### Allow tags (<code>@private</code> or <code>@internal</code>) to disable rules for that comment block

- `settings.jsdoc.ignorePrivate` - Disables all rules for the comment block
  on which a `@private` tag (or `@access private`) occurs. Defaults to
  `false`. Note: This has no effect with the rule `check-access` (whose
  purpose is to check access modifiers) or `empty-tags` (which checks
  `@private` itself).
- `settings.jsdoc.ignoreInternal` - Disables all rules for the comment block
  on which a `@internal` tag occurs. Defaults to `false`. Note: This has no
  effect with the rule `empty-tags` (which checks `@internal` itself).

<a name="user-content-settings-maxlines-and-minlines"></a>
<a name="settings-maxlines-and-minlines"></a>
### <code>maxLines</code> and <code>minLines</code>

One can use `minLines` and `maxLines` to indicate how many line breaks
(if any) will be checked to find a jsdoc comment block before the given
code block. These settings default to `0` and `1` respectively.

In conjunction with the `require-jsdoc` rule, these settings can
be enforced so as to report problems if a jsdoc block is not found within
the specified boundaries. The settings are also used in the fixer to determine
how many line breaks to add when a block is missing.

<a name="user-content-settings-mode"></a>
<a name="settings-mode"></a>
### Mode

- `settings.jsdoc.mode` - Set to `typescript`, `closure`, or `jsdoc` (the
  default is now `typescript`).
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

Note that if you are using TypeScript syntax (and not just the TypeScript
flavor of JSDoc which `mode` set to "typescript" implies), you may wish
to use the `recommended-typescript` or `recommended-typescript-error`
config. This will add rules such as `jsdoc/no-types` to expect you have
no types expressed in JSDoc (since these can be added in TypeScript).

<a name="user-content-settings-alias-preference"></a>
<a name="settings-alias-preference"></a>
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

<a name="user-content-settings-alias-preference-default-preferred-aliases"></a>
<a name="settings-alias-preference-default-preferred-aliases"></a>
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

<a name="user-content-settings-override-augments-extends-implements-ignore-without-accompanying-param-description-example-returns-throws-yields"></a>
<a name="settings-override-augments-extends-implements-ignore-without-accompanying-param-description-example-returns-throws-yields"></a>
### <code>@override</code>/<code>@augments</code>/<code>@extends</code>/<code>@implements</code>/<code>@ignore</code> Without Accompanying <code>@param</code>/<code>@description</code>/<code>@example</code>/<code>@returns</code>/<code>@throws</code>/<code>@yields</code>

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

<a name="user-content-settings-settings-to-configure-check-types-and-no-undefined-types"></a>
<a name="settings-settings-to-configure-check-types-and-no-undefined-types"></a>
### Settings to Configure <code>check-types</code> and <code>no-undefined-types</code>

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
    - an optional key `skipRootChecking` (for `check-types`) to allow for this
      type in the context of a root (i.e., a parent object of some child type)

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

<a name="user-content-settings-structuredtags"></a>
<a name="settings-structuredtags"></a>
### <code>structuredTags</code>

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
    - `"namepath-or-url-referencing"` - For inline tags which may point to
      a namepath or URL.
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
    - `"typeOrNameRequired"` - Must have either type (e.g., `@throws {aType}`) or
        name (`@throws Some text`); does not require that both exist but
        disallows just an empty tag.

<a name="user-content-settings-contexts"></a>
<a name="settings-contexts"></a>
### <code>contexts</code>

`settings.jsdoc.contexts` can be used as the default for any rules
with a `contexts` property option. See the "AST and Selectors" section
for more on this format.
