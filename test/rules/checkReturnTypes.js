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
             * @returns {String}
             */
            function fn () {
                return 'foo';
            }
            `
        }
    ],
    invalid: [
        {
            code: `
                /**
                 * @returns {String}
                 */
                function fn () {
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
