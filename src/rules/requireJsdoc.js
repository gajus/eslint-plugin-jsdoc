import iterateJsdoc from '../iterateJsdoc';

const OPTIONS_SCHEMA = {
  additionalProperties: false,
  properties: {
    require: {
      additionalProperties: false,
      default: {},
      properties: {
        ArrowFunctionExpression: {
          default: false,
          type: 'boolean'
        },
        ClassDeclaration: {
          default: false,
          type: 'boolean'
        },
        FunctionDeclaration: {
          default: true,
          type: 'boolean'
        },
        FunctionExpression: {
          default: false,
          type: 'boolean'
        },
        MethodDefinition: {
          default: false,
          type: 'boolean'
        }
      },
      type: 'object'
    }
  },
  type: 'object'
};

const getOption = (context, key) => {
  if (!context.options.length) {
    return OPTIONS_SCHEMA.properties.require.properties[key].default;
  }

  if (!context.options[0] || !context.options[0].require) {
    return OPTIONS_SCHEMA.properties.require.properties[key].default;
  }

  if (!context.options[0].require.hasOwnProperty(key)) {
    return OPTIONS_SCHEMA.properties.require.properties[key].default;
  }

  return context.options[0].require[key];
};

const getOptions = (context) => {
  return {
    ArrowFunctionExpression: getOption(context, 'ArrowFunctionExpression'),
    ClassDeclaration: getOption(context, 'ClassDeclaration'),
    FunctionDeclaration: getOption(context, 'FunctionDeclaration'),
    FunctionExpression: getOption(context, 'FunctionExpression'),
    MethodDefinition: getOption(context, 'MethodDefinition')
  };
};

export default iterateJsdoc(null, {
  meta: {
    doc: {
      category: 'Stylistic Issues',
      description: 'Require JSDoc comments',
      recommended: 'true',
      url: 'https://github.com/gajus/eslint-plugin-jsdoc'
    },

    messages: {
      missingJsDoc: 'Missing JSDoc comment.'
    },

    schema: [
      OPTIONS_SCHEMA
    ],

    type: 'suggestion'
  },
  returns (context, sourceCode) {
    const checkJsDoc = (node) => {
      const jsDocNode = sourceCode.getJSDocComment(node);

      if (jsDocNode) {
        return;
      }

      context.report({
        messageId: 'missingJsDoc',
        node
      });
    };

    const options = getOptions(context);

    return {
      ArrowFunctionExpression: (node) => {
        if (!options.ArrowFunctionExpression) {
          return;
        }

        if (node.parent.type !== 'VariableDeclarator') {
          return;
        }

        checkJsDoc(node);
      },

      ClassDeclaration: (node) => {
        if (!options.ClassDeclaration) {
          return;
        }

        checkJsDoc(node);
      },

      FunctionDeclaration: (node) => {
        if (!options.FunctionDeclaration) {
          return;
        }

        checkJsDoc(node);
      },

      FunctionExpression: (node) => {
        if (options.MethodDefinition && node.parent.type === 'MethodDefinition') {
          checkJsDoc(node);

          return;
        }

        if (!options.FunctionExpression) {
          return;
        }

        if (node.parent.type === 'VariableDeclarator') {
          checkJsDoc(node);
        }

        if (node.parent.type === 'Property' && node === node.parent.value) {
          checkJsDoc(node);
        }
      }
    };
  }
});
