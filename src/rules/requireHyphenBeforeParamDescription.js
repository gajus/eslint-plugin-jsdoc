import _ from 'lodash';
import iterateJsdoc from '../iterateJsdoc';

export default iterateJsdoc(({
  sourceCode,
  jsdoc,
  report,
  context,
  jsdocNode
}) => {
  let always;

  const jsdocTags = _.filter(jsdoc.tags, {
    tag: 'param'
  });

  if (_.has(context.options, 0)) {
    always = context.options[0] === 'always';
  } else {
    always = true;
  }

  _.forEach(jsdocTags, (jsdocTag) => {
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
        const reg = new RegExp(/(?<=-\s*)\w.*/);
        const replacement = sourceCode.getText(jsdocNode).replace(jsdocTag.description, jsdocTag.description.match(reg));

        return fixer.replaceText(jsdocNode, replacement);
      }, jsdocTag);
    }
  });
});
