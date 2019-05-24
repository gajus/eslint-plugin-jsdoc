import _ from 'lodash';
import {parse, traverse, publish} from 'jsdoctypeparser';
import iterateJsdoc from '../iterateJsdoc';

const strictNativeTypes = [
  'undefined',
  'null',
  'boolean',
  'number',
  'string',
  'object',
  'Array',
  'Function',
  'Date',
  'RegExp'
];

export default iterateJsdoc(({
  jsdocNode,
  sourceCode,
  report,
  utils,
  context
}) => {
  const jsdocTags = utils.filterTags((tag) => {
    return utils.isTagWithType(tag.tag);
  });

  const preferredTypes = _.get(context, 'settings.jsdoc.preferredTypes');
  const optionObj = context.options[0];
  const noDefaults = _.get(optionObj, 'noDefaults');
  const unifyParentAndChildTypeChecks = _.get(optionObj, 'unifyParentAndChildTypeChecks');

  jsdocTags.forEach((jsdocTag) => {
    const invalidTypes = [];
    let typeAst;

    try {
      typeAst = parse(jsdocTag.type);
    } catch (error) {
      return;
    }

    const getPreferredTypeInfo = (type, nodeName) => {
      let hasMatchingPreferredType;
      let isGenericMatch;
      if (preferredTypes) {
        const nonparentType = type === 'ANY' || typeAst.type === 'NAME';
        isGenericMatch = _.get(preferredTypes, nodeName + '<>') !== undefined &&
          (unifyParentAndChildTypeChecks || !nonparentType);
        hasMatchingPreferredType =
          _.get(preferredTypes, nodeName) !== undefined &&
            (nonparentType || unifyParentAndChildTypeChecks) ||
          isGenericMatch;
      }

      return [hasMatchingPreferredType, isGenericMatch];
    };

    traverse(typeAst, (node) => {
      const {type, name} = node;
      if (['NAME', 'ANY'].includes(type)) {
        const nodeName = type === 'ANY' ? '*' : name;

        const [hasMatchingPreferredType, isGenericMatch] = getPreferredTypeInfo(type, nodeName);

        let preferred;
        if (hasMatchingPreferredType) {
          const preferredSetting = preferredTypes[nodeName + (
            isGenericMatch ? '<>' : ''
          )];

          if (!preferredSetting) {
            invalidTypes.push([nodeName]);
          } else if (typeof preferredSetting === 'string') {
            preferred = preferredSetting;
            invalidTypes.push([nodeName, preferred]);
          } else if (typeof preferredSetting === 'object') {
            preferred = _.get(preferredSetting, 'replacement');
            invalidTypes.push([
              nodeName,
              preferred,
              _.get(preferredSetting, 'message')
            ]);
          }
        } else if (!noDefaults && type === 'NAME') {
          for (const strictNativeType of strictNativeTypes) {
            if (strictNativeType.toLowerCase() === nodeName.toLowerCase() &&
              strictNativeType !== nodeName &&

              // Don't report if user has own map for a strict native type
              (!preferredTypes || _.get(preferredTypes, strictNativeType) === undefined)
            ) {
              preferred = strictNativeType;
              invalidTypes.push([nodeName, preferred]);
              break;
            }
          }
        }
        if (preferred) {
          if (type === 'ANY') {
            node.type = 'NAME';
          }
          node.name = preferred;
        }
      }
    });

    if (invalidTypes) {
      const fixedType = publish(typeAst);

      const tagName = jsdocTag.tag;
      invalidTypes.forEach(([badType, preferredType = '', message]) => {
        const fix = (fixer) => {
          return fixer.replaceText(
            jsdocNode,
            sourceCode.getText(jsdocNode).replace(
              '{' + jsdocTag.type + '}', '{' + fixedType + '}'
            )
          );
        };

        const tagValue = jsdocTag.name ? ' "' + jsdocTag.name + '"' : '';

        report(
          message ||
            'Invalid JSDoc @' + tagName + tagValue + ' type "' + badType +
              (preferredType ? '"; prefer: "' + preferredType : '') +
              '".',
          preferredType ? fix : null,
          jsdocTag,
          message ? {
            badType,
            preferredType,
            replacement: preferredType,
            tagName,
            tagValue
          } : null
        );
      });
    }
  });
}, {
  meta: {
    fixable: 'code',
    type: 'suggestion'
  }
});
