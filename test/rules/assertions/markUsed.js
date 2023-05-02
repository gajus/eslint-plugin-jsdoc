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
        /** @type {(!Foo|?Bar|...Baz|Qux[]|foo=)} */
        let foo = null;
      `,
      rules: {
        'no-unused-vars': 'error',
      },
    },
  ],
};
