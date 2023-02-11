import {
  transforms,
} from 'comment-parser';
import alignTransform from '../alignTransform';
import iterateJsdoc from '../iterateJsdoc';

const {
  flow: commentFlow,
} = transforms;

const checkNotAlignedPerTag = (utils, tag, customSpacings) => {
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
  end +
  lineEnd
   */
  let spacerProps;
  let contentProps;
  const mightHaveNamepath = utils.tagMightHaveNamepath(tag.tag);
  if (mightHaveNamepath) {
    spacerProps = [
      'postDelimiter', 'postTag', 'postType', 'postName',
    ];
    contentProps = [
      'tag', 'type', 'name', 'description',
    ];
  } else {
    spacerProps = [
      'postDelimiter', 'postTag', 'postType',
    ];
    contentProps = [
      'tag', 'type', 'description',
    ];
  }

  const {
    tokens,
  } = tag.source[0];

  const followedBySpace = (idx, callbck) => {
    const nextIndex = idx + 1;

    return spacerProps.slice(nextIndex).some((spacerProp, innerIdx) => {
      const contentProp = contentProps[nextIndex + innerIdx];

      const spacePropVal = tokens[spacerProp];

      const ret = spacePropVal;

      if (callbck) {
        callbck(!ret, contentProp);
      }

      return ret && (callbck || !contentProp);
    });
  };

  const postHyphenSpacing = customSpacings?.postHyphen ?? 1;
  const exactHyphenSpacing = new RegExp(`^\\s*-\\s{${postHyphenSpacing},${postHyphenSpacing}}(?!\\s)`, 'u');
  const hasNoHyphen = !(/^\s*-(?!$)/u).test(tokens.description);
  const hasExactHyphenSpacing = exactHyphenSpacing.test(
    tokens.description,
  );

  // If checking alignment on multiple lines, need to check other `source`
  //   items
  // Go through `post*` spacing properties and exit to indicate problem if
  //   extra spacing detected
  const ok = !spacerProps.some((spacerProp, idx) => {
    const contentProp = contentProps[idx];
    const contentPropVal = tokens[contentProp];
    const spacerPropVal = tokens[spacerProp];
    const spacing = customSpacings?.[spacerProp] || 1;

    // There will be extra alignment if...

    // 1. The spaces don't match the space it should have (1 or custom spacing) OR
    return spacerPropVal.length !== spacing && spacerPropVal.length !== 0 ||

      // 2. There is a (single) space, no immediate content, and yet another
      //     space is found subsequently (not separated by intervening content)
      spacerPropVal && !contentPropVal && followedBySpace(idx);
  }) && (hasNoHyphen || hasExactHyphenSpacing);
  if (ok) {
    return;
  }

  const fix = () => {
    for (const [
      idx,
      spacerProp,
    ] of spacerProps.entries()) {
      const contentProp = contentProps[idx];
      const contentPropVal = tokens[contentProp];

      if (contentPropVal) {
        const spacing = customSpacings?.[spacerProp] || 1;
        tokens[spacerProp] = ''.padStart(spacing, ' ');
        followedBySpace(idx, (hasSpace, contentPrp) => {
          if (hasSpace) {
            tokens[contentPrp] = '';
          }
        });
      } else {
        tokens[spacerProp] = '';
      }
    }

    if (!hasExactHyphenSpacing) {
      const hyphenSpacing = /^\s*-\s*/u;
      tokens.description = tokens.description.replace(
        hyphenSpacing, '-' + ''.padStart(postHyphenSpacing, ' '),
      );
    }

    utils.setTag(tag, tokens);
  };

  utils.reportJSDoc('Expected JSDoc block lines to not be aligned.', tag, fix, true);
};

const checkAlignment = ({
  customSpacings,
  indent,
  jsdoc,
  jsdocNode,
  preserveMainDescriptionPostDelimiter,
  report,
  tags,
  utils,
}) => {
  const transform = commentFlow(
    alignTransform({
      customSpacings,
      indent,
      preserveMainDescriptionPostDelimiter,
      tags,
    }),
  );
  const transformedJsdoc = transform(jsdoc);

  const comment = '/*' + jsdocNode.value + '*/';
  const formatted = utils.stringify(transformedJsdoc)
    .trimStart();

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
    tags: applicableTags = [
      'param', 'arg', 'argument', 'property', 'prop', 'returns', 'return',
    ],
    preserveMainDescriptionPostDelimiter,
    customSpacings,
  } = context.options[1] || {};

  if (context.options[0] === 'always') {
    // Skip if it contains only a single line.
    if (!jsdocNode.value.includes('\n')) {
      return;
    }

    checkAlignment({
      customSpacings,
      indent,
      jsdoc,
      jsdocNode,
      preserveMainDescriptionPostDelimiter,
      report,
      tags: applicableTags,
      utils,
    });

    return;
  }

  const foundTags = utils.getPresentTags(applicableTags);
  for (const tag of foundTags) {
    checkNotAlignedPerTag(utils, tag, customSpacings);
  }
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
        enum: [
          'always', 'never',
        ],
        type: 'string',
      },
      {
        additionalProperties: false,
        properties: {
          customSpacings: {
            additionalProperties: false,
            properties: {
              postDelimiter: {
                type: 'integer',
              },
              postHyphen: {
                type: 'integer',
              },
              postName: {
                type: 'integer',
              },
              postTag: {
                type: 'integer',
              },
              postType: {
                type: 'integer',
              },
            },
          },
          preserveMainDescriptionPostDelimiter: {
            default: false,
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
    type: 'layout',
  },
});
