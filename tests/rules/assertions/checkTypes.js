/* eslint-disable no-restricted-syntax */

export default {
    invalid: [
        {
            code: `
                /**
                 * @param {Number} foo
                 */
                function quux (foo) {

                }
            `,
            errors: [
                {
                    message: 'Invalid JSDoc @param "foo" type "Number".'
                }
            ]
        }
    ],
    valid: [
        {
            code: `
                /**
                 * @param {number} foo
                 * @param {Bar} bar
                 * @param {*} baz
                 */
                function quux (foo, bar, baz) {

                }
            `
        }
    ]
};
