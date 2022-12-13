---
sidebar_position: 3
---

Rules may, as per the [ESLint user guide](https://eslint.org/docs/user-guide/configuring), have their own individual options. In `eslint-plugin-jsdoc`, a few options,
such as, `exemptedBy` and `contexts`, may be used across different rules.

`eslint-plugin-jsdoc` options, if present, are generally in the form of an
object supplied as the second argument in an array after the error level
(any exceptions to this format are explained within that rule's docs).

```js
// `.eslintrc.js`
{
  rules: {
    'jsdoc/require-example': [
        // The Error level should be `error`, `warn`, or `off` (or 2, 1, or 0)
        'error',
        // The options vary by rule, but are generally added to an options
        //  object as follows:
        {
          checkConstructors: true,
          exemptedBy: ['type']
        }
    ]
  }
}
```
