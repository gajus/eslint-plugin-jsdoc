---
slug: /Rules
---
# Rules

Problems reported by rules which have a wrench :wrench: below can be fixed automatically by running ESLint on the command line with `--fix` option.

|recommended|fixable|rule|description|
|-|-|-|-|
|:heavy_check_mark:|| [check-access](./Rules/check-access) | Enforces valid `@access` tags|
|:heavy_check_mark:|:wrench:| [check-alignment](./Rules/check-alignment)|Enforces alignment of JSDoc block asterisks|
|||[check-examples](./Rules/check-examples)|Linting of JavaScript within `@example`|
|||[check-indentation](./Rules/check-indentation)|Checks for invalid padding inside JSDoc blocks|
|:heavy_check_mark:|:wrench:|[check-param-names](./Rules/check-param-names)|Checks for dupe `@param` names, that nested param names have roots, and that parameter names in function declarations match jsdoc param names.|
|:heavy_check_mark:|:wrench:|[check-property-names](./Rules/check-property-names)|Checks for dupe `@property` names, that nested property names have roots|
|||[check-syntax](./Rules/check-syntax)|Reports use against current mode (currently only prohibits Closure-specific syntax)|
|:heavy_check_mark:|:wrench:|[check-tag-names](./Rules/check-tag-names)|Reports invalid jsdoc (block) tag names|
|:heavy_check_mark:|:wrench:|[check-types](./Rules/check-types)|Reports types deemed invalid (customizable and with defaults, for preventing and/or recommending replacements)|
|:heavy_check_mark:||[check-values](./Rules/check-values)|Checks for expected content within some miscellaneous tags (`@version`, `@since`, `@license`, `@author`)|
|:heavy_check_mark:|:wrench:|[empty-tags](./Rules/empty-tags)|Checks tags that are expected to be empty (e.g., `@abstract` or `@async`), reporting if they have content|
|:heavy_check_mark:||[implements-on-classes](./Rules/implements-on-classes)|Prohibits use of `@implements` on non-constructor functions (to enforce the tag only being used on classes/constructors)|
|||[match-description](./Rules/match-description)|Defines customizable regular expression rules for your tag descriptions|
|:heavy_check_mark:|:wrench:|[newline-after-description](./Rules/newline-after-description)|Requires or prohibits newlines after the description portion of a jsdoc block|
||:wrench:|[no-types](./Rules/no-types)|Prohibits types on `@param` or `@returns` (redundant with TypeScript)|
|:heavy_check_mark:||[no-undefined-types](./Rules/no-undefined-types)|Besides some expected built-in types, prohibits any types not specified as globals or within `@typedef` |
|||[require-description](./Rules/require-description)|Requires that all functions (and potentially other contexts) have a description.|
||:wrench:|[require-description-complete-sentence](./Rules/require-description-complete-sentence)|Requires that block description, explicit `@description`, and `@param`/`@returns` tag descriptions are written in complete sentences|
||:wrench:|[require-example](./Rules/require-example)|Requires that all functions (and potentially other contexts) have examples.|
|||[require-file-overview](./Rules/require-file-overview)|By default, requires a single `@file` tag at the beginning of each linted file|
||:wrench:|[require-hyphen-before-param-description](./Rules/require-hyphen-before-param-description)|Requires a hyphen before `@param` descriptions (and optionally before `@property` descriptions)|
|:heavy_check_mark:|:wrench:|[require-jsdoc](./Rules/require-jsdoc)|Checks for presence of jsdoc comments, on functions and potentially other contexts (optionally limited to exports).|
|:heavy_check_mark:|:wrench:|[require-param](./Rules/require-param)|Requires that all function parameters are documented with a `@param` tag.|
|:heavy_check_mark:||[require-param-description](./Rules/require-param-description)|Requires that each `@param` tag has a `description` value.|
|:heavy_check_mark:||[require-param-name](./Rules/require-param-name)|Requires that all `@param` tags have names.|
|:heavy_check_mark:||[require-param-type](./Rules/require-param-type)|Requires that each `@param` tag has a type value (within curly brackets).|
|:heavy_check_mark:|:wrench:|[require-property](./Rules/require-property)|Requires that all `@typedef` and `@namespace` tags have `@property` tags when their type is a plain `object`, `Object`, or `PlainObject`.|
|:heavy_check_mark:||[require-property-description](./Rules/require-property-description)|Requires that each `@property` tag has a `description` value.|
|:heavy_check_mark:||[require-property-name](./Rules/require-property-name)|Requires that all `@property` tags have names.|
|:heavy_check_mark:||[require-property-type](./Rules/require-property-type)|Requires that each `@property` tag has a type value (within curly brackets).|
|:heavy_check_mark:||[require-returns](./Rules/require-returns)|Requires that return statements are documented.|
|:heavy_check_mark:||[require-returns-check](./Rules/require-returns-check)|Requires a return statement be present in a function body if a `@returns` tag is specified in the jsdoc comment block (and reports if multiple `@returns` tags are present).|
|:heavy_check_mark:||[require-returns-description](./Rules/require-returns-description)|Requires that the `@returns` tag has a `description` value (not including `void`/`undefined` type returns).|
|:heavy_check_mark:||[require-returns-type](./Rules/require-returns-type)|Requires that `@returns` tag has a type value (in curly brackets).|
|:heavy_check_mark:||[valid-types](./Rules/valid-types)|Requires all types/namepaths to be valid JSDoc, Closure compiler, or TypeScript types (configurable in settings)|
