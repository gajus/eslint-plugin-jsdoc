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
        },
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
                    message: 'Missing JSDoc @return description.'
                }
            ],
            settings: {
                jsdoc: {
                    tagNamePreference: {
                        returns: 'return'
                    }
                }
            }
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
