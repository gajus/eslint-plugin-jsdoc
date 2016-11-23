import _ from 'lodash';

import {
    RuleTester
} from 'eslint';

import {
    rules
} from './../../src/';

const ruleTester = new RuleTester();

_.forEach([
    'check-param-names',
    'check-tag-names',
    'check-types',
    'newline-after-description',
    'require-description-complete-sentence',
    'require-hyphen-before-param-description',
    'require-param',
    'require-param-description',
    'require-param-type',
    'require-returns-description',
    'require-returns-type'
], (ruleName) => {
    const parserOptions = {
        ecmaVersion: 6
    };

    /* eslint-disable global-require */
    const assertions = require('./assertions/' + _.camelCase(ruleName));
    /* eslint-enable global-require */

    assertions.invalid = _.map(assertions.invalid, (assertion) => {
        assertion.parserOptions = parserOptions;

        return assertion;
    });

    assertions.valid = _.map(assertions.valid, (assertion) => {
        assertion.parserOptions = parserOptions;

        return assertion;
    });

    ruleTester.run(ruleName, rules[ruleName], assertions);
});
