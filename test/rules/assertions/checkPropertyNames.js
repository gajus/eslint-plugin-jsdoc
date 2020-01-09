// After `importMeta` no longer experimental, we can use this ESM
//   approach over `__dirname`?
// import {fileURLToPath} from 'url';
// import {join, dirname} from 'path';
// join(dirname(fileURLToPath(import.meta.url)), 'babel-eslint')

export default {
  invalid: [
    {
      code: `
          /**
           * @typedef (SomeType) SomeTypedef
           * @property Foo.Bar
           */
      `,
      errors: [
        {
          line: 4,
          message: '@property path declaration ("Foo.Bar") appears before any real property.',
        },
      ],
    },
    {
      code: `
          /**
           * @typedef (SomeType) SomeTypedef
           * @property foo
           * @property Foo.Bar
           */
      `,
      errors: [
        {
          line: 5,
          message: '@property path declaration ("Foo.Bar") root node name ("Foo") does not match previous real property name ("foo").',
        },
      ],
    },
    {
      code: `
          /**
           * Assign the project to a list of employees.
           * @typedef (SomeType) SomeTypedef
           * @property {string} employees[].name - The name of an employee.
           * @property {string} employees[].department - The employee's department.
           */
      `,
      errors: [
        {
          line: 5,
          message: '@property path declaration ("employees[].name") appears before any real property.',
        },
      ],
    },
    {
      code: `
          /**
           * Assign the project to a list of employees.
           * @typedef (SomeType) SomeTypedef
           * @property {string} employees[].name - The name of an employee.
           * @property {string} employees[].name - The employee's department.
           */
      `,
      errors: [
        {
          line: 6,
          message: 'Duplicate @property "employees[].name"',
        },
      ],
    },
    {
      code: `
          /**
           * Assign the project to a list of employees.
           * @typedef (SomeType) SomeTypedef
           * @property {string} employees[].name - The name of an employee.
           * @property {string} employees[].department - The employee's department.
           */
      `,
      errors: [
        {
          line: 5,
          message: '@property path declaration ("employees[].name") appears before any real property.',
        },
      ],
    },
    {
      code: `
          /**
           * Assign the project to a list of employees.
           * @typedef (SomeType) SomeTypedef
           * @property {string} employees[].name - The name of an employee.
           * @property {string} employees[].name - The employee's department.
           */
      `,
      errors: [
        {
          line: 6,
          message: 'Duplicate @property "employees[].name"',
        },
      ],
    },
    {
      code: `
          /**
           * @typedef (SomeType) SomeTypedef
           * @property foo
           * @property foo
           */
      `,
      errors: [
        {
          line: 5,
          message: 'Duplicate @property "foo"',
        },
      ],
      output: `
          /**
           * @typedef (SomeType) SomeTypedef
           * @property foo
           */
      `,
    },
    {
      code: `
          /**
           * @typedef (SomeType) SomeTypedef
           * @property cfg
           * @property cfg.foo
           * @property cfg.foo
           */
          function quux ({foo, bar}) {

          }
      `,
      errors: [
        {
          line: 6,
          message: 'Duplicate @property "cfg.foo"',
        },
      ],
    },
    {
      code: `
          /**
           * @typedef (SomeType) SomeTypedef
           * @property cfg
           * @property cfg.foo
           * @property [cfg.foo]
           * @property baz
           */
          function quux ({foo, bar}, baz) {

          }
      `,
      errors: [
        {
          line: 6,
          message: 'Duplicate @property "cfg.foo"',
        },
      ],
    },
    {
      code: `
          /**
           * @typedef (SomeType) SomeTypedef
           * @property cfg
           * @property cfg.foo
           * @property [cfg.foo="with a default"]
           * @property baz
           */
          function quux ({foo, bar}, baz) {

          }
      `,
      errors: [
        {
          line: 6,
          message: 'Duplicate @property "cfg.foo"',
        },
      ],
    },
    {
      code: `
          /**
           * @typedef (SomeType) SomeTypedef
           * @prop foo
           * @prop foo
           */
      `,
      errors: [
        {
          line: 5,
          message: 'Duplicate @prop "foo"',
        },
      ],
      output: `
          /**
           * @typedef (SomeType) SomeTypedef
           * @prop foo
           */
      `,
      settings: {
        jsdoc: {
          tagNamePreference: {
            property: 'prop',
          },
        },
      },
    },
    {
      code: `
          /**
           * @typedef (SomeType) SomeTypedef
           * @property foo
           */
      `,
      errors: [
        {
          line: 4,
          message: 'Unexpected tag `@property`',
        },
      ],
      settings: {
        jsdoc: {
          tagNamePreference: {
            property: false,
          },
        },
      },
    },
  ],
  valid: [
    {
      code: `
          /**
           *
           */
      `,
    },
    {
      code: `
          /**
           * @typedef (SomeType) SomeTypedef
           * @property foo
           */
      `,
    },
    {
      code: `
          /**
           * @typedef (SomeType) SomeTypedef
           * @prop foo
           */
      `,
    },
    {
      code: `
          /**
           * @typedef (SomeType) SomeTypedef
           * @property foo
           * @property bar
           */
      `,
    },
    {
      code: `
          /**
           * @typedef (SomeType) SomeTypedef
           * @property foo
           * @property foo.foo
           * @property bar
           */
      `,
    },
    {
      code: `
          /**
           * Assign the project to a list of employees.
           * @typedef (SomeType) SomeTypedef
           * @property {object[]} employees - The employees who are responsible for the project.
           * @property {string} employees[].name - The name of an employee.
           * @property {string} employees[].department - The employee's department.
           */
      `,
    },
    {
      code: `
          /**
           * @typedef (SomeType) SomeTypedef
           * @property {Error} error Exit code
           * @property {number} [code = 1] Exit code
           */
      `,
    },
    {
      code: `
          /**
           * @namespace (SomeType) SomeNamespace
           * @property {Error} error Exit code
           * @property {number} [code = 1] Exit code
           */
      `,
    },
    {
      code: `
          /**
           * @class
           * @property {Error} error Exit code
           * @property {number} [code = 1] Exit code
           */
          function quux (code = 1) {
            this.error = new Error('oops');
            this.code = code;
          }
      `,
    },
    {
      code: `
          /**
           * @typedef (SomeType) SomeTypedef
           * @property foo
           * @property foo.bar
           * @property foo.baz
           * @property bar
           */
      `,
    },
  ],
};
