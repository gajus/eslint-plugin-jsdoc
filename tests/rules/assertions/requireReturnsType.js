/* eslint-disable no-restricted-syntax */

export default {
    invalid: [
        {
            code: `
                /**
                 * @returns
                 */
                function quux () {

                }
            `,
            errors: [
                {
                    message: 'Missing JSDoc @returns type.'
                }
            ]
        },
        {
            code: `
                /**
                 * @returns Foo.
                 */
                function quux () {

                }
            `,
            errors: [
                {
                    message: 'Missing JSDoc @returns type.'
                }
            ]
        }
    ],
    valid: [
        {
            code: `
                /**
                 * @returns {number}
                 */
                function quux () {

                }
            `
        }
    ]
};
