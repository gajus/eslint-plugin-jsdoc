export default {
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
                    message: 'Missing JSDoc @returns description.'
                }
            ]
        }
    ]
};
