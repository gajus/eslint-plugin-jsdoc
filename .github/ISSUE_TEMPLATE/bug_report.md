---
name: Bug Report
about: Report a bug
title: ''
labels: bug
assignees: ''
---

<!--
NOTE: If you are running ESLint/`eslint-plugin-jsdoc` from within an IDE,
before filing an issue, please be sure to restart the IDE after making any
updates to ensure you are indeed getting errors with the updated version.
Running `eslint` on the command line may also be helpful in allowing you
to better provide us with the error details including the stack trace.
-->

<!--
NOTE: If you have a bug specifically related to the parsing of types, e.g.,
the `some-unrecognized+type-syntax` (within curly brackets) in:

/**
 * @param {some-unrecognized+type-syntax} myName
 */

...then please file instead at https://github.com/jsdoctypeparser/jsdoctypeparser/issues/
-->

<!--
TIP: If you have a complicated config with `overrides`, you can simplify the
config you provide us by running `eslint` with `--print-config` and the file
that is triggering the error. See:
https://eslint.org/docs/user-guide/command-line-interface#print-config
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
