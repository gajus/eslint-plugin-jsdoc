import {CLIEngine, Linter} from 'eslint';
import escapeRegexString from 'escape-regex-string';
import iterateJsdoc from '../iterateJsdoc';
import warnRemovedSettings from '../warnRemovedSettings';

const zeroBasedLineIndexAdjust = -1;
const likelyNestedJSDocIndentSpace = 1;
const preTagSpaceLength = 1;
const hasCaptionRegex = /^\s*<caption>.*?<\/caption>/;

const escapeStringRegexp = (str) => {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};
const countChars = (str, ch) => {
  return (str.match(new RegExp(escapeStringRegexp(ch), 'g')) || []).length;
};

export default iterateJsdoc(({
  report,
  utils,
  context
}) => {
  warnRemovedSettings(context, 'check-examples');
  const options = context.options[0] || {};
  let {
    exampleCodeRegex = null,
    rejectExampleCodeRegex = null
  } = options;
  const {
    noDefaultExampleRules = false,
    eslintrcForExamples = true,
    matchingFileName: filename = null,
    baseConfig = {},
    configFile,
    allowInlineConfig = true,
    reportUnusedDisableDirectives = true,
    captionRequired = false
  } = options;

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

    // Many variables in examples will be `undefined`
    'no-undef': 0,

    // Common to define variables for clarity without always using them
    'no-unused-vars': 0,

    // See import/no-unresolved
    'node/no-missing-import': 0,
    'node/no-missing-require': 0,

    // Can generally look nicer to pad a little even if code imposes more stringency
    'padded-blocks': 0
  };

  exampleCodeRegex = exampleCodeRegex && new RegExp(exampleCodeRegex, '');
  rejectExampleCodeRegex = rejectExampleCodeRegex && new RegExp(rejectExampleCodeRegex, '');

  utils.forEachPreferredTag('example', (tag, targetTagName) => {
    // If a space is present, we should ignore it
    const initialTag = tag.source.match(
      new RegExp(`^@${escapeRegexString(targetTagName)} ?`, 'u')
    );
    const initialTagLength = initialTag[0].length;
    const firstLinePrefixLength = preTagSpaceLength + initialTagLength;

    let source = tag.source.slice(initialTagLength);
    const match = source.match(hasCaptionRegex);

    if (captionRequired && !match) {
      report('Caption is expected for examples.', null, tag);
    }

    // If we allow newlines in hasCaptionRegex, we should add to line count
    source = source.replace(hasCaptionRegex, '');

    if (exampleCodeRegex && !exampleCodeRegex.test(source) ||
      rejectExampleCodeRegex && rejectExampleCodeRegex.test(source)
    ) {
      return;
    }

    let nonJSPrefacingLines = 0;
    let nonJSPrefacingCols = 0;

    if (exampleCodeRegex) {
      const idx = source.search(exampleCodeRegex);

      // Strip out anything preceding user regex match (can affect line numbering)
      let preMatchLines = 0;

      const preMatch = source.slice(0, idx);

      preMatchLines = countChars(preMatch, '\n');

      nonJSPrefacingLines = preMatchLines;

      const colDelta = preMatchLines ?
        preMatch.slice(preMatch.lastIndexOf('\n') + 1).length - initialTagLength :
        preMatch.length;

      // Get rid of text preceding user regex match (even if it leaves valid JS, it
      //   could cause us to count newlines twice)
      source = source.slice(idx);

      source = source.replace(exampleCodeRegex, (n0, n1) => {
        let nonJSPreface;
        let nonJSPrefaceLineCount;
        if (n1) {
          const index = n0.indexOf(n1);
          nonJSPreface = n0.slice(0, index);
          nonJSPrefaceLineCount = countChars(nonJSPreface, '\n');
        } else {
          nonJSPreface = '';
          nonJSPrefaceLineCount = 0;
        }

        nonJSPrefacingLines += nonJSPrefaceLineCount;

        // Ignore `preMatch` delta if newlines here
        if (nonJSPrefaceLineCount) {
          const charsInLastLine = nonJSPreface.slice(nonJSPreface.lastIndexOf('\n') + 1).length;

          nonJSPrefacingCols += charsInLastLine - initialTagLength;
        } else {
          nonJSPrefacingCols += colDelta + nonJSPreface.length;
        }

        return n1 || n0;
      });
    }

    // Programmatic ESLint API: https://eslint.org/docs/developer-guide/nodejs-api
    const cli = new CLIEngine({
      allowInlineConfig,
      baseConfig,
      configFile,
      reportUnusedDisableDirectives,
      rulePaths,
      rules,
      useEslintrc: eslintrcForExamples
    });

    let messages;

    if (filename) {
      const config = cli.getConfigForFile(filename);

      // We need a new instance to ensure that the rules that may only
      //  be available to `filename` (if it has its own `.eslintrc`),
      //  will be defined.
      const cliFile = new CLIEngine({
        allowInlineConfig,
        baseConfig: config,
        configFile,
        reportUnusedDisableDirectives,
        rulePaths,
        rules,
        useEslintrc: eslintrcForExamples
      });

      const linter = new Linter();

      // Force external rules to become available on `cli`
      try {
        cliFile.executeOnText('');
      } catch (error) {
        // Ignore
      }

      const linterRules = [...cliFile.getRules().entries()].reduce((obj, [key, val]) => {
        obj[key] = val;

        return obj;
      }, {});

      linter.defineRules(linterRules);

      if (config.parser) {
        // eslint-disable-next-line global-require, import/no-dynamic-require
        linter.defineParser(config.parser, require(config.parser));
      }

      // Could also support `disableFixes` and `allowInlineConfig`
      messages = linter.verify(source, config, {
        filename,
        reportUnusedDisableDirectives
      });
    } else {
      ({results: [{messages}]} =
        cli.executeOnText(source));
    }

    // NOTE: `tag.line` can be 0 if of form `/** @tag ... */`
    const codeStartLine = tag.line + nonJSPrefacingLines;
    const codeStartCol = likelyNestedJSDocIndentSpace;

    messages.forEach(({message, line, column, severity, ruleId}) => {
      const startLine = codeStartLine + line + zeroBasedLineIndexAdjust;
      const startCol = codeStartCol + (

        // This might not work for line 0, but line 0 is unlikely for examples
        line <= 1 ? nonJSPrefacingCols + firstLinePrefixLength : preTagSpaceLength
      ) + column;

      // Could perhaps make fixable
      report(
        '@' + targetTagName + ' ' + (severity === 2 ? 'error' : 'warning') +
          (ruleId ? ' (' + ruleId + ')' : '') + ': ' +
          message,
        null,
        {
          column: startCol,
          line: startLine
        }
      );
    });
  });
}, {
  meta: {
    schema: [
      {
        additionalProperties: false,
        properties: {
          allowInlineConfig: {
            default: true,
            type: 'boolean'
          },
          baseConfig: {
            type: 'object'
          },
          captionRequired: {
            default: false,
            type: 'boolean'
          },
          configFile: {
            type: 'string'
          },
          eslintrcForExamples: {
            default: true,
            type: 'boolean'
          },
          exampleCodeRegex: {
            type: 'string'
          },
          matchingFileName: {
            type: 'string'
          },
          noDefaultExampleRules: {
            default: false,
            type: 'boolean'
          },
          rejectExampleCodeRegex: {
            type: 'string'
          },
          reportUnusedDisableDirectives: {
            default: true,
            type: 'boolean'
          }
        },
        type: 'object'
      }
    ],
    type: 'suggestion'
  },
  returns: [
    'ArrowFunctionExpression',
    'ClassDeclaration',
    'FunctionDeclaration',
    'FunctionExpression'
  ]
});
