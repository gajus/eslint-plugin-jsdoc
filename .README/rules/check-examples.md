### `check-examples`

Ensures that (JavaScript) examples within JSDoc adhere to ESLint rules.

Works in conjunction with the following settings:

* `captionRequired`
* `exampleCodeRegex`
* `rejectExampleCodeRegex`
* `allowInlineConfig` - Defaults to `true`
* `noDefaultExampleRules`
* `matchingFileName`
* `configFile`
* `eslintrcForExamples` - Defaults to `true`
* `baseConfig`
* `reportUnusedDisableDirectives` - Defaults to `true`

Inline ESLint config within `@example` JavaScript is allowed, though the
disabling of ESLint directives which are not needed by the resolved rules
will be reported as with the ESLint `--report-unused-disable-directives`
command.

|||
|---|---|
|Context|`ArrowFunctionExpression`, `FunctionDeclaration`, `FunctionExpression`|
|Tags|`example`|
|Settings| *See above* |

<!-- assertions checkExamples -->
