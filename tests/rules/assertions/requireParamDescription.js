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
                    message: 'Missing JSDoc @param "foo" description.'
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
                 * @param foo Foo.
                 */
                function quux (foo) {

                }
            `
        }
    ]
};
