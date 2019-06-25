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
  {
    tagNamePreference,
    additionalTagNames,
    allowEmptyNamepaths,
    overrideReplacesDocs,
    implementsReplacesDocs,
    augmentsExtendsReplacesDocs,
    allowOverrideWithoutParam,
    allowImplementsWithoutParam,
    allowAugmentsExtendsWithoutParam,
    checkSeesForNamepaths
  },
  ancestors,
  sourceCode,
  context
) => {
  const utils = {};

  utils.getFunctionParameterNames = () => {
    return jsdocUtils.getFunctionParameterNames(node);
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

  utils.isValidTag = (name) => {
    return jsdocUtils.isValidTag(name, additionalTagNames);
  };

  utils.hasATag = (name) => {
    return jsdocUtils.hasATag(jsdoc, name);
  };

  utils.hasTag = (name) => {
    return jsdocUtils.hasTag(jsdoc, name);
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

  utils.avoidDocsParamConditionally = (param) => {
    // After deprecation, the `param` parameter can be removed, but for now,
    //  don't default for `param` as it may have its own explicit settings to the contrary
    return (param && overrideReplacesDocs || !param && overrideReplacesDocs !== false) &&
      (utils.hasTag('override') || utils.classHasTag('override')) ||
    (param && implementsReplacesDocs || !param && implementsReplacesDocs !== false) &&
      (utils.hasTag('implements') || utils.classHasTag('implements'));
  };

  utils.avoidDocs = (param) => {
    if (param && utils.avoidDocsParamOnly() ||
      utils.avoidDocsParamConditionally(param) ||

      // inheritdoc implies that all documentation is inherited; see https://jsdoc.app/tags-inheritdoc.html
      utils.hasTag('inheritdoc') ||

      augmentsExtendsReplacesDocs &&
        (utils.hasATag(['augments', 'extends']) ||
          utils.classHasTag('augments') ||
            utils.classHasTag('extends'))) {
      return true;
    }

    const exemptedBy = _.get(context, 'options[0].exemptedBy');
    if (exemptedBy && exemptedBy.length && utils.getPresentTags(exemptedBy).length) {
      return true;
    }

    return false;
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

  utils.passesEmptyNamepathCheck = (tag) => {
    return !tag.name && allowEmptyNamepaths &&
      jsdocUtils.isPotentiallyEmptyNamepathTag(tag.tag);
  };

  utils.hasDefinedTypeReturnTag = (tag) => {
    return jsdocUtils.hasDefinedTypeReturnTag(tag);
  };

  utils.hasReturnValue = (ignoreAsync = false) => {
    return jsdocUtils.hasReturnValue(node, context, ignoreAsync);
  };

  utils.isAsync = () => {
    return node.async;
  };

  utils.getTags = (tagName) => {
    return utils.filterTags((item) => {
      return item.tag === tagName;
    });
  };

  utils.getPresentTags = (tagList) => {
    return utils.filterTags((tag) => {
      return tagList.includes(tag.tag);
    });
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

  utils.getClassJsdoc = () => {
    const classNode = utils.getClassNode();
    const classJsdocNode = getJSDocComment(sourceCode, classNode);

    if (classJsdocNode) {
      const indent = _.repeat(' ', classJsdocNode.loc.start.column);

      return parseComment(classJsdocNode, indent);
    }

    return null;
  };

  utils.classHasTag = (tagName) => {
    const classJsdoc = utils.getClassJsdoc();

    return classJsdoc && jsdocUtils.hasTag(classJsdoc, tagName);
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

const getSettings = (context) => {
  const settings = {};

  // All rules
  settings.ignorePrivate = Boolean(_.get(context, 'settings.jsdoc.ignorePrivate'));

  // `check-tag-names` and many require/param rules
  settings.tagNamePreference = _.get(context, 'settings.jsdoc.tagNamePreference') || {};

  // `check-tag-names` only
  settings.additionalTagNames = _.get(context, 'settings.jsdoc.additionalTagNames') || {};

  // `check-examples` only
  settings.exampleCodeRegex = _.get(context, 'settings.jsdoc.exampleCodeRegex') || null;
  settings.rejectExampleCodeRegex = _.get(context, 'settings.jsdoc.rejectExampleCodeRegex') || null;
  settings.matchingFileName = _.get(context, 'settings.jsdoc.matchingFileName') || null;
  settings.baseConfig = _.get(context, 'settings.jsdoc.baseConfig') || {};
  settings.configFile = _.get(context, 'settings.jsdoc.configFile');
  settings.eslintrcForExamples = _.get(context, 'settings.jsdoc.eslintrcForExamples') !== false;
  settings.allowInlineConfig = _.get(context, 'settings.jsdoc.allowInlineConfig') !== false;
  settings.reportUnusedDisableDirectives = _.get(context, 'settings.jsdoc.reportUnusedDisableDirectives') !== false;
  settings.captionRequired = Boolean(_.get(context, 'settings.jsdoc.captionRequired'));
  settings.noDefaultExampleRules = Boolean(_.get(context, 'settings.jsdoc.noDefaultExampleRules'));

  // `require-param`, `require-description`, `require-example`, `require-returns`
  settings.overrideReplacesDocs = _.get(context, 'settings.jsdoc.overrideReplacesDocs');
  settings.implementsReplacesDocs = _.get(context, 'settings.jsdoc.implementsReplacesDocs');
  settings.augmentsExtendsReplacesDocs = _.get(context, 'settings.jsdoc.augmentsExtendsReplacesDocs');

  // `require-param` only (deprecated)
  settings.allowOverrideWithoutParam = _.get(context, 'settings.jsdoc.allowOverrideWithoutParam');
  settings.allowImplementsWithoutParam = _.get(context, 'settings.jsdoc.allowImplementsWithoutParam');
  settings.allowAugmentsExtendsWithoutParam = _.get(context, 'settings.jsdoc.allowAugmentsExtendsWithoutParam');

  // `valid-types` only
  settings.allowEmptyNamepaths = _.get(context, 'settings.jsdoc.allowEmptyNamepaths') !== false;
  settings.checkSeesForNamepaths = Boolean(_.get(context, 'settings.jsdoc.checkSeesForNamepaths'));

  // `require-returns` only
  settings.forceRequireReturn = Boolean(_.get(context, 'settings.jsdoc.forceRequireReturn'));

  // `require-example` only
  settings.avoidExampleOnConstructors = Boolean(_.get(context, 'settings.jsdoc.avoidExampleOnConstructors'));

  return settings;
};

export {
  parseComment
};

/**
 * @typedef {ReturnType<typeof curryUtils>} Utils
 * @typedef {ReturnType<typeof getSettings>} Settings
 *
 * @param {(arg: {utils: Utils, settings: Settings}) => any} iterator
 * @param {{contextDefaults: (true|string[]), meta: any, returns?: any}} ruleConfig
 */
export default function iterateJsdoc (iterator, ruleConfig) {
  const metaType = _.get(ruleConfig, 'meta.type');
  if (!metaType || !['problem', 'suggestion', 'layout'].includes(metaType)) {
    throw new TypeError('Rule must include `meta.type` option (with value "problem", "suggestion", or "layout")');
  }
  if (typeof iterator !== 'function' && (!ruleConfig || typeof ruleConfig.returns !== 'function')) {
    throw new TypeError('The iterator argument must be a function or an object with a `returns` method.');
  }

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

      const settings = getSettings(context);

      let contexts = ruleConfig.returns;
      if (typeof ruleConfig.returns === 'function') {
        contexts = ruleConfig.returns(context, sourceCode);
      } else if (ruleConfig.contextDefaults) {
        contexts = jsdocUtils.enforcedContexts(context, ruleConfig.contextDefaults);
      }

      if (!Array.isArray(contexts) && contexts) {
        return contexts;
      }
      const checkJsdoc = (node) => {
        const jsdocNode = getJSDocComment(sourceCode, node);

        if (!jsdocNode) {
          return;
        }

        const ancestors = context.getAncestors();

        const indent = _.repeat(' ', jsdocNode.loc.start.column);

        const jsdoc = parseComment(jsdocNode, indent);

        const report = (message, fix = null, jsdocLoc = null, data = null) => {
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

          context.report({
            data,
            fix,
            loc,
            message,
            node: jsdocNode
          });
        };

        const utils = curryUtils(
          node,
          jsdoc,
          settings,
          ancestors,
          sourceCode,
          context
        );

        if (
          settings.ignorePrivate &&
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
          settings,
          sourceCode,
          utils
        });
      };
      if (!contexts) {
        return {
          ArrowFunctionExpression: checkJsdoc,
          FunctionDeclaration: checkJsdoc,
          FunctionExpression: checkJsdoc,
          ObjectExpression: checkJsdoc
        };
      }

      return contexts.reduce((obj, prop) => {
        obj[prop] = checkJsdoc;

        return obj;
      }, {});
    },
    meta: ruleConfig.meta
  };
}
