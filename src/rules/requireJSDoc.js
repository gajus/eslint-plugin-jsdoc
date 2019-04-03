//
// The requireJDDoc rule at eslint is deprecated and won't get any bugfixes anymore.
// Thus this method implements a compatible requireJSDoc rule.
//

export default (context) => {
  const getOption = (key, fallback) => {
    if (!context.options.length) {
      return fallback;
    }

    if (!context.options[0] || !context.options[0].require) {
      return fallback;
    }

    if (!context.options[0].require.hasOwnProperty(key)) {
      return fallback;
    }

    return context.options[0].require[key];
  };

  const options = {
    ArrowFunctionExpression: getOption('ArrowFunctionExpression', false),
    ClassDeclaration: getOption('ClassDeclaration', false),
    FunctionDeclaration: getOption('FunctionDeclaration', true),
    FunctionExpression: getOption('FunctionExpression', false),
    MethodDefinition: getOption('MethodDefinition', false)
  };

  const checkJsDoc = (node) => {
    const jsDocNode = context.getSourceCode().getJSDocComment(node);

    if (jsDocNode) {
      return;
    }

    context.report({
      message: 'Missing JSDoc comment.',
      node
    });
  };

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
};
