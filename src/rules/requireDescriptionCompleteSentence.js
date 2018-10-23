import _ from 'lodash';
import iterateJsdoc from '../iterateJsdoc';

const extractParagraphs = (text) => {
  return text.split(/\n\n/);
};

const extractSentences = (text) => {
  return text

    // Remove all {} tags.
    .replace(/\{[\s\S]*?\}\s*/g, '')
    .split(/[.?!](?:\s+|$)/)

    // Ignore sentences with only whitespaces.
    .filter((sentence) => {
      return !/^\s*$/.test(sentence);
    })

    // Re-add the dot.
    .map((sentence) => {
      return sentence + '.';
    });
};

const isNewLinePrecededByAPeriod = (text) => {
  let lastLineEndsSentence;

  const lines = text.split('\n');

  return !_.some(lines, (line) => {
    if (_.isBoolean(lastLineEndsSentence) && !lastLineEndsSentence && /^[A-Z]/.test(line)) {
      return true;
    }

    lastLineEndsSentence = /[.:?!]$/.test(line);

    return false;
  });
};

const isCapitalized = (str) => {
  return str[0] === str[0].toUpperCase();
};

const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const validateDescription = (description, report, jsdocNode, sourceCode, tag) => {
  if (!description) {
    return false;
  }

  const paragraphs = extractParagraphs(description);

  return _.some(paragraphs, (paragraph) => {
    const sentences = extractSentences(paragraph);

    const fix = (fixer) => {
      let text = sourceCode.getText(jsdocNode);

      if (!/[.:?!]$/.test(paragraph)) {
        const line = _.last(paragraph.split('\n'));

        text = text.replace(new RegExp(_.escapeRegExp(line) + '$', 'm'), line + '.');
      }

      for (const sentence of sentences.filter((sentence_) => {
        return !isCapitalized(sentence_);
      })) {
        const beginning = sentence.split('\n')[0];

        if (tag) {
          const reg = new RegExp('(@' + _.escapeRegExp(tag) + '.*)' + _.escapeRegExp(beginning));

          text = text.replace(reg, ($0, $1) => {
            return $1 + capitalize(beginning);
          });
        } else {
          text = text.replace(beginning, capitalize(beginning));
        }
      }

      return fixer.replaceText(jsdocNode, text);
    };

    if (_.some(sentences, (sentence) => {
      return !isCapitalized(sentence);
    })) {
      report('Sentence should start with an uppercase character.', fix);
    }

    if (!/[.!?]$/.test(paragraph)) {
      report('Sentence must end with a period.', fix);

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
  jsdocNode
}) => {
  if (validateDescription(jsdoc.description, report, jsdocNode, sourceCode)) {
    return;
  }

  const tags = _.filter(jsdoc.tags, (tag) => {
    return _.includes(['param', 'arg', 'argument', 'returns', 'return'], tag.tag);
  });

  _.some(tags, (tag) => {
    const description = _.trimStart(tag.description, '- ');

    return validateDescription(description, report, jsdocNode, sourceCode, tag.tag);
  });
});
