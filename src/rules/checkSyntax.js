import iterateJsdoc from '../iterateJsdoc.js';

// Closure's `{type=} name` is written `{type} [name]` in JSDoc/TypeScript
const namedTags = new Set([
  'arg', 'argument', 'param', 'prop', 'property',
]);

// Types that do not need parentheses before `|undefined`
const simpleType = /^[\w$.]+$/v;

/**
 * Builds the fix for a tag with a Closure style optional type (`{type=}`), if
 * there is one.
 *
 * Named tags (`@param {type=} name`) become `{type} [name]`; for other tags
 * (or a missing or defaulted name), the type is joined with `undefined`.
 * @param {import('comment-parser').Spec} tag
 * @returns {() => void}
 */
const getFix = (tag) => {
  const {
    source,
  } = tag;

  // For a type over several lines, the end of the type is on the line that has the name
  const lastTypeLine = /** @type {import('comment-parser').Line} */ (source.findLast(({
    tokens,
  }) => {
    return tokens.type.endsWith('=}');
  }));

  const firstTypeLine = /** @type {import('comment-parser').Line} */ (source.find(({
    tokens,
  }) => {
    return tokens.type;
  }));

  const nameTokens = source.find(({
    tokens,
  }) => {
    return tokens.name;
  })?.tokens;

  // A name with a default (`[foo=bar]`) is already bracketed; a bare `foo=bar` is not a valid name
  if (namedTags.has(tag.tag) && nameTokens && (!nameTokens.name.includes('=') || nameTokens.name.startsWith('['))) {
    return () => {
      lastTypeLine.tokens.type = `${lastTypeLine.tokens.type.slice(0, -2)}}`;
      if (!nameTokens.name.startsWith('[')) {
        nameTokens.name = `[${nameTokens.name}]`;
      }

      tag.optional = true;
    };
  }

  const isSingleLine = firstTypeLine === lastTypeLine;
  const inner = lastTypeLine.tokens.type.slice(isSingleLine ? 1 : 0, -2);
  if (isSingleLine && simpleType.test(inner)) {
    return () => {
      lastTypeLine.tokens.type = `{${inner}|undefined}`;
    };
  }

  return () => {
    firstTypeLine.tokens.type = `{(${firstTypeLine.tokens.type.slice(1)}`;
    lastTypeLine.tokens.type = `${lastTypeLine.tokens.type.slice(0, -2)})|undefined}`;
  };
};

export default iterateJsdoc(({
  context,
  jsdoc,
  report,
  settings,
  utils,
}) => {
  const {
    enableFixer = false,
  } = context.options[0] || {};

  const {
    mode,
  } = settings;

  // Don't check for "permissive" and "closure"
  if (mode === 'jsdoc' || mode === 'typescript') {
    /** @type {import('comment-parser').Spec|undefined} */
    let firstTag;
    /** @type {(() => void)[]} */
    const fixes = [];

    for (const tag of jsdoc.tags) {
      if (tag.type.slice(-1) !== '=') {
        continue;
      }

      firstTag ??= tag;

      if (enableFixer) {
        fixes.push(getFix(tag));
      }
    }

    if (firstTag) {
      const message = 'Syntax should not be Google Closure Compiler style.';
      if (fixes.length) {
        utils.reportJSDoc(message, firstTag, () => {
          for (const fix of fixes) {
            fix();
          }
        });
      } else {
        report(message, null, firstTag);
      }
    }
  }
}, {
  iterateAllJsdocs: true,
  meta: {
    docs: {
      description: 'Reports against syntax not valid for the mode (e.g., Google Closure Compiler in non-Closure mode).',
      url: 'https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/check-syntax.md#repos-sticky-header',
    },
    fixable: 'code',
    schema: [
      {
        additionalProperties: false,
        properties: {
          enableFixer: {
            description: `Whether to enable the fixer to replace the Closure Compiler style \`{type=}\`
with \`{type} [name]\` on \`@param\` and \`@property\` tags, and with
\`{type|undefined}\` on other tags.
Defaults to \`false\`.`,
            type: 'boolean',
          },
        },
        type: 'object',
      },
    ],
    type: 'suggestion',
  },
});
