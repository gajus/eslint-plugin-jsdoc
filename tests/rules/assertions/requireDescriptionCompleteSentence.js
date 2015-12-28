export default {
    valid: [
        {
            code: `
                /**
                 * Foo.
                 */
                function quux () {

                }
            `
        },
        {
            code: `
                /**
                 * Foo.
                 * Bar.
                 */
                function quux () {

                }
            `
        },
        {
            code: `
                /**
                 * Foo.
                 *
                 * Bar.
                 */
                function quux () {

                }
            `
        },
        {
            code: `
                /**
                 * Foo
                 * bar.
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
                 * foo.
                 */
                function quux () {

                }
            `,
            errors: [
                {
                    message: 'Description must start with an uppercase character.'
                }
            ]
        },
        {
            code: `
                /**
                 * Foo.
                 *
                 * foo.
                 */
                function quux () {

                }
            `,
            errors: [
                {
                    message: 'Paragraph must start with an uppercase character.'
                }
            ]
        },
        {
            code: `
                /**
                 * Foo
                 */
                function quux () {

                }
            `,
            errors: [
                {
                    message: 'Sentence must end with a period.'
                }
            ]
        },
        {
            code: `
                /**
                 * Foo
                 * Bar.
                 */
                function quux () {

                }
            `,
            errors: [
                {
                    message: 'A line of text is started with an uppercase character, but preceding line does not end the sentence.'
                }
            ]
        }
    ]
};
