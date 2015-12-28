/* eslint-disable no-restricted-syntax */

export default {
    invalid: [
        {
            code: `
                /**
                 * @param foo
                 */
                function quux (foo) {

                }
            `,
            errors: [
                {
                    message: 'Missing JSDoc @param "foo" type.'
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
                function quux (foo) {

                }
            `
        },
        {
            code: `
                /**
                 * @param {number} foo
                 */
                function quux (foo) {

                }
            `
        }
    ]
};
