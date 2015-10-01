import {
    RuleTester
} from 'eslint';

import {
    rules
} from './../../src/';

let ruleTester;

ruleTester = new RuleTester();

ruleTester.run('require-return-types', rules['require-return-types'], {
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
