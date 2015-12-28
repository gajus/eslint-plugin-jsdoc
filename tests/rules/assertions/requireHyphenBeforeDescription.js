export default {
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
    ],
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
    ]
};
