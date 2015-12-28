export default {
    valid: [
        {
            // Does not report lists.
            code: `
                /**
                 * - foo
                 * - bar
                 * - baz
                 */
                function quux () {

                }
            `
        }
    ],
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
                    message: 'Missing JSDoc @returns type.'
                }
            ]
        },
        {
            code: `
                /**
                 * @returns Foo.
                 */
                function quux (foo) {

                }
            `,
            errors: [
                {
                    message: 'Missing JSDoc @returns type.'
                }
            ]
        }
    ]
};
