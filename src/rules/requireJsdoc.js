import _ from 'lodash';
import jsdocUtils from '../jsdocUtils';
import exportParser from '../exportParser';
import {getJSDocComment, getReducedASTNode, getDecorator} from '../eslint/getJSDocComment';
import {getSettings} from '../iterateJsdoc';

const OPTIONS_SCHEMA = {
  additionalProperties: false,
  properties: {
    checkConstructors: {
      default: true,
      type: 'boolean',
    },
    checkGetters: {
      default: true,
      type: 'boolean',
    },
    checkSetters: {
      default: true,
      type: 'boolean',
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
    enableFixer: {
      default: true,
      type: 'boolean',
    },
    exemptEmptyConstructors: {
      default: false,
      type: 'boolean',
    },
    exemptEmptyFunctions: {
      default: false,
      type: 'boolean',
    },
    publicOnly: {
      oneOf: [
        {
          default: false,
          type: 'boolean',
        },
        {
          additionalProperties: false,
          default: {},
          properties: {
            ancestorsOnly: {
              type: 'boolean',
            },
            cjs: {
              type: 'boolean',
            },
            esm: {
              type: 'boolean',
            },
            window: {
              type: 'boolean',
            },
          },
          type: 'object',
        },
      ],
    },
    require: {
      additionalProperties: false,
      default: {},
      properties: {
        ArrowFunctionExpression: {
          default: false,
          type: 'boolean',
        },
        ClassDeclaration: {
          default: false,
          type: 'boolean',
        },
        ClassExpression: {
          default: false,
          type: 'boolean',
        },
        FunctionDeclaration: {
          default: true,
          type: 'boolean',
        },
        FunctionExpression: {
          default: false,
          type: 'boolean',
        },
        MethodDefinition: {
          default: false,
          type: 'boolean',
        },
      },
      type: 'object',
    },
  },
  type: 'object',
};

const getOption = (context, baseObject, option, key) => {
  if (!_.has(context, `options[0][${option}][${key}]`)) {
    return baseObject.properties[key].default;
  }

  return context.options[0][option][key];
};

const getOptions = (context) => {
  const {
    publicOnly,
    contexts = [],
    exemptEmptyConstructors = true,
    exemptEmptyFunctions = false,
    enableFixer = true,
  } = context.options[0] || {};

  return {
    contexts,
    enableFixer,
    exemptEmptyConstructors,
    exemptEmptyFunctions,
    publicOnly: ((baseObj) => {
      if (!publicOnly) {
        return false;
      }

      const properties = {};
      Object.keys(baseObj.properties).forEach((prop) => {
        const opt = getOption(context, baseObj, 'publicOnly', prop);
        properties[prop] = opt;
      });

      return properties;
    })(OPTIONS_SCHEMA.properties.publicOnly.oneOf[1]),
    require: ((baseObj) => {
      const properties = {};
      Object.keys(baseObj.properties).forEach((prop) => {
        const opt = getOption(context, baseObj, 'require', prop);
        properties[prop] = opt;
      });

      return properties;
    })(OPTIONS_SCHEMA.properties.require),
  };
};

export default {
  create (context) {
    const sourceCode = context.getSourceCode();
    const settings = getSettings(context);
    if (!settings) {
      return {};
    }

    const {
      require: requireOption,
      contexts,
      publicOnly, exemptEmptyFunctions, exemptEmptyConstructors, enableFixer,
    } = getOptions(context);

    const checkJsDoc = (node, isFunctionContext) => {
      const jsDocNode = getJSDocComment(sourceCode, node, settings);

      if (jsDocNode) {
        return;
      }

      // For those who have options configured against ANY constructors (or setters or getters) being reported
      if (jsdocUtils.exemptSpeciaMethods(
        jsDocNode, node, context, [OPTIONS_SCHEMA],
      )) {
        return;
      }

      if (
        // Avoid reporting param-less, return-less functions (when `exemptEmptyFunctions` option is set)
        exemptEmptyFunctions && isFunctionContext ||

        // Avoid reporting  param-less, return-less constructor methods  (when `exemptEmptyConstructors` option is set)
        exemptEmptyConstructors && jsdocUtils.isConstructor(node)
      ) {
        const functionParameterNames = jsdocUtils.getFunctionParameterNames(node);
        if (!functionParameterNames.length && !jsdocUtils.hasReturnValue(node, context)) {
          return;
        }
      }

      const fix = (fixer) => {
        // Default to one line break if the `minLines`/`maxLines` settings allow
        const lines = settings.minLines === 0 && settings.maxLines >= 1 ? 1 : settings.minLines;
        let baseNode = getReducedASTNode(node, sourceCode);

        let decorator;
        do {
          const tokenBefore = sourceCode.getTokenBefore(baseNode, {includeComments: true});
          decorator = getDecorator(tokenBefore, sourceCode);
          if (decorator) {
            baseNode = decorator;
          }
        } while (decorator);

        const indent = jsdocUtils.getIndent({
          text: sourceCode.getText(
            baseNode,
            baseNode.loc.start.column,
          ),
        });
        const {inlineCommentBlock} = contexts.find(({context: ctxt}) => {
          return ctxt === node.type;
        }) || {};
        const insertion = (inlineCommentBlock ?
          '/** ' :
          `/**\n${indent}*\n${indent}`) +
            `*/${'\n'.repeat(lines)}${indent.slice(0, -1)}`;

        return fixer.insertTextBefore(baseNode, insertion);
      };

      const report = () => {
        const loc = {
          end: node.loc.start + 1,
          start: node.loc.start,
        };
        context.report({
          fix: enableFixer ? fix : null,
          loc,
          messageId: 'missingJsDoc',
          node,
        });
      };

      if (publicOnly) {
        const opt = {
          ancestorsOnly: Boolean(publicOnly?.ancestorsOnly ?? false),
          esm: Boolean(publicOnly?.esm ?? true),
          initModuleExports: Boolean(publicOnly?.cjs ?? true),
          initWindow: Boolean(publicOnly?.window ?? false),
        };
        const parseResult = exportParser.parse(sourceCode.ast, node, opt);
        const exported = exportParser.isExported(node, parseResult, opt);

        if (exported) {
          report();
        }
      } else {
        report();
      }
    };

    return {
      ...jsdocUtils.getContextObject(jsdocUtils.enforcedContexts(context, []), checkJsDoc),
      ArrowFunctionExpression (node) {
        if (!requireOption.ArrowFunctionExpression) {
          return;
        }

        if (!['VariableDeclarator', 'ExportDefaultDeclaration', 'AssignmentExpression'].includes(node.parent.type)) {
          return;
        }

        checkJsDoc(node, true);
      },

      ClassDeclaration (node) {
        if (!requireOption.ClassDeclaration) {
          return;
        }

        checkJsDoc(node);
      },

      ClassExpression (node) {
        if (!requireOption.ClassExpression) {
          return;
        }

        checkJsDoc(node);
      },

      FunctionDeclaration (node) {
        if (!requireOption.FunctionDeclaration) {
          return;
        }

        checkJsDoc(node, true);
      },

      FunctionExpression (node) {
        if (requireOption.MethodDefinition && node.parent.type === 'MethodDefinition') {
          checkJsDoc(node, true);

          return;
        }

        if (!requireOption.FunctionExpression) {
          return;
        }

        if (
          ['VariableDeclarator', 'AssignmentExpression', 'ExportDefaultDeclaration'].includes(node.parent.type) ||
          node.parent.type === 'Property' && node === node.parent.value
        ) {
          checkJsDoc(node, true);
        }
      },
    };
  },
  meta: {
    docs: {
      category: 'Stylistic Issues',
      description: 'Require JSDoc comments',
      recommended: 'true',
      url: 'https://github.com/gajus/eslint-plugin-jsdoc',
    },

    fixable: 'code',

    messages: {
      missingJsDoc: 'Missing JSDoc comment.',
    },

    schema: [
      OPTIONS_SCHEMA,
    ],

    type: 'suggestion',
  },
};
