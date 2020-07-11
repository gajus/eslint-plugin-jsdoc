import {
  RuleTester,
} from 'eslint';
import {getJSDocComment} from '../../src/eslint/getJSDocComment';
import {getSettings} from '../../src/iterateJsdoc';

const rule = {
  create (context) {
    const sourceCode = context.getSourceCode();
    const settings = getSettings(context);
    if (!settings) {
      return {};
    }

    return {
      ObjectExpression (node) {
        const comment = getJSDocComment(sourceCode, node, settings);
        if (comment !== null) {
          return;
        }
        context.report({
          messageId: 'missingJsDoc',
          node,
        });
      },
    };
  },
  meta: {
    messages: {
      missingJsDoc: 'Missing JSDoc comment.',
    },
    type: 'layout',
  },
};

const ruleTester = new RuleTester();

ruleTester.run('getJSDocComment', rule, {
  invalid: [{
    code: 'var a = {};',
    errors: [{messageId: 'missingJsDoc'}],
  }],
  valid: [{
    code: `
    /** Doc */
    var a = {};
    `,
  }, {
    code: `
    /** Doc */
    // eslint-disable-next-line no-var
    var a = {};
    `,
  }],
});
