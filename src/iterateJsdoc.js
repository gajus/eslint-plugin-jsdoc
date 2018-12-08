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
  functionNode,
  jsdoc,
  tagNamePreference,
  exampleCodeRegex,
  rejectExampleCodeRegex,
  additionalTagNames,
  baseConfig,
  configFile,
  captionRequired,
  matchingFileName,
  eslintrcForExamples,
  allowInlineConfig,
  reportUnusedDisableDirectives,
  noDefaultExampleRules,
  allowOverrideWithoutParam,
  allowImplementsWithoutParam,
  allowAugmentsExtendsWithoutParam,
  ancestors,
  sourceCode
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

  utils.getExampleCodeRegex = () => {
    return exampleCodeRegex;
  };

  utils.getRejectExampleCodeRegex = () => {
    return rejectExampleCodeRegex;
  };

  utils.getMatchingFileName = () => {
    return matchingFileName;
  };

  utils.isValidTag = (name) => {
    return jsdocUtils.isValidTag(name, additionalTagNames);
  };

  utils.hasTag = (name) => {
    return jsdocUtils.hasTag(jsdoc, name);
  };

  utils.useEslintrcForExamples = () => {
    return eslintrcForExamples;
  };

  utils.allowInlineConfig = () => {
    return allowInlineConfig;
  };

  utils.reportUnusedDisableDirectives = () => {
    return reportUnusedDisableDirectives;
  };

  utils.hasNoDefaultExampleRules = () => {
    return noDefaultExampleRules;
  };

  utils.getBaseConfig = () => {
    return baseConfig;
  };

  utils.getConfigFile = () => {
    return configFile;
  };

  utils.isCaptionRequired = () => {
    return captionRequired;
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

  utils.classHasTag = (tagName) => {
    const greatGrandParent = ancestors.slice(-3)[0];
    const greatGrandParentValue = greatGrandParent && sourceCode.getFirstToken(greatGrandParent).value;

    if (greatGrandParentValue === 'class') {
      const classJsdocNode = sourceCode.getJSDocComment(greatGrandParent);

      if (classJsdocNode) {
        const indent = _.repeat(' ', classJsdocNode.loc.start.column);
        const classJsdoc = parseComment(classJsdocNode, indent);

        if (jsdocUtils.hasTag(classJsdoc, tagName)) {
          return true;
        }
      }
    }

    return false;
  };

  return utils;
};

export {
  parseComment
};

export default (iterator) => {
  return (context) => {
    const sourceCode = context.getSourceCode();
    const tagNamePreference = _.get(context, 'settings.jsdoc.tagNamePreference') || {};
    const exampleCodeRegex = _.get(context, 'settings.jsdoc.exampleCodeRegex') || null;
    const rejectExampleCodeRegex = _.get(context, 'settings.jsdoc.rejectExampleCodeRegex') || null;
    const matchingFileName = _.get(context, 'settings.jsdoc.matchingFileName') || null;
    const additionalTagNames = _.get(context, 'settings.jsdoc.additionalTagNames') || {};
    const baseConfig = _.get(context, 'settings.jsdoc.baseConfig') || {};
    const configFile = _.get(context, 'settings.jsdoc.configFile');
    const eslintrcForExamples = _.get(context, 'settings.jsdoc.eslintrcForExamples') !== false;
    const allowInlineConfig = _.get(context, 'settings.jsdoc.allowInlineConfig') !== false;
    const reportUnusedDisableDirectives = _.get(context, 'settings.jsdoc.reportUnusedDisableDirectives') !== false;
    const captionRequired = Boolean(_.get(context, 'settings.jsdoc.captionRequired'));
    const noDefaultExampleRules = Boolean(_.get(context, 'settings.jsdoc.noDefaultExampleRules'));
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

      const report = (message, fixer = null, jsdocLoc = null) => {
        let loc;

        if (jsdocLoc) {
          const lineNumber = jsdocNode.loc.start.line + jsdocLoc.line;

          loc = {
            end: {line: lineNumber},
            start: {line: lineNumber}
          };
          if (jsdocLoc.column) {
            const colNumber = jsdocNode.loc.start.column + jsdocLoc.column;

            loc.end.column = colNumber;
            loc.start.column = colNumber;
          }
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
        functionNode,
        jsdoc,
        tagNamePreference,
        exampleCodeRegex,
        rejectExampleCodeRegex,
        additionalTagNames,
        baseConfig,
        configFile,
        captionRequired,
        matchingFileName,
        eslintrcForExamples,
        allowInlineConfig,
        reportUnusedDisableDirectives,
        noDefaultExampleRules,
        allowOverrideWithoutParam,
        allowImplementsWithoutParam,
        allowAugmentsExtendsWithoutParam,
        ancestors,
        sourceCode
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
