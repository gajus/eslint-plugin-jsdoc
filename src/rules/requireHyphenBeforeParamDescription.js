import _ from 'lodash';
import iterateJsdoc from '../iterateJsdoc';

export default iterateJsdoc(({
  sourceCode,
  jsdoc,
  reportFix,
  jsdocNode
}) => {
  const jsdocTags = _.filter(jsdoc.tags, {
    tag: 'param'
  });

  _.forEach(jsdocTags, (jsdocTag) => {
    if (jsdocTag.description && !_.startsWith(jsdocTag.description, '-')) {
      reportFix('There must be a hyphen before @param description.', (fixer) => {
        let replacement = sourceCode.getText(jsdocNode).replace(jsdocTag.description, '- ' + jsdocTag.description);

        return fixer.replaceText(jsdocNode, replacement);
      });
    }
  });
});
