import {
    RuleTester
} from 'eslint';

import {
    rules
} from './../../src/';

let ruleTester;

ruleTester = new RuleTester();

ruleTester.run('require-description-complete-sentence', rules['require-description-complete-sentence'], {
    valid: [
        {
            code: `
                /**
                 * @param {String} arg
                 */
                function fn (arg) {}
            `
        },
        {
            code: `
                /**
                 * Description.
                 */
                function fn () {}
            `
        },
        {
            code: `
                /**
                 * (Description).
                 */
                function fn () {}
            `
        },
        {
            code: `
                /**
                 * Description.
                 *
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
                 * Description
                 * @param {String} arg
                 */
                function fn (arg) {}
            `,
            errors: [
                {
                    message: 'Sentence must end with a period.'
                }
            ]
        },
        {
            code: `
                /**
                 * description starting with a lower case letter.
                 * @param {String} arg
                 */
                function fn (arg) {}
            `,
            errors: [
                {
                    message: 'Description must start with an upper case letter.'
                }
            ]
        },
        {
            code: `
                /**
                 * Description period is offset .
                 * @param {String} arg
                 */
                function fn (arg) {}
            `,
            errors: [
                {
                    message: 'Sentence must end with a period.'
                }
            ]
        },
        {
            code: `
                /**
                 * Description!
                 * @param {String} arg
                 */
                function fn (arg) {}
            `,
            errors: [
                {
                    message: 'Sentence must end with a period.'
                }
            ]
        },
        {
            code: `
                /**
                 * Description
                 * On multiple lines.
                 *
                 * @param {String} arg
                 */
                function fn (arg) {}
            `,
            errors: [
                {
                    message: 'You started a new line with an upper case letter but previous line does not end with a period.'
                }
            ]
        }
    ]
});
