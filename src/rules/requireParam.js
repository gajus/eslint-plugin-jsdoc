import iterateJsdoc from '../iterateJsdoc';

type T = [string, () => T];
const rootNamer = (desiredRoots: string[], currentIndex: number): T => {
  let name;
  let idx = currentIndex;
  const incremented = desiredRoots.length <= 1;
  if (incremented) {
    const base = desiredRoots[0];
    const suffix = idx++;
    name = `${base}${suffix}`;
  } else {
    name = desiredRoots.shift();
  }

  return [name, incremented, () => {
    return rootNamer(desiredRoots, idx);
  }];
};

export default iterateJsdoc(({
  jsdoc,
  node,
  utils,
  context,
}) => {
  const functionParameterNames = utils.getFunctionParameterNames();
  const preferredTagName = utils.getPreferredTagName({tagName: 'param'});
  if (!preferredTagName) {
    return;
  }
  const jsdocParameterNames = utils.getJsdocTagsDeep(preferredTagName);

  const shallowJsdocParameterNames = jsdocParameterNames.filter((tag) => {
    return !tag.name.includes('.');
  }).map((tag, idx) => {
    return {...tag,
      idx};
  });

  if (utils.avoidDocs()) {
    return;
  }

  // Param type is specified by type in @type
  if (utils.hasTag('type')) {
    return;
  }

  const {
    enableFixer = true,
    enableRootFixer = true,
    checkRestProperty = false,
    enableRestElementFixer = true,
  } = context.options[0] || {};

  const missingTags = [];
  const flattenedRoots = utils.flattenRoots(functionParameterNames);
  const paramIndex = flattenedRoots.reduce((acc, cur, idx) => {
    acc[cur] = idx;

    return acc;
  }, {});

  const findExpectedIndex = (jsdocTags, indexAtFunctionParams) => {
    const remainingRoots = functionParameterNames.slice(indexAtFunctionParams || 0);
    const foundIndex = jsdocTags.findIndex(({name, newAdd}) => {
      return !newAdd && remainingRoots.some((remainingRoot) => {
        return Array.isArray(remainingRoot) ?
          remainingRoot[1].includes(name) :
          name === remainingRoot;
      });
    });

    if (foundIndex > -1) {
      return foundIndex;
    }

    const paramTags = jsdocTags.filter(({tag}) => {
      return tag === preferredTagName;
    });

    return paramTags.length;
  };

  const {
    autoIncrementBase = 0,
    unnamedRootBase = ['root'],
  } = context.options[0] || {};
  let [nextRootName, incremented, namer] = rootNamer([...unnamedRootBase], autoIncrementBase);

  functionParameterNames.forEach((functionParameterName, functionParameterIdx) => {
    let inc;
    if (Array.isArray(functionParameterName)) {
      const matchedJsdoc = shallowJsdocParameterNames[functionParameterIdx] ||
        jsdocParameterNames[functionParameterIdx];

      let rootName;
      if (functionParameterName[0]) {
        rootName = functionParameterName[0];
      } else if (matchedJsdoc && matchedJsdoc.name) {
        rootName = matchedJsdoc.name;
      } else {
        rootName = nextRootName;
        inc = incremented;
        [nextRootName, incremented, namer] = namer();
      }
      console.log('functionParameterName', functionParameterName);

      functionParameterName[1].forEach((paramName) => {
        if (jsdocParameterNames && !jsdocParameterNames.find(({name}) => {
          return name === rootName;
        })) {
          if (!missingTags.find(({functionParameterName: fpn}) => {
            return fpn === rootName;
          })) {
            const emptyParamIdx = jsdocParameterNames.findIndex(({name}) => {
              return !name;
            });

            if (emptyParamIdx > -1) {
              missingTags.push({
                functionParameterIdx: emptyParamIdx,
                functionParameterName: rootName,
                inc,
                remove: true,
              });
            } else {
              missingTags.push({
                functionParameterIdx: paramIndex[rootName],
                functionParameterName: rootName,
                inc,
              });
            }
          }
        }

        const fullParamName = `${rootName}.${paramName}`;

        if (jsdocParameterNames && !jsdocParameterNames.find(({name}) => {
          return name === fullParamName;
        })) {
          missingTags.push({
            functionParameterIdx: paramIndex[functionParameterName[0] ? fullParamName : paramName],
            functionParameterName: fullParamName,
            inc,
          });
        }
      });

      return;
    }

    if (jsdocParameterNames && !jsdocParameterNames.find(({name}) => {
      return name === functionParameterName;
    })) {
      missingTags.push({
        functionParameterIdx: paramIndex[functionParameterName],
        functionParameterName,
        inc,
      });
    }
  });

  const fix = ({
    functionParameterIdx, functionParameterName, remove, inc,
  }, tags) => {
    if (inc && !enableRootFixer) {
      return;
    }
    if (remove) {
      tags.splice(functionParameterIdx, 1, {
        name: functionParameterName,
        newAdd: true,
        tag: preferredTagName,
      });
    } else {
      const expectedIdx = findExpectedIndex(tags, functionParameterIdx);
      tags.splice(expectedIdx, 0, {
        name: functionParameterName,
        newAdd: true,
        tag: preferredTagName,
      });
    }
  };

  const fixer = () => {
    if (!jsdoc.tags) {
      jsdoc.tags = [];
    }

    missingTags.forEach((missingTag) => {
      fix(missingTag, jsdoc.tags);
    });
  };

  missingTags.forEach(({functionParameterName}) => {
    utils.reportJSDoc(`Missing JSDoc @${preferredTagName} "${functionParameterName}" declaration.`, null, enableFixer ? fixer : null, node);
  });
}, {
  contextDefaults: true,
  meta: {
    fixable: 'code',
    schema: [
      {
        additionalProperties: false,
        properties: {
          autoIncrementBase: {
            default: 0,
            type: 'integer',
          },
          checkConstructors: {
            default: true,
            type: 'boolean',
          },
          checkGetters: {
            default: false,
            type: 'boolean',
          },
          checkRestProperty: {
            default: false,
            type: 'boolean',
          },
          checkSetters: {
            default: false,
            type: 'boolean',
          },
          contexts: {
            items: {
              type: 'string',
            },
            type: 'array',
          },
          enableFixer: {
            type: 'boolean',
          },
          enableRestElementFixer: {
            type: 'boolean',
          },
          enableRootFixer: {
            type: 'boolean',
          },
          exemptedBy: {
            items: {
              type: 'string',
            },
            type: 'array',
          },
          unnamedRootBase: {
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
