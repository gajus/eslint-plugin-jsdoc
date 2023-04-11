import defaultTagOrder from '../../../src/defaultTagOrder';

const tagList = defaultTagOrder.flatMap((obj) => {
  return obj.tags;
});

const tagSequenceUser = [
  {
    tags: [
      'since', 'access',
    ],
  },
  {
    tags: [
      'class', 'augments', 'mixes',
    ],
  },
  {
    tags: [
      'alias', 'memberof',
    ],
  },
  {
    tags: [
      'see', 'link', 'global',
    ],
  },
  {
    tags: [
      'fires', 'listens',
    ],
  },
  {
    tags: [
      'param',
    ],
  },
  {
    tags: [
      'yields',
    ],
  },
  {
    tags: [
      'returns',
    ],
  },
];

const tagSequenceUser2 = [
  {
    tags: [
      'since', 'access',
    ],
  },
  {
    tags: [
      'class', 'augments', 'mixes',
    ],
  },
  {
    tags: [
      'alias', 'memberof',
    ],
  },
  {
    tags: [
      'see', 'link', 'global',
    ],
  },
  {
    tags: [
      'fires', '-other', 'listens',
    ],
  },
  {
    tags: [
      'param',
    ],
  },
  {
    tags: [
      'yields',
    ],
  },
  {
    tags: [
      'returns',
    ],
  },
];

const tagListUser = tagSequenceUser.flatMap((obj) => {
  return obj.tags;
});

export default {
  invalid: [
    {
      code: `
        /**
         * @returns {string}
         * @param b
         * @param a
         */
        function quux () {}
      `,
      errors: [
        {
          line: 3,
          message: 'Tags are not in the prescribed order: ' + tagList.join(', '),
        },
      ],
      output: `
        /**
         * @param b
         * @param a
         * @returns {string}
         */
        function quux () {}
      `,
    },
    {
      code: `
        /**
         * Some description
         * @returns {string}
         * @param b
         * @param a
         */
        function quux () {}
      `,
      errors: [
        {
          line: 4,
          message: 'Tags are not in the prescribed order: ' + tagList.join(', '),
        },
      ],
      output: `
        /**
         * Some description
         * @param b
         * @param a
         * @returns {string}
         */
        function quux () {}
      `,
    },
    {
      code: `
        /**
         * @returns {string}
         * @param b A long
         *   description
         * @param a
         */
        function quux () {}
      `,
      errors: [
        {
          line: 3,
          message: 'Tags are not in the prescribed order: ' + tagList.join(', '),
        },
      ],
      output: `
        /**
         * @param b A long
         *   description
         * @param a
         * @returns {string}
         */
        function quux () {}
      `,
    },
    {
      code: `
        /**
         * Some description
         * @returns {string}
         * @param b A long
         *   description
         * @param a
         */
        function quux () {}
      `,
      errors: [
        {
          line: 4,
          message: 'Tags are not in the prescribed order: ' + tagList.join(', '),
        },
      ],
      output: `
        /**
         * Some description
         * @param b A long
         *   description
         * @param a
         * @returns {string}
         */
        function quux () {}
      `,
    },
    {
      code: `
        /**
         * @param b A long
         *   description
         * @returns {string}
         * @param a
         */
        function quux () {}
      `,
      errors: [
        {
          line: 5,
          message: 'Tags are not in the prescribed order: ' + tagList.join(', '),
        },
      ],
      output: `
        /**
         * @param b A long
         *   description
         * @param a
         * @returns {string}
         */
        function quux () {}
      `,
    },
    {
      code: `
        /**
         * @def
         * @xyz
         * @abc
         */
        function quux () {}
      `,
      errors: [
        {
          line: 3,
          message: 'Tags are not in the prescribed order: ' + tagList.join(', '),
        },
      ],
      options: [
        {
          alphabetizeExtras: true,
        },
      ],
      output: `
        /**
         * @abc
         * @def
         * @xyz
         */
        function quux () {}
      `,
    },
    {
      code: `
        /**
         * @xyz
         * @def
         * @abc
         */
        function quux () {}
      `,
      errors: [
        {
          line: 3,
          message: 'Tags are not in the prescribed order: def, xyz, abc',
        },
      ],
      options: [
        {
          tagSequence: [
            {
              tags: [
                'def', 'xyz', 'abc',
              ],
            },
          ],
        },
      ],
      output: `
        /**
         * @def
         * @xyz
         * @abc
         */
        function quux () {}
      `,
    },
    {
      code: `
        /**
         * @xyz
         * @def
         * @abc
         */
        function quux () {}
      `,
      errors: [
        {
          line: 3,
          message: 'Tags are not in the prescribed order: def, xyz, abc',
        },
      ],
      options: [
        {
          tagSequence: [
            {
              tags: [
                'def', 'xyz',
              ],
            },
            {
              tags: [
                'abc',
              ],
            },
          ],
        },
      ],
      output: `
        /**
         * @def
         * @xyz
         * @abc
         */
        function quux () {}
      `,
    },
    {
      code: `
        /**
         * @returns {string}
         * @ignore
         * @param b A long
         *   description
         * @param a
         * @module
         */
        function quux () {}
      `,
      errors: [
        {
          line: 3,
          message: 'Tags are not in the prescribed order: ' + tagList.join(', '),
        },
      ],
      output: `
        /**
         * @module
         * @param b A long
         *   description
         * @param a
         * @returns {string}
         * @ignore
         */
        function quux () {}
      `,
    },
    {
      code: `
        /**
         * @xyz
         * @abc
         * @abc
         * @def
         * @xyz
         */
        function quux () {}
      `,
      errors: [
        {
          line: 3,
          message: 'Tags are not in the prescribed order: ' + tagList.join(', '),
        },
      ],
      options: [
        {
          alphabetizeExtras: true,
        },
      ],
      output: `
        /**
         * @abc
         * @abc
         * @def
         * @xyz
         * @xyz
         */
        function quux () {}
      `,
    },
    {
      code: `
        /**
         * @param b A long
         *   description
         * @module
         */
        function quux () {}
      `,
      errors: [
        {
          line: 3,
          message: 'Tags are not in the prescribed order: ' + tagList.join(', '),
        },
      ],
      output: `
        /**
         * @module
         * @param b A long
         *   description
         */
        function quux () {}
      `,
    },
    {
      code: `
        /**
         * @def
         * @xyz
         * @abc
         */
        function quux () {}
      `,
      errors: [
        {
          line: 4,
          message: 'Tag groups do not have the expected whitespace',
        },
      ],
      options: [
        {
          linesBetween: 2,
          tagSequence: [
            {
              tags: [
                'qrs',
              ],
            },
            {
              tags: [
                'def', 'xyz',
              ],
            },
            {
              tags: [
                'abc',
              ],
            },
          ],
        },
      ],
      output: `
        /**
         * @def
         * @xyz
         *
         *
         * @abc
         */
        function quux () {}
      `,
    },
    {
      code: `
        /**
         * @def
         * @xyz
         *
         *
         * @abc
         */
        function quux () {}
      `,
      errors: [
        {
          line: 4,
          message: 'Tag groups do not have the expected whitespace',
        },
      ],
      options: [
        {
          linesBetween: 1,
          tagSequence: [
            {
              tags: [
                'qrs',
              ],
            },
            {
              tags: [
                'def', 'xyz',
              ],
            },
            {
              tags: [
                'abc',
              ],
            },
          ],
        },
      ],
      output: `
        /**
         * @def
         * @xyz
         *
         * @abc
         */
        function quux () {}
      `,
    },
    {
      code: `
        /**
         * @def
         * @xyz A multiline
         * description
         * @abc
         */
        function quux () {}
      `,
      errors: [
        {
          line: 4,
          message: 'Tag groups do not have the expected whitespace',
        },
      ],
      options: [
        {
          linesBetween: 2,
          tagSequence: [
            {
              tags: [
                'qrs',
              ],
            },
            {
              tags: [
                'def', 'xyz',
              ],
            },
            {
              tags: [
                'abc',
              ],
            },
          ],
        },
      ],
      output: `
        /**
         * @def
         * @xyz A multiline
         * description
         *
         *
         * @abc
         */
        function quux () {}
      `,
    },
    {
      code: `
        /**
         * @def
         * @xyz
         * @xyz
         *
         *
         * @abc
         */
        function quux () {}
      `,
      errors: [
        {
          line: 5,
          message: 'Tag groups do not have the expected whitespace',
        },
      ],
      options: [
        {
          linesBetween: 1,
          tagSequence: [
            {
              tags: [
                'qrs',
              ],
            },
            {
              tags: [
                'def', 'xyz',
              ],
            },
            {
              tags: [
                'abc',
              ],
            },
          ],
        },
      ],
      output: `
        /**
         * @def
         * @xyz
         * @xyz
         *
         * @abc
         */
        function quux () {}
      `,
    },
    {
      code: `
        /**
         * Foo
         *
         * @param {(
         *  req: express.Request,
         *  done: (error: any, user?: any, info?: any) => void
         * ) => void} verify - callback to excute custom authentication logic
         * @see https://github.com/jaredhanson/passport/blob/v0.4.1/lib/middleware/authenticate.js#L217
         *
         */
      `,
      errors: [
        {
          line: 5,
          message: 'Tags are not in the prescribed order: ' + tagListUser.join(', '),
        },
      ],
      options: [
        {
          tagSequence: tagSequenceUser,
        },
      ],
      output: `
        /**
         * Foo
         *
         * @see https://github.com/jaredhanson/passport/blob/v0.4.1/lib/middleware/authenticate.js#L217
         *
         * @param {(
         *  req: express.Request,
         *  done: (error: any, user?: any, info?: any) => void
         * ) => void} verify - callback to excute custom authentication logic
         */
      `,
    },
    {
      code: `
        /**
         * Summary. (use period)
         *
         * Description. (use period)
         *
         * @since      1.0.1
         * @access     private
         *
         * @class
         * @mixes    mixin
         *
         * @alias    realName
         * @memberof namespace
         *
         * @see  Function/class relied on
         * @global
         *
         * @tutorial Asd
         * @license MIT
         *
         * @fires   eventName
         * @fires   className#eventName
         * @listens event:eventName
         * @listens className~event:eventName
         *
         * @tutorial Asd
         * @license MIT
         *
         * @yields {string} Yielded value description.
         *
         * @param {string} var1 - Description.
         * @param {string} var2 - Description of optional variable.
         * @param {string} var3 - Description of optional variable with default variable.
         * @param {object} objectVar - Description.
         * @param {string} objectVar.key - Description of a key in the objectVar parameter.
         *
         * @returns {string} Return value description.
         */
      `,
      errors: [
        {
          line: 19,
          message: 'Tags are not in the prescribed order: ' + tagListUser.join(', '),
        },
      ],
      options: [
        {
          tagSequence: tagSequenceUser,
        },
      ],
      output: `
        /**
         * Summary. (use period)
         *
         * Description. (use period)
         *
         * @since      1.0.1
         * @access     private
         *
         * @class
         * @mixes    mixin
         *
         * @alias    realName
         * @memberof namespace
         *
         * @see  Function/class relied on
         * @global
         *
         * @fires   eventName
         * @fires   className#eventName
         * @listens event:eventName
         * @listens className~event:eventName
         *
         * @param {string} var1 - Description.
         * @param {string} var2 - Description of optional variable.
         * @param {string} var3 - Description of optional variable with default variable.
         * @param {object} objectVar - Description.
         * @param {string} objectVar.key - Description of a key in the objectVar parameter.
         *
         * @yields {string} Yielded value description.
         *
         * @returns {string} Return value description.
         * @tutorial Asd
         * @license MIT
         *
         * @tutorial Asd
         * @license MIT
         *
         */
      `,
    },
    {
      code: `
        /**
         * Summary. (use period)
         *
         * Description. (use period)
         *
         * @since      1.0.1
         * @access     private
         *
         * @class
         * @mixes    mixin
         *
         * @alias    realName
         * @memberof namespace
         *
         * @see  Function/class relied on
         * @global
         *
         * @fires   eventName
         * @fires   className#eventName
         * @listens event:eventName
         * @listens className~event:eventName
         *
         * @param {string} var1 - Description.
         * @param {string} var2 - Description of optional variable.
         * @param {string} var3 - Description of optional variable with default variable.
         * @param {object} objectVar - Description.
         * @param {string} objectVar.key - Description of a key in the objectVar parameter.
         *
         * @yields {string} Yielded value description.
         *
         * @returns {string} Return value description.
         * @tutorial Asd
         * @license MIT
         *
         * @tutorial Asd
         * @license MIT
         *
         */
      `,
      errors: [
        {
          line: 32,
          message: 'Tag groups do not have the expected whitespace',
        },
      ],
      ignoreReadme: true,
      options: [
        {
          tagSequence: tagSequenceUser,
        },
      ],
      output: `
        /**
         * Summary. (use period)
         *
         * Description. (use period)
         *
         * @since      1.0.1
         * @access     private
         *
         * @class
         * @mixes    mixin
         *
         * @alias    realName
         * @memberof namespace
         *
         * @see  Function/class relied on
         * @global
         *
         * @fires   eventName
         * @fires   className#eventName
         * @listens event:eventName
         * @listens className~event:eventName
         *
         * @param {string} var1 - Description.
         * @param {string} var2 - Description of optional variable.
         * @param {string} var3 - Description of optional variable with default variable.
         * @param {object} objectVar - Description.
         * @param {string} objectVar.key - Description of a key in the objectVar parameter.
         *
         * @yields {string} Yielded value description.
         *
         * @returns {string} Return value description.
         *
         * @tutorial Asd
         * @license MIT
         *
         * @tutorial Asd
         * @license MIT
         *
         */
      `,
    },
    {
      code: `
        /**
         * Summary. (use period)
         *
         * Description. (use period)
         *
         * @since      1.0.1
         * @access     private
         *
         * @class
         * @mixes    mixin
         *
         * @alias    realName
         * @memberof namespace
         *
         * @see  Function/class relied on
         * @global
         *
         * @fires   eventName
         * @fires   className#eventName
         * @listens event:eventName
         * @listens className~event:eventName
         *
         * @param {string} var1 - Description.
         * @param {string} var2 - Description of optional variable.
         * @param {string} var3 - Description of optional variable with default variable.
         * @param {object} objectVar - Description.
         * @param {string} objectVar.key - Description of a key in the objectVar parameter.
         *
         * @yields {string} Yielded value description.
         *
         * @returns {string} Return value description.
         *
         * @tutorial Asd
         * @license MIT
         *
         * @tutorial Asd
         * @license MIT
         *
         */
      `,
      errors: [
        {
          line: 35,
          message: 'Intra-group tags have unexpected whitespace',
        },
      ],
      ignoreReadme: true,
      options: [
        {
          tagSequence: tagSequenceUser,
        },
      ],
      output: `
        /**
         * Summary. (use period)
         *
         * Description. (use period)
         *
         * @since      1.0.1
         * @access     private
         *
         * @class
         * @mixes    mixin
         *
         * @alias    realName
         * @memberof namespace
         *
         * @see  Function/class relied on
         * @global
         *
         * @fires   eventName
         * @fires   className#eventName
         * @listens event:eventName
         * @listens className~event:eventName
         *
         * @param {string} var1 - Description.
         * @param {string} var2 - Description of optional variable.
         * @param {string} var3 - Description of optional variable with default variable.
         * @param {object} objectVar - Description.
         * @param {string} objectVar.key - Description of a key in the objectVar parameter.
         *
         * @yields {string} Yielded value description.
         *
         * @returns {string} Return value description.
         *
         * @tutorial Asd
         * @license MIT
         * @tutorial Asd
         * @license MIT
         *
         */
      `,
    },
    {
      code: `
        /**
         * Summary. (use period)
         *
         * Description. (use period)
         *
         * @since      1.0.1
         * @access     private
         *
         * @class
         * @mixes    mixin
         *
         * @alias    realName
         * @memberof namespace
         *
         * @see  Function/class relied on
         * @global
         *
         * @fires   eventName
         *
         * @fires   className#eventName
         * @listens event:eventName
         * @listens className~event:eventName
         *
         * @param {string} var1 - Description.
         * @param {string} var2 - Description of optional variable.
         * @param {string} var3 - Description of optional variable with default variable.
         * @param {object} objectVar - Description.
         * @param {string} objectVar.key - Description of a key in the objectVar parameter.
         *
         * @yields {string} Yielded value description.
         *
         * @returns {string} Return value description.
         *
         * @tutorial Asd
         * @license MIT
         * @tutorial Asd
         * @license MIT
         *
         */
      `,
      errors: [
        {
          line: 19,
          message: 'Intra-group tags have unexpected whitespace',
        },
      ],
      ignoreReadme: true,
      options: [
        {
          tagSequence: tagSequenceUser,
        },
      ],
      output: `
        /**
         * Summary. (use period)
         *
         * Description. (use period)
         *
         * @since      1.0.1
         * @access     private
         *
         * @class
         * @mixes    mixin
         *
         * @alias    realName
         * @memberof namespace
         *
         * @see  Function/class relied on
         * @global
         *
         * @fires   eventName
         * @fires   className#eventName
         * @listens event:eventName
         * @listens className~event:eventName
         *
         * @param {string} var1 - Description.
         * @param {string} var2 - Description of optional variable.
         * @param {string} var3 - Description of optional variable with default variable.
         * @param {object} objectVar - Description.
         * @param {string} objectVar.key - Description of a key in the objectVar parameter.
         *
         * @yields {string} Yielded value description.
         *
         * @returns {string} Return value description.
         *
         * @tutorial Asd
         * @license MIT
         * @tutorial Asd
         * @license MIT
         *
         */
      `,
    },
    {
      code: `
        /**
         * Summary. (use period)
         *
         * Description. (use period)
         *
         * @since      1.0.1
         * @access     private
         *
         * @class
         * @mixes    mixin
         *
         * @alias    realName
         * @memberof namespace
         *
         * @see  Function/class relied on
         * @global
         *
         * @fires   eventName
         * @fires   className#eventName
         * @listens event:eventName
         *
         * @listens className~event:eventName
         *
         * @param {string} var1 - Description.
         * @param {string} var2 - Description of optional variable.
         * @param {string} var3 - Description of optional variable with default variable.
         * @param {object} objectVar - Description.
         * @param {string} objectVar.key - Description of a key in the objectVar parameter.
         *
         * @yields {string} Yielded value description.
         *
         * @returns {string} Return value description.
         *
         * @tutorial Asd
         * @license MIT
         * @tutorial Asd
         * @license MIT
         *
         */
      `,
      errors: [
        {
          line: 21,
          message: 'Intra-group tags have unexpected whitespace',
        },
      ],
      ignoreReadme: true,
      options: [
        {
          tagSequence: tagSequenceUser,
        },
      ],
      output: `
        /**
         * Summary. (use period)
         *
         * Description. (use period)
         *
         * @since      1.0.1
         * @access     private
         *
         * @class
         * @mixes    mixin
         *
         * @alias    realName
         * @memberof namespace
         *
         * @see  Function/class relied on
         * @global
         *
         * @fires   eventName
         * @fires   className#eventName
         * @listens event:eventName
         * @listens className~event:eventName
         *
         * @param {string} var1 - Description.
         * @param {string} var2 - Description of optional variable.
         * @param {string} var3 - Description of optional variable with default variable.
         * @param {object} objectVar - Description.
         * @param {string} objectVar.key - Description of a key in the objectVar parameter.
         *
         * @yields {string} Yielded value description.
         *
         * @returns {string} Return value description.
         *
         * @tutorial Asd
         * @license MIT
         * @tutorial Asd
         * @license MIT
         *
         */
      `,
    },
    {
      code: `
        /**
         * Summary. (use period)
         *
         * Description. (use period)
         *
         * @since      1.0.1
         * @access     private
         *
         * @class
         * @mixes    mixin
         *
         * @alias    realName
         * @memberof namespace
         *
         * @see  Function/class relied on
         * @global
         *
         * @fires   eventName
         * @fires   className#eventName
         * @tutorial Asd
         * @license MIT
         *
         * @listens event:eventName
         * @listens className~event:eventName
         *
         * @param {string} var1 - Description.
         * @param {string} var2 - Description of optional variable.
         * @param {string} var3 - Description of optional variable with default variable.
         * @param {object} objectVar - Description.
         * @param {string} objectVar.key - Description of a key in the objectVar parameter.
         *
         * @yields {string} Yielded value description.
         *
         * @returns {string} Return value description.
         */
      `,
      errors: [
        {
          line: 22,
          message: 'Intra-group tags have unexpected whitespace',
        },
      ],
      ignoreReadme: true,
      options: [
        {
          tagSequence: tagSequenceUser2,
        },
      ],
      output: `
        /**
         * Summary. (use period)
         *
         * Description. (use period)
         *
         * @since      1.0.1
         * @access     private
         *
         * @class
         * @mixes    mixin
         *
         * @alias    realName
         * @memberof namespace
         *
         * @see  Function/class relied on
         * @global
         *
         * @fires   eventName
         * @fires   className#eventName
         * @tutorial Asd
         * @license MIT
         * @listens event:eventName
         * @listens className~event:eventName
         *
         * @param {string} var1 - Description.
         * @param {string} var2 - Description of optional variable.
         * @param {string} var3 - Description of optional variable with default variable.
         * @param {object} objectVar - Description.
         * @param {string} objectVar.key - Description of a key in the objectVar parameter.
         *
         * @yields {string} Yielded value description.
         *
         * @returns {string} Return value description.
         */
      `,
    },
    {
      code: `
        /**
         * @def
         * @zzz
         * @abc
         */
        function quux () {}
      `,
      errors: [
        {
          line: 4,
          message: 'Tag groups do not have the expected whitespace',
        },
      ],
      options: [
        {
          linesBetween: 1,
          tagSequence: [
            {
              tags: [
                'qrs',
              ],
            },
            {
              tags: [
                'def', '-other', 'xyz',
              ],
            },
            {
              tags: [
                'abc',
              ],
            },
          ],
        },
      ],
      output: `
        /**
         * @def
         * @zzz
         *
         * @abc
         */
        function quux () {}
      `,
    },
    {
      code: `
        /**
         * Summary. (use period)
         *
         * Description. (use period)
         *
         * @since      1.0.1
         * @access     private
         *
         * @class
         * @mixes    mixin
         *
         * @alias    realName
         * @memberof namespace
         *
         * @see  Function/class relied on
         * @global
         *
         * @fires   eventName
         * @fires   className#eventName
         * @tutorial Asd
         *
         * @license MIT
         *
         *
         */
      `,
      errors: [
        {
          line: 21,
          message: 'Intra-group tags have unexpected whitespace',
        },
      ],
      ignoreReadme: true,
      options: [
        {
          tagSequence: tagSequenceUser2,
        },
      ],
      output: `
        /**
         * Summary. (use period)
         *
         * Description. (use period)
         *
         * @since      1.0.1
         * @access     private
         *
         * @class
         * @mixes    mixin
         *
         * @alias    realName
         * @memberof namespace
         *
         * @see  Function/class relied on
         * @global
         *
         * @fires   eventName
         * @fires   className#eventName
         * @tutorial Asd
         * @license MIT
         *
         *
         */
      `,
    },
    {
      code: `
        /**
         * @xyz
         * @def
         * @abc
         */
        function quux () {}
      `,
      errors: [
        {
          line: 3,
          message: 'Tags are not in the prescribed order: (alphabetical)',
        },
      ],
      options: [
        {
          alphabetizeExtras: true,
          tagSequence: [],
        },
      ],
      output: `
        /**
         * @abc
         * @def
         * @xyz
         */
        function quux () {}
      `,
    },
    {
      code: `
        /**
         * @example
         * enum Color { Red, Green, Blue }
         * faker.helpers.enumValue(Color) // 1 (Green)
         *
         * enum Direction { North = 'North', South = 'South'}
         * faker.helpers.enumValue(Direction) // 'South'
         *
         * enum HttpStatus { Ok = 200, Created = 201, BadRequest = 400, Unauthorized = 401 }
         * faker.helpers.enumValue(HttpStatus) // 200 (Ok)
         * @since 8.0.0
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Tag groups do not have the expected whitespace',
        },
      ],
      options: [
        {
          tagSequence: [
            {
              tags: [
                'internal',
              ],
            },
            {
              tags: [
                'template', 'param',
              ],
            },
            {
              tags: [
                'returns',
              ],
            },
            {
              tags: [
                'throws',
              ],
            },
            {
              tags: [
                'see',
              ],
            },
            {
              tags: [
                'example',
              ],
            },
            {
              tags: [
                'since',
              ],
            },
            {
              tags: [
                'deprecated',
              ],
            },
          ],
        },
      ],
      output: `
        /**
         * @example
         * enum Color { Red, Green, Blue }
         * faker.helpers.enumValue(Color) // 1 (Green)
         *
         * enum Direction { North = 'North', South = 'South'}
         * faker.helpers.enumValue(Direction) // 'South'
         *
         * enum HttpStatus { Ok = 200, Created = 201, BadRequest = 400, Unauthorized = 401 }
         * faker.helpers.enumValue(HttpStatus) // 200 (Ok)
         *
         * @since 8.0.0
         */
      `,
    },
  ],
  valid: [
    {
      code: `
        /**
         * @param b
         * @param a
         * @returns {string}
         */
        function quux () {}
      `,
    },
    {
      code: `
        /**
         * @abc
         * @def
         * @xyz
         */
        function quux () {}
      `,
      options: [
        {
          alphabetizeExtras: true,
        },
      ],
    },
    {
      code: `
        /**
         * @def
         * @xyz
         * @abc
         */
        function quux () {}
      `,
      options: [
        {
          alphabetizeExtras: false,
        },
      ],
    },
    {
      code: `
        /**
         * @def
         * @xyz
         * @abc
         */
        function quux () {}
      `,
      options: [
        {
          tagSequence: [
            {
              tags: [
                'def', 'xyz', 'abc',
              ],
            },
          ],
        },
      ],
    },
    {
      code: `
        /** @def */
        function quux () {}
      `,
    },
    {
      code: `
        /**
         * @def
         * @xyz
         *
         * @abc
         */
        function quux () {}
      `,
      options: [
        {
          linesBetween: 1,
          tagSequence: [
            {
              tags: [
                'qrs',
              ],
            },
            {
              tags: [
                'def', 'xyz',
              ],
            },
            {
              tags: [
                'abc',
              ],
            },
          ],
        },
      ],
    },
    {
      code: `
        /**
         * @def
         * @xyz A multiline
         * description
         *
         * @abc
         */
        function quux () {}
      `,
      options: [
        {
          linesBetween: 1,
          tagSequence: [
            {
              tags: [
                'qrs',
              ],
            },
            {
              tags: [
                'def', 'xyz',
              ],
            },
            {
              tags: [
                'abc',
              ],
            },
          ],
        },
      ],
    },
    {
      code: `
        /**
         * Foo
         *
         * @see https://github.com/jaredhanson/passport/blob/v0.4.1/lib/middleware/authenticate.js#L217
         *
         * @param {(
         *  req: express.Request,
         *  done: (error: any, user?: any, info?: any) => void
         * ) => void} verify - callback to excute custom authentication logic
         */
      `,
      options: [
        {
          tagSequence: tagSequenceUser,
        },
      ],
    },
    {
      code: `
        /**
         * Constructor.
         *
         * @public
         *
         * @param {string} [message] - Error message.
         */
      `,
      options: [
        {
          tagSequence: [
            {
              tags: [
                'since', 'access',
              ],
            },
            {
              tags: [
                'class', 'augments', 'mixes',
              ],
            },
            {
              tags: [
                'alias', 'memberof',
              ],
            },
            {
              tags: [
                'public', 'protected', 'private', 'override',
              ],
            },
            {
              tags: [
                'override', 'async',
              ],
            },
            {
              tags: [
                'see', 'link', 'global',
              ],
            },
            {
              tags: [
                'param',
              ],
            },
            {
              tags: [
                'yields',
              ],
            },
            {
              tags: [
                'returns',
              ],
            },
            {
              tags: [
                'fires', '-other', 'listens',
              ],
            },
          ],
        },
      ],
    },
    {
      code: `
        /**
         * @param options.mode The mode to generate the birthdate. Supported modes are \`'age'\` and \`'year'\` .
         *
         * There are two modes available \`'age'\` and \`'year'\`:
         * - \`'age'\`: The min and max options define the age of the person (e.g. \`18\` - \`42\`).
         * - \`'year'\`: The min and max options define the range the birthdate may be in (e.g. \`1900\` - \`2000\`).
         *
         * Defaults to \`year\`.
         *
         * @example
         */
      `,
      options: [
        {
          tagSequence: [
            {
              tags: [
                'internal',
              ],
            },
            {
              tags: [
                'template', 'param',
              ],
            },
            {
              tags: [
                'returns',
              ],
            },
            {
              tags: [
                'throws',
              ],
            },
            {
              tags: [
                'see',
              ],
            },
            {
              tags: [
                'example',
              ],
            },
            {
              tags: [
                'since',
              ],
            },
            {
              tags: [
                'deprecated',
              ],
            },
          ],
        },
      ],
    },
    {
      code: `
        /**
         * @example
         * enum Color { Red, Green, Blue }
         * faker.helpers.enumValue(Color) // 1 (Green)
         *
         * enum Direction { North = 'North', South = 'South'}
         * faker.helpers.enumValue(Direction) // 'South'
         *
         * enum HttpStatus { Ok = 200, Created = 201, BadRequest = 400, Unauthorized = 401 }
         * faker.helpers.enumValue(HttpStatus) // 200 (Ok)
         *
         * @since 8.0.0
         */
      `,
      options: [
        {
          tagSequence: [
            {
              tags: [
                'internal',
              ],
            },
            {
              tags: [
                'template', 'param',
              ],
            },
            {
              tags: [
                'returns',
              ],
            },
            {
              tags: [
                'throws',
              ],
            },
            {
              tags: [
                'see',
              ],
            },
            {
              tags: [
                'example',
              ],
            },
            {
              tags: [
                'since',
              ],
            },
            {
              tags: [
                'deprecated',
              ],
            },
          ],
        },
      ],
    },
    {
      code: `
        /**
         * @def
         * @xyz
         * @abc
         */
        function quux () {}
      `,
      options: [
        {
          linesBetween: 2,
          reportTagGroupSpacing: false,
          tagSequence: [
            {
              tags: [
                'qrs',
              ],
            },
            {
              tags: [
                'def', 'xyz',
              ],
            },
            {
              tags: [
                'abc',
              ],
            },
          ],
        },
      ],
    },
    {
      code: `
        /**
         * Summary. (use period)
         *
         * Description. (use period)
         *
         * @since      1.0.1
         * @access     private
         *
         * @class
         * @mixes    mixin
         *
         * @alias    realName
         * @memberof namespace
         *
         * @see  Function/class relied on
         * @global
         *
         * @fires   eventName
         * @fires   className#eventName
         * @listens event:eventName
         * @listens className~event:eventName
         *
         * @param {string} var1 - Description.
         * @param {string} var2 - Description of optional variable.
         * @param {string} var3 - Description of optional variable with default variable.
         * @param {object} objectVar - Description.
         * @param {string} objectVar.key - Description of a key in the objectVar parameter.
         *
         * @yields {string} Yielded value description.
         *
         * @returns {string} Return value description.
         *
         * @tutorial Asd
         * @license MIT
         *
         * @tutorial Asd
         * @license MIT
         *
         */
      `,
      ignoreReadme: true,
      options: [
        {
          reportIntraTagGroupSpacing: false,
          tagSequence: tagSequenceUser,
        },
      ],
    },
  ],
};
