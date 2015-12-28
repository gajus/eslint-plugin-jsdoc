/* eslint-disable no-restricted-syntax */

export default {
    invalid: [
        {
            code: `
                /**
                 * @returns
                 */
                function quux (foo) {

                }
            `,
            errors: [
                {
                    message: 'Missing JSDoc @returns description.'
                }
            ]
        }
    ],
    valid: [
        {
            code: `
                /**
                 *
                 */
                function quux () {

                }
            `
        },
        {
            code: `
                /**
                 * @returns Foo.
                 */
                function quux () {

                }
            `
        }
    ]
};
