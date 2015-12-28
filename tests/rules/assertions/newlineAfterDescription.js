export default {
    valid: [
        {
            code: `
                /**
                 * Foo.
                 */
                function quux () {

                }
            `,
            options: [
                'always'
            ]
        },
        {
            code: `
                /**
                 * Bar.
                 */
                function quux () {

                }
            `,
            options: [
                'never'
            ]
        },
        {
            code: `
                /**
                 * Foo.
                 *
                 * @foo
                 */
                function quux () {

                }
            `,
            options: [
                'always'
            ]
        },
        {
            code: `
                /**
                 * Bar.
                 * @bar
                 */
                function quux () {

                }
            `,
            options: [
                'never'
            ]
        }
    ],
    invalid: [
        {
            code: `
                /**
                 * Foo.
                 *
                 * Foo.
                 * @foo
                 */
                function quux () {

                }
            `,
            options: [
                'always'
            ],
            errors: [
                {
                    message: 'There must be a newline after the description of the JSDoc block.'
                }
            ]
        },
        {
            code: `
                /**
                 * Bar.
                 *
                 * Bar.
                 *
                 * @bar
                 */
                function quux () {

                }
            `,
            options: [
                'never'
            ],
            errors: [
                {
                    message: 'There must be no newline after the description of the JSDoc block.'
                }
            ]
        }
    ]
};
