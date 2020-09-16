export default {
  invalid: [
    {
      code: `
        /**
         * Function description.
         *
         * @param {string} lorem Description.
         * @param {int} sit Description multi words.
         */
        const fn = ( lorem, sit ) => {}
      `,
      errors: [
        {
          message: 'Expected JSDoc block lines to be aligned.',
          type: 'Block',
        },
      ],
      options: [
        'always',
      ],
      output: `
        /**
         * Function description.
         *
         * @param {string} lorem Description.
         * @param {int}    sit   Description multi words.
         */
        const fn = ( lorem, sit ) => {}
      `,
    },
    {
      code: `
        /**
         * Function description.
         *
         * @param {string} lorem - Description.
         * @param {int} sit - Description multi words.
         */
        const fn = ( lorem, sit ) => {}
      `,
      errors: [
        {
          message: 'Expected JSDoc block lines to be aligned.',
          type: 'Block',
        },
      ],
      options: [
        'always',
      ],
      output: `
        /**
         * Function description.
         *
         * @param {string} lorem - Description.
         * @param {int}    sit   - Description multi words.
         */
        const fn = ( lorem, sit ) => {}
      `,
    },
    {
      code: `
        /**
         * Function description.
         *
         * @param {string} lorem Description.
         * @param {int} sit Description multi words.
         */
        const fn = ( lorem, sit ) => {}
      `,
      errors: [
        {
          message: 'Expected JSDoc block lines to be aligned.',
          type: 'Block',
        },
      ],
      options: [
        'always',
      ],
      output: `
        /**
         * Function description.
         *
         * @param {string} lorem Description.
         * @param {int}    sit   Description multi words.
         */
        const fn = ( lorem, sit ) => {}
      `,
    },
    {
      code: `
        /**
         * Function description.
         *
         * @param  {string} lorem Description.
         *  @param {int}    sit   Description multi words.
         */
        const fn = ( lorem, sit ) => {}
      `,
      errors: [
        {
          message: 'Expected JSDoc block lines to be aligned.',
          type: 'Block',
        },
      ],
      options: [
        'always',
      ],
      output: `
        /**
         * Function description.
         *
         * @param {string} lorem Description.
         * @param {int}    sit   Description multi words.
         */
        const fn = ( lorem, sit ) => {}
      `,
    },
    {
      code: `
        /**
         * Function description.
         *
         * @param  {string} lorem Description.
          * @param {int}    sit   Description multi words.
         */
        const fn = ( lorem, sit ) => {}
      `,
      errors: [
        {
          message: 'Expected JSDoc block lines to be aligned.',
          type: 'Block',
        },
      ],
      options: [
        'always',
      ],
      output: `
        /**
         * Function description.
         *
         * @param {string} lorem Description.
         * @param {int}    sit   Description multi words.
         */
        const fn = ( lorem, sit ) => {}
      `,
    },
    {
      code: `
        /**
         * Function description.
         *
         * @param  {string} lorem Description.
         * @param  {int}    sit   Description multi words.
         */
        const fn = ( lorem, sit ) => {}
      `,
      errors: [
        {
          message: 'Expected JSDoc block lines to be aligned.',
          type: 'Block',
        },
      ],
      options: [
        'always',
      ],
      output: `
        /**
         * Function description.
         *
         * @param {string} lorem Description.
         * @param {int}    sit   Description multi words.
         */
        const fn = ( lorem, sit ) => {}
      `,
    },
    {
      code: `
        /**
         * Function description.
         *
         * @param {string} lorem Description.
         * @param {int} sit Description multi words.
         */
        function fn( lorem, sit ) {}
      `,
      errors: [
        {
          message: 'Expected JSDoc block lines to be aligned.',
          type: 'Block',
        },
      ],
      options: [
        'always',
      ],
      output: `
        /**
         * Function description.
         *
         * @param {string} lorem Description.
         * @param {int}    sit   Description multi words.
         */
        function fn( lorem, sit ) {}
      `,
    },
    {
      code: `
        const object = {
          /**
           * Function description.
           *
           * @param {string} lorem Description.
           * @param {int} sit Description multi words.
           */
          fn( lorem, sit ) {}
        }
      `,
      errors: [
        {
          message: 'Expected JSDoc block lines to be aligned.',
          type: 'Block',
        },
      ],
      options: [
        'always',
      ],
      output: `
        const object = {
          /**
           * Function description.
           *
           * @param {string} lorem Description.
           * @param {int}    sit   Description multi words.
           */
          fn( lorem, sit ) {}
        }
      `,
    },
    {
      code: `
        class ClassName {
          /**
           * Function description.
           *
           * @param {string} lorem Description.
           * @param {int} sit Description multi words.
           */
          fn( lorem, sit ) {}
        }
      `,
      errors: [
        {
          message: 'Expected JSDoc block lines to be aligned.',
          type: 'Block',
        },
      ],
      options: [
        'always',
      ],
      output: `
        class ClassName {
          /**
           * Function description.
           *
           * @param {string} lorem Description.
           * @param {int}    sit   Description multi words.
           */
          fn( lorem, sit ) {}
        }
      `,
    },
    {
      code: `
        /**
         * Function description.
         *
         * @arg {string} lorem Description.
         * @arg {int} sit Description multi words.
         */
        const fn = ( lorem, sit ) => {}
      `,
      errors: [
        {
          message: 'Expected JSDoc block lines to be aligned.',
          type: 'Block',
        },
      ],
      options: [
        'always',
      ],
      output: `
        /**
         * Function description.
         *
         * @arg {string} lorem Description.
         * @arg {int}    sit   Description multi words.
         */
        const fn = ( lorem, sit ) => {}
      `,
    },
    {
      code: `
        /**
         * @namespace
         * @property {object} defaults Description.
         * @property {int} defaults.lorem Description multi words.
         */
        const config = {
            defaults: {
                lorem: 1
            }
        }
      `,
      errors: [
        {
          message: 'Expected JSDoc block lines to be aligned.',
          type: 'Block',
        },
      ],
      options: [
        'always',
      ],
      output: `
        /**
         * @namespace
         * @property {object} defaults       Description.
         * @property {int}    defaults.lorem Description multi words.
         */
        const config = {
            defaults: {
                lorem: 1
            }
        }
      `,
    },
    {
      code: `
        /**
         * My object.
         *
         * @typedef {Object} MyObject
         *
         * @property {string} lorem Description.
         * @property {int} sit Description multi words.
         */
      `,
      errors: [
        {
          message: 'Expected JSDoc block lines to be aligned.',
          type: 'Block',
        },
      ],
      options: [
        'always',
      ],
      output: `
        /**
         * My object.
         *
         * @typedef {Object} MyObject
         *
         * @property {string} lorem Description.
         * @property {int}    sit   Description multi words.
         */
      `,
    },
    {
      code: `
        /**
         * My object.
         *
         * @typedef {Object} MyObject
         *
         * @property {{a: number, b: string, c}} lorem Description.
         * @property {Object.<string, Class>} sit Description multi words.
         * @property {Object.<string, Class>} amet Description} weird {multi} {{words}}.
         * @property {Object.<string, Class>} dolor
         */
      `,
      errors: [
        {
          message: 'Expected JSDoc block lines to be aligned.',
          type: 'Block',
        },
      ],
      options: [
        'always',
      ],
      output: `
        /**
         * My object.
         *
         * @typedef {Object} MyObject
         *
         * @property {{a: number, b: string, c}} lorem Description.
         * @property {Object.<string, Class>}    sit   Description multi words.
         * @property {Object.<string, Class>}    amet  Description} weird {multi} {{words}}.
         * @property {Object.<string, Class>}    dolor
         */
      `,
    },
    {
      code: `
        /**
         * Not implemented yet.
         *
         * @param {string} lorem Description.
         * @param {int} sit Description multi words.
         */
        const fn = ( lorem, sit ) => {}
      `,
      errors: [
        {
          message: 'The `never` option is not yet implemented for this rule.',
          type: 'Block',
        },
      ],
      options: [
        'never',
      ],
    },
  ],
  valid: [
    {
      code: `
        /**
         * Function description.
         *
         * @param {string} lorem Description.
         * @param {int}    sit   Description multi words.
         */
        const fn = ( lorem, sit ) => {}
      `,
      options: [
        'always',
      ],
    },
    {
      code: `
        /**
         * Function description.
         *
         * @param {string} lorem - Description.
         * @param {int}    sit   - Description multi words.
         */
        const fn = ( lorem, sit ) => {}
      `,
      options: [
        'always',
      ],
    },
    {
      code: `
        /**
         * @param {string} lorem Description.
         * @param {int}    sit
         */
        const fn = ( lorem, sit ) => {}
      `,
      options: [
        'always',
      ],
    },
    {
      code: `
        /**
         * @param {int}    sit
         * @param {string} lorem Description.
         */
        const fn = ( lorem, sit ) => {}
      `,
      options: [
        'always',
      ],
    },
    {
      code: `
        /**
         * No params.
         */
        const fn = () => {}
      `,
      options: [
        'always',
      ],
    },
    {
      code: `
        const fn = ( lorem, sit ) => {}
      `,
      options: [
        'always',
      ],
    },
    {
      code: `
        /**
         * Function description.
         *
         * @param {string} lorem Description.
         * @param {int}    sit   Description multi words.
         */
        function fn( lorem, sit ) {}
      `,
      options: [
        'always',
      ],
    },
    {
      code: `
        const object = {
          /**
           * Function description.
           *
           * @param {string} lorem Description.
           * @param {int}    sit   Description multi words.
           */
          fn( lorem, sit ) {},
        }
      `,
      options: [
        'always',
      ],
    },
    {
      code: `
        class ClassName {
          /**
           * Function description.
           *
           * @param {string} lorem Description.
           * @param {int}    sit   Description multi words.
           */
          fn( lorem, sit ) {}
        }
      `,
      options: [
        'always',
      ],
    },
    {
      code: `
        /**
         * Function description.
         *
         * @arg {string} lorem Description.
         * @arg {int}    sit   Description multi words.
         */
        const fn = ( lorem, sit ) => {}
      `,
      options: [
        'always',
      ],
    },
    {
      code: `
        /**
         * @namespace
         * @property {object} defaults       Description.
         * @property {int}    defaults.lorem Description multi words.
         */
        const config = {
            defaults: {
                lorem: 1
            }
        }
      `,
      options: [
        'always',
      ],
    },
    {
      code: `
        /**
         * My object.
         *
         * @typedef {Object} MyObject
         *
         * @property {string} lorem Description.
         * @property {int}    sit   Description multi words.
         */
      `,
      options: [
        'always',
      ],
    },
    {
      code: `
        /**
         * My object.
         *
         * @typedef {Object} MyObject
         *
         * @property {{a: number, b: string, c}} lorem Description.
         * @property {Object.<string, Class>}    sit   Description multi words.
         * @property {Object.<string, Class>}    amet  Description} weird {multi} {{words}}.
         * @property {Object.<string, Class>}    dolor
         */
      `,
      options: [
        'always',
      ],
    },
    {
      code: `
        /**
         * Not validating without option.
         *
         * @param {string} lorem Description.
         * @param {int} sit Description multi words.
         */
        const fn = ( lorem, sit ) => {}
      `,
    },
  ],
};
