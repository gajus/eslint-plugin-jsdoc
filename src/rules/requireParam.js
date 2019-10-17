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

  const preferredTagName = utils.getPreferredTagName({tagName: 'param'});

  const findExpectedIndex = (jsdocTags, indexAtFunctionParams) => {
    const functionTags = jsdocTags.filter(({tag}) => {
      return tag === preferredTagName;
    });
    let expectedIndex = jsdocTags.length;
    jsdocTags.forEach((tag, index) => {
      if (tag.tag === preferredTagName) {
        expectedIndex = index;
        if (functionTags.indexOf(tag) < indexAtFunctionParams) {
          expectedIndex += 1;
        }
      }
    });

    return expectedIndex;
  };

  const missingTags = [];

  functionParameterNames.forEach((functionParameterName, functionParameterIdx) => {
    if (['<ObjectPattern>', '<ArrayPattern>'].includes(functionParameterName)) {
      return;
    }
    if (!jsdocParameterNames.includes(functionParameterName)) {
      missingTags.push({
        functionParameterIdx,
        functionParameterName,
      });
    }
  });

  const fixAll = (missings, tags) => {
    missings.forEach(({functionParameterIdx, functionParameterName}) => {
      const expectedIdx = findExpectedIndex(tags, functionParameterIdx);
      tags.splice(expectedIdx, 0, {
        name: functionParameterName,
        tag: preferredTagName,
      });
    });
  };

  missingTags.forEach(({functionParameterName}, index) => {
    utils.reportJSDoc(`Missing JSDoc @${preferredTagName} "${functionParameterName}" declaration.`, null, () => {
      if (!jsdoc.tags) {
        jsdoc.tags = [];
      }

      // Fix all missing tags at the first time.
      if (index === 0) {
        fixAll(missingTags, jsdoc.tags);
      }
    });
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
