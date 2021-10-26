import iterateJsdoc from '../iterateJsdoc';

const validatePropertyNames = (
  targetTagName : string,
  enableFixer : boolean,
  jsdoc, jsdocNode, utils,
) => {
  const propertyTags = Object.entries(jsdoc.tags).filter(([, tag]) => {
    return tag.tag === targetTagName;
  });

  return propertyTags.some(([, tag], index) => {
    let tagsIndex;
    const dupeTagInfo = propertyTags.find(([tgsIndex, tg], idx) => {
      tagsIndex = tgsIndex;

      return tg.name === tag.name && idx !== index;
    });
    if (dupeTagInfo) {
      utils.reportJSDoc(`Duplicate @${targetTagName} "${tag.name}"`, dupeTagInfo[1], enableFixer ? () => {
        utils.removeTag(tagsIndex);
      } : null);

      return true;
    }

    return false;
  });
};

const validatePropertyNamesDeep = (
  targetTagName : string,
  jsdocPropertyNames : Array<string>, jsdoc, report : Function,
) => {
  let lastRealProperty;

  return jsdocPropertyNames.some(({name: jsdocPropertyName, idx}) => {
    const isPropertyPath = jsdocPropertyName.includes('.');

    if (isPropertyPath) {
      if (!lastRealProperty) {
        report(`@${targetTagName} path declaration ("${jsdocPropertyName}") appears before any real property.`, null, jsdoc.tags[idx]);

        return true;
      }

      let pathRootNodeName = jsdocPropertyName.slice(0, jsdocPropertyName.indexOf('.'));

      if (pathRootNodeName.endsWith('[]')) {
        pathRootNodeName = pathRootNodeName.slice(0, -2);
      }

      if (pathRootNodeName !== lastRealProperty) {
        report(
          `@${targetTagName} path declaration ("${jsdocPropertyName}") root node name ("${pathRootNodeName}") ` +
          `does not match previous real property name ("${lastRealProperty}").`,
          null,
          jsdoc.tags[idx],
        );

        return true;
      }
    } else {
      lastRealProperty = jsdocPropertyName;
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
  const {
    enableFixer = false,
  } = context.options[0] || {};
  const jsdocPropertyNamesDeep = utils.getJsdocTagsDeep('property');
  if (!jsdocPropertyNamesDeep.length) {
    return;
  }
  const targetTagName = utils.getPreferredTagName({tagName: 'property'});
  const isError = validatePropertyNames(
    targetTagName,
    enableFixer,
    jsdoc,
    jsdocNode,
    utils,
  );

  if (isError) {
    return;
  }

  validatePropertyNamesDeep(
    targetTagName, jsdocPropertyNamesDeep, jsdoc, report,
  );
}, {
  iterateAllJsdocs: true,
  meta: {
    docs: {
      description: 'Ensures that property names in JSDoc are not duplicated on the same block and that nested properties have defined roots.',
      url: 'https://github.com/gajus/eslint-plugin-jsdoc#eslint-plugin-jsdoc-rules-check-property-names',
    },
    fixable: 'code',
    schema: [
      {
        additionalProperties: false,
        properties: {
          enableFixer: {
            type: 'boolean',
          },
        },
        type: 'object',
      },
    ],
    type: 'suggestion',
  },
});
