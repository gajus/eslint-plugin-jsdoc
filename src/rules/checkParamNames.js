import entries from 'object.entries-ponyfill';
import iterateJsdoc from '../iterateJsdoc';

const validateParameterNames = (
  targetTagName : string, allowExtraTrailingParamDocs: boolean,
  functionParameterNames : Array<string>, jsdoc, jsdocNode, utils, report,
) => {
  const paramTags = entries(jsdoc.tags).filter(([, tag]) => {
    return tag.tag === targetTagName && !tag.name.includes('.');
  });

  return paramTags.some(([, tag], index) => {
    let tagsIndex;
    const dupeTagInfo = paramTags.find(([tgsIndex, tg], idx) => {
      tagsIndex = tgsIndex;

      return tg.name === tag.name && idx !== index;
    });
    if (dupeTagInfo) {
      utils.reportJSDoc(`Duplicate @${targetTagName} "${tag.name}"`, dupeTagInfo[1], () => {
        jsdoc.tags.splice(tagsIndex, 1);
      });

      return true;
    }
    const functionParameterName = functionParameterNames[index];

    if (!functionParameterName) {
      if (allowExtraTrailingParamDocs) {
        return false;
      }

      report(
        `@${targetTagName} "${tag.name}" does not match an existing function parameter.`,
        null,
        tag,
      );

      return true;
    }

    if (functionParameterName === '<ObjectPattern>' || functionParameterName === '<ArrayPattern>') {
      return false;
    }

    if (functionParameterName !== tag.name.trim()) {
      const expectedNames = functionParameterNames.join(', ');
      const actualNames = paramTags.map(([, {name}]) => {
        return name.trim();
      }).join(', ');

      report(
        `Expected @${targetTagName} names to be "${expectedNames}". Got "${actualNames}".`,
        null,
        tag,
      );

      return true;
    }

    return false;
  });
};

const validateParameterNamesDeep = (
  targetTagName : string, allowExtraTrailingParamDocs: boolean,
  jsdocParameterNames : Array<string>, jsdoc, report : Function,
) => {
  let lastRealParameter;

  return jsdocParameterNames.some(({name: jsdocParameterName, idx}) => {
    const isPropertyPath = jsdocParameterName.includes('.');

    if (isPropertyPath) {
      if (!lastRealParameter) {
        report(`@${targetTagName} path declaration ("${jsdocParameterName}") appears before any real parameter.`, null, jsdoc.tags[idx]);

        return true;
      }

      let pathRootNodeName = jsdocParameterName.slice(0, jsdocParameterName.indexOf('.'));

      if (pathRootNodeName.endsWith('[]')) {
        pathRootNodeName = pathRootNodeName.slice(0, -2);
      }

      if (pathRootNodeName !== lastRealParameter) {
        report(
          `@${targetTagName} path declaration ("${jsdocParameterName}") root node name ("${pathRootNodeName}") ` +
          `does not match previous real parameter name ("${lastRealParameter}").`,
          null,
          jsdoc.tags[idx],
        );

        return true;
      }
    } else {
      lastRealParameter = jsdocParameterName;
    }

    return false;
  });
};

export default iterateJsdoc(({
  context,
  jsdoc,
  jsdocNode,
  report,
  utils,
}) => {
  const {allowExtraTrailingParamDocs} = context.options[0] || {};

  const jsdocParameterNamesDeep = utils.getJsdocNamesDeep('param');
  if (!jsdocParameterNamesDeep.length) {
    return;
  }
  const functionParameterNames = utils.getFunctionParameterNames();
  const targetTagName = utils.getPreferredTagName({tagName: 'param'});
  const isError = validateParameterNames(
    targetTagName, allowExtraTrailingParamDocs, functionParameterNames,
    jsdoc, jsdocNode, utils, report,
  );

  if (isError) {
    return;
  }

  validateParameterNamesDeep(
    targetTagName, allowExtraTrailingParamDocs, jsdocParameterNamesDeep,
    jsdoc, report,
  );
}, {
  meta: {
    fixable: 'code',
    schema: [
      {
        additionalProperties: false,
        properties: {
          allowExtraTrailingParamDocs: {
            type: 'boolean',
          },
        },
        type: 'object',
      },
    ],
    type: 'suggestion',
  },
});
