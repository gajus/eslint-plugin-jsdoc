<a name="user-content-require-returns-check"></a>
<a name="require-returns-check"></a>
# <code>require-returns-check</code>

* [Options](#user-content-require-returns-check-options)
* [Context and settings](#user-content-require-returns-check-context-and-settings)
* [Failing examples](#user-content-require-returns-check-failing-examples)
* [Passing examples](#user-content-require-returns-check-passing-examples)


Requires a return statement (or non-`undefined` Promise resolve value)
be present in a
function body if a `@returns` tag (without a `void` or `undefined` type)
is specified in the function's JSDoc comment block.

Will also report `@returns {void}` and `@returns {undefined}` if `exemptAsync`
is set to `false` and a non-`undefined` value is returned or a resolved value
is found. Also reports if `@returns {never}` is discovered with a return value.

Will also report if multiple `@returns` tags are present.

<a name="user-content-require-returns-check-options"></a>
<a name="require-returns-check-options"></a>
## Options

- `exemptGenerators`- Because a generator might be labeled as having a
  `IterableIterator` `@returns` value (along with an iterator type
  corresponding to the type of any `yield` statements), projects might wish to
  leverage `@returns` in generators even without a` return` statement. This
  option is therefore `true` by default in `typescript` mode (in "jsdoc" mode,
  one might be more likely to take advantage of `@yields`). Set it to `false`
  if you wish for a missing `return` to be flagged regardless.
- `exemptAsync` - By default, functions which return a `Promise` that are not
    detected as resolving with a non-`undefined` value and `async` functions
    (even ones that do not explicitly return a value, as these are returning a
    `Promise` implicitly) will be exempted from reporting by this rule.
    If you wish to insist that only `Promise`'s which resolve to
    non-`undefined` values or `async` functions with explicit `return`'s will
    be exempted from reporting (i.e., that `async` functions can be reported
    if they lack an explicit (non-`undefined`) `return` when a `@returns` is
    present), you can set `exemptAsync` to `false` on the options object.
- `reportMissingReturnForUndefinedTypes` - If `true` and no return or
    resolve value is found, this setting will even insist that reporting occur
    with `void` or `undefined` (including as an indicated `Promise` type).
    Unlike `require-returns`, with this option in the rule, one can
     *discourage* the labeling of `undefined` types. Defaults to `false`.

<a name="user-content-require-returns-check-context-and-settings"></a>
<a name="require-returns-check-context-and-settings"></a>
## Context and settings

|||
|---|---|
|Context|`ArrowFunctionExpression`, `FunctionDeclaration`, `FunctionExpression`|
|Tags|`returns`|
|Aliases|`return`|
|Options|`exemptAsync`, `exemptGenerators`, `reportMissingReturnForUndefinedTypes`|
|Recommended|true|

<a name="user-content-require-returns-check-failing-examples"></a>
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

/**
 * @returns {Promise<void>}
 */
async function quux() {}
// "jsdoc/require-returns-check": ["error"|"warn", {"exemptAsync":false}]
// Message: JSDoc @returns declaration present but return expression not available in function.

/**
 * @returns {IterableIterator<any>}
 */
function * quux() {}
// Settings: {"jsdoc":{"mode":"jsdoc"}}
// Message: JSDoc @returns declaration present but return expression not available in function.

/**
 * @returns {IterableIterator<any>}
 */
function * quux() {}
// Settings: {"jsdoc":{"mode":"typescript"}}
// "jsdoc/require-returns-check": ["error"|"warn", {"exemptGenerators":false}]
// Message: JSDoc @returns declaration present but return expression not available in function.

/**
 * @returns {Promise<void>}
 */
function quux() {
  return new Promise((resolve, reject) => {})
}
// "jsdoc/require-returns-check": ["error"|"warn", {"exemptAsync":false}]
// Message: JSDoc @returns declaration present but return expression not available in function.

/**
 * @returns {Promise<void>}
 */
function quux() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    });
  })
}
// "jsdoc/require-returns-check": ["error"|"warn", {"exemptAsync":false}]
// Message: JSDoc @returns declaration present but return expression not available in function.

/**
 * Description.
 * @returns {string}
 */
async function foo() {
  return new Promise(resolve => resolve());
}
// "jsdoc/require-returns-check": ["error"|"warn", {"exemptAsync":false}]
// Message: JSDoc @returns declaration present but return expression not available in function.

/**
 * Description.
 * @returns {void}
 */
async function foo() {
  return new Promise(resolve => resolve());
}
// "jsdoc/require-returns-check": ["error"|"warn", {"exemptAsync":false,"reportMissingReturnForUndefinedTypes":true}]
// Message: JSDoc @returns declaration present but return expression not available in function.

/**
 * @returns { void } Foo.
 */
function quux () {}
// "jsdoc/require-returns-check": ["error"|"warn", {"reportMissingReturnForUndefinedTypes":true}]
// Message: JSDoc @returns declaration present but return expression not available in function.

/**
 * @returns {never} Foo.
 */
function quux () {
  return undefined;
}
// Message: JSDoc @returns declaration set with "never" but return expression is present in function.

/**
 * @returns {never}
 */
function quux (foo) {
  return foo;
}
// Message: JSDoc @returns declaration set with "never" but return expression is present in function.

/**
 * Reads a test fixture.
 *
 * @param path The path to resolve relative to the fixture base. It will be normalized for the
 * operating system.
 *
 * @returns The file contents as buffer.
 */
export function readFixture(path: string): void;
// Message: JSDoc @returns declaration present but return expression not available in function.

/**
 * Reads a test fixture.
 *
 * @param path The path to resolve relative to the fixture base. It will be normalized for the
 * operating system.
 *
 * @returns The file contents as buffer.
 */
export function readFixture(path: string);
// Message: JSDoc @returns declaration present but return expression not available in function.

/**
 * @returns {SomeType}
 */
function quux (path) {
  if (true) {
    return;
  }
  return 15;
};
// Message: JSDoc @returns declaration present but return expression not available in function.

/**
 * Reads a test fixture.
 *
 * @param path The path to resolve relative to the fixture base. It will be normalized for the
 * operating system.
 *
 * @returns The file contents as buffer.
 */
export function readFixture(path: string): void {
  return;
};
// Message: JSDoc @returns declaration present but return expression not available in function.

/**
 * @returns {true}
 */
function quux () {
  if (true) {
    return true;
  }
}
// Message: JSDoc @returns declaration present but return expression not available in function.

/**
 * @returns {true}
 */
function quux () {
  if (true) {
  } else {
    return;
  }
}
// Message: JSDoc @returns declaration present but return expression not available in function.

/**
 * @returns {true}
 */
function quux (someVar) {
  switch (someVar) {
  case 1:
    return true;
  case 2:
    return;
  }
}
// Message: JSDoc @returns declaration present but return expression not available in function.

/**
 * @returns {boolean}
 */
const quux = (someVar) => {
  if (someVar) {
    return true;
  }
};
// Message: JSDoc @returns declaration present but return expression not available in function.

/**
 * @returns {true}
 */
function quux () {
  try {
    return true;
  } catch (error) {
  }
}
// Message: JSDoc @returns declaration present but return expression not available in function.

/**
 * @returns {true}
 */
function quux () {
  try {
    return true;
  } catch (error) {
    return true;
  } finally {
    return;
  }
}
// Message: JSDoc @returns declaration present but return expression not available in function.

/**
 * @returns {true}
 */
function quux () {
  if (true) {
    throw new Error('abc');
  }

  throw new Error('def');
}
// Message: JSDoc @returns declaration present but return expression not available in function.

/**
 * @returns {SomeType} Baz.
 */
function foo() {
    switch (true) {
        default:
            switch (false) {
                default: return;
            }
            return "baz";
    }
};
// Message: JSDoc @returns declaration present but return expression not available in function.

/**
 * @returns {SomeType} Baz.
 */
function foo() {
    switch (true) {
        default:
            switch (false) {
                default: return;
            }
            return "baz";
    }
};
// Message: JSDoc @returns declaration present but return expression not available in function.

/**
 * @returns {number}
 */
function foo() {
  let n = 1;
  while (n > 0.5) {
    n = Math.random();
    if (n < 0.2) {
      return n;
    }
  }
}
// Message: JSDoc @returns declaration present but return expression not available in function.
````



<a name="user-content-require-returns-check-passing-examples"></a>
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
 * @returns {SomeType} Foo.
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
 * @returns {never} Foo.
 */
function quux () {
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
  return true;
}

/**
 * @returns {true}
 */
function quux () {
  try {
  } finally {
    return true;
  }
  return true;
}

/**
 * @returns {true}
 */
function quux () {
  try {
    return true;
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
  return true;
}

/**
 * @returns {true}
 */
function quux () {
  switch (true) {
  case 'abc':
    return true;
  }
  return true;
}

/**
 * @returns {true}
 */
function quux () {
  switch (true) {
  case 'abc':
    return true;
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
  return true;
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
  for (const a of b) {
    return true;
  }
}

/**
 * @returns {true}
 */
function quux () {
  loop: for (const a of b) {
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
    return true;
  }
  return true;
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
    return true;
  } else {
    return true;
  }
  return true;
}

/**
 * @returns {Promise<number>}
 */
async function quux() {
  return 5;
}

/**
 * @returns {Promise<number>}
 */
async function quux() {
  return 5;
}
// "jsdoc/require-returns-check": ["error"|"warn", {"exemptAsync":false}]

/**
 * @returns {Promise<void>}
 */
function quux() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    });
  })
}
// "jsdoc/require-returns-check": ["error"|"warn", {"exemptAsync":false}]

/**
 * Description.
 * @returns {void}
 */
async function foo() {
  return new Promise(resolve => resolve());
}
// "jsdoc/require-returns-check": ["error"|"warn", {"reportMissingReturnForUndefinedTypes":true}]

/**
 * @returns { void } Foo.
 */
function quux () {
  return undefined;
}
// "jsdoc/require-returns-check": ["error"|"warn", {"reportMissingReturnForUndefinedTypes":true}]

/**
 * @returns { string } Foo.
 */
function quux () {
  return 'abc';
}
// "jsdoc/require-returns-check": ["error"|"warn", {"reportMissingReturnForUndefinedTypes":true}]

/**
 * @returns {IterableIterator<any>}
 */
function * quux() {}
// Settings: {"jsdoc":{"mode":"typescript"}}

/**
 * @returns {IterableIterator<any>}
 */
function * quux() {}
// Settings: {"jsdoc":{"mode":"jsdoc"}}
// "jsdoc/require-returns-check": ["error"|"warn", {"exemptGenerators":true}]

/**
 * @param {unknown} val
 * @returns { asserts val is number }
 */
function assertNumber(val) {
  assert(typeof val === 'number');
}

/**
 * Reads a test fixture.
 *
 * @param path The path to resolve relative to the fixture base. It will be normalized for the
 * operating system.
 *
 * @returns The file contents as buffer.
 */
export function readFixture(path: string): Promise<Buffer>;

/**
 * Reads a test fixture.
 *
 * @param path The path to resolve relative to the fixture base. It will be normalized for the
 * operating system.
 *
 * @returns {SomeType} The file contents as buffer.
 */
export function readFixture(path: string): Promise<Buffer>;

/**
 * Reads a test fixture.
 *
 * @param path The path to resolve relative to the fixture base. It will be normalized for the
 * operating system.
 *
 * @returns The file contents as buffer.
 */
export function readFixture(path: string): Promise<Buffer> {
  return new Promise(() => {});
}

/**
 * Reads a test fixture.
 *
 * @param path The path to resolve relative to the fixture base. It will be normalized for the
 * operating system.
 *
 * @returns {void} The file contents as buffer.
 */
export function readFixture(path: string);

/**
 * @returns {SomeType}
 */
function quux (path) {
  if (true) {
    return 5;
  }
  return 15;
};

/**
 * @returns {SomeType} Foo.
 */
const quux = () => new Promise((resolve) => {
  resolve(3);
});

/**
 * @returns {SomeType} Foo.
 */
const quux = function () {
  return new Promise((resolve) => {
    resolve(3);
  });
};

/**
 * @returns {true}
 */
function quux () {
  if (true) {
    return true;
  }

  throw new Error('Fail');
}

/**
 * @returns Baz.
 */
function foo() {
    switch (true) {
        default:
            switch (false) {
                default: break;
            }
            return "baz";
    }
};

/**
 * Return a V1 style query identifier.
 *
 * @param {string} id - The query identifier.
 * @returns {string} V1 style query identifier.
 */
function v1QueryId(id) {
    switch (id) {
        case 'addq':
        case 'aliq':
        case 'locq':
            return id.substring(3);
        case 'lost':
            return id.substring(4);
        default:
            return id;
    }
}

/**
 * Parses the required header fields for the given SIP message.
 *
 * @param {string} logPrefix - The log prefix.
 * @param {string} sipMessage - The SIP message.
 * @param {string[]} headers - The header fields to be parsed.
 * @returns {object} Object with parsed header fields.
 */
function parseSipHeaders(logPrefix, sipMessage, headers) {
    try {
        return esappSip.parseHeaders(sipMessage, headers);
    } catch (err) {
        logger.error(logPrefix, 'Failed to parse');
        return {};
    }
}

/**
 * @returns {true}
 */
function quux () {
  try {
  } catch (error) {
  } finally {
    return true;
  }
}

/** Returns true.
 *
 * @returns {boolean} true
 */
function getTrue() {
  try {
    return true;
  } finally {
    console.log('returning...');
  }
}

/**
 * Maybe return a boolean.
 * @returns {boolean|void} true, or undefined.
 */
function maybeTrue() {
  if (Math.random() > 0.5) {
    return true;
  }
}

/**
 * @param {AST} astNode
 * @returns {AST}
 */
const getTSFunctionComment = function (astNode) {
  switch (greatGrandparent.type) {
  case 'VariableDeclarator':
    if (greatGreatGrandparent.type === 'VariableDeclaration') {
      return greatGreatGrandparent;
    }

  default:
    return astNode;
  }
};

const f =
  /**
   * Description.
   *
   * @returns Result.
   */
  () => {
    return function () {};
  };

/**
 * Description.
 *
 * @returns Result.
 */
export function f(): string {
  return "";

  interface I {}
}

/**
 * @param {boolean} bar A fun variable.
 * @returns {*} Anything at all!
 */
function foo( bar ) {
  if ( bar ) {
    return functionWithUnknownReturnType();
  }
}

/**
 * @returns Baz.
 */
function foo() {
    switch (true) {
        default:
            switch (false) {
                default: return;
            }
            return "baz";
    }
};

/**
 * @returns Baz.
 */
function foo() {
    switch (true) {
        default:
            switch (false) {
                default: return;
            }
            return "baz";
    }
};

/**
 * @returns
 */
const quux = (someVar) => {
  if (someVar) {
    return true;
  }
};

/**
 * @returns {number}
 */
function foo() {
  while (true) {
    const n = Math.random();
    if (n < 0.5) {
      return n;
    }
  }
}
````

