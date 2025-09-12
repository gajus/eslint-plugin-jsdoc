import {
  jsdoc,
} from './src/index.js';
import {
  recommended as canonical,
} from 'eslint-config-canonical/canonical';
import {
  recommended as canonicalJsdoc,
} from 'eslint-config-canonical/jsdoc';
import globals from 'globals';

const common = {
  linterOptions: {
    reportUnusedDisableDirectives: 'off',
  },
};

// /**
//  * @param {any} abc Test
//  */
// export const a = (abc) => {
//   // eslint-disable-next-line no-console -- Testing
//   console.log('abc', abc);
// };

export default [
  ...canonical,
  ...canonicalJsdoc,
  ...jsdoc({
    config: 'examples-and-default-expressions',
  }),
  // jsdoc({
  //   config: 'flat/recommended',
  //   extraRuleDefinitions: {
  //     forbid: {
  //       Any: {
  //         contexts: [
  //           {
  //             comment: 'JsdocBlock:has(JsdocTypeName[value="any"])',
  //             context: 'any',
  //             message: '`any` is not allowed; use a more specific type',
  //           },
  //         ],
  //         descriptions: 'Testing here',
  //       },
  //     },
  //   },
  //   rules: {
  //     'jsdoc/forbid-Any': [
  //       'error',
  //     ],
  //   },
  // }),
  {
    // Must be by itself
    ignores: [
      'dist/**', '.ignore/**', '**/*.d.ts',
    ],
  },
  {
    ...common,
    languageOptions: {
      ecmaVersion: 'latest',
      globals: globals.node,
      sourceType: 'module',
    },
    rules: {
      '@stylistic/array-element-newline': 0,
      '@stylistic/no-extra-parens': 0,
      'canonical/filename-match-exported': 0,
      'canonical/filename-match-regex': 0,
      'filenames/match-regex': 0,
      'import/extensions': 0,
      'import/no-useless-path-segments': 0,
      'linebreak-style': 0,
      'no-inline-comments': 0,
      'prefer-named-capture-group': 0,
      'require-unicode-regexp': [
        'error',
        {
          requireFlag: 'v',
        },
      ],
      'unicorn/import-index': 0,
      'unicorn/no-array-reduce': 0,
      'unicorn/no-unsafe-regex': 0,
      'unicorn/prefer-array-some': 0,
      'unicorn/prevent-abbreviations': 0,
    },
  },
  {
    ...common,
    files: [
      '.ncurc.cjs',
    ],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          impliedStrict: false,
        },
      },
      sourceType: 'script',
    },
    rules: {
      'canonical/filename-match-regex': 0,
      'import/no-commonjs': 0,
      strict: [
        'error',
        'global',
      ],
    },
  },
  {
    ...common,
    files: [
      'test/**/*.js',
    ],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: globals.mocha,
      sourceType: 'module',
    },
    rules: {
      'no-restricted-syntax': 0,
      'unicorn/prevent-abbreviations': 0,
    },
  },
];
