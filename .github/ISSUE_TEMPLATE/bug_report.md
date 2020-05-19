---
name: Bug Report
about: Report a bug
title: ''
labels: bug
assignees: ''
---

<!--
NOTE: If this is a bug specifically related to the parsing of types, e.g.,
the `some-unrecognized+type-syntax` (within curly brackets) in:

/**
 * @param {some-unrecognized+type-syntax} myName
 */

...then please file instead at https://github.com/jsdoctypeparser/jsdoctypeparser/issues/
-->

## Expected behavior
<!-- Provide a detailed description of how you expected the software to -->
<!-- behave. -->

## Actual behavior
<!-- Provide a detailed description of how the software actually behaved, -->
<!-- including any rationale for why that behavior is incorrect. -->

## ESLint Config

<!-- What is the minimal config that reproduces the issue? -->

## ESLint sample

<!-- What code triggers the error? -->

```js
// Format code using Markdown code blocks
```

<!-- OR, if this is not triggered by a single rule, what is the
   problem and how can one reproduce? -->

## Environment

* Node version: <!-- $ node -v -->
* ESLint version <!-- $ $(npm bin)/eslint -v -->
* `eslint-plugin-jsdoc` version:
