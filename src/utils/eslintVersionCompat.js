/**
 * @typedef {import('eslint').Rule.RuleContext} RuleContext
 * @typedef {import('eslint').SourceCode} SourceCode
 */

/**
 * Returns the file name for all versions of ESLint.
 * @param {RuleContext | (RuleContext & { getFilename: () => string }) } context the ESLint
 * execution context.
 * @returns {string} the file name.
 */
export const getFilename = function (context) {
  return context.filename || /** @type {{ getFilename: () => string }} */ (context).getFilename();
};

/**
 * Returns the source code for all versions of ESLint.
 * @param {RuleContext | (RuleContext & { getSourceCode: () => SourceCode })} context the ESLint
 * execution context.
 * @returns {SourceCode} the source code object.
 */
export const getSourceCode = function (context) {
  return context.sourceCode || /** @type {{ getSourceCode: () => SourceCode }} */ (context).getSourceCode();
};
