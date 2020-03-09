### `require-property`

{"gitdown": "contents", "rootId": "require-property"}

Requires that all `@typedef` and `@namespace` tags have `@property`
when their type is a plain `object`, `Object`, or `PlainObject`.

Note that if any other type, including a subtype of object such as
`object<string, string>`, will not be reported.

#### Fixer

The fixer for `require-example` will add an empty `@property`.

|||
|---|---|
|Context|Everywhere|
|Tags|`typedef`, `namespace`|

<!-- assertions requireProperty -->
