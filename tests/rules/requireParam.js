import {
    RuleTester
} from 'eslint';

import {
    rules
} from './../../src/';

let ruleTester;

ruleTester = new RuleTester();

ruleTester.run('require-param', rules['require-param'], {
    valid: [
        {
            code: `
                /**
                 * @param {string} foo
                 */
                function quux (foo) {

                }
            `
        }
    ],
    invalid: [
        {
            code: `
                /**
                 *
                 */
                function quux (foo) {

                }
            `,
            errors: [
                {
                    message: 'Function is missing documentation for parameter `foo`.'
                }
            ]
        }
    ]
});
