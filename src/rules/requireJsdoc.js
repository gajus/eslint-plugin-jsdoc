import _ from 'lodash';
import jsdocUtils from '../jsdocUtils';
import exportParser from '../exportParser';
import getJSDocComment from '../eslint/getJSDocComment';
import warnRemovedSettings from '../warnRemovedSettings';
import {getSettings} from '../iterateJsdoc';

const OPTIONS_SCHEMA = {
  additionalProperties: false,
  properties: {
    contexts: {
      items: {
        type: 'string',
      },
      type: 'array',
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
  return {
    exemptEmptyFunctions: context.options[0] ? context.options[0].exemptEmptyFunctions : false,
    publicOnly: ((baseObj) => {
      const publicOnly = _.get(context, 'options[0].publicOnly');
      if (!publicOnly) {
        return false;
      }

      return Object.keys(baseObj.properties).reduce((obj, prop) => {
        const opt = getOption(context, baseObj, 'publicOnly', prop);
        obj[prop] = opt;

        return obj;
      }, {});
    })(OPTIONS_SCHEMA.properties.publicOnly.oneOf[1]),
    require: ((baseObj) => {
      return Object.keys(baseObj.properties).reduce((obj, prop) => {
        const opt = getOption(context, baseObj, 'require', prop);
        obj[prop] = opt;

        return obj;
      }, {});
    })(OPTIONS_SCHEMA.properties.require),
  };
};

/* eslint-disable sort-keys */
export default {
  meta: {
    doc: {
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
  create (context) {
    warnRemovedSettings(context, 'require-jsdoc');

    const sourceCode = context.getSourceCode();

    const {require: requireOption, publicOnly, exemptEmptyFunctions} = getOptions(context);

    const settings = getSettings(context);

    const checkJsDoc = (node) => {
      const jsDocNode = getJSDocComment(sourceCode, node, settings);

      if (jsDocNode) {
        return;
      }

      if (exemptEmptyFunctions) {
        const functionParameterNames = jsdocUtils.getFunctionParameterNames(node);
        if (!functionParameterNames.length && !jsdocUtils.hasReturnValue(node, context)) {
          return;
        }
      }

      const fix = (fixer) => {
        // Default to one line break if the `minLines`/`maxLines` settings allow
        const lines = settings.minLines === 0 && settings.maxLines >= 1 ? 1 : settings.minLines;
        const indent = jsdocUtils.getIndent(sourceCode);
        const insertion = `/**\n${indent}*\n${indent}*/${'\n'.repeat(lines)}${indent.slice(0, -1)}`;
        const baseNode = [
          'ExportDefaultDeclaration', 'ExportNamedDeclaration',
        ].includes(node.parent && node.parent.type) ? node.parent : node;

        return fixer.insertTextBefore(baseNode, insertion);
      };

      if (publicOnly) {
        const opt = {
          ancestorsOnly: Boolean(_.get(publicOnly, 'ancestorsOnly', false)),
          esm: Boolean(_.get(publicOnly, 'esm', true)),
          initModuleExports: Boolean(_.get(publicOnly, 'cjs', true)),
          initWindow: Boolean(_.get(publicOnly, 'window', false)),
        };
        const parseResult = exportParser.parse(sourceCode.ast, node, opt);
        const exported = exportParser.isExported(node, parseResult, opt);

        if (exported) {
          context.report({
            fix,
            messageId: 'missingJsDoc',
            node,
          });
        }
      } else {
        context.report({
          fix,
          messageId: 'missingJsDoc',
          node,
        });
      }
    };

    // eslint-disable-next-line fp/no-mutating-assign
    return Object.assign(
      jsdocUtils.getContextObject(jsdocUtils.enforcedContexts(context, []), checkJsDoc),
      {
        ArrowFunctionExpression (node) {
          if (!requireOption.ArrowFunctionExpression) {
            return;
          }

          if (!['VariableDeclarator', 'ExportDefaultDeclaration'].includes(node.parent.type)) {
            return;
          }

          checkJsDoc(node);
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

          checkJsDoc(node);
        },

        FunctionExpression (node) {
          if (requireOption.MethodDefinition && node.parent.type === 'MethodDefinition') {
            checkJsDoc(node);

            return;
          }

          if (!requireOption.FunctionExpression) {
            return;
          }

          if (['VariableDeclarator', 'AssignmentExpression', 'ExportDefaultDeclaration'].includes(node.parent.type)) {
            checkJsDoc(node);
          } else if (node.parent.type === 'Property' && node === node.parent.value) {
            checkJsDoc(node);
          }
        },
      }
    );
  },
};
