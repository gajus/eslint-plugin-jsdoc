import iterateJsdoc from '../iterateJsdoc.js';

export default iterateJsdoc(({
  context,
  jsdoc,
  settings,
  utils,
}) => {
  const {
    mode,
  } = settings;

  if (mode !== 'typescript') {
    return;
  }

  const {
    allowedInlineTags = [],
    enableFixer = false,
    fixType = 'backslash',
  } = context.options[0] || {};

  const {
    description,
  } = utils.getDescription();

  /** @type {string[]} */
  const tagNames = [];

  /** @type {number[]} */
  const indexes = [];

  const unescapedInlineTagRegex = /(?:^|\s)@(\w+)/gv;

  const scopedPackageNameRegex = /^@[\w.\-]+\/[\w.\-]+/v;

  const declarationReferenceInlineTags = new Set([
    'inheritDoc',
    'link',
    'linkcode',
    'linkplain',
  ]);

  /**
   * @param {string} desc
   * @param {number} atSignIndex
   * @returns {string}
   */
  const getInlineTagName = (desc, atSignIndex) => {
    const inlineTagStart = desc.lastIndexOf('{@', atSignIndex);

    if (inlineTagStart === -1) {
      return '';
    }

    const inlineTagEnd = desc.indexOf('}', inlineTagStart);

    if (inlineTagEnd === -1 || inlineTagEnd <= atSignIndex) {
      return '';
    }

    return desc.slice(inlineTagStart + 2).match(/^\w+/v)?.[0] || '';
  };

  /**
   * @param {string} desc
   * @param {string} match
   * @param {number} offset
   * @returns {boolean}
   */
  const shouldIgnoreMatch = (desc, match, offset) => {
    const atSignIndex = offset + match.lastIndexOf('@');
    const inlineTagName = getInlineTagName(desc, atSignIndex);

    return declarationReferenceInlineTags.has(inlineTagName) &&
      scopedPackageNameRegex.test(desc.slice(atSignIndex));
  };

  /**
   * @param {string} tagName
   * @returns {[
   *   RegExp,
   *   (description: string) => string
   * ]}
   */
  const escapeInlineTags = (tagName) => {
    const regex = new RegExp(`(^|\\s)@${
      // No need to escape, as contains only safe characters
      tagName
    }`, 'gv');

    return [
      regex,
      /**
       * @param {string} desc
       */
      (desc) => {
        return desc.replaceAll(
          regex,
          (match, prefix, offset) => {
            if (shouldIgnoreMatch(desc, match, offset)) {
              return match;
            }

            return fixType === 'backticks' ?
              prefix + '`@' + tagName + '`' :
              prefix + '\\@' + tagName;
          },
        );
      },
    ];
  };

  /**
   * @param {string} desc
   * @returns {string}
   */
  const getUnescapedInlineTagName = (desc) => {
    unescapedInlineTagRegex.lastIndex = 0;

    let match;
    while ((match = unescapedInlineTagRegex.exec(desc)) !== null) {
      const [
        fullMatch,
        tagName,
      ] = match;

      if (
        allowedInlineTags.includes(tagName) ||
        shouldIgnoreMatch(desc, fullMatch, match.index)
      ) {
        continue;
      }

      return tagName;
    }

    return '';
  };

  for (const [
    idx,
    descLine,
  ] of (
      description.startsWith('\n') ? description.slice(1) : description
    ).split('\n').entries()
  ) {
    descLine.replaceAll(unescapedInlineTagRegex, (match, tagName, offset) => {
      if (
        allowedInlineTags.includes(tagName) ||
        shouldIgnoreMatch(descLine, match, offset)
      ) {
        return match;
      }

      tagNames.push(tagName);
      indexes.push(idx);

      return match;
    });
  }

  for (const [
    idx,
    tagName,
  ] of tagNames.entries()) {
    utils.reportJSDoc(
      `Unexpected inline JSDoc tag. Did you mean to use {@${tagName}}, \\@${tagName}, or \`@${tagName}\`?`,
      {
        line: indexes[idx] + 1,
      },
      enableFixer ?
        () => {
          utils.setBlockDescription((info, seedTokens, descLines) => {
            return descLines.map((desc) => {
              const [
                ,
                escapeInlineTag,
              ] = escapeInlineTags(tagName);
              const newDesc = escapeInlineTag(desc);

              return {
                number: 0,
                source: '',
                tokens: seedTokens({
                  ...info,
                  description: newDesc,
                  postDelimiter: newDesc.trim() ? ' ' : '',
                }),
              };
            });
          });
        } :
        null,
    );
  }

  for (const tag of jsdoc.tags) {
    if (tag.tag === 'example') {
      continue;
    }

    /** @type {string} */
    let tagName = '';
    while (/** @type {string[]} */ (
      utils.getTagDescription(tag, true)
    // eslint-disable-next-line no-loop-func -- Safe
    ).some((desc) => {
      tagName = getUnescapedInlineTagName(desc);

      return tagName;
    })) {
      const line = utils.setTagDescription(tag, ...escapeInlineTags(tagName)) +
          tag.source[0].number;
      utils.reportJSDoc(
        `Unexpected inline JSDoc tag. Did you mean to use {@${tagName}}, \\@${tagName}, or \`@${tagName}\`?`,
        {
          line,
        },
        enableFixer ? () => {} : null,
        true,
      );
    }
  }
}, {
  iterateAllJsdocs: true,
  meta: {
    docs: {
      description: 'Reports use of JSDoc tags in non-tag positions (in the default "typescript" mode).',
      url: 'https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/escape-inline-tags.md#repos-sticky-header',
    },
    fixable: 'code',
    schema: [
      {
        additionalProperties: false,
        properties: {
          allowedInlineTags: {
            description: 'A listing of tags you wish to allow unescaped. Defaults to an empty array.',
            items: {
              type: 'string',
            },
            type: 'array',
          },
          enableFixer: {
            description: 'Whether to enable the fixer. Defaults to `false`.',
            type: 'boolean',
          },
          fixType: {
            description: `How to escape the inline tag.

May be "backticks" to enclose tags in backticks (treating as code segments), or
"backslash" to escape tags with a backslash, i.e., \`\\@\`

Defaults to "backslash".`,
            enum: [
              'backticks',
              'backslash',
            ],
            type: 'string',
          },
        },
        type: 'object',
      },
    ],
    type: 'suggestion',
  },
});
