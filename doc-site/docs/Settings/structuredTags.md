---
sidebar_position: 6
---

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
