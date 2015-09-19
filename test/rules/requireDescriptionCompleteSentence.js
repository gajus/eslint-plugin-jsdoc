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
                 * @param {String} foo
                 */
                function quux (foo) {

                }
            `
        },
        {
            code: `
                /**
                 * Description.
                 */
                function quux () {

                }
            `
        },
        {
            code: `
                /**
                 * (Description).
                 */
                function quux () {

                }
            `
        },
        {
            code: `
                /**
                 * Description.
                 *
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
                 * Description
                 * @param {String} foo
                 */
                function quux (foo) {

                }
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
                 * @param {String} foo
                 */
                function quux (foo) {

                }
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
                 * @param {String} foo
                 */
                function quux (foo) {

                }
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
                 * @param {String} foo
                 */
                function quux (foo) {

                }
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
                 * @param {String} foo
                 */
                function quux (foo) {

                }
            `,
            errors: [
                {
                    message: 'You started a new line with an upper case letter but previous line does not end with a period.'
                }
            ]
        }
    ]
});
