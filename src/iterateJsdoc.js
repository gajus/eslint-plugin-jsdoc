import {
  parse as commentParser, stringify as commentStringify,
} from 'comment-parser';
import {
  // eslint-disable-next-line import/no-named-default
  default as descriptionTokenizer,
  getJoiner,
} from 'comment-parser/lib/parser/tokenizers/description';
import nameTokenizer from 'comment-parser/lib/parser/tokenizers/name';
import tagTokenizer from 'comment-parser/lib/parser/tokenizers/tag';
import typeTokenizer from 'comment-parser/lib/parser/tokenizers/type';
import {
  rewireSpecs,
  seedBlock,
  seedTokens,
} from 'comment-parser/lib/util';
import _ from 'lodash';
import {
  getJSDocComment, getReducedASTNode,
} from './eslint/getJSDocComment';
import jsdocUtils from './jsdocUtils';

/*
const {
   align as commentAlign,
  flow: commentFlow,
  indent: commentIndent,
} = transforms;
*/

const globalState = new Map();

const hasSeeWithLink = (spec) => {
  return spec.tag === 'see' && (/\{@link.+?\}/u).test(spec.source[0].source);
};

const getTokenizers = () => {
  // trim
  return [
    // Tag
    tagTokenizer(),

    // Type
    (spec) => {
      if (['default', 'defaultvalue', 'see'].includes(spec.tag)) {
        return spec;
      }

      return typeTokenizer()(spec);
    },

    // Name
    (spec) => {
      if (spec.tag === 'template') {
        // const preWS = spec.postTag;
        const remainder = spec.source[0].tokens.description;

        const pos = remainder.search(/(?<![\s,])\s/);

        const name = pos === -1 ? remainder : remainder.slice(0, pos);
        const extra = remainder.slice(pos + 1);
        const [, postName, description] = extra.match(/(\s*)(.*)/);

        spec.name = name;
        spec.optional = false;
        const {tokens} = spec.source[0];
        tokens.name = name;
        tokens.postName = postName;
        tokens.description = description;

        return spec;
      }

      if ([
        'example', 'return', 'returns', 'throws', 'exception',
        'access', 'version', 'since', 'license', 'author',
        'default', 'defaultvalue',
      ].includes(spec.tag) || hasSeeWithLink(spec)) {
        return spec;
      }

      return nameTokenizer()(spec);
    },

    // Description
    (spec) => {
      return descriptionTokenizer(getJoiner('preserve'))(spec);
    },
  ];
};

/**
 *
 * @param {object} commentNode
 * @param {string} indent Whitespace
 * @returns {object}
 */
const parseComment = (commentNode, indent) => {
  // Preserve JSDoc block start/end indentation.
  return commentParser(`/*${commentNode.value}*/`, {
    // @see https://github.com/yavorskiy/comment-parser/issues/21
    tokenizers: getTokenizers(),
  })[0] || seedBlock({
    source: [
      {
        number: 0,
        tokens: seedTokens({
          delimiter: '/**',
          description: '',
          end: '',
          postDelimiter: '',
          start: '',
        }),
      },
      {
        number: 1,
        tokens: seedTokens({
          delimiter: '',
          description: '',
          end: '*/',
          postDelimiter: '',
          start: indent + ' ',
        }),
      },
    ],
  });
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

  utils.parseClosureTemplateTag = (tag) => {
    return jsdocUtils.parseClosureTemplateTag(tag);
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

  utils.reportJSDoc = (msg, tag, handler, specRewire) => {
    report(msg, handler ? (fixer) => {
      handler();
      const replacement = utils.stringify(jsdoc, specRewire);

      return fixer.replaceText(jsdocNode, replacement);
    } : null, tag);
  };

  utils.getDescription = () => {
    const descriptions = [];
    let lastDescriptionLine;
    if (jsdoc.source[0].tokens.description) {
      descriptions.push(jsdoc.source[0].tokens.description);
    }
    jsdoc.source.slice(1).some(({tokens: {description, tag, end}}, idx) => {
      if (tag || end) {
        lastDescriptionLine = idx;

        return true;
      }
      descriptions.push(description);

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

  utils.removeTag = (tagIndex) => {
    const {source} = jsdoc.tags[tagIndex];
    let lastIndex;
    const firstNumber = jsdoc.source[0].number;
    source.forEach(({number}) => {
      const sourceIndex = jsdoc.source.findIndex(({
        number: srcNumber, tokens: {end},
      }) => {
        return number === srcNumber && !end;
      });
      if (sourceIndex > -1) {
        jsdoc.source.splice(sourceIndex, 1);
        lastIndex = sourceIndex;
      }
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
        postDelimiter: ' ',
        start: indent + ' ',
        tag: `@${targetTagName}`,
      }),
    });
    jsdoc.source.slice(number + 1).forEach((src) => {
      src.number++;
    });
  };

  utils.flattenRoots = (params) => {
    return jsdocUtils.flattenRoots(params);
  };

  utils.getFunctionParameterNames = () => {
    return jsdocUtils.getFunctionParameterNames(node);
  };

  utils.hasParams = () => {
    return jsdocUtils.hasParams(node);
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

  utils.hasATag = (name) => {
    return jsdocUtils.hasATag(jsdoc, name);
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

  utils.hasReturnValue = () => {
    return jsdocUtils.hasReturnValue(node);
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
  ruleConfig, context, lines, jsdocNode, node, settings,
  sourceCode, iterator, state, iteratingAll,
) => {
  const sourceLine = lines[jsdocNode.loc.start.line - 1];
  const indent = sourceLine.charAt(0).repeat(jsdocNode.loc.start.column);
  const jsdoc = parseComment(jsdocNode, indent);
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

  let settings;
  const callIterator = (context, node, jsdocNodes, state, lastCall) => {
    const sourceCode = context.getSourceCode();
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
      settings = getSettings(context);
      if (!settings) {
        return {};
      }

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
      let contexts;
      if (ruleConfig.contextDefaults) {
        contexts = jsdocUtils.enforcedContexts(context, ruleConfig.contextDefaults);
        if (contexts.includes('any')) {
          return iterateAllJsdocs(iterator, ruleConfig).create(context);
        }
      }

      const sourceCode = context.getSourceCode();
      const settings = getSettings(context);
      if (!settings) {
        return {};
      }
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
