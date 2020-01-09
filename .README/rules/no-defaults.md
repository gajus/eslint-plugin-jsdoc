### `no-defaults`

This rule reports defaults being used on the relevant portion of `@param`
or `@default`. It also optionally reports the presence of the
square-bracketed optional arguments at all.

The rule is intended to prevent the indication of defaults on tags where
this would be redundant with ES6 default parameters (or for `@default`,
where it would be redundant with the context to which the `@default`
tag is attached).

Unless your `@default` is on a function, you will need to set `contexts`
to an appropriate context, including, if you wish, "any".

#### Options

##### `noOptionalParamNames`

Set this to `true` to report the presence of optional parameters. May be
used if the project is insisting on optionality being indicated by
the presence of ES6 default parameters (bearing in mind that such
"defaults" are only applied when the supplied value is missing or
`undefined` but not for `null` or other "falsey" values).

##### `contexts`

Set this to an array of strings representing the AST context
where you wish the rule to be applied.
Overrides the default contexts (see below). Set to `"any"` if you want
the rule to apply to any jsdoc block throughout your files (as is necessary
for finding function blocks not attached to a function declaration or
expression, i.e., `@callback` or `@function` (or its aliases `@func` or
`@method`) (including those associated with an `@interface`).

|||
|---|---|
|Context|`ArrowFunctionExpression`, `FunctionDeclaration`, `FunctionExpression`; others when `contexts` option enabled|
|Tags|`param`, `default`|
|Aliases|`arg`, `argument`, `defaultvalue`|
|Options|`contexts`, `noOptionalParamNames`|

<!-- assertions noDefaults -->
