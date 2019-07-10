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
    overrideReplacesDocs,
    implementsReplacesDocs,
    augmentsExtendsReplacesDocs
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

  utils.avoidDocs = () => {
    if (
      overrideReplacesDocs !== false &&
        (utils.hasTag('override') || utils.classHasTag('override')) ||
      implementsReplacesDocs !== false &&
        (utils.hasTag('implements') || utils.classHasTag('implements')) ||

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
  utils.isNamepathTag = (tagName, checkSeesForNamepaths) => {
    return jsdocUtils.isNamepathTag(tagName, checkSeesForNamepaths);
  };

  utils.isTagWithType = (tagName) => {
    return jsdocUtils.isTagWithType(tagName);
  };

  utils.passesEmptyNamepathCheck = (tag, allowEmptyNamepaths) => {
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

  utils.reportSettings = (message) => {
    context.report({
      loc: {
        start: {
          column: 1,
          line: 1
        }
      },
      message
    });
  };

  return utils;
};

const getSettings = (context) => {
  const settings = {};

  // All rules
  settings.ignorePrivate = Boolean(_.get(context, 'settings.jsdoc.ignorePrivate'));

  // `check-tag-names` and many returns/param rules
  settings.tagNamePreference = _.get(context, 'settings.jsdoc.tagNamePreference') || {};

  // `check-types` and `no-undefined-types`
  settings.preferredTypes = _.get(context, 'settings.jsdoc.preferredTypes') || {};

  // `require-param`, `require-description`, `require-example`, `require-returns`
  settings.overrideReplacesDocs = _.get(context, 'settings.jsdoc.overrideReplacesDocs');
  settings.implementsReplacesDocs = _.get(context, 'settings.jsdoc.implementsReplacesDocs');
  settings.augmentsExtendsReplacesDocs = _.get(context, 'settings.jsdoc.augmentsExtendsReplacesDocs');

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
 *   returns?: string[],
 *   iterateAllJsdocs?: true,
 * }} ruleConfig
 */
export default function iterateJsdoc (iterator, ruleConfig) {
  const metaType = _.get(ruleConfig, 'meta.type');
  if (!metaType || !['problem', 'suggestion', 'layout'].includes(metaType)) {
    throw new TypeError('Rule must include `meta.type` option (with value "problem", "suggestion", or "layout")');
  }
  if (typeof iterator !== 'function') {
    throw new TypeError('The iterator argument must be a function.');
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
      if (ruleConfig.contextDefaults) {
        contexts = jsdocUtils.enforcedContexts(context, ruleConfig.contextDefaults);
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
