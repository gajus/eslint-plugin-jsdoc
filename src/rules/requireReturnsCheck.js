import _ from 'lodash';
import iterateJsdoc from '../iterateJsdoc';

export default iterateJsdoc(({
  jsdoc,
  report,
  functionNode,
  utils
}) => {
  const targetTagName = utils.getPreferredTagName('returns');

  const jsdocTags = _.filter(jsdoc.tags, {
    tag: targetTagName
  });

  const sourcecode = utils.getFunctionSourceCode();

  const voidReturn = jsdocTags.findIndex((vundef) => {
    return ['undefined', 'void'].indexOf(vundef.type) !== -1;
  }) === -1;

  // Implicit return like `() => foo` is ok
  if (functionNode.type === 'ArrowFunctionExpression' && functionNode.expression) {
    return;
  }

  // Async function always returns a promise
  if (functionNode.async) {
    return;
  }

  if (JSON.stringify(jsdocTags) !== '[]' && voidReturn && sourcecode.indexOf('return') < 1) {
    report('Present JSDoc @' + targetTagName + ' declaration but not available return expression in function.');
  }
});
