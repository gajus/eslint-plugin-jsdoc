export default {
  invalid: [
    {
      code: `
        /** the  */
        let myValue = 3;
      `,
      errors: [
        {
          line: 2,
          message: 'This description only repeats the name it describes.',
        },
      ],
    },
    {
      code: `
        /** The user id. */
        let userId: string;
      `,
      errors: [
        {
          line: 2,
          message: 'This description only repeats the name it describes.',
        },
      ],
      parser: require.resolve('@typescript-eslint/parser'),
    },
    {
      code: `
        /** the my value */
        let myValue = 3;
      `,
      errors: [
        {
          line: 2,
          message: 'This description only repeats the name it describes.',
        },
      ],
    },
    {
      code: `
        /** value **/
        let myValue,
          count = 3;
      `,
      errors: [
        {
          line: 2,
          message: 'This description only repeats the name it describes.',
        },
      ],
    },
    {
      code: `
        let myValue,
          /** count **/
          count = 3;
      `,
      errors: [
        {
          line: 3,
          message: 'This description only repeats the name it describes.',
        },
      ],
    },
    {
      code: `
        /**
         * the foo.
         */
        function foo() {}
      `,
      errors: [
        {
          endLine: 4,
          line: 2,
          message: 'This description only repeats the name it describes.',
        },
      ],
    },
    {
      code: `
        /**
         * the value foo.
         */
        const value = function foo() {}
      `,
      errors: [
        {
          endLine: 4,
          line: 2,
          message: 'This description only repeats the name it describes.',
        },
      ],
    },
    {
      code: `
        const value = {
          /**
           * the  prop.
           */
          prop: true,
        }
      `,
      errors: [
        {
          line: 3,
          message: 'This description only repeats the name it describes.',
        },
      ],
    },
    {
      code: `
        /**
         * name
         */
        class Name {}
      `,
      errors: [
        {
          line: 2,
          message: 'This description only repeats the name it describes.',
        },
      ],
    },
    {
      code: `
        /**
         * abc def
         */
        const abc = class Def {}
      `,
      errors: [
        {
          line: 2,
          message: 'This description only repeats the name it describes.',
        },
      ],
    },
    {
      code: `
        class Abc {
          /** the abc def! */
          def;
        }
      `,
      errors: [
        {
          line: 3,
          message: 'This description only repeats the name it describes.',
        },
      ],
      parser: require.resolve('@typescript-eslint/parser'),
      parserOptions: {
        ecmaVersion: 2_022,
      },
    },
    {
      code: `
        const _ = class Abc {
          /** the abc def! */
          def;
        }
      `,
      errors: [
        {
          line: 3,
          message: 'This description only repeats the name it describes.',
        },
      ],
      parser: require.resolve('@typescript-eslint/parser'),
      parserOptions: {
        ecmaVersion: 2_022,
      },
    },
    {
      code: `
        class Abc {
          /** the abc def! */
          def() {};
        }
      `,
      errors: [
        {
          line: 3,
          message: 'This description only repeats the name it describes.',
        },
      ],
      parser: require.resolve('@typescript-eslint/parser'),
      parserOptions: {
        ecmaVersion: 2_022,
      },
    },
    {
      code: `
        class Abc {
          /** def */
          accessor def;
        }
      `,
      errors: [
        {
          line: 3,
          message: 'This description only repeats the name it describes.',
        },
      ],
      parser: require.resolve('@typescript-eslint/parser'),
      parserOptions: {
        ecmaVersion: 2_022,
      },
    },
    {
      code: `
        class Abc {
          /** def */
          def() {}
        }
      `,
      errors: [
        {
          line: 3,
          message: 'This description only repeats the name it describes.',
        },
      ],
      parser: require.resolve('@typescript-eslint/parser'),
      parserOptions: {
        ecmaVersion: 2_022,
      },
    },
    {
      code: `
        class Abc {
          /** def */
          abstract accessor def;
        }
      `,
      errors: [
        {
          line: 3,
          message: 'This description only repeats the name it describes.',
        },
      ],
      parser: require.resolve('@typescript-eslint/parser'),
      parserOptions: {
        ecmaVersion: 2_022,
      },
    },
    {
      code: `
        class Abc {
          /** def */
          abstract def();
        }
      `,
      errors: [
        {
          line: 3,
          message: 'This description only repeats the name it describes.',
        },
      ],
      parser: require.resolve('@typescript-eslint/parser'),
      parserOptions: {
        ecmaVersion: 2_022,
      },
    },
    {
      code: `
        class Abc {
          /** def */
          abstract def;
        }
      `,
      errors: [
        {
          line: 3,
          message: 'This description only repeats the name it describes.',
        },
      ],
      parser: require.resolve('@typescript-eslint/parser'),
      parserOptions: {
        ecmaVersion: 2_022,
      },
    },
    {
      code: `
        /** abc */
        namespace Abc {}
      `,
      errors: [
        {
          line: 2,
          message: 'This description only repeats the name it describes.',
        },
      ],
      parser: require.resolve('@typescript-eslint/parser'),
      parserOptions: {
        ecmaVersion: 2_022,
      },
    },
    {
      code: `
        class Abc {
          /** def */
          def();
          def() {}
        }
      `,
      errors: [
        {
          line: 3,
          message: 'This description only repeats the name it describes.',
        },
      ],
      parser: require.resolve('@typescript-eslint/parser'),
      parserOptions: {
        ecmaVersion: 2_022,
      },
    },
    {
      code: `
        /** abc */
        declare function abc();
      `,
      errors: [
        {
          line: 2,
          message: 'This description only repeats the name it describes.',
        },
      ],
      parser: require.resolve('@typescript-eslint/parser'),
      parserOptions: {
        ecmaVersion: 2_022,
      },
    },
    {
      code: `
        /** abc */
        enum Abc {}
      `,
      errors: [
        {
          line: 2,
          message: 'This description only repeats the name it describes.',
        },
      ],
      parser: require.resolve('@typescript-eslint/parser'),
      parserOptions: {
        ecmaVersion: 2_022,
      },
    },
    {
      code: `
        enum Abc {
          /** def */
          def,
        }
      `,
      errors: [
        {
          line: 3,
          message: 'This description only repeats the name it describes.',
        },
      ],
      parser: require.resolve('@typescript-eslint/parser'),
      parserOptions: {
        ecmaVersion: 2_022,
      },
    },
    {
      code: `
        /** def */
        interface Def {}
      `,
      errors: [
        {
          line: 2,
          message: 'This description only repeats the name it describes.',
        },
      ],
      parser: require.resolve('@typescript-eslint/parser'),
      parserOptions: {
        ecmaVersion: 2_022,
      },
    },
    {
      code: `
        /** def */
        type Def = {};
      `,
      errors: [
        {
          line: 2,
          message: 'This description only repeats the name it describes.',
        },
      ],
      parser: require.resolve('@typescript-eslint/parser'),
      parserOptions: {
        ecmaVersion: 2_022,
      },
    },
    {
      code: `
        /**
         * count
         *
         * @description the value
         */
        let value = 3;
      `,
      errors: [
        {
          line: 5,
          message: 'This tag description only repeats the name it describes.',
        },
      ],
    },
    {
      code: `
        /** @param {number} param - the param */
        function takesOne(param) {}
      `,
      errors: [
        {
          line: 2,
          message: 'This tag description only repeats the name it describes.',
        },
      ],
    },
    {
      code: `
        /** @other param - takes one */
        function takesOne(param) {}
      `,
      errors: [
        {
          line: 2,
          message: 'This tag description only repeats the name it describes.',
        },
      ],
    },
    {
      code: `
        /**
         * takes one
         * @other param - takes one
         */
        function takesOne(param) {}
      `,
      errors: [
        {
          line: 2,
          message: 'This description only repeats the name it describes.',
        },
        {
          line: 4,
          message: 'This tag description only repeats the name it describes.',
        },
      ],
    },
    {
      code: `
        /**
         * - takes one
         * @other param - takes one
         */
        function takesOne(param) {}
      `,
      errors: [
        {
          line: 2,
          message: 'This description only repeats the name it describes.',
        },
        {
          line: 4,
          message: 'This tag description only repeats the name it describes.',
        },
      ],
    },
  ],
  valid: [
    {
      code: `
        /**   */
        let myValue = 3;
      `,
    },
    {
      code: `
        /** count */
        let myValue = 3;
      `,
    },
    {
      code: `
        /** Informative info user id. */
        let userId: string;
      `,
      parser: require.resolve('@typescript-eslint/parser'),
    },
    {
      code: `
        let myValue,
          /** count value **/
          count = 3;
      `,
    },
    {
      code: `
        /**
         * Does X Y Z work.
         */
        function foo() {}
      `,
    },
    {
      code: `
        const value = {
          /**
           * the truthiness of the prop.
           */
          prop: true,
        }
      `,
    },
    {
      code: `
        const value = {
          /**
           * the truthiness of the prop.
           */
          ['prop']: true,
        }
      `,
    },
    {
      code: `
        /**
         * abc def ghi
         */
        const abc = function def() {}
      `,
    },
    {
      code: `
        /**
         * name extra
         */
        class Name {}
      `,
    },
    {
      code: `
        /**
         * abc name extra
         */
        const abc = class Name {}
      `,
    },
    {
      code: `
        class Abc {
          /** ghi */
          def;
        }
      `,
      parser: require.resolve('@typescript-eslint/parser'),
      parserOptions: {
        ecmaVersion: 2_022,
      },
    },
    {
      code: `
        class Abc {
          /** ghi */
          accessor def;
        }
      `,
      parser: require.resolve('@typescript-eslint/parser'),
      parserOptions: {
        ecmaVersion: 2_022,
      },
    },
    {
      code: `
        class Abc {
          /** ghi */
          def() {}
        }
      `,
      parser: require.resolve('@typescript-eslint/parser'),
      parserOptions: {
        ecmaVersion: 2_022,
      },
    },
    {
      code: `
        class Abc {
          /** ghi */
          abstract accessor def;
        }
      `,
      parser: require.resolve('@typescript-eslint/parser'),
      parserOptions: {
        ecmaVersion: 2_022,
      },
    },
    {
      code: `
        class Abc {
          /** ghi */
          abstract def();
        }
      `,
      parser: require.resolve('@typescript-eslint/parser'),
      parserOptions: {
        ecmaVersion: 2_022,
      },
    },
    {
      code: `
        class Abc {
          /** ghi */
          abstract def;
        }
      `,
      parser: require.resolve('@typescript-eslint/parser'),
      parserOptions: {
        ecmaVersion: 2_022,
      },
    },
    {
      code: `
        /** abc */
        namespace Def {}
      `,
      parser: require.resolve('@typescript-eslint/parser'),
      parserOptions: {
        ecmaVersion: 2_022,
      },
    },
    {
      code: `
        class Abc {
          /** ghi */
          def();
          def() {}
        }
      `,
      parser: require.resolve('@typescript-eslint/parser'),
      parserOptions: {
        ecmaVersion: 2_022,
      },
    },
    {
      code: `
        /** abc */
        declare function def();
      `,
      parser: require.resolve('@typescript-eslint/parser'),
      parserOptions: {
        ecmaVersion: 2_022,
      },
    },
    {
      code: `
        /** abc */
        enum Def {}
      `,
      parser: require.resolve('@typescript-eslint/parser'),
      parserOptions: {
        ecmaVersion: 2_022,
      },
    },
    {
      code: `
        enum Abc {
          /** def */
          ghi,
        }
      `,
      parser: require.resolve('@typescript-eslint/parser'),
      parserOptions: {
        ecmaVersion: 2_022,
      },
    },
    {
      code: `
        /** abc */
        interface Def {}
      `,
      parser: require.resolve('@typescript-eslint/parser'),
      parserOptions: {
        ecmaVersion: 2_022,
      },
    },
    {
      code: `
        /** abc */
        type Def = {};
      `,
      parser: require.resolve('@typescript-eslint/parser'),
      parserOptions: {
        ecmaVersion: 2_022,
      },
    },
    {
      code: `
        /** abc */
        type Def = {};
      `,
      parser: require.resolve('@typescript-eslint/parser'),
      parserOptions: {
        ecmaVersion: 2_022,
      },
    },
    {
      code: `
        /**
         * count
         *
         * @description increment value
         */
        let value = 3;
      `,
    },
    {
      code: `
        /**
         * count
         *
         * @unknownTag - increment value
         */
        let value = 3;
      `,
    },
    {
      code: `
        /**
         * @other param - takes one two
         */
        function takesOne(param) {}
      `,
    },
    {
      code: `
        /**
         * takes abc param
         */
        function takesOne(param) {}
      `,
    },
  ],
};
