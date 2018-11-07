import _ from 'lodash';
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
  jsdoc,
  report,
  utils
}) => {
  let exampleCodeRegex = utils.getExampleCodeRegex();
  let rejectExampleCodeRegex = utils.getRejectExampleCodeRegex();
  const noDefaultExampleRules = utils.hasNoDefaultExampleRules();
  const eslintrcForExamples = utils.useEslintrcForExamples();
  const filename = utils.getMatchingFileName();
  const baseConfig = utils.getBaseConfig();
  const configFile = utils.getConfigFile();

  // const {line: commentStartLine, column: commentStartCol} = jsdocNode.loc.start;

  // Make these configurable?
  const reportUnusedDisableDirectives = true;
  const allowInlineConfig = true;
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

  _.forEach(jsdoc.tags, (tag) => { // eslint-disable-line complexity
    if (tag.tag !== 'example') {
      return;
    }

    // If a space is present, we should ignore it
    const initialTag = tag.source.match(/^@example ?/);
    const initialTagLength = initialTag[0].length;
    const firstLinePrefixLength = preTagSpaceLength + initialTagLength;

    let source = tag.source.slice(initialTagLength);
    const match = source.match(hasCaptionRegex);

    if (utils.isCaptionRequired() && !match) {
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
      // console.log('exampleCodeRegex', JSON.stringify(exampleCodeRegex.source));
      const idx = source.search(exampleCodeRegex);

      // Strip out anything preceding user regex match (can affect line numbering)
      let preMatchLines = 0;

      console.assert(idx !== -1, 'Index should be found'); // eslint-disable-line no-console

      const preMatch = source.slice(0, idx);

      preMatchLines = countChars(preMatch, '\n');

      // console.log('preMatch', preMatchLines, JSON.stringify(preMatch));

      nonJSPrefacingLines = preMatchLines;

      const colDelta = preMatchLines ?
        preMatch.slice(preMatch.lastIndexOf('\n') + 1).length - initialTagLength :
        preMatch.length;

      // Get rid of text preceding user regex match (even if it leaves valid JS, it
      //   could cause us to count newlines twice)
      source = source.slice(idx);

      /*
      const oldSource = source;
      const beginIndex = oldSource.indexOf(source);
      const nonJSPreface = oldSource.slice(0, beginIndex);

      nonJSPrefacingLines = countChars(nonJSPreface, '\n');

      // console.log('exampleCodeRegex', exampleCodeRegex);
      console.log('nonJSPrefacingLines', nonJSPrefacingLines, JSON.stringify(nonJSPreface));

      if (nonJSPrefacingLines) {
        // console.log('aaaa', nonJSPreface.slice(nonJSPreface.lastIndexOf('\n') + 1));
        nonJSPrefacingCols = nonJSPreface.slice(nonJSPreface.lastIndexOf('\n') + 1).length;
      } else {
        // console.log('bbbb', nonJSPreface.length);
        nonJSPrefacingCols = nonJSPreface.length;
      }
      */

      source = source.replace(exampleCodeRegex, (n0, n1) => {
        if (!n1) {
          return n0;
        }
        const index = n0.indexOf(n1);

        const nonJSPreface = n0.slice(0, index);

        /*
        console.log('i', index);
        console.log('n0', JSON.stringify(n0));
        console.log('n1', JSON.stringify(n1));
        console.log('sliced n0', JSON.stringify(nonJSPreface));

        console.log('count', countChars(nonJSPreface, '\n'));
        */
        const nonJSPrefaceLineCount = countChars(nonJSPreface, '\n');

        nonJSPrefacingLines += nonJSPrefaceLineCount;

        // Ignore `preMatch` delta if newlines here
        if (nonJSPrefaceLineCount) {
          const charsInLastLine = nonJSPreface.slice(nonJSPreface.lastIndexOf('\n') + 1).length;

          // console.log('charsInLastLine - initialTagLength', charsInLastLine, initialTagLength);
          nonJSPrefacingCols += charsInLastLine - initialTagLength;
        } else {
          // console.log('nonJSPreface', JSON.stringify(nonJSPreface));
          // console.log('colDelta + nonJSPreface.length', colDelta, nonJSPreface.length);
          nonJSPrefacingCols += colDelta + nonJSPreface.length;
        }

        return n1;
      });

      // console.log('sss', idx, beginIndex, JSON.stringify(oldSource), JSON.stringify(source));
    }

    // console.log('source', JSON.stringify(source));

    // Programmatic ESLint API: https://eslint.org/docs/developer-guide/nodejs-api
    const cli = new CLIEngine({
      allowInlineConfig,
      baseConfig,
      configFile,
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
        return obj; // eslint-disable-line newline-before-return
      }, {});

      linter.defineRules(linterRules);

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
      // console.log('end: ', endLine, endCol);
      const startLine = codeStartLine + line + zeroBasedLineIndexAdjust;
      const startCol = codeStartCol + (

        // This might not work for line 0, but line 0 is unlikely for examples
        line <= 1 ? nonJSPrefacingCols + firstLinePrefixLength : preTagSpaceLength
      ) + column;

      /*
        'line... in doc: ', commentStartLine, '; within tag block: ' + tag.line +
        ' ; in comment: ', line, '; nonJSprefacing: ' + nonJSPrefacingLines +
        '; computed: ', startLine
      );
      */

      /**
      // const {line: commentEndLine, column: commentEndCol} = jsdocNode.loc.end;
      // console.log(JSON.stringify(jsdocNode.value));
      const linter = new Linter();
      const msgs = linter.verify("var foo;", {
        rules: {
          semi: [2, "always"]
        }
      });
      console.log('msgs', msgs);
      console.log(
        'line... in doc: ', commentStartLine, '; within tag block: ' + tag.line +
        ' ; in comment: ', line, '; computed: ', startLine);
      console.log(
        'col... in doc: ', codeStartCol, '; in comment: ', column,
        line, line <= 1 ? firstLinePrefixLength : preTagSpaceLength,
        '; computed: ', startCol,
        JSON.stringify(source.slice(0, 10))
      );
      //*/

      // Note: Could perhaps make fixable
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
});
