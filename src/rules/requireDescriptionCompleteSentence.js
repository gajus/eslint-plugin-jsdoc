import _ from 'lodash';
import iterateJsdoc from '../iterateJsdoc';

const extractParagraphs = (text) => {
  return text.split(/\n\n/);
};

const isNewLinePrecededByAPeriod = (text) => {
  let lastLineEndsSentence;

  const lines = text.split('\n');

  return !_.some(lines, (line) => {
    if (_.isBoolean(lastLineEndsSentence) && !lastLineEndsSentence && /^[A-Z]/.test(line)) {
      return true;
    }

    lastLineEndsSentence = /\.$/.test(line);

    return false;
  });
};

const isCapitalized = (str) => {
  return str[0] === str[0].toUpperCase();
};

const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const fixUpperCase = (fixer, paragraph, jsdocNode, sourceCode) => {
  let line = paragraph.split('\n')[0];
  let replacement = sourceCode.getText(jsdocNode).replace(line, capitalize(line));
  
  return fixer.replaceText(jsdocNode, replacement);
}

const validateDescription = (description, report, jsdocNode, sourceCode) => {
  if (!description) {
    return false;
  }

  const paragraphs = extractParagraphs(description);

  return _.some(paragraphs, (paragraph, index) => {
    if (!isCapitalized(paragraph)) {
      if (index === 0) {
        report('Description must start with an uppercase character.', (fixer) => {
          return fixUpperCase(fixer, paragraph, jsdocNode, sourceCode);
        });
      } else {
        report('Paragraph must start with an uppercase character.', (fixer) => {
          return fixUpperCase(fixer, paragraph, jsdocNode, sourceCode);
        });
      }

      return true;
    }

    if (!/\.$/.test(paragraph)) {
      report('Sentence must end with a period.', (fixer) => {
        let line = _.last(paragraph.split('\n'));
        let replacement = sourceCode.getText(jsdocNode).replace(line, line + '.');

        return fixer.replaceText(jsdocNode, replacement);
      });

      return true;
    }

    if (!isNewLinePrecededByAPeriod(paragraph)) {
      report('A line of text is started with an uppercase character, but preceding line does not end the sentence.');

      return true;
    }

    return false;
  });
};

export default iterateJsdoc(({
  sourceCode,  
  jsdoc,
  report,
  jsdocNode,
}) => {
  if (validateDescription(jsdoc.description, report, jsdocNode, sourceCode)) {
    return;
  }

  const tags = _.filter(jsdoc.tags, (tag) => {
    return _.includes(['param', 'returns'], tag.tag);
  });

  _.some(tags, (tag) => {
    const description = _.trimStart(tag.description, '- ');

    return validateDescription(description, report, jsdocNode, sourceCode);
  });
});
