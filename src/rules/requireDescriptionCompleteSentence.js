import _ from 'lodash';
import {
  RegExtras,
} from 'regextras/dist/main-umd';
import iterateJsdoc from '../iterateJsdoc';

const otherDescriptiveTags = new Set([
  // 'copyright' and 'see' might be good addition, but as the former may be
  //   sensitive text, and the latter may have just a link, they are not
  //   included by default
  'summary', 'file', 'fileoverview', 'overview', 'classdesc', 'todo',
  'deprecated', 'throws', 'exception', 'yields', 'yield',
]);

const extractParagraphs = (text) => {
  return text.split(/(?<![;:])\n\n/u);
};

const extractSentences = (text, abbreviationsRegex) => {
  const txt = text

    // Remove all {} tags.
    .replace(/\{[\s\S]*?\}\s*/gu, '')

    // Remove custom abbreviations
    .replace(abbreviationsRegex, '');

  const sentenceEndGrouping = /([.?!])(?:\s+|$)/u;
  const puncts = RegExtras(sentenceEndGrouping).map(txt, (punct) => {
    return punct;
  });

  return txt

    .split(/[.?!](?:\s+|$)/u)

    // Re-add the dot.
    .map((sentence, idx) => {
      return /^\s*$/u.test(sentence) ? sentence : `${sentence}${puncts[idx] || ''}`;
    });
};

const isNewLinePrecededByAPeriod = (text) => {
  let lastLineEndsSentence;

  const lines = text.split('\n');

  return !lines.some((line) => {
    if (lastLineEndsSentence === false && /^[A-Z][a-z]/u.test(line)) {
      return true;
    }

    lastLineEndsSentence = /[.:?!|]$/u.test(line);

    return false;
  });
};

const isCapitalized = (str) => {
  return str[0] === str[0].toUpperCase();
};

const isTable = (str) => {
  return str.charAt() === '|';
};

const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const validateDescription = (
  description, reportOrig, jsdocNode, abbreviationsRegex,
  sourceCode, tag, newlineBeforeCapsAssumesBadSentenceEnd,
) => {
  if (!description) {
    return false;
  }

  const paragraphs = extractParagraphs(description);

  return paragraphs.some((paragraph, parIdx) => {
    const sentences = extractSentences(paragraph, abbreviationsRegex);

    const fix = (fixer) => {
      let text = sourceCode.getText(jsdocNode);

      if (!/[.:?!]$/u.test(paragraph)) {
        const line = _.last(paragraph.split('\n'));

        text = text.replace(new RegExp(`${_.escapeRegExp(line)}$`, 'mu'), `${line}.`);
      }

      for (const sentence of sentences.filter((sentence_) => {
        return !(/^\s*$/u).test(sentence_) && !isCapitalized(sentence_) &&
          !isTable(sentence_);
      })) {
        const beginning = sentence.split('\n')[0];

        if (tag.tag) {
          const reg = new RegExp(`(@${_.escapeRegExp(tag.tag)}.*)${_.escapeRegExp(beginning)}`, 'u');

          text = text.replace(reg, ($0, $1) => {
            return $1 + capitalize(beginning);
          });
        } else {
          text = text.replace(new RegExp('((?:[.!?]|\\*|\\})\\s*)' + _.escapeRegExp(beginning), 'u'), '$1' + capitalize(beginning));
        }
      }

      return fixer.replaceText(jsdocNode, text);
    };

    const report = (msg, fixer, tagObj) => {
      tagObj.line += parIdx * 2;

      // Avoid errors if old column doesn't exist here
      tagObj.column = 0;
      reportOrig(msg, fixer, tagObj);
    };

    if (sentences.some((sentence) => {
      return !(/^\s*$/u).test(sentence) && !isCapitalized(sentence) && !isTable(sentence);
    })) {
      report('Sentence should start with an uppercase character.', fix, tag);
    }

    const paragraphNoAbbreviations = paragraph.replace(abbreviationsRegex, '');

    if (!/[.!?|]$/u.test(paragraphNoAbbreviations)) {
      report('Sentence must end with a period.', fix, tag);

      return true;
    }

    if (newlineBeforeCapsAssumesBadSentenceEnd && !isNewLinePrecededByAPeriod(paragraphNoAbbreviations)) {
      report('A line of text is started with an uppercase character, but preceding line does not end the sentence.', null, tag);

      return true;
    }

    return false;
  });
};

export default iterateJsdoc(({
  sourceCode,
  context,
  jsdoc,
  report,
  jsdocNode,
  utils,
}) => {
  const options = context.options[0] || {};
  const {
    abbreviations = [],
    newlineBeforeCapsAssumesBadSentenceEnd = false,
  } = options;

  const abbreviationsRegex = abbreviations.length ?
    new RegExp('\\b' + abbreviations.map((abbreviation) => {
      return _.escapeRegExp(abbreviation.replace(/\.$/g, '') + '.');
    }).join('|') + '(?:$|\\s)', 'gu') :
    '';

  if (!jsdoc.tags ||
    validateDescription(jsdoc.description, report, jsdocNode, abbreviationsRegex, sourceCode, {
      line: jsdoc.line + 1,
    }, newlineBeforeCapsAssumesBadSentenceEnd)
  ) {
    return;
  }

  utils.forEachPreferredTag('description', (matchingJsdocTag) => {
    const description = `${matchingJsdocTag.name} ${matchingJsdocTag.description}`.trim();
    validateDescription(description, report, jsdocNode, abbreviationsRegex, sourceCode, matchingJsdocTag, newlineBeforeCapsAssumesBadSentenceEnd);
  }, true);

  const {tagsWithNames} = utils.getTagsByType(jsdoc.tags);
  const tagsWithoutNames = utils.filterTags(({tag: tagName}) => {
    return otherDescriptiveTags.has(tagName) ||
      utils.hasOptionTag(tagName) && !tagsWithNames.some(({tag}) => {
        // If user accidentally adds tags with names (or like `returns`
        //  get parsed as having names), do not add to this list
        return tag === tagName;
      });
  });

  tagsWithNames.some((tag) => {
    const description = _.trimStart(tag.description, '- ');

    return validateDescription(description, report, jsdocNode, abbreviationsRegex, sourceCode, tag, newlineBeforeCapsAssumesBadSentenceEnd);
  });

  tagsWithoutNames.some((tag) => {
    const description = `${tag.name} ${tag.description}`.trim();

    return validateDescription(description, report, jsdocNode, abbreviationsRegex, sourceCode, tag, newlineBeforeCapsAssumesBadSentenceEnd);
  });
}, {
  iterateAllJsdocs: true,
  meta: {
    docs: {
      description: 'Requires that block description, explicit `@description`, and `@param`/`@returns` tag descriptions are written in complete sentences.',
      url: 'https://github.com/gajus/eslint-plugin-jsdoc/blob/master/.README/rules/require-description-complete-sentence.md',
    },
    fixable: 'code',
    schema: [
      {
        additionalProperties: false,
        properties: {
          abbreviations: {
            items: {
              type: 'string',
            },
            type: 'array',
          },
          newlineBeforeCapsAssumesBadSentenceEnd: {
            type: 'boolean',
          },
          tags: {
            items: {
              type: 'string',
            },
            type: 'array',
          },
        },
        type: 'object',
      },
    ],
    type: 'suggestion',
  },
});
