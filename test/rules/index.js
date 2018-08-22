import _ from 'lodash';
import {
  RuleTester
} from 'eslint';
import config from '../../src';

const ruleTester = new RuleTester();

_.forEach([
  'check-param-names',
  'check-tag-names',
  'check-types',
  'newline-after-description',
  'no-undefined-types',
  'require-description-complete-sentence',
  'require-example',
  'require-hyphen-before-param-description',
  'require-param',
  'require-param-description',
  'require-param-name',
  'require-param-type',
  'require-returns-description',
  'require-returns-type',
  'valid-types'
], (ruleName) => {
  const parserOptions = {
    ecmaVersion: 6
  };

  // eslint-disable-next-line global-require, import/no-dynamic-require
  const assertions = require(`./assertions/${_.camelCase(ruleName)}`);

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
