import {
    RuleTester
} from 'eslint';

import {
    rules
} from './../../src/';

let ruleTester;

ruleTester = new RuleTester();

ruleTester.run('check-returns-types', rules['check-returns-types'], {
    valid: [
        {
            code: `
            /**
             * @returns {string}
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
                 * @returns {string}
                 */
                function quux () {
                    return true;
                }
            `,
            errors: [
                {
                    message: 'Wrong returns value'
                }
            ]
        }
    ]
});
