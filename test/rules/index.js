import _ from 'lodash';
import {
  RuleTester
} from 'eslint';
import config from '../../src';

const ruleTester = new RuleTester();

[
  'check-alignment',
  'check-examples',
  'check-indentation',
  'check-param-names',
  'check-syntax',
  'check-tag-names',
  'check-types',
  'implements-on-classes',
  'match-description',
  'newline-after-description',
  'no-undefined-types',
  'require-description',
  'require-description-complete-sentence',
  'require-example',
  'require-hyphen-before-param-description',
  'require-jsdoc',
  'require-param',
  'require-param-description',
  'require-param-name',
  'require-param-type',
  'require-returns',
  'require-returns-check',
  'require-returns-description',
  'require-returns-type',
  'valid-types'
].forEach((ruleName) => {
  const parserOptions = {
    ecmaVersion: 6
  };

  // eslint-disable-next-line global-require, import/no-dynamic-require
  const assertions = require('./assertions/' + _.camelCase(ruleName));

  assertions.invalid = assertions.invalid.map((assertion) => {
    assertion.parserOptions = _.defaultsDeep(assertion.parserOptions, parserOptions);

    return assertion;
  });

  assertions.valid = assertions.valid.map((assertion) => {
    assertion.parserOptions = _.defaultsDeep(assertion.parserOptions, parserOptions);

    return assertion;
  });

  ruleTester.run(ruleName, config.rules[ruleName], assertions);
});
