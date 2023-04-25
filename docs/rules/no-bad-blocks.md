<a name="user-content-no-bad-blocks"></a>
<a name="no-bad-blocks"></a>
### <code>no-bad-blocks</code>



This rule checks for multi-line-style comments which fail to meet the
criteria of a jsdoc block, namely that it should begin with two and only two
asterisks, but which appear to be intended as jsdoc blocks due to the presence
of whitespace followed by whitespace or asterisks, and
an at-sign (`@`) and some non-whitespace (as with a jsdoc block tag).

<a name="user-content-fixer"></a>
<a name="fixer"></a>
## Fixer

(TODO)

<a name="user-content-options"></a>
<a name="options"></a>
## Options

Takes an optional options object with the following.

<a name="user-content-options-ignore"></a>
<a name="options-ignore"></a>
### <code>ignore</code>

An array of directives that will not be reported if present at the beginning of
a multi-comment block and at-sign `/* @`.

Defaults to `['ts-check', 'ts-expect-error', 'ts-ignore', 'ts-nocheck']`
(some directives [used by TypeScript](https://www.typescriptlang.org/docs/handbook/intro-to-js-ts.html#ts-check)).

<a name="user-content-options-preventallmultiasteriskblocks"></a>
<a name="options-preventallmultiasteriskblocks"></a>
### <code>preventAllMultiAsteriskBlocks</code>

A boolean (defaulting to `false`) which if `true` will prevent all
JSDoc-like blocks with more than two initial asterisks even those without
apparent tag content.

<a name="user-content-context-and-settings"></a>
<a name="context-and-settings"></a>
## Context and settings

|||
|---|---|
|Context|Everywhere|
|Tags|N/A|
|Recommended|false|
|Options|`ignore`, `preventAllMultiAsteriskBlocks`|

<a name="user-content-failing-examples"></a>
<a name="failing-examples"></a>
## Failing examples

The following patterns are considered problems:

````js
/*
 * @param foo
 */
function quux (foo) {

}
// Message: Expected JSDoc-like comment to begin with two asterisks.

/*
 * @property foo
 */
// Message: Expected JSDoc-like comment to begin with two asterisks.

function quux() {

}
// Settings: {"jsdoc":{"structuredTags":{"see":{"name":false,"required":["name"]}}}}
// Message: Cannot add "name" to `require` with the tag's `name` set to `false`

/* @ts-ignore */
// "jsdoc/no-bad-blocks": ["error"|"warn", {"ignore":[]}]
// Message: Expected JSDoc-like comment to begin with two asterisks.

/*
 * Some description.
 *
 * @returns {string} Some string
 */
function echo() {
  return 'Something';
}
// Message: Expected JSDoc-like comment to begin with two asterisks.

/***
 * @param foo
 */
function quux (foo) {

}
// Message: Expected JSDoc-like comment to begin with two asterisks.

/***
 *
 */
function quux (foo) {

}
// "jsdoc/no-bad-blocks": ["error"|"warn", {"preventAllMultiAsteriskBlocks":true}]
// Message: Expected JSDoc-like comment to begin with two asterisks.
````



<a name="user-content-passing-examples"></a>
<a name="passing-examples"></a>
## Passing examples

The following patterns are not considered problems:

````js
/**
 * @property foo
 */

/**
 * @param foo
 */
 function quux () {

 }

function quux () {

}

/* This could just be intended as a regular multiline comment,
   so don't report this */
function quux () {

}

/* Just a regular multiline comment with an `@` but not appearing
    like a tag in a jsdoc-block, so don't report */
function quux () {

}

/* @ts-check */

/* @ts-expect-error */

/* @ts-ignore */

/* @ts-nocheck */

/* */

/** */

/* @custom */
// "jsdoc/no-bad-blocks": ["error"|"warn", {"ignore":["custom"]}]

/***
 * This is not JSDoc because of the 3 asterisks, but
 * is allowed without `preventAllMultiAsteriskBlocks`, as
 * some might wish normal multiline comments.
 */
function quux (foo) {

}

/***/
````

