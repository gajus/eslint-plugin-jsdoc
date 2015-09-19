import {
    RuleTester
} from 'eslint';

import {
    rules
} from './../../src/';

let ruleTester;

ruleTester = new RuleTester();

ruleTester.run('newline-after-description', rules['newline-after-description'], {
    valid: [
        {
            code: `
                /**
                 * @param {String} foo
                 */
                function quux (foo) {

                }
            `,
            options: [
                'never'
            ]
        },
        {
            code: `
                /**
                 * Description
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
                 * Description
                 * @param {String} foo
                 */
                function quux (foo) {

                }
            `,
            options: [
                'never'
            ]
        },
        {
            code: `
            /**
             * @param {String} foo
             */
            function quux (foo) {

            }
            `,
            options: [
                'always'
            ]
        },
        {
            code: `
            /**
             * Description
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
             * Description
             *
             * @param {String} foo
             */
            function quux (foo) {

            }
            `,
            options: [
                'always'
            ]
        }
    ],
    invalid: [
        {
            code: `
                /**
                 * Description
                 *
                 * @param {String} foo
                 */
                function quux (foo) {

                }
            `,
            options: [
                'never'
            ],
            errors: [
                {
                    message: 'Newline required after description'
                }
            ]
        },
        {
            code: `
                /**
                 * Description
                 * @param {String} foo
                 */
                function quux (foo) {

                }
            `,
            options: [
                'always'
            ],
            errors: [
                {
                    message: 'Newline required after description'
                }
            ]
        }
    ]
});
