/* eslint-disable no-restricted-syntax */

export default {
    invalid: [
        {
            code: `
                /**
                 * @Param
                 */
                function quux () {

                }
            `,
            errors: [
                {
                    message: 'Invalid JSDoc tag name "Param".'
                }
            ]
        },
        {
            code: `
                /**
                 * @foo
                 */
                function quux () {

                }
            `,
            errors: [
                {
                    message: 'Invalid JSDoc tag name "foo".'
                }
            ]
        }
    ],
    valid: [
        {
            code: `
                /**
                 * @param foo
                 */
                function quux (foo) {

                }
            `
        },
        {
            code: `
                /**
                 * @return {void}
                 */
                function quux () {

                }
            `
        },
        {
            code: `
                /**
                 * @method quux
                 */
                function quux () {

                }
            `
        },
        {
            code: `
                /**
                 * @func quux
                 */
                function quux () {

                }
            `
        }
    ]
};
