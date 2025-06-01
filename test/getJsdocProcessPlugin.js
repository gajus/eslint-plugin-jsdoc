import {
  getJsdocProcessorPlugin,
} from '../src/getJsdocProcessorPlugin.js';
import {
  expect,
} from 'chai';
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
      // @ts-expect-error Ok?
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
        column: 4,
        endColumn: 14,
        endLine: 4,
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
        column: 4,
        endColumn: 14,
        endLine: 4,
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
});
