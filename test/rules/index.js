import _ from 'lodash';
import {
  RuleTester,
} from 'eslint';
import config from '../../src';

const ruleTester = new RuleTester();

// eslint-disable-next-line no-process-env
(process.env.npm_config_rule ? process.env.npm_config_rule.split(',') : [
  'check-access',
  'check-alignment',
  'check-examples',
  'check-indentation',
  'check-param-names',
  'check-property-names',
  'check-syntax',
  'check-tag-names',
  'check-types',
  'check-values',
  'empty-tags',
  'implements-on-classes',
  'match-description',
  'newline-after-description',
  'no-bad-blocks',
  'no-defaults',
  'no-types',
  'no-undefined-types',
  'require-description',
  'require-description-complete-sentence',
  'require-example',
  'require-file-overview',
  'require-hyphen-before-param-description',
  'require-jsdoc',
  'require-param',
  'require-param-description',
  'require-param-name',
  'require-param-type',
  'require-property',
  'require-property-description',
  'require-property-name',
  'require-property-type',
  'require-returns',
  'require-returns-check',
  'require-returns-description',
  'require-returns-type',
  'valid-types',
]).forEach((ruleName) => {
  const rule = config.rules[ruleName];

  const parserOptions = {
    ecmaVersion: 6,
  };

  // eslint-disable-next-line global-require, import/no-dynamic-require
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
    assertion.parserOptions = _.defaultsDeep(assertion.parserOptions, parserOptions);

    return assertion;
  });

  assertions.valid = assertions.valid.map((assertion) => {
    if (assertion.errors) {
      throw new Error(`Valid assertions for rule ${ruleName} should not have an \`errors\` array.`);
    }
    if (assertion.output) {
      throw new Error(`Valid assertions for rule ${ruleName} should not have an \`output\` property.`);
    }
    assertion.parserOptions = _.defaultsDeep(assertion.parserOptions, parserOptions);

    return assertion;
  });

  /* eslint-disable no-process-env */
  if (process.env.npm_config_invalid) {
    const indexes = process.env.npm_config_invalid.split(',');
    assertions.invalid = assertions.invalid.filter((assertion, idx) => {
      return indexes.includes(String(idx)) ||
        indexes.includes(String(idx - assertions.invalid.length));
    });
    if (!process.env.npm_config_valid) {
      assertions.valid = [];
    }
  }
  if (process.env.npm_config_valid) {
    const indexes = process.env.npm_config_valid.split(',');
    assertions.valid = assertions.valid.filter((assertion, idx) => {
      return indexes.includes(String(idx)) ||
        indexes.includes(String(idx - assertions.valid.length));
    });
    if (!process.env.npm_config_invalid) {
      assertions.invalid = [];
    }
  }
  /* eslint-enable no-process-env */

  ruleTester.run(ruleName, rule, assertions);
});
