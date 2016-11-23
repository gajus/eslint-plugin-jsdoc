/* eslint-disable no-restricted-syntax */

export default {
    invalid: [
        {
            code: `
                /**
                 * @param foo Foo.
                 */
                function quux () {

                }
            `,
            errors: [
                {
                    message: 'There must be a hyphen before @param description.'
                }
            ]
        }
    ],
    valid: [
        {
            code: `
                /**
                 * @param foo - Foo.
                 */
                function quux () {

                }
            `
        }
    ]
};
