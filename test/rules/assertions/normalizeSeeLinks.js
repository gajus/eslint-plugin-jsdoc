import {
  parser as typescriptEslintParser,
} from 'typescript-eslint';

export default {
  invalid: [
    {
      code: `
        /**
         * @see [Docs](https://api.example.com/v1?ids=1|2|3)
         */
      `,
      errors: [
        {
          line: 3,
          message: '@see link cannot be safely normalized.',
        },
      ],
      output: null,
    },
    {
      code: `
        /**
         * @see [See {options}](https://example.com/api)
         */
      `,
      errors: [
        {
          line: 3,
          message: '@see link cannot be safely normalized.',
        },
      ],
      output: null,
    },
    {
      code: `
        /**
         * @see [a}b](https://example.com)
         */
      `,
      errors: [
        {
          line: 3,
          message: '@see link cannot be safely normalized.',
        },
      ],
      output: null,
    },
    {
      code: `
        /**
         * @see [Foo](https://example.com/a|b)
         */
      `,
      errors: [
        {
          line: 3,
          message: '@see link cannot be safely normalized.',
        },
      ],
      options: [
        {
          canonicalForm: 'prefix',
        },
      ],
      output: null,
    },
    {
      code: `
        /**
         * @see [ ](https://example.com)
         */
      `,
      errors: [
        {
          line: 3,
          message: '@see link cannot be safely normalized.',
        },
      ],
      output: null,
    },
    {
      code: `
        /**
         * @see {@link https://example.com|A|B}
         */
      `,
      errors: [
        {
          line: 3,
          message: '@see link cannot be safely normalized.',
        },
      ],
      output: null,
    },
    {
      code: `
        /**
         * @see {@link https://example.com|A]B}
         */
      `,
      errors: [
        {
          line: 3,
          message: '@see link cannot be safely normalized.',
        },
      ],
      options: [
        {
          canonicalForm: 'prefix',
        },
      ],
      output: null,
    },
    {
      code: `
        /**
         * @see [ ]{@link https://example.com}
         */
      `,
      errors: [
        {
          line: 3,
          message: '@see link cannot be safely normalized.',
        },
      ],
      output: null,
    },
    {
      code: `
        /**
         * @see [Foo](https://example.com/a}b)
         */
      `,
      errors: [
        {
          line: 3,
          message: '@see link cannot be safely normalized.',
        },
      ],
      options: [
        {
          canonicalForm: 'prefix',
        },
      ],
      output: null,
    },
    {
      code: `
        /**
         * @see [Read the guide](https://example.com/read)
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Expected @see link to use the pipe form.',
        },
      ],
      output: `
        /**
         * @see {@link https://example.com/read|Read the guide}
         */
      `,
    },
    {
      code: `
        /**
         * @see [Browse the API]{@link https://example.com/api}
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Expected @see link to use the pipe form.',
        },
      ],
      output: `
        /**
         * @see {@link https://example.com/api|Browse the API}
         */
      `,
    },
    {
      code: `
        /**
         * @see [A](https://a.com) and [B](https://b.com)
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Expected @see link to use the pipe form.',
        },
      ],
      output: `
        /**
         * @see {@link https://a.com|A} and {@link https://b.com|B}
         */
      `,
    },
    {
      code: `
        /**
         * @see [A](https://a.com)
         * @see [B](https://b.com)
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Expected @see link to use the pipe form.',
        },
        {
          line: 4,
          message: 'Expected @see link to use the pipe form.',
        },
      ],
      output: `
        /**
         * @see {@link https://a.com|A}
         * @see {@link https://b.com|B}
         */
      `,
    },
    {
      code: `
        /**
         * @see [Unsafe](https://example.com/a|b) and [Safe](https://example.com/safe)
         */
      `,
      errors: [
        {
          line: 3,
          message: '@see link cannot be safely normalized.',
        },
      ],
      output: null,
    },
    {
      code: `
        /**
         * @see [JSDoc Markdown](https://example.com/jsdoc-markdown)
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Expected @see link to use the pipe form.',
        },
      ],
      output: `
        /**
         * @see {@link https://example.com/jsdoc-markdown|JSDoc Markdown}
         */
      `,
      settings: {
        jsdoc: {
          mode: 'jsdoc',
        },
      },
    },
    {
      code: `
        /**
         * @see [Package](@scope/pkg)
         */
      `,
      errors: [
        {
          line: 3,
          message: '@see link cannot be safely normalized.',
        },
      ],
      output: null,
    },
    {
      code: `
        /**
         * @see [First](https://example.com/first)
         *   and [Second](https://example.com/second)
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Expected @see link to use the pipe form.',
        },
      ],
      output: `
        /**
         * @see {@link https://example.com/first|First}
         *   and {@link https://example.com/second|Second}
         */
      `,
    },
    {
      code: `
        /**
         * @see [Example](https://example.com)
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Expected @see link to use the pipe form.',
        },
      ],
      output: `
        /**
         * @see {@link https://example.com|Example}
         */
      `,
    },
    {
      code: `
        /**
         * @see [Guide]{@link https://example.com/guide}
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Expected @see link to use the pipe form.',
        },
      ],
      output: `
        /**
         * @see {@link https://example.com/guide|Guide}
         */
      `,
    },
    {
      code: `
        /**
         * @see [API](https://example.com/api)
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Expected @see link to use the prefix form.',
        },
      ],
      options: [
        {
          canonicalForm: 'prefix',
        },
      ],
      output: `
        /**
         * @see [API]{@link https://example.com/api}
         */
      `,
    },
    {
      code: `
        /**
         * @see {@link https://example.com/reference|Reference}
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Expected @see link to use the prefix form.',
        },
      ],
      options: [
        {
          canonicalForm: 'prefix',
        },
      ],
      output: `
        /**
         * @see [Reference]{@link https://example.com/reference}
         */
      `,
    },
    {
      code: `
        /**
         * @see [No fix](https://example.com/no-fix)
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Expected @see link to use the pipe form.',
        },
      ],
      options: [
        {
          enableFixer: false,
        },
      ],
      output: null,
    },
    {
      code: `
        /**
         * @see [Incomplete](https://example.com/incomplete
         */
      `,
      errors: [
        {
          line: 3,
          message: '@see link cannot be safely normalized.',
        },
      ],
      output: null,
    },
    {
      code: `
        /**
         * @see [Incomplete]{@link}
         */
      `,
      errors: [
        {
          line: 3,
          message: '@see link cannot be safely normalized.',
        },
      ],
      output: null,
    },
    {
      code: `
        /**
         * @see {@link https://example.com|}
         */
      `,
      errors: [
        {
          line: 3,
          message: '@see link cannot be safely normalized.',
        },
      ],
      output: null,
    },
    {
      code: `
        /**
         * @see \`[Code](https://example.com/code)\`
         */
      `,
      errors: [
        {
          line: 3,
          message: '@see link cannot be safely normalized.',
        },
      ],
      output: null,
    },
    {
      code: `
        /**
         * @see [Package]{@link @scope/pkg}
         */
      `,
      errors: [
        {
          line: 3,
          message: '@see link cannot be safely normalized.',
        },
      ],
      output: null,
    },
    {
      code: `
        /**
         * @see {@link https://example.com Space label}
         */
      `,
      errors: [
        {
          line: 3,
          message: '@see link cannot be safely normalized.',
        },
      ],
      output: null,
    },
    {
      code: `
        /**
         * @see [JSDoc]{@link https://example.com/jsdoc}
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Expected @see link to use the pipe form.',
        },
      ],
      output: `
        /**
         * @see {@link https://example.com/jsdoc|JSDoc}
         */
      `,
      settings: {
        jsdoc: {
          mode: 'jsdoc',
        },
      },
    },
    {
      code: `
        /**
         * @see [TypeScript](https://example.com/typescript)
         */
        const value: string = 'value';
      `,
      errors: [
        {
          line: 3,
          message: 'Expected @see link to use the pipe form.',
        },
      ],
      languageOptions: {
        parser: typescriptEslintParser,
      },
      output: `
        /**
         * @see {@link https://example.com/typescript|TypeScript}
         */
        const value: string = 'value';
      `,
    },
    {
      code: `
        /**
         * @see [Complex](https://example.com/a_(b))
         */
      `,
      errors: [
        {
          line: 3,
          message: '@see link cannot be safely normalized.',
        },
      ],
      output: null,
    },
  ],
  valid: [
    {
      code: `
        /**
         * @see {@link https://example.com/read|Read the guide}
         */
      `,
    },
    {
      code: `
        /**
         * @see {@link https://example.com/api|Browse the API}
         */
      `,
    },
    {
      code: `
        /**
         * @see {@link https://a.com|A} and {@link https://b.com|B}
         */
      `,
    },
    {
      code: `
        /**
         * @see {@link https://a.com|A}
         * @see {@link https://b.com|B}
         */
      `,
    },
    {
      code: `
        /**
         * @see {@link https://example.com/jsdoc-markdown|JSDoc Markdown}
         */
      `,
      settings: {
        jsdoc: {
          mode: 'jsdoc',
        },
      },
    },
    {
      code: `
        /**
         * @see {@link https://example.com/first|First}
         *   and {@link https://example.com/second|Second}
         */
      `,
    },
    {
      code: `
        /**
         * @see {@link https://example.com|Example}
         */
      `,
    },
    {
      code: `
        /**
         * @see {@link https://example.com/guide|Guide}
         */
      `,
    },
    {
      code: `
        /**
         * @see [API]{@link https://example.com/api}
         */
      `,
      options: [
        {
          canonicalForm: 'prefix',
        },
      ],
    },
    {
      code: `
        /**
         * @see [Reference]{@link https://example.com/reference}
         */
      `,
      options: [
        {
          canonicalForm: 'prefix',
        },
      ],
    },
    {
      code: `
        /**
         * @see {@link https://example.com/jsdoc|JSDoc}
         */
      `,
      settings: {
        jsdoc: {
          mode: 'jsdoc',
        },
      },
    },
    {
      code: `
        /**
         * @see {@link https://example.com/typescript|TypeScript}
         */
        const value: string = 'value';
      `,
      languageOptions: {
        parser: typescriptEslintParser,
      },
    },
    {
      code: `
        /**
         * @see https://example.com
         */
      `,
    },
    {
      code: `
        /**
         * @see MyClass#method
         */
      `,
    },
    {
      code: `
        /**
         * @see some text
         */
      `,
    },
    {
      code: `
        /**
         * @see {@link https://example.com}
         */
      `,
    },
    {
      code: `
        /**
         * @see {@link @scope/pkg|Package}
         */
      `,
    },
    {
      code: `
        /**
         * @see @scope/pkg
         */
      `,
    },
    {
      code: `
        /**
         * @returns [Example](https://example.com)
         */
      `,
    },
    {
      code: `
        /**
         * @see {@code foo|bar}
         */
      `,
    },
    {
      code: `
        /**
         * @see \\[Escaped](https://example.com)
         */
      `,
    },
  ],
};
