import index from '../../src/index.js';
import {
  expect,
} from 'chai';
import {
  Linter,
} from 'eslint';

// `RuleTester` only checks the first fix of a pass, while editors may apply
//   the fix of any single message, so check each message's fix on its own
//   (see https://github.com/gajus/eslint-plugin-jsdoc/issues/770).
describe('`require-param` fixer', () => {
  const code = `
/**
 * Foo.
 */
function foo(a, b, c) {}
`;
  const expected = `
/**
 * Foo.
 * @param a
 * @param b
 * @param c
 */
function foo(a, b, c) {}
`;

  /** @type {import('eslint').Linter.Config} */
  const config = {
    plugins: {
      jsdoc: index,
    },
    rules: {
      'jsdoc/require-param': 'error',
    },
  };

  it('adds each missing `@param` once whichever message is fixed', () => {
    const messages = new Linter().verify(code, config);
    expect(messages).to.have.length(3);

    for (const {
      fix,
    } of messages) {
      if (!fix) {
        throw new Error('Expected a fix');
      }

      expect(
        code.slice(0, fix.range[0]) + fix.text + code.slice(fix.range[1]),
      ).to.equal(expected);
    }
  });

  it('adds each missing `@param` once with `--fix`', () => {
    const {
      messages,
      output,
    } = new Linter().verifyAndFix(code, config);
    expect(messages).to.have.length(0);
    expect(output).to.equal(expected);
  });
});
