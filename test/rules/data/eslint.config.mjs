import babelEslintParser from '@babel/eslint-parser';

export default [
  {
    files: [
      '*.md',
    ],
    languageOptions: {
      parser: babelEslintParser,
    },
  },
  {
    languageOptions: {
      parserOptions: {
        ecmaVersion: 8,
      },
    },
    rules: {
      'id-length': [
        1,
        {
          exceptions: [
            '_',
          ],
          min: 2,
        },
      ],
      semi: [
        'error', 'always',
      ],
    },
  },
];
