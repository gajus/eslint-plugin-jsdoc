import iterateJsdoc from '../iterateJsdoc';

export default iterateJsdoc(({
  jsdoc,
  utils,
}) => {
  const functionParameterNames = utils.getFunctionParameterNames();
  const jsdocParameterNames = utils.getJsdocParameterNames();
  if (!jsdocParameterNames) {
    return;
  }

  if (utils.avoidDocs()) {
    return;
  }

  // Param type is specified by type in @type
  if (utils.hasTag('type')) {
    return;
  }
  const findExpectedIndex = (jsdocTags, funcParmOrder, tagName) => {
    const docTags = jsdocTags.filter(({tag}) => {
      return tag === tagName;
    });
    let expectedIndex = jsdocTags.length;
    jsdocTags.forEach((tag, idx) => {
      if (tag.tag === tagName) {
        expectedIndex = docTags.indexOf(tag) < funcParmOrder ? idx + 1 : idx - 1;
      }
    });

    return expectedIndex;
  };

  functionParameterNames.forEach((functionParameterName, functionParameterIdx) => {
    if (['<ObjectPattern>', '<ArrayPattern>'].includes(functionParameterName)) {
      return;
    }
    if (!jsdocParameterNames.includes(functionParameterName)) {
      const preferredTagName = utils.getPreferredTagName({tagName: 'param'});
      utils.reportJSDoc(`Missing JSDoc @${preferredTagName} "${functionParameterName}" declaration.`, null, () => {
        if (!jsdoc.tags) {
          jsdoc.tags = [];
        }

        const expectedIdx = findExpectedIndex(jsdoc.tags, functionParameterIdx, preferredTagName);
        jsdoc.tags.splice(expectedIdx, 0, {
          name: functionParameterName,
          tag: preferredTagName,
        });
      });
    }
  });
}, {
  meta: {
    fixable: true,
    schema: [
      {
        additionalProperties: false,
        properties: {
          exemptedBy: {
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
