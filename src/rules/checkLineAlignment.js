import {
  transforms,
} from 'comment-parser';
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

const checkAlignment = ({
  indent,
  jsdoc,
  jsdocNode,
  report,
  utils,
}) => {
  const transform = commentFlow(commentAlign(), commentIndent(indent.length));
  const transformedJsdoc = transform(jsdoc);

  const comment = '/*' + jsdocNode.value + '*/';
  const formatted = utils.stringify(transformedJsdoc)
    .trimStart()

    // Temporary until comment-parser fix: https://github.com/syavorsky/comment-parser/issues/119
    .replace(/\s+\n/g, '\n')

    // Temporary until comment-parser fix: https://github.com/syavorsky/comment-parser/issues/120
    .replace(/(\n\s+)\*\s+@/g, '$1* @');

  if (comment !== formatted) {
    report(
      'Expected JSDoc block lines to be aligned.',
      (fixer) => {
        return fixer.replaceText(jsdocNode, formatted);
      },
    );
  }
};

export default iterateJsdoc(({
  indent,
  jsdoc,
  jsdocNode,
  report,
  context,
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

    checkAlignment({
      indent,
      jsdoc,
      jsdocNode,
      report,
      utils,
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
