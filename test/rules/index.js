import _ from 'lodash';
import {
  RuleTester
} from 'eslint';
import config from '../../src';

const ruleTester = new RuleTester();

_.forEach([
  'check-alignment',
  'check-examples',
  'check-indentation',
  'check-param-names',
  'check-syntax',
  'check-tag-names',
  'check-types',
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
], (ruleName) => {
  const parserOptions = {
    ecmaVersion: 6
  };

  // eslint-disable-next-line global-require, import/no-dynamic-require
  const assertions = require('./assertions/' + _.camelCase(ruleName));

  assertions.invalid = _.map(assertions.invalid, (assertion) => {
    assertion.parserOptions = _.defaultsDeep(assertion.parserOptions, parserOptions);

    return assertion;
  });

  assertions.valid = _.map(assertions.valid, (assertion) => {
    assertion.parserOptions = _.defaultsDeep(assertion.parserOptions, parserOptions);

    return assertion;
  });

  ruleTester.run(ruleName, config.rules[ruleName], assertions);
});
