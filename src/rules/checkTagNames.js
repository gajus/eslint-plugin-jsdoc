import iterateJsdoc from '../iterateJsdoc';

export default iterateJsdoc(({
  sourceCode,
  jsdoc,
  report,
  utils,
  jsdocNode
}) => {
  jsdoc.tags.forEach((jsdocTag) => {
    if (utils.isValidTag(jsdocTag.tag)) {
      const preferredTagName = utils.getPreferredTagName(jsdocTag.tag);

      if (preferredTagName !== jsdocTag.tag) {
        report('Invalid JSDoc tag (preference). Replace "' + jsdocTag.tag + '" JSDoc tag with "' + preferredTagName + '".', (fixer) => {
          const replacement = sourceCode.getText(jsdocNode).replace('@' + jsdocTag.tag, '@' + preferredTagName);

          return fixer.replaceText(jsdocNode, replacement);
        }, jsdocTag);
      }
    } else {
      report('Invalid JSDoc tag name "' + jsdocTag.tag + '".', null, jsdocTag);
    }
  });
}, {
  meta: {
    fixable: 'code'
  }
});
