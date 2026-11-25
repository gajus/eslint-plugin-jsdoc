export default /** @type {import('../index.js').TestCases} */ ({
  invalid: [
    {
      code: `
        /**
         * Some things to escape: <a> and &gt; and \`test\`
         */
      `,
      errors: [
        {
          line: 1,
          message: 'You must include either `escapeHTML` or `escapeMarkdown`',
        },
      ],
    },
    {
      code: `
        /**
         * Some things to escape: <a> and &gt; and &#xabc; and \`test\`
         */
      `,
      errors: [
        {
          line: 3,
          message: 'You have unescaped HTML characters < or &',
        },
      ],
      options: [
        {
          escapeHTML: true,
        },
      ],
      output: `
        /**
         * Some things to escape: &lt;a> and &gt; and &amp;#xabc; and \`test\`
         */
      `,
    },
    {
      code: `
        /**
         * Some things to escape: <a> and &gt; and \`test\`
         */
      `,
      errors: [
        {
          line: 3,
          message: 'You have unescaped Markdown backtick sequences',
        },
      ],
      options: [
        {
          escapeMarkdown: true,
        },
      ],
      output: `
        /**
         * Some things to escape: <a> and &gt; and \\\`test\`
         */
      `,
    },
    {
      code: `
        /**
         * Some things to escape:
         * <a> and &gt; and \`test\`
         */
      `,
      errors: [
        {
          line: 4,
          message: 'You have unescaped HTML characters < or &',
        },
      ],
      options: [
        {
          escapeHTML: true,
        },
      ],
      output: `
        /**
         * Some things to escape:
         * &lt;a> and &gt; and \`test\`
         */
      `,
    },
    {
      code: `
        /**
         * Some things to escape:
         * <a> and &gt; and \`test\`
         */
      `,
      errors: [
        {
          line: 4,
          message: 'You have unescaped Markdown backtick sequences',
        },
      ],
      options: [
        {
          escapeMarkdown: true,
        },
      ],
      output: `
        /**
         * Some things to escape:
         * <a> and &gt; and \\\`test\`
         */
      `,
    },
    {
      code: `
        /**
         * @param {SomeType} aName Some things to escape: <a> and &gt; and \`test\`
         */
      `,
      errors: [
        {
          line: 3,
          message: 'You have unescaped HTML characters < or & in a tag',
        },
      ],
      options: [
        {
          escapeHTML: true,
        },
      ],
      output: `
        /**
         * @param {SomeType} aName Some things to escape: &lt;a> and &gt; and \`test\`
         */
      `,
    },
    {
      code: `
        /**
         * @param {SomeType} aName Some things to escape: <a> and &gt; and \`test\`
         */
      `,
      errors: [
        {
          line: 3,
          message: 'You have unescaped Markdown backtick sequences in a tag',
        },
      ],
      options: [
        {
          escapeMarkdown: true,
        },
      ],
      output: `
        /**
         * @param {SomeType} aName Some things to escape: <a> and &gt; and \\\`test\`
         */
      `,
    },
    {
      code: `
        /**
         * @param {SomeType} aName Some things to escape:
         * <a> and &gt; and \`test\`
         */
      `,
      errors: [
        {
          line: 4,
          message: 'You have unescaped HTML characters < or & in a tag',
        },
      ],
      options: [
        {
          escapeHTML: true,
        },
      ],
      output: `
        /**
         * @param {SomeType} aName Some things to escape:
         * &lt;a> and &gt; and \`test\`
         */
      `,
    },
    {
      code: `
        /**
         * @param {SomeType} aName Some things to escape:
         * <a> and &gt; and \`test\`
         */
      `,
      errors: [
        {
          line: 4,
          message: 'You have unescaped Markdown backtick sequences in a tag',
        },
      ],
      options: [
        {
          escapeMarkdown: true,
        },
      ],
      output: `
        /**
         * @param {SomeType} aName Some things to escape:
         * <a> and &gt; and \\\`test\`
         */
      `,
    },
    {
      code: `
        /**
         * Uses <b> and \`x<y\`.
         */
        function quux () {}
      `,
      errors: [
        {
          line: 3,
          message: 'You have unescaped HTML characters < or &',
        },
      ],
      options: [
        {
          escapeHTML: true,
        },
      ],
      output: `
        /**
         * Uses &lt;b> and \`x<y\`.
         */
        function quux () {}
      `,
    },
    {
      code: `
        /**
         * \`\`\`js
         * a<b
         * \`\`\`
         * Then <b>.
         */
        function quux () {}
      `,
      errors: [
        {
          line: 6,
          message: 'You have unescaped HTML characters < or &',
        },
      ],
      options: [
        {
          escapeHTML: true,
        },
      ],
      output: `
        /**
         * \`\`\`js
         * a<b
         * \`\`\`
         * Then &lt;b>.
         */
        function quux () {}
      `,
    },
    {
      code: `
        /**
         * Text with <b>bold</b> */
        function quux () {}
      `,
      errors: [
        {
          line: 3,
          message: 'You have unescaped HTML characters < or &',
        },
      ],
      options: [
        {
          escapeHTML: true,
        },
      ],
      output: `
        /**
         * Text with &lt;b>bold&lt;/b> */
        function quux () {}
      `,
    },
    {
      code: `
        /** @param x a <b> value */
        function quux (x) {}
      `,
      errors: [
        {
          line: 2,
          message: 'You have unescaped HTML characters < or & in a tag',
        },
      ],
      options: [
        {
          escapeHTML: true,
        },
      ],
      output: `
        /** @param x a &lt;b> value */
        function quux (x) {}
      `,
    },
  ],
  valid: [
    {
      code: `
        /**
         * Some things to escape: &lt;a> and &gt; and \`test\`
         */
      `,
      options: [
        {
          escapeHTML: true,
        },
      ],
    },
    {
      code: `
        /**
         * Some things to escape: <a> and &gt; and \\\`test\`
         */
      `,
      options: [
        {
          escapeMarkdown: true,
        },
      ],
    },
    {
      code: `
        /**
         * Some things to escape: < and &
         */
      `,
      options: [
        {
          escapeHTML: true,
        },
      ],
    },
    {
      code: `
        /**
         * Some things to escape: \`
         */
      `,
      options: [
        {
          escapeMarkdown: true,
        },
      ],
    },
    {
      code: `
        /**
         * @param {SomeType} aName Some things to escape: &lt;a> and &gt; and \`test\`
         */
      `,
      options: [
        {
          escapeHTML: true,
        },
      ],
    },
    {
      code: `
        /**
         * @param {SomeType} aName Some things to escape: <a> and &gt; and \\\`test\`
         */
      `,
      options: [
        {
          escapeMarkdown: true,
        },
      ],
    },
    {
      code: `
        /**
         * @param {SomeType} aName Some things to escape: < and &
         */
      `,
      options: [
        {
          escapeHTML: true,
        },
      ],
    },
    {
      code: `
        /**
         * @param {SomeType} aName Some things to escape: \`
         */
      `,
      options: [
        {
          escapeMarkdown: true,
        },
      ],
    },
    {
      code: `
        /**
         * Nothing
         * to escape
         */
      `,
      options: [
        {
          escapeHTML: true,
        },
      ],
    },
    {
      code: `
        /**
         * @example
         * \`\`\`
         * Some things to escape: <a> and &gt; and &#xabc; and \`test\`
         * \`\`\`
         */
      `,
      options: [
        {
          escapeHTML: true,
        },
      ],
    },
    {
      code: `
        /**
         * @example
         * \`\`\`
         * Some things to escape: <a> and &gt; and &#xabc; and \`test\`
         * \`\`\`
         */
      `,
      options: [
        {
          escapeMarkdown: true,
        },
      ],
    },
    {
      code: `
        /**
         * Returns a \`Map<string, number>\` of counts.
         */
        function quux () {}
      `,
      options: [
        {
          escapeHTML: true,
        },
      ],
    },
    {
      code: `
        /**
         * True when \`a&&b\` holds.
         */
        function quux () {}
      `,
      options: [
        {
          escapeHTML: true,
        },
      ],
    },
    {
      code: `
        /**
         * Gets the element type.
         *
         * \`\`\`ts
         * type Example = ElementType<string[]>;
         * \`\`\`
         */
        function quux () {}
      `,
      options: [
        {
          escapeHTML: true,
        },
      ],
    },
    {
      code: `
        /**
         * Desc.
         * @returns {Map<string, number>} A \`Map<string, number>\` of counts.
         */
        function quux () {}
      `,
      options: [
        {
          escapeHTML: true,
        },
      ],
    },
    {
      code: `
        /**
         * Desc.
         * @remarks
         * \`\`\`ts
         * const m: Map<string, number> = count();
         * \`\`\`
         */
        function quux () {}
      `,
      options: [
        {
          escapeHTML: true,
        },
      ],
    },
  ],
});
