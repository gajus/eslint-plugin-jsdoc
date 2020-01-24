import entries from 'object.entries';
import iterateJsdoc from '../iterateJsdoc';

const validatePropertyNames = (
  targetTagName : string,
  jsdoc, jsdocNode, utils,
) => {
  const propertyTags = entries(jsdoc.tags).filter(([, tag]) => {
    return tag.tag === targetTagName;
  });

  return propertyTags.some(([, tag], index) => {
    let tagsIndex;
    const dupeTagInfo = propertyTags.find(([tgsIndex, tg], idx) => {
      tagsIndex = tgsIndex;

      return tg.name === tag.name && idx !== index;
    });
    if (dupeTagInfo) {
      utils.reportJSDoc(`Duplicate @${targetTagName} "${tag.name}"`, dupeTagInfo[1], () => {
        jsdoc.tags.splice(tagsIndex, 1);
      });

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
  jsdoc,
  jsdocNode,
  report,
  utils,
}) => {
  const jsdocPropertyNamesDeep = utils.getJsdocTagsDeep('property');
  if (!jsdocPropertyNamesDeep.length) {
    return;
  }
  const targetTagName = utils.getPreferredTagName({tagName: 'property'});
  const isError = validatePropertyNames(
    targetTagName,
    jsdoc, jsdocNode, utils,
  );

  if (isError) {
    return;
  }

  validatePropertyNamesDeep(
    targetTagName, jsdocPropertyNamesDeep,
    jsdoc, report,
  );
}, {
  iterateAllJsdocs: true,
  meta: {
    fixable: 'code',
    type: 'suggestion',
  },
});
