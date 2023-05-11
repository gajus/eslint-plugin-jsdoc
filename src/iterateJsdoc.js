import {
  getJSDocComment,
  commentHandler,
  parseComment,
} from '@es-joy/jsdoccomment';
import {
  stringify as commentStringify,
  util,
} from 'comment-parser';
import jsdocUtils from './jsdocUtils';

/**
 * @typedef {number} Integer
 */

const {
  rewireSpecs,
  seedTokens,
} = util;

// todo: Change these `any` types once importing types properly.

/**
 * Should use ESLint rule's typing.
 *
 * @typedef {any} EslintRuleMeta
 */

/**
 * A plain object for tracking state as needed by rules across iterations.
 *
 * @typedef {any} StateObject
 */

/**
 * The Node AST as supplied by the parser.
 *
 * @typedef {any} Node
 */

/*
const {
   align as commentAlign,
  flow: commentFlow,
  indent: commentIndent,
} = transforms;
*/

const globalState = new Map();
/**
 * @param {import('eslint').Rule.RuleContext} context
 * @param {{
 *   tagNamePreference?: import('./jsdocUtils.js').TagNamePreference,
 *   mode?: import('./jsdocUtils.js').ParserMode
 * }} cfg
 * @returns {Utils}
 */
const getBasicUtils = (context, {
  tagNamePreference,
  mode,
}) => {
  const utils = {};

  /**
   * @param {string} message
   * @returns {void}
   */
  utils.reportSettings = (message) => {
    context.report({
      loc: {
        end: {
          column: 1,
          line: 1,
        },
        start: {
          column: 1,
          line: 1,
        },
      },
      message,
    });
  };

  /**
   * @param {import('comment-parser').Spec} tag
   * @returns {string[]}
   */
  utils.parseClosureTemplateTag = (tag) => {
    return jsdocUtils.parseClosureTemplateTag(tag);
  };

  utils.pathDoesNotBeginWith = jsdocUtils.pathDoesNotBeginWith;

  /**
   * @param {{
   *   tagName: string
   * }} cfg
   */
  utils.getPreferredTagNameObject = ({
    tagName,
  }) => {
    const ret = jsdocUtils.getPreferredTagName(
      context,
      /** @type {import('./jsdocUtils.js').ParserMode} */ (mode),
      tagName,
      tagNamePreference,
    );
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

/**
 * @param {} node
 * @param {import('comment-parser').Block} jsdoc
 * @param {import('@es-joy/jsdoccomment').Token} jsdocNode
 * @param {Settings} settings
 * @param {} report
 * @param {import('eslint').Rule.RuleContext} context
 * @param {boolean} iteratingAll
 * @param {} ruleConfig
 * @param {string} indent
 * @returns {}
 */
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
    ignoreReplacesDocs,
    implementsReplacesDocs,
    augmentsExtendsReplacesDocs,
    maxLines,
    minLines,
    mode,
  } = settings;

  /**
   * @returns {boolean}
   */
  utils.isIteratingFunction = () => {
    return !iteratingAll || [
      'MethodDefinition',
      'ArrowFunctionExpression',
      'FunctionDeclaration',
      'FunctionExpression',
    ].includes(node && node.type);
  };

  /**
   * @returns {boolean}
   */
  utils.isVirtualFunction = () => {
    return iteratingAll && utils.hasATag([
      'callback', 'function', 'func', 'method',
    ]);
  };

  /**
   * @param {import('comment-parser').Block} tagBlock
   * @param {boolean} [specRewire]
   * @returns {string}
   */
  utils.stringify = (tagBlock, specRewire) => {
    let block;
    if (specRewire) {
      block = rewireSpecs(tagBlock);
    }

    return commentStringify(/** @type {import('comment-parser').Block} */ (
      specRewire ? block : tagBlock));
  };

  /* eslint-disable jsdoc/valid-types -- Old version */
  /**
   * @param {string} msg
   * @param {import('comment-parser').Spec} tag
   * @param {() => void} handler
   * @param {boolean} [specRewire]
   * @param {{
   *   [key: string]: undefined|string
   * }} [data]
   */
  utils.reportJSDoc = (msg, tag, handler, specRewire, data) => {
    /* eslint-enable jsdoc/valid-types -- Old version */
    report(msg, handler ? /** @type {import('eslint').Rule.ReportFixer} */ (
      fixer,
    ) => {
      handler();
      const replacement = utils.stringify(jsdoc, specRewire);

      if (!replacement) {
        const text = sourceCode.getText();
        const lastLineBreakPos = text.slice(
          0, jsdocNode.range[0],
        ).search(/\n[ \t]*$/u);
        if (lastLineBreakPos > -1) {
          return fixer.removeRange([
            lastLineBreakPos, jsdocNode.range[1],
          ]);
        }

        return fixer.removeRange(
          (/\s/u).test(text.charAt(jsdocNode.range[1])) ?
            [
              jsdocNode.range[0], jsdocNode.range[1] + 1,
            ] :
            jsdocNode.range,
        );
      }

      return fixer.replaceText(jsdocNode, replacement);
    } : null, tag, data);
  };

  /**
   * @param {string} str
   * @param {string} requiredFlags
   * @returns {RegExp}
   */
  utils.getRegexFromString = (str, requiredFlags) => {
    return jsdocUtils.getRegexFromString(str, requiredFlags);
  };

  /**
   * @param {import('comment-parser').Spec} tg
   * @param {boolean} returnArray
   * @returns {string[]|string}
   */
  utils.getTagDescription = (tg, returnArray) => {
    /**
     * @type {string[]}
     */
    const descriptions = [];
    tg.source.some(({
      tokens: {
        end,
        lineEnd,
        postDelimiter,
        tag,
        postTag,
        name,
        type,
        description,
      },
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

    return returnArray ? descriptions : descriptions.join('\n');
  };

  /**
   * @param {import('comment-parser').Spec} tg
   * @param {RegExp} matcher
   * @param {(description: string) => string} setter
   * @returns {Integer}
   */
  utils.setTagDescription = (tg, matcher, setter) => {
    let finalIdx = 0;
    tg.source.some(({
      tokens: {
        description,
      },
    }, idx) => {
      if (description && matcher.test(description)) {
        tg.source[idx].tokens.description = setter(description);
        finalIdx = idx;
        return true;
      }

      return false;
    });

    return finalIdx;
  };

  /**
   * @returns {{
   *   description: string,
   *   descriptions: string[],
   *   lastDescriptionLine: Integer
   * }}
   */
  utils.getDescription = () => {
    /** @type {string[]} */
    const descriptions = [];
    let lastDescriptionLine = 0;
    let tagsBegun = false;
    jsdoc.source.some(({
      tokens: {
        description,
        tag,
        end,
      },
    }, idx) => {
      if (tag) {
        tagsBegun = true;
      }

      if (idx && (tag || end)) {
        lastDescriptionLine = idx - 1;
        if (!tagsBegun && description) {
          descriptions.push(description);
        }

        return true;
      }

      if (!tagsBegun && (idx || description)) {
        descriptions.push(description || (descriptions.length ? '' : '\n'));
      }

      return false;
    });

    return {
      description: descriptions.join('\n'),
      descriptions,
      lastDescriptionLine,
    };
  };

  /* eslint-disable jsdoc/no-undefined-types -- Bug */
  /**
   * @param {(
   *   info: undefined|{
   *     delimiter: string,
   *     postDelimiter: string,
   *     start: string
   *   },
   *   seedTokens: (
   *     tokens?: Partial<import('comment-parser').Tokens> | undefined
   *   ) => import('comment-parser').Tokens,
   *   descLines: string[]
   * ) => import('comment-parser').Tokens[]} setter
   * @returns {void}
   */
  utils.setBlockDescription = (setter) => {
    /* eslint-enable jsdoc/no-undefined-types -- Bug */
    /** @type {string[]} */
    const descLines = [];
    /**
     * @type {undefined|Integer}
     */
    let startIdx;
    /**
     * @type {undefined|Integer}
     */
    let endIdx;
    let info;

    jsdoc.source.some(({
      tokens: {
        description,
        start,
        delimiter,
        postDelimiter,
        tag,
        end,
      },
    }, idx) => {
      if (delimiter === '/**') {
        return false;
      }

      if (startIdx === undefined) {
        startIdx = idx;
        info = {
          delimiter,
          postDelimiter,
          start,
        };
      }

      if (tag || end) {
        endIdx = idx;
        return true;
      }

      descLines.push(description);
      return false;
    });

    /* istanbul ignore else -- Won't be called if missing */
    if (descLines.length) {
      jsdoc.source.splice(
        /** @type {Integer} */ (startIdx),
        /** @type {Integer} */ (endIdx) - /** @type {Integer} */ (startIdx),
        ...setter(info, seedTokens, descLines),
      );
    }
  };

  /**
   * @param {RegExp} matcher
   * @param {(description: string) => string} setter
   * @returns {Integer}
   */
  utils.setDescriptionLines = (matcher, setter) => {
    let finalIdx = 0;
    jsdoc.source.some(({
      tokens: {
        description,
        tag,
        end,
      },
    }, idx) => {
      // istanbul ignore if -- Already checked
      if (idx && (tag || end)) {
        return true;
      }

      if (description && matcher.test(description)) {
        jsdoc.source[idx].tokens.description = setter(description);
        finalIdx = idx;
        return true;
      }

      return false;
    });

    return finalIdx;
  };

  /**
   * @param {import('comment-parser').Spec} tag
   * @param {import('comment-parser').Tokens[]} tokens
   * @returns {void}
   */
  utils.changeTag = (tag, ...tokens) => {
    for (const [
      idx,
      src,
    ] of tag.source.entries()) {
      src.tokens = {
        ...src.tokens,
        ...tokens[idx],
      };
    }
  };

  /* eslint-disable jsdoc/no-undefined-types -- TS */
  /**
   * @param {import('comment-parser').Spec & {
   *   line: Integer
   * }} tag
   * @param {Partial<import('comment-parser').Tokens>} tokens
   * @returns {void}
   */
  utils.setTag = (tag, tokens) => {
    /* eslint-enable jsdoc/no-undefined-types -- TS */
    tag.source = [
      {
        number: tag.line,
        // Or tag.source[0].number?
        source: '',
        tokens: seedTokens({
          delimiter: '*',
          postDelimiter: ' ',
          start: indent + ' ',
          tag: '@' + tag.tag,
          ...tokens,
        }),
      },
    ];
  };

  /**
   * @param {Integer} tagIndex
   * @param {{
   *   removeEmptyBlock?: boolean,
   *   tagSourceOffset?: Integer
   * }} cfg
   * @returns {void}
   */
  utils.removeTag = (tagIndex, {
    removeEmptyBlock = false,
    tagSourceOffset = 0,
  } = {}) => {
    const {
      source: tagSource,
    } = jsdoc.tags[tagIndex];
    /** @type {Integer|undefined} */
    let lastIndex;
    const firstNumber = jsdoc.source[0].number;
    tagSource.some(({
      number,
    }, tagIdx) => {
      const sourceIndex = jsdoc.source.findIndex(({
        number: srcNumber,
      }) => {
        return number === srcNumber;
      });
      // istanbul ignore else
      if (sourceIndex > -1) {
        let spliceCount = 1;
        tagSource.slice(tagIdx + 1).some(({
          tokens: {
            tag,
            end: ending,
          },
        }) => {
          if (!tag && !ending) {
            spliceCount++;

            return false;
          }

          return true;
        });

        const spliceIdx = sourceIndex + tagSourceOffset;

        const {
          delimiter,
          end,
        } = jsdoc.source[spliceIdx].tokens;

        /* istanbul ignore if -- Currently want to clear entirely if removing tags */
        if (
          spliceIdx === 0 && jsdoc.tags.length >= 2 ||
          !removeEmptyBlock && (end || delimiter === '/**')
        ) {
          const {
            tokens,
          } = jsdoc.source[spliceIdx];
          for (const item of [
            'postDelimiter',
            'tag',
            'postTag',
            'type',
            'postType',
            'name',
            'postName',
            'description',
          ]) {
            tokens[
              /**
               * @type {"postDelimiter"|"tag"|"type"|"postType"|
               *   "postTag"|"name"|"postName"|"description"}
               */ (
                item
              )
            ] = '';
          }
        } else {
          jsdoc.source.splice(spliceIdx, spliceCount - tagSourceOffset + (spliceIdx ? 0 : jsdoc.source.length));
          tagSource.splice(tagIdx + tagSourceOffset, spliceCount - tagSourceOffset + (spliceIdx ? 0 : jsdoc.source.length));
        }

        lastIndex = sourceIndex;

        return true;
      }

      // istanbul ignore next
      return false;
    });
    for (const [
      idx,
      src,
    ] of jsdoc.source.slice(lastIndex).entries()) {
      src.number = firstNumber + /** @type {Integer} */ (lastIndex) + idx;
    }

    // Todo: Once rewiring of tags may be fixed in comment-parser to reflect
    //         missing tags, this step should be added here (so that, e.g.,
    //         if accessing `jsdoc.tags`, such as to add a new tag, the
    //         correct information will be available)
  };

  /**
   * @param {string} targetTagName
   * @param {Integer} number
   * @param {import('comment-parser').Tokens|{}} tokens
   * @returns {void}
   */
  utils.addTag = (
    targetTagName,
    number = (jsdoc.tags[jsdoc.tags.length - 1]?.source[0]?.number ?? jsdoc.source.findIndex(({
      tokens: {
        tag,
      },
    }) => {
      return tag;
    }) - 1) + 1,
    tokens = {},
  ) => {
    jsdoc.source.splice(number, 0, {
      number,
      source: '',
      tokens: seedTokens({
        delimiter: '*',
        postDelimiter: ' ',
        start: indent + ' ',
        tag: `@${targetTagName}`,
        ...tokens,
      }),
    });
    for (const src of jsdoc.source.slice(number + 1)) {
      src.number++;
    }
  };

  /**
   * @returns {Integer|undefined}
   */
  utils.getFirstLine = () => {
    let firstLine;
    for (const {
      number,
      tokens: {
        tag,
      },
    } of jsdoc.source) {
      if (tag) {
        firstLine = number;
        break;
      }
    }

    return firstLine;
  };

  utils.seedTokens = seedTokens;

  /**
   * Sets tokens to empty string.
   *
   * @param {import('comment-parser').Tokens} tokens
   * @returns {void}
   */
  utils.emptyTokens = (tokens) => {
    for (const prop of [
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
    ]) {
      tokens[
        /**
         * @type {"start"|"postDelimiter"|"tag"|"type"|"postType"|
         *   "postTag"|"name"|"postName"|"description"|"end"|"lineEnd"}
         */ (
          prop
        )
      ] = '';
    }
  };

  /**
   * @param {Integer} sourceIndex
   * @param {import('comment-parser').Tokens} tokens
   * @returns {void}
   */
  utils.addLine = (sourceIndex, tokens) => {
    const number = (jsdoc.source[sourceIndex - 1]?.number || 0) + 1;
    jsdoc.source.splice(sourceIndex, 0, {
      number,
      source: '',
      tokens: seedTokens(tokens),
    });

    for (const src of jsdoc.source.slice(number + 1)) {
      src.number++;
    }
    // If necessary, we can rewire the tags (misnamed method)
    // rewireSource(jsdoc);
  };

  /**
   * @param {Integer} tagIndex
   * @param {Integer} tagSourceOffset
   * @param {Integer} numLines
   * @returns {void}
   */
  utils.addLines = (tagIndex, tagSourceOffset, numLines) => {
    const {
      source: tagSource,
    } = jsdoc.tags[tagIndex];
    /** @type {Integer|undefined} */
    let lastIndex;
    const firstNumber = jsdoc.source[0].number;
    tagSource.some(({
      number,
    }) => {
      const makeLine = () => {
        return {
          number,
          source: '',
          tokens: seedTokens({
            delimiter: '*',
            start: indent + ' ',
          }),
        };
      };

      const makeLines = () => {
        return Array.from({
          length: numLines,
        }, makeLine);
      };

      const sourceIndex = jsdoc.source.findIndex(({
        number: srcNumber,
        tokens: {
          end,
        },
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
    for (const [
      idx,
      src,
    ] of jsdoc.source.slice(lastIndex).entries()) {
      src.number = firstNumber + lastIndex + idx;
    }
  };

  /**
   * @returns {void}
   */
  utils.makeMultiline = () => {
    const {
      source: [
        {
          tokens,
        },
      ],
    } = jsdoc;
    const {
      postDelimiter,
      description,
      lineEnd,
      tag,
      name,
      type,
    } = tokens;

    let {
      tokens: {
        postName,
        postTag,
        postType,
      },
    } = jsdoc.source[0];

    // Strip trailing leftovers from single line ending
    if (!description) {
      if (postName) {
        postName = '';
      } else if (postType) {
        postType = '';
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

  /**
   * @param {} params
   * @returns {}
   */
  utils.flattenRoots = (params) => {
    return jsdocUtils.flattenRoots(params);
  };

  /**
   * @param {boolean} useDefaultObjectProperties
   * @returns {}
   */
  utils.getFunctionParameterNames = (useDefaultObjectProperties) => {
    return jsdocUtils.getFunctionParameterNames(node, useDefaultObjectProperties);
  };

  /**
   * @returns {Integer}
   */
  utils.hasParams = () => {
    return jsdocUtils.hasParams(node);
  };

  /**
   * @returns {boolean}
   */
  utils.isGenerator = () => {
    return node && (
      node.generator ||
      node.type === 'MethodDefinition' && node.value.generator ||
      [
        'ExportNamedDeclaration', 'ExportDefaultDeclaration',
      ].includes(node.type) &&
        node.declaration.generator
    );
  };

  /**
   * @returns {boolean}
   */
  utils.isConstructor = () => {
    return jsdocUtils.isConstructor(node);
  };

  /**
   * @param {string} tagName
   * @returns {false|{
   *   idx: Integer,
   *   name: string,
   *   type: string
   * }[]}
   */
  utils.getJsdocTagsDeep = (tagName) => {
    const name = utils.getPreferredTagName({
      tagName,
    });
    if (!name) {
      return false;
    }

    return jsdocUtils.getJsdocTagsDeep(jsdoc, name);
  };

  /**
   * @param {{
   *   tagName: string,
   *   skipReportingBlockedTag?: boolean,
   *   allowObjectReturn?: boolean,
   *   defaultMessage?: string
   * }} cfg
   */
  utils.getPreferredTagName = ({
    tagName,
    skipReportingBlockedTag = false,
    allowObjectReturn = false,
    defaultMessage = `Unexpected tag \`@${tagName}\``,
  }) => {
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

  /**
   * @param {string} name
   * @param {string[]} definedTags
   * @returns {boolean}
   */
  utils.isValidTag = (name, definedTags) => {
    return jsdocUtils.isValidTag(context, mode, name, definedTags);
  };

  /**
   * @param {string[]} names
   * @returns {boolean}
   */
  utils.hasATag = (names) => {
    return jsdocUtils.hasATag(jsdoc, names);
  };

  /**
   * @param {string} name
   * @returns {boolean}
   */
  utils.hasTag = (name) => {
    return jsdocUtils.hasTag(jsdoc, name);
  };

  /**
   * @param {string} name
   * @returns {}
   */
  utils.comparePaths = (name) => {
    return jsdocUtils.comparePaths(name);
  };

  /**
   * @param {string} name
   * @returns {}
   */
  utils.dropPathSegmentQuotes = (name) => {
    return jsdocUtils.dropPathSegmentQuotes(name);
  };

  /**
   * @returns {boolean}
   */
  utils.avoidDocs = () => {
    if (
      ignoreReplacesDocs !== false &&
        (utils.hasTag('ignore') || utils.classHasTag('ignore')) ||
      overrideReplacesDocs !== false &&
        (utils.hasTag('override') || utils.classHasTag('override')) ||
      implementsReplacesDocs !== false &&
        (utils.hasTag('implements') || utils.classHasTag('implements')) ||

      augmentsExtendsReplacesDocs &&
        (utils.hasATag([
          'augments', 'extends',
        ]) ||
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
      ...mode === 'closure' ? [] : [
        'inheritdoc',
      ],
    ];
    if (exemptedBy.length && utils.getPresentTags(exemptedBy).length) {
      return true;
    }

    return false;
  };

  for (const method of [
    'tagMightHaveNamePosition',
    'tagMightHaveTypePosition',
  ]) {
    /**
     * @param {string} tagName
     * @param {import('./getDefaultTagStructureForMode.js').
     *   TagStructure[]} [otherModeMaps]
     * @returns {boolean|{otherMode: true}}
     */
    utils[
      /** @type {"tagMightHaveNamePosition"|"tagMightHaveTypePosition"} */ (
        method
      )
    ] = (tagName, otherModeMaps) => {
      const result = jsdocUtils[
        /** @type {"tagMightHaveNamePosition"|"tagMightHaveTypePosition"} */
        (method)
      ](tagName);
      if (result) {
        return true;
      }

      if (!otherModeMaps) {
        return false;
      }

      const otherResult = otherModeMaps.some((otherModeMap) => {
        return jsdocUtils[
          /** @type {"tagMightHaveNamePosition"|"tagMightHaveTypePosition"} */
          (method)
        ](tagName, otherModeMap);
      });

      return otherResult ? {
        otherMode: true,
      } : false;
    };
  }

  for (const method of [
    'tagMustHaveNamePosition',
    'tagMustHaveTypePosition',
    'tagMissingRequiredTypeOrNamepath',
  ]) {
    /**
     * @param {string} tagName
     * @param {import('./getDefaultTagStructureForMode.js').
     *   TagStructure[]} otherModeMaps
     * @returns {}
     */
    utils[
      /** @type {"tagMustHaveNamePosition"|"tagMustHaveTypePosition"|"tagMissingRequiredTypeOrNamepath"} */
      (method)
    ] = (tagName, otherModeMaps) => {
      const result = jsdocUtils[
        /** @type {"tagMustHaveNamePosition"|"tagMustHaveTypePosition"|"tagMissingRequiredTypeOrNamepath"} */
        (method)
      ](tagName);
      if (!result) {
        return false;
      }

      // if (!otherModeMaps) { return true; }

      const otherResult = otherModeMaps.every((otherModeMap) => {
        return jsdocUtils[
          /** @type {"tagMustHaveNamePosition"|"tagMustHaveTypePosition"|"tagMissingRequiredTypeOrNamepath"} */
          (method)
        ](tagName, otherModeMap);
      });

      return otherResult ? true : {
        otherMode: false,
      };
    };
  }

  for (const method of [
    'isNamepathDefiningTag',
    'isNamepathReferencingTag',
    'isNamepathOrUrlReferencingTag',
    'tagMightHaveNamepath',
  ]) {
    /**
     * @param {string} tagName
     * @returns {}
     */
    utils[method] = (tagName) => {
      return jsdocUtils[method](tagName);
    };
  }

  /**
   * @param {import('./jsdocUtils.js').ParserMode} mde
   * @returns {import('./getDefaultTagStructureForMode.js').TagStructure}
   */
  utils.getTagStructureForMode = (mde) => {
    return jsdocUtils.getTagStructureForMode(mde, settings.structuredTags);
  };

  /**
   * @param {} tag
   * @returns {}
   */
  utils.mayBeUndefinedTypeTag = (tag) => {
    return jsdocUtils.mayBeUndefinedTypeTag(tag, settings.mode);
  };

  utils.hasValueOrExecutorHasNonEmptyResolveValue = (anyPromiseAsReturn, allBranches) => {
    return jsdocUtils.hasValueOrExecutorHasNonEmptyResolveValue(node, anyPromiseAsReturn, allBranches);
  };

  /**
   * @returns {boolean}
   */
  utils.hasYieldValue = () => {
    if ([
      'ExportNamedDeclaration', 'ExportDefaultDeclaration',
    ].includes(node.type)) {
      return jsdocUtils.hasYieldValue(node.declaration);
    }

    return jsdocUtils.hasYieldValue(node);
  };

  /**
   * @returns {boolean}
   */
  utils.hasYieldReturnValue = () => {
    return jsdocUtils.hasYieldValue(node, true);
  };

  /**
   * @returns {boolean}
   */
  utils.hasThrowValue = () => {
    return jsdocUtils.hasThrowValue(node);
  };

  /**
   * @returns {boolean}
   */
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

  utils.filterTags = (filter, includeInlineTags = false) => {
    const tags = jsdocUtils.getAllTags(jsdoc, includeInlineTags);
    return jsdocUtils.filterTags(tags, filter);
  };

  /**
   * @param {import('comment-parser').Spec[]} tags
   * @returns {}
   */
  utils.getTagsByType = (tags) => {
    return jsdocUtils.getTagsByType(context, mode, tags, tagNamePreference);
  };

  /**
   * @param {string} tagName
   * @returns {boolean}
   */
  utils.hasOptionTag = (tagName) => {
    const {
      tags,
    } = context.options[0] ?? {};

    return Boolean(tags && tags.includes(tagName));
  };

  utils.getClassNode = () => {
    return [
      ...ancestors, node,
    ].reverse().find((parent) => {
      return parent && [
        'ClassDeclaration', 'ClassExpression',
      ].includes(parent.type);
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
      return parseComment(classJsdocNode, '');
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

    const matchingJsdocTags = jsdoc.tags.filter(({
      tag,
    }) => {
      return tag === targetTagName;
    });

    for (const matchingJsdocTag of matchingJsdocTags) {
      arrayHandler(matchingJsdocTag, targetTagName);
    }
  };

  return utils;
};

/* eslint-disable jsdoc/valid-types -- Old version */
/**
 * Settings from ESLint types.
 *
 * @typedef {{
 *   [name: string]: any
 * }} Settings
 */
/* eslint-enable jsdoc/valid-types -- Old version */

/**
 * @param {import('eslint').Rule.RuleContext} context
 * @returns {Settings}
 */
const getSettings = (context) => {
  /* eslint-disable canonical/sort-keys */
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

    // `require-param`, `require-description`, `require-example`,
    // `require-returns`, `require-throw`, `require-yields`
    overrideReplacesDocs: context.settings.jsdoc?.overrideReplacesDocs,
    ignoreReplacesDocs: context.settings.jsdoc?.ignoreReplacesDocs,
    implementsReplacesDocs: context.settings.jsdoc?.implementsReplacesDocs,
    augmentsExtendsReplacesDocs: context.settings.jsdoc?.augmentsExtendsReplacesDocs,

    // `require-param-type`, `require-param-description`
    exemptDestructuredRootsFromChecks: context.settings.jsdoc?.exemptDestructuredRootsFromChecks,

    // Many rules, e.g., `check-tag-names`
    mode: context.settings.jsdoc?.mode ?? 'typescript',

    // Many rules
    contexts: context.settings.jsdoc?.contexts,
  };
  /* eslint-enable canonical/sort-keys */

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
 * @param {import('eslint').Rule.RuleContext} context
 * @param {object} commentNode
 */
const makeReport = (context, commentNode) => {
  /* eslint-disable jsdoc/valid-types -- Old version */
  /**
   * @param {string} message
   * @param {import('eslint').Rule.ReportFixer|null} fix
   * @param {} jsdocLoc
   * @param {undefined|{
   *   [key: string]: string
   * }} data
   * @returns {void}
   */
  const report = (message, fix = null, jsdocLoc = null, data = undefined) => {
    /* eslint-enable jsdoc/valid-types -- Old version */
    let loc;

    if (jsdocLoc) {
      if (!('line' in jsdocLoc)) {
        jsdocLoc.line = jsdocLoc.source[0].number;
      }

      const lineNumber = commentNode.loc.start.line + jsdocLoc.line;

      loc = {
        end: {
          column: 0,
          line: lineNumber,
        },
        start: {
          column: 0,
          line: lineNumber,
        },
      };

      // Todo: Remove ignore once `check-examples` can be restored for ESLint 8+
      // istanbul ignore if
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

/* eslint-disable jsdoc/no-undefined-types -- canonical still using an older version where not defined */
/**
 * @typedef {ReturnType<typeof getUtils>} Utils
 * @typedef {(
 *   arg: {
 *     context: import('eslint').Rule.RuleContext,
 *     sourceCode: import('eslint').SourceCode,
 *     indent: string,
 *     jsdoc: object,
 *     jsdocNode: object,
 *     node: Node | null,
 *     report: ReturnType<typeof makeReport>,
 *     settings: Settings,
 *     utils: Utils,
 *   }
 * ) => any } JsdocVisitor
 */
/* eslint-enable jsdoc/no-undefined-types -- canonical still using an older version where not defined */

/**
 * @param {} info
 * @param {} indent
 * @param {import('comment-parser').Block} jsdoc
 * @param {} ruleConfig
 * @param {import('eslint').Rule.RuleContext} context
 * @param {} lines
 * @param {import('@es-joy/jsdoccomment').Token} jsdocNode
 * @param {} node
 * @param {Settings} settings
 * @param {import('eslint').SourceCode} sourceCode
 * @param {} iterator
 * @param {} state
 * @param {boolean} iteratingAll
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
    (
      utils.hasTag('private') ||
      jsdoc.tags
        .filter(({
          tag,
        }) => {
          return tag === 'access';
        })
        .some(({
          description,
        }) => {
          return description === 'private';
        })
    )
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

/**
 * @param {} lines
 * @param {import('@es-joy/jsdoccomment').Token} jsdocNode
 * @returns {[indent: string, jsdoc: import('comment-parser').Block & {
 *   inlineTags: import('@es-joy/jsdoccomment').JsdocInlineTagNoType[]
 * }]}
 */
const getIndentAndJSDoc = function (lines, jsdocNode) {
  const sourceLine = lines[jsdocNode.loc.start.line - 1];
  const indnt = sourceLine.charAt(0).repeat(jsdocNode.loc.start.column);
  const jsdc = parseComment(jsdocNode, '');

  return [
    indnt, jsdc,
  ];
};

/**
 *
 * @typedef {{node: Node, state: StateObject}} NonCommentArgs
 */

/**
 * @typedef {object} RuleConfig
 * @property {EslintRuleMeta} meta ESLint rule meta
 * @property {import('./jsdocUtils').DefaultContexts} [contextDefaults] Any default contexts
 * @property {true} [contextSelected] Whether to force a `contexts` check
 * @property {true} [iterateAllJsdocs] Whether to iterate all JSDoc blocks by default
 *   regardless of context
 * @property {(context, state: StateObject, utils: Utils) => void} [exit] Handler to be executed
 *   upon exiting iteration of program AST
 * @property {(NonCommentArgs) => void} [nonComment] Handler to be executed if rule wishes
 *   to be supplied nodes without comments
 */

/**
 * Create an eslint rule that iterates over all JSDocs, regardless of whether
 * they are attached to a function-like node.
 *
 * @param {JsdocVisitor} iterator
 * @param {RuleConfig} ruleConfig The rule's configuration
 * @param contexts The `contexts` containing relevant `comment` info.
 * @param {boolean} additiveCommentContexts If true, will have a separate
 *   iteration for each matching comment context. Otherwise, will iterate
 *   once if there is a single matching comment context.
 * @returns {import('eslint').Rule.RuleModule}
 */
const iterateAllJsdocs = (iterator, ruleConfig, contexts, additiveCommentContexts) => {
  const trackedJsdocs = new Set();

  let handler;
  let settings;
  const callIterator = (context, node, jsdocNodes, state, lastCall) => {
    const sourceCode = context.getSourceCode();
    const {
      lines,
    } = sourceCode;

    const utils = getBasicUtils(context, settings);
    for (const jsdocNode of jsdocNodes) {
      if (!(/^\/\*\*\s/u).test(sourceCode.getText(jsdocNode))) {
        continue;
      }

      const [
        indent,
        jsdoc,
      ] = getIndentAndJSDoc(
        lines, jsdocNode,
      );

      if (additiveCommentContexts) {
        for (const [
          idx,
          {
            comment,
          },
        ] of contexts.entries()) {
          if (comment && handler(comment, jsdoc) === false) {
            continue;
          }

          iterate(
            {
              comment,
              lastIndex: idx,
              selector: node?.type,
            },
            indent,
            jsdoc,
            ruleConfig,
            context,
            lines,
            jsdocNode,
            node,
            settings,
            sourceCode,
            iterator,
            state,
            true,
          );
        }

        continue;
      }

      let lastComment;
      let lastIndex;
      // eslint-disable-next-line no-loop-func
      if (contexts && contexts.every(({
        comment,
      }, idx) => {
        lastComment = comment;
        lastIndex = idx;

        return comment && handler(comment, jsdoc) === false;
      })) {
        continue;
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
        indent,
        jsdoc,
        ruleConfig,
        context,
        lines,
        jsdocNode,
        node,
        settings,
        sourceCode,
        iterator,
        state,
        true,
      );
    }

    if (lastCall && ruleConfig.exit) {
      ruleConfig.exit({
        context,
        settings,
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
          const commentNode = getJSDocComment(sourceCode, node, settings);
          if (!ruleConfig.noTracking && trackedJsdocs.has(commentNode)) {
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

          trackedJsdocs.add(commentNode);
          callIterator(context, node, [
            commentNode,
          ], state);
        },
        'Program:exit' () {
          const allComments = sourceCode.getAllComments();
          const untrackedJSdoc = allComments.filter((node) => {
            return !trackedJsdocs.has(node);
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
 * @param {RuleConfig} ruleConfig
 * @returns {import('eslint').Rule.RuleModule}
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
          const {
            lines,
          } = sourceCode;
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
  // eslint-disable-next-line unicorn/prefer-export-from -- Avoid experimental parser
  parseComment,
};

/**
 * @param {JsdocVisitor} iterator
 * @param {RuleConfig} ruleConfig
 * @returns {import('eslint').Rule.RuleModule}
 */
export default function iterateJsdoc (iterator, ruleConfig) {
  const metaType = ruleConfig?.meta?.type;
  if (!metaType || ![
    'problem', 'suggestion', 'layout',
  ].includes(metaType)) {
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

  /** @type {import('eslint').Rule.RuleModule} */
  return {
    /**
     * The entrypoint for the JSDoc rule.
     *
     * @param {import('eslint').Rule.RuleContext} context
     *   a reference to the context which hold all important information
     *   like settings and the sourcecode to check.
     * @returns {import('eslint').Rule.RuleListener}
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
          jsdocUtils.enforcedContexts(context, ruleConfig.contextDefaults, ruleConfig.nonGlobalSettings ? {} : settings);

        if (contexts) {
          contexts = contexts.map((obj) => {
            if (typeof obj === 'object' && !obj.context) {
              return {
                ...obj,
                context: 'any',
              };
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
      const {
        lines,
      } = sourceCode;

      const state = {};

      const checkJsdoc = (info, handler, node) => {
        const jsdocNode = getJSDocComment(sourceCode, node, settings);
        if (!jsdocNode) {
          return;
        }

        const [
          indent,
          jsdoc,
        ] = getIndentAndJSDoc(
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
          info, indent, jsdoc, ruleConfig, context, lines, jsdocNode, node, settings, sourceCode, iterator, state,
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
        for (const prop of [
          'ArrowFunctionExpression',
          'FunctionDeclaration',
          'FunctionExpression',
          'TSDeclareFunction',
        ]) {
          contextObject[prop] = checkJsdoc.bind(null, {
            selector: prop,
          }, null);
        }
      }

      if (ruleConfig.exit) {
        contextObject['Program:exit'] = () => {
          ruleConfig.exit({
            context,
            settings,
            state,
          });
        };
      }

      return contextObject;
    },
    meta: ruleConfig.meta,
  };
}
