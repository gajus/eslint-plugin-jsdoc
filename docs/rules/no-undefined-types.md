<a name="user-content-no-undefined-types"></a>
<a name="no-undefined-types"></a>
# <code>no-undefined-types</code>

* [Options](#user-content-no-undefined-types-options)
* [Context and settings](#user-content-no-undefined-types-context-and-settings)
* [Failing examples](#user-content-no-undefined-types-failing-examples)
* [Passing examples](#user-content-no-undefined-types-passing-examples)


Checks that types in jsdoc comments are defined. This can be used to check
unimported types.

When enabling this rule, types in jsdoc comments will resolve as used
variables, i.e. will not be marked as unused by `no-unused-vars`.

In addition to considering globals found in code (or in ESLint-indicated
`globals`) as defined, the following tags will also be checked for
name(path) definitions to also serve as a potential "type" for checking
the tag types in the table below:

`@callback`, `@class` (or `@constructor`), `@constant` (or `@const`),
`@event`, `@external` (or `@host`), `@function` (or `@func` or `@method`),
`@interface`, `@member` (or `@var`), `@mixin`, `@name`, `@namespace`,
`@template` (for "closure" or "typescript" `settings.jsdoc.mode` only),
`@typedef`.

The following tags will also be checked but only when the mode is `closure`:

`@package`, `@private`, `@protected`, `@public`, `@static`

The following types are always considered defined.

- `null`, `undefined`, `void`, `string`, `boolean`, `object`,
  `function`, `symbol`
- `number`, `bigint`, `NaN`, `Infinity`
- `any`, `*`, `never`, `unknown`, `const`
- `this`, `true`, `false`
- `Array`, `Object`, `RegExp`, `Date`, `Function`

Note that preferred types indicated within `settings.jsdoc.preferredTypes` will
also be assumed to be defined.

Also note that if there is an error [parsing](https://github.com/jsdoc-type-pratt-parser/jsdoc-type-pratt-parser)
types for a tag, the function will silently ignore that tag, leaving it to
the `valid-types` rule to report parsing errors.

If you define your own tags, you can use `settings.jsdoc.structuredTags`
to indicate that a tag's `name` is "namepath-defining" (and should prevent
reporting on use of that namepath elsewhere) and/or that a tag's `type` is
`false` (and should not be checked for types). If the `type` is an array, that
array's items will be considered as defined for the purposes of that tag.

<a name="user-content-no-undefined-types-options"></a>
<a name="no-undefined-types-options"></a>
## Options

An option object may have the following keys:

- `definedTypes` - This array can be populated to indicate other types which
  are automatically considered as defined (in addition to globals, etc.).
  Defaults to an empty array.
- `markVariablesAsUsed` - Whether to mark variables as used for the purposes
  of the `no-unused-vars` rule when they are not found to be undefined.
  Defaults to `true`. May be set to `false` to enforce a practice of not
  importing types unless used in code.
- `disableReporting` - Whether to disable reporting of errors. Defaults to
  `false`. This may be set to `true` in order to take advantage of only
  marking defined variables as used.

<a name="user-content-no-undefined-types-context-and-settings"></a>
<a name="no-undefined-types-context-and-settings"></a>
## Context and settings

|||
|---|---|
|Context|everywhere|
|Tags|`augments`, `class`, `constant`, `enum`, `implements`, `member`, `module`, `namespace`, `param`, `property`, `returns`, `throws`, `type`, `typedef`, `yields`|
|Aliases|`constructor`, `const`, `extends`, `var`, `arg`, `argument`, `prop`, `return`, `exception`, `yield`|
|Closure-only|`package`, `private`, `protected`, `public`, `static`|
|Recommended|true|
|Options|`definedTypes`, `disableReporting`, `markVariablesAsUsed`|
|Settings|`preferredTypes`, `mode`, `structuredTags`|


<a name="user-content-no-undefined-types-failing-examples"></a>
<a name="no-undefined-types-failing-examples"></a>
## Failing examples

The following patterns are considered problems:

````js
/**
 * @param {HerType} baz - Foo.
 */
function quux(foo, bar, baz) {

}
// Settings: {"jsdoc":{"preferredTypes":{"HerType":1000}}}
// Message: Invalid `settings.jsdoc.preferredTypes`. Values must be falsy, a string, or an object.

/**
 * @param {HerType} baz - Foo.
 */
function quux(foo, bar, baz) {

}
// Settings: {"jsdoc":{"preferredTypes":{"HerType":false}}}
// Message: The type 'HerType' is undefined.

/**
 * @param {strnig} foo - Bar.
 */
function quux(foo) {

}
// Message: The type 'strnig' is undefined.

/**
 * @param {MyType} foo - Bar.
 * @param {HisType} bar - Foo.
 */
function quux(foo, bar) {

}
// "jsdoc/no-undefined-types": ["error"|"warn", {"definedTypes":["MyType"]}]
// Message: The type 'HisType' is undefined.

/**
 * @param {MyType} foo - Bar.
 * @param {HisType} bar - Foo.
 * @param {HerType} baz - Foo.
 */
function quux(foo, bar, baz) {

}
// Settings: {"jsdoc":{"preferredTypes":{"hertype":{"replacement":"HerType"}}}}
// "jsdoc/no-undefined-types": ["error"|"warn", {"definedTypes":["MyType"]}]
// Message: The type 'HisType' is undefined.

 /**
  * @param {MyType} foo - Bar.
  * @param {HisType} bar - Foo.
  * @param {HerType} baz - Foo.
  */
function quux(foo, bar, baz) {

}
// Settings: {"jsdoc":{"preferredTypes":{"hertype":{"replacement":false},"histype":"HisType"}}}
// "jsdoc/no-undefined-types": ["error"|"warn", {"definedTypes":["MyType"]}]
// Message: The type 'HerType' is undefined.

/**
 * @template TEMPLATE_TYPE
 * @param {WRONG_TEMPLATE_TYPE} bar
 */
function foo (bar) {
};
// Settings: {"jsdoc":{"mode":"closure"}}
// Message: The type 'WRONG_TEMPLATE_TYPE' is undefined.

class Foo {
  /**
   * @return {TEMPLATE_TYPE}
   */
  bar () {
  }
}
// Message: The type 'TEMPLATE_TYPE' is undefined.

class Foo {
  /**
   * @return {TEMPLATE_TYPE}
   */
  invalidTemplateReference () {
  }
}

/**
 * @template TEMPLATE_TYPE
 */
class Bar {
  /**
   * @return {TEMPLATE_TYPE}
   */
  validTemplateReference () {
  }
}
// Settings: {"jsdoc":{"mode":"typescript"}}
// Message: The type 'TEMPLATE_TYPE' is undefined.

/**
 * @type {strnig}
 */
var quux = {

};
// Message: The type 'strnig' is undefined.

/**
 * @template TEMPLATE_TYPE_A, TEMPLATE_TYPE_B
 */
class Foo {
  /**
   * @param {TEMPLATE_TYPE_A} baz
   * @return {TEMPLATE_TYPE_B}
   */
  bar (baz) {
  }
}
// Settings: {"jsdoc":{"mode":"jsdoc"}}
// Message: The type 'TEMPLATE_TYPE_A' is undefined.

/**
 * @param {...VAR_TYPE} varargs
 */
function quux (varargs) {
}
// Message: The type 'VAR_TYPE' is undefined.

/**
 * @this {Navigator}
 */
function quux () {}
// Settings: {"jsdoc":{"mode":"closure"}}
// Message: The type 'Navigator' is undefined.

/**
 * @export {SomeType}
 */
function quux () {}
// Settings: {"jsdoc":{"mode":"closure"}}
// Message: The type 'SomeType' is undefined.

/**
 * @aCustomTag {SomeType}
 */
function quux () {}
// Settings: {"jsdoc":{"structuredTags":{"aCustomTag":{"type":true}}}}
// Message: The type 'SomeType' is undefined.

/**
 * @aCustomTag {SomeType}
 */
function quux () {}
// Settings: {"jsdoc":{"structuredTags":{"aCustomTag":{"type":["aType","anotherType"]}}}}
// Message: The type 'SomeType' is undefined.

/**
 * @namepathReferencing SomeType
 */
/**
 * @type {SomeType}
 */
// Settings: {"jsdoc":{"structuredTags":{"namepathReferencing":{"name":"namepath-referencing"}}}}
// Message: The type 'SomeType' is undefined.

/**
 * @template abc TEMPLATE_TYPE
 * @param {TEMPLATE_TYPE} bar
 */
function foo (bar) {
};
// Settings: {"jsdoc":{"mode":"closure"}}
// Message: The type 'TEMPLATE_TYPE' is undefined.

/**
 * @suppress {visibility}
 */
function foo () {
}
// Settings: {"jsdoc":{"mode":"jsdoc"}}
// Message: The type 'visibility' is undefined.

/**
* @typedef Todo
* @property description
* @property otherStuff
*/
/**
 * @type {Omit<Todo, "description">}
 */
const a = new Todo();
// Settings: {"jsdoc":{"mode":"jsdoc"}}
// Message: The type 'Omit' is undefined.

/**
 * Message with {@link NotKnown}
 */
// Message: The type 'NotKnown' is undefined.

/**
 * Message with
 * a link that is {@link NotKnown}
 */
// Message: The type 'NotKnown' is undefined.

/**
 * @abc
 * @someTag Message with
 *   a link that is {@link NotKnown}
 */
// Message: The type 'NotKnown' is undefined.

/**
 * This is a {@namepathOrURLReferencer SomeType}.
 */
// Settings: {"jsdoc":{"structuredTags":{"namepathOrURLReferencer":{"name":"namepath-or-url-referencing"}}}}
// Message: The type 'SomeType' is undefined.
````



<a name="user-content-no-undefined-types-passing-examples"></a>
<a name="no-undefined-types-passing-examples"></a>
## Passing examples

The following patterns are not considered problems:

````js
/**
 * @param {string} foo - Bar.
 */
function quux(foo) {

}

/**
 * @param {Promise} foo - Bar.
 */
function quux(foo) {

}

class MyClass {}

/**
 * @param {MyClass} foo - Bar.
 */
function quux(foo) {
  console.log(foo);
}

quux(0);

const MyType = require('my-library').MyType;

/**
 * @param {MyType} foo - Bar.
 */
  function quux(foo) {

}

const MyType = require('my-library').MyType;

/**
 * @param {MyType} foo - Bar.
 */
  function quux(foo) {

}

const MyType = require('my-library').MyType;

/**
 * @param {MyType} foo - Bar.
 */
  function quux(foo) {

}

import {MyType} from 'my-library';

/**
 * @param {MyType} foo - Bar.
 * @param {object<string, number>} foo
 * @param {Array<string>} baz
 */
function quux(foo, bar, baz) {

}

/*globals MyType*/

/**
 * @param {MyType} foo - Bar.
 * @param {HisType} bar - Foo.
 */
  function quux(foo, bar) {

}

/**
 * @typedef {object} hello
 * @property {string} a - a.
 */

/**
 * @param {hello} foo
 */
function quux(foo) {

}

/**
 * @param {Array<syntaxError} foo
 */
function quux(foo) {

}

/**
 * Callback test.
 *
 * @callback addStuffCallback
 * @param {String} sum - An test integer.
 */
/**
 * Test Eslint.
 *
 * @param {addStuffCallback} callback - A callback to run.
 */
function testFunction(callback) {
  callback();
}

/**
 *
 *
 */
function foo () {

}

/**
 * @param {MyType} foo - Bar.
 * @param {HisType} bar - Foo.
 */
function quux(foo, bar) {

}
// "jsdoc/no-undefined-types": ["error"|"warn", {"definedTypes":["MyType","HisType"]}]

/**
 * @param {MyType} foo - Bar.
 * @param {HisType} bar - Foo.
 * @param {HerType} baz - Foo.
 */
function quux(foo, bar, baz) {

}
// Settings: {"jsdoc":{"preferredTypes":{"hertype":{"replacement":"HerType"},"histype":"HisType"}}}
// "jsdoc/no-undefined-types": ["error"|"warn", {"definedTypes":["MyType"]}]

/**
 * @param {MyType} foo - Bar.
 * @param {HisType} bar - Foo.
 * @param {HerType} baz - Foo.
 */
function quux(foo, bar, baz) {

}
// Settings: {"jsdoc":{"preferredTypes":{"hertype":{"replacement":"HerType<>"},"histype":"HisType.<>"}}}
// "jsdoc/no-undefined-types": ["error"|"warn", {"definedTypes":["MyType"]}]

/**
 * @template TEMPLATE_TYPE
 * @param {TEMPLATE_TYPE} bar
 * @return {TEMPLATE_TYPE}
 */
function foo (bar) {
};
// Settings: {"jsdoc":{"mode":"closure"}}

/**
 * @template TEMPLATE_TYPE
 */
class Foo {
  /**
   * @return {TEMPLATE_TYPE}
   */
  bar () {
  }
}
// Settings: {"jsdoc":{"mode":"closure"}}

/**
 * @template TEMPLATE_TYPE
 */
class Foo {
  /**
   * @return {TEMPLATE_TYPE}
   */
  bar () {}

  /**
   * @return {TEMPLATE_TYPE}
   */
  baz () {}
}
// Settings: {"jsdoc":{"mode":"closure"}}

/**
 * @template TEMPLATE_TYPE_A, TEMPLATE_TYPE_B
 */
class Foo {
  /**
   * @param {TEMPLATE_TYPE_A} baz
   * @return {TEMPLATE_TYPE_B}
   */
  bar (baz) {
  }
}
// Settings: {"jsdoc":{"mode":"closure"}}

/**
 * @template TEMPLATE_TYPE_A, TEMPLATE_TYPE_B - Some description
 */
class Foo {
  /**
   * @param {TEMPLATE_TYPE_A} baz
   * @return {TEMPLATE_TYPE_B}
   */
  bar (baz) {
  }
}
// Settings: {"jsdoc":{"mode":"closure"}}

/****/

/* */

/*** */

/**
 *
 */
function quux () {

}

/**
 * @typedef {object} BaseObject
 */
/**
 * Run callback when hooked method is called.
 *
 * @template {BaseObject} T
 * @param {T} obj - object whose method should be hooked.
 * @param {string} method - method which should be hooked.
 * @param {(sender: T) => void} callback - callback which should
 * be called when the hooked method was invoked.
 */
function registerEvent(obj, method, callback) {

}
// Settings: {"jsdoc":{"mode":"typescript"}}

 /**
 * @param {...} varargs
 */
function quux (varargs) {
}

/**
 * @param {...number} varargs
 */
function quux (varargs) {
}

class Navigator {}
/**
 * @this {Navigator}
 */
function quux () {}
// Settings: {"jsdoc":{"mode":"closure"}}

class SomeType {}
/**
 * @export {SomeType}
 */
function quux () {}
// Settings: {"jsdoc":{"mode":"closure"}}

/**
 * @template T
 * @param {T} arg
 */
function example(arg) {

  /** @param {T} */
  function inner(x) {
  }
}
// Settings: {"jsdoc":{"mode":"closure"}}

const init = () => {
  /**
   * Makes request
   * @returns {Promise}
   */
  function request() {
    return Promise.resolve('success');
  }
};

/** Gets a Promise resolved with a given value.
 *
 * @template ValueType
 * @param {ValueType} value Value to resolve.
 * @returns {Promise<ValueType>} Promise resolved with value.
 */
exports.resolve1 = function resolve1(value) {
  return Promise.resolve(value);
};
// Settings: {"jsdoc":{"mode":"typescript"}}

/**
 * A function returning the same type as its argument.
 *
 * @template ValueType
 * @typedef {ValueType} ValueFunc
 */
// Settings: {"jsdoc":{"mode":"typescript"}}

/**
 * @aCustomTag {SomeType}
 */
function quux () {}
// Settings: {"jsdoc":{"structuredTags":{"aCustomTag":{"type":false}}}}

/**
 * @aCustomTag {SomeType}
 */
function quux () {}
// Settings: {"jsdoc":{"structuredTags":{"aCustomTag":{"type":["aType","SomeType"]}}}}

/**
 * @namepathDefiner SomeType
 */
/**
 * @type {SomeType}
 */
// Settings: {"jsdoc":{"structuredTags":{"namepathDefiner":{"name":"namepath-defining"}}}}

class Test {
  /**
   * Method.
   *
   * @returns {this} Return description.
   */
  method (): this {
    return this;
  }
}

/**
 * Bad types ignored here and handled instead by `valid-types`.
 * @param {string(} foo - Bar.
 */
function quux(foo) {

}

/**
 * @template T
 * @param {T} arg
 * @returns {[T]}
 */
function genericFunctionExample(arg) {
  const result = /** @type {[T]} */ (new Array());
  result[0] = arg;
  return result;
}
// Settings: {"jsdoc":{"mode":"closure"}}

/** @typedef QDigestNode */
class A {
  /**
   * @template {object} T
   * @param {(node: QDigestNode) => T} callback
   * @returns {T[]}
   */
  map(callback) {
    /** @type {T[]} */
    let vals;
    return vals;
  }
}
// Settings: {"jsdoc":{"mode":"typescript"}}

/**
 * @template T
 * @param {T} arg
 */
function example(arg) {

  /** @param {T} */
  function inner(x) {
  }
}
// Settings: {"jsdoc":{"mode":"typescript"}}

/**
 * @suppress {visibility}
 */
function foo () {
}
// Settings: {"jsdoc":{"mode":"closure"}}

/**
 * @template T
 */
export class Foo {
  // cast to T
  getType() {
    const x = "hello";
    const y = /** @type {T} */ (x);
    return y;
  }
}
// Settings: {"jsdoc":{"mode":"typescript"}}

/**
 * @type {const}
 */
const a = 'string';

/**
* @typedef Todo
* @property description
* @property otherStuff
*/
/**
 * @type {Omit<Todo, "description">}
 */
const a = new Todo();
// Settings: {"jsdoc":{"mode":"typescript"}}

/**
 * @template A, [B=SomeDefault]
 */
class Foo {
  /**
   * @param {A} baz
   * @return {B}
   */
  bar (baz) {
  }
}
// Settings: {"jsdoc":{"mode":"typescript"}}

import {MyType} from 'my-library';

/**
 * @param {MyType} foo - Bar.
 * @param {AnUndefinedType} bar
 */
function quux(foo, bar) {

}
// "jsdoc/no-undefined-types": ["error"|"warn", {"disableReporting":true}]

class MyClass {}
class AnotherClass {}

/**
 * A description mentioning {@link MyClass} and {@link AnotherClass | another class} and a URL via [this link]{@link https://www.example.com}.
 */
function quux(foo) {
  console.log(foo);
}

quux(0);

class MyClass {}
class AnotherClass {}

/**
 * @see A tag mentioning {@link MyClass} and {@link AnotherClass | another class} and a URL via [this link]{@link https://www.example.com}.
 */
function quux(foo) {
  console.log(foo);
}

quux(0);
````

