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

  if (_.has(context.options, 0)) {
    always = context.options[0] === 'always';
  } else {
    always = true;
  }

  utils.forEachTag('param', (jsdocTag) => {
    if (!jsdocTag.description) {
      return;
    }

    if (always) {
      if (!_.startsWith(jsdocTag.description, '-')) {
        report('There must be a hyphen before @param description.', (fixer) => {
          const replacement = sourceCode.getText(jsdocNode).replace(jsdocTag.description, '- ' + jsdocTag.description);

          return fixer.replaceText(jsdocNode, replacement);
        }, jsdocTag);
      }
    } else if (_.startsWith(jsdocTag.description, '-')) {
      report('There must be no hyphen before @param description.', (fixer) => {
        const [unwantedPart] = /-\s*/.exec(jsdocTag.description);

        const replacement = sourceCode
          .getText(jsdocNode)
          .replace(jsdocTag.description, jsdocTag.description.slice(unwantedPart.length));

        return fixer.replaceText(jsdocNode, replacement);
      }, jsdocTag);
    }
  });
});
