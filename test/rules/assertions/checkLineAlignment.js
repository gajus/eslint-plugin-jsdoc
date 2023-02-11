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
          line: 2,
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
    /* eslint-disable no-tabs */
    {
      code: `
				/**
				 * With tabs.
				 *
				 * @param {string} lorem Description.
				 * @param {int} sit Description multi words.
				 */
        const fn = ( lorem, sit ) => {}
      `,
      errors: [
        {
          line: 2,
          message: 'Expected JSDoc block lines to be aligned.',
          type: 'Block',
        },
      ],
      options: [
        'always',
      ],
      output: `
				/**
				 * With tabs.
				 *
				 * @param {string} lorem Description.
				 * @param {int}    sit   Description multi words.
				 */
        const fn = ( lorem, sit ) => {}
      `,
    },
    /* eslint-enable no-tabs */
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
          line: 2,
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
          line: 2,
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
          line: 2,
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
          line: 2,
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
          line: 2,
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
          line: 2,
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
          line: 3,
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
          line: 3,
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
          line: 2,
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
          line: 2,
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
          line: 2,
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
          line: 2,
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
          line: 2,
          message: 'Expected JSDoc block lines to be aligned.',
          type: 'Block',
        },
      ],
      options: [
        'always', {
          tags: [
            'typedef', 'property',
          ],
        },
      ],
      output: `
        /**
         * My object.
         *
         * @typedef  {Object}                    MyObject
         *
         * @property {{a: number, b: string, c}} lorem    Description.
         * @property {Object.<string, Class>}    sit      Description multi words.
         * @property {Object.<string, Class>}    amet     Description} weird {multi} {{words}}.
         * @property {Object.<string, Class>}    dolor
         */
      `,
    },
    {
      code: `
        /**
         * My function.
         *
         * @param {string} lorem  Description.
         * @param {int}    sit    Description multi words.
         */
        const fn = ( lorem, sit ) => {}
      `,
      errors: [
        {
          line: 5,
          message: 'Expected JSDoc block lines to not be aligned.',
          type: 'Block',
        },
        {
          line: 6,
          message: 'Expected JSDoc block lines to not be aligned.',
          type: 'Block',
        },
      ],
      options: [
        'never',
      ],
      output: `
        /**
         * My function.
         *
         * @param {string} lorem Description.
         * @param {int}    sit    Description multi words.
         */
        const fn = ( lorem, sit ) => {}
      `,
    },
    {
      code: `
        /**
         * My function.
         *
         * @param {string} lorem Description.
         * @param   {int}    sit   Description multi words.
         */
        const fn = ( lorem, sit ) => {}
      `,
      errors: [
        {
          line: 6,
          message: 'Expected JSDoc block lines to not be aligned.',
          type: 'Block',
        },
      ],
      options: [
        'never',
      ],
      output: `
        /**
         * My function.
         *
         * @param {string} lorem Description.
         * @param {int} sit Description multi words.
         */
        const fn = ( lorem, sit ) => {}
      `,
    },
    {
      code: `
        /**
         * My function.
         *
         * @param {string} lorem Description.
         * @param   {int}    sit
         */
        const fn = ( lorem, sit ) => {}
      `,
      errors: [
        {
          line: 6,
          message: 'Expected JSDoc block lines to not be aligned.',
          type: 'Block',
        },
      ],
      options: [
        'never',
      ],
      output: `
        /**
         * My function.
         *
         * @param {string} lorem Description.
         * @param {int} sit
         */
        const fn = ( lorem, sit ) => {}
      `,
    },
    {
      code: `
        /**
         * My function.
         *
         * @param {string} lorem Description.
         * @param   {int}    sit
         */
        const fn = ( lorem, sit ) => {}
      `,
      errors: [
        {
          line: 6,
          message: 'Expected JSDoc block lines to not be aligned.',
          type: 'Block',
        },
      ],
      output: `
        /**
         * My function.
         *
         * @param {string} lorem Description.
         * @param {int} sit
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
         * @param {int} sit Description multi
           line without *.
         */
        const fn = ( lorem, sit ) => {}
      `,
      errors: [
        {
          line: 2,
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
         * @param {int}    sit   Description multi
                                 line without *.
         */
        const fn = ( lorem, sit ) => {}
      `,
    },
    {
      code: `
        /**
         * My function.
         *
         * @param {string} lorem Description.
         * @param   {int}    sit
         *
         * @return  {string}  Return description
         *    with multi line, but don't touch.
         */
        const fn = ( lorem, sit ) => {}
      `,
      errors: [
        {
          line: 2,
          message: 'Expected JSDoc block lines to be aligned.',
          type: 'Block',
        },
      ],
      options: [
        'always', {
          tags: [
            'param',
          ],
        },
      ],
      output: `
        /**
         * My function.
         *
         * @param {string} lorem Description.
         * @param {int}    sit
         *
         * @return  {string}  Return description
         *    with multi line, but don't touch.
         */
        const fn = ( lorem, sit ) => {}
      `,
    },
    {
      code: `
        /**
         * Only return doc.
         *
         * @return {boolean}  Return description.
         */
        const fn = ( lorem, sit ) => {}
      `,
      errors: [
        {
          line: 2,
          message: 'Expected JSDoc block lines to be aligned.',
          type: 'Block',
        },
      ],
      options: [
        'always',
      ],
      output: `
        /**
         * Only return doc.
         *
         * @return {boolean} Return description.
         */
        const fn = ( lorem, sit ) => {}
      `,
    },
    {
      code: `
      /**
       * Creates OS based shortcuts for files, folders, and applications.
       *
       * @param  {object}  options  Options object for each OS.
       * @return {boolean}          True = success, false = failed to create the icon
       */
       function quux () {}
      `,
      errors: [
        {
          line: 5,
          message: 'Expected JSDoc block lines to not be aligned.',
          type: 'Block',
        },
        {
          line: 6,
          message: 'Expected JSDoc block lines to not be aligned.',
          type: 'Block',
        },
      ],
      options: [
        'never',
      ],
      output: `
      /**
       * Creates OS based shortcuts for files, folders, and applications.
       *
       * @param {object} options Options object for each OS.
       * @return {boolean}          True = success, false = failed to create the icon
       */
       function quux () {}
      `,
    },
    {
      code: `
      /**
       * Creates OS based shortcuts for files, folders, and applications.
       *
       * @param {object} options Options object for each OS.
       * @return {boolean}          True = success, false = failed to create the icon
       */
       function quux () {}
      `,
      errors: [
        {
          line: 6,
          message: 'Expected JSDoc block lines to not be aligned.',
          type: 'Block',
        },
      ],
      options: [
        'never',
      ],
      output: `
      /**
       * Creates OS based shortcuts for files, folders, and applications.
       *
       * @param {object} options Options object for each OS.
       * @return {boolean} True = success, false = failed to create the icon
       */
       function quux () {}
      `,
    },
    {
      code: `
      /**
       * Creates OS based shortcuts for files, folders, and applications.
       *
       * @param {object} options Options object for each OS.
       * @return  True = success, false = failed to create the icon
       */
       function quux () {}
      `,
      errors: [
        {
          line: 6,
          message: 'Expected JSDoc block lines to not be aligned.',
          type: 'Block',
        },
      ],
      options: [
        'never',
      ],
      output: `
      /**
       * Creates OS based shortcuts for files, folders, and applications.
       *
       * @param {object} options Options object for each OS.
       * @return True = success, false = failed to create the icon
       */
       function quux () {}
      `,
    },
    {
      code: `
      /**
       * Creates OS based shortcuts for files, folders, and applications.
       *
       * @param  options Options object for each OS.
       * @return True = success, false = failed to create the icon
       */
       function quux () {}
      `,
      errors: [
        {
          line: 5,
          message: 'Expected JSDoc block lines to not be aligned.',
          type: 'Block',
        },
      ],
      options: [
        'never',
      ],
      output: `
      /**
       * Creates OS based shortcuts for files, folders, and applications.
       *
       * @param options Options object for each OS.
       * @return True = success, false = failed to create the icon
       */
       function quux () {}
      `,
    },
    {
      code: `
      /**
       * Creates OS based shortcuts for files, folders, and applications.
       *
       * @param {object} options Options object for each OS.
       * @param {object} other Other.
       * @return  True = success, false = failed to create the icon
       */
       function quux () {}
      `,
      errors: [
        {
          line: 7,
          message: 'Expected JSDoc block lines to not be aligned.',
          type: 'Block',
        },
      ],
      options: [
        'never', {
          tags: [
            'param', 'return',
          ],
        },
      ],
      output: `
      /**
       * Creates OS based shortcuts for files, folders, and applications.
       *
       * @param {object} options Options object for each OS.
       * @param {object} other Other.
       * @return True = success, false = failed to create the icon
       */
       function quux () {}
      `,
    },
    {
      code: `
      /**
       * Returns the value stored in the process.env for a given
       * environment variable.
       *
       * @param  {string} withPercents    '%USERNAME%'
       * @param  {string} withoutPercents 'USERNAME'
       * @return {string}                 'bob' || '%USERNAME%'
       */
      function quux () {}
      `,
      errors: [
        {
          line: 6,
          message: 'Expected JSDoc block lines to not be aligned.',
          type: 'Block',
        },
        {
          line: 7,
          message: 'Expected JSDoc block lines to not be aligned.',
          type: 'Block',
        },
        {
          line: 8,
          message: 'Expected JSDoc block lines to not be aligned.',
          type: 'Block',
        },
      ],
      options: [
        'never',
      ],
      output: `
      /**
       * Returns the value stored in the process.env for a given
       * environment variable.
       *
       * @param {string} withPercents '%USERNAME%'
       * @param  {string} withoutPercents 'USERNAME'
       * @return {string}                 'bob' || '%USERNAME%'
       */
      function quux () {}
      `,
    },
    {
      code: `
      /**
       * Function description
       *           description with post delimiter.
       *
       * @param {string} lorem Description.
       * @param {int}    sit   Description multi words.
       */
      const fn = ( lorem, sit ) => {}
      `,
      errors: [
        {
          line: 2,
          message: 'Expected JSDoc block lines to be aligned.',
          type: 'Block',
        },
      ],
      options: [
        'always',
      ],
      output: `
      /**
       * Function description
       * description with post delimiter.
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
       *
       * @return {string}       Return description.
       */
      const fn = ( lorem, sit ) => {}
      `,
      errors: [
        {
          line: 2,
          message: 'Expected JSDoc block lines to be aligned.',
          type: 'Block',
        },
      ],
      options: [
        'always', {
          customSpacings: {
            postDelimiter: 2,
            postTag: 3,
            postType: 2,
          },
        },
      ],
      output: `
      /**
       * Function description.
       *
       *  @param    {string}  lorem Description.
       *  @param    {int}     sit   Description multi words.
       *
       *  @return   {string}        Return description.
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
       *
       * @return {string}       Return description.
       */
      const fn = ( lorem, sit ) => {}
      `,
      errors: [
        {
          line: 2,
          message: 'Expected JSDoc block lines to be aligned.',
          type: 'Block',
        },
      ],
      options: [
        'always', {
          customSpacings: {
            postName: 3,
          },
        },
      ],
      output: `
      /**
       * Function description.
       *
       * @param  {string} lorem   Description.
       * @param  {int}    sit     Description multi words.
       *
       * @return {string}         Return description.
       */
      const fn = ( lorem, sit ) => {}
      `,
    },
    {
      code: `
      /**
       * Function description.
       *
       *  @param   {string}  lorem Description.
       * @param {int} sit Description multi words.
       */
      const fn = ( lorem, sit ) => {}
      `,
      errors: [
        {
          line: 6,
          message: 'Expected JSDoc block lines to not be aligned.',
          type: 'Block',
        },
      ],
      options: [
        'never', {
          customSpacings: {
            postDelimiter: 2,
            postTag: 3,
            postType: 2,
          },
        },
      ],
      output: `
      /**
       * Function description.
       *
       *  @param   {string}  lorem Description.
       *  @param   {int}  sit Description multi words.
       */
      const fn = ( lorem, sit ) => {}
      `,
    },
    {
      code: `
      /**
       * Function description.
       *
       * @param {string} lorem   Description.
       * @param {int} sit Description multi words.
       */
      const fn = ( lorem, sit ) => {}
      `,
      errors: [
        {
          line: 6,
          message: 'Expected JSDoc block lines to not be aligned.',
          type: 'Block',
        },
      ],
      options: [
        'never', {
          customSpacings: {
            postName: 3,
          },
        },
      ],
      output: `
      /**
       * Function description.
       *
       * @param {string} lorem   Description.
       * @param {int} sit   Description multi words.
       */
      const fn = ( lorem, sit ) => {}
      `,
    },
    {
      code: `\r
        /**\r
         * Function description.\r
         *\r
         * @param {string} lorem Description.\r
         * @param {int} sit Description multi words.\r
         * @param {string} sth   Multi\r
         *                       line description.\r
         */\r
        const fn = ( lorem, sit ) => {}\r
      `,
      errors: [
        {
          line: 2,
          message: 'Expected JSDoc block lines to be aligned.',
          type: 'Block',
        },
      ],
      options: [
        'always',
      ],
      output: `\r
        /**\r
         * Function description.\r
         *\r
         * @param {string} lorem Description.\r
         * @param {int}    sit   Description multi words.\r
         * @param {string} sth   Multi\r
         *                       line description.\r
         */\r
        const fn = ( lorem, sit ) => {}\r
      `,
    },
    {
      code: `
        /**
         * Function description.
         *
         * @param {string} lorem Description.
         * @param {int} sit Description multi
         *   line with asterisks.
         */
        const fn = ( lorem, sit ) => {}
      `,
      errors: [
        {
          line: 2,
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
         * @param {int}    sit   Description multi
         *                       line with asterisks.
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
         * @param {int}    sit   -   Description multi words.
         */
        const fn = ( lorem, sit ) => {}
      `,
      errors: [
        {
          line: 6,
          message: 'Expected JSDoc block lines to not be aligned.',
          type: 'Block',
        },
      ],
      options: [
        'never',
      ],
      output: `
        /**
         * Function description.
         *
         * @param {string} lorem - Description.
         * @param {int} sit - Description multi words.
         */
        const fn = ( lorem, sit ) => {}
      `,
    },
    {
      code: `
        /**
         * Function description.
         *
         * @param {string} lorem -  Description.
         * @param {int}    sit   -   Description multi words.
         */
        const fn = ( lorem, sit ) => {}
      `,
      errors: [
        {
          line: 6,
          message: 'Expected JSDoc block lines to not be aligned.',
          type: 'Block',
        },
      ],
      options: [
        'never',
        {
          customSpacings: {
            postHyphen: 2,
          },
        },
      ],
      output: `
        /**
         * Function description.
         *
         * @param {string} lorem -  Description.
         * @param {int} sit -  Description multi words.
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
         * @param {int} sit -  Description multi words.
         */
        const fn = ( lorem, sit ) => {}
      `,
      errors: [
        {
          line: 5,
          message: 'Expected JSDoc block lines to not be aligned.',
          type: 'Block',
        },
      ],
      options: [
        'never',
        {
          customSpacings: {
            postHyphen: 2,
          },
        },
      ],
      output: `
        /**
         * Function description.
         *
         * @param {string} lorem -  Description.
         * @param {int} sit -  Description multi words.
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
         * @param {int}    sit   -  Description multi words.
         */
        const fn = ( lorem, sit ) => {}
      `,
      errors: [
        {
          line: 2,
          message: 'Expected JSDoc block lines to be aligned.',
          type: 'Block',
        },
      ],
      options: [
        'always', {
          customSpacings: {
            postHyphen: 2,
          },
        },
      ],
      output: `
        /**
         * Function description.
         *
         * @param {string} lorem -  Description.
         * @param {int}    sit   -  Description multi words.
         */
        const fn = ( lorem, sit ) => {}
      `,
    },
    {
      code: `
        /**
         * Function description.
         *
         * @param {string} lorem -  Description.
         * @param {int}    sit   -   Description multi words.
         */
        const fn = ( lorem, sit ) => {}
      `,
      errors: [
        {
          line: 2,
          message: 'Expected JSDoc block lines to be aligned.',
          type: 'Block',
        },
      ],
      options: [
        'always', {
          customSpacings: {
            postHyphen: 2,
          },
        },
      ],
      output: `
        /**
         * Function description.
         *
         * @param {string} lorem -  Description.
         * @param {int}    sit   -  Description multi words.
         */
        const fn = ( lorem, sit ) => {}
      `,
    },
    {
      code: `
        /**
         * Function description.
         *
         * @param   {string} lorem -  Description.
         * @param {int} sit -  Description multi words.
         */
        const fn = ( lorem, sit ) => {}
      `,
      errors: [
        {
          line: 5,
          message: 'Expected JSDoc block lines to not be aligned.',
          type: 'Block',
        },
      ],
      options: [
        'never', {
          customSpacings: {
            postHyphen: 2,
          },
        },
      ],
      output: `
        /**
         * Function description.
         *
         * @param {string} lorem -  Description.
         * @param {int} sit -  Description multi words.
         */
        const fn = ( lorem, sit ) => {}
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
      options: [
        'always',
      ],
    },
    /* eslint-disable no-tabs */
    {
      code: `
				/**
				 * With tabs.
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
    /* eslint-enable no-tabs */
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
         * My object.
         *
         * @typedef  {Object}                    MyObject
         *
         * @property {{a: number, b: string, c}} lorem    Description.
         * @property {Object.<string, Class>}    sit      Description multi words.
         * @property {Object.<string, Class>}    amet     Description} weird {multi} {{words}}.
         * @property {Object.<string, Class>}    dolor
         */
      `,
      options: [
        'always', {
          tags: [
            'typedef', 'property',
          ],
        },
      ],
    },
    {
      code: `
        /**
         * My object.
         *
         * @template                             T
         * @template                             W,X,Y,Z
         * @template {string}                    K               - K must be a string or string literal
         * @template {{ serious(): string }}     Seriousalizable - must have a serious method
         *
         * @param    {{a: number, b: string, c}} lorem           Description.
         */
      `,
      options: [
        'always', {
          tags: [
            'template', 'param',
          ],
        },
      ],
    },
    {
      code: `
        /** @param {number} lorem */
        const fn = ( lorem ) => {}
      `,
      options: [
        'always',
      ],
    },
    {
      code: `
      /**
       * Creates OS based shortcuts for files, folders, and applications.
       *
       * @param  {object}  options Options object for each OS.
       * @return {boolean}         True = success, false = failed to create the icon
       */
       function quux () {}
      `,
      options: [
        'always',
      ],
    },
    {
      code: `
      /**
       * Creates OS based shortcuts for files, folders, and applications.
       *
       * @param  {object}  options Options object for each OS.
       * @return {boolean}
       */
       function quux () {}
      `,
      options: [
        'always',
      ],
    },
    {
      code: `
      /**
       * Only return doc.
       *
       * @return {boolean} Return description.
       */
       function quux () {}
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
    {
      code: `
      /**
       * Creates OS based shortcuts for files, folders, and applications.
       *
       * @param {object} options Options object for each OS.
       * @return {boolean} True = success, false = failed to create the icon
       */
      function quux (options) {}
      `,
    },
    {
      code: `
      /**
       * Creates OS based shortcuts for files, folders, and applications.
       *
       * @param {object} options Options object for each OS.
       * @param {object} other Other.
       * @return  True = success, false = failed to create the icon
       */
       function quux () {}
      `,
      options: [
        'never', {
          tags: [
            'param',
          ],
        },
      ],
    },
    {
      code: `
      /**
       * @param parameter Description.
       */
      function func(parameter){

      }
      `,
    },
    {
      code: `
        /**
         * Function description
         *           description with post delimiter.
         *
         * @param {string} lorem Description.
         * @param {int}    sit   Description multi words.
         */
        const fn = ( lorem, sit ) => {}
      `,
      options: [
        'always', {
          preserveMainDescriptionPostDelimiter: true,
        },
      ],
    },
    {
      code: `
        /**
         * Function description.
         *
         *  @param    {string}  lorem Description.
         *  @param    {int}     sit   Description multi words.
         *
         *  @return   {string}        Return description.
         */
        const fn = ( lorem, sit ) => {}
      `,
      options: [
        'always', {
          customSpacings: {
            postDelimiter: 2,
            postTag: 3,
            postType: 2,
          },
        },
      ],
    },
    {
      code: `
        /**
         * Function description.
         *
         *  @param   {string}  lorem Description.
         *  @param   {int}  sit Description multi words.
         *
         *  @return   {string}  Return description.
         */
        const fn = ( lorem, sit ) => {}
      `,
      options: [
        'never', {
          customSpacings: {
            postDelimiter: 2,
            postTag: 3,
            postType: 2,
          },
        },
      ],
    },
    {
      code: `
        /**
         * @param {{
         *        ids: number[]
         *        }}            params
         */
        const fn = ({ids}) => {}
      `,
      options: [
        'always',
      ],
    },
    {
      code: `\r
        /**\r
         * Function description.\r
         *\r
         * @param {string} lorem Description.\r
         * @param {int}    sit   Description multi words.\r
         * @param {string} sth   Multi\r
         *                       line description.\r
         */\r
        const fn = ( lorem, sit ) => {}\r
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
       * @param lorem Description.
       * @param sit   Description multi words.
       */
      const fn = ( lorem, sit ) => {};

      /**
       * Function description.
       *
       * @return Return description.
       */
      const fn2 = () => {}
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
       * @param lorem Description.
       * @param sit   Description multi words.
       * @return      Return description.
       */
      const fn = ( lorem, sit ) => {};

      /**
       * Function description.
       *
       * @param lorem Description.
       * @param sit   Description multi words.
       * @returns     Return description.
       */
      const fn2 = ( lorem, sit ) => {};

      /**
       * Function description.
       *
       * @param a Description.
       * @param b Description multi words.
       * @returns Return description.
       */
      const fn3 = ( a, b ) => {};
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
       * @argument lorem Description.
       * @return         Return description.
       */
      const fn = ( lorem ) => {};

      /**
       * Function description.
       *
       * @argument lorem Description.
       * @returns        Return description.
       */
      const fn2 = ( lorem ) => {};
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
       * @arg a   Description.
       * @returns Return description.
       */
      const fn = ( a ) => {};
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
       * @arg   lorem Description.
       * @param sit   Return description.
       */
      const fn = ( lorem, sit ) => {};
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
       * @arg      a Description.
       * @argument b Second description.
       * @returns    Return description.
       */
      const fn = ( a, b ) => {};
      `,
      options: [
        'always',
      ],
    },
    {
      code: `
      /**
       * @param {string|string[]|TemplateResult|TemplateResult[]} event.detail.description -
       *    Notification description
       */
      function quux () {}
      `,
    },
  ],
};
