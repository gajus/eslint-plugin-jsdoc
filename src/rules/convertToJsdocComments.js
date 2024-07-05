import iterateJsdoc from '../iterateJsdoc.js';
import {
  getSettings,
} from '../iterateJsdoc.js';
import jsdocUtils from '../jsdocUtils.js';
import {
  getNonJsdocComment,
  getDecorator,
  getReducedASTNode,
} from '@es-joy/jsdoccomment';

/** @type {import('eslint').Rule.RuleModule} */
export default {
  create (context) {
    /* c8 ignore next -- Fallback to deprecated method */
    const {
      sourceCode = context.getSourceCode(),
    } = context;
    const settings = getSettings(context);
    if (!settings) {
      return {};
    }

    const {
      contexts = settings.contexts || [],
      enableFixer = true,
      enforceJsdocLineStyle = 'multi',
      lineOrBlockStyle = 'both',
      allowedPrefixes = ['@ts-', 'istanbul ', 'c8 ', 'v8 ', 'eslint', 'prettier-']
    } = context.options[0] ?? {};

    /**
     * @type {import('../iterateJsdoc.js').CheckJsdoc}
     */
    const checkNonJsdoc = (_info, _handler, node) => {
      const comment = getNonJsdocComment(sourceCode, node, settings);

      if (
        !comment ||
        /** @type {string[]} */
        (allowedPrefixes).some((prefix) => {
          return comment.value.trimStart().startsWith(prefix);
        })
      ) {
        return;
      }

      const fix = /** @type {import('eslint').Rule.ReportFixer} */ (fixer) => {
        // Default to one line break if the `minLines`/`maxLines` settings allow
        const lines = settings.minLines === 0 && settings.maxLines >= 1 ? 1 : settings.minLines;
        /** @type {import('eslint').Rule.Node|import('@typescript-eslint/types').TSESTree.Decorator} */
        let baseNode = getReducedASTNode(node, sourceCode);

        const decorator = getDecorator(baseNode);
        if (decorator) {
          baseNode = decorator;
        }

        const indent = jsdocUtils.getIndent({
          text: sourceCode.getText(
            /** @type {import('eslint').Rule.Node} */ (baseNode),
            /** @type {import('eslint').AST.SourceLocation} */
            (
              /** @type {import('eslint').Rule.Node} */ (baseNode).loc
            ).start.column,
          ),
        });

        const {
          inlineCommentBlock,
        } =
          /**
           * @type {{
           *     context: string,
           *     inlineCommentBlock: boolean,
           *     minLineCount: import('../iterateJsdoc.js').Integer
           *   }[]}
           */ (contexts).find((contxt) => {
            if (typeof contxt === 'string') {
              return false;
            }

            const {
              context: ctxt,
            } = contxt;
            return ctxt === node.type;
          }) || {};
        const insertion = (
          inlineCommentBlock || enforceJsdocLineStyle === 'single'
            ? `/** ${comment.value.trim()} `
            : `/**\n${indent}*${comment.value.trimEnd()}\n${indent}`
        ) +
            `*/${'\n'.repeat((lines || 1) - 1)}`;

        return fixer.replaceText(
          /** @type {import('eslint').AST.Token} */
          (comment),
          insertion,
        );
      };

      /**
       * @param {string} messageId
       */
      const report = (messageId) => {
        const loc = {
          end: {
            column: 0,
            /* c8 ignore next 2 -- Guard */
            // @ts-expect-error Ok
            line: (comment.loc?.start?.line ?? 1),
          },
          start: {
            column: 0,
            /* c8 ignore next 2 -- Guard */
            // @ts-expect-error Ok
            line: (comment.loc?.start?.line ?? 1)
          },
        };

        context.report({
          fix: enableFixer ? fix : null,
          loc,
          messageId,
          node,
        });
      };

      if (comment.type === 'Block') {
        if (lineOrBlockStyle === 'line') {
          return;
        }
        report('blockCommentsJsdocStyle');
        return;
      }

      if (comment.type === 'Line') {
        if (lineOrBlockStyle === 'block') {
          return;
        }
        report('lineCommentsJsdocStyle');
      }
    };

    return {
      ...jsdocUtils.getContextObject(
        jsdocUtils.enforcedContexts(context, true, settings),
        checkNonJsdoc,
      )
    };
  },
  meta: {
    fixable: 'code',

    messages: {
      blockCommentsJsdocStyle: 'Block comments should be JSDoc-style.',
      lineCommentsJsdocStyle: 'Line comments should be JSDoc-style.',
    },

    docs: {
      description: 'Converts non-JSDoc comments preceding nodes into JSDoc ones',
      url: 'https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/convert-to-jsdoc-comments.md#repos-sticky-header',
    },
    schema: [
      {
        additionalProperties: false,
        properties: {
          allowedPrefixes: {
            type: 'array',
            items: {
              type: 'string'
            }
          },
          enableFixer: {
            type: 'boolean'
          },
          enforceJsdocLineStyle: {
            type: 'string',
            enum: ['multi', 'single']
          },
          lineOrBlockStyle: {
            type: 'string',
            enum: ['block', 'line', 'both']
          },
          contexts: {
            items: {
              anyOf: [
                {
                  type: 'string',
                },
                {
                  additionalProperties: false,
                  properties: {
                    context: {
                      type: 'string',
                    },
                    inlineCommentBlock: {
                      type: 'boolean',
                    },
                  },
                  type: 'object',
                },
              ],
            },
            type: 'array',
          },
        },
        type: 'object',
      },
    ],
    type: 'suggestion',
  },
};
