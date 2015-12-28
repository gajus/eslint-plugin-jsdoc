export default {
    valid: [
        {
            code: `
                /**
                 * @returns {number}
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
                function quux () {

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
                function quux () {

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
