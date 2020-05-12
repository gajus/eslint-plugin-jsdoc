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
    checkTypesPattern = '/^(?:[oO]bject|[aA]rray|PlainObject|Generic(?:Object|Array))$/',
  } = context.options[0] || {};

  const lastSlashPos = checkTypesPattern.lastIndexOf('/');
  const checkTypesRegex = lastSlashPos === -1 ?
    new RegExp(checkTypesPattern) :
    new RegExp(checkTypesPattern.slice(1, lastSlashPos), checkTypesPattern.slice(lastSlashPos + 1));

  const missingTags = [];
  const flattenedRoots = utils.flattenRoots(functionParameterNames).names;
  const paramIndex = flattenedRoots.reduce((acc, cur, idx) => {
    acc[cur] = idx;

    return acc;
  }, {});

  const findExpectedIndex = (jsdocTags, indexAtFunctionParams) => {
    const remainingRoots = functionParameterNames.slice(indexAtFunctionParams || 0);
    const foundIndex = jsdocTags.findIndex(({name, newAdd}) => {
      return !newAdd && remainingRoots.some((remainingRoot) => {
        if (Array.isArray(remainingRoot)) {
          return remainingRoot[1].names.includes(name);
        }
        if (typeof remainingRoot === 'object') {
          return name === remainingRoot.name;
        }

        return name === remainingRoot;
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
        if (matchedJsdoc.type && matchedJsdoc.type.search(checkTypesRegex) === -1) {
          return;
        }
      } else {
        rootName = nextRootName;
        inc = incremented;
        [nextRootName, incremented, namer] = namer();
      }

      const {hasRestElement, hasPropertyRest, rests, names} = functionParameterName[1];
      if (!enableRestElementFixer && hasRestElement) {
        return;
      }

      names.forEach((paramName, idx) => {
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
        if (!checkRestProperty && rests[idx]) {
          return;
        }

        const fullParamName = `${rootName}.${paramName}`;

        if (jsdocParameterNames && !jsdocParameterNames.find(({name}) => {
          return name === fullParamName;
        })) {
          missingTags.push({
            functionParameterIdx: paramIndex[functionParameterName[0] ? fullParamName : paramName],
            functionParameterName: fullParamName,
            inc,
            type: hasRestElement && !hasPropertyRest ? '...any' : undefined,
          });
        }
      });

      return;
    }
    let funcParamName;
    let type;
    if (typeof functionParameterName === 'object') {
      if (!enableRestElementFixer && functionParameterName.restElement) {
        return;
      }
      funcParamName = functionParameterName.name;
      type = '...any';
    } else {
      funcParamName = functionParameterName;
    }

    if (jsdocParameterNames && !jsdocParameterNames.find(({name}) => {
      return name === funcParamName;
    })) {
      missingTags.push({
        functionParameterIdx: paramIndex[funcParamName],
        functionParameterName: funcParamName,
        inc,
        type,
      });
    }
  });

  const fix = ({
    functionParameterIdx, functionParameterName, remove, inc, type,
  }, tags) => {
    if (inc && !enableRootFixer) {
      return;
    }
    if (remove) {
      tags.splice(functionParameterIdx, 1, {
        name: functionParameterName,
        newAdd: true,
        tag: preferredTagName,
        type,
      });
    } else {
      const expectedIdx = findExpectedIndex(tags, functionParameterIdx);
      tags.splice(expectedIdx, 0, {
        name: functionParameterName,
        newAdd: true,
        tag: preferredTagName,
        type,
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
    utils.reportJSDoc(
      `Missing JSDoc @${preferredTagName} "${functionParameterName}" declaration.`,
      null,
      enableFixer ? fixer : null,
    );
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
          checkTypesPattern: {
            type: 'string',
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
