import {
  RuleTester
} from 'eslint';
import iterateJsdoc from '../../src/iterateJsdoc';
import getJSDocComment from '../../src/eslint/getJSDocComment';

const rule = iterateJsdoc(null, {
  meta: {
    messages: {
      missingJsDoc: 'Missing JSDoc comment.'
    },
    type: 'layout'
  },
  returns (context, sourceCode) {
    return {
      ObjectExpression: (node) => {
        const comment = getJSDocComment(sourceCode, node);
        if (comment !== null) {
          return;
        }
        context.report({
          messageId: 'missingJsDoc',
          node
        });
      }
    };
  }
});

const ruleTester = new RuleTester();

ruleTester.run('getJSDocComment', rule, {
  invalid: [{
    code: 'var a = {};',
    errors: [{messageId: 'missingJsDoc'}]
  }],
  valid: [{
    code: `
    /** Doc */
    var a = {};
    `
  }]
});
