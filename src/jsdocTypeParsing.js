import {
  parse as parseType,
  tryParse as tryParseType,
} from '@es-joy/jsdoccomment';

/**
 * @typedef {import('jsdoc-type-pratt-parser').ParseMode} ParseMode
 */

/**
 * @typedef {{
 *   module?: boolean,
 *   strictMode?: boolean,
 *   asyncFunctionBody?: boolean,
 *   classContext?: boolean,
 *   range?: boolean,
 *   rangeStart?: number,
 *   loc?: boolean,
 *   locStart?: {
 *     column: number,
 *     line: number,
 *   },
 *   computedPropertyParser?: (text: string) => import('jsdoc-type-pratt-parser').RootResult,
 * }} ParseOptions
 */

/**
 * Parses the expression inside a computed property or method name.
 *
 * `jsdoc-type-pratt-parser` only keeps square brackets as a computed key when
 * this hook is supplied. Without it, a key such as `Symbol.dispose` is parsed
 * too greedily (the `]` is swallowed) and the type is rejected. Reparsing the
 * candidate text in typescript mode, without this hook, accepts the key only
 * when the whole candidate is one type, so `Symbol.dispose` stays a namepath
 * and index signatures such as `{[key: string]: number}` are unchanged.
 * @param {string} text
 * @returns {import('jsdoc-type-pratt-parser').RootResult}
 */
const computedPropertyParser = (text) => {
  return parseType(text, 'typescript');
};

/**
 * Passed to `commentParserToESTree` so typedefs and other blocks parsed that
 * way accept the same computed keys.
 * @type {ParseOptions}
 */
const jsdocTypePrattParserArgs = {
  computedPropertyParser,
};

/**
 * @param {string} expression
 * @param {ParseMode} mode
 * @param {ParseOptions} [options]
 * @returns {import('jsdoc-type-pratt-parser').RootResult}
 */
const parse = (expression, mode, options) => {
  return parseType(expression, mode, {
    ...options,
    computedPropertyParser,
  });
};

/**
 * @param {string} expression
 * @param {ParseMode[]} [modes]
 * @param {ParseOptions} [options]
 * @returns {import('jsdoc-type-pratt-parser').RootResult}
 */
const tryParse = (expression, modes, options) => {
  return tryParseType(expression, modes, {
    ...options,
    computedPropertyParser,
  });
};

export {
  jsdocTypePrattParserArgs,
  parse,
  tryParse,
};
