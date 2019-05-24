import _ from 'lodash';
import commentParser from 'comment-parser';
import jsdocUtils from './jsdocUtils';
import getJSDocComment from './eslint/getJSDocComment';

const parseComment = (commentNode, indent) => {
  // Preserve JSDoc block start/end indentation.
  return commentParser(indent + '/*' + commentNode.value + indent + '*/', {
    // @see https://github.com/yavorskiy/comment-parser/issues/21
    parsers: [
      commentParser.PARSERS.parse_tag,
      commentParser.PARSERS.parse_type,
      (str, data) => {
        if (['return', 'returns', 'throws', 'exception'].includes(data.tag)) {
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
  overrideReplacesDocs,
  implementsReplacesDocs,
  augmentsExtendsReplacesDocs,
  allowOverrideWithoutParam,
  allowImplementsWithoutParam,
  allowAugmentsExtendsWithoutParam,
  checkSeesForNamepaths,
  forceRequireReturn,
  avoidExampleOnConstructors,
  ancestors,
  sourceCode,
  context
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

  utils.isSetter = () => {
    return node.parent.kind === 'set';
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

  // These settings are deprecated and may be removed in the future along with this method.
  utils.avoidDocsParamOnly = () => {
    // These three checks are all for deprecated settings and may be removed in the future

    // When settings.jsdoc.allowOverrideWithoutParam is true, override implies that all documentation is inherited.
    if ((utils.hasTag('override') || utils.classHasTag('override')) && allowOverrideWithoutParam !== false) {
      return true;
    }

    // When settings.jsdoc.allowImplementsWithoutParam is true, implements implies that all documentation is inherited.
    // See https://github.com/gajus/eslint-plugin-jsdoc/issues/100
    if ((utils.hasTag('implements') || utils.classHasTag('implements')) && allowImplementsWithoutParam !== false) {
      return true;
    }

    // When settings.jsdoc.allowAugmentsExtendsWithoutParam is true, augments or extends implies that all documentation is inherited.
    if ((utils.hasTag('augments') || utils.hasTag('extends') ||
      utils.classHasTag('augments') || utils.classHasTag('extends')) && allowAugmentsExtendsWithoutParam) {
      return true;
    }

    return false;
  };

  utils.avoidDocs = (param) => {
    return param && utils.avoidDocsParamOnly() ||

      // inheritdoc implies that all documentation is inherited; see http://usejsdoc.org/tags-inheritdoc.html
      utils.hasTag('inheritdoc') ||

      // After deprecation, the `param` parameter can be removed, but for now,
      //  don't default for `param` as it may have its own explicit settings to the contrary
      (param && overrideReplacesDocs || !param && overrideReplacesDocs !== false) &&
        (utils.hasTag('override') || utils.classHasTag('override')) ||
      (param && implementsReplacesDocs || !param && implementsReplacesDocs !== false) &&
        (utils.hasTag('implements') || utils.classHasTag('implements')) ||
      augmentsExtendsReplacesDocs &&
        (utils.hasATag(['augments', 'extends']) ||
          utils.classHasTag('augments') ||
            utils.classHasTag('extends'));
  };

  utils.isNamepathDefiningTag = (tagName) => {
    return jsdocUtils.isNamepathDefiningTag(tagName);
  };
  utils.isNamepathTag = (tagName) => {
    return jsdocUtils.isNamepathTag(tagName, checkSeesForNamepaths);
  };

  utils.isTagWithType = (tagName) => {
    return jsdocUtils.isTagWithType(tagName);
  };

  utils.avoidExampleOnConstructors = () => {
    return avoidExampleOnConstructors;
  };

  utils.passesEmptyNamepathCheck = (tag) => {
    return !tag.name && allowEmptyNamepaths &&
      jsdocUtils.isPotentiallyEmptyNamepathTag(tag.tag);
  };

  utils.hasDefinedTypeReturnTag = (tag) => {
    return jsdocUtils.hasDefinedTypeReturnTag(tag);
  };

  utils.hasReturnValue = () => {
    return jsdocUtils.hasReturnValue(node, context);
  };

  utils.getTags = (tagName) => {
    return utils.filterTags((item) => {
      return item.tag === tagName;
    });
  };

  utils.isForceRequireReturn = () => {
    return forceRequireReturn;
  };

  utils.filterTags = (filter) => {
    return (jsdoc.tags || []).filter(filter);
  };

  utils.getClassNode = () => {
    const greatGrandParent = ancestors.slice(-3)[0];
    const greatGrandParentValue = greatGrandParent && sourceCode.getFirstToken(greatGrandParent).value;

    if (greatGrandParentValue === 'class') {
      return greatGrandParent;
    }

    return false;
  };

  utils.classHasTag = (tagName) => {
    const classNode = utils.getClassNode();
    const classJsdocNode = getJSDocComment(sourceCode, classNode);

    if (classJsdocNode) {
      const indent = _.repeat(' ', classJsdocNode.loc.start.column);
      const classJsdoc = parseComment(classJsdocNode, indent);

      if (jsdocUtils.hasTag(classJsdoc, tagName)) {
        return true;
      }
    }

    return false;
  };

  utils.forEachTag = (tagName, arrayHandler) => {
    const matchingJsdocTags = _.filter(jsdoc.tags || [], {
      tag: tagName
    });

    matchingJsdocTags.forEach((matchingJsdocTag) => {
      arrayHandler(matchingJsdocTag);
    });
  };

  return utils;
};

export {
  parseComment
};

export default (iterator, opts = {}) => {
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

      // All rules
      const ignorePrivate = Boolean(_.get(context, 'settings.jsdoc.ignorePrivate'));

      // `check-tag-names` and many require/param rules
      const tagNamePreference = _.get(context, 'settings.jsdoc.tagNamePreference') || {};

      // `check-tag-names` only
      const additionalTagNames = _.get(context, 'settings.jsdoc.additionalTagNames') || {};

      // `check-examples` only
      const exampleCodeRegex = _.get(context, 'settings.jsdoc.exampleCodeRegex') || null;
      const rejectExampleCodeRegex = _.get(context, 'settings.jsdoc.rejectExampleCodeRegex') || null;
      const matchingFileName = _.get(context, 'settings.jsdoc.matchingFileName') || null;
      const baseConfig = _.get(context, 'settings.jsdoc.baseConfig') || {};
      const configFile = _.get(context, 'settings.jsdoc.configFile');
      const eslintrcForExamples = _.get(context, 'settings.jsdoc.eslintrcForExamples') !== false;
      const allowInlineConfig = _.get(context, 'settings.jsdoc.allowInlineConfig') !== false;
      const reportUnusedDisableDirectives = _.get(context, 'settings.jsdoc.reportUnusedDisableDirectives') !== false;
      const captionRequired = Boolean(_.get(context, 'settings.jsdoc.captionRequired'));
      const noDefaultExampleRules = Boolean(_.get(context, 'settings.jsdoc.noDefaultExampleRules'));

      // `require-param`, `require-description`, `require-example`, `require-returns`
      const overrideReplacesDocs = _.get(context, 'settings.jsdoc.overrideReplacesDocs');
      const implementsReplacesDocs = _.get(context, 'settings.jsdoc.implementsReplacesDocs');
      const augmentsExtendsReplacesDocs = _.get(context, 'settings.jsdoc.augmentsExtendsReplacesDocs');

      // `require-param` only (deprecated)
      const allowOverrideWithoutParam = _.get(context, 'settings.jsdoc.allowOverrideWithoutParam');
      const allowImplementsWithoutParam = _.get(context, 'settings.jsdoc.allowImplementsWithoutParam');
      const allowAugmentsExtendsWithoutParam = _.get(context, 'settings.jsdoc.allowAugmentsExtendsWithoutParam');

      // `valid-types` only
      const allowEmptyNamepaths = _.get(context, 'settings.jsdoc.allowEmptyNamepaths') !== false;
      const checkSeesForNamepaths = Boolean(_.get(context, 'settings.jsdoc.checkSeesForNamepaths'));

      // `require-returns` only
      const forceRequireReturn = Boolean(_.get(context, 'settings.jsdoc.forceRequireReturn'));

      // `require-example` only
      const avoidExampleOnConstructors = Boolean(_.get(context, 'settings.jsdoc.avoidExampleOnConstructors'));

      const checkJsdoc = (node) => {
        const jsdocNode = getJSDocComment(sourceCode, node);

        if (!jsdocNode) {
          return;
        }

        const ancestors = context.getAncestors();

        const indent = _.repeat(' ', jsdocNode.loc.start.column);

        const jsdoc = parseComment(jsdocNode, indent);

        const report = (message, fixer = null, jsdocLoc = null, data = null) => {
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
              data,
              loc,
              message,
              node: jsdocNode
            });
          } else {
            context.report({
              data,
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
          overrideReplacesDocs,
          implementsReplacesDocs,
          augmentsExtendsReplacesDocs,
          allowOverrideWithoutParam,
          allowImplementsWithoutParam,
          allowAugmentsExtendsWithoutParam,
          checkSeesForNamepaths,
          forceRequireReturn,
          avoidExampleOnConstructors,
          ancestors,
          sourceCode
        );

        if (
          ignorePrivate &&
          utils.hasTag('private')
        ) {
          return;
        }

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

      let contexts = opts.returns;
      if (typeof opts.returns === 'function') {
        contexts = opts.returns(context, sourceCode, checkJsdoc);
      }

      if (Array.isArray(contexts)) {
        return contexts.reduce((obj, prop) => {
          obj[prop] = checkJsdoc;

          return obj;
        }, {});
      } else if (contexts) {
        return contexts;
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
