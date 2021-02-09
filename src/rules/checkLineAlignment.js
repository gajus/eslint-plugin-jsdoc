import {
  transforms,
} from 'comment-parser';
import {
  rewireSpecs,
} from 'comment-parser/lib/util';
import {
  cloneDeep,
} from 'lodash';
import iterateJsdoc from '../iterateJsdoc';

const {
  flow: commentFlow,
  align: commentAlign,
  indent: commentIndent,
} = transforms;

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

const filterApplicableTags = (jsdoc, applicableTags) => {
  const filteredJsdoc = {
    ...jsdoc,
    source: jsdoc.source.filter((source) => {
      if ('' === source.tokens.tag) {
        return true;
      }

      return applicableTags.includes(source.tokens.tag.replace('@', ''));
    }),
    tags: jsdoc.tags.filter((tag) => {
      return applicableTags.includes(tag.tag);
    }),
  };

  return rewireSpecs(filteredJsdoc);
};

const getJsondocFormatted = ({
  applicableTags,
  indent,
  jsdoc,
  utils,
}) => {
  // It needs to be cloned. Otherwise, the transform overrides the original object.
  const jsdocClone = cloneDeep(jsdoc);
  const transform = commentFlow(commentAlign(), commentIndent(indent.length));
  const filteredClone = filterApplicableTags(jsdocClone, applicableTags);
  const transformedJsdoc = transform(filteredClone);
  const formatted = utils.stringify(transformedJsdoc)

    // Temporary until comment-parser fix: https://github.com/syavorsky/comment-parser/issues/119
    .replace(/\s+\n/g, '\n')

    // Temporary until comment-parser fix: https://github.com/syavorsky/comment-parser/issues/120
    .replace(/(\n\s+)\*\s+@/g, '$1* @');

  const parsed = utils.commentParser({value: formatted}, indent, false);

  return commentFlow(commentAlign())(parsed);
};

const isTagSourcesEqual = (tag, otherTag) => {
  return tag.source.every((source, index) => {
    return source.source === otherTag.source[index].source;
  });
};

const checkAlignment = ({
  applicableTags,
  foundTags,
  indent,
  jsdoc,
  utils,
}) => {
  const jsdocFormatted = getJsondocFormatted({
    applicableTags,
    indent,
    jsdoc,
    utils,
  });

  foundTags.forEach((tag, index) => {
    const formattedTag = jsdocFormatted.tags[index];
    if (!isTagSourcesEqual(tag, formattedTag)) {
      const fix = () => {
        const newSource = formattedTag.source.map((source, sourceIndex) => {
          return {
            ...source,
            number: tag.source[sourceIndex].number,
          };
        });
        utils.replaceTagSource(tag, newSource);
      };
      utils.reportJSDoc('Expected JSDoc block lines to be aligned.', tag, fix, true);
    }
  });
};

export default iterateJsdoc(({
  indent,
  jsdoc,
  jsdocNode,
  context,
  utils,
}) => {
  const {
    tags: applicableTags = ['param', 'arg', 'argument', 'property', 'prop', 'returns', 'return'],
  } = context.options[1] || {};
  const foundTags = utils.getPresentTags(applicableTags);

  if (context.options[0] === 'always') {
    // Skip if it contains only a single line.
    if (!jsdocNode.value.includes('\n')) {
      return;
    }

    checkAlignment({
      applicableTags,
      foundTags,
      indent,
      jsdoc,
      utils,
    });

    return;
  }

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
