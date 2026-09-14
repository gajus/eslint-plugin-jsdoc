import iterateJsdoc from '../iterateJsdoc.js';

/**
 * @typedef {boolean|'allow-with-description'|{descriptionFormat: string}} DirectiveConfig
 */

/**
 * @typedef {{
 *   minimumDescriptionLength?: number,
 *   'ts-check'?: DirectiveConfig,
 *   'ts-expect-error'?: DirectiveConfig,
 *   'ts-ignore'?: DirectiveConfig,
 *   'ts-nocheck'?: DirectiveConfig,
 * }} OptionsShape
 */

const defaultMinimumDescriptionLength = 3;

// https://github.com/microsoft/TypeScript/blob/main/src/compiler/parser.ts
const singleLinePragmaRegExp =
  /^\/\/\/?\s*@ts-(?<directive>check|nocheck)(?<description>.*)$/v;

// https://github.com/microsoft/TypeScript/blob/main/src/compiler/scanner.ts
const commentDirectiveRegExpSingleLine =
  /^\/*\s*@ts-(?<directive>expect-error|ignore)(?<description>.*)/v;
const commentDirectiveRegExpMultiLine =
  /^\s*(?:\/|\*)*\s*@ts-(?<directive>expect-error|ignore)(?<description>.*)/v;

const lineBreakRegExp = /\r\n|\r|\n/v;

/**
 * @param {RegExp} regExp
 * @param {string} str
 * @returns {{description: string, directive: string}|null}
 */
const execDirectiveRegExp = (regExp, str) => {
  const match = regExp.exec(str);
  if (!match?.groups) {
    return null;
  }

  return {
    description: /** @type {string} */ (match.groups.description),
    directive: /** @type {string} */ (match.groups.directive),
  };
};

/**
 * @param {import('estree').Comment} comment
 * @returns {{description: string, directive: string}|null}
 */
const findDirectiveInComment = (comment) => {
  if (comment.type === 'Line') {
    const matchedPragma = execDirectiveRegExp(singleLinePragmaRegExp, `//${comment.value}`);
    if (matchedPragma) {
      return matchedPragma;
    }

    return execDirectiveRegExp(commentDirectiveRegExpSingleLine, comment.value);
  }

  const commentLines = comment.value.split(lineBreakRegExp);

  return execDirectiveRegExp(
    commentDirectiveRegExpMultiLine,
    /** @type {string} */ (commentLines.at(-1)),
  );
};

export default iterateJsdoc(({
  allComments,
  context,
  makeReport,
  sourceCode,
}) => {
  const [
    {
      minimumDescriptionLength = defaultMinimumDescriptionLength,
      'ts-check': tsCheck = false,
      'ts-expect-error': tsExpectError = 'allow-with-description',
      'ts-ignore': tsIgnore = true,
      'ts-nocheck': tsNoCheck = true,
    } = /** @type {OptionsShape} */ ({}),
  ] = /** @type {[OptionsShape]} */ (context.options);

  /** @type {{[key: string]: DirectiveConfig}} */
  const directiveOptions = {
    'ts-check': tsCheck,
    'ts-expect-error': tsExpectError,
    'ts-ignore': tsIgnore,
    'ts-nocheck': tsNoCheck,
  };

  const firstStatement = sourceCode.ast.body.at(0);

  for (const comment of /** @type {import('estree').Comment[]} */ (
    /** @type {unknown} */ (allComments)
  )) {
    const match = findDirectiveInComment(comment);
    if (!match) {
      continue;
    }

    const {
      description,
      directive,
    } = match;

    if (directive === 'nocheck' && firstStatement) {
      const firstStatementLine = /** @type {import('eslint').AST.SourceLocation} */ (
        firstStatement.loc
      ).start.line;
      const commentLine = /** @type {import('eslint').AST.SourceLocation} */ (
        comment.loc
      ).start.line;
      if (firstStatementLine <= commentLine) {
        continue;
      }
    }

    const option = directiveOptions[`ts-${directive}`];

    const report = /** @type {import('../iterateJsdoc.js').MakeReport} */ (
      makeReport
    )(context, /** @type {import('estree').Node} */ (/** @type {unknown} */ (comment)));

    if (option === true) {
      if (directive === 'ignore') {
        report(
          'Use "@ts-expect-error" instead of "@ts-ignore", as "@ts-ignore" will do nothing if the following line is error-free.',
          null,
          null,
          undefined,
          [
            {
              desc: 'Replace "@ts-ignore" with "@ts-expect-error".',
              fix (fixer) {
                const commentText = comment.value.replace('@ts-ignore', '@ts-expect-error');

                return fixer.replaceText(
                  /** @type {import('estree').Node & {range: [number, number]}} */ (
                    /** @type {unknown} */ (comment)
                  ),
                  comment.type === 'Line' ? `//${commentText}` : `/*${commentText}*/`,
                );
              },
            },
          ],
        );
      } else {
        report(`Do not use "@ts-${directive}" because it alters compilation errors.`);
      }
    } else if (
      option === 'allow-with-description' ||
      (typeof option === 'object' && option.descriptionFormat)
    ) {
      const trimmedDescription = description.trim();
      if (trimmedDescription.length < minimumDescriptionLength) {
        report(
          `Include a description after the "@ts-${directive}" directive to explain why the @ts-${directive} is necessary. The description must be ${minimumDescriptionLength} characters or longer.`,
        );
      } else if (
        typeof option === 'object' &&
        option.descriptionFormat &&
        !new RegExp(option.descriptionFormat, 'v').test(description)
      ) {
        report(
          `The description for the "@ts-${directive}" directive must match the ${option.descriptionFormat} format.`,
        );
      }
    }
  }
}, {
  checkFile: true,
  meta: {
    docs: {
      description: 'Disallows (or requires descriptions for) `@ts-<directive>` comments, mirroring `@typescript-eslint/ban-ts-comment`.',
      url: 'https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/ts-ban-ts-comment.md#repos-sticky-header',
    },
    hasSuggestions: true,
    schema: [
      {
        additionalProperties: false,
        properties: {
          minimumDescriptionLength: {
            description: 'A minimum character length for descriptions when `allow-with-description` is enabled. Defaults to `3`.',
            type: 'integer',
          },
          'ts-check': {
            description: 'Whether (and how) to allow `@ts-check` directives.',
            oneOf: [
              {
                type: 'boolean',
              },
              {
                description: 'Whether to allow the directive if a description is present',
                enum: [
                  'allow-with-description',
                ],
                type: 'string',
              },
              {
                additionalProperties: false,
                properties: {
                  descriptionFormat: {
                    description: 'A regular expression indicating the format the directive should follow',
                    type: 'string',
                  },
                },
                type: 'object',
              },
            ],
          },
          'ts-expect-error': {
            description: 'Whether (and how) to allow `@ts-expect-error` directives.',
            oneOf: [
              {
                type: 'boolean',
              },
              {
                description: 'Whether to allow the directive if a description is present',
                enum: [
                  'allow-with-description',
                ],
                type: 'string',
              },
              {
                additionalProperties: false,
                properties: {
                  descriptionFormat: {
                    description: 'A regular expression indicating the format the directive should follow',
                    type: 'string',
                  },
                },
                type: 'object',
              },
            ],
          },
          'ts-ignore': {
            description: 'Whether (and how) to allow `@ts-ignore` directives.',
            oneOf: [
              {
                type: 'boolean',
              },
              {
                description: 'Whether to allow the directive if a description is present',
                enum: [
                  'allow-with-description',
                ],
                type: 'string',
              },
              {
                additionalProperties: false,
                properties: {
                  descriptionFormat: {
                    description: 'A regular expression indicating the format the directive should follow',
                    type: 'string',
                  },
                },
                type: 'object',
              },
            ],
          },
          'ts-nocheck': {
            description: 'Whether (and how) to allow `@ts-nocheck` directives.',
            oneOf: [
              {
                type: 'boolean',
              },
              {
                description: 'Whether to allow the directive if a description is present',
                enum: [
                  'allow-with-description',
                ],
                type: 'string',
              },
              {
                additionalProperties: false,
                properties: {
                  descriptionFormat: {
                    description: 'A regular expression indicating the format the directive should follow',
                    type: 'string',
                  },
                },
                type: 'object',
              },
            ],
          },
        },
        type: 'object',
      },
    ],
    type: 'suggestion',
  },
});
