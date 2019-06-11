export default {
  invalid: [
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
          message: 'Invalid JSDoc @param "foo" type "Number"; prefer: "number".'
        }
      ],
      output: `
          /**
           * @param {number} foo
           */
          function quux (foo) {

          }
      `
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
          message: 'Invalid JSDoc @arg "foo" type "Number"; prefer: "number".'
        }
      ],
      output: `
          /**
           * @arg {number} foo
           */
          function quux (foo) {

          }
      `
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
          message: 'Invalid JSDoc @returns type "Number"; prefer: "number".'
        },
        {
          line: 4,
          message: 'Invalid JSDoc @throws type "Number"; prefer: "number".'
        }
      ]
    },
    {
      code: `
          /**
           * @param {(Number|string|Boolean)=} foo
           */
          function quux (foo, bar, baz) {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Invalid JSDoc @param "foo" type "Number"; prefer: "number".'
        },
        {
          line: 3,
          message: 'Invalid JSDoc @param "foo" type "Boolean"; prefer: "boolean".'
        }
      ],
      output: `
          /**
           * @param {(number|string|boolean)=} foo
           */
          function quux (foo, bar, baz) {

          }
      `
    },
    {
      code: `
          /**
           * @param {Array.<Number|String>} foo
           */
          function quux (foo, bar, baz) {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Invalid JSDoc @param "foo" type "Number"; prefer: "number".'
        },
        {
          line: 3,
          message: 'Invalid JSDoc @param "foo" type "String"; prefer: "string".'
        }
      ],
      output: `
          /**
           * @param {Array.<number|string>} foo
           */
          function quux (foo, bar, baz) {

          }
      `
    },
    {
      code: `
          /**
           * @param {(Number|String)[]} foo
           */
          function quux (foo, bar, baz) {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Invalid JSDoc @param "foo" type "Number"; prefer: "number".'
        },
        {
          line: 3,
          message: 'Invalid JSDoc @param "foo" type "String"; prefer: "string".'
        }
      ],
      output: `
          /**
           * @param {(number|string)[]} foo
           */
          function quux (foo, bar, baz) {

          }
      `
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
          message: 'Invalid JSDoc @param "foo" type "abc"; prefer: "Abc".'
        }
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
            string: 'Str'
          }
        }
      }
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
          message: 'Invalid JSDoc @param "foo" type "abc"; prefer: "Abc".'
        }
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
              replacement: 'Abc'
            },
            string: 'Str'
          }
        }
      }
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
          message: 'Messed up JSDoc @param "foo" type "abc"; prefer: "Abc".'
        }
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
              message: 'Messed up JSDoc @{{tagName}}{{tagValue}} type "{{badType}}"; prefer: "{{replacement}}".',
              replacement: 'Abc'
            },
            string: 'Str'
          }
        }
      }
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
          message: 'Messed up JSDoc @param "foo" type "abc"; prefer: "Abc".'
        },
        {
          line: 4,
          message: 'More messed up JSDoc @param "bar" type "cde"; prefer: "Cde".'
        },
        {
          line: 5,
          message: 'Invalid JSDoc @param "baz" type "object"; prefer: "Object".'
        }
      ],
      settings: {
        jsdoc: {
          preferredTypes: {
            abc: {
              message: 'Messed up JSDoc @{{tagName}}{{tagValue}} type "{{badType}}"; prefer: "{{preferredType}}".',
              replacement: 'Abc'
            },
            cde: {
              message: 'More messed up JSDoc @{{tagName}}{{tagValue}} type "{{badType}}"; prefer: "{{preferredType}}".',
              replacement: 'Cde'
            },
            object: 'Object'
          }
        }
      }
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
          message: 'Messed up JSDoc @param "foo" type "abc".'
        }
      ],
      settings: {
        jsdoc: {
          preferredTypes: {
            abc: {
              message: 'Messed up JSDoc @{{tagName}}{{tagValue}} type "{{badType}}".',
              replacement: false
            },
            string: 'Str'
          }
        }
      }
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
          message: 'Messed up JSDoc @param "foo" type "abc".'
        }
      ],
      settings: {
        jsdoc: {
          preferredTypes: {
            abc: {
              message: 'Messed up JSDoc @{{tagName}}{{tagValue}} type "{{badType}}".'
            },
            string: 'Str'
          }
        }
      }
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
          message: 'Invalid JSDoc @param "foo" type "abc"; prefer: "Abc".'
        }
      ],
      options: [{
        noDefaults: true
      }],
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
            string: 'Str'
          }
        }
      }
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
          message: 'Invalid JSDoc @param "foo" type "abc"; prefer: "Abc".'
        },
        {
          line: 4,
          message: 'Invalid JSDoc @param "bar" type "Number"; prefer: "number".'
        }
      ],
      settings: {
        jsdoc: {
          preferredTypes: {
            abc: 'Abc',
            string: 'Str'
          }
        }
      }
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
          message: 'Invalid JSDoc @param "foo" type "abc".'
        }
      ],
      settings: {
        jsdoc: {
          preferredTypes: {
            abc: false,
            string: 'Str'
          }
        }
      }
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
          message: 'Invalid JSDoc @param "foo" type "abc".'
        }
      ],
      settings: {
        jsdoc: {
          preferredTypes: {
            abc: false
          }
        }
      }
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
          message: 'Invalid JSDoc @param "baz" type "*".'
        }
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
            string: 'Str'
          }
        }
      }
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
          message: 'Invalid JSDoc @param "baz" type "*"; prefer: "aaa".'
        }
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
            string: 'Str'
          }
        }
      }
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
          message: 'Invalid JSDoc @param "foo" type "abc"; prefer: "Abc".'
        },
        {
          line: 4,
          message: 'Invalid JSDoc @param "bar" type "Number"; prefer: "number".'
        }
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
            string: 'Str'
          }
        }
      }
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
          message: 'Invalid JSDoc @param "foo" type "Array"; prefer: "GenericArray".'
        }
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
            Array: 'GenericArray'
          }
        }
      }
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
          message: 'Invalid JSDoc @param "foo" type "Array"; prefer: "GenericArray".'
        }
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
            'Array.<>': 'GenericArray'
          }
        }
      }
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
          message: 'Invalid JSDoc @param "foo" type "Array"; prefer: "GenericArray".'
        }
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
            'Array.<>': 'GenericArray'
          }
        }
      }
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
          message: 'Invalid JSDoc @param "foo" type "Array"; prefer: "GenericArray".'
        }
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
            'Array<>': 'GenericArray'
          }
        }
      }
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
          message: 'Invalid JSDoc @param "foo" type "[]"; prefer: "SpecialTypeArray".'
        }
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
            '[]': 'SpecialTypeArray'
          }
        }
      }
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
          message: 'Invalid JSDoc @param "foo" type "[]"; prefer: "SpecialTypeArray".'
        }
      ],
      options: [{
        unifyParentAndChildTypeChecks: true
      }],
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
            '[]': 'SpecialTypeArray'
          }
        }
      }
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
          message: 'Invalid JSDoc @param "foo" type "Array"; prefer: "SpecialTypeArray".'
        }
      ],
      options: [{
        unifyParentAndChildTypeChecks: true
      }],
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
            Array: 'SpecialTypeArray'
          }
        }
      }
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
          message: 'Invalid JSDoc @param "foo" type "object"; prefer: "GenericObject".'
        }
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
            object: 'GenericObject'
          }
        }
      }
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
          message: 'Invalid JSDoc @param "foo" type "object"; prefer: "GenericObject".'
        }
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
            'object.<>': 'GenericObject'
          }
        }
      }
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
          message: 'Invalid JSDoc @param "foo" type "object"; prefer: "GenericObject".'
        }
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
            'object<>': 'GenericObject'
          }
        }
      }
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
          message: 'Invalid JSDoc @param "foo" type "object"; prefer: "GenericObject".'
        }
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
            'object.<>': 'GenericObject'
          }
        }
      }
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
          message: 'Invalid JSDoc @param "foo" type "object"; prefer: "GenericObject".'
        }
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
            'object<>': 'GenericObject'
          }
        }
      }
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
          message: 'Invalid JSDoc @param "foo" type "object"; prefer: "GenericObject".'
        }
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
            'object.<>': 'GenericObject'
          }
        }
      }
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
          message: 'Invalid JSDoc @param "foo" type "object"; prefer: "GenericObject".'
        }
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
            'object<>': 'GenericObject'
          }
        }
      }
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
          message: 'Invalid JSDoc @param "foo" type "object"; prefer: "GenericObject".'
        }
      ],
      options: [{
        unifyParentAndChildTypeChecks: true
      }],
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
            object: 'GenericObject'
          }
        }
      }
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
          message: 'Invalid JSDoc @param "foo" type "object"; prefer: "GenericObject".'
        }
      ],
      options: [{
        unifyParentAndChildTypeChecks: true
      }],
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
            object: 'GenericObject'
          }
        }
      }
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
          message: 'Invalid JSDoc @param "foo" type "object"; prefer: "GenericObject".'
        }
      ],
      options: [{
        unifyParentAndChildTypeChecks: true
      }],
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
            object: 'GenericObject'
          }
        }
      }
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
          message: 'Invalid JSDoc @param "foo" type "object".'
        }
      ],
      options: [{
        unifyParentAndChildTypeChecks: true
      }],
      settings: {
        jsdoc: {
          preferredTypes: {
            object: false
          }
        }
      }
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
          message: 'Invalid JSDoc @param "foo" type "object".'
        }
      ],
      settings: {
        jsdoc: {
          preferredTypes: {
            object: false
          }
        }
      }
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
          message: 'Invalid JSDoc @param "foo" type "object"; prefer: "GenericObject".'
        }
      ],
      options: [{
        unifyParentAndChildTypeChecks: true
      }],
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
            object: 'GenericObject'
          }
        }
      }
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
          message: 'Invalid JSDoc @param "foo" type "object"; prefer: "GenericObject".'
        }
      ],
      options: [{
        unifyParentAndChildTypeChecks: true
      }],
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
            object: 'GenericObject'
          }
        }
      }
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
          message: 'Invalid JSDoc @param "foo" type "[]"; prefer: "Array.".'
        },
        {
          message: 'Invalid JSDoc @param "foo" type "[]"; prefer: "Array.".'
        }
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
            '[]': 'Array.'
          }
        }
      }
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
          message: 'Invalid JSDoc @param "foo" type "[]"; prefer: "Array.<>".'
        },
        {
          message: 'Invalid JSDoc @param "foo" type "[]"; prefer: "Array.<>".'
        }
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
            '[]': 'Array.<>'
          }
        }
      }
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
          message: 'Invalid JSDoc @param "foo" type "[]"; prefer: "Array<>".'
        },
        {
          message: 'Invalid JSDoc @param "foo" type "[]"; prefer: "Array<>".'
        }
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
            '[]': 'Array<>'
          }
        }
      }
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
          message: 'Invalid JSDoc @param "foo" type "object"; prefer: "Object".'
        },
        {
          message: 'Invalid JSDoc @param "foo" type "object"; prefer: "Object".'
        }
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
            'object.': 'Object'
          }
        }
      }
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
          message: 'Invalid JSDoc @param "foo" type "object"; prefer: "Object<>".'
        },
        {
          message: 'Invalid JSDoc @param "foo" type "object"; prefer: "Object<>".'
        }
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
            'object.': 'Object<>'
          }
        }
      }
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
          message: 'Invalid JSDoc @param "foo" type "object"; prefer: "Object.".'
        },
        {
          message: 'Invalid JSDoc @param "foo" type "object"; prefer: "Object.".'
        }
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
            'object<>': 'Object.'
          }
        }
      }
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
          message: 'Invalid JSDoc @param "foo" type "Array"; prefer: "[]".'
        },
        {
          message: 'Invalid JSDoc @param "foo" type "Array"; prefer: "[]".'
        }
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
            'Array.': '[]'
          }
        }
      }
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
          message: 'Invalid JSDoc @param "foo" type "Array"; prefer: "Array<>".'
        },
        {
          message: 'Invalid JSDoc @param "foo" type "Array"; prefer: "Array<>".'
        }
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
            'Array.': 'Array<>'
          }
        }
      }
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
          message: 'Invalid JSDoc @param "foo" type "Array"; prefer: "<>".'
        },
        {
          message: 'Invalid JSDoc @param "foo" type "Array"; prefer: "<>".'
        }
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
            'Array.': '<>'
          }
        }
      }
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
          message: 'Invalid JSDoc @param "foo" type "Array"; prefer: "<>".'
        }
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
            'Array.': '<>'
          }
        }
      }
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
          message: 'Invalid JSDoc @param "foo" type "MyArray"; prefer: "<>".'
        }
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
            'MyArray.': '<>'
          }
        }
      }
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
          message: 'Invalid JSDoc @param "foo" type "Array"; prefer: "Array.".'
        },
        {
          message: 'Invalid JSDoc @param "foo" type "Array"; prefer: "Array.".'
        }
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
            '<>': 'Array.'
          }
        }
      }
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
          message: 'Invalid JSDoc @param "foo" type "Array"; prefer: "Array.".'
        },
        {
          message: 'Invalid JSDoc @param "foo" type "Array"; prefer: "Array.".'
        }
      ],
      options: [{
        unifyParentAndChildTypeChecks: true
      }],
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
            Array: 'Array.'
          }
        }
      }
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
          message: 'Invalid JSDoc @param "foo" type "Array"; prefer: "[]".'
        },
        {
          message: 'Invalid JSDoc @param "foo" type "Array"; prefer: "[]".'
        }
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
            '<>': '[]'
          }
        }
      }
    }
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
      `
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
      `
    },
    {
      code: `
          /**
           * @param {(number|string|boolean)=} foo
           */
          function quux (foo, bar, baz) {

          }
      `
    },
    {
      code: `
          /**
           * @param {typeof bar} foo
           */
          function qux(foo) {
          }
      `
    },
    {
      code: `
          /**
           * @param {import('./foo').bar.baz} foo
           */
          function qux(foo) {
          }
      `
    },
    {
      code: `
          /**
           * @param {(x: number, y: string) => string} foo
           */
          function qux(foo) {
          }
      `
    },
    {
      code: `
          /**
           * @param {() => string} foo
           */
          function qux(foo) {
          }
      `
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
      options: [{
        noDefaults: true
      }]
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
            object: 'Object'
          }
        }
      }
    },
    {
      code: `
      /**
       * @param {Array} foo
       */
      function quux (foo) {

      }
      `
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
            Array: 'GenericArray'
          }
        }
      }
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
            Array: 'GenericArray'
          }
        }
      }
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
            'Array<>': 'SpecialTypeArray'
          }
        }
      }
    },
    {
      code: `
      /**
       * @param {string[]} foo
       */
      function quux (foo) {

      }
      `,
      options: [{
        unifyParentAndChildTypeChecks: true
      }],
      settings: {
        jsdoc: {
          preferredTypes: {
            'Array.<>': 'SpecialTypeArray',
            'Array<>': 'SpecialTypeArray'
          }
        }
      }
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
            '[]': 'SpecialTypeArray'
          }
        }
      }
    },
    {
      code: `
      /**
       * @param {Array} foo
       */
      function quux (foo) {

      }
      `,
      options: [{
        unifyParentAndChildTypeChecks: true
      }],
      settings: {
        jsdoc: {
          preferredTypes: {
            '[]': 'SpecialTypeArray'
          }
        }
      }
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
            'Array.<>': 'GenericArray'
          }
        }
      }
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
            'Array<>': 'GenericArray'
          }
        }
      }
    },
    {
      code: `
      /**
       * @param {object} foo
       */
      function quux (foo) {

      }
      `
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
            object: 'GenericObject'
          }
        }
      }
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
            object: 'GenericObject'
          }
        }
      }
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
            object: 'GenericObject'
          }
        }
      }
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
            object: 'GenericObject'
          }
        }
      }
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
            'object.<>': 'GenericObject'
          }
        }
      }
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
            'object<>': 'GenericObject'
          }
        }
      }
    }
  ]
};
