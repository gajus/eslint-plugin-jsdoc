// This script licensed under the MIT.
// http://orgachem.mit-license.org


var TypeLexer = require('../../lib/index.js').Lexer;

var lexer;

var test = {
  setUp: function(callback) {

    var cbs = {
      handleTypeNameToken: function(arg) {},
      handleOpenTypeUnionToken: function() {},
      handleCloseTypeUnionToken: function() {},
      handleOpenFunctionTypeToken: function() {},
      handleCloseFunctionTypeToken: function() {},
      handleOpenFunctionParametersToken: function() {},
      handleCloseFunctionParametersToken: function() {},
      handleFunctionReturnTypeUnionToken: function() {},
      handleFunctionContextTypeUnionToken: function() {},
      handleConstructorTypeUnionToken: function() {},
      handleOpenGenericTypeToken: function() {},
      handleCloseGenericTypeToken: function() {},
      handleGenericTypeNameToken: function(arg) {},
      handleOpenGenericTypeParametersToken: function() {},
      handleCloseGenericTypeParametersToken: function() {},
      handleOpenRecordTypeToken: function() {},
      handleCloseRecordTypeToken: function() {},
      handleRecordKeyNameToken: function(arg) {},
      handleRecordValueTypeToken: function() {},
      handleNullableTypeOperatorToken: function() {},
      handleNonNullableTypeOperatorToken: function() {},
      handleOptionalTypeOperatorToken: function() {},
      handleVariableTypeOperatorToken: function() {},
      handleAllTypeOperatorToken: function() {},
      handleUnknownTypeOperatorToken: function() {}
    };

    lexer = new TypeLexer(cbs);
    callback();
  },
  'analize a primitive type name': function(test) {
    lexer.analize('boolean');
    test.done();
  },
  'analize a global type name': function(test) {
    lexer.analize('Window');
    test.done();
  },
  'analize an user-defined type name': function(test) {
    lexer.analize('goog.ui.Menu');
    test.done();
  },
  'analize a generic type has a parameter': function(test) {
    lexer.analize('Array.<string>');
    test.done();
  },
  'analize a generic type has 2 parameters': function(test) {
    lexer.analize('Object.<string, number>');
    test.done();
  },
  'analize a JsDoc-formal generic type': function(test) {
    lexer.analize('String[]');
    test.done();
  },
  'analize a formal type union': function(test) {
    lexer.analize('(number|boolean)');
    test.done();
  },
  'analize a informal type union': function(test) {
    lexer.analize('number|boolean');
    test.done();
  },
  'analize a record type with an entry': function(test) {
    lexer.analize('{myNum}');
    test.done();
  },
  'analize a record type with 2 entries': function(test) {
    lexer.analize('{myNum: number, myObject}');
    test.done();
  },
  'analize a generic type has a parameter as a record type': function(test) {
    lexer.analize('Array.<{length}>');
    test.done();
  },
  'analize a nullable type has a nullable type operator on the head': function(test) {
    lexer.analize('?number');
    test.done();
  },
  'analize a nullable type has a nullable type operator on the tail': function(test) {
    lexer.analize('goog.ui.Component?');
    test.done();
  },
  'analize a non-nullable type has a nullable type operator on the head': function(test) {
    lexer.analize('!Object');
    test.done();
  },
  'analize a non-nullable type has a nullable type operator on the tail': function(test) {
    lexer.analize('Object!');
    test.done();
  },
  'analize a function type': function(test) {
    lexer.analize('Function');
    test.done();
  },
  'analize a function type has no parameters': function(test) {
    lexer.analize('function()');
    test.done();
  },
  'analize a function type has a parameter': function(test) {
    lexer.analize('function(string)');
    test.done();
  },
  'analize a function type has 2 parameters': function(test) {
    lexer.analize('function(string, boolean)');
    test.done();
  },
  'analize a function type has a return': function(test) {
    lexer.analize('function(): number');
    test.done();
  },
  'analize a function type has a context': function(test) {
    lexer.analize('function(this:goog.ui.Menu, string)');
    test.done();
  },
  'analize a constructor type': function(test) {
    lexer.analize('function(new:goog.ui.Menu, string)');
    test.done();
  },
  'analize a function type has a variable parameter': function(test) {
    lexer.analize('function(string, ...[number]): number');
    test.done();
  },
  'analize a function type has parameters have some type operators': function(test) {
    lexer.analize('function(?string=, number=)');
    test.done();
  },
  'analize a goog.ui.Component#forEachChild': function(test) {
    lexer.analize('function(this:T,?,number):?');
    test.done();
  },
  'analize a variable type': function(test) {
    lexer.analize('...number');
    test.done();
  },
  'analize an optional type has an optional type operator on the head': function(test) {
    lexer.analize('=number');
    test.done();
  },
  'analize an optional type has an optional type operator on the tail': function(test) {
    lexer.analize('number=');
    test.done();
  },
  'analize an optional type with a "undefined" keyword': function(test) {
    lexer.analize('Object|undefined');
    test.done();
  },
  'analize an optional type with a "void" keyword': function(test) {
    lexer.analize('Object|void');
    test.done();
  },
  'analize an all type': function(test) {
    lexer.analize('*');
    test.done();
  },
  'analize an unknown type': function(test) {
    lexer.analize('?');
    test.done();
  },
  'analize an unknown type with an "unknown" keyword': function(test) {
    lexer.analize('unknown');
    test.done();
  },
  'analize an illegal generic type': function(test) {
    test.throws(function() {
      lexer.analize('Array.<a');
    }, TypeLexer.SyntaxError);
    test.done();
  },
  'analize an illegal function type': function(test) {
    test.throws(function() {
      lexer.analize('function(string:');
    }, TypeLexer.SyntaxError);
    test.done();
  },
  'analize an illegal type union': function(test) {
    test.throws(function() {
      lexer.analize('|string');
    }, TypeLexer.SyntaxError);
    test.done();
  }
};

module.exports = test;
