// eslint-disable-next-line import/no-named-default
import {default as commentParser, stringify as commentStringify} from 'comment-parser';
import _ from 'lodash';
import jsdocUtils from './jsdocUtils';
import {getJSDocComment, getReducedASTNode} from './eslint/getJSDocComment';

const globalState = new Map();

const skipSeeLink = (parser) => {
  return (str, data) => {
    if (data.tag === 'see' && str.match(/\{@link.+?\}/u)) {
      return null;
    }

    return parser(str, data);
  };
};

/**
 *
 * @param {object} commentNode
 * @param {string} indent Whitespace
 * @param {boolean} [trim=true]
 * @returns {object}
 */
const parseComment = (commentNode, indent, trim = true) => {
  // Preserve JSDoc block start/end indentation.
  return commentParser(`${indent}/*${commentNode.value}${indent}*/`, {
    // @see https://github.com/yavorskiy/comment-parser/issues/21
    parsers: [
      commentParser.PARSERS.parse_tag,
      skipSeeLink(
        (str, data) => {
          if (['default', 'defaultvalue'].includes(data.tag)) {
            return null;
          }

          return commentParser.PARSERS.parse_type(str, data);
        },
      ),
      skipSeeLink(
        (str, data) => {
          if ([
            'example', 'return', 'returns', 'throws', 'exception',
            'access', 'version', 'since', 'license', 'author',
            'default', 'defaultvalue',
          ].includes(data.tag)) {
            return null;
          }

          return commentParser.PARSERS.parse_name(str, data);
        },
      ),

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
        const result = str.match(/^ ?((.|\s)+)?/u);

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

const getBasicUtils = (context, {tagNamePreference, mode}) => {
  const utils = {};
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

  utils.getPreferredTagNameObject = ({tagName}) => {
    const ret = jsdocUtils.getPreferredTagName(context, mode, tagName, tagNamePreference);
    const isObject = ret && typeof ret === 'object';
    if (ret === false || isObject && !ret.replacement) {
      return {
        blocked: true,
        tagName,
      };
    }

    return ret;
  };

  return utils;
};

const getUtils = (
  node,
  jsdoc,
  jsdocNode,
  settings,
  report,
  context,
  iteratingAll,
  ruleConfig,
) => {
  const ancestors = context.getAncestors();
  const sourceCode = context.getSourceCode();

  const utils = getBasicUtils(context, settings);

  const {
    tagNamePreference,
    overrideReplacesDocs,
    implementsReplacesDocs,
    augmentsExtendsReplacesDocs,
    maxLines,
    minLines,
    mode,
  } = settings;

  utils.isIteratingFunction = () => {
    return !iteratingAll || [
      'MethodDefinition',
      'ArrowFunctionExpression',
      'FunctionDeclaration',
      'FunctionExpression',
    ].includes(node && node.type);
  };

  utils.isVirtualFunction = () => {
    return iteratingAll && utils.hasATag(['callback', 'function', 'func', 'method']);
  };

  utils.stringify = (tagBlock, tag) => {
    const indent = tag ?
      jsdocUtils.getIndent({
        text: sourceCode.getText(
          tag,
          tag.loc.start.column,
        ),
      }) :
      jsdocUtils.getIndent(sourceCode);

    if (ruleConfig.noTrim) {
      const lastTag = tagBlock.tags[tagBlock.tags.length - 1];
      lastTag.description = lastTag.description.replace(/\n$/, '');
    }

    return commentStringify([tagBlock], {indent}).slice(indent.length - 1);
  };

  utils.reportJSDoc = (msg, tag, handler) => {
    report(msg, handler ? (fixer) => {
      handler();
      const replacement = utils.stringify(jsdoc, node);

      return fixer.replaceText(jsdocNode, replacement);
    } : null, tag);
  };

  utils.flattenRoots = (params) => {
    return jsdocUtils.flattenRoots(params);
  };

  utils.getFunctionParameterNames = () => {
    return jsdocUtils.getFunctionParameterNames(node);
  };

  utils.isConstructor = () => {
    return node?.type === 'MethodDefinition' && node.kind === 'constructor' ||
      node?.parent?.kind === 'constructor';
  };

  utils.isGetter = () => {
    return node && node.parent.kind === 'get';
  };

  utils.isSetter = () => {
    return node && node.parent.kind === 'set';
  };

  utils.getJsdocTagsDeep = (tagName) => {
    const name = utils.getPreferredTagName({tagName});
    if (!name) {
      return false;
    }

    return jsdocUtils.getJsdocTagsDeep(jsdoc, name);
  };

  utils.getPreferredTagName = ({tagName, skipReportingBlockedTag = false, allowObjectReturn = false, defaultMessage = `Unexpected tag \`@${tagName}\``}) => {
    const ret = jsdocUtils.getPreferredTagName(context, mode, tagName, tagNamePreference);
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
    return jsdocUtils.isValidTag(context, mode, name, definedTags);
  };

  utils.hasATag = (name) => {
    return jsdocUtils.hasATag(jsdoc, name);
  };

  utils.hasTag = (name) => {
    return jsdocUtils.hasTag(jsdoc, name);
  };

  const hasSchemaOption = (prop) => {
    const schemaProperties = ruleConfig.meta.schema[0].properties;

    return _.get(
      context,
      `options[0].${prop}`,
      schemaProperties[prop] && schemaProperties[prop].default,
    );
  };

  // eslint-disable-next-line complexity
  utils.avoidDocs = () => {
    if (
      overrideReplacesDocs !== false &&
        (utils.hasTag('override') || utils.classHasTag('override')) ||
      implementsReplacesDocs !== false &&
        (utils.hasTag('implements') || utils.classHasTag('implements')) ||

      augmentsExtendsReplacesDocs &&
        (utils.hasATag(['augments', 'extends']) ||
          utils.classHasTag('augments') ||
            utils.classHasTag('extends'))) {
      return true;
    }

    if (
      !hasSchemaOption('checkConstructors') &&
        (
          utils.isConstructor() ||
          utils.hasATag([
            'class',
            'constructor',
          ])) ||
      !hasSchemaOption('checkGetters') &&
        utils.isGetter() ||
      !hasSchemaOption('checkSetters') &&
        utils.isSetter()) {
      return true;
    }

    const exemptedBy = _.get(
      context, 'options[0].exemptedBy', [
        'inheritDoc',
        ...settings.mode === 'closure' ? [] : ['inheritdoc'],
      ],
    );
    if (exemptedBy.length && utils.getPresentTags(exemptedBy).length) {
      return true;
    }

    return false;
  };

  utils.tagMustHaveEitherTypeOrNamePosition = (tagName) => {
    return jsdocUtils.tagMustHaveEitherTypeOrNamePosition(tagName);
  };

  utils.tagMightHaveEitherTypeOrNamePosition = (tagName) => {
    return jsdocUtils.tagMightHaveEitherTypeOrNamePosition(mode, tagName);
  };

  utils.tagMustHaveNamePosition = (tagName) => {
    return jsdocUtils.tagMustHaveNamePosition(tagName);
  };

  utils.tagMightHaveNamePosition = (tagName) => {
    return jsdocUtils.tagMightHaveNamePosition(tagName);
  };

  utils.tagMustHaveTypePosition = (tagName) => {
    return jsdocUtils.tagMustHaveTypePosition(mode, tagName);
  };

  utils.tagMightHaveTypePosition = (tagName) => {
    return jsdocUtils.tagMightHaveTypePosition(mode, tagName);
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
    return jsdocUtils.getTagsByType(context, mode, tags, tagNamePreference);
  };

  utils.hasOptionTag = (tagName) => {
    const tags = _.get(context, 'options[0].tags');

    return Boolean(tags && tags.includes(tagName));
  };

  utils.getClassNode = () => {
    return [...ancestors, node].reverse().find((parent) => {
      return parent && ['ClassDeclaration', 'ClassExpression'].includes(parent.type);
    }) || null;
  };

  utils.getClassJsdoc = () => {
    const classNode = utils.getClassNode();

    if (!classNode) {
      return null;
    }

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

    return Boolean(classJsdoc) && jsdocUtils.hasTag(classJsdoc, tagName);
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

  return utils;
};

const getSettings = (context) => {
  /* eslint-disable sort-keys-fix/sort-keys-fix */
  const settings = {
    // All rules
    ignorePrivate: Boolean(_.get(context, 'settings.jsdoc.ignorePrivate')),
    maxLines: Number(_.get(context, 'settings.jsdoc.maxLines', 1)),
    minLines: Number(_.get(context, 'settings.jsdoc.minLines', 0)),

    // `check-tag-names` and many returns/param rules
    tagNamePreference: _.get(context, 'settings.jsdoc.tagNamePreference') || {},

    // `check-types` and `no-undefined-types`
    preferredTypes: _.get(context, 'settings.jsdoc.preferredTypes') || {},

    // `require-param`, `require-description`, `require-example`, `require-returns`
    overrideReplacesDocs: _.get(context, 'settings.jsdoc.overrideReplacesDocs'),
    implementsReplacesDocs: _.get(context, 'settings.jsdoc.implementsReplacesDocs'),
    augmentsExtendsReplacesDocs: _.get(context, 'settings.jsdoc.augmentsExtendsReplacesDocs'),

    // Many rules, e.g., `check-tag-names`
    mode: _.get(context, 'settings.jsdoc.mode') || 'jsdoc',
  };
  /* eslint-enable sort-keys-fix/sort-keys-fix */

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
 *     context: object,
 *     sourceCode: object,
 *     indent: string,
 *     jsdoc: object,
 *     jsdocNode: object,
 *     node: object | null,
 *     report: ReturnType<typeof makeReport>,
 *     settings: Settings,
 *     utils: Utils,
 *   }
 * ) => any } JsdocVisitor
 */

const iterate = (
  ruleConfig, context, lines, jsdocNode, node, settings,
  sourceCode, iterator, state, iteratingAll,
) => {
  const sourceLine = lines[jsdocNode.loc.start.line - 1];
  const indent = sourceLine.charAt(0).repeat(jsdocNode.loc.start.column);
  const jsdoc = parseComment(jsdocNode, indent, !ruleConfig.noTrim);
  const report = makeReport(context, jsdocNode);

  const utils = getUtils(
    node,
    jsdoc,
    jsdocNode,
    settings,
    report,
    context,
    iteratingAll,
    ruleConfig,
  );

  if (
    settings.ignorePrivate &&
    !ruleConfig.checkPrivate &&
    (utils.hasTag('private') || _.filter(jsdoc.tags, {
      tag: 'access',
    }).some(({description}) => {
      return description === 'private';
    }))
  ) {
    return;
  }

  iterator({
    context,
    globalState,
    indent,
    iteratingAll,
    jsdoc,
    jsdocNode,
    node,
    report,
    settings,
    sourceCode,
    state,
    utils,
  });
};

/**
 * Create an eslint rule that iterates over all JSDocs, regardless of whether
 * they are attached to a function-like node.
 *
 * @param {JsdocVisitor} iterator
 * @param {{meta: any}} ruleConfig
 */
const iterateAllJsdocs = (iterator, ruleConfig) => {
  const trackedJsdocs = [];

  const callIterator = (context, node, jsdocNodes, state, lastCall) => {
    const sourceCode = context.getSourceCode();
    const settings = getSettings(context);
    const {lines} = sourceCode;

    const utils = getBasicUtils(context, settings);
    jsdocNodes.forEach((jsdocNode) => {
      if (!(/^\/\*\*\s/).test(sourceCode.getText(jsdocNode))) {
        return;
      }
      iterate(
        ruleConfig, context, lines, jsdocNode, node,
        settings, sourceCode, iterator,
        state, true,
      );
    });
    if (lastCall && ruleConfig.exit) {
      ruleConfig.exit({
        context,
        state,
        utils,
      });
    }
  };

  return {
    create (context) {
      const sourceCode = context.getSourceCode();
      const settings = getSettings(context);
      const state = {};

      return {
        '*:not(Program)' (node) {
          const reducedNode = getReducedASTNode(node, sourceCode);

          if (node !== reducedNode) {
            return;
          }

          const comment = getJSDocComment(sourceCode, node, settings);
          if (trackedJsdocs.includes(comment)) {
            return;
          }
          if (!comment) {
            if (ruleConfig.nonComment) {
              ruleConfig.nonComment({
                node,
                state,
              });
            }

            return;
          }

          trackedJsdocs.push(comment);
          callIterator(context, node, [comment], state);
        },
        'Program:exit' () {
          const allComments = sourceCode.getAllComments();
          const untrackedJSdoc = allComments.filter((node) => {
            return !trackedJsdocs.includes(node);
          });

          callIterator(context, null, untrackedJSdoc, state, true);
        },
      };
    },
    meta: ruleConfig.meta,
  };
};

/**
 * Create an eslint rule that iterates over all JSDocs, regardless of whether
 * they are attached to a function-like node.
 *
 * @param {JsdocVisitor} iterator
 * @param {{meta: any}} ruleConfig
 */
const checkFile = (iterator, ruleConfig) => {
  return {
    create (context) {
      const sourceCode = context.getSourceCode();
      const settings = getSettings(context);

      return {
        'Program:exit' () {
          const allComments = sourceCode.getAllComments();
          const {lines} = sourceCode;
          const utils = getBasicUtils(context, settings);

          iterator({
            allComments,
            context,
            lines,
            makeReport,
            settings,
            sourceCode,
            utils,
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

  if (ruleConfig.checkFile) {
    return checkFile(iterator, ruleConfig);
  }

  if (ruleConfig.iterateAllJsdocs) {
    return iterateAllJsdocs(iterator, ruleConfig);
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
      let contexts;
      if (ruleConfig.contextDefaults) {
        contexts = jsdocUtils.enforcedContexts(context, ruleConfig.contextDefaults);
        if (contexts.includes('any')) {
          return iterateAllJsdocs(iterator, ruleConfig).create(context);
        }
      }

      const sourceCode = context.getSourceCode();
      const settings = getSettings(context);
      const {lines} = sourceCode;

      const checkJsdoc = (node) => {
        const jsdocNode = getJSDocComment(sourceCode, node, settings);

        if (!jsdocNode) {
          return;
        }

        iterate(
          ruleConfig, context, lines, jsdocNode, node,
          settings, sourceCode, iterator,
        );
      };

      if (ruleConfig.contextDefaults) {
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
