import _ from 'lodash';
import commentParser from 'comment-parser';
import jsdocUtils from './jsdocUtils';
import getJSDocComment from './eslint/getJSDocComment';

const parseComment = (commentNode, indent) => {
  // Preserve JSDoc block start/end indentation.
  return commentParser(`${indent}/*${commentNode.value}${indent}*/`, {
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

const getUtils = (
  node,
  jsdoc,
  jsdocNode,
  {
    tagNamePreference,
    allowEmptyNamepaths,
    overrideReplacesDocs,
    implementsReplacesDocs,
    augmentsExtendsReplacesDocs,
    allowOverrideWithoutParam,
    allowImplementsWithoutParam,
    allowAugmentsExtendsWithoutParam,
    checkSeesForNamepaths
  },
  report,
  context
) => {
  const ancestors = context.getAncestors();
  const sourceCode = context.getSourceCode();

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
    const param = utils.getPreferredTagName('param');
    if (!param) {
      return false;
    }

    return jsdocUtils.getJsdocParameterNamesDeep(jsdoc, param);
  };

  utils.getJsdocParameterNames = () => {
    const param = utils.getPreferredTagName('param');
    if (!param) {
      return false;
    }

    return jsdocUtils.getJsdocParameterNames(jsdoc, param);
  };

  utils.getPreferredTagName = (name, allowObjectReturn = false, defaultMessage = `Unexpected tag \`@${name}\``) => {
    const ret = jsdocUtils.getPreferredTagName(name, tagNamePreference);
    const isObject = ret && typeof ret === 'object';
    if (ret === false || isObject && !ret.replacement) {
      const message = isObject && ret.message || defaultMessage;
      report(message, null, utils.getTags(name)[0]);

      return false;
    }

    return isObject && !allowObjectReturn ? ret.replacement : ret;
  };

  utils.isValidTag = (name, definedTags) => {
    return jsdocUtils.isValidTag(name, definedTags);
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

  utils.forEachPreferredTag = (tagName, arrayHandler) => {
    const targetTagName = utils.getPreferredTagName(tagName);
    if (!targetTagName) {
      return;
    }
    const matchingJsdocTags = _.filter(jsdoc.tags || [], {
      tag: targetTagName
    });

    matchingJsdocTags.forEach((matchingJsdocTag) => {
      arrayHandler(matchingJsdocTag, targetTagName);
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

  // `require-param`, `require-description`, `require-example`, `require-returns`
  settings.overrideReplacesDocs = _.get(context, 'settings.jsdoc.overrideReplacesDocs');
  settings.implementsReplacesDocs = _.get(context, 'settings.jsdoc.implementsReplacesDocs');
  settings.augmentsExtendsReplacesDocs = _.get(context, 'settings.jsdoc.augmentsExtendsReplacesDocs');

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

  // `require-param` only (deprecated)
  settings.allowOverrideWithoutParam = _.get(context, 'settings.jsdoc.allowOverrideWithoutParam');
  settings.allowImplementsWithoutParam = _.get(context, 'settings.jsdoc.allowImplementsWithoutParam');
  settings.allowAugmentsExtendsWithoutParam = _.get(context, 'settings.jsdoc.allowAugmentsExtendsWithoutParam');

  // `valid-types` only
  settings.allowEmptyNamepaths = _.get(context, 'settings.jsdoc.allowEmptyNamepaths') !== false;
  settings.checkSeesForNamepaths = Boolean(_.get(context, 'settings.jsdoc.checkSeesForNamepaths'));

  // `require-example` only
  settings.avoidExampleOnConstructors = Boolean(_.get(context, 'settings.jsdoc.avoidExampleOnConstructors'));

  return settings;
};

/**
 * Create the report function
 *
 * @param {Object} context
 * @param {Object} commentNode
 */
const makeReport = (context, commentNode) => {
  const report = (message, fix = null, jsdocLoc = null, data = null) => {
    let loc;

    if (jsdocLoc) {
      const lineNumber = commentNode.loc.start.line + jsdocLoc.line;

      loc = {
        end: {line: lineNumber},
        start: {line: lineNumber}
      };
      if (jsdocLoc.column) {
        const colNumber = commentNode.loc.start.column + jsdocLoc.column;

        loc.end.column = colNumber;
        loc.start.column = colNumber;
      }
    }

    context.report({
      data,
      fix,
      loc,
      message,
      node: commentNode
    });
  };

  return report;
};

/**
 * @typedef {ReturnType<typeof getUtils>} Utils
 * @typedef {ReturnType<typeof getSettings>} Settings
 * @typedef {(
 *   arg: {
 *     context: Object,
 *     sourceCode: Object,
 *     indent: string,
 *     jsdoc: Object,
 *     jsdocNode: Object,
 *     node: Object | null,
 *     report: ReturnType<typeof makeReport>,
 *     settings: Settings,
 *     utils: Utils,
 *   }
 * ) => any } JsdocVisitor
 */

/**
 * Create an eslint rule that iterates over all JSDocs, regardless of whether
 * they are attached to a function-like node.
 *
 * @param {JsdocVisitor} iterator
 * @param {{meta: any}} ruleConfig
 */
const iterateAllJsdocs = (iterator, ruleConfig) => {
  return {
    create (context) {
      return {
        'Program:exit' () {
          const comments = context.getSourceCode().getAllComments();

          comments.forEach((comment) => {
            if (!context.getSourceCode().getText(comment).startsWith('/**')) {
              return;
            }

            const indent = _.repeat(' ', comment.loc.start.column);
            const jsdoc = parseComment(comment, indent);
            const settings = getSettings(context);
            const report = makeReport(context, comment);
            const jsdocNode = comment;

            iterator({
              context,
              indent,
              jsdoc,
              jsdocNode,
              node: null,
              report,
              settings: getSettings(context),
              sourceCode: context.getSourceCode(),
              utils: getUtils(null, jsdoc, jsdocNode, settings, report, context)
            });
          });
        }
      };
    },
    meta: ruleConfig.meta
  };
};

export {
  parseComment
};

/**
 * @param {JsdocVisitor} iterator
 * @param {{
 *   meta: any,
 *   contextDefaults?: true | string[],
 *   returns?: any,
 *   iterateAllJsdocs?: true,
 * }} ruleConfig
 */
export default function iterateJsdoc (iterator, ruleConfig) {
  const metaType = _.get(ruleConfig, 'meta.type');
  if (!metaType || !['problem', 'suggestion', 'layout'].includes(metaType)) {
    throw new TypeError('Rule must include `meta.type` option (with value "problem", "suggestion", or "layout")');
  }
  if (typeof iterator !== 'function' && (!ruleConfig || typeof ruleConfig.returns !== 'function')) {
    throw new TypeError('The iterator argument must be a function or an object with a `returns` method.');
  }

  if (ruleConfig.iterateAllJsdocs) {
    return iterateAllJsdocs(iterator, {meta: ruleConfig.meta});
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

        const indent = _.repeat(' ', jsdocNode.loc.start.column);

        const jsdoc = parseComment(jsdocNode, indent);

        const report = makeReport(context, jsdocNode);

        const utils = getUtils(
          node,
          jsdoc,
          jsdocNode,
          settings,
          report,
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
          FunctionExpression: checkJsdoc
        };
      }

      return jsdocUtils.getContextObject(contexts, checkJsdoc);
    },
    meta: ruleConfig.meta
  };
}
