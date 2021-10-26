import {
  ESLint, RuleTester,
} from 'eslint';
import _ from 'lodash';
import semver from 'semver';
import config from '../../src';
import ruleNames from './ruleNames.json';

const ruleTester = new RuleTester();

const main = async () => {
  for (const ruleName of process.env.npm_config_rule ? process.env.npm_config_rule.split(',') : ruleNames) {
    if (semver.gte(ESLint.version, '8.0.0') && ruleName === 'check-examples') {
      // This rule cannot yet be supported for ESLint 8;
      // The possibility for ESLint 8 support is being tracked at https://github.com/eslint/eslint/issues/14745
      return;
    }

    const rule = config.rules[ruleName];

    const parserOptions = {
      ecmaVersion: 6,
    };

    const assertions = (await import(`./assertions/${_.camelCase(ruleName)}`)).default;

    if (!_.has(rule, 'meta.schema') && (
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
      assertion.parserOptions = _.defaultsDeep(assertion.parserOptions, parserOptions);
      for (const error of assertion.errors) {
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
      if (assertion.errors) {
        throw new Error(`Valid assertions for rule ${ruleName} should not have an \`errors\` array.`);
      }
      if (assertion.output) {
        throw new Error(`Valid assertions for rule ${ruleName} should not have an \`output\` property.`);
      }
      assertion.parserOptions = _.defaultsDeep(assertion.parserOptions, parserOptions);

      return assertion;
    });

    if (process.env.npm_config_invalid) {
      const indexes = process.env.npm_config_invalid.split(',');
      assertions.invalid = assertions.invalid.filter((_assertion, idx) => {
        return indexes.includes(String(idx)) ||
          indexes.includes(String(idx - assertions.invalid.length));
      });
      if (!process.env.npm_config_valid) {
        assertions.valid = [];
      }
    }
    if (process.env.npm_config_valid) {
      const indexes = process.env.npm_config_valid.split(',');
      assertions.valid = assertions.valid.filter((_assertion, idx) => {
        return indexes.includes(String(idx)) ||
          indexes.includes(String(idx - assertions.valid.length));
      });
      if (!process.env.npm_config_invalid) {
        assertions.invalid = [];
      }
    }

    ruleTester.run(ruleName, rule, assertions);
  }
};

main();
