import {
    RuleTester
} from 'eslint';

import {
    rules
} from './../../src/';

let ruleTester;

ruleTester = new RuleTester();

ruleTester.run('require-returns-description', rules['require-returns-description'], {
    valid: [
        {
            code: `
                /**
                 * @returns {string} Quux.
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
                 * @returns {string}
                 */
                function quux () {

                }
            `,
            errors: [
                {
                    message: '@returns must have a description.'
                }
            ]
        }
    ]
});
