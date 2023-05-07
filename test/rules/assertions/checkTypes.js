export default {
  invalid: [
    {
      code: `
          /**
           * @param {abc} foo
           */
          function quux (foo) {

          }
      `,
      errors: [
        {
          line: 1,
          message: 'Invalid `settings.jsdoc.preferredTypes`. Values must be falsy, a string, or an object.',
        },
      ],
      settings: {
        jsdoc: {
          preferredTypes: {
            abc: 100,
          },
        },
      },
    },
    {
      code: `
          /**
           * @param {abc} foo
           */
          function quux (foo) {

          }
      `,
      errors: [
        {
          line: 1,
          message: 'Invalid `settings.jsdoc.preferredTypes`. Values must be falsy, a string, or an object.',
        },
      ],
      ignoreReadme: true,
      settings: {
        jsdoc: {
          mode: 'permissive',
          preferredTypes: {
            abc: 100,
          },
        },
      },
    },
    {
      code: `
          /**
           * @param {Number} foo
           */
          function quux (foo) {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Invalid JSDoc @param "foo" type "Number"; prefer: "number".',
        },
      ],
      output: `
          /**
           * @param {number} foo
           */
          function quux (foo) {

          }
      `,
    },
    {
      code: `
          /**
           * @arg {Number} foo
           */
          function quux (foo) {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Invalid JSDoc @arg "foo" type "Number"; prefer: "number".',
        },
      ],
      output: `
          /**
           * @arg {number} foo
           */
          function quux (foo) {

          }
      `,
    },
    {
      code: `
          /**
           * @returns {Number} foo
           * @throws {Number} foo
           */
          function quux () {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Invalid JSDoc @returns type "Number"; prefer: "number".',
        },
        {
          line: 4,
          message: 'Invalid JSDoc @throws type "Number"; prefer: "number".',
        },
      ],
      output: `
          /**
           * @returns {number} foo
           * @throws {Number} foo
           */
          function quux () {

          }
      `,
    },
    {
      code: `
          /**
           * @param {(Number | string | Boolean)=} foo
           */
          function quux (foo, bar, baz) {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Invalid JSDoc @param "foo" type "Number"; prefer: "number".',
        },
        {
          line: 3,
          message: 'Invalid JSDoc @param "foo" type "Boolean"; prefer: "boolean".',
        },
      ],
      output: `
          /**
           * @param {(number | string | boolean)=} foo
           */
          function quux (foo, bar, baz) {

          }
      `,
    },
    {
      code: `
          /**
           * @param {Array.<Number | String>} foo
           */
          function quux (foo, bar, baz) {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Invalid JSDoc @param "foo" type "Number"; prefer: "number".',
        },
        {
          line: 3,
          message: 'Invalid JSDoc @param "foo" type "String"; prefer: "string".',
        },
      ],
      output: `
          /**
           * @param {Array.<number | string>} foo
           */
          function quux (foo, bar, baz) {

          }
      `,
    },
    {
      code: `
          /**
           * @param {(Number | String)[]} foo
           */
          function quux (foo, bar, baz) {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Invalid JSDoc @param "foo" type "Number"; prefer: "number".',
        },
        {
          line: 3,
          message: 'Invalid JSDoc @param "foo" type "String"; prefer: "string".',
        },
      ],
      output: `
          /**
           * @param {(number | string)[]} foo
           */
          function quux (foo, bar, baz) {

          }
      `,
    },
    {
      code: `
          /**
           * @param {abc} foo
           */
          function qux(foo) {
          }
      `,
      errors: [
        {
          line: 3,
          message: 'Invalid JSDoc @param "foo" type "abc"; prefer: "Abc".',
        },
      ],
      output: `
          /**
           * @param {Abc} foo
           */
          function qux(foo) {
          }
      `,
      settings: {
        jsdoc: {
          preferredTypes: {
            abc: 'Abc',
            string: 'Str',
          },
        },
      },
    },
    {
      code: `
          /**
           * @param {abc} foo
           */
          function qux(foo) {
          }
      `,
      errors: [
        {
          line: 3,
          message: 'Invalid JSDoc @param "foo" type "abc"; prefer: "Abc".',
        },
      ],
      output: `
          /**
           * @param {Abc} foo
           */
          function qux(foo) {
          }
      `,
      settings: {
        jsdoc: {
          preferredTypes: {
            abc: {
              replacement: 'Abc',
            },
            string: 'Str',
          },
        },
      },
    },
    {
      code: `
          /**
           * @param {abc} foo
           */
          function qux(foo) {
          }
      `,
      errors: [
        {
          line: 3,
          message: 'Messed up JSDoc @param "foo" type "abc"; prefer: "Abc".',
        },
      ],
      output: `
          /**
           * @param {Abc} foo
           */
          function qux(foo) {
          }
      `,
      settings: {
        jsdoc: {
          preferredTypes: {
            abc: {
              message: 'Messed up JSDoc @{{tagName}}{{tagValue}} type "abc"; prefer: "Abc".',
              replacement: 'Abc',
            },
            string: 'Str',
          },
        },
      },
    },
    {
      code: `
          /**
           * @param {abc} foo
           * @param {cde} bar
           * @param {object} baz
           */
          function qux(foo, bar, baz) {
          }
      `,
      errors: [
        {
          line: 3,
          message: 'Messed up JSDoc @param "foo" type "abc"; prefer: "Abc".',
        },
        {
          line: 4,
          message: 'More messed up JSDoc @param "bar" type "cde"; prefer: "Cde".',
        },
        {
          line: 5,
          message: 'Invalid JSDoc @param "baz" type "object"; prefer: "Object".',
        },
      ],
      output: `
          /**
           * @param {Abc} foo
           * @param {cde} bar
           * @param {object} baz
           */
          function qux(foo, bar, baz) {
          }
      `,
      settings: {
        jsdoc: {
          preferredTypes: {
            abc: {
              message: 'Messed up JSDoc @{{tagName}}{{tagValue}} type "abc"; prefer: "Abc".',
              replacement: 'Abc',
            },
            cde: {
              message: 'More messed up JSDoc @{{tagName}}{{tagValue}} type "cde"; prefer: "Cde".',
              replacement: 'Cde',
            },
            object: 'Object',
          },
        },
      },
    },
    {
      code: `
          /**
           * @param {abc} foo
           */
          function qux(foo) {
          }
      `,
      errors: [
        {
          line: 3,
          message: 'Messed up JSDoc @param "foo" type "abc".',
        },
      ],
      settings: {
        jsdoc: {
          preferredTypes: {
            abc: {
              message: 'Messed up JSDoc @{{tagName}}{{tagValue}} type "abc".',
              replacement: false,
            },
            string: 'Str',
          },
        },
      },
    },
    {
      code: `
          /**
           * @param {abc} foo
           */
          function qux(foo) {
          }
      `,
      errors: [
        {
          line: 3,
          message: 'Messed up JSDoc @param "foo" type "abc".',
        },
      ],
      settings: {
        jsdoc: {
          preferredTypes: {
            abc: {
              message: 'Messed up JSDoc @{{tagName}}{{tagValue}} type "abc".',
            },
            string: 'Str',
          },
        },
      },
    },
    {
      code: `
          /**
           * @param {abc} foo
           * @param {Number} bar
           */
          function qux(foo, bar) {
          }
      `,
      errors: [
        {
          line: 3,
          message: 'Invalid JSDoc @param "foo" type "abc"; prefer: "Abc".',
        },
      ],
      options: [
        {
          noDefaults: true,
        },
      ],
      output: `
          /**
           * @param {Abc} foo
           * @param {Number} bar
           */
          function qux(foo, bar) {
          }
      `,
      settings: {
        jsdoc: {
          preferredTypes: {
            abc: 'Abc',
            string: 'Str',
          },
        },
      },
    },
    {
      code: `
          /**
           * @param {abc} foo
           * @param {Number} bar
           */
          function qux(foo, bar) {
          }
      `,
      errors: [
        {
          line: 3,
          message: 'Invalid JSDoc @param "foo" type "abc"; prefer: "Abc".',
        },
        {
          line: 4,
          message: 'Invalid JSDoc @param "bar" type "Number"; prefer: "number".',
        },
      ],
      output: `
          /**
           * @param {Abc} foo
           * @param {Number} bar
           */
          function qux(foo, bar) {
          }
      `,
      settings: {
        jsdoc: {
          preferredTypes: {
            abc: 'Abc',
            string: 'Str',
          },
        },
      },
    },
    {
      code: `
          /**
           * @param {abc} foo
           */
          function qux(foo) {
          }
      `,
      errors: [
        {
          line: 3,
          message: 'Invalid JSDoc @param "foo" type "abc".',
        },
      ],
      settings: {
        jsdoc: {
          preferredTypes: {
            abc: false,
            string: 'Str',
          },
        },
      },
    },
    {
      code: `
          /**
           * @param {abc} foo
           */
          function qux(foo) {
          }
      `,
      errors: [
        {
          line: 3,
          message: 'Invalid JSDoc @param "foo" type "abc".',
        },
      ],
      settings: {
        jsdoc: {
          preferredTypes: {
            abc: false,
          },
        },
      },
    },
    {
      code: `
          /**
           * @param {*} baz
           */
          function qux(baz) {
          }
      `,
      errors: [
        {
          line: 3,
          message: 'Invalid JSDoc @param "baz" type "*".',
        },
      ],
      output: `
          /**
           * @param {*} baz
           */
          function qux(baz) {
          }
      `,
      settings: {
        jsdoc: {
          preferredTypes: {
            '*': false,
            abc: 'Abc',
            string: 'Str',
          },
        },
      },
    },
    {
      code: `
          /**
           * @param {*} baz
           */
          function qux(baz) {
          }
      `,
      errors: [
        {
          line: 3,
          message: 'Invalid JSDoc @param "baz" type "*"; prefer: "aaa".',
        },
      ],
      output: `
          /**
           * @param {aaa} baz
           */
          function qux(baz) {
          }
      `,
      settings: {
        jsdoc: {
          preferredTypes: {
            '*': 'aaa',
            abc: 'Abc',
            string: 'Str',
          },
        },
      },
    },
    {
      code: `
          /**
           * @param {abc} foo
           * @param {Number} bar
           */
          function qux(foo, bar) {
          }
      `,
      errors: [
        {
          line: 3,
          message: 'Invalid JSDoc @param "foo" type "abc"; prefer: "Abc".',
        },
        {
          line: 4,
          message: 'Invalid JSDoc @param "bar" type "Number"; prefer: "number".',
        },
      ],
      output: `
          /**
           * @param {Abc} foo
           * @param {Number} bar
           */
          function qux(foo, bar) {
          }
      `,
      settings: {
        jsdoc: {
          preferredTypes: {
            abc: 'Abc',
            string: 'Str',
          },
        },
      },
    },
    {
      code: `
      /**
       * @param {Array} foo
       */
      function quux (foo) {

      }
      `,
      errors: [
        {
          line: 3,
          message: 'Invalid JSDoc @param "foo" type "Array"; prefer: "GenericArray".',
        },
      ],
      output: `
      /**
       * @param {GenericArray} foo
       */
      function quux (foo) {

      }
      `,
      settings: {
        jsdoc: {
          preferredTypes: {
            Array: 'GenericArray',
          },
        },
      },
    },
    {
      code: `
      /**
       * @param {Array} foo
       */
      function quux (foo) {

      }
      `,
      errors: [
        {
          line: 3,
          message: 'Invalid JSDoc @param "foo" type "Array"; prefer: "GenericArray".',
        },
      ],
      output: `
      /**
       * @param {GenericArray} foo
       */
      function quux (foo) {

      }
      `,
      settings: {
        jsdoc: {
          preferredTypes: {
            Array: 'GenericArray',
            'Array.<>': 'GenericArray',
          },
        },
      },
    },
    {
      code: `
      /**
       * @param {Array.<string>} foo
       */
      function quux (foo) {

      }
      `,
      errors: [
        {
          line: 3,
          message: 'Invalid JSDoc @param "foo" type "Array"; prefer: "GenericArray".',
        },
      ],
      output: `
      /**
       * @param {GenericArray.<string>} foo
       */
      function quux (foo) {

      }
      `,
      settings: {
        jsdoc: {
          preferredTypes: {
            'Array.<>': 'GenericArray',
          },
        },
      },
    },
    {
      code: `
      /**
       * @param {Array<string>} foo
       */
      function quux (foo) {

      }
      `,
      errors: [
        {
          line: 3,
          message: 'Invalid JSDoc @param "foo" type "Array"; prefer: "GenericArray".',
        },
      ],
      output: `
      /**
       * @param {GenericArray<string>} foo
       */
      function quux (foo) {

      }
      `,
      settings: {
        jsdoc: {
          preferredTypes: {
            'Array<>': 'GenericArray',
          },
        },
      },
    },
    {
      code: `
      /**
       * @param {string[]} foo
       */
      function quux (foo) {

      }
      `,
      errors: [
        {
          line: 3,
          message: 'Invalid JSDoc @param "foo" type "[]"; prefer: "SpecialTypeArray".',
        },
      ],
      output: `
      /**
       * @param {SpecialTypeArray<string>} foo
       */
      function quux (foo) {

      }
      `,
      settings: {
        jsdoc: {
          preferredTypes: {
            '[]': 'SpecialTypeArray',
          },
        },
      },
    },
    {
      code: `
      /**
       * @param {string[]} foo
       */
      function quux (foo) {

      }
      `,
      errors: [
        {
          line: 3,
          message: 'Invalid JSDoc @param "foo" type "[]"; prefer: "SpecialTypeArray".',
        },
      ],
      options: [
        {
          unifyParentAndChildTypeChecks: true,
        },
      ],
      output: `
      /**
       * @param {SpecialTypeArray<string>} foo
       */
      function quux (foo) {

      }
      `,
      settings: {
        jsdoc: {
          preferredTypes: {
            '[]': 'SpecialTypeArray',
          },
        },
      },
    },
    {
      code: `
      /**
       * @param {string[]} foo
       */
      function quux (foo) {

      }
      `,
      errors: [
        {
          line: 3,
          message: 'Invalid JSDoc @param "foo" type "Array"; prefer: "SpecialTypeArray".',
        },
      ],
      options: [
        {
          unifyParentAndChildTypeChecks: true,
        },
      ],
      output: `
      /**
       * @param {SpecialTypeArray<string>} foo
       */
      function quux (foo) {

      }
      `,
      settings: {
        jsdoc: {
          preferredTypes: {
            Array: 'SpecialTypeArray',
          },
        },
      },
    },
    {
      code: `
      /**
       * @param {object} foo
       */
      function quux (foo) {

      }
      `,
      errors: [
        {
          line: 3,
          message: 'Invalid JSDoc @param "foo" type "object"; prefer: "GenericObject".',
        },
      ],
      output: `
      /**
       * @param {GenericObject} foo
       */
      function quux (foo) {

      }
      `,
      settings: {
        jsdoc: {
          preferredTypes: {
            object: 'GenericObject',
          },
        },
      },
    },
    {
      code: `
      /**
       * @param {object} foo
       */
      function quux (foo) {

      }
      `,
      errors: [
        {
          line: 3,
          message: 'Invalid JSDoc @param "foo" type "object"; prefer: "GenericObject".',
        },
      ],
      output: `
      /**
       * @param {GenericObject} foo
       */
      function quux (foo) {

      }
      `,
      settings: {
        jsdoc: {
          preferredTypes: {
            object: 'GenericObject',
            'object.<>': 'GenericObject',
          },
        },
      },
    },
    {
      code: `
      /**
       * @param {object} foo
       */
      function quux (foo) {

      }
      `,
      errors: [
        {
          line: 3,
          message: 'Invalid JSDoc @param "foo" type "object"; prefer: "GenericObject".',
        },
      ],
      output: `
      /**
       * @param {GenericObject} foo
       */
      function quux (foo) {

      }
      `,
      settings: {
        jsdoc: {
          preferredTypes: {
            object: 'GenericObject',
            'object<>': 'GenericObject',
          },
        },
      },
    },
    {
      code: `
      /**
       * @param {object.<string>} foo
       */
      function quux (foo) {

      }
      `,
      errors: [
        {
          line: 3,
          message: 'Invalid JSDoc @param "foo" type "object"; prefer: "GenericObject".',
        },
      ],
      output: `
      /**
       * @param {GenericObject.<string>} foo
       */
      function quux (foo) {

      }
      `,
      settings: {
        jsdoc: {
          preferredTypes: {
            'object.<>': 'GenericObject',
          },
        },
      },
    },
    {
      code: `
      /**
       * @param {object<string>} foo
       */
      function quux (foo) {

      }
      `,
      errors: [
        {
          line: 3,
          message: 'Invalid JSDoc @param "foo" type "object"; prefer: "GenericObject".',
        },
      ],
      output: `
      /**
       * @param {GenericObject<string>} foo
       */
      function quux (foo) {

      }
      `,
      settings: {
        jsdoc: {
          preferredTypes: {
            'object<>': 'GenericObject',
          },
        },
      },
    },
    {
      code: `
      /**
       * @param {object.<string, number>} foo
       */
      function quux (foo) {

      }
      `,
      errors: [
        {
          line: 3,
          message: 'Invalid JSDoc @param "foo" type "object"; prefer: "GenericObject".',
        },
      ],
      output: `
      /**
       * @param {GenericObject.<string, number>} foo
       */
      function quux (foo) {

      }
      `,
      settings: {
        jsdoc: {
          preferredTypes: {
            'object.<>': 'GenericObject',
          },
        },
      },
    },
    {
      code: `
      /**
       * @param {object<string, number>} foo
       */
      function quux (foo) {

      }
      `,
      errors: [
        {
          line: 3,
          message: 'Invalid JSDoc @param "foo" type "object"; prefer: "GenericObject".',
        },
      ],
      output: `
      /**
       * @param {GenericObject<string, number>} foo
       */
      function quux (foo) {

      }
      `,
      settings: {
        jsdoc: {
          preferredTypes: {
            'object<>': 'GenericObject',
          },
        },
      },
    },
    {
      code: `
      /**
       * @param {object.<string>} foo
       */
      function quux (foo) {

      }
      `,
      errors: [
        {
          line: 3,
          message: 'Invalid JSDoc @param "foo" type "object"; prefer: "GenericObject".',
        },
      ],
      options: [
        {
          unifyParentAndChildTypeChecks: true,
        },
      ],
      output: `
      /**
       * @param {GenericObject.<string>} foo
       */
      function quux (foo) {

      }
      `,
      settings: {
        jsdoc: {
          preferredTypes: {
            object: 'GenericObject',
          },
        },
      },
    },
    {
      code: `
      /**
       * @param {object<string>} foo
       */
      function quux (foo) {

      }
      `,
      errors: [
        {
          line: 3,
          message: 'Invalid JSDoc @param "foo" type "object"; prefer: "GenericObject".',
        },
      ],
      options: [
        {
          unifyParentAndChildTypeChecks: true,
        },
      ],
      output: `
      /**
       * @param {GenericObject<string>} foo
       */
      function quux (foo) {

      }
      `,
      settings: {
        jsdoc: {
          preferredTypes: {
            object: 'GenericObject',
          },
        },
      },
    },
    {
      code: `
      /**
       * @param {object} foo
       */
      function quux (foo) {

      }
      `,
      errors: [
        {
          line: 3,
          message: 'Invalid JSDoc @param "foo" type "object"; prefer: "GenericObject".',
        },
      ],
      options: [
        {
          unifyParentAndChildTypeChecks: true,
        },
      ],
      output: `
      /**
       * @param {GenericObject} foo
       */
      function quux (foo) {

      }
      `,
      settings: {
        jsdoc: {
          preferredTypes: {
            object: 'GenericObject',
          },
        },
      },
    },
    {
      code: `
      /**
       * @param {object} foo
       */
      function quux (foo) {

      }
      `,
      errors: [
        {
          line: 3,
          message: 'Invalid JSDoc @param "foo" type "object".',
        },
      ],
      options: [
        {
          unifyParentAndChildTypeChecks: true,
        },
      ],
      settings: {
        jsdoc: {
          preferredTypes: {
            object: false,
          },
        },
      },
    },
    {
      code: `
      /**
       * @param {object} foo
       */
      function quux (foo) {

      }
      `,
      errors: [
        {
          line: 3,
          message: 'Invalid JSDoc @param "foo" type "object".',
        },
      ],
      settings: {
        jsdoc: {
          preferredTypes: {
            object: false,
          },
        },
      },
    },
    {
      code: `
      /**
       * @param {object.<string, number>} foo
       */
      function quux (foo) {

      }
      `,
      errors: [
        {
          line: 3,
          message: 'Invalid JSDoc @param "foo" type "object"; prefer: "GenericObject".',
        },
      ],
      options: [
        {
          unifyParentAndChildTypeChecks: true,
        },
      ],
      output: `
      /**
       * @param {GenericObject.<string, number>} foo
       */
      function quux (foo) {

      }
      `,
      settings: {
        jsdoc: {
          preferredTypes: {
            object: 'GenericObject',
          },
        },
      },
    },
    {
      code: `
      /**
       * @param {object<string, number>} foo
       */
      function quux (foo) {

      }
      `,
      errors: [
        {
          line: 3,
          message: 'Invalid JSDoc @param "foo" type "object"; prefer: "GenericObject".',
        },
      ],
      options: [
        {
          unifyParentAndChildTypeChecks: true,
        },
      ],
      output: `
      /**
       * @param {GenericObject<string, number>} foo
       */
      function quux (foo) {

      }
      `,
      settings: {
        jsdoc: {
          preferredTypes: {
            object: 'GenericObject',
          },
        },
      },
    },
    {
      code: `
      /**
       *
       * @param {string[][]} foo
       */
      function quux (foo) {

      }
      `,
      errors: [
        {
          line: 4,
          message: 'Invalid JSDoc @param "foo" type "[]"; prefer: "Array.".',
        },
        {
          line: 4,
          message: 'Invalid JSDoc @param "foo" type "[]"; prefer: "Array.".',
        },
      ],
      output: `
      /**
       *
       * @param {Array.<Array.<string>>} foo
       */
      function quux (foo) {

      }
      `,
      settings: {
        jsdoc: {
          preferredTypes: {
            '[]': 'Array.',
          },
        },
      },
    },
    {
      code: `
      /**
       *
       * @param {string[][]} foo
       */
      function quux (foo) {

      }
      `,
      errors: [
        {
          line: 4,
          message: 'Invalid JSDoc @param "foo" type "[]"; prefer: "Array.<>".',
        },
        {
          line: 4,
          message: 'Invalid JSDoc @param "foo" type "[]"; prefer: "Array.<>".',
        },
      ],
      output: `
      /**
       *
       * @param {Array.<Array.<string>>} foo
       */
      function quux (foo) {

      }
      `,
      settings: {
        jsdoc: {
          preferredTypes: {
            '[]': 'Array.<>',
          },
        },
      },
    },
    {
      code: `
      /**
       *
       * @param {string[][]} foo
       */
      function quux (foo) {

      }
      `,
      errors: [
        {
          line: 4,
          message: 'Invalid JSDoc @param "foo" type "[]"; prefer: "Array<>".',
        },
        {
          line: 4,
          message: 'Invalid JSDoc @param "foo" type "[]"; prefer: "Array<>".',
        },
      ],
      output: `
      /**
       *
       * @param {Array<Array<string>>} foo
       */
      function quux (foo) {

      }
      `,
      settings: {
        jsdoc: {
          preferredTypes: {
            '[]': 'Array<>',
          },
        },
      },
    },
    {
      code: `
      /**
       *
       * @param {object.<string, object.<string, string>>} foo
       */
      function quux (foo) {

      }
      `,
      errors: [
        {
          line: 4,
          message: 'Invalid JSDoc @param "foo" type "object"; prefer: "Object".',
        },
        {
          line: 4,
          message: 'Invalid JSDoc @param "foo" type "object"; prefer: "Object".',
        },
      ],
      output: `
      /**
       *
       * @param {Object.<string, Object.<string, string>>} foo
       */
      function quux (foo) {

      }
      `,
      settings: {
        jsdoc: {
          preferredTypes: {
            'object.': 'Object',
          },
        },
      },
    },
    {
      code: `
      /**
       *
       * @param {object.<string, object.<string, string>>} foo
       */
      function quux (foo) {

      }
      `,
      errors: [
        {
          line: 4,
          message: 'Invalid JSDoc @param "foo" type "object"; prefer: "Object<>".',
        },
        {
          line: 4,
          message: 'Invalid JSDoc @param "foo" type "object"; prefer: "Object<>".',
        },
      ],
      output: `
      /**
       *
       * @param {Object<string, Object<string, string>>} foo
       */
      function quux (foo) {

      }
      `,
      settings: {
        jsdoc: {
          preferredTypes: {
            'object.': 'Object<>',
          },
        },
      },
    },
    {
      code: `
      /**
       *
       * @param {object<string, object<string, string>>} foo
       */
      function quux (foo) {

      }
      `,
      errors: [
        {
          line: 4,
          message: 'Invalid JSDoc @param "foo" type "object"; prefer: "Object.".',
        },
        {
          line: 4,
          message: 'Invalid JSDoc @param "foo" type "object"; prefer: "Object.".',
        },
      ],
      output: `
      /**
       *
       * @param {Object.<string, Object.<string, string>>} foo
       */
      function quux (foo) {

      }
      `,
      settings: {
        jsdoc: {
          preferredTypes: {
            'object<>': 'Object.',
          },
        },
      },
    },
    {
      code: `
      /**
       *
       * @param {Array.<Array.<string>>} foo
       */
      function quux (foo) {

      }
      `,
      errors: [
        {
          line: 4,
          message: 'Invalid JSDoc @param "foo" type "Array"; prefer: "[]".',
        },
        {
          line: 4,
          message: 'Invalid JSDoc @param "foo" type "Array"; prefer: "[]".',
        },
      ],
      output: `
      /**
       *
       * @param {string[][]} foo
       */
      function quux (foo) {

      }
      `,
      settings: {
        jsdoc: {
          preferredTypes: {
            'Array.': '[]',
          },
        },
      },
    },
    {
      code: `
      /**
       *
       * @param {Array.<Array.<string>>} foo
       */
      function quux (foo) {

      }
      `,
      errors: [
        {
          line: 4,
          message: 'Invalid JSDoc @param "foo" type "Array"; prefer: "Array<>".',
        },
        {
          line: 4,
          message: 'Invalid JSDoc @param "foo" type "Array"; prefer: "Array<>".',
        },
      ],
      output: `
      /**
       *
       * @param {Array<Array<string>>} foo
       */
      function quux (foo) {

      }
      `,
      settings: {
        jsdoc: {
          preferredTypes: {
            'Array.': 'Array<>',
          },
        },
      },
    },
    {
      code: `
      /**
       *
       * @param {Array.<Array.<string>>} foo
       */
      function quux (foo) {

      }
      `,
      errors: [
        {
          line: 4,
          message: 'Invalid JSDoc @param "foo" type "Array"; prefer: "<>".',
        },
        {
          line: 4,
          message: 'Invalid JSDoc @param "foo" type "Array"; prefer: "<>".',
        },
      ],
      output: `
      /**
       *
       * @param {Array<Array<string>>} foo
       */
      function quux (foo) {

      }
      `,
      settings: {
        jsdoc: {
          preferredTypes: {
            'Array.': '<>',
          },
        },
      },
    },
    {
      code: `
      /**
       *
       * @param {Array.<MyArray.<string>>} foo
       */
      function quux (foo) {

      }
      `,
      errors: [
        {
          line: 4,
          message: 'Invalid JSDoc @param "foo" type "Array"; prefer: "<>".',
        },
      ],
      output: `
      /**
       *
       * @param {Array<MyArray.<string>>} foo
       */
      function quux (foo) {

      }
      `,
      settings: {
        jsdoc: {
          preferredTypes: {
            'Array.': '<>',
          },
        },
      },
    },
    {
      code: `
      /**
       *
       * @param {Array.<MyArray.<string>>} foo
       */
      function quux (foo) {

      }
      `,
      errors: [
        {
          line: 4,
          message: 'Invalid JSDoc @param "foo" type "MyArray"; prefer: "<>".',
        },
      ],
      output: `
      /**
       *
       * @param {Array.<MyArray<string>>} foo
       */
      function quux (foo) {

      }
      `,
      settings: {
        jsdoc: {
          preferredTypes: {
            'MyArray.': '<>',
          },
        },
      },
    },
    {
      code: `
      /**
       *
       * @param {Array<Array<string>>} foo
       */
      function quux (foo) {

      }
      `,
      errors: [
        {
          line: 4,
          message: 'Invalid JSDoc @param "foo" type "Array"; prefer: "Array.".',
        },
        {
          line: 4,
          message: 'Invalid JSDoc @param "foo" type "Array"; prefer: "Array.".',
        },
      ],
      output: `
      /**
       *
       * @param {Array.<Array.<string>>} foo
       */
      function quux (foo) {

      }
      `,
      settings: {
        jsdoc: {
          preferredTypes: {
            '<>': 'Array.',
          },
        },
      },
    },
    {
      code: `
      /**
       *
       * @param {Array<Array<string>>} foo
       */
      function quux (foo) {

      }
      `,
      errors: [
        {
          line: 4,
          message: 'Invalid JSDoc @param "foo" type "Array"; prefer: "Array.".',
        },
        {
          line: 4,
          message: 'Invalid JSDoc @param "foo" type "Array"; prefer: "Array.".',
        },
      ],
      options: [
        {
          unifyParentAndChildTypeChecks: true,
        },
      ],
      output: `
      /**
       *
       * @param {Array.<Array.<string>>} foo
       */
      function quux (foo) {

      }
      `,
      settings: {
        jsdoc: {
          preferredTypes: {
            Array: 'Array.',
          },
        },
      },
    },
    {
      code: `
      /**
       *
       * @param {Array<Array<string>>} foo
       */
      function quux (foo) {

      }
      `,
      errors: [
        {
          line: 4,
          message: 'Invalid JSDoc @param "foo" type "Array"; prefer: "[]".',
        },
        {
          line: 4,
          message: 'Invalid JSDoc @param "foo" type "Array"; prefer: "[]".',
        },
      ],
      output: `
      /**
       *
       * @param {string[][]} foo
       */
      function quux (foo) {

      }
      `,
      settings: {
        jsdoc: {
          preferredTypes: {
            '<>': '[]',
          },
        },
      },
    },
    {
      code: '/** @typedef {String} foo */',
      errors: [
        {
          line: 1,
          message: 'Invalid JSDoc @typedef "foo" type "String"; prefer: "string".',
        },
      ],
      output: '/** @typedef {string} foo */',
    },
    {
      code: `
      /**
       * @this {array}
       */
      function quux () {}
      `,
      errors: [
        {
          line: 3,
          message: 'Invalid JSDoc @this type "array"; prefer: "Array".',
        },
      ],
      output: `
      /**
       * @this {Array}
       */
      function quux () {}
      `,
      settings: {
        jsdoc: {
          mode: 'closure',
        },
      },
    },
    {
      code: `
      /**
       * @export {array}
       */
      function quux () {}
      `,
      errors: [
        {
          line: 3,
          message: 'Invalid JSDoc @export type "array"; prefer: "Array".',
        },
      ],
      output: `
      /**
       * @export {Array}
       */
      function quux () {}
      `,
      settings: {
        jsdoc: {
          mode: 'closure',
        },
      },
    },
    {
      code: `
      /**
       * @typedef {object} foo
       * @property {object} bar
       */
      `,
      errors: [
        {
          line: 4,
          message: 'Invalid JSDoc @property "bar" type "object"; prefer: "Object".',
        },
      ],
      options: [
        {
          exemptTagContexts: [
            {
              tag: 'typedef',
              types: true,
            },
          ],
        },
      ],
      output: `
      /**
       * @typedef {Object} foo
       * @property {object} bar
       */
      `,
      settings: {
        jsdoc: {
          preferredTypes: {
            object: 'Object',
          },
        },
      },
    },
    {
      code: '/** @typedef {object} foo */',
      errors: [
        {
          line: 1,
          message: 'Invalid JSDoc @typedef "foo" type "object"; prefer: "Object".',
        },
      ],
      options: [
        {
          exemptTagContexts: [
            {
              tag: 'typedef',
              types: [
                'array',
              ],
            },
          ],
        },
      ],
      output: '/** @typedef {Object} foo */',
      settings: {
        jsdoc: {
          preferredTypes: {
            object: 'Object',
          },
        },
      },
    },
    {
      code: `
      /**
       * @typedef {object} foo
       * @property {object} bar
       */
      `,
      errors: [
        {
          line: 4,
          message: 'Invalid JSDoc @property "bar" type "object"; prefer: "Object".',
        },
      ],
      options: [
        {
          exemptTagContexts: [
            {
              tag: 'typedef',
              types: [
                'object',
              ],
            },
          ],
        },
      ],
      output: `
      /**
       * @typedef {Object} foo
       * @property {object} bar
       */
      `,
      settings: {
        jsdoc: {
          preferredTypes: {
            object: 'Object',
          },
        },
      },
    },
    {
      code: '/** @typedef {object<string, string>} foo */',
      errors: [
        {
          line: 1,
          message: 'Invalid JSDoc @typedef "foo" type "object"; prefer: "Object<>".',
        },
      ],
      options: [
        {
          exemptTagContexts: [
            {
              tag: 'typedef',
              types: [
                'object',
              ],
            },
          ],
        },
      ],
      output: '/** @typedef {Object<string, string>} foo */',
      settings: {
        jsdoc: {
          preferredTypes: {
            'object<>': 'Object<>',
          },
        },
      },
    },
    {
      code: `
      /**
       * @param {Array<number | undefined>} foo
       */
      function quux (foo) {

      }
      `,
      errors: [
        {
          line: 3,
          message: 'Invalid JSDoc @param "foo" type "Array"; prefer: "[]".',
        },
      ],
      output: `
      /**
       * @param {(number | undefined)[]} foo
       */
      function quux (foo) {

      }
      `,
      settings: {
        jsdoc: {
          preferredTypes: {
            'Array.<>': '[]',
            'Array<>': '[]',
          },
        },
      },
    },
    {
      code: `
        /**
         * @typedef {object} foo
         */
        function a () {}

        /**
         * @typedef {Object<string>} foo
         */
        function b () {}
      `,
      errors: [
        {
          line: 3,
          message: 'Invalid JSDoc @typedef "foo" type "object"; prefer: "Object".',
        },
      ],
      output: `
        /**
         * @typedef {Object} foo
         */
        function a () {}

        /**
         * @typedef {Object<string>} foo
         */
        function b () {}
      `,
      settings: {
        jsdoc: {
          mode: 'typescript',
          preferredTypes: {
            object: 'Object',
          },
        },
      },
    },
    {
      code: `
          /**
           * @aCustomTag {Number} foo
           */
      `,
      errors: [
        {
          line: 3,
          message: 'Invalid JSDoc @aCustomTag "foo" type "Number"; prefer: "number".',
        },
      ],
      output: `
          /**
           * @aCustomTag {number} foo
           */
      `,
      settings: {
        jsdoc: {
          structuredTags: {
            aCustomTag: {
              type: true,
            },
          },
        },
      },
    },
    {
      code: `
          /**
           * @aCustomTag {Number} foo
           */
      `,
      errors: [
        {
          line: 3,
          message: 'Invalid JSDoc @aCustomTag "foo" type "Number"; prefer: ["otherType","anotherType"].',
        },
      ],
      settings: {
        jsdoc: {
          structuredTags: {
            aCustomTag: {
              type: [
                'otherType', 'anotherType',
              ],
            },
          },
        },
      },
    },
    {
      code: `
      /**
       * @param {Object[]} foo
       */
      function quux (foo) {

      }
      `,
      errors: [
        {
          line: 3,
          message: 'Invalid JSDoc @param "foo" type "Object"; prefer: "object".',
        },
      ],
      output: `
      /**
       * @param {object[]} foo
       */
      function quux (foo) {

      }
      `,
      settings: {
        jsdoc: {
          mode: 'typescript',
          preferredTypes: {
            Object: 'object',
          },
        },
      },
    },
    {
      code: `
      /**
       * @param {object.<string>} foo
       */
      function quux (foo) {

      }
      `,
      errors: [
        {
          line: 3,
          message: 'Invalid JSDoc @param "foo" type "object"; prefer: "Object".',
        },
      ],
      output: `
      /**
       * @param {Object.<string>} foo
       */
      function quux (foo) {

      }
      `,
      settings: {
        jsdoc: {
          mode: 'typescript',
          preferredTypes: {
            'object.<>': 'Object',
          },
        },
      },
    },
    {
      code: `
        /**
         * @param {object.<string, number>} foo
         */
        function quux (foo) {
        }
      `,
      errors: [
        {
          line: 3,
          message: 'Invalid JSDoc @param "foo" type "object"; prefer: "Object<>".',
        },
      ],
      output: `
        /**
         * @param {Object<string, number>} foo
         */
        function quux (foo) {
        }
      `,
      settings: {
        jsdoc: {
          mode: 'typescript',
          preferredTypes: {
            Object: 'object',
            'object.<>': 'Object<>',
            'Object.<>': 'Object<>',
            'object<>': 'Object<>',
          },
        },
      },
    },
    {
      code: `
        /**
         * @param {Object.<string, number>} foo
         */
        function quux (foo) {
        }
      `,
      errors: [
        {
          line: 3,
          message: 'Invalid JSDoc @param "foo" type "Object"; prefer: "Object<>".',
        },
      ],
      output: `
        /**
         * @param {Object<string, number>} foo
         */
        function quux (foo) {
        }
      `,
      settings: {
        jsdoc: {
          mode: 'typescript',
          preferredTypes: {
            Object: 'object',
            'object.<>': 'Object<>',
            'Object.<>': 'Object<>',
            'object<>': 'Object<>',
          },
        },
      },
    },
    {
      code: `
        /**
         * @param {object<string, number>} foo
         */
        function quux (foo) {
        }
      `,
      errors: [
        {
          line: 3,
          message: 'Invalid JSDoc @param "foo" type "object"; prefer: "Object<>".',
        },
      ],
      output: `
        /**
         * @param {Object<string, number>} foo
         */
        function quux (foo) {
        }
      `,
      settings: {
        jsdoc: {
          mode: 'typescript',
          preferredTypes: {
            Object: 'object',
            'object.<>': 'Object<>',
            'Object.<>': 'Object<>',
            'object<>': 'Object<>',
          },
        },
      },
    },
    {
      code: `
        /**
         * @param {object.<string>} foo
         */
        function quux (foo) {

        }
      `,
      errors: [
        {
          line: 3,
          message: 'Invalid JSDoc @param "foo" type "object"; prefer: "Object<>".',
        },
      ],
      output: `
        /**
         * @param {Object<string>} foo
         */
        function quux (foo) {

        }
      `,
      settings: {
        jsdoc: {
          mode: 'typescript',
          preferredTypes: {
            Object: 'object',
            'object.<>': 'Object<>',
            'Object.<>': 'Object<>',
            'object<>': 'Object<>',
          },
        },
      },
    },
    {
      code: `
        /**
         * @param {object.<string>} foo
         */
        function quux (foo) {

        }
      `,
      errors: [
        {
          line: 3,
          message: 'Use object shorthand or index signatures instead of `object`, e.g., `{[key: string]: string}`',
        },
      ],
      settings: {
        jsdoc: {
          mode: 'typescript',
        },
      },
    },
    {
      code: `
        /**
         *
         * @param {Object} param
         * @return {Object | String}
         */
        function abc(param) {
          if (param.a)
            return {};
          return 'abc';
        }
      `,
      errors: [
        {
          line: 4,
          message: 'Invalid JSDoc @param "param" type "Object"; prefer: "object".',
        },
        {
          line: 5,
          message: 'Invalid JSDoc @return type "Object"; prefer: "object".',
        },
        {
          line: 5,
          message: 'Invalid JSDoc @return type "String"; prefer: "string".',
        },
      ],
      output: `
        /**
         *
         * @param {object} param
         * @return {Object | String}
         */
        function abc(param) {
          if (param.a)
            return {};
          return 'abc';
        }
      `,
    },
    {
      code: `
        /**
         * @param {object} root
         * @param {number} root.a
         * @param {object} b
         */
        function a () {}
      `,
      errors: [
        {
          line: 5,
          message: 'Invalid JSDoc @param "b" type "object".',
        },
      ],
      settings: {
        jsdoc: {
          preferredTypes: {
            object: {
              skipRootChecking: true,
            },
          },
        },
      },
    },
  ],
  valid: [
    {
      code: `
          /**
           * @param {number} foo
           * @param {Bar} bar
           * @param {*} baz
           */
          function quux (foo, bar, baz) {

          }
      `,
    },
    {
      code: `
          /**
           * @arg {number} foo
           * @arg {Bar} bar
           * @arg {*} baz
           */
          function quux (foo, bar, baz) {

          }
      `,
    },
    {
      code: `
          /**
           * @param {(number | string | boolean)=} foo
           */
          function quux (foo, bar, baz) {

          }
      `,
    },
    {
      code: `
          /**
           * @param {typeof bar} foo
           */
          function qux(foo) {
          }
      `,
    },
    {
      code: `
          /**
           * @param {import('./foo').bar.baz} foo
           */
          function qux(foo) {
          }
      `,
    },
    {
      code: `
          /**
           * @param {(x: number, y: string) => string} foo
           */
          function qux(foo) {
          }
      `,
    },
    {
      code: `
          /**
           * @param {() => string} foo
           */
          function qux(foo) {
          }
      `,
    },
    {
      code: `
          /**
           * @returns {Number} foo
           * @throws {Number} foo
           */
          function quux () {

          }
      `,
      options: [
        {
          noDefaults: true,
        },
      ],
    },
    {
      code: `
        /**
         * @param {Object} foo
         */
        function quux (foo) {

        }
      `,
      settings: {
        jsdoc: {
          preferredTypes: {
            object: 'Object',
          },
        },
      },
    },
    {
      code: `
      /**
       * @param {Array} foo
       */
      function quux (foo) {

      }
      `,
    },
    {
      code: `
      /**
       * @param {Array.<string>} foo
       */
      function quux (foo) {

      }
      `,
      settings: {
        jsdoc: {
          preferredTypes: {
            Array: 'GenericArray',
          },
        },
      },
    },
    {
      code: `
      /**
       * @param {Array<string>} foo
       */
      function quux (foo) {

      }
      `,
      settings: {
        jsdoc: {
          preferredTypes: {
            Array: 'GenericArray',
          },
        },
      },
    },
    {
      code: `
      /**
       * @param {string[]} foo
       */
      function quux (foo) {

      }
      `,
      settings: {
        jsdoc: {
          preferredTypes: {
            Array: 'SpecialTypeArray',
            'Array.<>': 'SpecialTypeArray',
            'Array<>': 'SpecialTypeArray',
          },
        },
      },
    },
    {
      code: `
      /**
       * @param {string[]} foo
       */
      function quux (foo) {

      }
      `,
      options: [
        {
          unifyParentAndChildTypeChecks: true,
        },
      ],
      settings: {
        jsdoc: {
          preferredTypes: {
            'Array.<>': 'SpecialTypeArray',
            'Array<>': 'SpecialTypeArray',
          },
        },
      },
    },
    {
      code: `
      /**
       * @param {Array} foo
       */
      function quux (foo) {

      }
      `,
      settings: {
        jsdoc: {
          preferredTypes: {
            '[]': 'SpecialTypeArray',
          },
        },
      },
    },
    {
      code: `
      /**
       * @param {Array} foo
       */
      function quux (foo) {

      }
      `,
      options: [
        {
          unifyParentAndChildTypeChecks: true,
        },
      ],
      settings: {
        jsdoc: {
          preferredTypes: {
            '[]': 'SpecialTypeArray',
          },
        },
      },
    },
    {
      code: `
      /**
       * @param {Array} foo
       */
      function quux (foo) {

      }
      `,
      settings: {
        jsdoc: {
          preferredTypes: {
            'Array.<>': 'GenericArray',
          },
        },
      },
    },
    {
      code: `
      /**
       * @param {Array} foo
       */
      function quux (foo) {

      }
      `,
      settings: {
        jsdoc: {
          preferredTypes: {
            'Array<>': 'GenericArray',
          },
        },
      },
    },
    {
      code: `
      /**
       * @param {object} foo
       */
      function quux (foo) {

      }
      `,
    },
    {
      code: `
      /**
       * @param {object.<string>} foo
       */
      function quux (foo) {

      }
      `,
      settings: {
        jsdoc: {
          preferredTypes: {
            object: 'GenericObject',
          },
        },
      },
    },
    {
      code: `
      /**
       * @param {object<string>} foo
       */
      function quux (foo) {

      }
      `,
      settings: {
        jsdoc: {
          preferredTypes: {
            object: 'GenericObject',
          },
        },
      },
    },
    {
      code: `
      /**
       * @param {object.<string, number>} foo
       */
      function quux (foo) {

      }
      `,
      settings: {
        jsdoc: {
          preferredTypes: {
            object: 'GenericObject',
          },
        },
      },
    },
    {
      code: `
      /**
       * @param {object<string, number>} foo
       */
      function quux (foo) {

      }
      `,
      settings: {
        jsdoc: {
          preferredTypes: {
            object: 'GenericObject',
          },
        },
      },
    },
    {
      code: `
      /**
       * @param {object} foo
       */
      function quux (foo) {

      }
      `,
      settings: {
        jsdoc: {
          preferredTypes: {
            'object.<>': 'GenericObject',
          },
        },
      },
    },
    {
      code: `
      /**
       * @param {object} foo
       */
      function quux (foo) {

      }
      `,
      settings: {
        jsdoc: {
          preferredTypes: {
            'object<>': 'GenericObject',
          },
        },
      },
    },
    {
      code: `
          /**
           * @param {Number<} Ignore the error as not a validating rule
           */
          function quux (foo) {

          }
      `,
    },
    {
      code: `
      /** @param {function(...)} callback The function to invoke. */
      var subscribe = function(callback) {};
      `,
    },
    {
      code: `
      /**
       * @this {Array}
       */
      function quux () {}
      `,
      settings: {
        jsdoc: {
          mode: 'closure',
        },
      },
    },
    {
      code: `
      /**
       * @export {Array}
       */
      function quux () {}
      `,
      settings: {
        jsdoc: {
          mode: 'closure',
        },
      },
    },
    {
      code: `
        /** @type {new() => EntityBase} */
      `,
    },
    {
      code: '/** @typedef {object} foo */',
      options: [
        {
          exemptTagContexts: [
            {
              tag: 'typedef',
              types: true,
            },
          ],
        },
      ],
      settings: {
        jsdoc: {
          preferredTypes: {
            object: 'Object',
          },
        },
      },
    },
    {
      code: '/** @typedef {object<string, string>} foo */',
      settings: {
        jsdoc: {
          preferredTypes: {
            object: 'Object',
          },
        },
      },
    },
    {
      code: '/** @typedef {object<string, string>} foo */',
      options: [
        {
          exemptTagContexts: [
            {
              tag: 'typedef',
              types: [
                'object<string, string>',
              ],
            },
          ],
        },
      ],
      settings: {
        jsdoc: {
          preferredTypes: {
            'object<>': 'Object<>',
          },
        },
      },
    },
    {
      code: `
      /**
       * @typedef {object} foo
       */

       /**
        * @typedef {Object} foo
        */
      `,
      settings: {
        jsdoc: {
          preferredTypes: {
            object: 'Object',
            Object: 'object',
          },
        },
      },
    },
    {
      code: `
        /**
         * @typedef {object} foo
         */
        function a () {}

        /**
         * @typedef {Object} foo
         */
        function b () {}
      `,
      settings: {
        jsdoc: {
          preferredTypes: {
            object: 'Object',
            Object: 'object',
          },
        },
      },
    },
    {
      code: `
        /**
         * @typedef {object} foo
         */
        function a () {}

        /**
         * @typedef {{[key: string]: number}} foo
         */
        function b () {}
      `,
      settings: {
        jsdoc: {
          mode: 'typescript',
        },
      },
    },
    {
      code: `
          /**
           * @aCustomTag {Number} foo
           */
      `,
      settings: {
        jsdoc: {
          structuredTags: {
            aCustomTag: {
              type: false,
            },
          },
        },
      },
    },
    {
      code: `
          /**
           * @aCustomTag {otherType} foo
           */
      `,
      settings: {
        jsdoc: {
          structuredTags: {
            aCustomTag: {
              type: [
                'otherType', 'anotherType',
              ],
            },
          },
        },
      },
    },
    {
      code: `
          /**
           * @aCustomTag {anotherType|otherType} foo
           */
      `,
      settings: {
        jsdoc: {
          structuredTags: {
            aCustomTag: {
              type: [
                'otherType', 'anotherType',
              ],
            },
          },
        },
      },
    },
    {
      code: `
          /**
           * Bad types handled by \`valid-types\` instead.
           * @param {str(} foo
           */
          function quux (foo) {

          }
      `,
    },
    {
      code: `
      /**
       * @param {{[key: string]: number}} foo
       */
      function quux (foo) {

      }
      `,
      settings: {
        jsdoc: {
          mode: 'typescript',
        },
      },
    },
    {
      code: `
        /**
         * @typedef {object} foo
         */
        function a () {}
      `,
      settings: {
        jsdoc: {
          mode: 'typescript',
          preferredTypes: {
            Object: 'object',
            'object.<>': 'Object<>',
            'object<>': 'Object<>',
          },
        },
      },
    },
    {
      code: `
        /**
         * @typedef {Object<string, number>} foo
         */
        function a () {}
      `,
      settings: {
        jsdoc: {
          mode: 'typescript',
          preferredTypes: {
            Object: 'object',
            'object.<>': 'Object<>',
            'object<>': 'Object<>',
          },
        },
      },
    },
    {
      code: `
      /**
       * Does something.
       *
       * @param {Object<string,string>} spec - Foo.
       */
      function foo(spec) {
          return spec;
      }

      foo()
      `,
      settings: {
        jsdoc: {
          mode: 'jsdoc',
        },
      },
    },
    {
      code: `
        /**
         * @param {object} root
         * @param {number} root.a
         */
        function a () {}
      `,
      settings: {
        jsdoc: {
          preferredTypes: {
            object: {
              message: 'Won\'t see this message',
              skipRootChecking: true,
            },
          },
        },
      },
    },
    {
      code: `
        /**
         * @returns {string | undefined} a string or undefined
         */
        function quux () {}
      `,
      options: [
        {
          unifyParentAndChildTypeChecks: true,
        },
      ],
      settings: {
        jsdoc: {
          preferredTypes: {
            '[]': {
              message: 'Do not use *[], use Array<*> instead',
              replacement: 'Array',
            },
          },
        },
      },
    },
  ],
};
