### `check-access`

{"gitdown": "contents", "rootId": "check-access"}

Checks that `@access` tags use one of the following values:

- "package", "private", "protected", "public"

Also reports:

- Mixing of `@access` with `@public`, `@private`, `@protected`, or `@package`
  on the same doc block.
- Use of multiple instances of `@access` (or the `@public`, etc. style tags)
  on the same doc block.

|||
|---|---|
|Context|everywhere|
|Tags|`@access`|
|Settings||
|Options||

<!-- assertions checkAccess -->
