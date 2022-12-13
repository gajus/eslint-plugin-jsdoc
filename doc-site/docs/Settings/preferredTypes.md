---
sidebar_position: 5
---

### `preferredTypes` setting to Configure `check-types` and `no-undefined-types`

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
