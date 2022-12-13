---
sidebar_position: 1
---

Certain settings pertain to ignoring rules.

## Allow tags (`@private` or `@internal`) to disable rules for that comment block

- `settings.jsdoc.ignorePrivate` - Disables all rules for the comment block
  on which a `@private` tag (or `@access private`) occurs. Defaults to
  `false`. Note: This has no effect with the rule `check-access` (whose
  purpose is to check access modifiers) or `empty-tags` (which checks
  `@private` itself).
- `settings.jsdoc.ignoreInternal` - Disables all rules for the comment block
  on which a `@internal` tag occurs. Defaults to `false`. Note: This has no
  effect with the rule `empty-tags` (which checks `@internal` itself).

## `@override`/`@augments`/`@extends`/`@implements`/`@ignore` Without Accompanying `@param`/`@description`/`@example`/`@returns`/`@throws`/`@yields`

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
