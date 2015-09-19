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
                 * @param {String} arg
                 */
                function fn (arg) {}
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
                function fn () {}
            `,
            options: [
                'never'
            ]
        },
        {
            code: `
                /**
                 * Description
                 * @param {String} arg
                 */
                function fn (arg) {}
            `,
            options: [
                'never'
            ]
        },
        {
            code: `
            /**
             * @param {String} arg
             */
            function fn (arg) {}
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
            function fn () {}
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
             * @param {String} arg
             */
            function fn (arg) {}
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
                 * @param {String} arg
                 */
                function fn (arg) {}
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
                 * @param {String} arg
                 */
                function fn (arg) {}
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
