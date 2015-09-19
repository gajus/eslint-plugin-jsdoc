import {
    RuleTester
} from 'eslint';

import {
    rules
} from './../../src/';

let ruleTester;

ruleTester = new RuleTester();

ruleTester.run('check-redundant-params', rules['check-redundant-params'], {
    valid: [
        {
            code: `
            /**
             * @param {String} arg
             */
            function fn (arg) {}
            `
        }
    ],
    invalid: [
        {
            code: `
                /**
                 * @param {String} arg
                 */
                function fn () {}
            `,
            errors: [
                {
                    message: 'Found redundant param "arg" statement'
                }
            ]
        }
    ]
});
