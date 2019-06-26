import {CLIEngine, Linter} from 'eslint';
import iterateJsdoc from '../iterateJsdoc';

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
  settings
}) => {
  let {exampleCodeRegex, rejectExampleCodeRegex} = settings;
  const {
    noDefaultExampleRules,
    eslintrcForExamples,
    matchingFileName: filename,
    baseConfig,
    configFile,
    allowInlineConfig,
    reportUnusedDisableDirectives
  } = settings;

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

  utils.forEachTag('example', (tag) => {
    // If a space is present, we should ignore it
    const initialTag = tag.source.match(/^@example ?/);
    const initialTagLength = initialTag[0].length;
    const firstLinePrefixLength = preTagSpaceLength + initialTagLength;

    let source = tag.source.slice(initialTagLength);
    const match = source.match(hasCaptionRegex);

    if (settings.captionRequired && !match) {
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
      const linter = new Linter();

      const linterRules = [...cli.getRules().entries()].reduce((obj, [key, val]) => {
        obj[key] = val;

        return obj;
      }, {});

      linter.defineRules(linterRules);

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
        '@example ' + (severity === 2 ? 'error' : 'warning') +
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
    type: 'suggestion'
  },
  returns: [
    'ArrowFunctionExpression',
    'ClassDeclaration',
    'FunctionDeclaration',
    'FunctionExpression'
  ]
});
