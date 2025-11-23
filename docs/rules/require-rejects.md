<a name="user-content-require-rejects"></a>
<a name="require-rejects"></a>
# <code>require-rejects</code>

Requires a (non-standard) `@rejects` tag be added for detectable `Promise`
rejections.

<a name="user-content-require-rejects-options"></a>
<a name="require-rejects-options"></a>
## Options

A single options object has the following properties.

<a name="user-content-require-rejects-options-contexts"></a>
<a name="require-rejects-options-contexts"></a>
### <code>contexts</code>

Set this to an array of strings representing the AST context
(or objects with optional `context` and `comment` properties) where you wish
the rule to be applied.

`context` defaults to `any` and `comment` defaults to no specific comment context.

Overrides the default contexts (`ArrowFunctionExpression`, `FunctionDeclaration`,
`FunctionExpression`).

<a name="user-content-require-rejects-options-exemptedby"></a>
<a name="require-rejects-options-exemptedby"></a>
### <code>exemptedBy</code>

Array of tags (e.g., `['type']`) whose presence on the
document block avoids the need for a `@rejects`. Defaults to an array
with `abstract`, `virtual`, and `type`. If you set this array, it will overwrite the default,
so be sure to add back those tags if you wish their presence to cause
exemption of the rule.


|||
|---|---|
|Context|everywhere|
|Tags|``|
|Recommended|false|
|Settings||
|Options|`contexts`, `exemptedBy`|

<a name="user-content-require-rejects-failing-examples"></a>
<a name="require-rejects-failing-examples"></a>
## Failing examples

The following patterns are considered problems:

````ts
/**
 *
 */
async function quux () {
  throw new Error('abc');
}
// Message: Promise-rejecting function requires `@reject` tag

/**
 *
 */
const quux = async () => {
  throw new Error('abc');
};
// Message: Promise-rejecting function requires `@reject` tag

/**
 *
 */
const quux = async function () {
  throw new Error('abc');
};
// Message: Promise-rejecting function requires `@reject` tag

/**
 *
 */
async function quux () {
  try {
    await sthAsync();
  } catch (err) {
    if (cond) {
      throw err;
    }
  }
}
// Message: Promise-rejecting function requires `@reject` tag

/**
 *
 */
function quux () {
  return new Promise((resolve, reject) => {
    reject(new Error('abc'));
  });
}
// Message: Promise-rejecting function requires `@reject` tag

/**
 *
 */
async function quux () {
  if (cond) {
    throw new Error('abc');
  }
}
// Message: Promise-rejecting function requires `@reject` tag

/**
 *
 */
async function quux () {
  function inner () {
    if (cond) {
      throw new Error('abc');
    }
  }
  inner();
}
// Message: Promise-rejecting function requires `@reject` tag

/**
 *
 */
async function quux () {
  return Promise.reject(new Error('abc'));
}
// Message: Promise-rejecting function requires `@reject` tag

/**
 *
 */
function quux () {
  if (cond) {
    return Promise.reject(new Error('abc'));
  }
}
// Message: Promise-rejecting function requires `@reject` tag

/**
 *
 */
async function quux () {
  for (let i = 0; i < 10; i++) {
    if (i > 5) {
      throw new Error('abc');
    }
  }
}
// Message: Promise-rejecting function requires `@reject` tag

/**
 *
 */
async function quux () {
  while (cond) {
    throw new Error('abc');
  }
}
// Message: Promise-rejecting function requires `@reject` tag

/**
 *
 */
async function quux () {
  switch (val) {
    case 1:
      throw new Error('abc');
    case 2:
      break;
  }
}
// Message: Promise-rejecting function requires `@reject` tag

/**
 *
 */
async function quux () {
  const arr = [1, 2, 3];
  for (const item of arr) {
    if (item > 2) {
      throw new Error('abc');
    }
  }
}
// Message: Promise-rejecting function requires `@reject` tag

/**
 *
 */
async function quux () {
  const obj = {a: 1, b: 2};
  for (const key in obj) {
    if (key === 'a') {
      throw new Error('abc');
    }
  }
}
// Message: Promise-rejecting function requires `@reject` tag

/**
 *
 */
async function quux () {
  do {
    throw new Error('abc');
  } while (cond);
}
// Message: Promise-rejecting function requires `@reject` tag

/**
 *
 */
async function quux () {
  label: {
    throw new Error('abc');
  }
}
// Message: Promise-rejecting function requires `@reject` tag

/**
 *
 */
async function quux () {
  try {
    doSomething();
  } finally {
    throw new Error('cleanup failed');
  }
}
// Message: Promise-rejecting function requires `@reject` tag
````



<a name="user-content-require-rejects-passing-examples"></a>
<a name="require-rejects-passing-examples"></a>
## Passing examples

The following patterns are not considered problems:

````ts
/**
 * @rejects {Error}
 */
async function quux () {
  throw new Error('abc');
}

/**
 * @abstract
 */
async function quux () {
  throw new Error('abc');
}

/**
 *
 */
function quux () {
  return 42;
}

/**
 *
 */
async function quux () {
  return await sthAsync();
}

/**
 *
 */
async function quux () {
  if (cond) {
    return;
  }
}

/**
 *
 */
async function quux () {
  const obj = new SomeClass();
}

/**
 *
 */
function quux () {
  const p = new Promise(someVariable);
}

/**
 *
 */
function quux () {
  return new Promise(someVariable);
}

/**
 *
 */
async function quux () {
  someFunction();
}

/**
 *
 */
async function quux () {
  try {
    doSomething();
  } catch (err) {
    console.error(err);
  }
}

/**
 *
 */
async function quux () {
  try {
    throw new Error('wholly caught');
  } catch (err) {
    console.error(err);
  }
}

/**
 *
 */
async function quux () {
  if (cond) {
    doSomething();
  } else {
    doOtherThing();
  }
}

/**
 * @callback MyCallback
 */
// "jsdoc/require-rejects": ["error"|"warn", {"contexts":["any"]}]

/**
 *
 */
async function quux () {
  throw new Error('abc');
}
// Settings: {"jsdoc":{"tagNamePreference":{"rejects":false}}}

/** @param bar Something. */
export function foo(bar: string): void {
  throw new Error(`some error: ${bar}`);
}
````

