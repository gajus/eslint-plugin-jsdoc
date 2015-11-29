import {
    RuleTester
} from 'eslint';

import {
    rules
} from './../../src/';

let ruleTester;

ruleTester = new RuleTester();

ruleTester.run('require-returns-types', rules['require-returns-types'], {
    valid: [
        {
            code: `
                /**
                 * @returns {string}
                 */
                function quux () {

                }
            `
        },
        {
            code: `
                /**
                 * no @returns
                 */
                function quux () {

                }
            `
        }
    ],
    invalid: [
        {
            code: `
                /**
                 * @returns
                 */
                function quux () {

                }
            `,
            errors: [
                {
                    message: 'Missing type in @returns statement'
                }
            ]
        }
    ]
});
