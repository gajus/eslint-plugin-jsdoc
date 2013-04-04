// This script licensed under the MIT.
// http://orgachem.mit-license.org


var defineProp = Object.defineProperty;


module.exports = {
	get Parser(){
		defineProp(this, "Parser", {value:require("./TypeParser.js")});
		return this.Parser;
	},
	get Lexer(){
		defineProp(this, "Lexer", {value:require("./TypeLexer.js")});
		return this.Lexer;
	},
	get Builder(){
		defineProp(this, "Builder", {value:require("./TypeBuilder.js")});
		return this.Builder;
	},
	get Dictionary(){
		defineProp(this, "Dictionary", {value:require("./TypeDictionary.js")});
		return this.Dictionary;
	}
};
