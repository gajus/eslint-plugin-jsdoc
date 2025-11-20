import alignTransform from '../alignTransform.js';
import iterateJsdoc from '../iterateJsdoc.js';
import {
  transforms,
} from 'comment-parser';

const {
  flow: commentFlow,
} = transforms;

/**
 * Detects if a line starts with a markdown list marker
 * Supports: -, *, numbered lists (1., 2., etc.)
 * This explicitly excludes hyphens that are part of JSDoc tag syntax
 * @param {string} text - The text to check
 * @param {boolean} isFirstLineOfTag - True if this is the first line (tag line)
 * @returns {boolean} - True if the text starts with a list marker
 */
const startsWithListMarker = (text, isFirstLineOfTag = false) => {
  // On the first line of a tag, the hyphen is typically the JSDoc separator,
  // not a list marker
  if (isFirstLineOfTag) {
    return false;
  }

  // Match lines that start with optional whitespace, then a list marker
  // - or * followed by a space
  // or a number followed by . or ) and a space
  return /^\s*(?:[\-*]|\d+(?:\.|\)))\s+/v.test(text);
};

/**
 * Checks if we should allow extra indentation beyond wrapIndent.
 * This is true for list continuation lines (lines with more indent than wrapIndent
 * that follow a list item).
 * @param {import('comment-parser').Spec} tag - The tag being checked
 * @param {import('../iterateJsdoc.js').Integer} idx - Current line index (0-based in tag.source.slice(1))
 * @returns {boolean} - True if extra indentation should be allowed
 */
const shouldAllowExtraIndent = (tag, idx) => {
  // Check if any previous line in this tag had a list marker
  // idx is 0-based in the continuation lines (tag.source.slice(1))
  // So tag.source[0] is the tag line, tag.source[idx+1] is current line
  let hasSeenListMarker = false;

  // Check all lines from the tag line onwards
  for (let lineIdx = 0; lineIdx <= idx + 1; lineIdx++) {
    const line = tag.source[lineIdx];
    const isFirstLine = lineIdx === 0;
    if (line?.tokens?.description && startsWithListMarker(line.tokens.description, isFirstLine)) {
      hasSeenListMarker = true;
      break;
    }
  }

  return hasSeenListMarker;
};

/**
 * @typedef {{
 *   postDelimiter: import('../iterateJsdoc.js').Integer,
 *   postHyphen: import('../iterateJsdoc.js').Integer,
 *   postName: import('../iterateJsdoc.js').Integer,
 *   postTag: import('../iterateJsdoc.js').Integer,
 *   postType: import('../iterateJsdoc.js').Integer,
 * }} CustomSpacings
 */

/**
 * @param {import('../iterateJsdoc.js').Utils} utils
 * @param {import('comment-parser').Spec & {
 *   line: import('../iterateJsdoc.js').Integer
 * }} tag
 * @param {CustomSpacings} customSpacings
 */
const checkNotAlignedPerTag = (utils, tag, customSpacings) => {
  /*
  start +
  delimiter +
  postDelimiter +
  tag +
  postTag +
  type +
  postType +
  name +
  postName +
  description +
  end +
  lineEnd
   */

  /**
   * @typedef {"tag"|"type"|"name"|"description"} ContentProp
   */

  /** @type {("postDelimiter"|"postTag"|"postType"|"postName")[]} */
  let spacerProps;
  /** @type {ContentProp[]} */
  let contentProps;
  const mightHaveNamepath = utils.tagMightHaveNameOrNamepath(tag.tag);
  if (mightHaveNamepath) {
    spacerProps = [
      'postDelimiter', 'postTag', 'postType', 'postName',
    ];
    contentProps = [
      'tag', 'type', 'name', 'description',
    ];
  } else {
    spacerProps = [
      'postDelimiter', 'postTag', 'postType',
    ];
    contentProps = [
      'tag', 'type', 'description',
    ];
  }

  const {
    tokens,
  } = tag.source[0];

  /**
   * @param {import('../iterateJsdoc.js').Integer} idx
   * @param {(notRet: boolean, contentProp: ContentProp) => void} [callbck]
   */
  const followedBySpace = (idx, callbck) => {
    const nextIndex = idx + 1;

    return spacerProps.slice(nextIndex).some((spacerProp, innerIdx) => {
      const contentProp = contentProps[nextIndex + innerIdx];

      const spacePropVal = tokens[spacerProp];

      const ret = spacePropVal;

      if (callbck) {
        callbck(!ret, contentProp);
      }

      return ret && (callbck || !contentProp);
    });
  };

  const postHyphenSpacing = customSpacings?.postHyphen ?? 1;
  const exactHyphenSpacing = new RegExp(`^\\s*-\\s{${postHyphenSpacing},${postHyphenSpacing}}(?!\\s)`, 'v');
  const hasNoHyphen = !(/^\s*-(?!$)(?=\s)/v).test(tokens.description);
  const hasExactHyphenSpacing = exactHyphenSpacing.test(
    tokens.description,
  );

  // If checking alignment on multiple lines, need to check other `source`
  //   items
  // Go through `post*` spacing properties and exit to indicate problem if
  //   extra spacing detected
  const ok = !spacerProps.some((spacerProp, idx) => {
    const contentProp = contentProps[idx];
    const contentPropVal = tokens[contentProp];
    const spacerPropVal = tokens[spacerProp];
    const spacing = customSpacings?.[spacerProp] || 1;

    // There will be extra alignment if...

    // 1. The spaces don't match the space it should have (1 or custom spacing) OR
    return spacerPropVal.length !== spacing && spacerPropVal.length !== 0 ||

      // 2. There is a (single) space, no immediate content, and yet another
      //     space is found subsequently (not separated by intervening content)
      spacerPropVal && !contentPropVal && followedBySpace(idx);
  }) && (hasNoHyphen || hasExactHyphenSpacing);
  if (ok) {
    return;
  }

  const fix = () => {
    for (const [
      idx,
      spacerProp,
    ] of spacerProps.entries()) {
      const contentProp = contentProps[idx];
      const contentPropVal = tokens[contentProp];

      if (contentPropVal) {
        const spacing = customSpacings?.[spacerProp] || 1;
        tokens[spacerProp] = ''.padStart(spacing, ' ');
        followedBySpace(idx, (hasSpace, contentPrp) => {
          if (hasSpace) {
            tokens[contentPrp] = '';
          }
        });
      } else {
        tokens[spacerProp] = '';
      }
    }

    if (!hasExactHyphenSpacing) {
      const hyphenSpacing = /^\s*-\s+/v;
      tokens.description = tokens.description.replace(
        hyphenSpacing, '-' + ''.padStart(postHyphenSpacing, ' '),
      );
    }

    utils.setTag(tag, tokens);
  };

  utils.reportJSDoc('Expected JSDoc block lines to not be aligned.', tag, fix, true);
};

/**
 * @param {object} cfg
 * @param {CustomSpacings} cfg.customSpacings
 * @param {string} cfg.indent
 * @param {import('comment-parser').Block} cfg.jsdoc
 * @param {import('eslint').Rule.Node & {
 *   range: [number, number]
 * }} cfg.jsdocNode
 * @param {boolean} cfg.preserveMainDescriptionPostDelimiter
 * @param {import('../iterateJsdoc.js').Report} cfg.report
 * @param {string[]} cfg.tags
 * @param {import('../iterateJsdoc.js').Utils} cfg.utils
 * @param {string} cfg.wrapIndent
 * @param {boolean} cfg.disableWrapIndent
 * @returns {void}
 */
const checkAlignment = ({
  customSpacings,
  disableWrapIndent,
  indent,
  jsdoc,
  jsdocNode,
  preserveMainDescriptionPostDelimiter,
  report,
  tags,
  utils,
  wrapIndent,
}) => {
  const transform = commentFlow(
    alignTransform({
      customSpacings,
      disableWrapIndent,
      indent,
      preserveMainDescriptionPostDelimiter,
      tags,
      wrapIndent,
    }),
  );
  const transformedJsdoc = transform(jsdoc);

  const comment = '/*' +
  /**
   * @type {import('eslint').Rule.Node & {
   *   range: [number, number], value: string
   * }}
   */ (jsdocNode).value + '*/';

  const formatted = utils.stringify(transformedJsdoc)
    .trimStart();

  if (comment !== formatted) {
    report(
      'Expected JSDoc block lines to be aligned.',
      /** @type {import('eslint').Rule.ReportFixer} */ (fixer) => {
        return fixer.replaceText(jsdocNode, formatted);
      },
    );
  }
};

export default iterateJsdoc(({
  context,
  indent,
  jsdoc,
  jsdocNode,
  report,
  utils,
}) => {
  const {
    customSpacings,
    disableWrapIndent = false,
    preserveMainDescriptionPostDelimiter,
    tags: applicableTags = [
      'param', 'arg', 'argument', 'property', 'prop', 'returns', 'return', 'template',
    ],
    wrapIndent = '',
  } = context.options[1] || {};

  if (context.options[0] === 'always') {
    // Skip if it contains only a single line.
    if (!(
      /**
       * @type {import('eslint').Rule.Node & {
       *   range: [number, number], value: string
       * }}
       */
      (jsdocNode).value.includes('\n')
    )) {
      return;
    }

    checkAlignment({
      customSpacings,
      disableWrapIndent,
      indent,
      jsdoc,
      jsdocNode,
      preserveMainDescriptionPostDelimiter,
      report,
      tags: applicableTags,
      utils,
      wrapIndent,
    });

    return;
  }

  const foundTags = utils.getPresentTags(applicableTags);
  if (context.options[0] !== 'any') {
    for (const tag of foundTags) {
      checkNotAlignedPerTag(
        utils,
        /**
         * @type {import('comment-parser').Spec & {
         *   line: import('../iterateJsdoc.js').Integer
         * }}
         */
        (tag),
        customSpacings,
      );
    }
  }

  for (const tag of foundTags) {
    if (tag.source.length > 1) {
      let idx = 0;
      for (const {
        tokens,
      // Avoid the tag line
      } of tag.source.slice(1)) {
        idx++;

        if (
          !tokens.description ||
          // Avoid first lines after multiline type
          tokens.type ||
          tokens.name
        ) {
          continue;
        }

        // Don't include a single separating space/tab
        const actualIndent = tokens.postDelimiter.slice(1);
        const hasCorrectWrapIndent = actualIndent === wrapIndent;

        // Allow extra indentation if this line or previous lines contain list markers
        // This preserves nested list structure
        const hasExtraIndent = actualIndent.length > wrapIndent.length &&
                                actualIndent.startsWith(wrapIndent);
        const isInListContext = shouldAllowExtraIndent(tag, idx - 1);

        if (!disableWrapIndent && !hasCorrectWrapIndent &&
            !(hasExtraIndent && isInListContext)) {
          utils.reportJSDoc('Expected wrap indent', {
            line: tag.source[0].number + idx,
          }, () => {
            tokens.postDelimiter = tokens.postDelimiter.charAt(0) + wrapIndent;
          });
          return;
        }
      }
    }
  }
}, {
  iterateAllJsdocs: true,
  meta: {
    docs: {
      description: 'Reports invalid alignment of JSDoc block lines.',
      url: 'https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/check-line-alignment.md#repos-sticky-header',
    },
    fixable: 'whitespace',
    schema: [
      {
        description: `If the string value is
\`"always"\` then a problem is raised when the lines are not aligned.
If it is \`"never"\` then a problem should be raised when there is more than
one space between each line's parts. If it is \`"any"\`, no alignment is made.
Defaults to \`"never"\`.

Note that in addition to alignment, the "never" and "always" options will both
ensure that at least one space is present after the asterisk delimiter.`,
        enum: [
          'always', 'never', 'any',
        ],
        type: 'string',
      },
      {
        additionalProperties: false,
        properties: {
          customSpacings: {
            additionalProperties: false,
            description: `An object with any of the following spacing keys set to an integer.
If a spacing is not defined, it defaults to one.`,
            properties: {
              postDelimiter: {
                description: 'Affects spacing after the asterisk (e.g., `*   @param`)',
                type: 'integer',
              },
              postHyphen: {
                description: 'Affects spacing after any hyphens in the description (e.g., `* @param {someType} name -  A description`)',
                type: 'integer',
              },
              postName: {
                description: 'Affects spacing after the name (e.g., `* @param {someType} name   `)',
                type: 'integer',
              },
              postTag: {
                description: 'Affects spacing after the tag (e.g., `* @param  `)',
                type: 'integer',
              },
              postType: {
                description: 'Affects spacing after the type (e.g., `* @param {someType}   `)',
                type: 'integer',
              },
            },
            type: 'object',
          },
          disableWrapIndent: {
            description: 'Disables `wrapIndent`; existing wrap indentation is preserved without changes.',
            type: 'boolean',
          },
          preserveMainDescriptionPostDelimiter: {
            default: false,
            description: `A boolean to determine whether to preserve the post-delimiter spacing of the
main description. If \`false\` or unset, will be set to a single space.`,
            type: 'boolean',
          },
          tags: {
            description: `Use this to change the tags which are sought for alignment changes. Defaults to an array of
\`['param', 'arg', 'argument', 'property', 'prop', 'returns', 'return', 'template']\`.`,
            items: {
              type: 'string',
            },
            type: 'array',
          },
          wrapIndent: {
            description: `The indent that will be applied for tag text after the first line.
Default to the empty string (no indent).`,
            type: 'string',
          },
        },
        type: 'object',
      },
    ],
    type: 'layout',
  },
});
