import {
    RuleTester
} from 'eslint';

import {
    rules
} from './../../src/';

let ruleTester;

ruleTester = new RuleTester();

ruleTester.run('check-redundant-returns', rules['check-redundant-returns'], {
    valid: [
        {
            code: `
            /**
             * @returns {string}
             */
            function quux () {
                return 'bar';
            }
            `
        }
    ],
    invalid: [
        {
            code: `
                /**
                 * @returns {string}
                 */
                function quux () {

                }
            `,
            errors: [
                {
                    message: 'Redundant return statement'
                }
            ]
        }
    ]
});
