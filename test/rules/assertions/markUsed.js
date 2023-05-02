export default {
  invalid: [],
  valid: [
    // {
    //   code: `
    //     const foo = "bar";
    //     /** This thing uses {@link foo} for something */
    //   `,
    //   /*
    //   rules: {
    //     'no-unused-vars': 'error',
    //   },
    //   */
    // },
    {
      code: `
        class Foo {}
        /** @param {Foo} */
        function foo() {}
        foo();
      `,
      rules: {
        'no-unused-vars': 'error',
      },
    },
    {
      code: `
        class Foo {}
        /** @returns {Foo} */
        function foo() {}
        foo();
      `,
      rules: {
        'no-unused-vars': 'error',
      },
    },
    {
      code: `
        class Foo {}
        class Bar {}
        class Baz {}
        class Qux {}
        /** @type {(!Foo|?Bar|...Baz|Qux[]|foo=|obj["level1"]|{Foo?: Foo}|function(this:Foo))|external:something} */
        let foo = null;
      `,
      rules: {
        'no-unused-vars': 'error',
      },
    },
    {
      code: `
        class Foo {}
        /** @type {typeof foo|import("some-package")|new(number, string): Foo|foo is Foo|{foo: Foo}} */
        let foo = null;
      `,
      rules: {
        'no-unused-vars': 'error',
      },
      settings: {
        jsdoc: {
          mode: 'typescript',
        },
      },
    },
  ],
};
