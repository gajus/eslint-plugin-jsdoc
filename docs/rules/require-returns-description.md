<a name="require-returns-check"></a>
# <code>require-returns-check</code>

* [`require-returns-check`](#require-returns-check)
    * [Context and settings](#require-returns-check-context-and-settings)
    * [Failing examples](#require-returns-check-failing-examples)
    * [Passing examples](#require-returns-check-passing-examples)


Requires a return statement be present in a function body if a `@returns`
tag is specified in the jsdoc comment block.

Will also report if multiple `@returns` tags are present.

<a name="require-returns-check-context-and-settings"></a>
## Context and settings

|||
|---|---|
|Context|`ArrowFunctionExpression`, `FunctionDeclaration`, `FunctionExpression`|
|Tags|`returns`|
|Aliases|`return`|

<a name="require-returns-check-failing-examples"></a>
## Failing examples

The following patterns are considered problems:

````js
/**
 * @returns
 */
function quux (foo) {

}
// Message: JSDoc @returns declaration present but return expression not available in function.

/**
 * @return
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"tagNamePreference":{"returns":"return"}}}
// Message: JSDoc @return declaration present but return expression not available in function.

/**
 * @returns
 */
const quux = () => {}
// Message: JSDoc @returns declaration present but return expression not available in function.

/**
 * @returns {undefined} Foo.
 * @returns {String} Foo.
 */
function quux () {

  return foo;
}
// Message: Found more than one @returns declaration.

const language = {
  /**
   * @param {string} name
   * @returns {string}
   */
  get name() {
    this._name = name;
  }
}
// Message: JSDoc @returns declaration present but return expression not available in function.

class Foo {
  /**
   * @returns {string}
   */
  bar () {
  }
}
// Message: JSDoc @returns declaration present but return expression not available in function.

/**
 * @returns
 */
function quux () {

}
// Settings: {"jsdoc":{"tagNamePreference":{"returns":false}}}
// Message: Unexpected tag `@returns`

/**
 * @returns {string}
 */
function f () {
  function g() {
    return 'foo'
  }

  () => {
    return 5
  }
}
// Message: JSDoc @returns declaration present but return expression not available in function.
````


<a name="require-returns-check-passing-examples"></a>
## Passing examples

The following patterns are not considered problems:

````js
/**
 * @returns Foo.
 */
function quux () {

  return foo;
}

/**
 * @returns {string} Foo.
 */
function quux () {

  return foo;
}

/**
 * @returns {string} Foo.
 */
function quux () {

  return foo;
}

/**
 *
 */
function quux () {
}

/**
 * @returns {*} Foo.
 */
const quux = () => foo;

/**
 * @returns {undefined} Foo.
 */
function quux () {}

/**
 * @returns { void } Foo.
 */
function quux () {}

/**
 * @returns {Promise<void>}
 */
async function quux() {}

/**
 * @returns {Promise<void>}
 */
const quux = async function () {}

/**
 * @returns {Promise<void>}
 */
const quux = async () => {}

/**
 * @returns Foo.
 * @abstract
 */
function quux () {
  throw new Error('must be implemented by subclass!');
}

/**
 * @returns Foo.
 * @virtual
 */
function quux () {
  throw new Error('must be implemented by subclass!');
}

/**
 * @returns Foo.
 * @constructor
 */
function quux () {
}

/**
 * @interface
 */
class Foo {
  /**
   * @returns {string}
   */
  bar () {
  }
}

/**
 * @record
 */
class Foo {
  /**
   * @returns {string}
   */
  bar () {
  }
}
// Settings: {"jsdoc":{"mode":"closure"}}

/**
 * @returns {undefined} Foo.
 */
function quux () {
}

/**
 * @returns {void} Foo.
 */
function quux () {
}

/**
 * @returns {void} Foo.
 */
function quux () {
  return undefined;
}

/**
 * @returns {void} Foo.
 */
function quux () {
  return;
}

/**
 *
 */
function quux () {
  return undefined;
}

/**
 *
 */
function quux () {
  return;
}

/**
 * @returns {true}
 */
function quux () {
  try {
    return true;
  } catch (err) {
  }
  return;
}

/**
 * @returns {true}
 */
function quux () {
  try {
  } finally {
    return true;
  }
  return;
}

/**
 * @returns {true}
 */
function quux () {
  try {
    return;
  } catch (err) {
  }
  return true;
}

/**
 * @returns {true}
 */
function quux () {
  try {
    something();
  } catch (err) {
    return true;
  }
  return;
}

/**
 * @returns {true}
 */
function quux () {
  switch (true) {
  case 'abc':
    return true;
  }
  return;
}

/**
 * @returns {true}
 */
function quux () {
  switch (true) {
  case 'abc':
    return;
  }
  return true;
}

/**
 * @returns {true}
 */
function quux () {
  for (const i of abc) {
    return true;
  }
  return;
}

/**
 * @returns {true}
 */
function quux () {
  for (const a in b) {
    return true;
  }
}

/**
 * @returns {true}
 */
function quux () {
  for (let i=0; i<n; i+=1) {
    return true;
  }
}

/**
 * @returns {true}
 */
function quux () {
  while(true) {
    return true
  }
}

/**
 * @returns {true}
 */
function quux () {
  do {
    return true
  }
  while(true)
}

/**
 * @returns {true}
 */
function quux () {
  if (true) {
    return;
  }
  return true;
}

/**
 * @returns {true}
 */
function quux () {
  if (true) {
    return true;
  }
}

/**
 * @returns {true}
 */
function quux () {
  var a = {};
  with (a) {
    return true;
  }
}

/**
 * @returns {true}
 */
function quux () {
  if (true) {
    return;
  } else {
    return true;
  }
  return;
}
````

