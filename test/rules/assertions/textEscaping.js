export default {
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
  ],
};
