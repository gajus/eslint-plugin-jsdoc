import _ from 'lodash';
import commentParser from 'comment-parser';
import jsdocUtils from './jsdocUtils';

const curryUtils = (functionNode, jsdoc, tagNamePreference, additionalTagNames, allowOverrideWithoutParam) => {
  const utils = {};

  utils.getFunctionParameterNames = () => {
    return jsdocUtils.getFunctionParameterNames(functionNode);
  };

  utils.getJsdocParameterNamesDeep = () => {
    return jsdocUtils.getJsdocParameterNamesDeep(jsdoc, utils.getPreferredTagName('param'));
  };

  utils.getJsdocParameterNames = () => {
    return jsdocUtils.getJsdocParameterNames(jsdoc, utils.getPreferredTagName('param'));
  };

  utils.getPreferredTagName = (name) => {
    return jsdocUtils.getPreferredTagName(name, tagNamePreference);
  };

  utils.isValidTag = (name) => {
    return jsdocUtils.isValidTag(name, additionalTagNames);
  };

  utils.hasTag = (name) => {
    return jsdocUtils.hasTag(jsdoc, name);
  };

  utils.isOverrideAllowedWithoutParam = () => {
    return allowOverrideWithoutParam;
  };

  return utils;
};

export const parseComment = (commentNode) => {
  // Preserve JSDoc block start/end indentation.
  const indent = _.repeat(' ', commentNode.loc.start.column);

  return commentParser(indent + '/*' + commentNode.value + indent + '*/', {
    // @see https://github.com/yavorskiy/comment-parser/issues/21
    parsers: [
      commentParser.PARSERS.parse_tag,
      commentParser.PARSERS.parse_type,
      (str, data) => {
        if (_.includes(['return', 'returns'], data.tag)) {
          return null;
        }

        return commentParser.PARSERS.parse_name(str, data);
      },
      commentParser.PARSERS.parse_description
    ]
  })[0] || {};
};

export default (iterator) => {
  return (context) => {
    const sourceCode = context.getSourceCode();
    const tagNamePreference = _.get(context, 'settings.jsdoc.tagNamePreference') || {};
    const additionalTagNames = _.get(context, 'settings.jsdoc.additionalTagNames') || {};
    const allowOverrideWithoutParam = Boolean(_.get(context, 'settings.jsdoc.allowOverrideWithoutParam'));

    const checkJsdoc = (functionNode) => {
      const jsdocNode = sourceCode.getJSDocComment(functionNode);

      if (!jsdocNode) {
        return;
      }

      const indent = _.repeat(' ', jsdocNode.loc.start.column);

      const jsdoc = parseComment(jsdocNode);

      const report = (message, fixer = null) => {
        if (fixer === null) {
          context.report(jsdocNode, message);
        } else {
          context.report({
            fix: fixer,
            message,
            node: jsdocNode
          });
        }
      };

      const utils = curryUtils(functionNode, jsdoc, tagNamePreference, additionalTagNames, allowOverrideWithoutParam);

      iterator({
        context,
        functionNode,
        indent,
        jsdoc,
        jsdocNode,
        report,
        sourceCode,
        utils
      });
    };

    return {
      ArrowFunctionExpression: checkJsdoc,
      FunctionDeclaration: checkJsdoc,
      FunctionExpression: checkJsdoc
    };
  };
};
