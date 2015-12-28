export default {
    valid: [
        {
            code: `
                /**
                 * @param {number} foo
                 */
                function quux (foo) {

                }
            `
        }
    ],
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
    ]
};
