import jsdoc from './src/index.js';
import canonical from 'eslint-config-canonical/configurations/auto.js';
import globals from 'globals';

export default [
  {
    // Must be by itself
    ignores: [
      'dist', '.ignore', 'typings', 'coverage', '.nyc_output',
      'pnpm-lock.yaml', 'package.json',
    ],
  },
  ...canonical,
  ...jsdoc.configs.examples,
  {
    languageOptions: {
      ecmaVersion: 'latest',
      globals: globals.node,
      sourceType: 'module',
    },
    rules: {
      'array-element-newline': 0,
      'filenames/match-regex': 0,
      'import/extensions': 0,
      'import/no-useless-path-segments': 0,
      'jsonc/no-comments': 0,
      'linebreak-style': 0,
      'no-extra-parens': 0,
      'no-inline-comments': 0,
      'prefer-named-capture-group': 0,
      'unicorn/import-index': 0,
      'unicorn/no-array-reduce': 0,
      'unicorn/no-unsafe-regex': 0,
      'unicorn/prefer-array-some': 0,
      'unicorn/prevent-abbreviations': 0,
    },
  },
  {
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
      'import/no-commonjs': 0,
      strict: [
        'error',
        'global',
      ],
    },
  },
  {
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
