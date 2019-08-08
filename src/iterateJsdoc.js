// eslint-disable-next-line import/no-named-default
import {default as commentParser, stringify as commentStringify} from 'comment-parser';
import _ from 'lodash';
import jsdocUtils from './jsdocUtils';
import getJSDocComment from './eslint/getJSDocComment';

/**
 *
 * @param {object} commentNode
 * @param {string} indent Whitespace
 * @returns {object}
 */
const parseComment = (commentNode, indent, trim = true) => {
  const skipSeeLink = (parser) => {
    return (str, data) => {
      if (data.tag === 'see' && str.match(/{@link.+?}/)) {
        return null;
      }

      return parser(str, data);
    };
  };

  // Preserve JSDoc block start/end indentation.
  return commentParser(`${indent}/*${commentNode.value}${indent}*/`, {
    // @see https://github.com/yavorskiy/comment-parser/issues/21
    parsers: [
      commentParser.PARSERS.parse_tag,
      skipSeeLink(commentParser.PARSERS.parse_type),
      skipSeeLink(
        (str, data) => {
          if (['example', 'return', 'returns', 'throws', 'exception'].includes(data.tag)) {
            return null;
          }

          return commentParser.PARSERS.parse_name(str, data);
        },
      ),
      trim ?
        commentParser.PARSERS.parse_description :

        // parse_description
        (str, data) => {
          // Only expected throw in previous step is if bad name (i.e.,
          //   missing end bracket on optional name), but `@example`
          //  skips name parsing
          /* istanbul ignore next */
          if (data.errors && data.errors.length) {
            return null;
          }

          // Tweak original regex to capture only single optional space
          const result = str.match(/^\s?((.|\s)+)?/);

          // Always has at least whitespace due to `indent` we've added
          /* istanbul ignore next */
          if (result) {
            return {
              data: {
                description: result[1] === undefined ? '' : result[1],
              },
              source: result[0],
            };
          }

          // Always has at least whitespace due to `indent` we've added
          /* istanbul ignore next */
          return null;
        },
    ],
    trim,
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
    augmentsExtendsReplacesDocs,
    maxLines,
    minLines,
  },
  report,
  context
) => {
  const ancestors = context.getAncestors();
  const sourceCode = context.getSourceCode();

  const utils = {};

  utils.stringify = (tagBlock) => {
    const indent = jsdocUtils.getIndent(sourceCode);

    return commentStringify([tagBlock], {indent}).slice(indent.length - 1);
  };

  utils.reportJSDoc = (msg, tag, handler) => {
    report(msg, (fixer) => {
      handler();
      const replacement = utils.stringify(jsdoc);

      return fixer.replaceText(jsdocNode, replacement);
    }, tag);
  };

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
    const param = utils.getPreferredTagName({tagName: 'param'});
    if (!param) {
      return false;
    }

    return jsdocUtils.getJsdocParameterNamesDeep(jsdoc, param);
  };

  utils.getJsdocParameterNames = () => {
    const param = utils.getPreferredTagName({tagName: 'param'});
    if (!param) {
      return false;
    }

    return jsdocUtils.getJsdocParameterNames(jsdoc, param);
  };

  utils.getPreferredTagName = ({tagName, skipReportingBlockedTag = false, allowObjectReturn = false, defaultMessage = `Unexpected tag \`@${tagName}\``}) => {
    const ret = jsdocUtils.getPreferredTagName(tagName, tagNamePreference);
    const isObject = ret && typeof ret === 'object';
    if (utils.hasTag(tagName) && (ret === false || isObject && !ret.replacement)) {
      if (skipReportingBlockedTag) {
        return {
          blocked: true,
          tagName,
        };
      }
      const message = isObject && ret.message || defaultMessage;
      report(message, null, utils.getTags(tagName)[0]);

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

  utils.tagMustHaveEitherTypeOrNamepath = (tagName) => {
    return jsdocUtils.tagMustHaveEitherTypeOrNamepath(tagName);
  };

  utils.tagMightHaveEitherTypeOrNamepath = (tagName) => {
    return jsdocUtils.tagMightHaveEitherTypeOrNamepath(tagName);
  };

  utils.tagMustHaveNamepath = (tagName) => {
    return jsdocUtils.tagMustHaveNamepath(tagName);
  };

  utils.tagMightHaveNamepath = (tagName) => {
    return jsdocUtils.tagMightHaveNamepath(tagName);
  };

  utils.tagMustHaveType = (tagName) => {
    return jsdocUtils.tagMustHaveType(tagName);
  };

  utils.tagMightHaveType = (tagName) => {
    return jsdocUtils.tagMightHaveType(tagName);
  };

  utils.isNamepathDefiningTag = (tagName) => {
    return jsdocUtils.isNamepathDefiningTag(tagName);
  };

  utils.hasDefinedTypeReturnTag = (tag) => {
    return jsdocUtils.hasDefinedTypeReturnTag(tag);
  };

  utils.hasReturnValue = () => {
    return jsdocUtils.hasReturnValue(node);
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
    return jsdocUtils.filterTags(jsdoc.tags, filter);
  };

  utils.getTagsByType = (tags) => {
    return jsdocUtils.getTagsByType(tags, tagNamePreference);
  };

  utils.getClassNode = () => {
    // Ancestors missing in `Program` comment iteration
    const greatGrandParent = ancestors.length ?
      ancestors.slice(-3)[0] :
      jsdocUtils.getAncestor(sourceCode, jsdocNode, 3);

    const greatGrandParentValue = greatGrandParent && sourceCode.getFirstToken(greatGrandParent).value;

    if (greatGrandParentValue === 'class') {
      return greatGrandParent;
    }

    return false;
  };

  utils.getClassJsdoc = () => {
    const classNode = utils.getClassNode();
    const classJsdocNode = getJSDocComment(sourceCode, classNode, {
      maxLines,
      minLines,
    });

    if (classJsdocNode) {
      const indent = ' '.repeat(classJsdocNode.loc.start.column);

      return parseComment(classJsdocNode, indent);
    }

    return null;
  };

  utils.classHasTag = (tagName) => {
    const classJsdoc = utils.getClassJsdoc();

    return classJsdoc && jsdocUtils.hasTag(classJsdoc, tagName);
  };

  utils.forEachPreferredTag = (tagName, arrayHandler, skipReportingBlockedTag = false) => {
    const targetTagName = utils.getPreferredTagName({
      skipReportingBlockedTag,
      tagName,
    });
    if (!targetTagName ||
      skipReportingBlockedTag && targetTagName && typeof targetTagName === 'object'
    ) {
      return;
    }
    const matchingJsdocTags = _.filter(jsdoc.tags || [], {
      tag: targetTagName,
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
          line: 1,
        },
      },
      message,
    });
  };

  return utils;
};

const getSettings = (context) => {
  const settings = {};

  // All rules
  settings.ignorePrivate = Boolean(_.get(context, 'settings.jsdoc.ignorePrivate'));
  settings.minLines = Number(_.get(context, 'settings.jsdoc.minLines', 0));
  settings.maxLines = Number(_.get(context, 'settings.jsdoc.maxLines', 1));

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
 * @param {object} context
 * @param {object} commentNode
 */
const makeReport = (context, commentNode) => {
  const report = (message, fix = null, jsdocLoc = null, data = null) => {
    let loc;

    if (jsdocLoc) {
      const lineNumber = commentNode.loc.start.line + jsdocLoc.line;

      loc = {
        end: {line: lineNumber},
        start: {line: lineNumber},
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
      node: commentNode,
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
        'Program' () {
          const sourceCode = context.getSourceCode();
          const comments = sourceCode.getAllComments();

          comments.forEach((comment) => {
            if (!sourceCode.getText(comment).startsWith('/**')) {
              return;
            }

            const indent = ' '.repeat(comment.loc.start.column);
            const jsdoc = parseComment(comment, indent, !ruleConfig.noTrim);
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
              settings,
              sourceCode,
              utils: getUtils(null, jsdoc, jsdocNode, settings, report, context),
            });
          });
        },
      };
    },
    meta: ruleConfig.meta,
  };
};

export {
  getSettings,
  parseComment,
};

/**
 * @param {JsdocVisitor} iterator
 * @param {{
 *   meta: any,
 *   contextDefaults?: true | string[],
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
    return iterateAllJsdocs(iterator, {
      meta: ruleConfig.meta,
      noTrim: ruleConfig.noTrim,
    });
  }

  return {
    /**
     * The entrypoint for the JSDoc rule.
     *
     * @param {*} context
     *   a reference to the context which hold all important information
     *   like settings and the sourcecode to check.
     * @returns {object}
     *   a list with parser callback function.
     */
    create (context) {
      const sourceCode = context.getSourceCode();

      const settings = getSettings(context);

      const checkJsdoc = (node) => {
        const jsdocNode = getJSDocComment(sourceCode, node, settings);

        if (!jsdocNode) {
          return;
        }

        const indent = ' '.repeat(jsdocNode.loc.start.column);

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
          utils,
        });
      };

      if (ruleConfig.contextDefaults) {
        const contexts = jsdocUtils.enforcedContexts(context, ruleConfig.contextDefaults);

        return jsdocUtils.getContextObject(contexts, checkJsdoc);
      }

      return {
        ArrowFunctionExpression: checkJsdoc,
        FunctionDeclaration: checkJsdoc,
        FunctionExpression: checkJsdoc,
      };
    },
    meta: ruleConfig.meta,
  };
}
