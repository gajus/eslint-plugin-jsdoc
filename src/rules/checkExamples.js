// Todo: When peerDeps bump to ESLint 7, see about replacing `CLIEngine`
//  with non-deprecated `ESLint` class:
// https://github.com/eslint/eslint/blob/master/docs/user-guide/migrating-to-7.0.0.md#-the-cliengine-class-has-been-deprecated
import {
  CLIEngine,
} from 'eslint';
import iterateJsdoc from '../iterateJsdoc';

const zeroBasedLineIndexAdjust = -1;
const likelyNestedJSDocIndentSpace = 1;
const preTagSpaceLength = 1;

// If a space is present, we should ignore it
const firstLinePrefixLength = preTagSpaceLength;

const hasCaptionRegex = /^\s*<caption>(.*?)<\/caption>/u;

const escapeStringRegexp = (str) => {
  return str.replace(/[.*+?^${}()|[\]\\]/gu, '\\$&');
};
const countChars = (str, ch) => {
  return (str.match(new RegExp(escapeStringRegexp(ch), 'gu')) || []).length;
};

const getRegexFromString = (regexString) => {
  const match = regexString.match(/^\/(.*)\/([gimyus]*)$/u);
  let flags = 'u';
  let regex = regexString;
  if (match) {
    [, regex, flags] = match;
    if (!flags) {
      flags = 'u';
    }
    const uniqueFlags = [...new Set(flags)];
    flags = uniqueFlags.join('');
  }

  return new RegExp(regex, flags);
};

export default iterateJsdoc(({
  report,
  utils,
  context,
  globalState,
}) => {
  const tagName = utils.getPreferredTagName({tagName: 'example'});
  if (!utils.hasTag(tagName)) {
    return;
  }

  if (!globalState.has('checkExamples-matchingFileName')) {
    globalState.set('checkExamples-matchingFileName', new Map());
  }
  const matchingFileNameMap = globalState.get('checkExamples-matchingFileName');

  const options = context.options[0] || {};
  let {
    exampleCodeRegex = null,
    rejectExampleCodeRegex = null,
  } = options;
  const {
    noDefaultExampleRules = false,
    checkEslintrc = true,
    matchingFileName: filename = null,
    paddedIndent = 0,
    baseConfig = {},
    configFile,
    allowInlineConfig = true,
    reportUnusedDisableDirectives = true,
    captionRequired = false,
  } = options;

  let defaultFileName;
  if (!filename) {
    const jsFileName = context.getFilename();
    if (typeof jsFileName === 'string' && jsFileName.includes('.')) {
      defaultFileName = jsFileName.replace(/\..*?$/, '.md');
    } else {
      defaultFileName = 'dummy.md';
    }
  }

  // Make this configurable?
  const rulePaths = [];

  const rules = noDefaultExampleRules ? undefined : {
    // "always" newline rule at end unlikely in sample code
    'eol-last': 0,

    // Wouldn't generally expect example paths to resolve relative to JS file
    'import/no-unresolved': 0,

    // Snippets likely too short to always include import/export info
    'import/unambiguous': 0,

    // Unlikely to have inadvertent debugging within examples
    'no-console': 0,

    // Often wish to start `@example` code after newline; also may use
    //   empty lines for spacing
    'no-multiple-empty-lines': 0,

    // Many variables in examples will be `undefined`
    'no-undef': 0,

    // Common to define variables for clarity without always using them
    'no-unused-vars': 0,

    // See import/no-unresolved
    'node/no-missing-import': 0,
    'node/no-missing-require': 0,

    // Can generally look nicer to pad a little even if code imposes more stringency
    'padded-blocks': 0,
  };

  if (exampleCodeRegex) {
    exampleCodeRegex = getRegexFromString(exampleCodeRegex);
  }
  if (rejectExampleCodeRegex) {
    rejectExampleCodeRegex = getRegexFromString(rejectExampleCodeRegex);
  }

  utils.forEachPreferredTag('example', (tag, targetTagName) => {
    let source = tag.description;
    const match = source.match(hasCaptionRegex);

    if (captionRequired && (!match || !match[1].trim())) {
      report('Caption is expected for examples.', null, tag);
    }

    // If we allow newlines in hasCaptionRegex, we should add to line count
    source = source.replace(hasCaptionRegex, '');

    if (exampleCodeRegex && !exampleCodeRegex.test(source) ||
      rejectExampleCodeRegex && rejectExampleCodeRegex.test(source)
    ) {
      return;
    }

    const sources = [];
    if (exampleCodeRegex) {
      let nonJSPrefacingCols = 0;
      let nonJSPrefacingLines = 0;

      let startingIndex = 0;
      let lastStringCount = 0;

      let exampleCode;
      exampleCodeRegex.lastIndex = 0;
      while ((exampleCode = exampleCodeRegex.exec(source)) !== null) {
        const {index, 0: n0, 1: n1} = exampleCode;

        // Count anything preceding user regex match (can affect line numbering)
        const preMatch = source.slice(startingIndex, index);

        const preMatchLines = countChars(preMatch, '\n');

        const colDelta = preMatchLines ?
          preMatch.slice(preMatch.lastIndexOf('\n') + 1).length :
          preMatch.length;

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
        startingIndex = exampleCodeRegex.lastIndex;
        lastStringCount = countChars(string, '\n');
        if (!exampleCodeRegex.global) {
          break;
        }
      }
    } else {
      sources.push({
        nonJSPrefacingCols: 0,
        nonJSPrefacingLines: 0,
        string: source,
      });
    }

    // Todo: Make fixable
    // Todo: Fix whitespace indent
    const checkRules = function ({
      nonJSPrefacingCols,
      nonJSPrefacingLines,
      string,
    }) {
      const cliConfig = {
        allowInlineConfig,
        baseConfig,
        configFile,
        reportUnusedDisableDirectives,
        rulePaths,
        rules,
        useEslintrc: checkEslintrc,
      };
      const cliConfigStr = JSON.stringify(cliConfig);

      const src = paddedIndent ?
        string.replace(new RegExp(`(^|\n) {${paddedIndent}}(?!$)`, 'gu'), '\n') :
        string;

      // Programmatic ESLint API: https://eslint.org/docs/developer-guide/nodejs-api
      const fileNameMapKey = filename ?
        'a' + cliConfigStr + filename :
        'b' + cliConfigStr + defaultFileName;
      const file = filename || defaultFileName;
      let cliFile;
      if (matchingFileNameMap.has(fileNameMapKey)) {
        cliFile = matchingFileNameMap.get(fileNameMapKey);
      } else {
        const cli = new CLIEngine(cliConfig);
        let config;
        if (filename || checkEslintrc) {
          config = cli.getConfigForFile(file);
        }

        // We need a new instance to ensure that the rules that may only
        //  be available to `file` (if it has its own `.eslintrc`),
        //  will be defined.
        cliFile = new CLIEngine({
          allowInlineConfig,
          baseConfig: {
            ...baseConfig,
            ...config,
          },
          configFile,
          reportUnusedDisableDirectives,
          rulePaths,
          rules,
          useEslintrc: false,
        });
        matchingFileNameMap.set(fileNameMapKey, cliFile);
      }

      const {results: [{messages}]} =
        cliFile.executeOnText(src);

      // NOTE: `tag.line` can be 0 if of form `/** @tag ... */`
      const codeStartLine = tag.line + nonJSPrefacingLines;
      const codeStartCol = likelyNestedJSDocIndentSpace;

      messages.forEach(({message, line, column, severity, ruleId}) => {
        const startLine = codeStartLine + line + zeroBasedLineIndexAdjust;
        const startCol = codeStartCol + (

          // This might not work for line 0, but line 0 is unlikely for examples
          line <= 1 ? nonJSPrefacingCols + firstLinePrefixLength : preTagSpaceLength
        ) + column;

        report(
          '@' + targetTagName + ' ' + (severity === 2 ? 'error' : 'warning') +
            (ruleId ? ' (' + ruleId + ')' : '') + ': ' +
            message,
          null,
          {
            column: startCol,
            line: startLine,
          },
        );
      });
    };

    sources.forEach(checkRules);
  });
}, {
  iterateAllJsdocs: true,
  meta: {
    docs: {
      description: 'Ensures that (JavaScript) examples within JSDoc adhere to ESLint rules.',
      url: 'https://github.com/gajus/eslint-plugin-jsdoc/blob/master/.README/rules/check-examples.md',
    },
    schema: [
      {
        additionalProperties: false,
        properties: {
          allowInlineConfig: {
            default: true,
            type: 'boolean',
          },
          baseConfig: {
            type: 'object',
          },
          captionRequired: {
            default: false,
            type: 'boolean',
          },
          checkEslintrc: {
            default: true,
            type: 'boolean',
          },
          configFile: {
            type: 'string',
          },
          exampleCodeRegex: {
            type: 'string',
          },
          matchingFileName: {
            type: 'string',
          },
          noDefaultExampleRules: {
            default: false,
            type: 'boolean',
          },
          paddedIndent: {
            default: 0,
            type: 'integer',
          },
          rejectExampleCodeRegex: {
            type: 'string',
          },
          reportUnusedDisableDirectives: {
            default: true,
            type: 'boolean',
          },
        },
        type: 'object',
      },
    ],
    type: 'suggestion',
  },
  noTrim: true,
});
