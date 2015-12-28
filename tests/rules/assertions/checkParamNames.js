export default {
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
                 * @param foo
                 */
                function quux (foo) {

                }
            `
        },
        {
            code: `
                /**
                 * @param foo
                 * @param bar
                 */
                function quux (foo, bar) {

                }
            `
        },
        {
            code: `
                /**
                 * @param foo
                 * @param bar
                 */
                function quux (foo, bar, baz) {

                }
            `
        },
        {
            code: `
                /**
                 * @param foo
                 * @param foo.foo
                 * @param bar
                 */
                function quux (foo, bar) {

                }
            `
        }
    ],
    invalid: [
        {
            code: `
                /**
                 * @param foo
                 * @param bar
                 */
                function quux (bar, foo) {

                }
            `,
            errors: [
                {
                    message: 'Expected JSDoc @param names to be "bar, foo". Got "foo, bar".'
                }
            ]
        },
        {
            code: `
                /**
                 * @param foo
                 * @param bar
                 */
                function quux (foo) {

                }
            `,
            errors: [
                {
                    message: 'Redundant JSDoc @param "bar".'
                }
            ]
        }
    ]
};
