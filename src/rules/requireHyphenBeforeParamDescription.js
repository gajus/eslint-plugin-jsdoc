import _ from 'lodash';
import iterateJsdoc from '../iterateJsdoc';

export default iterateJsdoc(({
  sourceCode,
  utils,
  report,
  context,
  jsdocNode
}) => {
  let always;

  const targetTagName = utils.getPreferredTagName('param');

  if (_.has(context.options, 0)) {
    always = context.options[0] === 'always';
  } else {
    always = true;
  }

  utils.forEachTag(targetTagName, (jsdocTag) => {
    if (!jsdocTag.description) {
      return;
    }

    if (always) {
      if (!jsdocTag.description.startsWith('-')) {
        report('There must be a hyphen before @' + targetTagName + ' description.', (fixer) => {
          const lineIndex = jsdocTag.line;
          const sourceLines = sourceCode.getText(jsdocNode).split('\n');
          const replacementLine = sourceLines[lineIndex]
            .replace(jsdocTag.description, '- ' + jsdocTag.description);
          sourceLines.splice(lineIndex, 1, replacementLine);
          const replacement = sourceLines.join('\n');

          return fixer.replaceText(jsdocNode, replacement);
        }, jsdocTag);
      }
    } else if (jsdocTag.description.startsWith('-')) {
      report('There must be no hyphen before @' + targetTagName + ' description.', (fixer) => {
        const [unwantedPart] = /-\s*/.exec(jsdocTag.description);

        const replacement = sourceCode
          .getText(jsdocNode)
          .replace(jsdocTag.description, jsdocTag.description.slice(unwantedPart.length));

        return fixer.replaceText(jsdocNode, replacement);
      }, jsdocTag);
    }
  });
}, {
  meta: {
    fixable: 'code',
    type: 'layout'
  },
  schema: [
    {
      enum: ['always'],
      type: 'string'
    }
  ]
});
