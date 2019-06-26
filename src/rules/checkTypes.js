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

    const getPreferredTypeInfo = (type, nodeName, parentName, parentNode) => {
      let hasMatchingPreferredType;
      let isGenericMatch;
      let typeName = nodeName;
      if (preferredTypes) {
        const parentType = parentName === 'subject';
        if (unifyParentAndChildTypeChecks || parentType) {
          const syntax = _.get(parentNode, 'meta.syntax');

          [
            ['.', 'ANGLE_BRACKET_WITH_DOT'],
            ['.<>', 'ANGLE_BRACKET_WITH_DOT'],
            ['<>', 'ANGLE_BRACKET']
          ].some(([checkPostFix, syn]) => {
            isGenericMatch = _.get(
              preferredTypes,
              nodeName + checkPostFix
            ) !== undefined &&
              syntax === syn;
            if (isGenericMatch) {
              typeName += checkPostFix;
            }

            return isGenericMatch;
          });
          if (!isGenericMatch && parentType) {
            [
              ['[]', 'SQUARE_BRACKET'],
              ['.', 'ANGLE_BRACKET_WITH_DOT'],
              ['.<>', 'ANGLE_BRACKET_WITH_DOT'],
              ['<>', 'ANGLE_BRACKET']
            ].some(([checkPostFix, syn]) => {
              isGenericMatch = _.get(preferredTypes, checkPostFix) !== undefined &&
                syntax === syn;
              if (isGenericMatch) {
                typeName = checkPostFix;
              }

              return isGenericMatch;
            });
          }
        }
        const directNameMatch = _.get(preferredTypes, nodeName) !== undefined;
        const unifiedSyntaxParentMatch = parentType && directNameMatch && unifyParentAndChildTypeChecks;
        isGenericMatch = isGenericMatch || unifiedSyntaxParentMatch;

        hasMatchingPreferredType = isGenericMatch ||
          directNameMatch && !parentType;
      }

      return [hasMatchingPreferredType, typeName, isGenericMatch];
    };

    const adjustNames = (type, preferred, isGenericMatch, nodeName, node, parentNode) => {
      let ret = preferred;
      if (isGenericMatch) {
        if (preferred === '[]') {
          parentNode.meta.syntax = 'SQUARE_BRACKET';
          ret = 'Array';
        } else {
          const dotBracketEnd = preferred.match(/\.(?:<>)?$/);
          if (dotBracketEnd) {
            parentNode.meta.syntax = 'ANGLE_BRACKET_WITH_DOT';
            ret = preferred.slice(0, -dotBracketEnd[0].length);
          } else {
            const bracketEnd = preferred.endsWith('<>');
            if (bracketEnd) {
              parentNode.meta.syntax = 'ANGLE_BRACKET';
              ret = preferred.slice(0, -2);
            }
          }
        }
      } else if (type === 'ANY') {
        node.type = 'NAME';
      }
      node.name = ret.replace(/(?:\.|<>|\.<>|\[])$/, '');

      // For bare pseudo-types like `<>`
      if (!ret) {
        node.name = nodeName;
      }

      return ret;
    };

    traverse(typeAst, (node, parentName, parentNode) => {
      const {type, name} = node;
      if (!['NAME', 'ANY'].includes(type)) {
        return;
      }
      let nodeName = type === 'ANY' ? '*' : name;

      const [hasMatchingPreferredType, typeName, isGenericMatch] = getPreferredTypeInfo(type, nodeName, parentName, parentNode);

      let preferred;
      if (hasMatchingPreferredType) {
        const preferredSetting = preferredTypes[typeName];
        nodeName = typeName === '[]' ? typeName : nodeName;

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
        } else {
          report(
            'Invalid `settings.jsdoc.preferredTypes`. Values must be falsy, a string, or an object.',
            null,
            jsdocTag
          );

          return;
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

      // For fixer
      if (preferred) {
        preferred = adjustNames(type, preferred, isGenericMatch, nodeName, node, parentNode);
      }
    });

    if (invalidTypes.length) {
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
  iterateAllJsdocs: true,
  meta: {
    fixable: 'code',
    type: 'suggestion'
  }
});
