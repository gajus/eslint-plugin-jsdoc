import {
    RuleTester
} from 'eslint';

import {
    rules
} from './../../src/';

let ruleTester;

ruleTester = new RuleTester();

ruleTester.run('check-param-names', rules['check-param-names'], {
    valid: [
        {
            code: `
            /**
             * @param foo
             */
            function quux (foo) {

            }`
        },
        {
            code: `
            /**
             * @param foo
             * @param bar
             */
            function quux (foo, bar) {

            }`
        }
    ],
    invalid: [
        {
            code: `
                /**
                 * @param foo
                 * @param bar
                 */
                function quux (bar, foo) {

                }
            `,
            errors: [
                {
                    message: 'Parameters foo and bar are out of order'
                }
            ]
        },
        {
            code: `
                /**
                 * @param foo
                 */
                function quux (bar) {

                }
            `,
            errors: [
                {
                    message: 'Expected bar but got foo'
                }
            ]
        }
    ]
});
