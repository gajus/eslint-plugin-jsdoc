import {
    RuleTester
} from 'eslint';

import {
    rules
} from './../src/';

let ruleTester;

ruleTester = new RuleTester();

ruleTester.run('require-param-description', rules['require-param-description'], {
    valid: [
        {
            code: `
                /**
                 * @returns {Boolean} Method result.
                 */
                function fn () {
                    return false;
                }
            `
        },
        {
            code: `
                /**
                 * @returns {String} method result
                 */
                function fn () {
                    return 'Hello!';
                }
            `
        }
    ],
    invalid: [
        {
            code: `
                /**
                 * @param {String} arg
                 */
                function fn (arg) {}
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
