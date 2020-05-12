### `check-property-names`

Ensures that property names in JSDoc are not duplicated on the same block
and that nested properties have defined roots.

#### Options

##### `enableFixer`

Set to `true` to auto-remove `@property` duplicates (based on
identical names).

Note that this option will remove duplicates of the same name even if
the definitions do not match in other ways (e.g., the second property will
be removed even if it has a different type or description).

|||
|---|---|
|Context|Everywhere|
|Options|`enableFixer`|
|Tags|`property`|

<!-- assertions checkPropertyNames -->
