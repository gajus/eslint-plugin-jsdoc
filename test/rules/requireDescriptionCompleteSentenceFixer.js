import index from '../../src/index.js';
import {
  expect,
} from 'chai';
import {
  Linter,
} from 'eslint';

// `RuleTester` cannot tell a report without a fix from one whose fix changes
//   nothing, so check the messages themselves.
describe('`require-description-complete-sentence` fixer', () => {
  /** @type {import('eslint').Linter.Config} */
  const config = {
    plugins: {
      jsdoc: index,
    },
    rules: {
      'jsdoc/require-description-complete-sentence': [
        'error', {
          abbreviations: [
            'etc.',
          ],
        },
      ],
    },
  };

  for (const [
    title,
    code,
  ] of [
    [
      'an abbreviation', '/**\n * Handles a, b, etc.\n */\nfunction quux () {}\n',
    ],
    [
      'a colon', '/**\n * Supported values:\n */\nfunction quux () {}\n',
    ],
  ]) {
    it(`offers no fix for a sentence ending with ${title}`, () => {
      const messages = new Linter().verify(code, config);
      expect(messages).to.have.length(1);
      expect(messages[0].message).to.equal('Sentences must end with a period.');
      expect(messages[0].fix).to.equal(undefined);
    });
  }
});
