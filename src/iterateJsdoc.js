import _ from 'lodash';
import commentParser from 'comment-parser';
import jsdocUtils from './jsdocUtils';

const parseComment = (commentNode, indent) => {
  // Preserve JSDoc block start/end indentation.
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

const curryUtils = (
  functionNode, jsdoc, tagNamePreference, additionalTagNames,
  allowOverrideWithoutParam, allowImplementsWithoutParam,
  allowAugmentsExtendsWithoutParam, ancestors, sourceCode
) => {
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

  utils.isImplementsAllowedWithoutParam = () => {
    return allowImplementsWithoutParam;
  };

  utils.isAugmentsExtendsAllowedWithoutParam = () => {
    return allowAugmentsExtendsWithoutParam;
  };

  utils.classHasTag = function (tagName) {
    const greatGrandParent = ancestors.slice(-3)[0];
    const greatGrandParentValue = greatGrandParent && sourceCode.getFirstToken(greatGrandParent).value;

    if (greatGrandParentValue === 'class') {
      const classJsdocNode = sourceCode.getJSDocComment(greatGrandParent);
      const indent = _.repeat(' ', classJsdocNode.loc.start.column);
      const classJsdoc = parseComment(classJsdocNode, indent);

      if (jsdocUtils.hasTag(classJsdoc, tagName)) {
        return true;
      }
    }

    return false;
  };

  return utils;
};

export {parseComment};

export default (iterator) => {
  return (context) => {
    const sourceCode = context.getSourceCode();
    const tagNamePreference = _.get(context, 'settings.jsdoc.tagNamePreference') || {};
    const additionalTagNames = _.get(context, 'settings.jsdoc.additionalTagNames') || {};
    const allowOverrideWithoutParam = Boolean(_.get(context, 'settings.jsdoc.allowOverrideWithoutParam'));
    const allowImplementsWithoutParam = Boolean(_.get(context, 'settings.jsdoc.allowImplementsWithoutParam'));
    const allowAugmentsExtendsWithoutParam = Boolean(_.get(context, 'settings.jsdoc.allowAugmentsExtendsWithoutParam'));

    const checkJsdoc = (functionNode) => {
      const jsdocNode = sourceCode.getJSDocComment(functionNode);

      if (!jsdocNode) {
        return;
      }
      const ancestors = context.getAncestors();

      const indent = _.repeat(' ', jsdocNode.loc.start.column);

      const jsdoc = parseComment(jsdocNode, indent);

      const report = (message, fixer = null, jsdocLine = null) => {
        let loc;

        if (jsdocLine) {
          const lineNumber = jsdocNode.loc.start.line + jsdocLine.line;

          loc = {
            end: {line: lineNumber},
            start: {line: lineNumber}
          };
        }
        if (fixer === null) {
          context.report({
            loc,
            message,
            node: jsdocNode
          });
        } else {
          context.report({
            fix: fixer,
            loc,
            message,
            node: jsdocNode
          });
        }
      };

      const utils = curryUtils(
        functionNode, jsdoc, tagNamePreference, additionalTagNames,
        allowOverrideWithoutParam, allowImplementsWithoutParam,
        allowAugmentsExtendsWithoutParam, ancestors, sourceCode
      );

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
