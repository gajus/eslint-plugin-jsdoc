/* eslint-disable no-restricted-syntax */

export default {
    invalid: [
        {
            code: `
                /**
                 * @return
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
                 * @return Foo.
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
                 * @return {number}
                 */
                function quux () {

                }
            `
        },
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
