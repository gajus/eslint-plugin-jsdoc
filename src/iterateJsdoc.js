import {
  getReducedASTNode, getJSDocComment, commentHandler, parseComment,
} from '@es-joy/jsdoccomment';
import {
  stringify as commentStringify,
} from 'comment-parser';
import {
  rewireSpecs,
  seedTokens,
} from 'comment-parser/util';
import _ from 'lodash';
import jsdocUtils from './jsdocUtils';

/*
const {
   align as commentAlign,
  flow: commentFlow,
  indent: commentIndent,
} = transforms;
*/

const globalState = new Map();

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

  utils.parseClosureTemplateTag = (tag) => {
    return jsdocUtils.parseClosureTemplateTag(tag);
  };

  utils.pathDoesNotBeginWith = jsdocUtils.pathDoesNotBeginWith;

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
  indent,
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

  utils.stringify = (tagBlock, specRewire) => {
    return commentStringify(specRewire ? rewireSpecs(tagBlock) : tagBlock);
  };

  utils.reportJSDoc = (msg, tag, handler, specRewire, data) => {
    report(msg, handler ? (fixer) => {
      handler();
      const replacement = utils.stringify(jsdoc, specRewire);

      return fixer.replaceText(jsdocNode, replacement);
    } : null, tag, data);
  };

  utils.getRegexFromString = (str, requiredFlags) => {
    return jsdocUtils.getRegexFromString(str, requiredFlags);
  };

  utils.getTagDescription = (tg) => {
    const descriptions = [];
    tg.source.some(({
      tokens: {end, lineEnd, postDelimiter, tag, postTag, name, type, description},
    }) => {
      const desc = (
        tag && postTag ||
        !tag && !name && !type && postDelimiter || ''

      // Remove space
      ).slice(1) +
        (description || '') + (lineEnd || '');

      if (end) {
        if (desc) {
          descriptions.push(desc);
        }

        return true;
      }
      descriptions.push(desc);

      return false;
    });

    return descriptions.join('\n');
  };

  utils.getDescription = () => {
    const descriptions = [];
    let lastDescriptionLine = 0;
    jsdoc.source.some(({tokens: {description, tag, end}}, idx) => {
      if (idx && (tag || end)) {
        lastDescriptionLine = idx - 1;

        return true;
      }
      if (idx || description) {
        descriptions.push(description);
      }

      return false;
    });

    return {
      description: descriptions.join('\n'),
      lastDescriptionLine,
    };
  };

  utils.changeTag = (tag, ...tokens) => {
    tag.source.forEach((src, idx) => {
      src.tokens = {
        ...src.tokens,
        ...tokens[idx],
      };
    });
  };

  utils.setTag = (tag, tokens) => {
    tag.source = [{
      // Or tag.source[0].number?
      number: tag.line,
      tokens: seedTokens({
        delimiter: '*',
        postDelimiter: ' ',
        start: indent + ' ',
        tag: '@' + tag.tag,
        ...tokens,
      }),
    }];
  };

  utils.removeTag = (idx) => {
    return utils.removeTagItem(idx);
  };

  utils.removeTagItem = (tagIndex, tagSourceOffset = 0) => {
    const {source: tagSource} = jsdoc.tags[tagIndex];
    let lastIndex;
    const firstNumber = jsdoc.source[0].number;
    tagSource.some(({number}, tagIdx) => {
      const sourceIndex = jsdoc.source.findIndex(({
        number: srcNumber, tokens: {end},
      }) => {
        return number === srcNumber && !end;
      });
      // istanbul ignore else
      if (sourceIndex > -1) {
        let spliceCount = 1;
        tagSource.slice(tagIdx + 1).some(({tokens: {tag, end}}) => {
          if (!tag && !end) {
            spliceCount++;

            return false;
          }

          return true;
        });
        jsdoc.source.splice(sourceIndex + tagSourceOffset, spliceCount - tagSourceOffset);
        tagSource.splice(tagIdx + tagSourceOffset, spliceCount - tagSourceOffset);
        lastIndex = sourceIndex;

        return true;
      }

      // istanbul ignore next
      return false;
    });
    jsdoc.source.slice(lastIndex).forEach((src, idx) => {
      src.number = firstNumber + lastIndex + idx;
    });
  };

  utils.addTag = (targetTagName) => {
    const number = (jsdoc.tags[jsdoc.tags.length - 1]?.source[0]?.number ?? 0) + 1;
    jsdoc.source.splice(number, 0, {
      number,
      source: '',
      tokens: seedTokens({
        delimiter: '*',
        lineEnd: '',
        postDelimiter: ' ',
        start: indent + ' ',
        tag: `@${targetTagName}`,
      }),
    });
    jsdoc.source.slice(number + 1).forEach((src) => {
      src.number++;
    });
  };

  utils.seedTokens = seedTokens;

  utils.emptyTokens = (tokens) => {
    [
      'start',
      'postDelimiter',
      'tag',
      'type',
      'postType',
      'postTag',
      'name',
      'postName',
      'description',
      'end',
      'lineEnd',
    ].forEach((prop) => {
      tokens[prop] = '';
    });
  };

  utils.addLine = (sourceIndex, tokens) => {
    const number = (jsdoc.source[sourceIndex - 1]?.number || 0) + 1;
    jsdoc.source.splice(sourceIndex, 0, {
      number,
      source: '',
      tokens: seedTokens(tokens),
    });

    // If necessary, we can rewire the tags (misnamed method)
    // rewireSource(jsdoc);
  };

  utils.addLines = (tagIndex, tagSourceOffset, numLines) => {
    const {source: tagSource} = jsdoc.tags[tagIndex];
    let lastIndex;
    const firstNumber = jsdoc.source[0].number;
    tagSource.some(({number}) => {
      const makeLine = () => {
        return {
          number,
          source: '',
          tokens: seedTokens({
            delimiter: '*',
            lineEnd: '',
            start: indent + ' ',
          }),
        };
      };
      const makeLines = () => {
        return Array.from({length: numLines}, makeLine);
      };
      const sourceIndex = jsdoc.source.findIndex(({
        number: srcNumber, tokens: {end},
      }) => {
        return number === srcNumber && !end;
      });
      // istanbul ignore else
      if (sourceIndex > -1) {
        const lines = makeLines();
        jsdoc.source.splice(sourceIndex + tagSourceOffset, 0, ...lines);

        // tagSource.splice(tagIdx + 1, 0, ...makeLines());
        lastIndex = sourceIndex;

        return true;
      }

      // istanbul ignore next
      return false;
    });
    jsdoc.source.slice(lastIndex).forEach((src, idx) => {
      src.number = firstNumber + lastIndex + idx;
    });
  };

  utils.makeMultiline = () => {
    const {source: [{tokens}]} = jsdoc;
    const {postDelimiter, description, lineEnd, tag, name, type} = tokens;

    let {tokens: {
      postName, postTag, postType,
    }} = jsdoc.source[0];

    // Strip trailing leftovers from single line ending
    if (!description) {
      if (postName) {
        postName = '';
      } else if (postType) {
        postType = '';
      // eslint-disable-next-line max-len, no-inline-comments
      } else /* istanbul ignore else -- `comment-parser` prevents empty blocks currently per https://github.com/syavorsky/comment-parser/issues/128 */ if (postTag) {
        postTag = '';
      }
    }

    utils.emptyTokens(tokens);

    utils.addLine(1, {
      delimiter: '*',

      // If a description were present, it may have whitespace attached
      //   due to being at the end of the single line
      description: description.trimEnd(),
      lineEnd,
      name,
      postDelimiter,
      postName,
      postTag,
      postType,
      start: indent + ' ',
      tag,
      type,
    });
    utils.addLine(2, {
      end: '*/',
      lineEnd,
      start: indent + ' ',
    });
  };

  utils.flattenRoots = (params) => {
    return jsdocUtils.flattenRoots(params);
  };

  utils.getFunctionParameterNames = (useDefaultObjectProperties) => {
    return jsdocUtils.getFunctionParameterNames(node, useDefaultObjectProperties);
  };

  utils.hasParams = () => {
    return jsdocUtils.hasParams(node);
  };

  utils.isGenerator = () => {
    return node && (
      node.generator ||
      node.type === 'MethodDefinition' && node.value.generator ||
      ['ExportNamedDeclaration', 'ExportDefaultDeclaration'].includes(node.type) &&
        node.declaration.generator
    );
  };

  utils.isConstructor = () => {
    return jsdocUtils.isConstructor(node);
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

  utils.hasATag = (names) => {
    return jsdocUtils.hasATag(jsdoc, names);
  };

  utils.hasTag = (name) => {
    return jsdocUtils.hasTag(jsdoc, name);
  };

  utils.comparePaths = (name) => {
    return jsdocUtils.comparePaths(name);
  };

  utils.dropPathSegmentQuotes = (name) => {
    return jsdocUtils.dropPathSegmentQuotes(name);
  };

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

    if (jsdocUtils.exemptSpeciaMethods(
      jsdoc, node, context, ruleConfig.meta.schema,
    )) {
      return true;
    }

    const exemptedBy = context.options[0]?.exemptedBy ?? [
      'inheritDoc',
      ...mode === 'closure' ? [] : ['inheritdoc'],
    ];
    if (exemptedBy.length && utils.getPresentTags(exemptedBy).length) {
      return true;
    }

    return false;
  };

  [
    'tagMightHaveNamePosition',
    'tagMightHaveTypePosition',
  ].forEach((method) => {
    utils[method] = (tagName, otherModeMaps) => {
      const result = jsdocUtils[method](tagName);
      if (result) {
        return true;
      }

      if (!otherModeMaps) {
        return false;
      }

      const otherResult = otherModeMaps.some((otherModeMap) => {
        return jsdocUtils[method](tagName, otherModeMap);
      });

      return otherResult ? {otherMode: true} : false;
    };
  });

  [
    'tagMustHaveNamePosition',
    'tagMustHaveTypePosition',
    'tagMissingRequiredTypeOrNamepath',
  ].forEach((method) => {
    utils[method] = (tagName, otherModeMaps) => {
      const result = jsdocUtils[method](tagName);
      if (!result) {
        return false;
      }

      // if (!otherModeMaps) { return true; }

      const otherResult = otherModeMaps.every((otherModeMap) => {
        return jsdocUtils[method](tagName, otherModeMap);
      });

      return otherResult ? true : {otherMode: false};
    };
  });

  [
    'isNamepathDefiningTag',
    'tagMightHaveNamepath',
  ].forEach((method) => {
    utils[method] = (tagName) => {
      return jsdocUtils[method](tagName);
    };
  });

  utils.getTagStructureForMode = (mde) => {
    return jsdocUtils.getTagStructureForMode(mde, settings.structuredTags);
  };

  utils.hasDefinedTypeTag = (tag) => {
    return jsdocUtils.hasDefinedTypeTag(tag);
  };

  utils.hasValueOrExecutorHasNonEmptyResolveValue = (anyPromiseAsReturn) => {
    return jsdocUtils.hasValueOrExecutorHasNonEmptyResolveValue(node, anyPromiseAsReturn);
  };

  utils.hasYieldValue = () => {
    if (['ExportNamedDeclaration', 'ExportDefaultDeclaration'].includes(node.type)) {
      return jsdocUtils.hasYieldValue(node.declaration);
    }

    return jsdocUtils.hasYieldValue(node);
  };

  utils.hasYieldReturnValue = () => {
    return jsdocUtils.hasYieldValue(node, true);
  };

  utils.hasThrowValue = () => {
    return jsdocUtils.hasThrowValue(node);
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
    const {tags} = context.options[0] ?? {};

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
      const indnt = ' '.repeat(classJsdocNode.loc.start.column);

      return parseComment(classJsdocNode, indnt);
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
    const matchingJsdocTags = _.filter(jsdoc.tags, {
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
    ignorePrivate: Boolean(context.settings.jsdoc?.ignorePrivate),
    ignoreInternal: Boolean(context.settings.jsdoc?.ignoreInternal),
    maxLines: Number(context.settings.jsdoc?.maxLines ?? 1),
    minLines: Number(context.settings.jsdoc?.minLines ?? 0),

    // `check-tag-names` and many returns/param rules
    tagNamePreference: context.settings.jsdoc?.tagNamePreference ?? {},

    // `check-types` and `no-undefined-types`
    preferredTypes: context.settings.jsdoc?.preferredTypes ?? {},

    // `check-types`, `no-undefined-types`, `valid-types`
    structuredTags: context.settings.jsdoc?.structuredTags ?? {},

    // `require-param`, `require-description`, `require-example`, `require-returns`
    overrideReplacesDocs: context.settings.jsdoc?.overrideReplacesDocs,
    implementsReplacesDocs: context.settings.jsdoc?.implementsReplacesDocs,
    augmentsExtendsReplacesDocs: context.settings.jsdoc?.augmentsExtendsReplacesDocs,

    // Many rules, e.g., `check-tag-names`
    mode: context.settings.jsdoc?.mode ??
      (context.parserPath.includes('@typescript-eslint') ? 'typescript' : 'jsdoc'),
  };
  /* eslint-enable sort-keys-fix/sort-keys-fix */

  jsdocUtils.setTagStructure(settings.mode);
  try {
    jsdocUtils.overrideTagStructure(settings.structuredTags);
  } catch (error) {
    context.report({
      loc: {
        start: {
          column: 1,
          line: 1,
        },
      },
      message: error.message,
    });

    return false;
  }

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
      if (!('line' in jsdocLoc)) {
        jsdocLoc.line = jsdocLoc.source[0].number;
      }

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
  info,
  indent, jsdoc,
  ruleConfig, context, lines, jsdocNode, node, settings,
  sourceCode, iterator, state, iteratingAll,
) => {
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
    indent,
  );

  if (
    !ruleConfig.checkInternal && settings.ignoreInternal &&
    utils.hasTag('internal')
  ) {
    return;
  }
  if (
    !ruleConfig.checkPrivate && settings.ignorePrivate &&
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
    info,
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

const getIndentAndJSDoc = function (lines, jsdocNode) {
  const sourceLine = lines[jsdocNode.loc.start.line - 1];
  const indnt = sourceLine.charAt(0).repeat(jsdocNode.loc.start.column);
  const jsdc = parseComment(jsdocNode, indnt);

  return [indnt, jsdc];
};

/**
 * Create an eslint rule that iterates over all JSDocs, regardless of whether
 * they are attached to a function-like node.
 *
 * @param {JsdocVisitor} iterator
 * @param {{meta: any}} ruleConfig
 * @param contexts
 * @param {boolean} additiveContexts
 */
const iterateAllJsdocs = (iterator, ruleConfig, contexts, additiveContexts) => {
  const trackedJsdocs = [];

  let handler;
  let settings;
  const callIterator = (context, node, jsdocNodes, state, lastCall) => {
    const sourceCode = context.getSourceCode();
    const {lines} = sourceCode;

    const utils = getBasicUtils(context, settings);
    jsdocNodes.forEach((jsdocNode) => {
      if (!(/^\/\*\*\s/).test(sourceCode.getText(jsdocNode))) {
        return;
      }

      const [indent, jsdoc] = getIndentAndJSDoc(
        lines, jsdocNode,
      );

      if (additiveContexts) {
        contexts.forEach(({comment}, idx) => {
          if (comment && handler(comment, jsdoc) === false) {
            return;
          }
          iterate(
            {
              comment,
              lastIndex: idx,
              selector: node?.type,
            },
            indent, jsdoc,
            ruleConfig, context, lines, jsdocNode, node,
            settings, sourceCode, iterator,
            state, true,
          );
        });

        return;
      }

      let lastComment;
      let lastIndex;
      if (contexts && contexts.every(({comment}, idx) => {
        lastComment = comment;
        lastIndex = idx;

        return comment && handler(comment, jsdoc) === false;
      })) {
        return;
      }

      iterate(
        lastComment ? {
          comment: lastComment,
          lastIndex,
          selector: node?.type,
        } : {
          lastIndex,
          selector: node?.type,
        },
        indent, jsdoc,
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
      settings = getSettings(context);
      if (!settings) {
        return {};
      }
      if (contexts) {
        handler = commentHandler(settings);
      }

      const state = {};

      return {
        '*:not(Program)' (node) {
          const reducedNode = getReducedASTNode(node, sourceCode);

          if (node !== reducedNode) {
            return;
          }

          const commentNode = getJSDocComment(sourceCode, node, settings);
          if (trackedJsdocs.includes(commentNode)) {
            return;
          }
          if (!commentNode) {
            if (ruleConfig.nonComment) {
              ruleConfig.nonComment({
                node,
                state,
              });
            }

            return;
          }

          trackedJsdocs.push(commentNode);
          callIterator(context, node, [commentNode], state);
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
      if (!settings) {
        return {};
      }

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
 *   contextSelected?: true,
 *   iterateAllJsdocs?: true,
 * }} ruleConfig
 */
export default function iterateJsdoc (iterator, ruleConfig) {
  const metaType = ruleConfig?.meta?.type;
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
      const settings = getSettings(context);
      if (!settings) {
        return {};
      }

      let contexts;
      if (ruleConfig.contextDefaults || ruleConfig.contextSelected || ruleConfig.matchContext) {
        contexts = ruleConfig.matchContext && context.options[0]?.match ?
          context.options[0].match :
          jsdocUtils.enforcedContexts(context, ruleConfig.contextDefaults);

        if (contexts) {
          contexts = contexts.map((obj) => {
            if (typeof obj === 'object' && !obj.context) {
              return {...obj, context: 'any'};
            }

            return obj;
          });
        }

        const hasPlainAny = contexts?.includes('any');
        const hasObjectAny = !hasPlainAny && contexts?.find((ctxt) => {
          return ctxt?.context === 'any';
        });
        if (hasPlainAny || hasObjectAny) {
          return iterateAllJsdocs(
            iterator, ruleConfig, hasObjectAny ? contexts : null, ruleConfig.matchContext,
          ).create(context);
        }
      }
      const sourceCode = context.getSourceCode();
      const {lines} = sourceCode;

      const state = {};

      const checkJsdoc = (info, handler, node) => {
        const jsdocNode = getJSDocComment(sourceCode, node, settings);

        if (!jsdocNode) {
          return;
        }

        const [indent, jsdoc] = getIndentAndJSDoc(
          lines, jsdocNode,
        );

        if (
          // Note, `handler` should already be bound in its first argument
          //  with these only to be called after the value of
          //  `comment`
          handler && handler(jsdoc) === false
        ) {
          return;
        }

        iterate(
          info, indent, jsdoc,
          ruleConfig, context, lines, jsdocNode, node,
          settings, sourceCode, iterator, state,
        );
      };

      let contextObject = {};

      if (contexts && (
        ruleConfig.contextDefaults || ruleConfig.contextSelected || ruleConfig.matchContext
      )) {
        contextObject = jsdocUtils.getContextObject(
          contexts,
          checkJsdoc,
          commentHandler(settings),
        );
      } else {
        [
          'ArrowFunctionExpression',
          'FunctionDeclaration',
          'FunctionExpression',
        ].forEach((prop) => {
          contextObject[prop] = checkJsdoc.bind(null, {
            selector: prop,
          }, null);
        });
      }

      if (ruleConfig.exit) {
        contextObject['Program:exit'] = () => {
          ruleConfig.exit({
            context,
            state,
          });
        };
      }

      return contextObject;
    },
    meta: ruleConfig.meta,
  };
}
