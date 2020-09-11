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
    },
    {
      code: `
        /**
         * @param {string} lorem Description.
         * @param {int}    sit
         */
        const fn = ( lorem, sit ) => {}
      `,
    },
    {
      code: `
        /**
         * @param {int}    sit
         * @param {string} lorem Description.
         */
        const fn = ( lorem, sit ) => {}
      `,
    },
    {
      code: `
        /**
         * No params.
         */
        const fn = () => {}
      `,
    },
    {
      code: `
        const fn = ( lorem, sit ) => {}
      `,
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
    },
  ],
};
