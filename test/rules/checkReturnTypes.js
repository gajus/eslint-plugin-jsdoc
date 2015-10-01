import {
    RuleTester
} from 'eslint';

import {
    rules
} from './../../src/';

let ruleTester;

ruleTester = new RuleTester();

ruleTester.run('check-return-types', rules['check-return-types'], {
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
