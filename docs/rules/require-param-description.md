<a name="require-param"></a>
# <code>require-param</code>

* [`require-param`](#require-param)
    * [Options](#require-param-options)
    * [Fixer](#require-param-fixer)
    * [Context and settings](#require-param-context-and-settings)
    * [Failing examples](#require-param-failing-examples)
    * [Passing examples](#require-param-passing-examples)


Requires that all function parameters are documented.

<a name="require-param-options"></a>
## Options

An options object accepts one optional property:

- `exemptedBy` - Array of tags (e.g., `['type']`) whose presence on the document
    block avoids the need for a `@param`. Defaults to an empty array.

<a name="require-param-fixer"></a>
## Fixer

(Todo)

<a name="require-param-context-and-settings"></a>
## Context and settings

|||
|---|---|
|Context|`ArrowFunctionExpression`, `FunctionDeclaration`, `FunctionExpression`|
|Tags|`param`|
|Aliases|`arg`, `argument`|
|Options|`exemptedBy`|
|Settings|`overrideReplacesDocs`, `augmentsExtendsReplacesDocs`, `implementsReplacesDocs`|

<a name="require-param-failing-examples"></a>
## Failing examples

The following patterns are considered problems:

````js
/**
 *
 */
function quux (foo) {

}
// Message: Missing JSDoc @param "foo" declaration.

/**
 *
 */
function quux (foo, bar) {

}
// Message: Missing JSDoc @param "foo" declaration.

/**
 * @param foo
 */
function quux (foo, bar) {

}
// Message: Missing JSDoc @param "bar" declaration.

/**
 * @param bar
 */
function quux (foo, bar, baz) {

}
// Message: Missing JSDoc @param "foo" declaration.

/**
 * @param foo
 * @param bar
 */
function quux (foo, bar, baz) {

}
// Message: Missing JSDoc @param "baz" declaration.

/**
 * @param baz
 */
function quux (foo, bar, baz) {

}
// Message: Missing JSDoc @param "foo" declaration.

/**
 * @param
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"tagNamePreference":{"param":"arg"}}}
// Message: Missing JSDoc @arg "foo" declaration.

/**
 * @param foo
 */
function quux (foo, bar) {

}
// Message: Missing JSDoc @param "bar" declaration.

/**
 * @override
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"overrideReplacesDocs":false}}
// Message: Missing JSDoc @param "foo" declaration.

/**
 * @implements
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"implementsReplacesDocs":false}}
// Message: Missing JSDoc @param "foo" declaration.

/**
 * @augments
 */
function quux (foo) {

}
// Message: Missing JSDoc @param "foo" declaration.

/**
 * @extends
 */
function quux (foo) {

}
// Message: Missing JSDoc @param "foo" declaration.

/**
 * @override
 */
class A {
  /**
    *
    */
  quux (foo) {

  }
}
// Settings: {"jsdoc":{"overrideReplacesDocs":false}}
// Message: Missing JSDoc @param "foo" declaration.

/**
 * @implements
 */
class A {
  /**
   *
   */
  quux (foo) {

  }
}
// Settings: {"jsdoc":{"implementsReplacesDocs":false}}
// Message: Missing JSDoc @param "foo" declaration.

/**
 * @augments
 */
class A {
  /**
   *
   */
  quux (foo) {

  }
}
// Message: Missing JSDoc @param "foo" declaration.

/**
 * @extends
 */
class A {
  /**
   *
   */
  quux (foo) {

  }
}
// Message: Missing JSDoc @param "foo" declaration.

export class SomeClass {
  /**
   * @param property
   */
  constructor(private property: string, private foo: number) {}
}
// Message: Missing JSDoc @param "foo" declaration.

/**
 * @param
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"tagNamePreference":{"param":false}}}
// Message: Unexpected tag `@param`

/**
 *
 */
function quux ({bar, baz}, foo) {
}
// Message: Missing JSDoc @param "foo" declaration.

/**
 *
 */
function quux (foo, {bar, baz}) {
}
// Message: Missing JSDoc @param "foo" declaration.

/**
 *
 */
function quux ([bar, baz], foo) {
}
// Message: Missing JSDoc @param "foo" declaration.

/**
 *
 */
function quux (foo) {
}
// Options: [{"exemptedBy":["notPresent"]}]
// Message: Missing JSDoc @param "foo" declaration.

/**
 * Assign the project to a list of employees.
 * @param {object[]} employees - The employees who are responsible for the project.
 * @param {string} employees[].name - The name of an employee.
 * @param {string} employees[].department - The employee's department.
 */
function assign (employees, name) {

};
// Message: Missing JSDoc @param "name" declaration.
````


<a name="require-param-passing-examples"></a>
## Passing examples

The following patterns are not considered problems:

````js
/**
 * @param foo
 */
function quux (foo) {

}

/**
 * @inheritdoc
 */
function quux (foo) {

}

/**
 * @arg foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"tagNamePreference":{"param":"arg"}}}

/**
 * @override
 * @param foo
 */
function quux (foo) {

}

/**
 * @override
 */
function quux (foo) {

}

/**
 * @override
 */
class A {
  /**
    *
    */
  quux (foo) {

  }
}

/**
 * @override
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"overrideReplacesDocs":true}}

/**
 * @implements
 */
class A {
  /**
   *
   */
  quux (foo) {

  }
}

/**
 * @implements
 */
function quux (foo) {

}

/**
 * @implements
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"implementsReplacesDocs":true}}

/**
 * @implements
 * @param foo
 */
function quux (foo) {

}

/**
 * @augments
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"augmentsExtendsReplacesDocs":true}}

/**
 * @augments
 * @param foo
 */
function quux (foo) {

}

/**
 * @extends
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"augmentsExtendsReplacesDocs":true}}

/**
 * @extends
 * @param foo
 */
function quux (foo) {

}

/**
 * @augments
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"augmentsExtendsReplacesDocs":true}}

/**
 * @extends
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"augmentsExtendsReplacesDocs":true}}

/**
 * @override
 */
class A {
  /**
  * @param foo
  */
  quux (foo) {

  }
}

/**
 * @override
 */
class A {
  /**
   *
   */
  quux (foo) {

  }
}
// Settings: {"jsdoc":{"overrideReplacesDocs":true}}

/**
 * @implements
 */
class A {
  /**
   *
   */
  quux (foo) {

  }
}
// Settings: {"jsdoc":{"implementsReplacesDocs":true}}

/**
 * @implements
 */
class A {
  /**
   * @param foo
   */
  quux (foo) {

  }
}

/**
 * @augments
 */
class A {
  /**
   *
   */
  quux (foo) {

  }
}
// Settings: {"jsdoc":{"augmentsExtendsReplacesDocs":true}}

/**
 * @augments
 */
class A {
  /**
   * @param foo
   */
  quux (foo) {

  }
}

/**
 * @extends
 */
class A {
  /**
   *
   */
  quux (foo) {

  }
}
// Settings: {"jsdoc":{"augmentsExtendsReplacesDocs":true}}

/**
 * @extends
 */
class A {
  /**
   * @param foo
   */
  quux (foo) {

  }
}

/**
 * @augments
 */
class A {
  /**
   *
   */
  quux (foo) {

  }
}
// Settings: {"jsdoc":{"augmentsExtendsReplacesDocs":true}}

/**
 * @extends
 */
class A {
  /**
   *
   */
  quux (foo) {

  }
}
// Settings: {"jsdoc":{"augmentsExtendsReplacesDocs":true}}

/**
 * @private
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"ignorePrivate":true}}

/**
 * @access private
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"ignorePrivate":true}}

// issue 182: optional chaining
/** @const {boolean} test */
const test = something?.find(_ => _)

/** @type {RequestHandler} */
function foo(req, res, next) {}

/**
 * @type {MyCallback}
 */
function quux () {

}
// Options: [{"exemptedBy":["type"]}]

/**
 * @override
 */
var A = class {
  /**
    *
    */
  quux (foo) {

  }
}

export class SomeClass {
  /**
   * @param property
   */
  constructor(private property: string) {}
}

/**
 * Assign the project to an employee.
 *
 * @param {object} employee - The employee who is responsible for the project.
 * @param {string} employee.name - The name of the employee.
 * @param {string} employee.department - The employee's department.
 */
function assign({name, department}) {
  // ...
}

export abstract class StephanPlugin<O, D> {

    /**
     * Called right after Stephan loads the plugin file.
     *
     * @example
     *```typescript
     * type Options = {
     *      verbose?: boolean;
     *      token?: string;
     * }
     * ```
     *
     * Note that your Options type should only have optional properties...
     *
     * @param args Arguments compiled and provided by StephanClient.
     * @param args.options The options as provided by the user, or an empty object if not provided.
     * @param defaultOptions The default options as provided by the plugin, or an empty object.
     */
    public constructor({options, client}: {
        options: O;
        client: unknown;
    }, defaultOptions: D) {

    }
}
````

