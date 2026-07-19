import iterateJsdoc from '../iterateJsdoc.js';

const markdownLinkRegex = /(?<!\\)\[([^`\]\r\n]+)\]\(([^`\(\)\s]+)\)/gv;
const prefixLinkRegex = /(?<!\\)\[([^\]\r\n]+)\]\{@link\s+([^\}\s\|]+)\}/gv;
const pipeLinkRegex = /\{@link\s+([^\}\s\|]+)\s*\|\s*([^\}\r\n]+)\}/gv;

const markdownLinkAttemptRegex = /(?<!\\)\[[^\]\r\n]*\]\([^\r\n]*(?:\)|$)/v;
const prefixLinkAttemptRegex = /(?<!\\)\[[^\]\r\n]*\]\{@link[^\}\r\n]*(?:\}|$)/v;
const pipeLinkAttemptRegex = /\{@link[^\}\r\n]*\|[^\}\r\n]*(?:\}|$)/v;

const scopedPackageNameRegex = /^@[\w.\-]+\/[\w.\-]+/v;
const markdownCodeSpanRegex = /(?<!\\)(`+)(?!`)[\s\S]*?(?<!`)\1(?!`)/gv;
const bareHttpUrlRegex = /^https?:\S+$/v;

/**
 * @param {'pipe'|'prefix'} canonicalForm
 * @param {string} label
 * @returns {boolean}
 */
const cannotSafelyFormatLink = (canonicalForm, label) => {
  if (!label.trim()) {
    return true;
  }

  if (canonicalForm === 'pipe') {
    return label.includes('}');
  }

  return label.includes(']');
};

/**
 * @param {string} target
 * @returns {string}
 */
const encodeLinkTarget = (target) => {
  return encodeURI(target).replaceAll(/%25(?=[\dA-F]{2})/giv, '%');
};

/**
 * @param {string} description
 * @param {boolean} enabled
 * @returns {string|null}
 */
const getBareHttpUrl = (description, enabled) => {
  if (!enabled) {
    return null;
  }

  const trimmedDescription = description.trim();

  return bareHttpUrlRegex.test(trimmedDescription) &&
    URL.canParse(trimmedDescription) ?
    trimmedDescription : null;
};

/**
 * @param {string} target
 * @returns {string}
 */
const formatBareUrl = (target) => {
  return `{@link ${encodeLinkTarget(target)}}`;
};

/**
 * @param {string|undefined} bareUrl
 * @param {'pipe'|'prefix'} canonicalForm
 * @returns {string}
 */
const getExpectedMessage = (bareUrl, canonicalForm) => {
  return bareUrl ?
    'Expected bare @see URL to use a {@link} tag.' :
    `Expected @see link to use the ${canonicalForm} form.`;
};

/**
 * @param {string} description
 * @param {number} index
 * @returns {boolean}
 */
const isInsideMarkdownCodeSpan = (description, index) => {
  for (const match of description.matchAll(markdownCodeSpanRegex)) {
    const delimiterLength = match[1].length;
    const contentStart = match.index + delimiterLength;
    const contentEnd = match.index + match[0].length - delimiterLength;

    if (index >= contentStart && index < contentEnd) {
      return true;
    }
  }

  return false;
};

/**
 * @param {'pipe'|'prefix'} canonicalForm
 * @param {string} label
 * @param {string} target
 * @returns {string}
 */
const formatLink = (canonicalForm, label, target) => {
  const encodedTarget = encodeLinkTarget(target);

  return canonicalForm === 'pipe' ?
    `{@link ${encodedTarget}|${label.trim()}}` :
    `[${label.trim()}]{@link ${encodedTarget}}`;
};

/**
 * @param {string} description
 * @param {'pipe'|'prefix'} canonicalForm
 * @returns {string}
 */
const normalizeDescription = (description, canonicalForm) => {
  const markdownNormalized = description.replaceAll(
    new RegExp(markdownLinkRegex, 'gv'),
    (_match, label, target) => {
      return formatLink(canonicalForm, label, target);
    },
  );

  if (canonicalForm === 'pipe') {
    return markdownNormalized.replaceAll(
      new RegExp(prefixLinkRegex, 'gv'),
      (_match, label, target) => {
        return formatLink(canonicalForm, label, target);
      },
    );
  }

  return markdownNormalized.replaceAll(
    new RegExp(pipeLinkRegex, 'gv'),
    (_match, target, label) => {
      return formatLink(canonicalForm, label, target);
    },
  );
};

export default iterateJsdoc(({
  context,
  jsdoc,
  utils,
}) => {
  const {
    canonicalForm = 'pipe',
    enableFixer = true,
    wrapBareUrls = false,
  } = context.options[0] || {};

  const descriptionMatcher = canonicalForm === 'pipe' ?
    new RegExp(`${markdownLinkRegex.source}|${prefixLinkRegex.source}`, 'v') :
    new RegExp(`${markdownLinkRegex.source}|${pipeLinkRegex.source}`, 'v');

  /** @type {import('comment-parser').Spec[]} */
  const fixableTags = [];
  /** @type {Map<import('comment-parser').Spec, string>} */
  const bareUrlTags = new Map();

  for (const tag of jsdoc.tags) {
    if (tag.tag !== 'see') {
      continue;
    }

    const firstTokens = tag.source[0].tokens;
    const tagDescription = String(utils.getTagDescription(tag));
    const rawDescription = firstTokens.name ?
      firstTokens.name + firstTokens.postName + tagDescription :
      tagDescription;

    let hasAmbiguousLink = false;
    let hasNoncanonicalLink = false;
    const bareUrl = getBareHttpUrl(rawDescription, wrapBareUrls);

    if (bareUrl) {
      bareUrlTags.set(tag, bareUrl);
      hasNoncanonicalLink = true;
    }

    for (const match of rawDescription.matchAll(markdownLinkRegex)) {
      const label = match[1];
      const target = match[2];

      if (
        isInsideMarkdownCodeSpan(rawDescription, match.index) ||
        scopedPackageNameRegex.test(target) ||
        cannotSafelyFormatLink(canonicalForm, label)
      ) {
        hasAmbiguousLink = true;
      } else {
        hasNoncanonicalLink = true;
      }
    }

    for (const inlineTag of tag.inlineTags) {
      if (inlineTag.tag !== 'link' || !inlineTag.text) {
        continue;
      }

      if (inlineTag.format === 'space') {
        hasAmbiguousLink = true;
        continue;
      }

      if (cannotSafelyFormatLink(
        canonicalForm,
        inlineTag.text,
      )) {
        hasAmbiguousLink = true;
        continue;
      }

      if (inlineTag.format === canonicalForm) {
        continue;
      }

      const {
        start,
      } = /** @type {typeof inlineTag & {start: number}} */ (inlineTag);

      if (
        isInsideMarkdownCodeSpan(rawDescription, start) ||
        scopedPackageNameRegex.test(inlineTag.namepathOrURL)
      ) {
        hasAmbiguousLink = true;
      } else {
        hasNoncanonicalLink = true;
      }
    }

    const unrecognizedLinkText = rawDescription
      .replaceAll(new RegExp(markdownLinkRegex, 'gv'), '')
      .replaceAll(new RegExp(prefixLinkRegex, 'gv'), '')
      .replaceAll(new RegExp(pipeLinkRegex, 'gv'), '');

    hasAmbiguousLink ||= markdownLinkAttemptRegex.test(unrecognizedLinkText) ||
      prefixLinkAttemptRegex.test(unrecognizedLinkText) ||
      pipeLinkAttemptRegex.test(unrecognizedLinkText);

    if (hasAmbiguousLink) {
      utils.reportJSDoc('@see link cannot be safely normalized.', {
        line: tag.source[0].number,
      }, null);
      continue;
    }

    if (!hasNoncanonicalLink) {
      continue;
    }

    fixableTags.push(tag);
  }

  for (const [
    reportIdx,
    tag,
  ] of fixableTags.entries()) {
    const bareUrl = bareUrlTags.get(tag);

    utils.reportJSDoc(
      getExpectedMessage(bareUrl, canonicalForm),
      {
        line: tag.source[0].number,
      },
      enableFixer && reportIdx === 0 ?
        () => {
          for (const fixableTag of fixableTags) {
            const firstTokens = fixableTag.source[0].tokens;

            if (firstTokens.name) {
              firstTokens.description = firstTokens.name +
                firstTokens.postName + firstTokens.description;
              firstTokens.name = '';
              firstTokens.postName = '';
            }

            const fixableBareUrl = bareUrlTags.get(fixableTag);

            if (fixableBareUrl) {
              for (const source of fixableTag.source) {
                if (!source.tokens.description.includes(fixableBareUrl)) {
                  continue;
                }

                source.tokens.description = source.tokens.description.replace(
                  fixableBareUrl,
                  () => {
                    return formatBareUrl(fixableBareUrl);
                  },
                );
                break;
              }

              continue;
            }

            for (
              let sourceIdx = 0;
              sourceIdx < fixableTag.source.length;
              sourceIdx++
            ) {
              if (!descriptionMatcher.test(
                fixableTag.source[sourceIdx].tokens.description,
              )) {
                continue;
              }

              utils.setTagDescription(
                fixableTag,
                descriptionMatcher,
                (description) => {
                  return normalizeDescription(description, canonicalForm);
                },
              );
            }
          }
        } :
        null,
      true,
    );
  }
}, {
  iterateAllJsdocs: true,
  meta: {
    docs: {
      description: 'Normalizes labeled links in `@see` tags to a canonical `{@link}` form.',
      url: 'https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/normalize-see-links.md#repos-sticky-header',
    },
    fixable: 'code',
    schema: [
      {
        additionalProperties: false,
        properties: {
          canonicalForm: {
            description: 'The canonical `{@link}` form: `"pipe"` produces `{@link url|label}`, while `"prefix"` produces `[label]{@link url}`. Defaults to `"pipe"`.',
            enum: [
              'pipe',
              'prefix',
            ],
            type: 'string',
          },
          enableFixer: {
            description: 'Whether to enable the fixer. Defaults to `true`.',
            type: 'boolean',
          },
          wrapBareUrls: {
            description: 'Whether to wrap an `@see` description containing only a lowercase `http:` or `https:` URL (for example, `@see https://example.com`) in a plain `{@link https://example.com}`. Defaults to `false`.',
            type: 'boolean',
          },
        },
        type: 'object',
      },
    ],
    type: 'suggestion',
  },
});
