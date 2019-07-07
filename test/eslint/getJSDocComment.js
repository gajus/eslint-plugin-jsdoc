import {
  RuleTester
} from 'eslint';
import getJSDocComment from '../../src/eslint/getJSDocComment';

/* eslint-disable sort-keys */
const rule = {
  meta: {
    messages: {
      missingJsDoc: 'Missing JSDoc comment.'
    },
    type: 'layout'
  },
  create (context) {
    const sourceCode = context.getSourceCode();

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
};

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
