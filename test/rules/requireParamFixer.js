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

describe('`require-param` with `check-tag-names`', () => {
  it('leaves parameters written with an alias to `check-tag-names`', () => {
    const code = `
/**
 * Joins two values.
 * @arg {string} a The first.
 * @argument {string} b The second.
 */
function join(a, b) {}
`;
    const {
      messages,
      output,
    } = new Linter().verifyAndFix(code, {
      plugins: {
        jsdoc: index,
      },
      rules: {
        'jsdoc/check-tag-names': 'error',
        'jsdoc/require-param': 'error',
      },
    });
    expect(messages).to.have.length(0);
    expect(output).to.equal(`
/**
 * Joins two values.
 * @param {string} a The first.
 * @param {string} b The second.
 */
function join(a, b) {}
`);
  });
});
