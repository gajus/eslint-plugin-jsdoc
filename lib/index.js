// This script licensed under the MIT.
// http://orgachem.mit-license.org


var defineProp = Object.defineProperty;


/**
 * Namespace for jsdoctypeparser.
 * @namespace
 * @exports jsdoctypeparser
 */
module.exports = {


  /**
   * An alias for type expression parsers.
   * @type {module:lib/TypeParser}
   * @see module:lib/TypeParser
   */
  get Parser() {
    defineProp(this, 'Parser', { value: require('./TypeParser.js') });
    return this.Parser;
  },


  /**
   * An alias for type expression lexers.
   * @type {module:lib/TypeLexer}
   * @see module:lib/TypeLexer
   */
  get Lexer() {
    defineProp(this, 'Lexer', { value: require('./TypeLexer.js') });
    return this.Lexer;
  },


  /**
   * An alias for type expression object builders.
   * @type {module:lib/TypeBuilder}
   * @see module:lib/TypeBuilder
   */
  get Builder() {
    defineProp(this, 'Builder', { value: require('./TypeBuilder.js') });
    return this.Builder;
  },


  /**
   * An alias for type name dictionaries.
   * @type {module:lib/TypeDictionary}
   * @see module:lib/TypeDictionary
   */
  get Dictionary() {
    defineProp(this, 'Dictionary', { value: require('./TypeDictionary.js') });
    return this.Dictionary;
  }
};
