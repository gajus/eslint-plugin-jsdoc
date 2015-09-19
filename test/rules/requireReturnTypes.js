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
                 * @returns {String}
                 */
                function fn () {}
            `
        },
        {
            code: `
                /**
                 * no @return
                 */
                function fn () {}
            `
        }
    ],
    invalid: [
        {
            code: `
                /**
                 * @returns
                 */
                function fn () {}
            `,
            errors: [
                {
                    message: 'Missing type in @returns statement'
                }
            ]
        }
    ]
});
