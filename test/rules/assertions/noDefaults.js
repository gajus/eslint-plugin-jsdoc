export default /** @type {import('../index.js').TestCases} */ ({
  invalid: [
    {
      code: `
          /**
           * @param {number} [foo="7"]
           */
          function quux (foo) {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Defaults are not permitted on @param.',
        },
      ],
      output: `
          /**
           * @param {number} [foo]
           */
          function quux (foo) {

          }
      `,
    },
    {
      code: `
      class Test {
          /**
           * @param {number} [foo="7"]
           */
          quux (foo) {

          }
      }
      `,
      errors: [
        {
          line: 4,
          message: 'Defaults are not permitted on @param.',
        },
      ],
      output: `
      class Test {
          /**
           * @param {number} [foo]
           */
          quux (foo) {

          }
      }
      `,
    },
    {
      code: `
          /**
           * @param {number} [foo="7"]
           */
          function quux (foo) {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Optional param names are not permitted on @param.',
        },
      ],
      options: [
        {
          noOptionalParamNames: true,
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
           * @arg {number} [foo="7"]
           */
          function quux (foo) {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Defaults are not permitted on @arg.',
        },
      ],
      output: `
          /**
           * @arg {number} [foo]
           */
          function quux (foo) {

          }
      `,
      settings: {
        jsdoc: {
          tagNamePreference: {
            param: 'arg',
          },
        },
      },
    },
    {
      code: `
          /**
           * @param {number} [foo="7"]
           */
          function quux (foo) {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Defaults are not permitted on @param.',
        },
      ],
      options: [
        {
          contexts: [
            'any',
          ],
        },
      ],
      output: `
          /**
           * @param {number} [foo]
           */
          function quux (foo) {

          }
      `,
    },
    {
      code: `
          /**
           * @function
           * @param {number} [foo="7"]
           */
      `,
      errors: [
        {
          line: 4,
          message: 'Defaults are not permitted on @param.',
        },
      ],
      options: [
        {
          contexts: [
            'any',
          ],
        },
      ],
      output: `
          /**
           * @function
           * @param {number} [foo]
           */
      `,
    },
    {
      code: `
          /**
           * @callback
           * @param {number} [foo="7"]
           */
      `,
      errors: [
        {
          line: 4,
          message: 'Defaults are not permitted on @param.',
        },
      ],
      options: [
        {
          contexts: [
            'any',
          ],
        },
      ],
      output: `
          /**
           * @callback
           * @param {number} [foo]
           */
      `,
    },
    {
      code: `
          /**
           * @default {}
           */
          const a = {};
      `,
      errors: [
        {
          line: 3,
          message: 'Default values are not permitted on @default.',
        },
      ],
      options: [
        {
          contexts: [
            'any',
          ],
        },
      ],
      output: `
          /**
           * @default
           */
          const a = {};
      `,
    },
    {
      code: `
          /**
           * @defaultvalue {}
           */
          const a = {};
      `,
      errors: [
        {
          line: 3,
          message: 'Default values are not permitted on @defaultvalue.',
        },
      ],
      options: [
        {
          contexts: [
            'any',
          ],
        },
      ],
      output: `
          /**
           * @defaultvalue
           */
          const a = {};
      `,
      settings: {
        jsdoc: {
          tagNamePreference: {
            default: 'defaultvalue',
          },
        },
      },
    },
    {
      code: `
          class Filter {
            /**
             * @param {number} [value=1]
             */
            set level (value = 1) {
              this._level = value;
            }
          }
      `,
      errors: [
        {
          line: 4,
          message: 'Defaults are not permitted on @param.',
        },
      ],
      output: `
          class Filter {
            /**
             * @param {number} [value]
             */
            set level (value = 1) {
              this._level = value;
            }
          }
      `,
    },
  ],
  valid: [
    {
      code: `
          /**
           * @param foo
           */
          function quux (foo) {

          }
      `,
    },
    {
      code: `
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
           * @param foo
           */
      `,
      options: [
        {
          contexts: [
            'any',
          ],
        },
      ],
    },
    {
      code: `
          /**
           * @function
           * @param {number} foo
           */
      `,
    },
    {
      code: `
          /**
           * @callback
           * @param {number} foo
           */
      `,
    },
    {
      code: `
          /**
           * @param {number} foo
           */
          function quux (foo) {

          }
      `,
      options: [
        {
          noOptionalParamNames: true,
        },
      ],
    },
    {
      code: `
          /**
           * @default
           */
          const a = {};
      `,
      options: [
        {
          contexts: [
            'any',
          ],
        },
      ],
    },
    {
      code: `
          class Filter {
            /**
             * The blend mode of the filter.
             * @default "normal"
             */
            get blendMode () {
              return this._blendMode;
            }

            /**
             * Whether to repeat edge pixels.
             * @default false
             */
            set repeatEdgePixels (value) {
              this._repeat = value;
            }
          }
      `,
    },
    {
      code: `
          const view = {
            /**
             * The zoom level.
             * @defaultvalue 1
             */
            get zoom () {
              return this._zoom;
            },
          };
      `,
    },
    {
      code: `
          class Filter {
            /**
             * The blend mode of the filter.
             * @default "normal"
             */
            get blendMode () {
              return this._blendMode;
            }
          }
      `,
      options: [
        {
          contexts: [
            'MethodDefinition',
          ],
        },
      ],
    },
  ],
});
