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
          message: 'Expected @see link to use the pipe form.',
        },
      ],
      output: `
        /**
         * @see {@link https://api.example.com/v1?ids=1%7C2%7C3|Docs}
         */
      `,
    },
    // `\}` truncates pipe-label text in @es-joy/jsdoccomment.
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
    // `\}` truncates pipe-label text in @es-joy/jsdoccomment.
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
         * @see [Foo]{@link https://example.com/a%7Cb}
         */
      `,
    },
    // A blank label has no intended text the fixer can preserve.
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
    // `\]` prevents prefix-form parsing in @es-joy/jsdoccomment.
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
    // A blank label has no intended text the fixer can preserve.
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
         * @see [Foo]{@link https://example.com/a%7Db}
         */
      `,
    },
    {
      code: `
        /**
         * @see [Foo](https://example.com/a{b)
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
         * @see [Foo]{@link https://example.com/a%7Bb}
         */
      `,
    },
    {
      code: `
        /**
         * @see [Braces](https://example.com/a{b}c)
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
         * @see {@link https://example.com/a%7Bb%7Dc|Braces}
         */
      `,
    },
    {
      code: `
        /**
         * @see [Existing](https://example.com/%7C?x=1&y=2#frag)
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
         * @see {@link https://example.com/%7C?x=1&y=2#frag|Existing}
         */
      `,
    },
    {
      code: `
        /**
         * @see [Percent](https://example.com/100%)
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
         * @see {@link https://example.com/100%25|Percent}
         */
      `,
    },
    {
      code: `
        /**
         * @see [A{B](https://example.com)
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
         * @see {@link https://example.com|A{B}
         */
      `,
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
         * @see [a}b]{@link https://example.com}
         */
      `,
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
         * @see [A|B]{@link https://example.com}
         */
      `,
    },
    {
      code: `
        /**
         * @see {@link https://example.com|A\`B}
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
         * @see [A\`B]{@link https://example.com}
         */
      `,
    },
    // An existing `\}` still truncates pipe-label text in the parser.
    {
      code: `
        /**
         * @see [a\\}b](https://example.com)
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
    // Nested and repeated braces still contain an unparseable pipe-label `}`.
    {
      code: `
        /**
         * @see [See {{one} and {two}}](https://example.com)
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
    // The extra pipe is safe, but the closing brace still truncates the label.
    {
      code: `
        /**
         * @see [A}B|C](https://example.com)
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
         * @see [Unsafe](https://example.com/a|b?x=1&y=2#frag) and [Safe](https://example.com/safe)
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
         * @see {@link https://example.com/a%7Cb?x=1&y=2#frag|Unsafe} and {@link https://example.com/safe|Safe}
         */
      `,
    },
    {
      code: `
        /**
         * @see [JSDoc Markdown](https://example.com/jsdoc|markdown)
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
         * @see {@link https://example.com/jsdoc%7Cmarkdown|JSDoc Markdown}
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
         * @see [TypeScript](https://example.com/type{script})
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
         * @see {@link https://example.com/type%7Bscript%7D|TypeScript}
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
    // wrapBareUrls: whole-description HTTPS URL.
    {
      code: `
        /**
         * @see https://example.com/docs
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Expected bare @see URL to use a {@link} tag.',
        },
      ],
      options: [
        {
          wrapBareUrls: true,
        },
      ],
      output: `
        /**
         * @see {@link https://example.com/docs}
         */
      `,
    },
    // wrapBareUrls: whole-description HTTP URL.
    {
      code: `
        /**
         * @see http://example.com/docs
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Expected bare @see URL to use a {@link} tag.',
        },
      ],
      options: [
        {
          wrapBareUrls: true,
        },
      ],
      output: `
        /**
         * @see {@link http://example.com/docs}
         */
      `,
    },
    // wrapBareUrls: existing escapes stay encoded and link delimiters are encoded.
    {
      code: `
        /**
         * @see https://example.com/%7C?ids=1|2&brace={ok}#part}
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Expected bare @see URL to use a {@link} tag.',
        },
      ],
      options: [
        {
          wrapBareUrls: true,
        },
      ],
      output: `
        /**
         * @see {@link https://example.com/%7C?ids=1%7C2&brace=%7Bok%7D#part%7D}
         */
      `,
    },
    // wrapBareUrls: canonicalForm prefix still produces a plain no-label link.
    {
      code: `
        /**
         * @see https://example.com/prefix
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Expected bare @see URL to use a {@link} tag.',
        },
      ],
      options: [
        {
          canonicalForm: 'prefix',
          wrapBareUrls: true,
        },
      ],
      output: `
        /**
         * @see {@link https://example.com/prefix}
         */
      `,
    },
    // wrapBareUrls: enableFixer false reports without changing the URL.
    {
      code: `
        /**
         * @see https://example.com/report-only
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Expected bare @see URL to use a {@link} tag.',
        },
      ],
      options: [
        {
          enableFixer: false,
          wrapBareUrls: true,
        },
      ],
      output: null,
    },
    // wrapBareUrls: Markdown labeled-link behavior is unchanged when enabled.
    {
      code: `
        /**
         * @see [Docs](https://example.com/labeled)
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
          wrapBareUrls: true,
        },
      ],
      output: `
        /**
         * @see {@link https://example.com/labeled|Docs}
         */
      `,
    },
    // wrapBareUrls: prefix labeled-link behavior is unchanged when enabled.
    {
      code: `
        /**
         * @see [Docs]{@link https://example.com/labeled}
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
          wrapBareUrls: true,
        },
      ],
      output: `
        /**
         * @see {@link https://example.com/labeled|Docs}
         */
      `,
    },
    // wrapBareUrls: pipe labeled-link behavior is unchanged when enabled.
    {
      code: `
        /**
         * @see {@link https://example.com/labeled|Docs}
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
          wrapBareUrls: true,
        },
      ],
      output: `
        /**
         * @see [Docs]{@link https://example.com/labeled}
         */
      `,
    },
    // wrapBareUrls: labeled-link collision remains report-only when enabled.
    {
      code: `
        /**
         * @see [See {options}](https://example.com/labeled)
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
          wrapBareUrls: true,
        },
      ],
      output: null,
    },
    // wrapBareUrls: labeled enableFixer behavior is unchanged when enabled.
    {
      code: `
        /**
         * @see [No fix](https://example.com/labeled)
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
          wrapBareUrls: true,
        },
      ],
      output: null,
    },
    // wrapBareUrls adversarial: trailing URL punctuation is preserved as target text.
    {
      code: `
        /**
         * @see https://example.com/period.
         * @see https://example.com/comma,
         * @see https://example.com/paren)
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Expected bare @see URL to use a {@link} tag.',
        },
        {
          line: 4,
          message: 'Expected bare @see URL to use a {@link} tag.',
        },
        {
          line: 5,
          message: 'Expected bare @see URL to use a {@link} tag.',
        },
      ],
      options: [
        {
          wrapBareUrls: true,
        },
      ],
      output: `
        /**
         * @see {@link https://example.com/period.}
         * @see {@link https://example.com/comma,}
         * @see {@link https://example.com/paren)}
         */
      `,
    },
    // wrapBareUrls adversarial: outer whitespace is ignored for recognition and preserved by the fix.
    {
      code: '/**\n * @see https://example.com/trailing \n */',
      errors: [
        {
          line: 2,
          message: 'Expected bare @see URL to use a {@link} tag.',
        },
      ],
      ignoreReadme: true,
      options: [
        {
          wrapBareUrls: true,
        },
      ],
      output: '/**\n * @see {@link https://example.com/trailing} \n */',
    },
    // wrapBareUrls: a URL on a continuation line is still the whole trimmed description.
    {
      code: `
        /**
         * @see
         *   https://example.com/continued
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Expected bare @see URL to use a {@link} tag.',
        },
      ],
      options: [
        {
          wrapBareUrls: true,
        },
      ],
      output: `
        /**
         * @see
         *   {@link https://example.com/continued}
         */
      `,
    },
    // wrapBareUrls adversarial: an HTTP URL with namepath-looking text is still a URL.
    {
      code: `
        /**
         * @see http:MyClass#method
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Expected bare @see URL to use a {@link} tag.',
        },
      ],
      options: [
        {
          wrapBareUrls: true,
        },
      ],
      output: `
        /**
         * @see {@link http:MyClass#method}
         */
      `,
    },
  ],
  valid: [
    {
      code: `
        /**
         * @see {@link https://api.example.com/v1?ids=1%7C2%7C3|Docs}
         */
      `,
    },
    {
      code: `
        /**
         * @see [Foo]{@link https://example.com/a%7Cb}
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
         * @see [Foo]{@link https://example.com/a%7Db}
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
         * @see [Foo]{@link https://example.com/a%7Bb}
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
         * @see {@link https://example.com/a%7Bb%7Dc|Braces}
         */
      `,
    },
    {
      code: `
        /**
         * @see {@link https://example.com/%7C?x=1&y=2#frag|Existing}
         */
      `,
    },
    {
      code: `
        /**
         * @see {@link https://example.com/100%25|Percent}
         */
      `,
    },
    {
      code: `
        /**
         * @see {@link https://example.com|A{B}
         */
      `,
    },
    {
      code: `
        /**
         * @see [a}b]{@link https://example.com}
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
         * @see {@link https://example.com|A|B}
         */
      `,
    },
    {
      code: `
        /**
         * @see [A|B]{@link https://example.com}
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
         * @see [A\`B]{@link https://example.com}
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
         * @see {@link https://example.com/a%7Cb?x=1&y=2#frag|Unsafe} and {@link https://example.com/safe|Safe}
         */
      `,
    },
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
         * @see {@link https://example.com/jsdoc%7Cmarkdown|JSDoc Markdown}
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
         * @see {@link https://example.com/type%7Bscript%7D|TypeScript}
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
    // wrapBareUrls: fixed output is idempotent.
    {
      code: `
        /**
         * @see {@link https://example.com/idempotent}
         */
      `,
      options: [
        {
          wrapBareUrls: true,
        },
      ],
    },
    // wrapBareUrls off/on: a URL inside prose remains a no-op.
    {
      code: `
        /**
         * @see Read https://example.com/docs
         */
      `,
    },
    {
      code: `
        /**
         * @see Read https://example.com/docs
         */
      `,
      options: [
        {
          wrapBareUrls: true,
        },
      ],
    },
    // wrapBareUrls on: namepaths remain no-ops (the off case above is unchanged).
    {
      code: `
        /**
         * @see MyClass#method
         */
      `,
      options: [
        {
          wrapBareUrls: true,
        },
      ],
    },
    // wrapBareUrls off/on: FTP URLs remain no-ops.
    {
      code: `
        /**
         * @see ftp://example.com/file
         */
      `,
    },
    {
      code: `
        /**
         * @see ftp://example.com/file
         */
      `,
      options: [
        {
          wrapBareUrls: true,
        },
      ],
    },
    // wrapBareUrls off/on: mailto URLs remain no-ops.
    {
      code: `
        /**
         * @see mailto:docs@example.com
         */
      `,
    },
    {
      code: `
        /**
         * @see mailto:docs@example.com
         */
      `,
      options: [
        {
          wrapBareUrls: true,
        },
      ],
    },
    // wrapBareUrls off/on: file URLs remain no-ops.
    {
      code: `
        /**
         * @see file:///tmp/docs
         */
      `,
    },
    {
      code: `
        /**
         * @see file:///tmp/docs
         */
      `,
      options: [
        {
          wrapBareUrls: true,
        },
      ],
    },
    // wrapBareUrls off/on: protocol-relative URLs remain no-ops.
    {
      code: `
        /**
         * @see //example.com/docs
         */
      `,
    },
    {
      code: `
        /**
         * @see //example.com/docs
         */
      `,
      options: [
        {
          wrapBareUrls: true,
        },
      ],
    },
    // wrapBareUrls off/on: code-spanned URLs remain no-ops.
    {
      code: `
        /**
         * @see \`https://example.com/docs\`
         */
      `,
    },
    {
      code: `
        /**
         * @see \`https://example.com/docs\`
         */
      `,
      options: [
        {
          wrapBareUrls: true,
        },
      ],
    },
    // wrapBareUrls on: already-inline links remain no-ops (the off case above is unchanged).
    {
      code: `
        /**
         * @see {@link https://example.com/docs}
         */
      `,
      options: [
        {
          wrapBareUrls: true,
        },
      ],
    },
    // wrapBareUrls off/on: empty descriptions remain no-ops.
    {
      code: `
        /**
         * @see
         */
      `,
    },
    {
      code: `
        /**
         * @see
         */
      `,
      options: [
        {
          wrapBareUrls: true,
        },
      ],
    },
    // wrapBareUrls adversarial: internal whitespace prevents whole-URL recognition.
    {
      code: `
        /**
         * @see https://example.com/one two
         */
      `,
      options: [
        {
          wrapBareUrls: true,
        },
      ],
    },
    // wrapBareUrls adversarial: schemes are intentionally case-sensitive.
    {
      code: `
        /**
         * @see HTTP://example.com/docs
         */
      `,
      options: [
        {
          wrapBareUrls: true,
        },
      ],
    },
    // wrapBareUrls adversarial: two URLs are not a whole-description single URL.
    {
      code: `
        /**
         * @see https://example.com/one https://example.com/two
         */
      `,
      options: [
        {
          wrapBareUrls: true,
        },
      ],
    },
    // wrapBareUrls adversarial: Markdown autolink syntax remains unchanged.
    {
      code: `
        /**
         * @see <https://example.com/docs>
         */
      `,
      options: [
        {
          wrapBareUrls: true,
        },
      ],
    },
    // wrapBareUrls adversarial: already-encoded delimiters are not double-encoded.
    {
      code: `
        /**
         * @see {@link https://example.com/%7C}
         */
      `,
      options: [
        {
          wrapBareUrls: true,
        },
      ],
    },
  ],
};
