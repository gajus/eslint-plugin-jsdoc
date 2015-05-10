// This script licensed under the MIT.
// http://orgachem.mit-license.org
'use strict';


var defineProp = Object.defineProperty;


/**
 * Namespace for jsdoctypeparser.
 * @namespace
 * @exports jsdoctypeparser
 */
module.exports = {


  /**
   * An alias for type expression parsers.
   * @type {module:lib/legacy/TypeParser}
   * @see module:lib/legacy/TypeParser
   * @deprecated Do not use the module directly. Use TransformToLegacy.
   */
  get Parser() {
    var Parser = require('./Parser.js');
    var transform = require('./TransformForLegacy.js');

    /**
     * A class for type expression parser.  This type parser can parse:
     * @constructor
     * @exports lib/TypeParser
     */
    function ParserWithTransform() {}

    /**
     * Parses a type expression.
     * @param {string} typeExp Type expression string to parse.
     * @return {module:lib/TypeBuilder.TypeUnion} Type union object.
     */
    ParserWithTransform.prototype.parse = function(typeExp) {
      try {
        var ast = Parser.parse(typeExp);
        return transform(ast);
      }
      catch (e) {
        if (e instanceof transform.TransformationError
            || e instanceof Parser.SyntaxError) {
          var unknownType = transform(Parser.parse('unknown'));
          return unknownType;
        }

        throw e;
      }
    };


    /**
     * A class for transform errors.
     * @param {string} msg Error message.
     * @constructor
     * @extends {Error}
     */
    ParserWithTransform.TransformationError = transform.TransformationError;

    defineProp(this, 'Parser', { value: ParserWithTransform });
    return this.Parser;
  },


  /**
   * An alias for type expression lexers.
   * @type {module:lib/legacy/TypeLexer}
   * @see module:lib/legacy/TypeLexer
   * @deprecated Do not use the module directly. Use TransformToLegacy.
   */
  get Lexer() {
    defineProp(this, 'Lexer', { value: require('./legacy/TypeLexer.js') });
    return this.Lexer;
  },


  /**
   * An alias for type expression object builders.
   * @type {module:lib/legacy/TypeBuilder}
   * @see module:lib/legacy/TypeBuilder
   * @deprecated Do not use the module directly. Use TransformToLegacy.
   */
  get Builder() {
    defineProp(this, 'Builder', { value: require('./legacy/TypeBuilder.js') });
    return this.Builder;
  },


  /**
   * An alias for type name dictionaries.
   * @type {module:lib/legacy/TypeDictionary}
   * @see module:lib/legacy/TypeDictionary
   * @deprecated Do not use the module directly. Use TransformToLegacy.
   */
  get Dictionary() {
    defineProp(this, 'Dictionary', { value: require('./legacy/TypeDictionary.js') });
    return this.Dictionary;
  },
};
