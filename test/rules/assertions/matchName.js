export default {
  invalid: [
    {
      code: `
        /**
         * @param opt_a
         * @param opt_b
         */
      `,
      errors: [{
        line: 3,
        message: 'Only allowing names not matching `/^opt_/i` but found "opt_a".',
      }, {
        line: 4,
        message: 'Only allowing names not matching `/^opt_/i` but found "opt_b".',
      }],
      options: [{
        match: [
          {
            disallowName: '/^opt_/i',
          },
        ],
      }],
    },
    {
      code: `
        /**
         * @param opt_a
         * @param opt_b
         */
      `,
      errors: [{
        line: 3,
        message: 'Only allowing names not matching `/^opt_/i` but found "opt_a".',
      }, {
        line: 4,
        message: 'Only allowing names not matching `/^opt_/i` but found "opt_b".',
      }],
      options: [{
        match: [
          {
            disallowName: '/^opt_/i',
            replacement: '',
          },
        ],
      }],
      output: `
        /**
         * @param a
         * @param opt_b
         */
      `,
    },
    {
      code: `
        /**
         * @param a
         * @param opt_b
         */
      `,
      errors: [{
        line: 4,
        message: 'Only allowing names matching `/^[a-z]+$/i` but ' +
          'found "opt_b".',
      }],
      options: [{
        match: [
          {
            allowName: '/^[a-z]+$/i',
          },
        ],
      }],
    },
    {
      code: `
        /**
         * @param arg
         * @param opt_b
         */
      `,
      errors: [{
        line: 3,
        message: 'Only allowing names not matching `/^arg/i` but ' +
          'found "arg".',
      }, {
        line: 4,
        message: 'Only allowing names matching `/^[a-z]+$/i` but ' +
          'found "opt_b".',
      }],
      options: [{
        match: [
          {
            allowName: '/^[a-z]+$/i',
            disallowName: '/^arg/i',
          },
        ],
      }],
    },
    {
      code: `
        /**
         * @param opt_a
         * @param arg
         */
      `,
      errors: [{
        line: 3,
        message: 'Only allowing names not matching `/^opt_/i` but ' +
          'found "opt_a".',
      }, {
        line: 4,
        message: 'Only allowing names not matching `/^arg$/i` but ' +
          'found "arg".',
      }],
      options: [{
        match: [
          {
            disallowName: '/^arg$/i',
          },
          {
            disallowName: '/^opt_/i',
          },
        ],
      }],
    },
    {
      code: `
        /**
         * @property opt_a
         * @param opt_b
         */
      `,
      errors: [{
        line: 4,
        message: 'Only allowing names not matching `/^opt_/i` but found "opt_b".',
      }],
      options: [{
        match: [
          {
            disallowName: '/^opt_/i',
            tags: ['param'],
          },
        ],
      }],
    },
    {
      code: `
        /**
         * @someTag opt_a
         * @param opt_b
         */
      `,
      errors: [{
        line: 4,
        message: 'Only allowing names not matching `/^opt_/i` but found "opt_b".',
      }],
      options: [{
        match: [
          {
            disallowName: '/^opt_/i',
            tags: ['param'],
          },
        ],
      }],
      settings: {
        jsdoc: {
          structuredTags: {
            someTag: {
              name: 'namepath-defining',
            },
          },
        },
      },
    },
    {
      code: `
        /**
         * @property opt_a
         * @param opt_b
         */
      `,
      errors: [{
        line: 3,
        message: 'Only allowing names not matching `/^opt_/i` but found "opt_a".',
      }, {
        line: 4,
        message: 'Only allowing names not matching `/^opt_/i` but found "opt_b".',
      }],
      options: [{
        match: [
          {
            disallowName: '/^opt_/i',
            tags: ['*'],
          },
        ],
      }],
    },
    {
      code: `
        /**
         * @param opt_a
         * @param opt_b
         */
        function quux () {
        }
      `,
      errors: [{
        line: 3,
        message: 'Only allowing names not matching `/^opt_/i` but found "opt_a".',
      }, {
        line: 4,
        message: 'Only allowing names not matching `/^opt_/i` but found "opt_b".',
      }],
      options: [{
        match: [
          {
            context: 'FunctionDeclaration',
            disallowName: '/^opt_/i',
          },
        ],
      }],
    },
    {
      code: `
        /**
         * @property opt_a
         * @param {Bar|Foo} opt_b
         */
      `,
      errors: [{
        line: 2,
        message: 'Prohibited context for "opt_a".',
      }],
      options: [{
        match: [
          {
            comment: 'JSDocBlock:has(JSDocTag[tag="param"][name=/opt_/] > JSDocTypeUnion:has(JsdocTypeName[value="Bar"]:nth-child(1)))',
          },
        ],
      }],
    },
    {
      code: `
        /**
         * @property opt_a
         * @param {Bar|Foo} opt_b
         */
      `,
      errors: [{
        line: 2,
        message: 'Don\'t use `opt_` prefixes with Bar|...',
      }],
      options: [{
        match: [
          {
            comment: 'JSDocBlock:has(JSDocTag[tag="param"][name=/opt_/] > JSDocTypeUnion:has(JsdocTypeName[value="Bar"]:nth-child(1)))',
            message: 'Don\'t use `opt_` prefixes with Bar|...',
          },
        ],
      }],
    },
    {
      code: `
      /**
       * @param opt_a
       * @param opt_b
       */
      function quux () {}
      `,
      errors: [{
        line: 2,
        message: 'Rule `no-restricted-syntax` is missing a `match` option.',
      }],
      options: [],
    },
  ],
  valid: [
    {
      code: `
        /**
         * @param opt_a
         * @param opt_b
         */
      `,
      options: [{
        match: [
          {
            disallowName: '/^arg/i',
          },
        ],
      }],
    },
    {
      code: `
        /**
         * @param a
         * @param opt_b
         */
      `,
      options: [{
        match: [
          {
            allowName: '/^[a-z_]+$/i',
          },
        ],
      }],
    },
    {
      code: `
        /**
         * @param someArg
         * @param anotherArg
         */
      `,
      options: [{
        match: [
          {
            allowName: '/^[a-z]+$/i',
            disallowName: '/^arg/i',
          },
        ],
      }],
    },
    {
      code: `
        /**
         * @param elem1
         * @param elem2
         */
      `,
      options: [{
        match: [
          {
            disallowName: '/^arg$/i',
          },
          {
            disallowName: '/^opt_/i',
          },
        ],
      }],
    },
    {
      code: `
        /**
         * @someTag opt_a
         * @param opt_b
         */
      `,
      options: [{
        match: [
          {
            disallowName: '/^opt_/i',
            tags: ['property'],
          },
        ],
      }],
      settings: {
        jsdoc: {
          structuredTags: {
            someTag: {
              name: 'namepath-defining',
            },
          },
        },
      },
    },
    {
      code: `
        /**
         * @property opt_a
         * @param opt_b
         */
      `,
      options: [{
        match: [
          {
            disallowName: '/^arg/i',
            tags: ['*'],
          },
        ],
      }],
    },
    {
      code: `
        /**
         * @param opt_a
         * @param opt_b
         */
        class A {
        }
      `,
      options: [{
        match: [
          {
            context: 'FunctionDeclaration',
            disallowName: '/^opt_/i',
          },
        ],
      }],
    },
    {
      code: `
        /**
         * @property opt_a
         * @param {Foo|Bar} opt_b
         */
      `,
      options: [{
        match: [
          {
            comment: 'JSDocBlock > JSDocTag[tag="param"] > JSDocTypeUnion[left.name="Bar"]',
            disallowName: '/^opt_/i',
          },
        ],
      }],
    },
  ],
};
