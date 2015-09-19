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
             * @returns {String}
             */
            function fn () {
                return 'yes';
            }
            `
        }
    ],
    invalid: [
        {
            code: `
                /**
                 * @returns {String}
                 */
                function fn () {

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
