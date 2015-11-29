import {
    RuleTester
} from 'eslint';

import {
    rules
} from './../../src/';

let ruleTester;

ruleTester = new RuleTester();

ruleTester.run('require-param-description', rules['require-param-description'], {
    valid: [
        {
            code: `
                /**
                 * @returns {boolean} Method result.
                 */
                function quux () {
                    return false;
                }
            `
        },
        {
            code: `
                /**
                 * @returns {string} method result
                 */
                function quux () {
                    return 'corge';
                }
            `
        }
    ],
    invalid: [
        {
            code: `
                /**
                 * @param {string} foo
                 */
                function quux (foo) {

                }
            `,
            errors: [
                {
                    message: 'Missing param description',
                    line: 3,
                    column: 38
                }
            ]
        }
    ]
});
