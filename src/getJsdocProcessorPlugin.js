import {
  forEachPreferredTag,
  getPreferredTagName,
  getRegexFromString,
  getTagDescription,
  hasTag,
} from './jsdocUtils.js';
import {
  parseComment,
} from '@es-joy/jsdoccomment';
import * as espree from 'espree';
import {
  decode,
} from 'html-entities';
import {
  readFileSync,
} from 'node:fs';
import {
  join,
} from 'node:path';
/**
 * @import {
 *   Integer,
 *   JsdocBlockWithInline,
 * } from './iterateJsdoc.js';
 * @import {
 *   ESLint,
 *   Linter,
 * } from 'eslint';
 */

const {
  version,
} = JSON.parse(
  readFileSync(join(import.meta.dirname, '../package.json'), 'utf8'),
);

// const zeroBasedLineIndexAdjust = -1;
const likelyNestedJSDocIndentSpace = 1;
const preTagSpaceLength = 1;

// If a space is present, we should ignore it
const firstLinePrefixLength = preTagSpaceLength;

const hasCaptionRegex = /^\s*<caption>([\s\S]*?)<\/caption>/v;

/**
 * @param {string} str
 * @returns {string}
 */
const escapeStringRegexp = (str) => {
  return str.replaceAll(/[.*+?^$\{\}\(\)\|\[\]\\]/gv, '\\$&');
};

/**
 * @param {string} str
 * @param {string} ch
 * @returns {Integer}
 */
const countChars = (str, ch) => {
  return (str.match(new RegExp(escapeStringRegexp(ch), 'gv')) || []).length;
};

/**
 * @param {string} text
 * @returns {[
 *   Integer,
 *   Integer
 * ]}
 */
const getLinesCols = (text) => {
  const matchLines = countChars(text, '\n');

  const colDelta = matchLines ?
    text.slice(text.lastIndexOf('\n') + 1).length :
    text.length;

  return [
    matchLines, colDelta,
  ];
};

const hostLineBreak = /[\n\r\u2028\u2029]/v;

/**
 * Host rules such as `jsdoc/tag-lines` decide how many blank lines start and
 * end a tag, so a fix changing either count could undo, and be undone by,
 * such a rule on every run.
 * @param {import('comment-parser').Spec} tag
 * @returns {string}
 */
const getEdgeBlankLines = ({
  source,
}) => {
  // One character per line after the tag's own: a space when it is blank.
  const lines = source.slice(1).filter(({
    tokens,
  }) => {
    return !tokens.end;
  }).map(({
    tokens,
  }) => {
    return tokens.description || tokens.name || tokens.type ? '-' : ' ';
  }).join('');
  return `${lines.length - lines.trimStart().length},${lines.length - lines.trimEnd().length}`;
};

/**
 * Propose a host range for a virtual fix from lines which still occur
 * verbatim (after their gutter) at their expected comment line. This is only
 * a candidate; `verifyFix` decides whether it is kept.
 * @param {import('eslint').Rule.Fix} fix
 * @param {string} virtualText
 * @param {RegExpExecArray[]} hostLines
 * @param {number} hostLineOffset
 * @param {[number, number]} commentRange
 * @returns {import('eslint').Rule.Fix|null}
 */
const mapExampleFix = (fix, virtualText, hostLines, hostLineOffset, commentRange) => {
  // ESLint lints example code without a leading byte order mark, so its
  //   offsets would be one short here.
  if (virtualText.startsWith('\uFEFF')) {
    return null;
  }

  const virtualLines = [
    ...virtualText.matchAll(/([^\r\n]*)(\r\n|\r|\n|$)/gv),
  ];
  const [
    start,
    end,
  ] = fix.range.map((offset) => {
    const index = virtualLines.findIndex((match) => {
      return offset >= match.index && offset <= match.index + match[1].length;
    });
    const virtual = virtualLines[index];
    const host = hostLines[hostLineOffset + index];
    if (!virtual || !host || !virtual[1]) {
      return null;
    }

    const prefixLength = host[1].indexOf(virtual[1]);
    const prefix = host[1].slice(0, prefixLength);
    if (prefixLength < 0 || !(/^\s*\*?\s*$/v).test(prefix) ||
      host[1].slice(prefixLength + virtual[1].length).trim()) {
      return null;
    }

    const position = host.index + prefixLength + offset - virtual.index;
    return position >= commentRange[0] + 3 && position <= commentRange[1] - 2 ?
      {
        eol: host[2],
        position,
        prefix,
      } : null;
  });
  if (!start || !end) {
    return null;
  }

  return {
    range: [
      start.position, end.position,
    ],
    // A bare ` *` gutter drops one leading space of an added line's code.
    text: fix.text.replaceAll(/\r\n|\r|\n/gv, start.eol + start.prefix.replace(/\*$/v, '* ')),
  };
};

/**
 * @typedef {object} JsdocProcessorOptions
 * @property {boolean} [captionRequired] Require captions for example tags
 * @property {Integer} [paddedIndent] See docs
 * @property {boolean} [checkDefaults] See docs
 * @property {boolean} [checkParams] See docs
 * @property {boolean} [checkExamples] See docs
 * @property {boolean} [fixExamples] Keep verified example fixes and suggestions. Defaults to false.
 * @property {boolean} [checkProperties] See docs
 * @property {string} [matchingFileName] See docs
 * @property {string} [matchingFileNameDefaults] See docs
 * @property {string} [matchingFileNameParams] See docs
 * @property {string} [matchingFileNameProperties] See docs
 * @property {string|RegExp} [exampleCodeRegex] See docs
 * @property {string|RegExp} [rejectExampleCodeRegex] See docs
 * @property {string[]} [allowedLanguagesToProcess] See docs
 * @property {"script"|"module"} [sourceType] See docs
 * @property {import('eslint').Linter.ESTreeParser|import('eslint').Linter.NonESTreeParser} [parser] See docs
 */

/**
 * We use a function for the ability of the user to pass in a config, but
 * without requiring all users of the plugin to do so.
 * @param {JsdocProcessorOptions} [options]
 * @returns {ESLint.Plugin}
 */
export const getJsdocProcessorPlugin = (options = {}) => {
  /**
   * @typedef {{
   *   text: string,
   *   filename: string|null|undefined
   * }} TextAndFileName
   */

  const {
    allowedLanguagesToProcess = [
      'js', 'ts', 'javascript', 'typescript',
    ],
    captionRequired = false,
    checkDefaults = false,
    checkExamples = true,
    checkParams = false,
    checkProperties = false,
    exampleCodeRegex = null,
    fixExamples = false,
    matchingFileName = null,
    matchingFileNameDefaults = null,
    matchingFileNameParams = null,
    matchingFileNameProperties = null,
    paddedIndent = 0,
    parser = undefined,
    rejectExampleCodeRegex = null,
    sourceType = 'module',
  } = options;

  /** @type {RegExp} */
  let exampleCodeRegExp;
  /** @type {RegExp} */
  let rejectExampleCodeRegExp;

  if (exampleCodeRegex) {
    exampleCodeRegExp = typeof exampleCodeRegex === 'string' ?
      getRegexFromString(exampleCodeRegex) :
      exampleCodeRegex;
  }

  if (rejectExampleCodeRegex) {
    rejectExampleCodeRegExp = typeof rejectExampleCodeRegex === 'string' ?
      getRegexFromString(rejectExampleCodeRegex) :
      rejectExampleCodeRegex;
  }

  /**
   * @typedef {{
   *   text: string,
   *   comments: import('estree').Comment[],
   *   ambiguous?: boolean,
   *   lines?: RegExpExecArray[]
   * }} HostInfo
   */

  /**
   * @typedef {{
   *   host: HostInfo,
   *   multiline: boolean,
   *   range: [number, number],
   *   verbatim: boolean
   * }} CommentInfo
   */

  /**
   * @typedef {{
   *   example: boolean,
   *   virtualText: string,
   *   comment: CommentInfo,
   *   tag: import('comment-parser').Spec,
   *   siblings: OtherInfo[],
   *   targetTagName: string,
   *   ext: string,
   *   codeStartLine: number,
   *   codeStartCol: number,
   *   nonJSPrefacingCols: number,
   *   commentLineCols: [number, number],
   *   paddedLines: Set<number>
   * }} OtherInfo
   */

  /**
   * Keyed by filename, as the same plugin instance preprocesses many files
   *   (including the example files it produces) before postprocessing them.
   * @type {Map<string, OtherInfo[]>}
   */
  const otherInfoByFilename = new Map();

  /**
   * Messages of the file itself (e.g., of a missing caption), also by
   *   filename, so that they are not returned with an example file's messages.
   * @type {Map<string, import('eslint').Linter.LintMessage[]>}
   */
  const extraMessagesByFilename = new Map();

  /**
   * @param {JsdocBlockWithInline} jsdoc
   * @param {string} jsFileName
   * @param {[number, number]} commentLineCols
   * @param {OtherInfo[]} otherInfo
   * @param {CommentInfo} comment
   */
  const getTextsAndFileNames = (jsdoc, jsFileName, commentLineCols, otherInfo, comment) => {
    /**
     * @type {TextAndFileName[]}
     */
    const textsAndFileNames = [];

    /**
     * @param {{
     *   filename: string|null,
     *   defaultFileName: string|undefined,
     *   source: string,
     *   targetTagName: string,
     *   rules?: import('eslint').Linter.RulesRecord|undefined,
     *   lines?: Integer,
     *   cols?: Integer,
     *   skipInit?: boolean,
     *   example?: boolean,
     *   ext: string,
     *   sources?: {
     *     nonJSPrefacingCols: Integer,
     *     nonJSPrefacingLines: Integer,
     *     string: string,
     *   }[],
     *   tag?: import('comment-parser').Spec & {
     *     line?: Integer,
     *   }|{
     *     line: Integer,
     *   }
     * }} cfg
     */
    const checkSource = ({
      cols = 0,
      defaultFileName,
      example = false,
      ext,
      filename,
      lines = 0,
      skipInit,
      source,
      sources = [],
      tag = {
        line: 0,
      },
      targetTagName,
    }) => {
      if (!skipInit) {
        sources.push({
          nonJSPrefacingCols: cols,
          nonJSPrefacingLines: lines,
          string: source,
        });
      }

      /** @type {OtherInfo[]} */
      const siblings = [];

      /**
       * @param {{
       *   nonJSPrefacingCols: Integer,
       *   nonJSPrefacingLines: Integer,
       *   string: string
       * }} cfg
       */
      const addSourceInfo = function ({
        nonJSPrefacingCols,
        nonJSPrefacingLines,
        string,
      }) {
        // The lines of the linted code (from 1) from which `paddedIndent`
        //   spaces are removed
        /** @type {Set<Integer>} */
        const paddedLines = new Set();
        // Spaces at the very start are replaced by a line break too
        let addedLines = 0;
        const src = paddedIndent ?
          string.replaceAll(new RegExp(`(^|\n) {${paddedIndent}}(?!$)`, 'gv'), (_match, lineBreak, offset) => {
            paddedLines.add(countChars(string.slice(0, offset), '\n') + 2 + addedLines);
            addedLines += Number(!lineBreak);
            return '\n';
          }) :
          string;

        // Programmatic ESLint API: https://eslint.org/docs/developer-guide/nodejs-api
        const file = filename || defaultFileName;

        if (!('line' in tag)) {
          tag.line = tag.source[0].number;
        }

        // NOTE: `tag.line` can be 0 if of form `/** @tag ... */`
        const codeStartLine = /**
                               * @type {import('comment-parser').Spec & {
                               *     line: Integer,
                               * }}
                               */ (tag).line + nonJSPrefacingLines;
        const codeStartCol = likelyNestedJSDocIndentSpace;

        // Code on the line of the tag follows the tag (e.g., `@example `)
        const tagLineCols = !nonJSPrefacingLines && 'source' in tag ?
          tag.source[0].tokens.tag.length + 1 :
          0;

        const virtualText =
          // See https://github.com/gajus/eslint-plugin-jsdoc/issues/710
          src.replaceAll(/(?<=\*)\\(?=\\*\/)/gv, '').replaceAll(/&([^\s;]+);/gv, (_, code) => {
            // Dec
            if ((/^#\d+$/v).test(code)) {
              return String.fromCodePoint(Number.parseInt(code.slice(1), 10));
            }

            // Hex
            if ((/^#x\d+$/v).test(code)) {
              return String.fromCodePoint(Number.parseInt(code.slice(2), 16));
            }

            return decode(_, {
              level: 'html5',
            });
          });
        textsAndFileNames.push({
          filename: file,
          text: virtualText,
        });
        const info = {
          codeStartCol,
          codeStartLine,
          comment,
          commentLineCols,
          example,
          ext,
          nonJSPrefacingCols: nonJSPrefacingCols + tagLineCols,
          paddedLines,
          siblings,
          tag: /** @type {import('comment-parser').Spec} */ (tag),
          targetTagName,
          virtualText,
        };
        otherInfo.push(info);
        siblings.push(info);
      };

      for (const targetSource of sources) {
        addSourceInfo(targetSource);
      }
    };

    /**
     *
     * @param {string|null} filename
     * @param {string} [ext] Since `eslint-plugin-markdown` v2, and
     *   ESLint 7, this is the default which other JS-fenced rules will used.
     *   Formerly "md" was the default.
     * @returns {{
     *   defaultFileName: string|undefined,
     *   filename: string|null,
     *   ext: string
     * }}
     */
    const getFilenameInfo = (filename, ext = 'md/*.js') => {
      let defaultFileName;
      if (!filename) {
        if (typeof jsFileName === 'string' && jsFileName.includes('.')) {
          defaultFileName = jsFileName.replace(/\.[^.]*$/v, `.${ext}`);
        } else {
          defaultFileName = `dummy.${ext}`;
        }
      }

      return {
        defaultFileName,
        ext,
        filename,
      };
    };

    /**
     * The columns from after the tag to the default value of a `@param` or
     *   `@property` (e.g., ` [a=` of `@param [a=1]`), less the added `(`.
     * @param {import('comment-parser').Spec} tag
     * @returns {Integer}
     */
    const getDefaultCols = (tag) => {
      const {
        name,
        postTag,
        postType,
        type,
      } = tag.source[0].tokens;
      return postTag.length + type.length + postType.length + name.indexOf('=') - 1;
    };

    if (checkDefaults) {
      const filenameInfo = getFilenameInfo(matchingFileNameDefaults, 'jsdoc-defaults');
      forEachPreferredTag(jsdoc, 'default', (tag, targetTagName) => {
        if (!tag.description.trim()) {
          return;
        }

        checkSource({
          // The value follows the tag, less the added `(`
          cols: -1,
          source: `(${getTagDescription(tag)})`,
          tag,
          targetTagName,
          ...filenameInfo,
        });
      });
    }

    if (checkParams) {
      const filenameInfo = getFilenameInfo(matchingFileNameParams, 'jsdoc-params');
      forEachPreferredTag(jsdoc, 'param', (tag, targetTagName) => {
        if (!tag.default || !tag.default.trim()) {
          return;
        }

        checkSource({
          cols: getDefaultCols(tag),
          source: `(${tag.default})`,
          tag,
          targetTagName,
          ...filenameInfo,
        });
      });
    }

    if (checkProperties) {
      const filenameInfo = getFilenameInfo(matchingFileNameProperties, 'jsdoc-properties');
      forEachPreferredTag(jsdoc, 'property', (tag, targetTagName) => {
        if (!tag.default || !tag.default.trim()) {
          return;
        }

        checkSource({
          cols: getDefaultCols(tag),
          source: `(${tag.default})`,
          tag,
          targetTagName,
          ...filenameInfo,
        });
      });
    }

    if (!checkExamples) {
      return textsAndFileNames;
    }

    const tagName = /** @type {string} */ (getPreferredTagName(jsdoc, {
      tagName: 'example',
    }));
    if (!hasTag(jsdoc, tagName)) {
      return textsAndFileNames;
    }

    const matchingFilenameInfo = getFilenameInfo(matchingFileName);

    forEachPreferredTag(jsdoc, 'example', (tag, targetTagName) => {
      let source = /** @type {string} */ (getTagDescription(tag));
      const match = source.match(hasCaptionRegex);

      if (captionRequired && (!match || !match[1].trim())) {
        /** @type {import('eslint').Linter.LintMessage[]} */ (
          extraMessagesByFilename.get(jsFileName)
        ).push({
          column: commentLineCols[1] + 1,
          line: 1 + commentLineCols[0] + (tag.line ?? tag.source[0].number),
          message: `@${targetTagName} error - Caption is expected for examples.`,
          ruleId: 'jsdoc/example-missing-caption',
          severity: 2,
        });
        return;
      }

      source = source.replace(hasCaptionRegex, '');
      const [
        lines,
        cols,
      ] = match ? getLinesCols(match[0]) : [
        0, 0,
      ];

      if (exampleCodeRegex && !exampleCodeRegExp.test(source) ||
        rejectExampleCodeRegex && rejectExampleCodeRegExp.test(source)
      ) {
        return;
      }

      // If `allowedLanguagesToProcess` is falsy, all languages should be processed.
      if (allowedLanguagesToProcess) {
        const matches = (/^\s*```(?<language>\S+)([\s\S]*)```\s*$/v).exec(source);
        if (matches?.groups && !allowedLanguagesToProcess.includes(
          matches.groups.language.toLowerCase(),
        )) {
          return;
        }
      }

      const sources = [];
      let skipInit = false;
      if (exampleCodeRegex) {
        let nonJSPrefacingCols = 0;
        let nonJSPrefacingLines = 0;

        let startingIndex = 0;
        let lastStringCount = 0;

        let exampleCode;
        exampleCodeRegExp.lastIndex = 0;
        while ((exampleCode = exampleCodeRegExp.exec(source)) !== null) {
          const {
            '0': n0,
            '1': n1,
            index,
          } = exampleCode;

          // Count anything preceding user regex match (can affect line numbering)
          const preMatch = source.slice(startingIndex, index);

          const [
            preMatchLines,
            colDelta,
          ] = getLinesCols(preMatch);

          let nonJSPreface;
          let nonJSPrefaceLineCount;
          if (n1) {
            const idx = n0.indexOf(n1);
            nonJSPreface = n0.slice(0, idx);
            nonJSPrefaceLineCount = countChars(nonJSPreface, '\n');
          } else {
            nonJSPreface = '';
            nonJSPrefaceLineCount = 0;
          }

          nonJSPrefacingLines += lastStringCount + preMatchLines + nonJSPrefaceLineCount;

          // Ignore `preMatch` delta if newlines here
          if (nonJSPrefaceLineCount) {
            const charsInLastLine = nonJSPreface.slice(nonJSPreface.lastIndexOf('\n') + 1).length;

            nonJSPrefacingCols += charsInLastLine;
          } else {
            nonJSPrefacingCols += colDelta + nonJSPreface.length;
          }

          const string = n1 || n0;
          sources.push({
            nonJSPrefacingCols,
            nonJSPrefacingLines,
            string,
          });
          startingIndex = exampleCodeRegExp.lastIndex;
          lastStringCount = countChars(string, '\n');
          if (!exampleCodeRegExp.global) {
            break;
          }
        }

        skipInit = true;
      }

      checkSource({
        cols,
        example: true,
        lines,
        skipInit,
        source,
        sources,
        tag,
        targetTagName,
        ...matchingFilenameInfo,
      });
    });

    return textsAndFileNames;
  };

  /**
   * @param {string} text
   * @param {{
   *   ecmaFeatures?: {jsx: boolean},
   *   sourceType?: "script"|"module"|"commonjs"
   * }} [overrides]
   * @param {JsdocProcessorOptions['parser']|null} [commentParser] `null` for espree
   * @returns {import('estree').Comment[]}
   */
  const parseComments = (text, overrides, commentParser = parser) => {
    const parserOptions = {
      comment: true,
      ecmaVersion: /** @type {const} */ ('latest'),
      sourceType,
      ...overrides,
    };
    const ast = commentParser ?
      // @ts-expect-error Should be present
      commentParser.parseForESLint(text, parserOptions).ast :
      espree.parse(text, parserOptions);
    return /** @type {import('estree').Comment[]} */ (
      /**
       * @type {import('estree').Program & {
       *   comments?: import('estree').Comment[]
       * }}
       */
      (ast).comments
    );
  };

  /**
   * Whether other script/module or JSX interpretations see different comments.
   * ESLint's host parser is not available here, so disagreement declines a fix.
   * A JSX-bearing host also needs a successful JSX parse to establish agreement.
   * @param {HostInfo} host
   * @returns {boolean}
   */
  const isAmbiguous = (host) => {
    /** @param {import('estree').Comment[]} comments */
    const signature = (comments) => {
      return comments.filter(({
        type,
      }) => {
        // Only espree reports a hashbang as a comment.
        return type === 'Block' || type === 'Line';
      }).map(({
        range,
        type,
      }) => {
        return `${type}${range}`;
      }).join(',');
    };

    if (host.ambiguous === undefined) {
      const expected = signature(host.comments);
      // JSX allows space between the `<` or `>` and the `/` of a tag.
      const jsxText = (/<\s*\/|\/\s*>/v).test(host.text);
      const otherType = sourceType === 'module' ? 'script' : 'module';
      const modes = /** @type {["script"|"module", boolean][]} */ ([
        [
          sourceType, false,
        ],
        [
          sourceType, true,
        ],
        [
          otherType, false,
        ],
        [
          otherType, true,
        ],
      ]).filter(([
        ,
        jsx,
      ]) => {
        return !jsx || jsxText;
      });
      let jsxParsed = !jsxText;
      const disagree = [
        // The first mode is how we parsed the host.
        ...modes.slice(1).map((mode) => {
          return /** @type {const} */ ([
            parser, ...mode,
          ]);
        }),
        ...(parser && modes.length > 1 ?
          modes.map(([
            type,
            jsx,
          ]) => {
            // As ESLint, allowing a top-level `return` in scripts.
            return /** @type {const} */ ([
              null, type === 'script' ? 'commonjs' : type, jsx,
            ]);
          }) :
          []),
      ].some(([
        commentParser,
        type,
        jsx,
      ]) => {
        try {
          const comments = parseComments(host.text, {
            ecmaFeatures: {
              jsx,
            },
            sourceType: type,
          }, commentParser);
          jsxParsed ||= jsx;
          return signature(comments) !== expected;
        } catch {
          return false;
        }
      });
      host.ambiguous = disagree || !jsxParsed;
    }

    return host.ambiguous;
  };

  /**
   * @param {HostInfo} host
   * @returns {RegExpExecArray[]}
   */
  const getHostLines = (host) => {
    // Existing tag line metadata counts LF; a bare CR cannot be anchored safely.
    host.lines ??= (/\r(?!\n)/v).test(host.text) ?
      [] :
      [
        ...host.text.matchAll(/([^\r\n]*)(\r\n|\r|\n|$)/gv),
      ];
    return host.lines;
  };

  /**
   * Keep a candidate only if, once applied, its tag is still one tag (the
   * comment still ending only at its end and keeping, or still lacking, a
   * line break), its code having no more lines starting with `*` than
   * before, starting and ending with as many blank lines as before,
   * which re-extracts to its sources unchanged except this one,
   * which must change exactly as the virtual fix changed it (line breaks
   * aside, as added lines take the host's own). Only the tag is reparsed:
   * the lines before it are unchanged and it starts unfenced, and a tag
   * placed after it must still start a tag, so the other tags parse as
   * before. The kept fix replaces the whole tag, so ESLint never applies it
   * in the same pass as another fix in that tag, while fixes in other tags
   * can share the pass.
   * @param {import('eslint').Rule.Fix} candidate
   * @param {import('eslint').Rule.Fix} fix
   * @param {OtherInfo} info
   * @param {string} filename
   * @returns {import('eslint').Rule.Fix|null}
   */
  const verifyFix = (candidate, fix, info, filename) => {
    const {
      comment,
      commentLineCols,
      siblings,
      tag,
      virtualText,
    } = info;
    const {
      host,
      multiline,
      range: [
        commentStart,
        commentEnd,
      ],
    } = comment;
    const hostLines = getHostLines(host);
    const first = tag.source[0].number;
    const lastLine = /** @type {import('comment-parser').Line} */ (tag.source.at(-1));
    const last = hostLines[commentLineCols[0] + lastLine.number];
    const start = first ? hostLines[commentLineCols[0] + first].index : commentStart;
    const end = lastLine.tokens.end ? commentEnd : last.index + last[1].length;
    const tagText = host.text.slice(start, candidate.range[0]) + candidate.text +
      host.text.slice(candidate.range[1], end);
    const text = (first ? '/**\n' : '') + tagText + (lastLine.tokens.end ? '' : last[2] + ' * @_ */');
    const expected = virtualText.slice(0, fix.range[0]) + fix.text + virtualText.slice(fix.range[1]);
    /** @param {string} str */
    const lines = (str) => {
      return str.replaceAll(/\r\n|\r|\n/gv, '\n');
    };

    /**
     * Babel decides on Flow syntax from the first `@flow` or `@noflow`.
     * @param {string} str
     */
    const pragmas = (str) => {
      return String(str.match(/@(?:no)?flow\b/gv));
    };

    /**
     * Host rules such as `jsdoc/no-multi-asterisks` and
     * `jsdoc/require-asterisk-prefix` take a `*` starting a comment line
     * for part of its gutter.
     * @param {string} str
     */
    const starLines = (str) => {
      return str.split(/\r\n|\r|\n/v).filter((line) => {
        return (/^\s*\*/v).test(line);
      }).length;
    };

    /** @param {string} str */
    const blankLines = (str) => {
      return str.split(/\r\n|\r|\n/v).filter((line) => {
        return !line.trim();
      }).length;
    };

    const gutterless = tag.source.slice(1).some(({
      tokens,
    }) => {
      return tokens.description.trim() && tokens.delimiter !== '*';
    });

    if (gutterless && blankLines(expected) > blankLines(virtualText)) {
      return null;
    }

    if (lines(expected) === lines(virtualText) ||
      starLines(expected) > starLines(virtualText) ||
      pragmas(tagText) !== pragmas(host.text.slice(start, end)) ||
      text.indexOf('*/') !== text.length - 2 || hostLineBreak.test(text) !== multiline) {
      return null;
    }

    // The tag must start on its first line and, unless it is the last tag,
    //   be followed by the closing `@_` line as a tag of its own.
    const tagStarts = [
      first ? 1 : 0,
    ];
    if (!lastLine.tokens.end) {
      tagStarts.push(countChars(text, '\n'));
    }

    const jsdoc = parseComment(text);
    if (String(jsdoc.tags.map(({
      source,
    }) => {
      return source[0].number;
    })) !== String(tagStarts) || getEdgeBlankLines(jsdoc.tags[0]) !== getEdgeBlankLines(tag)) {
      return null;
    }

    const texts = getTextsAndFileNames(
      jsdoc, filename, commentLineCols, [], comment,
    ).map(({
      text: source,
    }) => {
      return source;
    });

    if (texts.length !== siblings.length || siblings.some((sibling, index) => {
      return sibling === info ?
        lines(texts[index]) !== lines(expected) :
        texts[index] !== sibling.virtualText;
    })) {
      return null;
    }

    const updated = host.text.slice(0, start) + tagText + host.text.slice(end);
    const comments = parseComments(updated);
    const delta = tagText.length - (end - start);
    if (comments.length !== host.comments.length || comments.some((next, index) => {
      const previous = host.comments[index];
      const before = /** @type {[number, number]} */ (previous.range);
      const after = /** @type {[number, number]} */ (next.range);
      return next.type !== previous.type || after[0] !== before[0] + (before[0] >= end ? delta : 0) ||
        after[1] !== before[1] + (before[1] >= end ? delta : 0);
    }) || isAmbiguous({
      comments,
      text: updated,
    })) {
      return null;
    }

    // ESLint applies fix ranges to the text without its byte order mark.
    const bom = host.text.startsWith('\uFEFF') ? 1 : 0;
    return {
      range: [
        start - bom, end - bom,
      ],
      text: tagText,
    };
  };

  // See https://eslint.org/docs/latest/extend/plugins#processors-in-plugins
  // See https://eslint.org/docs/latest/extend/custom-processors
  // From https://github.com/eslint/eslint/issues/14745#issuecomment-869457265
  /*
    {
      "files": ["*.js", "*.ts"],
      "processor": "jsdoc/example" // a pretended value here
    },
    {
      "files": [
        "*.js/*_jsdoc-example.js",
        "*.ts/*_jsdoc-example.js",
        "*.js/*_jsdoc-example.ts"
      ],
      "rules": {
        // specific rules for examples in jsdoc only here
        // And other rules for `.js` and `.ts` will also be enabled for them
      }
    }
  */
  return {
    meta: {
      name: 'eslint-plugin-jsdoc/processor',
      version,
    },
    processors: {
      examples: {
        meta: {
          name: 'eslint-plugin-jsdoc/preprocessor',
          version,
        },
        /**
         * @param {import('eslint').Linter.LintMessage[][]} messages
         * @param {string} filename
         */
        postprocess ([
          jsMessages,
          ...messages
        ], filename) {
          const otherInfo = /** @type {OtherInfo[]} */ (
            otherInfoByFilename.get(filename)
          );
          otherInfoByFilename.delete(filename);
          // ESLint still applies example fixes to a host it cannot parse.
          const hostFailed = jsMessages.some(({
            fatal,
          }) => {
            return fatal;
          });

          for (const [
            idx,
            message,
          ] of messages.entries()) {
            const info = otherInfo[idx];
            const {
              codeStartCol,
              codeStartLine,
              comment,
              commentLineCols,
              nonJSPrefacingCols,
              paddedLines,
              targetTagName,
              virtualText,
            } = info;

            for (const msg of message) {
              const {
                column,
                endColumn,
                endLine,
                fatal,
                line,
                message: messageText,
                ruleId,
                severity,
              } = msg;

              /**
               * @param {import('eslint').Rule.Fix} fix
               */
              const mapFix = (fix) => {
                try {
                  if (!fixExamples || !info.example || hostFailed || !comment.verbatim || isAmbiguous(comment.host)) {
                    return null;
                  }

                  const candidate = mapExampleFix(
                    fix, virtualText, getHostLines(comment.host), commentLineCols[0] + codeStartLine, comment.range,
                  );
                  return candidate && verifyFix(candidate, fix, info, filename);
                } catch {
                  // E.g., a fix forming an entity that does not decode.
                  return null;
                }
              };

              const mappedFix = msg.fix && mapFix(msg.fix);
              if (mappedFix) {
                msg.fix = mappedFix;
              } else {
                delete msg.fix;
              }

              const suggestions = msg.suggestions?.flatMap((suggestion) => {
                const fix = mapFix(suggestion.fix);
                return fix ? [
                  {
                    ...suggestion,
                    fix,
                  },
                ] : [];
              });
              if (suggestions?.length) {
                msg.suggestions = suggestions;
              } else {
                delete msg.suggestions;
              }

              const [
                codeCtxLine,
                codeCtxColumn,
              ] = commentLineCols;
              const startLine = codeCtxLine + codeStartLine + line;

              // Seems to need one more now
              const startCol = 1 +
                codeCtxColumn + codeStartCol + (
              // This might not work for line 0, but line 0 is unlikely for examples
                line <= 1 ? nonJSPrefacingCols + firstLinePrefixLength : preTagSpaceLength
              ) + (paddedLines.has(line) ? paddedIndent : 0) + column;

              msg.message = '@' + targetTagName + ' ' + (severity === 2 ? 'error' : 'warning') +
                (ruleId ? ' (' + ruleId + ')' : '') + ': ' +
                (fatal ? 'Fatal: ' : '') +
                messageText;
              msg.line = startLine;
              msg.column = startCol;
              // `startLine` already includes `line`
              msg.endLine = endLine ? startLine - line + endLine : startLine;
              // added `- column` to offset what `endColumn` already seemed to include
              msg.endColumn = endColumn ? startCol - column + endColumn : startCol;
            }
          }

          const extraMessages = /** @type {import('eslint').Linter.LintMessage[]} */ (
            extraMessagesByFilename.get(filename)
          );
          extraMessagesByFilename.delete(filename);

          return [
            ...jsMessages,
          ].concat(...messages, ...extraMessages);
        },

        /**
         * @param {string} text
         * @param {string} filename
         * @returns {(string | Linter.ProcessorFile)[]}
         */
        preprocess (text, filename) {
          try {
            /** @type {OtherInfo[]} */
            const otherInfo = [];
            otherInfoByFilename.set(filename, otherInfo);
            extraMessagesByFilename.set(filename, []);

            /** @type {HostInfo} */
            const host = {
              comments: [],
              text,
            };

            // May be running a second time so catch and ignore
            try {
              host.comments = parseComments(text);
            } catch {
              return [
                text,
              ];
            }

            /** @type {[number, number][]} */
            const commentLineCols = [];
            /** @type {CommentInfo[]} */
            const comments = [];
            const jsdocComments = host.comments.filter((comment) => {
              return (/^\*\s/v).test(comment.value);
            }).map((comment) => {
              const [
                start,
                end,
                /* c8 ignore next -- Unsupporting processors only? */
              ] = comment.range ?? [];
              const textToStart = text.slice(0, start);

              const [
                lines,
                cols,
              ] = getLinesCols(textToStart);

              // const lines = [...textToStart.matchAll(/\n/gv)].length
              // const lastLinePos = textToStart.lastIndexOf('\n');
              // const cols = lastLinePos === -1
              //   ? 0
              //   : textToStart.slice(lastLinePos).length;
              commentLineCols.push([
                lines, cols,
              ]);
              comments.push({
                host,
                multiline: hostLineBreak.test(comment.value),
                range: /** @type {[number, number]} */ (comment.range),
                verbatim: text.slice(start, end) === `/*${comment.value}*/`,
              });
              return parseComment(comment);
            });

            return [
              text,
              ...jsdocComments.flatMap((jsdoc, idx) => {
                return getTextsAndFileNames(
                  jsdoc,
                  filename,
                  commentLineCols[idx],
                  otherInfo,
                  comments[idx],
                );
              }).filter(
                /**
                 * @param {TextAndFileName} file
                 * @returns {file is Linter.ProcessorFile}
                 */
                (file) => {
                  return file !== null && file !== undefined;
                },
              ),
            ];
          /* c8 ignore next 6 */
          } catch (error) {
            // eslint-disable-next-line no-console -- Debugging
            console.log('err', filename, error);
          }

          return [];
        },
        supportsAutofix: true,
      },
    },
  };
};
