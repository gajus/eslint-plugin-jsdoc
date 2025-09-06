import config from '../../src/index.js';
import camelCase from 'camelcase';
import {
  ESLint,
  RuleTester,
} from 'eslint';
import {
  readFileSync,
} from 'fs';
import {
  parseArgs,
} from 'node:util';
import {
  merge,
} from 'object-deep-merge';
import {
  join,
} from 'path';
import semver from 'semver';

/**
 * @typedef {object} TestCases
 * @property {import('eslint').RuleTester.ValidTestCase[]} valid Valid test cases
 * @property {import('eslint').RuleTester.InvalidTestCase[]} invalid Invalid test cases
 */

const ruleTester = new RuleTester();

// eslint-disable-next-line complexity -- Temporary
const main = async () => {
  const ruleNames = JSON.parse(readFileSync(join(
    import.meta.dirname, './ruleNames.json',
  ), 'utf8'));

  if (!config.rules) {
    throw new Error('TypeScript guard');
  }

  /**
   * @satisfies {import('node:util').ParseArgsOptionsConfig}
   */
  const options = {
    invalid: {
      type: 'string',
    },
    rule: {
      type: 'string',
    },
    valid: {
      type: 'string',
    },
  };

  const {
    values: {
      invalid,
      rule: rules,
      valid,
    },
  } = parseArgs({
    allowPositionals: true,
    options,
  });

  for (const ruleName of rules ? rules.split(/[, ]/v) : ruleNames) {
    if (semver.gte(ESLint.version, '8.0.0') && ruleName === 'check-examples') {
      // Uses the processor instead for higher versions
      continue;
    }

    const rule = /** @type {import('eslint').Rule.RuleModule} */ (
      config.rules[ruleName]
    );

    /** @type {{ecmaVersion: import('eslint').Linter.EcmaVersion}} */
    const languageOptions = {
      ecmaVersion: 'latest',
    };

    // Catch syntax errors

    /**
     * @type {{
     *   invalid: import('eslint').RuleTester.InvalidTestCase[],
     *   valid: import('eslint').RuleTester.ValidTestCase[]
     * }}
     */
    let assertions;
    try {
      assertions = (await import(`./assertions/${camelCase(ruleName)}.js`)).default;
    } catch (error) {
      // eslint-disable-next-line no-console -- Reporting back to tester
      console.error(error);
      return;
    }

    if (!(rule.meta && 'schema' in rule.meta) && (
      assertions.invalid.some((item) => {
        return item.options;
      }) ||
        assertions.valid.some((item) => {
          return item.options;
        })
    )) {
      throw new TypeError(
        `Presence of testing options suggests that rule ${ruleName} should ` +
          'include a schema.',
      );
    }

    let count = 0;
    assertions.invalid = assertions.invalid.map((assertion) => {
      Reflect.deleteProperty(assertion, 'ignoreReadme');
      assertion.languageOptions = merge(assertion.languageOptions ?? {}, languageOptions);
      for (const error of /** @type {import('eslint').RuleTester.TestCaseError[]} */ (
        assertion.errors || []
      )) {
        if (!('line' in error)) {
          count++;
        }
      }

      return assertion;
    });
    if (count) {
      // Make an exception for now for `require-param` as it helps to find the
      //   many lines were it is missing to know which tests to check without
      //   adding false (or failing) expectations now
      if (ruleName === 'require-param') {
        // eslint-disable-next-line no-console -- CLI
        console.log(
          `Rule, \`${ruleName}\`, missing line numbers in errors: ${count}`,
        );
      } else {
        // eslint-disable-next-line no-console -- CLI
        console.error(`Rule, \`${ruleName}\`, missing line numbers in errors: ${count}`);

        return;
      }
    }

    assertions.valid = assertions.valid.map((assertion) => {
      Reflect.deleteProperty(assertion, 'ignoreReadme');
      // @ts-expect-error Bad valid format
      if (assertion.errors) {
        throw new Error(`Valid assertions for rule ${ruleName} should not have an \`errors\` array.`);
      }

      // @ts-expect-error Bad valid format
      if (assertion.output) {
        throw new Error(`Valid assertions for rule ${ruleName} should not have an \`output\` property.`);
      }

      assertion.languageOptions = merge(assertion.languageOptions ?? {}, languageOptions);

      return assertion;
    });

    if (invalid) {
      const indexes = invalid.split(/[, ]/v);
      assertions.invalid = assertions.invalid.filter((_assertion, idx) => {
        return indexes.includes(String(idx)) ||
          indexes.includes(String(idx - assertions.invalid.length));
      });
      if (!valid) {
        assertions.valid = [];
      }
    }

    if (valid) {
      const indexes = valid.split(/[, ]/v);
      assertions.valid = assertions.valid.filter((_assertion, idx) => {
        return indexes.includes(String(idx)) ||
          indexes.includes(String(idx - assertions.valid.length));
      });
      if (!invalid) {
        assertions.invalid = [];
      }
    }

    const cwd = process.cwd();
    if (ruleName === 'check-examples') {
      // Change `process.cwd()` when testing `checkEslintrc: true`
      process.chdir('test/rules/data');
    }

    ruleTester.run(ruleName, rule, assertions);

    if (ruleName === 'check-examples') {
      process.chdir(cwd);
    }
  }
};

await main();
