import _ from 'lodash';

import {
    RuleTester
} from 'eslint';

import {
    rules
} from './../../src/';

let ruleTester;

ruleTester = new RuleTester();

_.forEach([
    'check-param-names',
    'check-tag-names',
    'check-types',
    'newline-after-description',
    'require-description-complete-sentence',
    'require-hyphen-before-description',
    'require-param',
    'require-param-description',
    'require-param-type',
    'require-returns-description',
    'require-returns-type'
], (ruleName) => {
    let assertions,
        ecmaFeatures;

    ecmaFeatures = {
        defaultParams: true,
        destructuring: true
    };

    /* eslint-disable global-require */
    assertions = require('./assertions/' + _.camelCase(ruleName));
    /* eslint-enable global-require */

    assertions.invalid = _.map(assertions.invalid, (assertion) => {
        assertion.ecmaFeatures = ecmaFeatures;

        return assertion;
    });

    assertions.valid = _.map(assertions.valid, (assertion) => {
        assertion.ecmaFeatures = ecmaFeatures;

        return assertion;
    });

    ruleTester.run(ruleName, rules[ruleName], assertions);
});
