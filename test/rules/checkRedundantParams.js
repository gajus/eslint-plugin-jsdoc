import {
    RuleTester
} from 'eslint';

import {
    rules
} from './../../src/';

let ruleTester;

ruleTester = new RuleTester();

ruleTester.run('check-redundant-params', rules['check-redundant-params'], {
    valid: [
        {
            code: `
            /**
             * @param {String} foo
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
                 * @param {String} foo
                 */
                function quux () {

                }
            `,
            errors: [
                {
                    message: 'Found redundant param "foo" statement'
                }
            ]
        }
    ]
});
