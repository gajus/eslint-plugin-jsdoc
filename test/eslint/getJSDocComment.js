import {Linter} from 'eslint/lib/linter';
import {assert} from 'chai';
import sinon from 'sinon';
import getJSDocComment from '../../src/eslint/getJSDocComment';

describe('getJSDocComment', () => {
  const linter = new Linter();
  it('should get JSDoc comment for node when the node is an ObjectExpression', () => {
    const code = [
      '/** Desc*/',
      'const A = {',
      '}'
    ].join('\n');

    const assertJSDoc = function (node) {
      const sourceCode = linter.getSourceCode();
      const jsdoc = getJSDocComment(sourceCode, node);

      assert.strictEqual(jsdoc.type, 'Block');
      assert.strictEqual(jsdoc.value, '* Desc');
    };

    const spy = sinon.spy(assertJSDoc);

    linter.defineRule('checker', () => {
      return {ObjectExpression: spy};
    });
    linter.verify(code, {
      parserOptions: {ecmaVersion: 6},
      rules: {checker: 'error'}
    });
    assert.isTrue(spy.calledOnce, 'Event handler should be called.');
  });
});
