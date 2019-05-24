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
  'RegExp',
  'Date',
  'Function'
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

  jsdocTags.forEach((jsdocTag) => {
    const invalidTypes = [];
    let typeAst;

    try {
      typeAst = parse(jsdocTag.type);
    } catch (error) {
      return;
    }

    traverse(typeAst, (node) => {
      if (['NAME', 'ANY'].includes(node.type)) {
        const nodeName = node.type === 'ANY' ? '*' : node.name;
        let preferred;
        if (preferredTypes && _.get(preferredTypes, nodeName) !== undefined) {
          const preferredSetting = preferredTypes[nodeName];

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
        } else if (!noDefaults && node.type === 'NAME') {
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
          if (node.type === 'ANY') {
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
