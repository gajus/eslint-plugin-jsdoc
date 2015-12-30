/* eslint-disable no-restricted-syntax */

export default {
    invalid: [
        {
            code: `
                /**
                 * @return
                 */
                function quux (foo) {

                }
            `,
            errors: [
                {
                    message: 'Missing JSDoc @returns description.'
                }
            ]
        },
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
                 * @return Foo.
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
