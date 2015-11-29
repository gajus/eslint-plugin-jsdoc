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
                 * @param foo
                 */
                function quux () {

                }
            `,
            errors: [
                {
                    message: 'Missing param type'
                }
            ]
        }
    ]
});
