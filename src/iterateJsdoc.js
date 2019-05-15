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
        if (_.includes(['return', 'returns', 'throws', 'exception'], data.tag)) {
          return null;
        }

        return commentParser.PARSERS.parse_name(str, data);
      },
      commentParser.PARSERS.parse_description
    ]
  })[0] || {};
};

const curryUtils = (
  node,
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
  allowEmptyNamepaths,
  reportUnusedDisableDirectives,
  noDefaultExampleRules,
  allowOverrideWithoutParam,
  allowImplementsWithoutParam,
  allowAugmentsExtendsWithoutParam,
  checkSeesForNamepaths,
  ancestors,
  sourceCode
) => {
  const utils = {};

  utils.getFunctionParameterNames = () => {
    return jsdocUtils.getFunctionParameterNames(node);
  };

  utils.getFunctionSourceCode = () => {
    return sourceCode.getText(node);
  };

  utils.isConstructor = () => {
    return node.parent && node.parent.kind === 'constructor';
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

  utils.hasATag = (name) => {
    return jsdocUtils.hasATag(jsdoc, name);
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
  utils.isNamepathType = (tagName) => {
    return jsdocUtils.isNamepathType(tagName, checkSeesForNamepaths);
  };
  utils.passesEmptyNamepathCheck = (tag) => {
    return !tag.name && allowEmptyNamepaths && _.includes([
      // These may serve some minor purpose when empty
      'callback', 'event', 'listens', 'fires', 'emits'
    ], tag.tag);
  };

  utils.getClassJsdocNode = () => {
    const greatGrandParent = ancestors.slice(-3)[0];
    const greatGrandParentValue = greatGrandParent && sourceCode.getFirstToken(greatGrandParent).value;

    if (greatGrandParentValue === 'class') {
      const classJsdocNode = sourceCode.getJSDocComment(greatGrandParent);

      return classJsdocNode;
    }

    return false;
  };

  utils.classHasTag = (tagName) => {
    const classJsdocNode = utils.getClassJsdocNode();

    if (classJsdocNode) {
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

export {
  parseComment
};

export default (iterator, options) => {
  const opts = options || {};

  return {
    /**
     * The entrypoint for the JSDoc rule.
     *
     * @param {*} context
     *   a reference to the context which hold all important information
     *   like settings and the sourcecode to check.
     * @returns {Object}
     *   a list with parser callback function.
     */
    create (context) {
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
      const allowEmptyNamepaths = _.get(context, 'settings.jsdoc.allowEmptyNamepaths') !== false;
      const reportUnusedDisableDirectives = _.get(context, 'settings.jsdoc.reportUnusedDisableDirectives') !== false;
      const captionRequired = Boolean(_.get(context, 'settings.jsdoc.captionRequired'));
      const noDefaultExampleRules = Boolean(_.get(context, 'settings.jsdoc.noDefaultExampleRules'));
      const allowOverrideWithoutParam = Boolean(_.get(context, 'settings.jsdoc.allowOverrideWithoutParam'));
      const allowImplementsWithoutParam = Boolean(_.get(context, 'settings.jsdoc.allowImplementsWithoutParam'));
      const allowAugmentsExtendsWithoutParam = Boolean(_.get(context, 'settings.jsdoc.allowAugmentsExtendsWithoutParam'));
      const checkSeesForNamepaths = Boolean(_.get(context, 'settings.jsdoc.checkSeesForNamepaths'));

      const checkJsdoc = (node) => {
        const jsdocNode = sourceCode.getJSDocComment(node);

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
          node,
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
          allowEmptyNamepaths,
          reportUnusedDisableDirectives,
          noDefaultExampleRules,
          allowOverrideWithoutParam,
          allowImplementsWithoutParam,
          allowAugmentsExtendsWithoutParam,
          checkSeesForNamepaths,
          ancestors,
          sourceCode
        );

        iterator({
          context,
          indent,
          jsdoc,
          jsdocNode,
          node,
          report,
          sourceCode,
          utils
        });
      };

      if (opts.returns) {
        return opts.returns(context, sourceCode, checkJsdoc);
      }

      return {
        ArrowFunctionExpression: checkJsdoc,
        FunctionDeclaration: checkJsdoc,
        FunctionExpression: checkJsdoc
      };
    },
    meta: opts.meta
  };
};
