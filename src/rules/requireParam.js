import iterateJsdoc from '../iterateJsdoc';

export default iterateJsdoc(({
  jsdoc,
  utils,
}) => {
  const functionParameterNames = utils.getFunctionParameterNames();
  const jsdocParameterNames = utils.getJsdocNames('param');
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

    if (jsdocParameterNames && !jsdocParameterNames.find(({name}) => {
      return name === functionParameterName;
    })) {
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
    // Fix all missing tags the first time.
    const fixer = index > 0 ? null : () => {
      if (!jsdoc.tags) {
        jsdoc.tags = [];
      }

      fixAll(missingTags, jsdoc.tags);
    };
    utils.reportJSDoc(`Missing JSDoc @${preferredTagName} "${functionParameterName}" declaration.`, null, fixer);
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
