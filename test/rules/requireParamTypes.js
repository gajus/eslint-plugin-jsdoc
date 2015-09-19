import {
    RuleTester
} from 'eslint';

import {
    rules
} from './../../src/';

let ruleTester;

ruleTester = new RuleTester();

ruleTester.run('require-param-types', rules['require-param-types'], {
    valid: [
        {
            code: `
            /**
             * @param {String} arg
             */
            function fn (arg) {}
            `
        }
    ],
    invalid: [
        {
            code: `
                /**
                 * @param arg
                 */
                function fn () {}
            `,
            errors: [
                {
                    message: 'Missing param type'
                }
            ]
        }
    ]
});
