/**
 * Obtained originally from {@link https://github.com/eslint/eslint/blob/master/lib/util/source-code.js#L313}
 *
 * @license MIT
 */

/**
 * Checks if the given token is a comment token or not.
 *
 * @param {Token} token - The token to check.
 * @returns {boolean} `true` if the token is a comment token.
 */
const isCommentToken = (token) => {
  return token.type === 'Line' || token.type === 'Block' || token.type === 'Shebang';
};

/**
 * Check to see if its a ES6 export declaration.
 *
 * @param {ASTNode} astNode An AST node.
 * @returns {boolean} whether the given node represents an export declaration.
 * @private
 */
const looksLikeExport = function (astNode) {
  return astNode.type === 'ExportDefaultDeclaration' || astNode.type === 'ExportNamedDeclaration' ||
    astNode.type === 'ExportAllDeclaration' || astNode.type === 'ExportSpecifier';
};

/* eslint-disable complexity */
/**
 * Retrieves the JSDoc comment for a given node.
 *
 * @param {SourceCode} sourceCode The ESLint SourceCode
 * @param {ASTNode} node The AST node to get the comment for.
 * @param {object} settings The settings in context
 * @returns {Token|null} The Block comment token containing the JSDoc comment
 *    for the given node or null if not found.
 * @public
 * @deprecated
 */
const getJSDocComment = function (sourceCode, node, settings) {
  /**
   * Checks for the presence of a JSDoc comment for the given node and returns it.
   *
   * @param {ASTNode} astNode The AST node to get the comment for.
   * @returns {Token|null} The Block comment token containing the JSDoc comment
   *    for the given node or null if not found.
   * @private
   */
  const findJSDocComment = (astNode) => {
    const tokenBefore = sourceCode.getTokenBefore(astNode, {includeComments: true});
    const {minLines, maxLines} = settings;
    if (
      tokenBefore &&
      isCommentToken(tokenBefore) &&
      tokenBefore.type === 'Block' &&
      tokenBefore.value.charAt(0) === '*' &&
      astNode.loc.start.line - tokenBefore.loc.end.line >= minLines &&
      astNode.loc.start.line - tokenBefore.loc.end.line <= maxLines
    ) {
      return tokenBefore;
    }

    return null;
  };
  let parent = node.parent;

  switch (node.type) {
  case 'ClassDeclaration':
  case 'FunctionDeclaration':
    return findJSDocComment(looksLikeExport(parent) ? parent : node);

  case 'ClassExpression':
  case 'ObjectExpression':
  case 'ArrowFunctionExpression':
  case 'FunctionExpression':
    if (
      parent.type !== 'CallExpression' &&
      parent.type !== 'OptionalCallExpression' &&
      parent.type !== 'NewExpression'
    ) {
      while (
        !sourceCode.getCommentsBefore(parent).length &&
        !/Function/u.test(parent.type) &&
        parent.type !== 'MethodDefinition' &&
        parent.type !== 'Property'
      ) {
        parent = parent.parent;

        if (!parent) {
          break;
        }
      }

      if (parent && parent.type !== 'FunctionDeclaration' && parent.type !== 'Program') {
        return findJSDocComment(parent);
      }
    }

    return findJSDocComment(node);

  default:
    if (!node) {
      return null;
    }

    return findJSDocComment(node);
  }
};
/* eslint-enable complexity */

export default getJSDocComment;
