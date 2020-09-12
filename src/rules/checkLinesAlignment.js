import {
  set,
} from 'lodash';
import iterateJsdoc from '../iterateJsdoc';

/**
 * Aux method until we consider the dev envs support `String.prototype.matchAll` (Node 12+).
 *
 * @param {string}   string   String that will be checked.
 * @param {RegExp}   regexp   Regular expression to run.
 * @param {Function} callback Function to be called each iteration.
 * @param {int}      limit    Limit of matches that we want to exec.
 *
 * @todo [engine:node@>=12]: Remove function and use `String.prototype.matchAll` instead.
 */
const matchAll = (string, regexp, callback, limit) => {
  let result;
  let index = 0;

  while ((result = regexp.exec(string)) && index <= limit - 1) {
    // eslint-disable-next-line promise/prefer-await-to-callbacks
    callback(result, index++);
  }
};

/**
 * Get the full description from a line.
 *
 * @param {string} lineString The line string.
 *
 * @returns {string} The full description.
 */
const getFullDescription = (lineString) => {
  return /(?:\S+\s+){4}(.*)/.exec(lineString)[1];
};

/**
 * Get the expected positions for each part.
 *
 * @param {int[]} partsMaxLength Max length of each part.
 * @param {int}   indentLevel    JSDoc indent level.
 *
 * @returns {int[]} Expected position for each part.
 */
const getExpectedPositions = (partsMaxLength, indentLevel) => {
  // eslint-disable-next-line unicorn/no-reduce
  return partsMaxLength.reduce(
    (acc, cur, index) => {
      return [...acc, cur + acc[index] + 1];
    },
    [indentLevel],
  );
};

/**
 * Check is not aligned.
 *
 * @param {int[]}   expectedPositions Expected position for each part.
 * @param {Array[]} partsMatrix       Parts matrix.
 *
 * @returns {boolean}
 */
const isNotAligned = (expectedPositions, partsMatrix) => {
  return partsMatrix.some((line) => {
    return line.some(
      ({position}, partIndex) => {
        return position !== expectedPositions[partIndex];
      },
    );
  });
};

/**
 * Fix function creator for the report. It creates a function which fix
 * the JSDoc with the correct alignment.
 *
 * @param {object}  comment           Comment node.
 * @param {int[]}   expectedPositions Array with the expected positions.
 * @param {Array[]} partsMatrix       Parts matrix.
 * @param {RegExp}  lineRegExp        Line regular expression.
 * @param {string}  tagIndentation    Tag indentation.
 *
 * @returns {Function} Function which fixes the JSDoc alignment.
 */
const createFixer = (comment, expectedPositions, partsMatrix, lineRegExp, tagIndentation) => {
  return (fixer) => {
    let lineIndex = 0;

    // Replace every line with the correct spacings.
    const fixed = comment.value.replace(lineRegExp, () => {
      // eslint-disable-next-line unicorn/no-reduce
      return partsMatrix[lineIndex++].reduce(
        (acc, {string}, index) => {
          const spacings = ''.padStart(expectedPositions[index] - acc.length, ' ');

          return acc + (index === 0 ? tagIndentation : spacings) + string;
        },
        '',
      );
    });

    return fixer.replaceText(comment, '/*' + fixed + '*/');
  };
};

/**
 * Check comment per tag.
 *
 * @param {object}   comment        Comment node.
 * @param {string}   tag            Tag string.
 * @param {string}   tagIndentation Tag indentation.
 * @param {Function} report         Report function.
 */
const checkCommentPerTag = (comment, tag, tagIndentation, report) => {
  const lineRegExp = new RegExp(`.*@${tag}[\\s].*`, 'gm');
  const lines = comment.value.match(lineRegExp);

  if (!lines) {
    return;
  }

  /**
   * A matrix containing the current position and the string of each part for each line.
   * 0 - Asterisk.
   * 1 - Tag.
   * 2 - Type.
   * 3 - Variable name.
   * 4 - Description (Optional).
   */
  const partsMatrix = [];

  /**
   * The max length of each part, comparing all the lines.
   */
  const partsMaxLength = [];

  // Loop (lines x parts) to populate partsMatrix and partsMaxLength.
  lines.forEach((lineString, lineIndex) => {
    // All line parts until the first word of the description (if description exists).
    matchAll(
      lineString,
      /\S+/g,
      ({0: match, index: position}, partIndex) => {
        set(partsMatrix, [lineIndex, partIndex], {
          position,
          string: partIndex === 4 ? getFullDescription(lineString) : match,
        });

        const partLength = match.length;
        const maxLength = partsMaxLength[partIndex];

        partsMaxLength[partIndex] = maxLength > partLength ? maxLength : partLength;
      },
      5,
    );
  });

  const expectedPositions = getExpectedPositions(partsMaxLength, tagIndentation.length);

  if (isNotAligned(expectedPositions, partsMatrix)) {
    report(
      'Expected JSDoc block lines to be aligned.',
      createFixer(
        comment,
        expectedPositions,
        partsMatrix,
        lineRegExp,
        tagIndentation,
      ),
    );
  }
};

export default iterateJsdoc(({
  jsdocNode,
  report,
  context,
  indent,
}) => {
  if (context.options[0] === 'never') {
    throw new Error('The `never` option is not yet implemented for this rule.');
  }

  if (context.options[0] !== 'always') {
    return;
  }

  // `indent` is whitespace from line 1 (`/**`), so slice and account for "/".
  const tagIndentation = indent + ' ';

  ['param', 'arg', 'argument', 'property', 'prop'].forEach((tag) => {
    checkCommentPerTag(jsdocNode, tag, tagIndentation, report);
  });
}, {
  iterateAllJsdocs: true,
  meta: {
    docs: {
      description: 'Reports invalid alignment of JSDoc block lines.',
      url: 'https://github.com/gajus/eslint-plugin-jsdoc#eslint-plugin-jsdoc-rules-check-lines-alignment',
    },
    fixable: 'whitespace',
    schema: [
      {
        enum: ['always', 'never'],
        type: 'string',
      },
    ],
    type: 'layout',
  },
});
