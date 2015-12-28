/* eslint-disable no-restricted-syntax */

export default {
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
            errors: [
                {
                    message: 'There must be a newline after the description of the JSDoc block.'
                }
            ],
            options: [
                'always'
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
            errors: [
                {
                    message: 'There must be no newline after the description of the JSDoc block.'
                }
            ],
            options: [
                'never'
            ]
        }
    ],
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
    ]
};
