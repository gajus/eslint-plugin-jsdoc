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
                 * @returns {Boolean} Method result.
                 */
                function quux () {
                    return false;
                }
            `
        },
        {
            code: `
                /**
                 * @returns {String} method result
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
                 * @param {String} foo
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
