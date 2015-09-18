import {
    RuleTester
} from 'eslint';

import {
    rules
} from './../src/';

let ruleTester;

ruleTester = new RuleTester();

ruleTester.run('require-return-description', rules['require-return-description'], {
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
                    return 'Foo.';
                }
            `
        }
    ],
    invalid: [
        {
            code: `
                /**
                 * @returns {Boolean}
                 */
                function fn () {
                    return false;
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
