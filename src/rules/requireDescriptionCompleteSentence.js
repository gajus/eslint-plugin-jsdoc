import _ from 'lodash';
import {RegExtras} from 'regextras/dist/main-umd';
import iterateJsdoc from '../iterateJsdoc';

const extractParagraphs = (text) => {
  return text.split(/\n\n/);
};

const extractSentences = (text) => {
  const txt = text

    // Remove all {} tags.
    .replace(/\{[\s\S]*?\}\s*/g, '');

  const sentenceEndGrouping = /([.?!])(?:\s+|$)/;
  const puncts = RegExtras(sentenceEndGrouping).map(txt, (punct) => {
    return punct;
  });

  return txt

    .split(/[.?!](?:\s+|$)/)

    // Re-add the dot.
    .map((sentence, idx) => {
      return /^\s*$/.test(sentence) ? sentence : `${sentence}${puncts[idx] || ''}`;
    });
};

const isNewLinePrecededByAPeriod = (text) => {
  let lastLineEndsSentence;

  const lines = text.split('\n');

  return !lines.some((line) => {
    if (typeof lastLineEndsSentence === 'boolean' && !lastLineEndsSentence && /^[A-Z]/.test(line)) {
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

  return paragraphs.some((paragraph) => {
    const sentences = extractSentences(paragraph);

    const fix = (fixer) => {
      let text = sourceCode.getText(jsdocNode);

      if (!/[.:?!]$/.test(paragraph)) {
        const line = _.last(paragraph.split('\n'));

        text = text.replace(new RegExp(`${_.escapeRegExp(line)}$`, 'm'), `${line}.`);
      }

      for (const sentence of sentences.filter((sentence_) => {
        return !(/^\s*$/).test(sentence_) && !isCapitalized(sentence_);
      })) {
        const beginning = sentence.split('\n')[0];

        if (tag) {
          const reg = new RegExp(`(@${_.escapeRegExp(tag)}.*)${_.escapeRegExp(beginning)}`);

          text = text.replace(reg, ($0, $1) => {
            return $1 + capitalize(beginning);
          });
        } else {
          text = text.replace(beginning, capitalize(beginning));
        }
      }

      return fixer.replaceText(jsdocNode, text);
    };

    if (sentences.some((sentence) => {
      return !(/^\s*$/).test(sentence) && !isCapitalized(sentence);
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
  jsdocNode,
  utils
}) => {
  if (!jsdoc.tags ||
    validateDescription(jsdoc.description, report, jsdocNode, sourceCode)
  ) {
    return;
  }

  utils.forEachPreferredTag('description', (matchingJsdocTag, targetTagName) => {
    const description = `${matchingJsdocTag.name} ${matchingJsdocTag.description}`.trim();
    validateDescription(description, report, jsdocNode, sourceCode, targetTagName);
  });

  const tags = jsdoc.tags.filter((tag) => {
    return ['param', 'arg', 'argument', 'returns', 'return'].includes(tag.tag);
  });

  tags.some((tag) => {
    const description = _.trimStart(tag.description, '- ');

    return validateDescription(description, report, jsdocNode, sourceCode, tag.tag);
  });
}, {
  iterateAllJsdocs: true,
  meta: {
    fixable: 'code',
    type: 'suggestion'
  }
});
