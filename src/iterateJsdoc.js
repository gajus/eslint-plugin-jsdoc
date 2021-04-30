import {
  getReducedASTNode, getJSDocComment,
} from '@es-joy/jsdoccomment';
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
import esquery from 'esquery';
import {
  parse as jsdoctypeParse,
} from 'jsdoctypeparser';
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

  utils.getRegexFromString = (str, requiredFlags) => {
    return jsdocUtils.getRegexFromString(str, requiredFlags);
  };

  utils.getTagDescription = (tg) => {
    const descriptions = [];
    tg.source.some(({
      tokens: {end, postDelimiter, tag, postTag, name, type, description},
    }) => {
      const desc = (
        tag && postTag ||
        !tag && !name && !type && postDelimiter || ''

      // Remove space
      ).slice(1) +
        (description || '');

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
    let lastDescriptionLine;
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

      const [indent, jsdoc] = getIndentAndJSDoc(
        lines, jsdocNode,
      );

      iterate(
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

const toCamelCase = (str) => {
  return str.toLowerCase().replace(/^[a-z]/, (init) => {
    return init.toUpperCase();
  }).replace(/_([a-z])/, (__, wordInit) => {
    return wordInit.toUpperCase();
  });
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
      const {mode} = settings;
      const {lines} = sourceCode;

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
          indent, jsdoc,
          ruleConfig, context, lines, jsdocNode, node,
          settings, sourceCode, iterator,
        );
      };

      if (ruleConfig.contextDefaults) {
        return jsdocUtils.getContextObject(
          contexts,
          checkJsdoc,
          (commentSelector, jsdoc) => {
            const selector = esquery.parse(commentSelector);

            const {tokens: {
              delimiter: delimiterRoot,
              postDelimiter: postDelimiterRoot,
              end: endRoot,
              description: descriptionRoot,
            }} = jsdoc.source[0];
            const obj = {
              delimiter: delimiterRoot,
              description: descriptionRoot,

              // This will be overwritten if there are other entries
              end: endRoot,

              postDelimiter: postDelimiterRoot,
            };
            const ast = {
              type: 'JSDocBlock',
              ...obj,
            };

            const tags = [];
            let lastDescriptionLine;
            let lastTagDescriptionHolder = false;
            let lastTagTypeHolder = false;
            jsdoc.source.slice(1).forEach((info, idx) => {
              const {tokens} = info;
              if (tokens.tag || tokens.end) {
                if (lastDescriptionLine === undefined) {
                  lastDescriptionLine = idx;
                }
                if (tokens.end) {
                  ast.end = tokens.end;
                } else {
                  const {
                    // eslint-disable-next-line no-unused-vars -- Discarding
                    end: ed,
                    ...tkns
                  } = tokens;

                  let parsedType = null;
                  try {
                    parsedType = jsdoctypeParse(tokens.type, {mode});
                  } catch {
                    // Ignore
                  }

                  // Todo: See about getting jsdoctypeparser to make these
                  //         changes; the AST might also be rethought to use
                  //         fewer types and more properties
                  const sel = esquery.parse('*[type]');
                  esquery.traverse(parsedType, sel, (node) => {
                    const {type} = node;

                    node.type = `JSDocType${toCamelCase(type)}`;
                  });

                  const tag = {
                    ...tkns,
                    descriptionLines: [],
                    parsedType,
                    rawType: tokens.type,
                    type: 'JSDocTag',
                    typeLines: [],
                  };
                  if (!lastTagDescriptionHolder) {
                    const {
                      delimiter,
                      description,
                      postDelimiter,
                      start,
                    } = tkns;
                    tag.descriptionLines = lastTagDescriptionHolder = [
                      {
                        delimiter,
                        description,
                        postDelimiter,
                        start,
                        type: 'JSDocDescriptionLine',
                      },
                    ];
                  }
                  if (!lastTagTypeHolder) {
                    const {
                      delimiter,
                      type: rawType,
                      postDelimiter,
                      start,
                    } = tkns;
                    tag.typeLines = lastTagTypeHolder = [
                      {
                        delimiter,
                        postDelimiter,
                        rawType,
                        start,
                        type: 'JSDocTypeLine',
                      },
                    ];
                  }
                  tags.push(tag);
                }

                return;

              // Multi-line tag descriptions
              }

              if (lastTagDescriptionHolder && tokens.description) {
                const {
                  delimiter,
                  description,
                  postDelimiter,
                  start,
                } = tokens;
                lastTagDescriptionHolder.push(
                  {
                    delimiter,
                    description,
                    postDelimiter,
                    start,
                    type: 'JSDocDescriptionLine',
                  },
                );

                return;
              }
              if (lastTagTypeHolder && tokens.type) {
                const {
                  delimiter,
                  postDelimiter,
                  start,
                  type: rawType,
                } = tokens;
                lastTagDescriptionHolder.push(
                  {
                    delimiter,
                    postDelimiter,
                    rawType,
                    start,
                    type: 'JSDocTypeLine',
                  },
                );

                return;
              }
              ast.description += '\n' + tokens.description;
            });

            ast.lastDescriptionLine = lastDescriptionLine;
            ast.tags = tags;

            console.log('jsdoc', jsdoc);
            console.log('ast', ast);

            /* eslint-disable sort-keys-fix/sort-keys-fix -- Keep in order */
            const typeVisitorKeys = {
              NAME: [],
              NAMED_PARAMETER: ['typeName'],
              MEMBER: ['owner'],
              UNION: ['left', 'right'],
              INTERSECTION: ['left', 'right'],
              VARIADIC: ['value'],
              RECORD: ['entries'],
              RECORD_ENTRY: ['value'],
              TUPLE: ['entries'],
              GENERIC: ['subject', 'objects'],
              MODULE: ['value'],
              OPTIONAL: ['value'],
              NULLABLE: ['value'],
              NOT_NULLABLE: ['value'],
              FUNCTION: ['params', 'returns', 'this', 'new'],
              ARROW: ['params', 'returns'],
              ANY: [],
              UNKNOWN: [],
              INNER_MEMBER: ['owner'],
              INSTANCE_MEMBER: ['owner'],
              STRING_VALUE: [],
              NUMBER_VALUE: [],
              EXTERNAL: [],
              FILE_PATH: [],
              PARENTHESIS: ['value'],
              TYPE_QUERY: ['name'],
              KEY_QUERY: ['value'],
              IMPORT: ['path'],
              /* eslint-enable sort-keys-fix/sort-keys-fix -- Keep in order */
            };

            const convertedTypeVisitorKeys = Object.entries(
              typeVisitorKeys,
            ).reduce((object, [key, value]) => {
              object[`JSDocType${toCamelCase(key)}`] = value;

              return object;
            }, {});

            return esquery.matches(ast, selector, null, {
              visitorKeys: {
                ...convertedTypeVisitorKeys,
                JSDocBlock: ['tags'],
                JSDocDescriptionLine: [],
                JSDocTag: ['descriptionLines', 'typeLines', 'parsedType'],
              },
            });
          },
        );
      }

      const checkJsdocNoHandler = checkJsdoc.bind(null, null, null);

      return {
        ArrowFunctionExpression: checkJsdocNoHandler,
        FunctionDeclaration: checkJsdocNoHandler,
        FunctionExpression: checkJsdocNoHandler,
      };
    },
    meta: ruleConfig.meta,
  };
}
