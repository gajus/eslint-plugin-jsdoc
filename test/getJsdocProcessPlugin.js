import {
  getJsdocProcessorPlugin,
} from '../src/getJsdocProcessorPlugin.js';
import jsdocPlugin from '../src/index.js';
import * as babelEslintParser from '@babel/eslint-parser';
import {
  expect,
} from 'chai';
import {
  ESLint,
  Linter,
} from 'eslint';
import * as espree from 'espree';
import {
  parser as typescriptEslintParser,
} from 'typescript-eslint';

/**
 * @param {{
 *   options?: import('../src/getJsdocProcessorPlugin.js').JsdocProcessorOptions,
 *   filename: string,
 *   text: string,
 *   result: (string|import('eslint').Linter.ProcessorFile)[]
 * }} cfg
 */
const check = ({
  filename,
  options,
  result,
  text,
}) => {
  const plugin = getJsdocProcessorPlugin(options);
  if (!plugin.processors || typeof plugin.processors.examples.preprocess !== 'function') {
    throw new Error('No processors');
  }

  const results = plugin.processors.examples.preprocess(
    text, filename,
  );
  expect(results).to.deep.equal(result);
};

describe('`getJsdocProcessorPlugin`', () => {
  it('returns text and files', () => {
    const filename = 'something.js';
    const text = `
    /**
     * @example
     * doSth('a');
     */
    function doSth () {}
    `;
    check({
      filename,
      result: [
        text,
        {
          filename: 'something.md/*.js',
          text: '\ndoSth(\'a\');',
        },
      ],
      text,
    });
  });

  it('returns text and files (recovering from fatal error)', () => {
    const filename = 'something.js';
    const text = 'doSth(';
    check({
      filename,
      result: [
        text,
      ],
      text,
    });
  });

  it('returns text and files with `exampleCodeRegex`', () => {
    const options = {
      exampleCodeRegex: '```js([\\s\\S]*)```',
    };
    const filename = 'something.js';
    const text = `
    /**
     * @example
     * \`\`\`js
     * doSth('a');
     * \`\`\`
     */
    function doSth () {}
    `;
    check({
      filename,
      options,
      result: [
        text,
        {
          filename: 'something.md/*.js',
          text: '\ndoSth(\'a\');\n',
        },
      ],
      text,
    });
  });

  it('returns text and files with `exampleCodeRegex` (as RegExp)', () => {
    const options = {
      exampleCodeRegex: /```js([\s\S]*)```/v,
    };
    const filename = 'something.js';
    const text = `
    /**
     * @example
     * \`\`\`js
     * doSth('a');
     * \`\`\`
     */
    function doSth () {}
    `;
    check({
      filename,
      options,
      result: [
        text,
        {
          filename: 'something.md/*.js',
          text: '\ndoSth(\'a\');\n',
        },
      ],
      text,
    });
  });

  it('returns text and files with `exampleCodeRegex` (no parentheses)', () => {
    const options = {
      exampleCodeRegex: '// begin[\\s\\S]*// end',
    };
    const filename = 'something.js';
    const text = `
      /**
       * @example // begin
       alert('hello')
        // end
       */
      function quux () {

      }
    `;
    check({
      filename,
      options,
      result: [
        text,
        {
          filename: 'something.md/*.js',
          text: '// begin\nalert(\'hello\')\n// end',
        },
      ],
      text,
    });
  });

  it('returns text and files with missing caption', () => {
    const options = {
      captionRequired: true,
    };
    const filename = 'something.js';
    const text = `
      /**
       * @example <caption>Valid usage</caption>
       * quux(); // does something useful
       *
       * @example
       * quux('random unwanted arg'); // results in an error
       */
      function quux () {

      }
    `;

    const plugin = getJsdocProcessorPlugin(options);
    if (!plugin.processors || typeof plugin.processors.examples.preprocess !== 'function') {
      throw new Error('No processors');
    }

    const results = plugin.processors.examples.preprocess(
      text, filename,
    );
    expect(results).to.deep.equal([
      text,
      {
        filename: 'something.md/*.js',
        text: '\nquux(); // does something useful\n',
      },
    ]);

    if (!plugin.processors || typeof plugin.processors.examples.postprocess !== 'function') {
      throw new Error('No processors');
    }

    const postResults = plugin.processors.examples.postprocess(
      [
        [],
      ], filename,
    );
    expect(postResults.length).to.equal(1);
  });

  it('returns text and files (inline example)', () => {
    const options = {};
    const filename = 'something.js';
    const text = `
      /**
       * @example alert('hello')
       */
      function quux () {

      }
    `;
    check({
      filename,
      options,
      result: [
        text,
        {
          filename: 'something.md/*.js',
          text: 'alert(\'hello\')',
        },
      ],
      text,
    });
  });

  it('returns text and files (with escaped */)', () => {
    const filename = 'something.js';
    const text = `
    /**
     * @example
     * doSth('a'); /* Ok *\\/
     */
    function doSth () {}
    `;

    check({
      filename,
      result: [
        text,
        {
          filename: 'something.md/*.js',
          text: '\ndoSth(\'a\'); /* Ok */',
        },
      ],
      text,
    });
  });

  it('returns text and files (with escaped &#1234; and &#x5678;)', () => {
    const filename = 'something.js';
    const text = `
    /**
     * @example
     * doSth('&#1234; and &#x5678; and &amp; and &copy;');
     */
    function doSth () {}
    `;

    check({
      filename,
      result: [
        text,
        {
          filename: 'something.md/*.js',
          text: '\ndoSth(\'Ӓ and 噸 and & and ©\');',
        },
      ],
      text,
    });
  });

  it('returns text and files (no asterisk example)', () => {
    const options = {
      exampleCodeRegex: '```js([\\s\\S]*)```',
    };
    const filename = 'something.js';
    const text = `
      /**
       * @example \`\`\`js
       alert('hello');
        \`\`\`
        */
      function quux () {

      }
    `;
    check({
      filename,
      options,
      result: [
        text,
        {
          filename: 'something.md/*.js',
          text: '\nalert(\'hello\');\n',
        },
      ],
      text,
    });
  });

  it('returns text and files (with `rejectExampleCodeRegex`)', () => {
    const options = {
      rejectExampleCodeRegex: '^\\s*<.*>\\s*$',
    };
    const filename = 'something.js';
    const text = `
      /**
       * @example <b>Not JavaScript</b>
       */
      function quux () {

      }
      /**
       * @example quux2();
       */
      function quux2 () {

      }
    `;
    check({
      filename,
      options,
      result: [
        text,
        {
          filename: 'something.md/*.js',
          text: 'quux2();',
        },
      ],
      text,
    });
  });

  it('returns text and files (with `rejectExampleCodeRegex`) as RegExp', () => {
    const options = {
      rejectExampleCodeRegex: /^\s*<.*>\s*$/v,
    };
    const filename = 'something.js';
    const text = `
      /**
       * @example <b>Not JavaScript</b>
       */
      function quux () {

      }
      /**
       * @example quux2();
       */
      function quux2 () {

      }
    `;
    check({
      filename,
      options,
      result: [
        text,
        {
          filename: 'something.md/*.js',
          text: 'quux2();',
        },
      ],
      text,
    });
  });

  it('returns text and files (with `matchingFileName`)', () => {
    const options = {
      matchingFileName: '../../jsdocUtils.js',
    };
    const filename = 'something.js';
    const text = `
      /**
       * @example const j = 5;
       * quux2();
       */
      function quux2 () {

      }
    `;
    check({
      filename,
      options,
      result: [
        text,
        {
          filename: '../../jsdocUtils.js',
          text: 'const j = 5;\nquux2();',
        },
      ],
      text,
    });
  });

  it('returns text and files (with `paddedIndent`)', () => {
    const options = {
      paddedIndent: 2,
    };
    const filename = 'something.js';
    const text = `
      /**
       * @example const i = 5;
       *   quux2()
       */
      function quux2 () {

      }
    `;
    check({
      filename,
      options,
      result: [
        text,
        {
          filename: 'something.md/*.js',
          text: 'const i = 5;\nquux2()',
        },
      ],
      text,
    });
  });

  it('returns text and files (with `parser`)', () => {
    const options = {
      parser: typescriptEslintParser,
    };
    const filename = 'something.js';
    const text = `
      /**
       * @example
       * const list: number[] = [1, 2, 3]
       * quux(list);
       */
      function quux () {

      }
    `;
    check({
      filename,
      options,
      result: [
        text,
        {
          filename: 'something.md/*.js',
          text: '\nconst list: number[] = [1, 2, 3]\nquux(list);',
        },
      ],
      text,
    });
  });

  it('returns text and files (with multiple fenced blocks)', () => {
    const options = {
      exampleCodeRegex: '/^```(?:js|javascript)\\n([\\s\\S]*?)```$/gm',
    };
    const filename = 'something.js';
    const text = `
      /**
       * @example <caption>Say \`Hello!\` to the user.</caption>
       * First, import the function:
       *
       * \`\`\`js
       * import popup from './popup'
       * const aConstInSameScope = 5;
       * \`\`\`
       *
       * Then use it like this:
       *
       * \`\`\`js
       * const aConstInSameScope = 7;
       * popup('Hello!')
       * \`\`\`
       *
       * Here is the result on macOS:
       *
       * ![Screenshot](path/to/screenshot.jpg)
       */
    `;
    check({
      filename,
      options,
      result: [
        text,
        {
          filename: 'something.md/*.js',
          text: 'import popup from \'./popup\'\nconst aConstInSameScope = 5;\n',
        },
        {
          filename: 'something.md/*.js',
          text: 'const aConstInSameScope = 7;\npopup(\'Hello!\')\n',
        },
      ],
      text,
    });
  });

  it('returns text and files (for @default)', () => {
    const options = {
      checkDefaults: true,
    };
    const filename = 'something.js';
    const text = `
        /**
         * @default 'abc'
         */
        const str = 'abc';
    `;
    check({
      filename,
      options,
      result: [
        text,
        {
          filename: 'something.jsdoc-defaults',
          text: '(\'abc\')',
        },
      ],
      text,
    });
  });

  it('returns text and files (for @param)', () => {
    const options = {
      checkParams: true,
    };
    const filename = 'something.js';
    const text = `
        /**
         * @param {myType} [name='abc']
         */
        function quux () {
        }
    `;
    check({
      filename,
      options,
      result: [
        text,
        {
          filename: 'something.jsdoc-params',
          text: '(\'abc\')',
        },
      ],
      text,
    });
  });

  it('returns text and files (for @property)', () => {
    const options = {
      checkProperties: true,
    };
    const filename = 'something.js';
    const text = `
        /**
         * @property {myType} [name='abc']
         */
        const obj = {};
    `;
    check({
      filename,
      options,
      result: [
        text,
        {
          filename: 'something.jsdoc-properties',
          text: '(\'abc\')',
        },
      ],
      text,
    });
  });

  it('returns text and files (with caption)', () => {
    const options = {
      captionRequired: true,
    };
    const filename = 'something.js';
    const text = `
        /**
         * Test function.
         *
         * @example <caption>functionName (paramOne: string, paramTwo?: any,
         * paramThree?: any): boolean</caption> test()
         *
         * @param {string} paramOne Parameter description.
         * @param {any} [paramTwo] Parameter description.
         * @param {any} [paramThree] Parameter description.
         * @returns {boolean} Return description.
         */
        const functionName = function (paramOne, paramTwo,
          paramThree) {
          return false;
        };
    `;
    check({
      filename,
      options,
      result: [
        text,
        {
          filename: 'something.md/*.js',
          text: ' test()\n',
        },
      ],
      text,
    });
  });

  it('returns text and files (with dummy filename)', () => {
    const options = {
      checkProperties: true,
    };
    const filename = '';
    const text = `
        /**
         * @example const i = 5;
         */
        function quux2 () {

        }
      `;
    check({
      filename,
      options,
      result: [
        text,
        {
          filename: 'dummy.md/*.js',
          text: 'const i = 5;',
        },
      ],
      text,
    });
  });

  it('returns text and files (with empty default)', () => {
    const options = {
      checkDefaults: true,
    };
    const filename = '';
    const text = `
        /**
         * @default
         */
        const str = 'abc';
      `;
    check({
      filename,
      options,
      result: [
        text,
      ],
      text,
    });
  });

  it('returns text and files (with property default missing)', () => {
    const options = {
      checkProperties: true,
    };
    const filename = 'something.js';
    const text = `
        /**
         * @property {myType} [name]
         */
        const obj = {};
    `;
    check({
      filename,
      options,
      result: [
        text,
      ],
      text,
    });
  });

  it('returns text and files (with param default missing)', () => {
    const options = {
      checkParams: true,
    };
    const filename = 'something.js';
    const text = `
        /**
         * @param {myType} name
         */
        function quux () {
        }
    `;
    check({
      filename,
      options,
      result: [
        text,
      ],
      text,
    });
  });

  it('returns text and files and postprocesses error', () => {
    const options = {};
    const filename = 'something.js';
    const text = `
/**
 * @example alert('a');
 */
    `;

    const plugin = getJsdocProcessorPlugin(options);
    if (!plugin.processors || typeof plugin.processors.examples.preprocess !== 'function') {
      throw new Error('No processors');
    }

    const results = plugin.processors.examples.preprocess(
      text, filename,
    );
    expect(results).to.deep.equal([
      text,
      {
        filename: 'something.md/*.js',
        text: 'alert(\'a\');',
      },
    ]);

    if (!plugin.processors || typeof plugin.processors.examples.postprocess !== 'function') {
      throw new Error('No processors');
    }

    const postResults = plugin.processors.examples.postprocess(
      [
        [], [
          {
            column: 1,
            endColumn: 11,
            endLine: 1,
            line: 1,
            message: 'Unexpected alert.',
            ruleId: 'no-alert',
            severity: 2,
          },
        ],
      ], filename,
    );
    expect(postResults).to.deep.equal([
      {
        column: 13,
        endColumn: 23,
        endLine: 3,
        line: 3,
        message: '@example error (no-alert): Unexpected alert.',
        ruleId: 'no-alert',
        severity: 2,
      },
    ]);
  });

  it('returns text and files and postprocesses warning', () => {
    const options = {};
    const filename = 'something.js';
    const text = `
/**
 * @example alert('a');
 */
    `;

    const plugin = getJsdocProcessorPlugin(options);

    if (!plugin.processors || typeof plugin.processors.examples.preprocess !== 'function') {
      throw new Error('No processors');
    }

    const results = plugin.processors.examples.preprocess(
      text, filename,
    );
    expect(results).to.deep.equal([
      text,
      {
        filename: 'something.md/*.js',
        text: 'alert(\'a\');',
      },
    ]);

    if (!plugin.processors || typeof plugin.processors.examples.postprocess !== 'function') {
      throw new Error('No processors');
    }

    const postResults = plugin.processors.examples.postprocess(
      [
        [], [
          {
            column: 1,
            endColumn: 11,
            endLine: 1,
            line: 1,
            message: 'Unexpected alert.',
            ruleId: 'no-alert',
            severity: 1,
          },
        ],
      ], filename,
    );
    expect(postResults).to.deep.equal([
      {
        column: 13,
        endColumn: 23,
        endLine: 3,
        line: 3,
        message: '@example warning (no-alert): Unexpected alert.',
        ruleId: 'no-alert',
        severity: 1,
      },
    ]);
  });

  it('returns text and files and postprocesses fatal error', () => {
    const options = {};
    const filename = 'something.js';
    const text = `
      /**
       * @example
       * alert(
       */
    `;

    const plugin = getJsdocProcessorPlugin(options);

    if (!plugin.processors || typeof plugin.processors.examples.preprocess !== 'function') {
      throw new Error('No processors');
    }

    const results = plugin.processors.examples.preprocess(
      text, filename,
    );
    expect(results).to.deep.equal([
      text,
      {
        filename: 'something.md/*.js',
        text: '\nalert(',
      },
    ]);

    if (!plugin.processors || typeof plugin.processors.examples.postprocess !== 'function') {
      throw new Error('No processors');
    }

    const postResults = plugin.processors.examples.postprocess(
      [
        [], [
          {
            column: 7,
            fatal: true,
            line: 2,
            message: 'Parsing error: Unexpected token',
            ruleId: null,
            severity: 2,
          },
        ],
      ], filename,
    );
    expect(postResults).to.deep.equal([
      {
        column: 16,
        endColumn: 16,
        endLine: 4,
        fatal: true,
        line: 4,
        message: '@example error: Fatal: Parsing error: Unexpected token',
        ruleId: null,
        severity: 2,
      },
    ]);
  });

  it('returns text and files and postprocesses messages by filename', () => {
    const options = {};
    const firstFilename = 'first.js';
    const firstText = `
/**
 * @example alert('a');
 */
    `;
    const secondFilename = 'second.js';
    const secondText = `



  /**
   * @example alert('b');
   */
    `;

    const plugin = getJsdocProcessorPlugin(options);

    if (!plugin.processors || typeof plugin.processors.examples.preprocess !== 'function') {
      throw new Error('No processors');
    }

    const firstResults = plugin.processors.examples.preprocess(
      firstText, firstFilename,
    );
    expect(firstResults).to.deep.equal([
      firstText,
      {
        filename: 'first.md/*.js',
        text: 'alert(\'a\');',
      },
    ]);

    const secondResults = plugin.processors.examples.preprocess(
      secondText, secondFilename,
    );
    expect(secondResults).to.deep.equal([
      secondText,
      {
        filename: 'second.md/*.js',
        text: 'alert(\'b\');',
      },
    ]);

    if (!plugin.processors || typeof plugin.processors.examples.postprocess !== 'function') {
      throw new Error('No processors');
    }

    const secondPostResults = plugin.processors.examples.postprocess(
      [
        [], [
          {
            column: 1,
            endColumn: 11,
            endLine: 1,
            line: 1,
            message: 'Unexpected alert.',
            ruleId: 'no-alert',
            severity: 2,
          },
        ],
      ], secondFilename,
    );
    expect(secondPostResults).to.deep.equal([
      {
        column: 15,
        endColumn: 25,
        endLine: 6,
        line: 6,
        message: '@example error (no-alert): Unexpected alert.',
        ruleId: 'no-alert',
        severity: 2,
      },
    ]);

    const firstPostResults = plugin.processors.examples.postprocess(
      [
        [], [
          {
            column: 1,
            endColumn: 11,
            endLine: 1,
            line: 1,
            message: 'Unexpected alert.',
            ruleId: 'no-alert',
            severity: 2,
          },
        ],
      ], firstFilename,
    );
    expect(firstPostResults).to.deep.equal([
      {
        column: 13,
        endColumn: 23,
        endLine: 3,
        line: 3,
        message: '@example error (no-alert): Unexpected alert.',
        ruleId: 'no-alert',
        severity: 2,
      },
    ]);
  });

  it('returns text and files and postprocesses after processing its own example file', () => {
    const options = {};
    const filename = 'something.js';
    const text = `
/**
 * @example alert('a');
 */
    `;
    const exampleFilename = 'something.md/*.js';
    const exampleText = 'alert(\'a\');';

    const plugin = getJsdocProcessorPlugin(options);

    if (!plugin.processors || typeof plugin.processors.examples.preprocess !== 'function') {
      throw new Error('No processors');
    }

    if (!plugin.processors || typeof plugin.processors.examples.postprocess !== 'function') {
      throw new Error('No processors');
    }

    for (let pass = 0; pass < 2; pass++) {
      const results = plugin.processors.examples.preprocess(
        text, filename,
      );
      expect(results).to.deep.equal([
        text,
        {
          filename: exampleFilename,
          text: exampleText,
        },
      ]);

      // ESLint may run the processor on the example file itself (when its
      //   name matches the same config) before postprocessing the parent
      const exampleResults = plugin.processors.examples.preprocess(
        exampleText, exampleFilename,
      );
      expect(exampleResults).to.deep.equal([
        exampleText,
      ]);

      const examplePostResults = plugin.processors.examples.postprocess(
        [
          [],
        ], exampleFilename,
      );
      expect(examplePostResults).to.deep.equal([]);

      const postResults = plugin.processors.examples.postprocess(
        [
          [], [
            {
              column: 1,
              endColumn: 11,
              endLine: 1,
              line: 1,
              message: 'Unexpected alert.',
              ruleId: 'no-alert',
              severity: 2,
            },
          ],
        ], filename,
      );
      expect(postResults).to.deep.equal([
        {
          column: 13,
          endColumn: 23,
          endLine: 3,
          line: 3,
          message: '@example error (no-alert): Unexpected alert.',
          ruleId: 'no-alert',
          severity: 2,
        },
      ]);
    }
  });

  it('postprocesses a missing caption for its own file after processing an example file', () => {
    const options = {
      captionRequired: true,
    };
    const filename = 'something.js';
    const text = `
/**
 * @example
 * foo();
 * @example <caption>Second</caption>
 * bar();
 */
    `;

    const plugin = getJsdocProcessorPlugin(options);
    if (!plugin.processors || typeof plugin.processors.examples.preprocess !== 'function' ||
      typeof plugin.processors.examples.postprocess !== 'function') {
      throw new Error('No processors');
    }

    const exampleFilename = 'something.md/*.js';
    const exampleText = '\nbar();';
    expect(plugin.processors.examples.preprocess(text, filename)).to.deep.equal([
      text,
      {
        filename: exampleFilename,
        text: exampleText,
      },
    ]);

    // As ESLint does for an example file whose name the processor also matches
    plugin.processors.examples.preprocess(exampleText, exampleFilename);
    expect(plugin.processors.examples.postprocess([
      [],
    ], exampleFilename)).to.deep.equal([]);

    const postResults = plugin.processors.examples.postprocess([
      [], [],
    ], filename);
    expect(postResults).to.deep.equal([
      {
        column: 1,
        line: 3,
        message: '@example error - Caption is expected for examples.',
        ruleId: 'jsdoc/example-missing-caption',
        severity: 2,
      },
    ]);
  });

  it('returns text and files and postprocesses without fixes or suggestions', () => {
    const options = {};
    const filename = 'something.js';
    const text = `
/**
 * @example alert('a');
 */
    `;

    const plugin = getJsdocProcessorPlugin(options);

    if (!plugin.processors || typeof plugin.processors.examples.preprocess !== 'function') {
      throw new Error('No processors');
    }

    const results = plugin.processors.examples.preprocess(
      text, filename,
    );
    expect(results).to.deep.equal([
      text,
      {
        filename: 'something.md/*.js',
        text: 'alert(\'a\');',
      },
    ]);

    if (!plugin.processors || typeof plugin.processors.examples.postprocess !== 'function') {
      throw new Error('No processors');
    }

    const postResults = plugin.processors.examples.postprocess(
      [
        [], [
          {
            column: 1,
            endColumn: 11,
            endLine: 1,
            fix: {
              range: [
                0, 11,
              ],
              text: '',
            },
            line: 1,
            message: 'Unexpected alert.',
            ruleId: 'no-alert',
            severity: 2,
            suggestions: [
              {
                desc: 'Remove the alert.',
                fix: {
                  range: [
                    0, 11,
                  ],
                  text: '',
                },
                messageId: 'removeAlert',
              },
            ],
          },
        ],
      ], filename,
    );
    expect(postResults).to.deep.equal([
      {
        column: 13,
        endColumn: 23,
        endLine: 3,
        line: 3,
        message: '@example error (no-alert): Unexpected alert.',
        ruleId: 'no-alert',
        severity: 2,
      },
    ]);
  });

  it('returns text and files, with `checkExamples: false`', () => {
    const options = {
      checkExamples: false,
    };
    const filename = 'something.js';
    const text = `
    /**
     * @example
     * doSth('a');
     */
    function doSth () {}
    `;
    check({
      filename,
      options,
      result: [
        text,
      ],
      text,
    });
  });

  it('ignores language not present in default `allowedLanguagesToProcess`', () => {
    const options = {};
    const filename = 'something.js';
    const text = `
    /**
     * @example
     * \`\`\`shell
     * node doSth.js
     * \`\`\`
     */
    function doSth () {}
    `;
    check({
      filename,
      options,
      result: [
        text,
      ],
      text,
    });
  });

  it('ignores language not present in supplied `allowedLanguagesToProcess`', () => {
    const options = {
      allowedLanguagesToProcess: [
        'javascript',
      ],
    };
    const filename = 'something.js';
    const text = `
    /**
     * @example
     * \`\`\`js
     * doSth();
     * \`\`\`
     */
    function doSth () {}
    `;
    check({
      filename,
      options,
      result: [
        text,
      ],
      text,
    });
  });

  it('checks language present in default `allowedLanguagesToProcess`', () => {
    const options = {};
    const filename = 'something.js';
    const text = `
    /**
     * @example
     * \`\`\`js
     * doSth();
     * \`\`\`
     */
    function doSth () {}
    `;
    check({
      filename,
      options,
      result: [
        text,
        {
          filename: 'something.md/*.js',
          text: '\n```js\ndoSth();\n```',
        },
      ],
      text,
    });
  });

  it('postprocesses a message over several lines', () => {
    const options = {};
    const filename = 'something.js';
    const text = `
/**
 * @example
 * const x = 1;
 * alert(
 *   'a',
 * );
 */
    `;

    const plugin = getJsdocProcessorPlugin(options);
    if (!plugin.processors || typeof plugin.processors.examples.preprocess !== 'function' ||
      typeof plugin.processors.examples.postprocess !== 'function') {
      throw new Error('No processors');
    }

    plugin.processors.examples.preprocess(text, filename);
    const postResults = plugin.processors.examples.postprocess(
      [
        [], [
          {
            column: 1,
            endColumn: 2,
            endLine: 5,
            line: 3,
            message: 'Unexpected alert.',
            ruleId: 'no-alert',
            severity: 2,
          },
        ],
      ], filename,
    );
    expect(postResults).to.deep.equal([
      {
        column: 4,
        endColumn: 5,
        endLine: 7,
        line: 5,
        message: '@example error (no-alert): Unexpected alert.',
        ruleId: 'no-alert',
        severity: 2,
      },
    ]);
  });

  it('postprocesses a message after a caption on the line of the tag', () => {
    const options = {};
    const filename = 'something.js';
    const text = `
/**
 * @example <caption>Title</caption> alert('a');
 */
    `;

    const plugin = getJsdocProcessorPlugin(options);
    if (!plugin.processors || typeof plugin.processors.examples.preprocess !== 'function' ||
      typeof plugin.processors.examples.postprocess !== 'function') {
      throw new Error('No processors');
    }

    plugin.processors.examples.preprocess(text, filename);
    const postResults = plugin.processors.examples.postprocess(
      [
        [], [
          {
            column: 2,
            endColumn: 12,
            endLine: 1,
            line: 1,
            message: 'Unexpected alert.',
            ruleId: 'no-alert',
            severity: 2,
          },
        ],
      ], filename,
    );
    expect(postResults).to.deep.equal([
      {
        column: 38,
        endColumn: 48,
        endLine: 3,
        line: 3,
        message: '@example error (no-alert): Unexpected alert.',
        ruleId: 'no-alert',
        severity: 2,
      },
    ]);
  });

  it('postprocesses a message with `paddedIndent`', () => {
    const options = {
      paddedIndent: 4,
    };
    const filename = 'something.js';
    const text = `
/**
 * @example
 *     const x = 1;
 *     alert('a');
 */
    `;

    const plugin = getJsdocProcessorPlugin(options);
    if (!plugin.processors || typeof plugin.processors.examples.preprocess !== 'function' ||
      typeof plugin.processors.examples.postprocess !== 'function') {
      throw new Error('No processors');
    }

    plugin.processors.examples.preprocess(text, filename);
    const postResults = plugin.processors.examples.postprocess(
      [
        [], [
          {
            column: 1,
            endColumn: 11,
            endLine: 3,
            line: 3,
            message: 'Unexpected alert.',
            ruleId: 'no-alert',
            severity: 2,
          },
        ],
      ], filename,
    );
    expect(postResults).to.deep.equal([
      {
        column: 8,
        endColumn: 18,
        endLine: 5,
        line: 5,
        message: '@example error (no-alert): Unexpected alert.',
        ruleId: 'no-alert',
        severity: 2,
      },
    ]);
  });

  it('postprocesses a message of a `@param` default', () => {
    const options = {
      checkParams: true,
    };
    const filename = 'something.js';
    const text = `
class A {
  /**
   * Desc.
   *
   * @param [a=alert('a')] First.
   */
  m (a) {}
}
    `;

    const plugin = getJsdocProcessorPlugin(options);
    if (!plugin.processors || typeof plugin.processors.examples.preprocess !== 'function' ||
      typeof plugin.processors.examples.postprocess !== 'function') {
      throw new Error('No processors');
    }

    plugin.processors.examples.preprocess(text, filename);
    const postResults = plugin.processors.examples.postprocess(
      [
        [], [
          {
            column: 2,
            endColumn: 12,
            endLine: 1,
            line: 1,
            message: 'Unexpected alert.',
            ruleId: 'no-alert',
            severity: 2,
          },
        ],
      ], filename,
    );
    expect(postResults).to.deep.equal([
      {
        column: 16,
        endColumn: 26,
        endLine: 6,
        line: 6,
        message: '@param error (no-alert): Unexpected alert.',
        ruleId: 'no-alert',
        severity: 2,
      },
    ]);
  });

  it('postprocesses a message of a `@property` default', () => {
    const options = {
      checkProperties: true,
    };
    const filename = 'something.js';
    const text = `
/**
 * @typedef {object} Opts
 * @property {string} [b=alert('b')] Second.
 */
    `;

    const plugin = getJsdocProcessorPlugin(options);
    if (!plugin.processors || typeof plugin.processors.examples.preprocess !== 'function' ||
      typeof plugin.processors.examples.postprocess !== 'function') {
      throw new Error('No processors');
    }

    plugin.processors.examples.preprocess(text, filename);
    const postResults = plugin.processors.examples.postprocess(
      [
        [], [
          {
            column: 2,
            endColumn: 12,
            endLine: 1,
            line: 1,
            message: 'Unexpected alert.',
            ruleId: 'no-alert',
            severity: 2,
          },
        ],
      ], filename,
    );
    expect(postResults).to.deep.equal([
      {
        column: 26,
        endColumn: 36,
        endLine: 4,
        line: 4,
        message: '@property error (no-alert): Unexpected alert.',
        ruleId: 'no-alert',
        severity: 2,
      },
    ]);
  });

  it('postprocesses a message of a `@default`', () => {
    const options = {
      checkDefaults: true,
    };
    const filename = 'something.js';
    const text = `
/**
 * Desc.
 * @default alert('a')
 */
const a = 1;
    `;

    const plugin = getJsdocProcessorPlugin(options);
    if (!plugin.processors || typeof plugin.processors.examples.preprocess !== 'function' ||
      typeof plugin.processors.examples.postprocess !== 'function') {
      throw new Error('No processors');
    }

    plugin.processors.examples.preprocess(text, filename);
    const postResults = plugin.processors.examples.postprocess(
      [
        [], [
          {
            column: 2,
            endColumn: 12,
            endLine: 1,
            line: 1,
            message: 'Unexpected alert.',
            ruleId: 'no-alert',
            severity: 2,
          },
        ],
      ], filename,
    );
    expect(postResults).to.deep.equal([
      {
        column: 13,
        endColumn: 23,
        endLine: 4,
        line: 4,
        message: '@default error (no-alert): Unexpected alert.',
        ruleId: 'no-alert',
        severity: 2,
      },
    ]);
  });
});

/**
 * @typedef {object} ProcessorFixFixture
 * @property {string} id Descriptive case name.
 * @property {string} host Input host source.
 * @property {string} expectedHost Hand-checked host bytes after fixing.
 * @property {import('eslint').Linter.RulesRecord} rules Rules applied to virtual examples.
 * @property {string} [expected] Standalone fixed virtual source, without its leading newline.
 * @property {import('../src/getJsdocProcessorPlugin.js').JsdocProcessorOptions} [options] Processor options.
 * @property {boolean} [decline] Fixes must be dropped while diagnostics remain.
 * @property {boolean} [unsupported] The existing preprocessor creates no virtual file.
 * @property {boolean} [suggestion] Apply and check the reported suggestion.
 * @property {boolean} [clean] Source must remain free of diagnostics.
 * @property {string} [replacement] Replacement for the custom rule.
 * @property {string} [fromText] Virtual source to replace.
 * @property {[number, number]} [range] Explicit custom-rule range.
 * @property {string} [secondFromText] Virtual source for the second probe.
 * @property {string} [secondReplacement] Replacement for the second probe.
 * @property {boolean} [partial] A diagnostic remains after the safe fixes.
 * @property {import('eslint').Linter.LanguageOptions} [hostLanguageOptions] How ESLint parses the host.
 */

/** @type {ProcessorFixFixture[]} */
const processorFixFixtures = [
  {
    expected: 'let value = 1;\nconsole.log(value);',
    expectedHost: '/**\n * @example\n * let value = 1;\n * console.log(value);\n */\nfunction host() {}',
    host: '/**\n * @example\n * var value = 1;\n * console.log(value);\n */\nfunction host() {}',
    id: 'no-var',
    rules: {
      'no-var': 'error',
    },
  },
  {
    expected: 'const value = 1;\nconsole.log(value);',
    expectedHost: '/**\n * @example\n * const value = 1;\n * console.log(value);\n */\nfunction host() {}',
    host: '/**\n * @example\n * let value = 1;\n * console.log(value);\n */\nfunction host() {}',
    id: 'prefer-const',
    rules: {
      'prefer-const': 'error',
    },
  },
  {
    expected: 'obj.foo;',
    expectedHost: '/**\n * @example\n * obj.foo;\n */\nfunction host() {}',
    host: '/**\n * @example\n * obj["foo"];\n */\nfunction host() {}',
    id: 'dot-notation',
    rules: {
      'dot-notation': 'error',
    },
  },
  {
    expected: 'function f() {  }',
    expectedHost: '/**\n * @example\n * function f() {  }\n */\nfunction host() {}',
    host: '/**\n * @example\n * function f() { return; }\n */\nfunction host() {}',
    id: 'no-useless-return',
    rules: {
      'no-useless-return': 'error',
    },
  },
  {
    // eslint-disable-next-line no-template-curly-in-string -- Expected JavaScript example source.
    expected: 'const text = `hello ${  name}`;',
    // eslint-disable-next-line no-template-curly-in-string -- Expected JavaScript example source.
    expectedHost: '/**\n * @example\n * const text = `hello ${  name}`;\n */\nfunction host() {}',
    host: '/**\n * @example\n * const text = "hello " + name;\n */\nfunction host() {}',
    id: 'prefer-template',
    rules: {
      'prefer-template': 'error',
    },
  },
  {
    expected: 'const obj = {value};',
    expectedHost: '/**\n * @example\n * const obj = {value};\n */\nfunction host() {}',
    host: '/**\n * @example\n * const obj = {value: value};\n */\nfunction host() {}',
    id: 'object-shorthand',
    rules: {
      'object-shorthand': 'error',
    },
  },
  {
    expected: '[1].map((value) => { return value; });',
    expectedHost: '/**\n * @example\n * [1].map((value) => { return value; });\n */\nfunction host() {}',
    host: '/**\n * @example\n * [1].map(function (value) { return value; });\n */\nfunction host() {}',
    id: 'prefer-arrow-callback',
    rules: {
      'prefer-arrow-callback': 'error',
    },
  },
  {
    expected: 'if (a) { x(); } else if (b) { y(); }',
    expectedHost: '/**\n * @example\n * if (a) { x(); } else if (b) { y(); }\n */\nfunction host() {}',
    host: '/**\n * @example\n * if (a) { x(); } else { if (b) { y(); } }\n */\nfunction host() {}',
    id: 'no-lonely-if',
    rules: {
      'no-lonely-if': 'error',
    },
  },
  {
    expected: 'fn.apply(null, args);',
    expectedHost: '/**\n * @example\n * fn.apply(null, args);\n */\nfunction host() {}',
    host: '/**\n * @example\n * fn.apply(null, args);\n */\nfunction host() {}',
    id: 'prefer-spread',
    rules: {
      'prefer-spread': 'error',
    },
  },
  {
    expected: 'const fn = (value) => value;',
    expectedHost: '/**\n * @example\n * const fn = (value) => value;\n */\nfunction host() {}',
    host: '/**\n * @example\n * const fn = (value) => { return value; };\n */\nfunction host() {}',
    id: 'arrow-body-style',
    rules: {
      'arrow-body-style': [
        'error',
        'as-needed',
      ],
    },
  },
  {
    expected: 'function f(a) { if (a) { return 1; }  return 2;  }',
    expectedHost: '/**\n * @example\n * function f(a) { if (a) { return 1; }  return 2;  }\n */\nfunction host() {}',
    host: '/**\n * @example\n * function f(a) { if (a) { return 1; } else { return 2; } }\n */\nfunction host() {}',
    id: 'no-else-return',
    rules: {
      'no-else-return': 'error',
    },
  },
  {
    expected: 'const text = "hello";',
    expectedHost: '/**\n * @example\n * const text = "hello";\n */\nfunction host() {}',
    host: '/**\n * @example\n * const text = \'hello\';\n */\nfunction host() {}',
    id: 'quotes-double',
    rules: {
      quotes: [
        'error',
        'double',
      ],
    },
  },
  {
    expected: 'console.log(1);',
    expectedHost: '/**\n * @example\n * console.log(1);\n */\nfunction host() {}',
    host: '/**\n * @example\n * console.log(1)\n */\nfunction host() {}',
    id: 'semi-missing',
    rules: {
      semi: [
        'error',
        'always',
      ],
    },
  },
  {
    expected: 'const fn = function () { return 1; };',
    expectedHost: '/**\n * @example\n * const fn = function () { return 1; };\n */\nfunction host() {}',
    host: '/**\n * @example\n * const fn = function () { return 1; }.bind(null);\n */\nfunction host() {}',
    id: 'no-extra-bind',
    rules: {
      'no-extra-bind': 'error',
    },
  },
  {
    expected: 'if (value === 1) { f(); }',
    expectedHost: '/**\n * @example\n * if (value === 1) { f(); }\n */\nfunction host() {}',
    host: '/**\n * @example\n * if (1 === value) { f(); }\n */\nfunction host() {}',
    id: 'yoda',
    rules: {
      yoda: 'error',
    },
  },
  {
    expected: 'const a = 1;\nconst b = 2;\nconsole.log("x", a, b);',
    expectedHost: '/**\n * @example\n * const a = 1;\n * const b = 2;\n * console.log("x", a, b);\n */\nfunction host() {}',
    host: '/**\n * @example\n * var a = 1;\n * let b = 2;\n * console.log(\'x\', a, b)\n */\nfunction host() {}',
    id: 'four-rule-demo',
    rules: {
      'no-var': 'error',
      'prefer-const': 'error',
      quotes: [
        'error',
        'double',
      ],
      semi: [
        'error',
        'always',
      ],
    },
  },
  {
    expectedHost: '/**\n * @example\n * let value = 1;\n */\nfunction host() {}',
    host: '/**\n * @example\n * var value = 1;\n */\nfunction host() {}',
    id: 'plain',
    rules: {
      'no-var': 'error',
    },
  },
  {
    expectedHost: '/**\n * @example <caption>Caption</caption>\n * let value = 1;\n */\nfunction host() {}',
    host: '/**\n * @example <caption>Caption</caption>\n * var value = 1;\n */\nfunction host() {}',
    id: 'caption',
    rules: {
      'no-var': 'error',
    },
  },
  {
    expectedHost: '/**\n * @example\n *   let value = 1;\n */\nfunction host() {}',
    host: '/**\n * @example\n *   var value = 1;\n */\nfunction host() {}',
    id: 'padded-indent',
    options: {
      paddedIndent: 2,
    },
    rules: {
      'no-var': 'error',
    },
  },
  {
    expectedHost: '/**\n * @example\n *let value = 1;\n */\nfunction host() {}',
    host: '/**\n * @example\n *var value = 1;\n */\nfunction host() {}',
    id: 'no-space-prefix',
    rules: {
      'no-var': 'error',
    },
  },
  {
    decline: true,
    expectedHost: '/**\n * @example\n * var value = "&amp;";\n */\nfunction host() {}',
    host: '/**\n * @example\n * var value = "&amp;";\n */\nfunction host() {}',
    id: 'entity-decoded',
    rules: {
      'no-var': 'error',
    },
  },
  {
    decline: true,
    expectedHost: '/**\n * @example\n * var value = "a*\\/b";\n */\nfunction host() {}',
    host: '/**\n * @example\n * var value = "a*\\/b";\n */\nfunction host() {}',
    id: 'star-slash-unescaped',
    rules: {
      'no-var': 'error',
    },
  },
  {
    decline: true,
    expectedHost: '/** @example var value = 1; */\nfunction host() {}',
    host: '/** @example var value = 1; */\nfunction host() {}',
    id: 'tag-line',
    rules: {
      'no-var': 'error',
    },
  },
  {
    decline: true,
    expectedHost: '/**\n * @example var value = 1;\n */\nfunction host() {}',
    host: '/**\n * @example var value = 1;\n */\nfunction host() {}',
    id: 'same-line',
    rules: {
      'no-var': 'error',
    },
  },
  {
    decline: true,
    expectedHost: '/**\n * @default "sq"\n */\nfunction host() {}',
    host: '/**\n * @default "sq"\n */\nfunction host() {}',
    id: 'wrapped-default',
    options: {
      checkDefaults: true,
    },
    rules: {
      quotes: [
        'error',
        'single',
      ],
    },
  },
  {
    decline: true,
    expectedHost: '/**\n * @param [value="sq"]\n */\nfunction host() {}',
    host: '/**\n * @param [value="sq"]\n */\nfunction host() {}',
    id: 'wrapped-param',
    options: {
      checkParams: true,
    },
    rules: {
      quotes: [
        'error',
        'single',
      ],
    },
  },
  {
    decline: true,
    expectedHost: '/**\n * @property [value="sq"]\n */\nfunction host() {}',
    host: '/**\n * @property [value="sq"]\n */\nfunction host() {}',
    id: 'wrapped-property',
    options: {
      checkProperties: true,
    },
    rules: {
      quotes: [
        'error',
        'single',
      ],
    },
  },
  {
    expectedHost: '/**\n * @example\n * ```js\n * let value = 1;\n * ```\n */\nfunction host() {}',
    host: '/**\n * @example\n * ```js\n * var value = 1;\n * ```\n */\nfunction host() {}',
    id: 'regex-preface',
    options: {
      exampleCodeRegex: '```js\\n([\\s\\S]*?)```',
    },
    rules: {
      'no-var': 'error',
    },
  },
  {
    expectedHost: '/**\n * @example\n * let value = 1;\n * console.log(value);\n * let value2 = 1;\n * console.log(value);\n */\nfunction host() {}',
    host: '/**\n * @example\n * var value = 1;\n * console.log(value);\n * var value2 = 1;\n * console.log(value);\n */\nfunction host() {}',
    id: 'duplicate-lines',
    rules: {
      'no-var': 'error',
    },
  },
  {
    expectedHost: '/**\n * @example\n * let value = 1;\n */\nfunction host() {}\nvar value = 1;',
    host: '/**\n * @example\n * var value = 1;\n */\nfunction host() {}\nvar value = 1;',
    id: 'duplicate-host-code',
    rules: {
      'no-var': 'error',
    },
  },
  {
    expectedHost: '/**\n * @example\n * let value = 1;\n * @example\n * let value2 = 2;\n */\nfunction host() {}',
    host: '/**\n * @example\n * var value = 1;\n * @example\n * var value2 = 2;\n */\nfunction host() {}',
    id: 'two-examples',
    rules: {
      'no-var': 'error',
    },
  },
  {
    expectedHost: '/**\r\n * @example\r\n * let value = 1;\r\n */\r\nfunction host() {}',
    host: '/**\r\n * @example\r\n * var value = 1;\r\n */\r\nfunction host() {}',
    id: 'crlf-host',
    rules: {
      'no-var': 'error',
    },
  },
  {
    expectedHost: '/**\r * @example\r * var value = 1;\r */\rfunction host() {}',
    host: '/**\r * @example\r * var value = 1;\r */\rfunction host() {}',
    id: 'lone-cr-host',
    rules: {
      'no-var': 'error',
    },
    unsupported: true,
  },
  {
    expectedHost: '/**\r\n * @example\r\n * let value = 1;\r\n */\nfunction host() {}',
    host: '/**\r\n * @example\r\n * var value = 1;\r\n */\nfunction host() {}',
    id: 'lf-host-crlf-comment',
    rules: {
      'no-var': 'error',
    },
  },
  {
    decline: true,
    expectedHost: '/**\n * @example\n * var value = 1;\n */\nfunction host() {}',
    host: '/**\n * @example\n * var value = 1;\n */\nfunction host() {}',
    id: 'fix-star-slash',
    replacement: 'const value = "*/";',
    rules: {
      'probe/replace': 'error',
    },
  },
  {
    decline: true,
    expectedHost: '/**\n * @example\n * var value = 1;\n */\nfunction host() {}',
    host: '/**\n * @example\n * var value = 1;\n */\nfunction host() {}',
    id: 'fix-tag-line',
    replacement: '@other',
    rules: {
      'probe/replace': 'error',
    },
  },
  {
    decline: true,
    expectedHost: '/**\n * @example\n * var value = 1;\n */\nfunction host() {}',
    host: '/**\n * @example\n * var value = 1;\n */\nfunction host() {}',
    id: 'fix-named-entity',
    replacement: 'const value = "&amp;";',
    rules: {
      'probe/replace': 'error',
    },
  },
  {
    decline: true,
    expectedHost: '/**\n * @example\n * var value = 1;\n */\nfunction host() {}',
    host: '/**\n * @example\n * var value = 1;\n */\nfunction host() {}',
    id: 'fix-numeric-entity',
    replacement: 'const value = "&#65;";',
    rules: {
      'probe/replace': 'error',
    },
  },
  {
    expectedHost: '/**\n * @example\n * const value = 1;\n *  \n * console.log(value);\n */\nfunction host() {}',
    host: '/**\n * @example\n * var value = 1;\n */\nfunction host() {}',
    id: 'fix-cr-whitespace-lf',
    replacement: 'const value = 1;\r \nconsole.log(value);',
    rules: {
      'probe/replace': 'error',
    },
  },
  {
    expectedHost: '/**\n * @example\n * const value = 1;\n * // comment\n * console.log(value);\n */\nfunction host() {}',
    host: '/**\n * @example\n * var value = 1;\n */\nfunction host() {}',
    id: 'fix-cr-line-comment-lf',
    replacement: 'const value = 1;\r// comment\nconsole.log(value);',
    rules: {
      'probe/replace': 'error',
    },
  },
  {
    decline: true,
    expectedHost: '/**\n * @example\n * var value = 1;\n */\nfunction host() {}',
    host: '/**\n * @example\n * var value = 1;\n */\nfunction host() {}',
    id: 'fix-cr-block-comment-lf',
    replacement: 'const value = 1;\r/* comment */\nconsole.log(value);',
    rules: {
      'probe/replace': 'error',
    },
  },
  {
    expectedHost: '/**\n * @example\n * const value = 1;\n * \n * console.log(value);\n */\nfunction host() {}',
    host: '/**\n * @example\n * var value = 1;\n */\nfunction host() {}',
    id: 'fix-crcrlf',
    replacement: 'const value = 1;\r\r\nconsole.log(value);',
    rules: {
      'probe/replace': 'error',
    },
  },
  {
    expectedHost: '/**\n * @example\n * const value = 1;\n * \n * console.log(value);\n */\nfunction host() {}',
    host: '/**\n * @example\n * var value = 1;\n */\nfunction host() {}',
    id: 'fix-lfcrlf',
    replacement: 'const value = 1;\n\r\nconsole.log(value);',
    rules: {
      'probe/replace': 'error',
    },
  },
  {
    expectedHost: '/**\n * @example\n * const value = 1;\n * console.log(value);\n */\nfunction host() {}',
    host: '/**\n * @example\n * var value = 1;\n */\nfunction host() {}',
    id: 'multiline',
    replacement: 'const value = 1;\nconsole.log(value);',
    rules: {
      'probe/replace': 'error',
    },
  },
  {
    expectedHost: '/**\n * @example\n * let value = 1;\n */\nfunction host() {}',
    host: '/**\n * @example\n * var value = 1;\n */\nfunction host() {}',
    id: 'suggestion',
    replacement: 'let value = 1;',
    rules: {
      'probe/replace': 'error',
    },
    suggestion: true,
  },
  {
    clean: true,
    expectedHost: '/**\n * @example\n * const value = 1;\n */\nfunction host() {}',
    host: '/**\n * @example\n * const value = 1;\n */\nfunction host() {}',
    id: 'clean',
    rules: {
      'no-var': 'error',
    },
  },
  {
    decline: true,
    expectedHost: '/**\n * @example\n * var value = 1;\n */\nfunction host() {}\r \n/**\n * @example\n * var value2 = 2;\n */\nfunction otherHost() {}',
    host: '/**\n * @example\n * var value = 1;\n */\nfunction host() {}\r \n/**\n * @example\n * var value2 = 2;\n */\nfunction otherHost() {}',
    id: 'mixed-cr-whitespace',
    replacement: 'let value = 1;',
    rules: {
      'probe/replace': 'error',
    },
  },
  {
    decline: true,
    expectedHost: '/**\n * @example\n * var value = 1;\n */\nfunction host() {}\r// note\n/**\n * @example\n * var value2 = 2;\n */\nfunction otherHost() {}',
    host: '/**\n * @example\n * var value = 1;\n */\nfunction host() {}\r// note\n/**\n * @example\n * var value2 = 2;\n */\nfunction otherHost() {}',
    id: 'mixed-cr-line-comment',
    replacement: 'let value = 1;',
    rules: {
      'probe/replace': 'error',
    },
  },
  {
    decline: true,
    expectedHost: '/**\n * @example\n * var value = 1;\n */\nfunction host() {}\r/* note */\n/**\n * @example\n * var value2 = 2;\n */\nfunction otherHost() {}',
    host: '/**\n * @example\n * var value = 1;\n */\nfunction host() {}\r/* note */\n/**\n * @example\n * var value2 = 2;\n */\nfunction otherHost() {}',
    id: 'mixed-cr-block-comment',
    replacement: 'let value = 1;',
    rules: {
      'probe/replace': 'error',
    },
  },
  {
    decline: true,
    expectedHost: '/**\n * @example\n * var value = 1;\n */\nfunction host() {}\r\r\n/**\n * @example\n * var value2 = 2;\n */\nfunction otherHost() {}',
    host: '/**\n * @example\n * var value = 1;\n */\nfunction host() {}\r\r\n/**\n * @example\n * var value2 = 2;\n */\nfunction otherHost() {}',
    id: 'mixed-crcrlf',
    replacement: 'let value = 1;',
    rules: {
      'probe/replace': 'error',
    },
  },
  {
    expectedHost: '/**\n * @example\n * let value = 1;\n */\nfunction host() {}\n\r\n/**\n * @example\n * var value2 = 2;\n */\nfunction otherHost() {}',
    host: '/**\n * @example\n * var value = 1;\n */\nfunction host() {}\n\r\n/**\n * @example\n * var value2 = 2;\n */\nfunction otherHost() {}',
    id: 'mixed-lfcrlf',
    replacement: 'let value = 1;',
    rules: {
      'probe/replace': 'error',
    },
  },
  {
    expectedHost: '/**\r\n * @example\r\n *   let value = 1;\r\n */\r\nfunction host() {}',
    host: '/**\r\n * @example\r\n *   var value = 1;\r\n */\r\nfunction host() {}',
    id: 'padded-crlf',
    options: {
      paddedIndent: 2,
    },
    replacement: 'let value = 1;',
    rules: {
      'probe/replace': 'error',
    },
  },
  {
    expectedHost: '/**\n * @example <caption>&amp;</caption>\n * let value = 1;\n */\nfunction host() {}',
    host: '/**\n * @example <caption>&amp;</caption>\n * var value = 1;\n */\nfunction host() {}',
    id: 'caption-entity',
    replacement: 'let value = 1;',
    rules: {
      'probe/replace': 'error',
    },
  },
  {
    expectedHost: '/**\n * @example\n * let value = 1;\n * console.log(value);\n */\nfunction host() {}',
    fromText: 'var value = 1;\nconsole.log(value);\nconsole.log(value);',
    host: '/**\n * @example\n * var value = 1;\n * console.log(value);\n * console.log(value);\n */\nfunction host() {}',
    id: 'multiline-range',
    replacement: 'let value = 1;\nconsole.log(value);',
    rules: {
      'probe/replace': 'error',
    },
  },
  {
    expectedHost: '/**\n * @example\n * let value = 1;\n */\nfunction host() {}',
    fromText: 'var value = 1;\n\nconsole.log(value);',
    host: '/**\n * @example\n * var value = 1;\n * \n * console.log(value);\n */\nfunction host() {}',
    id: 'blank-crossed-line',
    replacement: 'let value = 1;',
    rules: {
      'probe/replace': 'error',
    },
  },
  {
    expectedHost: '/**\n * @example\n * let value = 1;\n */\nfunction host() {}',
    fromText: 'var value = 1;\nconst text = "&";\nconsole.log(value);',
    host: '/**\n * @example\n * var value = 1;\n * const text = "&amp;";\n * console.log(value);\n */\nfunction host() {}',
    id: 'entity-crossed-line',
    replacement: 'let value = 1;',
    rules: {
      'probe/replace': 'error',
    },
  },
  {
    decline: true,
    expectedHost: '/**\n * @example\n * var value = "&amp;";\n */\nfunction host() {}',
    fromText: 'var value = "&";',
    host: '/**\n * @example\n * var value = "&amp;";\n */\nfunction host() {}',
    id: 'declined-suggestion',
    replacement: 'let value = "&";',
    rules: {
      'probe/replace': 'error',
    },
    suggestion: true,
  },
  {
    decline: true,
    expectedHost: '/**\n * @example\n * var value = 1;\n */\nfunction host() {}',
    host: '/**\n * @example\n * var value = 1;\n */\nfunction host() {}',
    id: 'empty-leading-line',
    range: [
      0,
      0,
    ],
    replacement: 'let value = 1;',
    rules: {
      'probe/replace': 'error',
    },
  },
  {
    decline: true,
    expectedHost: '/**\n * @example\n * var value = 1;\n */\nfunction host() {}',
    host: '/**\n * @example\n * var value = 1;\n */\nfunction host() {}',
    id: 'negative-range',
    range: [
      -1,
      0,
    ],
    replacement: 'let value = 1;',
    rules: {
      'probe/replace': 'error',
    },
  },
  {
    decline: true,
    expectedHost: '/**\n * @example\n * var value = 1;\n */\nfunction host() {}',
    host: '/**\n * @example\n * var value = 1;\n */\nfunction host() {}',
    id: 'outside-virtual-file',
    range: [
      9_999,
      9_999,
    ],
    replacement: 'let value = 1;',
    rules: {
      'probe/replace': 'error',
    },
  },
  {
    decline: true,
    expectedHost: '/**\n * @example\n * var value = 1;\n */\nfunction host() {}',
    host: '/**\n * @example\n * var value = 1;\n */\nfunction host() {}',
    id: 'insert-unescape-sequence',
    replacement: 'const value = "a*\\/b";',
    rules: {
      'probe/replace': 'error',
    },
  },
  {
    decline: true,
    expectedHost: '/**\n * @example\n * var value = 1; void 0;\n */\nfunction host() {}',
    host: '/**\n * @example\n * var value = 1; void 0;\n */\nfunction host() {}',
    id: 'regex-trailing-source',
    options: {
      exampleCodeRegex: '(var value = 1;)',
    },
    replacement: 'let value = 1;',
    rules: {
      'probe/replace': 'error',
    },
  },
  {
    expectedHost: '\uFEFF/**\r\n * @example\r\n * let value = 1;\r\n */\r\nfunction host() {}',
    host: '\uFEFF/**\r\n * @example\r\n * var value = 1;\r\n */\r\nfunction host() {}',
    id: 'byte-order-mark',
    rules: {
      'no-var': 'error',
    },
  },
  {
    decline: true,
    expectedHost: '/**\n * @example\n *A: /x/.test(s);\n */\nfunction host() {}',
    host: '/**\n * @example\n *A: /x/.test(s);\n */\nfunction host() {}',
    id: 'terminator-at-fix-edge',
    rules: {
      'no-unused-labels': 'error',
    },
  },
  {
    decline: true,
    expectedHost: '/**\n * @example\n * a();&#10;b();\n * if (c)\n *   x();\n *     x();\n */\nfunction host() {}',
    host: '/**\n * @example\n * a();&#10;b();\n * if (c)\n *   x();\n *     x();\n */\nfunction host() {}',
    id: 'entity-line-break-shift',
    rules: {
      curly: 'error',
    },
  },
  {
    decline: true,
    expectedHost: '/**\n * @example\n   if (a) {\n   b();\n   }\n */\nfunction host() {}',
    host: '/**\n * @example\n   if (a) {\n   b();\n   }\n */\nfunction host() {}',
    id: 'gutterless-indent',
    rules: {
      indent: [
        'error', 2,
      ],
    },
  },
  {
    decline: true,
    expectedHost: '/**\n * @example\n * var value = 1;\n */\nfunction host() {}',
    host: '/**\n * @example\n * var value = 1;\n */\nfunction host() {}',
    id: 'unchanged-example',
    replacement: 'var value = 1;',
    rules: {
      'probe/replace': 'error',
    },
  },
  {
    expectedHost: '/**\n * @example\n *const x = a\n * / b;\n */\nfunction host() {}',
    host: '/**\n * @example\n *const x = a /\n *b;\n */\nfunction host() {}',
    id: 'no-space-prefix-added-line',
    rules: {
      'operator-linebreak': [
        'error', 'before',
      ],
    },
  },
  {
    decline: true,
    expectedHost: '/**\n * @example\n * const n = 2*(/a/.source.length);\n */\nfunction host() {}',
    host: '/**\n * @example\n * const n = 2*(/a/.source.length);\n */\nfunction host() {}',
    id: 'terminator-standard-gutter',
    rules: {
      'no-extra-parens': 'error',
    },
  },
  {
    expectedHost: '/**\n * @example\n *let a = 1;\n * /x/.test(s);\n *var b = 2;\n */\nfunction host() {}',
    fromText: 'var a = 1;',
    host: '/**\n * @example\n *var a = 1;\n *var b = 2;\n */\nfunction host() {}',
    id: 'suggestion-terminator-added-line',
    replacement: 'let a = 1;\n/x/.test(s);',
    rules: {
      'probe/replace': 'error',
    },
    suggestion: true,
  },
  {
    expectedHost: '/**\n * @example\n * const t = "&lt Z";\n */\nfunction host() {}',
    fromText: 'Q ',
    host: '/**\n * @example\n * const t = "Q lt Z";\n */\nfunction host() {}',
    id: 'joint-entity',
    partial: true,
    replacement: '&',
    rules: {
      'probe/replace': 'error',
      'probe/replace2': 'error',
    },
    secondFromText: ' Z',
    secondReplacement: ';',
  },
  {
    decline: true,
    expectedHost: '/**\n * @example   if (c)\n *     x();\n *       x();\n */\nfunction host() {}',
    host: '/**\n * @example   if (c)\n *     x();\n *       x();\n */\nfunction host() {}',
    id: 'padded-tag-line-shift',
    options: {
      paddedIndent: 2,
    },
    rules: {
      curly: 'error',
    },
  },
  {
    decline: true,
    expectedHost: '/**\n * @example\n * <caption>Nested callbacks</caption>\n * ```js\n * foo(() => {\n *   bar(() => {\n *     x();\n *   })\n * })\n * ```\n */\nfunction host() {}',
    host: '/**\n * @example\n * <caption>Nested callbacks</caption>\n * ```js\n * foo(() => {\n *   bar(() => {\n *     x();\n *   })\n * })\n * ```\n */\nfunction host() {}',
    id: 'caption-regex-shift',
    options: {
      exampleCodeRegex: '```(?:js|javascript)\n([\\s\\S]*?)```',
    },
    rules: {
      semi: 'error',
    },
  },
  {
    decline: true,
    expectedHost: '/**\n * @default\n * [\n *   \'a\',\n *   \'a\',\n * ]\n */\nconst x = 1;\n',
    host: '/**\n * @default\n * [\n *   \'a\',\n *   \'a\',\n * ]\n */\nconst x = 1;\n',
    id: 'default-repeat-shift',
    options: {
      checkDefaults: true,
    },
    rules: {
      quotes: [
        'error',
        'double',
      ],
    },
  },
  {
    expectedHost: '/**\r\n * @example\r\n *   <caption>a &amp; b</caption>\r\n *   let a = 1;\r\n *     let c = 3;\r\n *   var b = 2;\r\n */\r\nfunction host() {}',
    fromText: 'var a = 1;',
    host: '/**\r\n * @example\r\n *   <caption>a &amp; b</caption>\r\n *   var a = 1;\r\n *   var b = 2;\r\n */\r\nfunction host() {}',
    id: 'padded-crlf-caption-multiline',
    options: {
      paddedIndent: 2,
    },
    replacement: 'let a = 1;\n  let c = 3;',
    rules: {
      'probe/replace': 'error',
    },
  },
  {
    expectedHost: '/**\n * @example\n * let a = 1;\n */\nfunction h1() {}\n/**\n * @example\n * f("x");\n */\nfunction h2() {}\n/**\n * @example\n * let c = 3;\n * g("y");\n */\nfunction h3() {}',
    host: '/**\n * @example\n * var a = 1;\n */\nfunction h1() {}\n/**\n * @example\n * f(\'x\');\n */\nfunction h2() {}\n/**\n * @example\n * var c = 3;\n * g(\'y\');\n */\nfunction h3() {}',
    id: 'second-comment',
    rules: {
      'no-var': 'error',
      quotes: [
        'error',
        'double',
      ],
    },
  },
  {
    expectedHost: '/**\r\n * @example\r\n * const value = 1;\r\n * console.log(value);\r\n */\r\nfunction host() {}',
    host: '/**\r\n * @example\r\n * var value = 1;\r\n */\r\nfunction host() {}',
    id: 'crlf-multiline',
    replacement: 'const value = 1;\nconsole.log(value);',
    rules: {
      'probe/replace': 'error',
    },
  },
  {
    expectedHost: '/**\n * @example\n *   const value = 1;\n *   console.log(value);\n */\nfunction host() {}',
    host: '/**\n * @example\n *   var value = 1;\n */\nfunction host() {}',
    id: 'padded-multiline',
    options: {
      paddedIndent: 2,
    },
    replacement: 'const value = 1;\nconsole.log(value);',
    rules: {
      'probe/replace': 'error',
    },
  },
  {
    decline: true,
    expectedHost: '/**\n * @example foo(\n * 1);\n */\nfunction host() {}',
    fromText: 'foo(',
    host: '/**\n * @example foo(\n * 1);\n */\nfunction host() {}',
    id: 'mixed-endpoints',
    range: [
      1,
      7,
    ],
    replacement: 'bar(2',
    rules: {
      'probe/replace': 'error',
    },
  },
  {
    decline: true,
    expectedHost: '/**\n * @example\n * const s = `\n * x@y`;\n */\nfunction host() {}',
    fromText: 'x',
    host: '/**\n * @example\n * const s = `\n * x@y`;\n */\nfunction host() {}',
    id: 'manufactured-tag',
    replacement: '',
    rules: {
      'probe/replace': 'error',
    },
  },
  {
    decline: true,
    expectedHost: '/**\n @example\n var value = 1;\n   \n */\nfunction host() {}',
    fromText: 'var value = 1;\n',
    host: '/**\n @example\n var value = 1;\n   \n */\nfunction host() {}',
    id: 'starless-blank-insert',
    range: [
      16,
      16,
    ],
    replacement: 'void 0;',
    rules: {
      'probe/replace': 'error',
    },
  },
  {
    decline: true,
    expectedHost: '/**\n * @example\n * var value = 1;\n *\n */\nfunction host() {}',
    host: '/**\n * @example\n * var value = 1;\n *\n */\nfunction host() {}',
    id: 'trailing-blank-end',
    rules: {
      'eol-last': [
        'error',
        'never',
      ],
      'no-multiple-empty-lines': [
        'error',
        {
          max: 1,
          maxEOF: 0,
        },
      ],
    },
  },
  {
    decline: true,
    expectedHost: '/**\n * @example\n * var value = "&#99999999" + 1;\n */\nfunction host() {}',
    fromText: '"&#99999999"',
    host: '/**\n * @example\n * var value = "&#99999999" + 1;\n */\nfunction host() {}',
    id: 'entity-out-of-range',
    replacement: '"&#99999999;"',
    rules: {
      'probe/replace': 'error',
    },
  },
  {
    decline: true,
    expectedHost: '/**\n * @example\n * ```js\n * \uFEFFvar value = 1;\n * ```\n */\nfunction host() {}',
    host: '/**\n * @example\n * ```js\n * \uFEFFvar value = 1;\n * ```\n */\nfunction host() {}',
    id: 'example-byte-order-mark',
    options: {
      exampleCodeRegex: '```js\n([\\s\\S]*?)```',
    },
    rules: {
      'no-var': 'error',
    },
  },
  {
    decline: true,
    expectedHost: 'var a = 1 <!-- /** @example\nvar value = 1;\n//*/ c\n',
    host: 'var a = 1 <!-- /** @example\nvar value = 1;\n//*/ c\n',
    hostLanguageOptions: {
      sourceType: 'script',
    },
    id: 'html-comment-script-host',
    rules: {
      'no-var': 'error',
    },
  },
  {
    decline: true,
    expectedHost: 'var a = 1 <!-- /**\n * @example\n * var value = 1;\n */ c\n',
    host: 'var a = 1 <!-- /**\n * @example\n * var value = 1;\n */ c\n',
    hostLanguageOptions: {
      sourceType: 'commonjs',
    },
    id: 'host-parse-error',
    rules: {
      'no-var': 'error',
    },
  },
  {
    expectedHost: 'import x from \'y\';\n/**\n * @example\n * let value = 1;\n */\nexport const s = \'<!-- x -->\';\n',
    host: 'import x from \'y\';\n/**\n * @example\n * var value = 1;\n */\nexport const s = \'<!-- x -->\';\n',
    id: 'module-only-html-comment-string',
    rules: {
      'no-var': 'error',
    },
  },
  {
    expectedHost: '/**\n * @example\n * let value = 1;\n */\nvar s = "-->";\n',
    host: '/**\n * @example\n * var value = 1;\n */\nvar s = "-->";\n',
    hostLanguageOptions: {
      sourceType: 'script',
    },
    id: 'script-html-comment-string',
    options: {
      sourceType: 'script',
    },
    rules: {
      'no-var': 'error',
    },
  },
  {
    decline: true,
    expectedHost: 'export const v = <b>/**\n * @example\n * var value = 1;\n */ c</b>/g;\n',
    host: 'export const v = <b>/**\n * @example\n * var value = 1;\n */ c</b>/g;\n',
    hostLanguageOptions: {
      parser: typescriptEslintParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    id: 'jsx-text-host',
    options: {
      parser: typescriptEslintParser,
    },
    rules: {
      'no-var': 'error',
    },
  },
  {
    expectedHost: '/**\n * @example\n * let value = 1;\n */\nconst v = \'</b><br/>\';\n',
    host: '/**\n * @example\n * var value = 1;\n */\nconst v = \'</b><br/>\';\n',
    id: 'closing-tag-string',
    rules: {
      'no-var': 'error',
    },
  },
  {
    decline: true,
    expectedHost: 'x = a <!-- b /** @example\n var value = 1\n */ + 2 /g;\n',
    host: 'x = a <!-- b /** @example\n var value = 1\n */ + 2 /g;\n',
    hostLanguageOptions: {
      sourceType: 'commonjs',
    },
    id: 'ts-parser-html-comment-script-host',
    options: {
      parser: typescriptEslintParser,
    },
    rules: {
      'no-var': 'error',
    },
  },
  {
    decline: true,
    expectedHost: 'x = a <!-- b /** @example\n var value = 1\n */ + 2 /g;\nreturn;\n',
    host: 'x = a <!-- b /** @example\n var value = 1\n */ + 2 /g;\nreturn;\n',
    hostLanguageOptions: {
      sourceType: 'commonjs',
    },
    id: 'ts-parser-html-comment-commonjs-return',
    options: {
      parser: typescriptEslintParser,
    },
    rules: {
      'no-var': 'error',
    },
  },
  {
    decline: true,
    expectedHost: 'export const v = <T>/** @example\n * var value = 1\n */(x)< /T>/g.source;\n',
    host: 'export const v = <T>/** @example\n * var value = 1\n */(x)< /T>/g.source;\n',
    hostLanguageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    id: 'ts-parser-jsx-spaced-closing-tag',
    options: {
      parser: typescriptEslintParser,
    },
    rules: {
      'no-var': 'error',
    },
  },
  {
    decline: true,
    expectedHost: 'export const v = <T>/** @example\n * var value = 1\n */(x)<\n/T>/g.source;\n',
    host: 'export const v = <T>/** @example\n * var value = 1\n */(x)<\n/T>/g.source;\n',
    hostLanguageOptions: {
      parser: babelEslintParser,
      parserOptions: {
        babelOptions: {
          babelrc: false,
          configFile: false,
          parserOpts: {
            plugins: [
              'jsx',
            ],
          },
        },
        requireConfigFile: false,
      },
    },
    id: 'ts-parser-babel-jsx-host-split-closing-tag',
    options: {
      parser: typescriptEslintParser,
    },
    rules: {
      'no-var': 'error',
    },
  },
  {
    expectedHost: '#!/usr/bin/env node\n/**\n * @example\n * let value = 1;\n */\nconst v = \'</b>\';\n',
    host: '#!/usr/bin/env node\n/**\n * @example\n * var value = 1;\n */\nconst v = \'</b>\';\n',
    id: 'ts-parser-hashbang-closing-tag-string',
    options: {
      parser: typescriptEslintParser,
    },
    rules: {
      'no-var': 'error',
    },
  },
  {
    expectedHost: 'import x from \'y\';\n/**\n * @example\n * let value = 1;\n */\nexport const s = \'<!-- x -->\';\n',
    host: 'import x from \'y\';\n/**\n * @example\n * var value = 1;\n */\nexport const s = \'<!-- x -->\';\n',
    id: 'ts-parser-module-only-html-comment-string',
    options: {
      parser: typescriptEslintParser,
    },
    rules: {
      'no-var': 'error',
    },
  },
  {
    decline: true,
    expectedHost: '/**\n * @example\n * a();\n * @example\n * b();\n */\nfunction host() {}',
    host: '/**\n * @example\n * a();\n * @example\n * b();\n */\nfunction host() {}',
    id: 'eol-last-trailing-blank-lines',
    rules: {
      'eol-last': 'error',
    },
  },
  {
    decline: true,
    expectedHost: '/**\n * @example <caption>Use</caption>\n * var value = 1;\n */\nfunction host() {}',
    host: '/**\n * @example <caption>Use</caption>\n * var value = 1;\n */\nfunction host() {}',
    id: 'fix-leading-blank-line',
    replacement: '\nlet value = 1;',
    rules: {
      'probe/replace': 'error',
    },
  },
  {
    expected: 'a();\n\nb();',
    expectedHost: '/**\n * @example\n * a();\n * \n * b();\n */\nfunction host() {}',
    host: '/**\n * @example\n * a();\n * b();\n */\nfunction host() {}',
    id: 'interior-blank-line',
    rules: {
      'padding-line-between-statements': [
        'error',
        {
          blankLine: 'always',
          next: '*',
          prev: '*',
        },
      ],
    },
  },
  {
    expectedHost: '/**\n * @example\n * let value = 1;\n *\n * @param x\n */\nfunction host(x) {}',
    host: '/**\n * @example\n * var value = 1;\n *\n * @param x\n */\nfunction host(x) {}',
    id: 'trailing-blank-line-kept',
    rules: {
      'no-var': 'error',
    },
  },
  {
    decline: true,
    expectedHost: '/**\n * @example\n * const area = width *\n *   height;\n */\nfunction host() {}',
    host: '/**\n * @example\n * const area = width *\n *   height;\n */\nfunction host() {}',
    id: 'leading-star-operator-linebreak',
    rules: {
      'operator-linebreak': [
        'error', 'before',
      ],
    },
  },
  {
    decline: true,
    expectedHost: '/**\n * @example\n * const value = 2 **\n *   3;\n */\nfunction host() {}',
    host: '/**\n * @example\n * const value = 2 **\n *   3;\n */\nfunction host() {}',
    id: 'leading-star-exponent-operator-linebreak',
    rules: {
      'operator-linebreak': [
        'error', 'before',
      ],
    },
  },
  {
    decline: true,
    expectedHost: '/**\n * @example\n * const o = { *gen() { yield 1; }\n * };\n */\nfunction host() {}',
    host: '/**\n * @example\n * const o = { *gen() { yield 1; }\n * };\n */\nfunction host() {}',
    id: 'leading-star-generator-method',
    rules: {
      'object-curly-newline': [
        'error', 'always',
      ],
    },
  },
  {
    decline: true,
    expectedHost: '/**\n * @example\n * var value = 1;\n */\nfunction host() {}',
    host: '/**\n * @example\n * var value = 1;\n */\nfunction host() {}',
    id: 'leading-star-suggestion',
    replacement: 'let value = 1\n* 2;',
    rules: {
      'probe/replace': 'error',
    },
    suggestion: true,
  },
  {
    expected: 'const sum = a\n  + b;',
    expectedHost: '/**\n * @example\n * const sum = a\n *   + b;\n */\nfunction host() {}',
    host: '/**\n * @example\n * const sum = a +\n *   b;\n */\nfunction host() {}',
    id: 'leading-plus-operator-linebreak',
    rules: {
      'operator-linebreak': [
        'error', 'before',
      ],
    },
  },
  {
    expected: 'const area = width *\n  height;',
    expectedHost: '/**\n * @example\n * const area = width *\n *   height;\n */\nfunction host() {}',
    host: '/**\n * @example\n * const area = width\n *   * height;\n */\nfunction host() {}',
    id: 'leading-star-removed',
    rules: {
      'operator-linebreak': [
        'error', 'after',
      ],
    },
  },
  {
    expected: 'const area = width\n  * height;',
    expectedHost: '/**\n * @example\n * const area = width\n *   * height;\n */\nfunction host() {}',
    host: '/**\n * @example\n * const area = width\n *   * height\n */\nfunction host() {}',
    id: 'leading-star-kept',
    rules: {
      semi: 'error',
    },
  },
  {
    decline: true,
    expectedHost: '/**\n * @example\n * if (\'@noflow\' === y[\'@flow\']) {}\n */\nfunction host() {}',
    host: '/**\n * @example\n * if (\'@noflow\' === y[\'@flow\']) {}\n */\nfunction host() {}',
    id: 'flow-pragma-order',
    rules: {
      yoda: 'error',
    },
  },
  {
    expectedHost: '/**\n * @example\n * if (y === "@noflow") {}\n */\nfunction host() {}',
    host: '/**\n * @example\n * if (y === \'@noflow\') {}\n */\nfunction host() {}',
    id: 'flow-pragma-kept',
    rules: {
      quotes: [
        'error',
        'double',
      ],
    },
  },
  {
    decline: true,
    expectedHost: '/**\n * @example\n * <code>\n * var value = "x";\n * </code>\n * @example\n * <code>\n * var other = 2;\n * </code>\n */\nfunction host() {}',
    fromText: '"x"',
    host: '/**\n * @example\n * <code>\n * var value = "x";\n * </code>\n * @example\n * <code>\n * var other = 2;\n * </code>\n */\nfunction host() {}',
    id: 'fence-swallows-next-tag',
    options: {
      exampleCodeRegex: '<code>([\\s\\S]*?)</code>',
    },
    replacement: '"```"',
    rules: {
      'probe/replace': 'error',
    },
  },
  {
    expectedHost: '/** @example\n * let value = 1;\n */\nfunction host() {}',
    host: '/** @example\n * var value = 1;\n */\nfunction host() {}',
    id: 'first-line-tag',
    rules: {
      'no-var': 'error',
    },
  },
  {
    expectedHost: '/** @example\n * let value = 1;\n * @param {string} a A.\n */\nfunction host(a) {}',
    host: '/** @example\n * var value = 1;\n * @param {string} a A.\n */\nfunction host(a) {}',
    id: 'first-line-tag-before-tag',
    rules: {
      'no-var': 'error',
    },
  },
  {
    expectedHost: '/**\n * @example\n * ```js\n * let value = 1;\n * ```\n * ```js\n * let other = 2;\n * ```\n */\nfunction host() {}',
    host: '/**\n * @example\n * ```js\n * var value = 1;\n * ```\n * ```js\n * var other = 2;\n * ```\n */\nfunction host() {}',
    id: 'two-fences-one-tag',
    options: {
      exampleCodeRegex: '/```js\\n([\\s\\S]*?)```/gv',
    },
    rules: {
      'no-var': 'error',
    },
  },
  {
    decline: true,
    expectedHost: '/**\n * @example\n * a();&#10;&#10;b();\n */\nb();\n',
    fromText: 'b();',
    host: '/**\n * @example\n * a();&#10;&#10;b();\n */\nb();\n',
    id: 'entity-shift-outside-comment',
    replacement: 'c();',
    rules: {
      'probe/replace': 'error',
    },
  },
  {
    decline: true,
    expectedHost: 'a <!--b[`\n/** @example\n * var value = 1;\n */\n//`]\n;\n',
    host: 'a <!--b[`\n/** @example\n * var value = 1;\n */\n//`]\n;\n',
    id: 'html-comment-module-host',
    options: {
      sourceType: 'script',
    },
    rules: {
      'no-var': 'error',
    },
  },
  {
    decline: true,
    expectedHost: '/** @default [\n *   \'a\',\n * ]\n */\nconst x = 1;\n',
    host: '/** @default [\n *   \'a\',\n * ]\n */\nconst x = 1;\n',
    id: 'default-first-line',
    options: {
      checkDefaults: true,
    },
    rules: {
      quotes: [
        'error',
        'double',
      ],
    },
  },
  {
    expectedHost: '/**\r\n * @example\r\n * let value = 1;\r\n * @example\r\n * let other = 2;\r\n */\r\nfunction host() {}',
    host: '/**\r\n * @example\r\n * var value = 1;\r\n * @example\r\n * var other = 2;\r\n */\r\nfunction host() {}',
    id: 'crlf-two-examples',
    rules: {
      'no-var': 'error',
    },
  },
  {
    expectedHost: '/**\n * @example\n * let value = 0;\n * @example\n * let value = 1;\n * @example\n * let value = 2;\n * @example\n * let value = 3;\n * @example\n * let value = 4;\n * @example\n * let value = 5;\n * @example\n * let value = 6;\n * @example\n * let value = 7;\n * @example\n * let value = 8;\n * @example\n * let value = 9;\n * @example\n * let value = 10;\n * @example\n * let value = 11;\n */\nfunction host() {}',
    host: '/**\n * @example\n * var value = 0;\n * @example\n * var value = 1;\n * @example\n * var value = 2;\n * @example\n * var value = 3;\n * @example\n * var value = 4;\n * @example\n * var value = 5;\n * @example\n * var value = 6;\n * @example\n * var value = 7;\n * @example\n * var value = 8;\n * @example\n * var value = 9;\n * @example\n * var value = 10;\n * @example\n * var value = 11;\n */\nfunction host() {}',
    id: 'twelve-examples-one-comment',
    rules: {
      'no-var': 'error',
    },
  },
];

describe('verified processor fix ranges', () => {
  for (const fixture of processorFixFixtures) {
    it(`maps or declines ${fixture.id} without changing unrelated host bytes`, async () => {
      /**
       * @param {string} from
       * @param {string} replacement
       * @param {[number, number]|undefined} range
       * @returns {import('eslint').Rule.RuleModule}
       */
      const makeProbe = (from, replacement, range) => {
        return {
          create (context) {
            return {
              Program (node) {
                const sourceCode = /** @type {import('eslint').SourceCode} */ (context.sourceCode);
                const start = sourceCode.text.indexOf(from);
                if (start < 0) {
                  return;
                }

                /** @param {import('eslint').Rule.RuleFixer} fixer */
                const fix = (fixer) => {
                  return fixer.replaceTextRange(
                    range ?? [
                      start, start + from.length,
                    ], replacement,
                  );
                };

                context.report({
                  message: 'Replace the sample declaration',
                  node,
                  ...(fixture.suggestion ? {
                    suggest: [
                      {
                        desc: 'Use the replacement',
                        fix,
                      },
                    ],
                  } : {
                    fix,
                  }),
                });
              },
            };
          },
          meta: {
            fixable: 'code',
            hasSuggestions: true,
            schema: [],
            type: 'suggestion',
          },
        };
      };

      /** @type {import('eslint').ESLint.Plugin} */
      const probes = {
        rules: {
          replace: makeProbe(fixture.fromText ?? 'var value = 1;', fixture.replacement ?? '', fixture.range),
          replace2: makeProbe(fixture.secondFromText ?? '', fixture.secondReplacement ?? '', undefined),
        },
      };
      /** @type {import('eslint').Linter.Config} */
      const virtualConfig = {
        languageOptions: {
          ecmaVersion: 'latest',
          sourceType: 'module',
        },
        plugins: {
          probe: probes,
        },
        rules: fixture.rules,
      };
      const plugin = getJsdocProcessorPlugin({
        fixExamples: true,
        ...fixture.options,
      });
      const processor = /** @type {import('eslint').Linter.Processor} */ (plugin.processors?.examples);
      const filename = `${import.meta.dirname}/processor-host.js`;
      const files = /** @type {import('eslint').Linter.ProcessorFile[]} */ (
        processor.preprocess?.(fixture.host, filename).slice(1)
      );
      if ([
        'crlf-two-examples', 'fix-cr-line-comment-lf', 'fix-cr-whitespace-lf', 'fix-crcrlf', 'fix-lfcrlf',
      ].includes(fixture.id)) {
        const messages = files.map((file) => {
          return new Linter().verify(file.text, virtualConfig);
        });
        // Program includes the leading blank line in ESLint 10, but starts
        // at the first token in ESLint 9. Capture its line before postprocess
        // mutates the messages, then add the fixture's @example line offset.
        const directLine = messages[0][0].line;
        const tagLine = fixture.host.split(/\r\n|\r|\n/v).findIndex((hostLine) => {
          return hostLine.includes('@example');
        });
        const initial = processor.postprocess?.([
          [], ...messages,
        ], filename);
        expect(initial?.[0]).to.include({
          column: directLine <= 1 ? 13 : 4,
          line: tagLine + directLine,
        });
      }

      if (fixture.expected !== undefined) {
        const oracle = new Linter().verifyAndFix(files[0].text, virtualConfig);
        expect(oracle.output).to.equal('\n' + fixture.expected);
      }

      const eslint = new ESLint({
        fix: true,
        overrideConfig: [
          {
            files: [
              '**/*.js',
            ],
            ...(fixture.hostLanguageOptions && {
              languageOptions: fixture.hostLanguageOptions,
            }),
            plugins: {
              examples: plugin,
            },
            processor: 'examples/examples',
          },
          {
            files: [
              '**/*.md/*.js', '**/*.jsdoc-defaults', '**/*.jsdoc-params', '**/*.jsdoc-properties',
            ],
            ...virtualConfig,
          },
        ],
        overrideConfigFile: true,
      });
      const [
        result,
      ] = await eslint.lintText(fixture.host, {
        filePath: filename,
      });
      let output = result.output ?? fixture.host;
      const suggestions = result.messages.flatMap((message) => {
        return message.suggestions ?? [];
      });
      if (fixture.suggestion && !fixture.decline) {
        expect(suggestions).to.have.lengthOf(1);
        expect(suggestions[0].desc).to.equal('Use the replacement');
        const {
          range,
          text,
        } = suggestions[0].fix;
        output = output.slice(0, range[0]) + text + output.slice(range[1]);
      }

      expect(output).to.equal(fixture.expectedHost);
      if (fixture.decline) {
        expect(result.messages.length).to.be.greaterThan(0);
        expect(result.fixableErrorCount + result.fixableWarningCount).to.equal(0);
        expect(suggestions).to.have.lengthOf(0);
      }

      if (fixture.partial) {
        expect(result.messages.length).to.be.greaterThan(0);
      }

      if (fixture.unsupported) {
        expect(files).to.have.lengthOf(0);
        expect(result.messages).to.have.lengthOf(0);
      }

      if (fixture.clean) {
        expect(result.messages).to.have.lengthOf(0);
      }

      const [
        again,
      ] = await eslint.lintText(output, {
        filePath: filename,
      });
      expect(again.output ?? output).to.equal(output);
    });
  }
});

describe('processor parser-range verification', () => {
  it('declines a fixer when the parser comment range excludes its code', () => {
    const text = '/**\n * @example\n * var value = 1;\n */';
    const plugin = getJsdocProcessorPlugin({
      fixExamples: true,
      parser: {
        /** @param {string} code */
        parseForESLint (code) {
          const ast = /** @type {import('estree').Program & {comments: (import('estree').Comment & {range: [number, number]})[]}} */ (/** @type {unknown} */ (espree.parse(code, {
            comment: true,
            ecmaVersion: 'latest',
            range: true,
          })));
          for (const comment of ast.comments) {
            comment.range[1] = 3;
          }

          return {
            ast,
          };
        },
      },
    });
    const processor = /** @type {import('eslint').Linter.Processor} */ (plugin.processors?.examples);
    const files = processor.preprocess?.(text, 'parser-range.js');
    expect(files).to.have.lengthOf(2);
    const messages = processor.postprocess?.([
      [], [
        {
          column: 1,
          fix: {
            range: [
              1, 4,
            ],
            text: 'let',
          },
          line: 2,
          message: 'Use let',
          ruleId: 'no-var',
          severity: 2,
        },
      ],
    ], 'parser-range.js');
    expect(messages).to.have.lengthOf(1);
    expect(messages?.[0]).not.to.have.property('fix');
  });

  it('declines a fixer when the parser comment range starts inside the comment', () => {
    const text = '/**\n * @example\n * var value = 1;\n */';
    const plugin = getJsdocProcessorPlugin({
      fixExamples: true,
      parser: {
        /** @param {string} code */
        parseForESLint (code) {
          const ast = /** @type {import('estree').Program & {comments: (import('estree').Comment & {range: [number, number]})[]}} */ (/** @type {unknown} */ (espree.parse(code, {
            comment: true,
            ecmaVersion: 'latest',
            range: true,
          })));
          for (const comment of ast.comments) {
            comment.range[0] += 1;
          }

          return {
            ast,
          };
        },
      },
    });
    const processor = /** @type {import('eslint').Linter.Processor} */ (plugin.processors?.examples);
    const files = processor.preprocess?.(text, 'parser-range.js');
    expect(files).to.have.lengthOf(2);
    const messages = processor.postprocess?.([
      [], [
        {
          column: 1,
          fix: {
            range: [
              1, 4,
            ],
            text: 'let',
          },
          line: 2,
          message: 'Use let',
          ruleId: 'no-var',
          severity: 2,
        },
      ],
    ], 'parser-range.js');
    expect(messages).to.have.lengthOf(1);
    expect(messages?.[0]).not.to.have.property('fix');
  });
});

describe('processor fix verification side effects', () => {
  it('keeps only the suggestion that does not form an undecodable entity', async () => {
    const host = '/**\n * @example\n * const s = \'&\\#99999999;\';\n */\nfunction host() {}';
    const eslint = new ESLint({
      overrideConfig: [
        {
          files: [
            '**/*.js',
          ],
          plugins: {
            examples: getJsdocProcessorPlugin({
              fixExamples: true,
            }),
          },
          processor: 'examples/examples',
        },
        {
          files: [
            '**/*.md/*.js',
          ],
          rules: {
            'no-useless-escape': 'error',
          },
        },
      ],
      overrideConfigFile: true,
    });
    const [
      result,
    ] = await eslint.lintText(host, {
      filePath: `${import.meta.dirname}/processor-host.js`,
    });
    expect(result.messages.map(({
      ruleId,
      suggestions,
    }) => {
      return [
        ruleId, suggestions?.map(({
          messageId,
        }) => {
          return messageId;
        }),
      ];
    })).to.deep.equal([
      [
        'no-useless-escape', [
          'escapeBackslash',
        ],
      ],
    ]);
  });

  it('reports a missing caption once when verifying a fix in the same comment', async () => {
    const host = '/**\n * @example\n * f();\n * @example <caption>Use</caption>\n * var value = 1;\n */\nfunction host() {}';
    const plugin = getJsdocProcessorPlugin({
      captionRequired: true,
      fixExamples: true,
    });
    const eslint = new ESLint({
      overrideConfig: [
        {
          files: [
            '**/*.js',
          ],
          plugins: {
            examples: plugin,
          },
          processor: 'examples/examples',
        },
        {
          files: [
            '**/*.md/*.js',
          ],
          rules: {
            'no-var': 'error',
          },
        },
      ],
      overrideConfigFile: true,
    });
    const [
      result,
    ] = await eslint.lintText(host, {
      filePath: `${import.meta.dirname}/processor-host.js`,
    });
    expect(result.messages.map(({
      ruleId,
    }) => {
      return ruleId;
    })).to.deep.equal([
      'no-var', 'jsdoc/example-missing-caption',
    ]);
    expect(result.messages[0].fix?.text).to.equal(
      ' * @example <caption>Use</caption>\n * let value = 1;\n */',
    );
  });

  it('settles when `jsdoc/tag-lines` removes the blank lines `eol-last` wants', async () => {
    const host = '/**\n * Calls things.\n * @example\n * var a = 1;\n * @example\n * b();\n */\nexport function f () {}\n';
    const eslint = new ESLint({
      fix: true,
      overrideConfig: [
        {
          files: [
            '**/*.js',
          ],
          plugins: {
            examples: getJsdocProcessorPlugin({
              fixExamples: true,
            }),
            jsdoc: jsdocPlugin,
          },
          processor: 'examples/examples',
          rules: {
            'jsdoc/tag-lines': 'warn',
          },
        },
        {
          files: [
            '**/*.md/*.js',
          ],
          rules: {
            'eol-last': 'error',
            'no-var': 'error',
          },
        },
      ],
      overrideConfigFile: true,
    });
    const fixed = host.replace('var a', 'let a');
    for (const text of [
      host, fixed,
    ]) {
      const [
        result,
      ] = await eslint.lintText(text, {
        filePath: `${import.meta.dirname}/processor-host.js`,
      });
      expect(result.output ?? text).to.equal(fixed);
      expect(result.messages.map(({
        fix,
        ruleId,
      }) => {
        return [
          ruleId, Boolean(fix),
        ];
      })).to.deep.equal([
        [
          'eol-last', false,
        ],
        [
          'eol-last', false,
        ],
      ]);
    }
  });

  it('keeps an example `*` that `jsdoc/no-multi-asterisks` would take for a gutter', async () => {
    const host = '/**\n * @example\n * const area = width *\n *   height\n */\nexport function area (width, height) {}\n';
    const eslint = new ESLint({
      fix: true,
      overrideConfig: [
        {
          files: [
            '**/*.js',
          ],
          plugins: {
            examples: getJsdocProcessorPlugin({
              fixExamples: true,
            }),
            jsdoc: jsdocPlugin,
          },
          processor: 'examples/examples',
          rules: {
            'jsdoc/no-multi-asterisks': 'warn',
          },
        },
        {
          files: [
            '**/*.md/*.js',
          ],
          rules: {
            'operator-linebreak': [
              'error', 'before',
            ],
          },
        },
      ],
      overrideConfigFile: true,
    });
    const [
      result,
    ] = await eslint.lintText(host, {
      filePath: `${import.meta.dirname}/processor-host.js`,
    });
    expect(result.output ?? host).to.equal(host);
    expect(result.messages.map(({
      fix,
      ruleId,
    }) => {
      return [
        ruleId, Boolean(fix),
      ];
    })).to.deep.equal([
      [
        'operator-linebreak', false,
      ],
    ]);
  });
});

describe('processor fixExamples option', () => {
  const host = '/**\n * @example\n * var a = 1;\n */\n';
  /** @type {import('eslint').ESLint.Plugin} */
  const probe = {
    rules: {
      replace: {
        create (context) {
          return {
            Program (node) {
              const text = /** @type {import('eslint').SourceCode} */ (context.sourceCode).text;
              const from = text.includes('"sq"') ? '"sq"' : 'var a = 1;';
              const start = text.indexOf(from);
              if (start < 0) {
                return;
              }

              const replacement = from === '"sq"' ? '\'sq\'' : 'let a = 1;\n\n';
              /** @param {import('eslint').Rule.RuleFixer} fixer */
              const fix = (fixer) => {
                return fixer.replaceTextRange([
                  start, start + from.length,
                ], replacement);
              };

              context.report({
                fix,
                message: 'Replace sample',
                node,
                suggest: [
                  {
                    desc: 'Replace sample',
                    fix,
                  },
                ],
              });
            },
          };
        },
        meta: {
          fixable: 'code',
          hasSuggestions: true,
          schema: [],
          type: 'suggestion',
        },
      },
    },
  };

  /**
   * @param {object} cfg
   * @param {string} cfg.text
   * @param {import('../src/getJsdocProcessorPlugin.js').JsdocProcessorOptions} [cfg.options]
   * @param {import('eslint').Linter.LanguageOptions} [cfg.hostLanguageOptions]
   * @param {import('eslint').Linter.RulesRecord} [cfg.hostRules]
   * @param {import('eslint').Linter.RulesRecord} [cfg.rules]
   */
  const decline = async ({
    hostLanguageOptions = {},
    hostRules = {},
    options,
    rules = {
      'probe/replace': 'error',
    },
    text,
  }) => {
    const plugin = getJsdocProcessorPlugin(options);
    const processor = /** @type {import('eslint').Linter.Processor} */ (plugin.processors?.examples);
    const virtual = /** @type {import('eslint').Linter.ProcessorFile[]} */ (
      processor.preprocess?.(text, 'option-host.js').slice(1)
    );
    expect(virtual.length).to.be.greaterThan(0);
    const virtualConfig = {
      languageOptions: {
        ecmaVersion: /** @type {const} */ ('latest'),
        parser: espree,
        sourceType: /** @type {const} */ ('module'),
      },
      plugins: {
        probe,
      },
      rules,
    };
    expect(virtual.flatMap((file) => {
      return new Linter().verify(file.text, virtualConfig);
    }).some((message) => {
      return message.fix;
    })).to.equal(true);
    /** @type {import('eslint').Linter.Config[]} */
    const overrideConfig = [
      {
        files: [
          '**/*.js',
        ],
        languageOptions: hostLanguageOptions,
        plugins: {
          examples: plugin,
          jsdoc: jsdocPlugin,
        },
        processor: 'examples/examples',
        rules: hostRules,
      },
      {
        files: [
          '**/*.md/*.js', '**/*.jsdoc-defaults', '**/*.jsdoc-params', '**/*.jsdoc-properties',
        ],
        ...virtualConfig,
      },
    ];
    /** @type {import('eslint').ESLint.Options} */
    const config = {
      overrideConfig,
      overrideConfigFile: true,
    };
    const [
      reported,
    ] = await new ESLint(config).lintText(text, {
      filePath: `${import.meta.dirname}/option-host.js`,
    });
    const messages = reported.messages.filter((message) => {
      return message.ruleId && Object.hasOwn(rules, message.ruleId);
    });
    expect(messages.length).to.be.greaterThan(0);
    for (const message of messages) {
      expect(message).not.to.have.property('fix');
      expect(message).not.to.have.property('suggestions');
    }

    const [
      fixed,
    ] = await new ESLint({
      ...config,
      fix: true,
    }).lintText(text, {
      filePath: `${import.meta.dirname}/option-host.js`,
    });
    expect(fixed.output ?? text).to.equal(text);
  };

  for (const options of [
    undefined, {
      fixExamples: false,
    },
  ]) {
    it(`keeps fixes and suggestions report-only with option ${options ? 'false' : 'absent'}`, async () => {
      await decline({
        options,
        text: '/**\n * @example\n * const a = "sq";\n */\n',
      });
    });
  }

  it('declines Q2 mismatched comment lists while the inner rule offers a fix', async () => {
    await decline({
      hostLanguageOptions: {
        sourceType: 'script',
      },
      options: {
        fixExamples: true,
      },
      rules: {
        'no-var': 'error',
      },
      text: 'x = await /`/;\n' + host + 'y = 1; //`\n',
    });
  });

  it('declines Q4 closing-line blank insertion while the inner rule offers a fix', async () => {
    await decline({
      hostRules: {
        'jsdoc/tag-lines': [
          'warn', 'any',
        ],
      },
      options: {
        fixExamples: true,
      },
      text: '/**\n * @example\n * var a = 1;\n * b(); */\n',
    });
  });

  it('declines a candidate that changes the parser comment list', async () => {
    await decline({
      options: {
        fixExamples: true,
        parser: {
          /** @param {string} code */
          parseForESLint (code) {
            const ast = /** @type {import('estree').Program & {comments: import('estree').Comment[]}} */ (/** @type {unknown} */ (espree.parse(code, {
              comment: true,
              ecmaVersion: 'latest',
              range: true,
              sourceType: 'module',
            })));
            if (code.includes('let a')) {
              ast.comments.length = 0;
            }

            return {
              ast,
            };
          },
        },
      },
      rules: {
        'no-var': 'error',
      },
      text: host,
    });
  });

  it('declines Q5 unsupported JSX parse while the inner rule offers a fix', async () => {
    await decline({
      hostLanguageOptions: {
        parser: babelEslintParser,
        parserOptions: {
          babelOptions: {
            parserOpts: {
              plugins: [
                'typescript', 'jsx',
              ],
            },
          },
          requireConfigFile: false,
        },
      },
      options: {
        fixExamples: true,
        parser: typescriptEslintParser,
      },
      rules: {
        'no-var': 'error',
      },
      text: 'let n: number = 1;\nexport const v = <T>/** @example\n * var a = 1;\n */(x)< /T>/g.source;\n',
    });
  });

  it('declines Q7 gutterless blank insertion while the inner rule offers a fix', async () => {
    await decline({
      options: {
        fixExamples: true,
      },
      text: '/**\n@example\nvar a = 1;\nb();\n*/\n',
    });
  });

  for (const [
    family,
    text,
    options,
  ] of /** @type {[string, string, import('../src/getJsdocProcessorPlugin.js').JsdocProcessorOptions][]} */ ([
      [
        'default', '/** @default [\n * "sq",\n * ]\n */\nconst a = 1;\n', {
          checkDefaults: true,
        },
      ],
      [
        'param', '/** @param [a="sq"]\n */\nfunction f(a) {}\n', {
          checkParams: true,
        },
      ],
      [
        'property', '/** @property [a="sq"]\n */\nconst a = 1;\n', {
          checkProperties: true,
        },
      ],
    ])) {
    it(`example-only fence: ${family} stays report-only with inner fix available`, async () => {
      await decline({
        options: {
          ...options,
          fixExamples: true,
        },
        text,
      });
    });
  }
});
