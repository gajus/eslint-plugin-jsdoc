### `check-property-names`

Ensures that property names in JSDoc are not duplicated on the same block
and that nested properties have defined roots.

#### Options

##### `enableFixer`

Set to `false` to avoid auto-removing `@property`'s duplicates (based on
identical names).

Note that, by default, duplicates of the same name are removed even if
the definitions do not match in other ways (e.g., the second property will
be removed even if it has a different type or description).

|||
|---|---|
|Context|Everywhere|
|Options|`enableFixer`|
|Tags|`property`|

<!-- assertions checkPropertyNames -->
