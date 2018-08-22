import _ from 'lodash';
import iterateJsdoc from '../iterateJsdoc';

export default iterateJsdoc(({
  sourceCode,
  jsdoc,
  report,
  jsdocNode
}) => {
  const jsdocTags = _.filter(jsdoc.tags, {
    tag: 'param'
  });

  _.forEach(jsdocTags, (jsdocTag) => {
    if (jsdocTag.description && !_.startsWith(jsdocTag.description, '-')) {
      report('There must be a hyphen before @param description.', (fixer) => {
        const replacement = sourceCode.getText(jsdocNode).replace(jsdocTag.description, `- ${jsdocTag.description}`);

        return fixer.replaceText(jsdocNode, replacement);
      });
    }
  });
});
