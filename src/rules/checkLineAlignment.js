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
  return /\S+\s+(?:{{.*?}}|{.*?})\s+\S+\s+(.*)/.exec(lineString)[1];
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
          const spacings = ' '.repeat(expectedPositions[index] - acc.length);

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
const checkAlignedPerTag = (comment, tag, tagIndentation, report) => {
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
      /{{.*?}}|{.*?}|\S+/g,
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

const checkNotAlignedPerTag = (utils, tag) => {
  /*
  start +
  delimiter +
  postDelimiter +
  tag +
  postTag +
  type +
  postType +
  name +
  postName +
  description +
  end
   */
  let spacerProps;
  let contentProps;
  const mightHaveNamepath = utils.tagMightHaveNamepath(tag.tag);
  if (mightHaveNamepath) {
    spacerProps = ['postDelimiter', 'postTag', 'postType', 'postName'];
    contentProps = ['tag', 'type', 'name', 'description'];
  } else {
    spacerProps = ['postDelimiter', 'postTag', 'postType'];
    contentProps = ['tag', 'type', 'description'];
  }

  const {tokens} = tag.source[0];

  const followedBySpace = (idx, callbck) => {
    const nextIndex = idx + 1;

    return spacerProps.slice(nextIndex).some((spacerProp, innerIdx) => {
      const contentProp = contentProps[nextIndex + innerIdx];

      const spacePropVal = tokens[spacerProp];

      const ret = spacePropVal;

      if (callbck) {
        callbck(!ret, contentProp);
      }

      return ret;
    });
  };

  // If checking alignment on multiple lines, need to check other `source`
  //   items
  // Go through `post*` spacing properties and exit to indicate problem if
  //   extra spacing detected
  const ok = !spacerProps.some((spacerProp, idx) => {
    const contentProp = contentProps[idx];
    const contentPropVal = tokens[contentProp];
    const spacerPropVal = tokens[spacerProp];

    // There will be extra alignment if...

    // 1. There is extra whitespace within a single spacer segment OR
    return spacerPropVal.length > 1 ||

      // 2. There is a (single) space, no immediate content, and yet another
      //     space is found subsequently (not separated by intervening content)
      spacerPropVal && !contentPropVal && followedBySpace(idx);
  });
  if (ok) {
    return;
  }
  const fix = () => {
    spacerProps.forEach((spacerProp, idx) => {
      const contentProp = contentProps[idx];
      const contentPropVal = tokens[contentProp];

      if (contentPropVal) {
        tokens[spacerProp] = ' ';
        followedBySpace(idx, (hasSpace, contentPrp) => {
          if (hasSpace) {
            tokens[contentPrp] = '';
          }
        });
      } else {
        tokens[spacerProp] = '';
      }
    });

    utils.setTag(tag, tokens);
  };
  utils.reportJSDoc('Expected JSDoc block lines to not be aligned.', tag, fix, true);
};

export default iterateJsdoc(({
  jsdocNode,
  report,
  context,
  indent,
  utils,
}) => {
  const {
    tags: applicableTags = ['param', 'arg', 'argument', 'property', 'prop', 'returns', 'return'],
  } = context.options[1] || {};

  if (context.options[0] === 'always') {
    // Skip if it contains only a single line.
    if (!jsdocNode.value.includes('\n')) {
      return;
    }

    // `indent` is whitespace from line 1 (`/**`), so slice and account for "/".
    const tagIndentation = indent + ' ';

    applicableTags.forEach((tag) => {
      checkAlignedPerTag(jsdocNode, tag, tagIndentation, report);
    });

    return;
  }

  const foundTags = utils.getPresentTags(applicableTags);
  foundTags.forEach((tag) => {
    checkNotAlignedPerTag(utils, tag);
  });
}, {
  iterateAllJsdocs: true,
  meta: {
    docs: {
      description: 'Reports invalid alignment of JSDoc block lines.',
      url: 'https://github.com/gajus/eslint-plugin-jsdoc#eslint-plugin-jsdoc-rules-check-line-alignment',
    },
    fixable: 'whitespace',
    schema: [
      {
        enum: ['always', 'never'],
        type: 'string',
      },
      {
        additionalProperties: false,
        properties: {
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
    type: 'layout',
  },
});
