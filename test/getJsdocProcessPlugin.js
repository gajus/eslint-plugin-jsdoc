import {
  expect,
} from 'chai';
import {parser as typescriptEslintParser} from 'typescript-eslint';
import {
  getJsdocProcessorPlugin
} from '../src/getJsdocProcessorPlugin.js';

/**
 * @param {{
 *   options?: import('../src/getJsdocProcessorPlugin.js').JsdocProcessorOptions,
 *   filename: string,
 *   text: string,
 *   result: (string|import('eslint').Linter.ProcessorFile)[]
 * }} cfg
 */
function check ({options, filename, text, result}) {
  const plugin = getJsdocProcessorPlugin(options);
  const results = plugin.processors.examples.preprocess(
    text, filename
  );
  expect(results).to.deep.equal(result);
}

describe('`getJsdocProcessorPlugin`', function () {
  it('returns text and files', function () {
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
      text,
      result: [
        text,
        {
          text: `\ndoSth('a');`,
          filename: 'something.md/*.js'
        }
      ]
    });
  });

  it('returns text and files (recovering from fatal error)', function () {
    const filename = 'something.js';
    const text = `doSth(`;
    check({
      filename,
      text,
      result: [
        text
      ]
    });
  });

  it('returns text and files with `exampleCodeRegex`', function () {
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
      options,
      filename,
      text,
      result: [
        text,
        {
          text: `\ndoSth('a');\n`,
          filename: 'something.md/*.js'
        }
      ]
    });
  });

  it('returns text and files with `exampleCodeRegex` (no parentheses)', function () {
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
      options,
      filename,
      text,
      result: [
        text,
        {
          text: `// begin\nalert('hello')\n// end`,
          filename: 'something.md/*.js'
        }
      ]
    });
  });

  it('returns text and files with missing caption', function () {
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
      text, filename
    );
    expect(results).to.deep.equal([
      text,
      {
        text: `\nquux(); // does something useful\n`,
        filename: 'something.md/*.js'
      }
    ]);

    const postResults = plugin.processors.examples.postprocess(
      [[]], filename
    );
    expect(postResults.length).to.equal(1);
  });

  it('returns text and files (inline example)', function () {
    const options = {
    };
    const filename = 'something.js';
    const text = `
      /**
       * @example alert('hello')
       */
      function quux () {

      }
    `;
    check({
      options,
      filename,
      text,
      result: [
        text,
        {
          text: `alert('hello')`,
          filename: 'something.md/*.js'
        }
      ]
    });
  });

  it('returns text and files (no asterisk example)', function () {
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
      options,
      filename,
      text,
      result: [
        text,
        {
          text: `\nalert('hello');\n`,
          filename: 'something.md/*.js'
        }
      ]
    });
  });

  it('returns text and files (with `rejectExampleCodeRegex`)', function () {
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
      options,
      filename,
      text,
      result: [
        text,
        {
          text: `quux2();`,
          filename: 'something.md/*.js'
        }
      ]
    });
  });

  it('returns text and files (with `matchingFileName`)', function () {
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
      options,
      filename,
      text,
      result: [
        text,
        {
          text: `const j = 5;\nquux2();`,
          filename: '../../jsdocUtils.js'
        }
      ]
    });
  });

  it('returns text and files (with `paddedIndent`)', function () {
    const options = {
      paddedIndent: 2
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
      options,
      filename,
      text,
      result: [
        text,
        {
          text: `const i = 5;\nquux2()`,
          filename: 'something.md/*.js'
        }
      ]
    });
  });

  it('returns text and files (with `parser`)', function () {
    const options = {
      parser: typescriptEslintParser
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
      // @ts-expect-error Ok?
      options,
      filename,
      text,
      result: [
        text,
        {
          text: `\nconst list: number[] = [1, 2, 3]\nquux(list);`,
          filename: 'something.md/*.js'
        }
      ]
    });
  });

  it('returns text and files (with multiple fenced blocks)', function () {
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
      options,
      filename,
      text,
      result: [
        text,
        {
          text: `import popup from './popup'\nconst aConstInSameScope = 5;\n`,
          filename: 'something.md/*.js'
        },
        {
          text: `const aConstInSameScope = 7;\npopup('Hello!')\n`,
          filename: 'something.md/*.js'
        }
      ]
    });
  });

  it('returns text and files (for @default)', function () {
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
      options,
      filename,
      text,
      result: [
        text,
        {
          text: `('abc')`,
          filename: 'something.jsdoc-defaults'
        }
      ]
    });
  });

  it('returns text and files (for @param)', function () {
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
      options,
      filename,
      text,
      result: [
        text,
        {
          text: `('abc')`,
          filename: 'something.jsdoc-params'
        }
      ]
    });
  });

  it('returns text and files (for @property)', function () {
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
      options,
      filename,
      text,
      result: [
        text,
        {
          text: `('abc')`,
          filename: 'something.jsdoc-properties'
        }
      ]
    });
  });

  it('returns text and files (with caption)', function () {
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
      options,
      filename,
      text,
      result: [
        text,
        {
          text: ` test()\n`,
          filename: 'something.md/*.js'
        }
      ]
    });
  });

  it('returns text and files (with dummy filename)', function () {
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
      options,
      filename,
      text,
      result: [
        text,
        {
          text: `const i = 5;`,
          filename: 'dummy.md/*.js'
        }
      ]
    });
  });

  it('returns text and files (with empty default)', function () {
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
      options,
      filename,
      text,
      result: [
        text
      ]
    });
  });

  it('returns text and files (with property default missing)', function () {
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
      options,
      filename,
      text,
      result: [
        text
      ]
    });
  });

  it('returns text and files (with param default missing)', function () {
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
      options,
      filename,
      text,
      result: [
        text
      ]
    });
  });

  it('returns text and files and postprocesses error', function () {
    const options = {
    };
    const filename = 'something.js';
    const text = `
/**
 * @example alert('a');
 */
    `;

    const plugin = getJsdocProcessorPlugin(options);
    const results = plugin.processors.examples.preprocess(
      text, filename
    );
    expect(results).to.deep.equal([
      text,
      {
        text: `alert('a');`,
        filename: 'something.md/*.js'
      }
    ]);

    const postResults = plugin.processors.examples.postprocess(
      [[], [
        {
          ruleId: 'no-alert',
          severity: 2,
          message: 'Unexpected alert.',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 11
        }
      ]], filename
    );
    expect(postResults).to.deep.equal([
      {
        ruleId: 'no-alert',
        severity: 2,
        message: '@example error (no-alert): Unexpected alert.',
        line: 3,
        column: 4,
        endLine: 4,
        endColumn: 14
      }
    ]);
  });

  it('returns text and files and postprocesses warning', function () {
    const options = {
    };
    const filename = 'something.js';
    const text = `
/**
 * @example alert('a');
 */
    `;

    const plugin = getJsdocProcessorPlugin(options);
    const results = plugin.processors.examples.preprocess(
      text, filename
    );
    expect(results).to.deep.equal([
      text,
      {
        text: `alert('a');`,
        filename: 'something.md/*.js'
      }
    ]);

    const postResults = plugin.processors.examples.postprocess(
      [[], [
        {
          ruleId: 'no-alert',
          severity: 1,
          message: 'Unexpected alert.',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 11
        }
      ]], filename
    );
    expect(postResults).to.deep.equal([
      {
        ruleId: 'no-alert',
        severity: 1,
        message: '@example warning (no-alert): Unexpected alert.',
        line: 3,
        column: 4,
        endLine: 4,
        endColumn: 14
      }
    ]);
  });

  it('returns text and files and postprocesses fatal error', function () {
    const options = {
    };
    const filename = 'something.js';
    const text = `
      /**
       * @example
       * alert(
       */
    `;

    const plugin = getJsdocProcessorPlugin(options);
    const results = plugin.processors.examples.preprocess(
      text, filename
    );
    expect(results).to.deep.equal([
      text,
      {
        text: `\nalert(`,
        filename: 'something.md/*.js'
      }
    ]);

    const postResults = plugin.processors.examples.postprocess(
      [[], [
        {
          ruleId: null,
          fatal: true,
          severity: 2,
          message: 'Parsing error: Unexpected token',
          line: 2,
          column: 7
        }
      ]], filename
    );
    expect(postResults).to.deep.equal([
      {
        ruleId: null,
        fatal: true,
        severity: 2,
        message: '@example error: Fatal: Parsing error: Unexpected token',
        line: 4,
        column: 16,
        endLine: 4,
        endColumn: 16
      }
    ]);
  });

  it('returns text and files, with `checkExamples: false`', function () {
    const options = {
      checkExamples: false
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
      options,
      filename,
      text,
      result: [
        text
      ]
    });
  });
});
