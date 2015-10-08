import {
    RuleTester
} from 'eslint';

import {
    rules
} from './../../src/';

let ruleTester;

ruleTester = new RuleTester();

ruleTester.run('check-types', rules['check-types'], {
    valid: [
        {
            code: `
                /**
                 * @param {boolean} foo
                 */
                function quux (foo) {

                }
            `
        },
        {
            code: `
                /**
                 * @param {Date} foo
                 */
                function quux (foo) {

                }
            `
        },
        {
            code: `
                /**
                 * @typedef foo~bar
                 */

                /**
                 * @param {foo~bar} bar
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
                 * @param {Boolean} foo
                 */
                function quux (foo) {

                }
            `,
            errors: [
                {
                    message: 'Invalid case of type `Boolean`'
                }
            ]
        },
        {
            code: `
                /**
                 * @param {date} foo
                 */
                function quux (foo) {

                }
            `,
            errors: [
                {
                    message: 'Invalid case of type `date`'
                }
            ]
        }
    ]
});
