import iterateJsdoc from '../iterateJsdoc';

export default iterateJsdoc(({
  sourceCode,
  jsdoc,
  report,
  utils,
  jsdocNode
}) => {
  if (!jsdoc.tags) {
    return;
  }
  jsdoc.tags.forEach((jsdocTag) => {
    const tagName = jsdocTag.tag;
    if (utils.isValidTag(tagName)) {
      let preferredTagName = utils.getPreferredTagName(
        tagName,
        true,
        `Blacklisted tag found (\`@${tagName}\`)`
      );
      let message = `Invalid JSDoc tag (preference). Replace "${tagName}" JSDoc tag with "${preferredTagName}".`;
      if (!preferredTagName) {
        return;
      }
      if (preferredTagName && typeof preferredTagName === 'object') {
        ({message, replacement: preferredTagName} = preferredTagName);
      }

      if (preferredTagName !== tagName) {
        report(message, (fixer) => {
          const replacement = sourceCode.getText(jsdocNode).replace('@' + tagName, '@' + preferredTagName);

          return fixer.replaceText(jsdocNode, replacement);
        }, jsdocTag);
      }
    } else {
      report('Invalid JSDoc tag name "' + tagName + '".', null, jsdocTag);
    }
  });
}, {
  iterateAllJsdocs: true,
  meta: {
    fixable: 'code',
    type: 'suggestion'
  }
});
