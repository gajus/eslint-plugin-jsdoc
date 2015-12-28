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
                 * @param Foo
                 */
                function quux (foo) {

                }
            `,
            errors: [
                {
                    message: 'Expected @param names to be "foo". Got "Foo".'
                }
            ]
        },
        {
            code: `
                /**
                 * @param Foo.Bar
                 */
                function quux (foo) {

                }
            `,
            errors: [
                {
                    message: '@param path declaration ("Foo.Bar") appears before any real parameter.'
                }
            ]
        },
        {
            code: `
                /**
                 * @param foo
                 * @param Foo.Bar
                 */
                function quux (foo) {

                }
            `,
            errors: [
                {
                    message: '@param path declaration ("Foo.Bar") root node name ("Foo") does not match previous real parameter name ("foo").'
                }
            ]
        },
        {
            code: `
                /**
                 * @param foo
                 * @param foo.bar
                 * @param bar
                 */
                function quux (bar, foo) {

                }
            `,
            errors: [
                {
                    message: 'Expected @param names to be "bar, foo". Got "foo, bar".'
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
                    message: '@param "bar" does not match an existing function parameter.'
                }
            ]
        }
    ]
};
