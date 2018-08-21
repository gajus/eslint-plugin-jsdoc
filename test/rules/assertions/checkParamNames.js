/* eslint-disable no-restricted-syntax */

export default {
  invalid: [
    {
      code: `
          /**
           * @param Foo
           */
          function quux (foo = 'FOO') {

          }
      `,
      errors: [
        {
          message: 'Expected @param name to be "foo". Got "Foo".'
        }
      ]
    },
    {
      code: `
          /**
           * @arg Foo
           */
          function quux (foo = 'FOO') {

          }
      `,
      errors: [
        {
          message: 'Expected @arg name to be "foo". Got "Foo".'
        }
      ],
      settings: {
        jsdoc: {
          tagNamePreference: {
            param: 'arg'
          }
        }
      }
    },
    {
      code: `
          /**
           * @param Foo
           */
          function quux (foo) {

          }
      `,
      errors: [
        {
          message: 'Expected @param name to be "foo". Got "Foo".'
        }
      ]
    },
    {
      code: `
          /**
           * @param Foo.Bar
           */
          function quux (foo) {

          }
      `,
      errors: [
        {
          message: '@param path declaration "Foo.Bar" requires previous definition of "Foo".'
        }
      ]
    },
    {
      code: `
          /**
           * @param foo
           * @param Foo.Bar
           */
          function quux (foo) {

          }
      `,
      errors: [
        {
          message: '@param path declaration "Foo.Bar" requires previous definition of "Foo".'
        }
      ]
    },
    {
      code: `
          /**
           * @param foo
           * @param foo.bar
           * @param bar
           */
          function quux (bar, foo) {

          }
      `,
      errors: [
        {
          message: 'Expected @param name to be "bar". Got "foo".'
        },
        {
          message: 'Expected @param name to be "foo". Got "bar".'
        }
      ]
    },
    {
      code: `
          /**
           * @param foo
           * @param bar
           */
          function quux (foo) {

          }
      `,
      errors: [
        {
          message: '@param "bar" does not match an existing function parameter.'
        }
      ]
    },
    {
      code: `
          /**
           * @param first
           * @param baz
           */
          function quux ({foo, bar}) {

          }
      `,
      errors: [
        {
          message: '@param "baz" does not match an existing function parameter.'
        }
      ]
    },
    {
      code: `
          /**
           * @param first
           * @param first.foo
           * @param first.baz
           */
          function quux ({foo, bar}) {

          }
      `,
      errors: [
        {
          message: 'Expected @param name to be "first.bar". Got "first.baz".'
        }
      ]
    }
  ],
  valid: [
    {
      code: `
          /**
           *
           */
          function quux (foo) {

          }
      `
    },
    {
      code: `
          /**
           * @param foo
           */
          function quux (foo) {

          }
      `
    },
    {
      code: `
          /**
           * @param foo
           * @param bar
           */
          function quux (foo, bar) {

          }
      `
    },
    {
      code: `
          /**
           * @param foo
           * @param bar
           */
          function quux (foo, bar, baz) {

          }
      `
    },
    {
      code: `
          /**
           * @param foo
           * @param foo.foo
           * @param bar
           */
          function quux (foo, bar) {

          }
      `
    },
    {
      code: `
          /**
           * @param args
           */
          function quux (...args) {

          }
      `
    },
    {
      code: `
          /**
           * @param foo
           */
          function quux ({a, b}) {

          }
      `
    },
    {
      code: `
          /**
           * @param foo
           */
          function quux ({a, b} = {}) {

          }
      `
    },
    {
      code: `
          /**
           * @param first
           * @param first.foo
           * @param first.bar
           */
          function quux ({foo, bar}) {

          }
      `,
    }
  ]
};
