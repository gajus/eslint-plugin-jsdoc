export default /** @type {import('../index.js').TestCases} */ ({
  invalid: [
    {
      code: `
      /**
       * @version
       */
      function quux (foo) {

      }
      `,
      errors: [
        {
          line: 3,
          message: 'Missing JSDoc @version value.',
        },
      ],
    },
    {
      code: `
      /**
       * @version 3.1
       */
      function quux (foo) {

      }
      `,
      errors: [
        {
          line: 3,
          message: 'Invalid JSDoc @version: "3.1".',
        },
      ],
    },
    {
      code: `
      /**
       * @kind
       */
      function quux (foo) {

      }
      `,
      errors: [
        {
          line: 3,
          message: 'Missing JSDoc @kind value.',
        },
      ],
    },
    {
      code: `
      /**
       * @kind -3
       */
      function quux (foo) {

      }
      `,
      errors: [
        {
          line: 3,
          message: 'Invalid JSDoc @kind: "-3"; must be one of: class, ' +
            'constant, event, external, file, function, member, mixin, ' +
            'module, namespace, typedef.',
        },
      ],
    },
    {
      code: `
      /**
       * @variation -3
       */
      function quux (foo) {

      }
      `,
      errors: [
        {
          line: 3,
          message: 'Invalid JSDoc @variation: "-3".',
        },
      ],
      options: [
        {
          numericOnlyVariation: true,
        },
      ],
    },
    {
      code: `
      /**
       * @since
       */
      function quux (foo) {

      }
      `,
      errors: [
        {
          line: 3,
          message: 'Missing JSDoc @since value.',
        },
      ],
    },
    {
      code: `
      /**
       * @since 3.1
       */
      function quux (foo) {

      }
      `,
      errors: [
        {
          line: 3,
          message: 'Invalid JSDoc @since: "3.1".',
        },
      ],
    },
    {
      code: `
      /**
       * @license
       */
      function quux (foo) {

      }
      `,
      errors: [
        {
          line: 3,
          message: 'Missing JSDoc @license value.',
        },
      ],
    },
    {
      code: `
      /**
       * @license FOO
       */
      function quux (foo) {

      }
      `,
      errors: [
        {
          line: 3,
          message: 'Invalid JSDoc @license: "FOO"; expected SPDX expression: https://spdx.org/licenses/.',
        },
      ],
    },
    {
      code: `
      /**
       * @license FOO
       */
      function quux (foo) {

      }
      `,
      errors: [
        {
          line: 3,
          message: 'Invalid JSDoc @license: "FOO"; expected one of BAR, BAX.',
        },
      ],
      options: [
        {
          allowedLicenses: [
            'BAR', 'BAX',
          ],
        },
      ],
    },
    {
      code: `
      /**
       * @license MIT-7
       * Some extra text...
       */
      function quux (foo) {

      }
      `,
      errors: [
        {
          line: 3,
          message: 'Invalid JSDoc @license: "MIT-7"; expected SPDX expression: https://spdx.org/licenses/.',
        },
      ],
    },
    {
      code: `
      /**
       * @license (MIT OR GPL-2.5)
       */
      function quux (foo) {

      }
      `,
      errors: [
        {
          line: 3,
          message: 'Invalid JSDoc @license: "(MIT OR GPL-2.5)"; expected SPDX expression: https://spdx.org/licenses/.',
        },
      ],
    },
    {
      code: `
      /**
       * @license MIT
       * Some extra text
       */
      function quux (foo) {

      }
      `,
      errors: [
        {
          line: 3,
          message: 'Invalid JSDoc @license: "MIT\nSome extra text"; expected SPDX expression: https://spdx.org/licenses/.',
        },
      ],
      options: [
        {
          licensePattern: '[\\s\\S]*',
        },
      ],
    },
    {
      code: `
      /**
       * @author
       */
      function quux (foo) {

      }
      `,
      errors: [
        {
          line: 3,
          message: 'Missing JSDoc @author value.',
        },
      ],
    },
    {
      code: `
      /**
       * @author Brett Zamir
       */
      function quux (foo) {

      }
      `,
      errors: [
        {
          line: 3,
          message: 'Invalid JSDoc @author: "Brett Zamir"; expected one of Gajus Kuizinas, golopot.',
        },
      ],
      options: [
        {
          allowedAuthors: [
            'Gajus Kuizinas', 'golopot',
          ],
        },
      ],
    },
    {
      code: `
      /**
       * @variation
       */
      function quux (foo) {

      }
      `,
      errors: [
        {
          line: 3,
          message: 'Missing JSDoc @variation value.',
        },
      ],
      options: [
        {
          numericOnlyVariation: true,
        },
      ],
    },
    {
      code: `
      /**
       * @variation 5.2
       */
      function quux (foo) {

      }
      `,
      errors: [
        {
          line: 3,
          message: 'Invalid JSDoc @variation: "5.2".',
        },
      ],
      options: [
        {
          numericOnlyVariation: true,
        },
      ],
    },
    {
      code: `
      /**
       * @license license-prefix Oops
       */
      function quux (foo) {

      }
      `,
      errors: [
        {
          line: 3,
          message: 'Invalid JSDoc @license: "Oops"; expected SPDX expression: https://spdx.org/licenses/.',
        },
      ],
      options: [
        {
          licensePattern: '(?<=license-prefix ).*',
        },
      ],
    },
    {
      code: `
      /**
       * @license Oops
       * Copyright 2022
       */
      function quux (foo) {

      }
      `,
      errors: [
        {
          line: 3,
          message: 'Invalid JSDoc @license: "Oops"; expected SPDX expression: https://spdx.org/licenses/.',
        },
      ],
      options: [
        {
          licensePattern: '^([^\n]+)\nCopyright',
        },
      ],
    },
    {
      code: `
        /**
         * @import BadImportIgnoredByThisRule
         */
        /**
         * @import {AnotherBadImportIgnoredByThisRule} from
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Bad @import tag',
        },
        {
          line: 6,
          message: 'Bad @import tag',
        },
      ],
    },
  ],
  valid: [
    {
      code: `
      /**
       * @version 3.4.1
       */
      function quux (foo) {

      }
      `,
    },
    {
      code: `
      /**
       * @version      3.4.1
       */
      function quux (foo) {

      }
      `,
    },
    {
      code: `
      /**
       * @since 3.4.1
       */
      function quux (foo) {

      }
      `,
    },
    {
      code: `
      /**
       * @since      3.4.1
       */
      function quux (foo) {

      }
      `,
    },
    {
      code: `
      /**
       * @license MIT
       */
      function quux (foo) {

      }
      `,
    },
    {
      code: `
      /**
       * @license MIT
       * Some extra text...
       */
      function quux (foo) {

      }
      `,
    },
    {
      code: `
      /**
       * @license (MIT OR GPL-2.0)
       */
      function quux (foo) {

      }
      `,
    },
    {
      code: `
      /**
       * @license FOO
       */
      function quux (foo) {

      }
      `,
      options: [
        {
          allowedLicenses: [
            'FOO', 'BAR', 'BAX',
          ],
        },
      ],
    },
    {
      code: `
      /**
       * @license FOO
       */
      function quux (foo) {

      }
      `,
      options: [
        {
          allowedLicenses: true,
        },
      ],
    },
    {
      code: `
      /**
       * @license MIT
       * Some extra text
       */
      function quux (foo) {

      }
      `,
      options: [
        {
          licensePattern: '[^\n]*',
        },
      ],
    },
    {
      code: `
      /**
       * @author Gajus Kuizinas
       */
      function quux (foo) {

      }
      `,
    },
    {
      code: `
      /**
       * @author Brett Zamir
       */
      function quux (foo) {

      }
      `,
      options: [
        {
          allowedAuthors: [
            'Gajus Kuizinas', 'golopot', 'Brett Zamir',
          ],
        },
      ],
    },
    {
      code: `
      /**
       * @variation 3
       */
      function quux (foo) {

      }
      `,
      options: [
        {
          numericOnlyVariation: true,
        },
      ],
    },
    {
      code: `
      /**
       * @variation abc
       */
      function quux (foo) {

      }
      `,
    },
    {
      code: `
      /**
       * @module test
       * @license MIT\r
       */
      'use strict';
      `,
    },
    {
      code: `
      /**
       * @kind function
       */
      function quux (foo) {

      }
      `,
    },
    {
      code: `
      /**
       * @license license-prefix MIT
       */
      function quux (foo) {

      }
      `,
      options: [
        {
          licensePattern: '(?<=license-prefix )MIT|GPL3.0',
        },
      ],
    },
    {
      code: `
      /**
       * @license
       * Copyright 2022
       */
      function quux (foo) {

      }
      `,
      options: [
        {
          licensePattern: '^([^\n]+)(?!\nCopyright)',
        },
      ],
    },
    {
      code: `
      /**
       * @license MIT
       * Copyright 2022
       */
      function quux (foo) {

      }
      `,
      options: [
        {
          licensePattern: '^([^\n]+)\nCopyright',
        },
      ],
    },
    {
      code: `
        /**
         * @import LinterDef, { Sth as Something, Another as Another2 } from "eslint"
         */
        /**
         * @import { Linter } from "eslint"
         */
        /**
         * @import LinterDefault from "eslint"
         */
        /**
         * @import {Linter as Lintee} from "eslint"
         */
        /**
         * @import * as Linters from "eslint"
         */
      `,
    },
    {
      code: `
      /** @import { ReactNode } from 'react' */

      /** @type {ReactNode} */
      export const TEST = null
      `,
    },
  ],
});
