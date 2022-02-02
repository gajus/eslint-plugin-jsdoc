import defaultTagOrder from '../../../src/defaultTagOrder';

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
          message: 'Tags are not in the prescribed order: ' + defaultTagOrder.join(', '),
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
          message: 'Tags are not in the prescribed order: ' + defaultTagOrder.join(', '),
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
          message: 'Tags are not in the prescribed order: ' + defaultTagOrder.join(', '),
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
          message: 'Tags are not in the prescribed order: ' + defaultTagOrder.join(', '),
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
          message: 'Tags are not in the prescribed order: ' + defaultTagOrder.join(', '),
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
          message: 'Tags are not in the prescribed order: ' + defaultTagOrder.join(', '),
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
            'def', 'xyz', 'abc',
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
          message: 'Tags are not in the prescribed order: ' + defaultTagOrder.join(', '),
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
          message: 'Tags are not in the prescribed order: ' + defaultTagOrder.join(', '),
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
          message: 'Tags are not in the prescribed order: ' + defaultTagOrder.join(', '),
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
            'def', 'xyz', 'abc',
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
  ],
};
