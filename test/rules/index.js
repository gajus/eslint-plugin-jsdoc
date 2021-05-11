import {
  RuleTester,
} from 'eslint';
import _ from 'lodash';
import config from '../../src';
import ruleNames from './ruleNames.json';

const ruleTester = new RuleTester();

(process.env.npm_config_rule ? process.env.npm_config_rule.split(',') : ruleNames).forEach((ruleName) => {
  const rule = config.rules[ruleName];

  const parserOptions = {
    ecmaVersion: 6,
  };

  // eslint-disable-next-line import/no-dynamic-require
  const assertions = require(`./assertions/${_.camelCase(ruleName)}`);

  if (!_.has(rule, 'meta.schema')) {
    const testHasOptions = (item) => {
      return item.options;
    };
    if (
      assertions.invalid.some(testHasOptions) ||
      assertions.valid.some(testHasOptions)
    ) {
      throw new TypeError(
        `Presence of testing options suggests that rule ${ruleName} should ` +
        'include a schema.',
      );
    }
  }

  assertions.invalid = assertions.invalid.map((assertion) => {
    Reflect.deleteProperty(assertion, 'ignoreReadme');
    assertion.parserOptions = _.defaultsDeep(assertion.parserOptions, parserOptions);

    return assertion;
  });

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
});
