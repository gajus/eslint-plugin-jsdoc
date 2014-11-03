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
      handleUnknownTypeOperatorToken: function() {},
      handleModuleNameToken: function(arg) {}
    };

    lexer = new TypeLexer(cbs);
    callback();
  },
  'Analyze a primitive type name': function(test) {
    lexer.analyze('boolean');
    test.done();
  },
  'Analyze a global type name': function(test) {
    lexer.analyze('Window');
    test.done();
  },
  'Analyze an user-defined type name': function(test) {
    lexer.analyze('goog.ui.Menu');
    test.done();
  },
  'Analyze a generic type has a parameter': function(test) {
    lexer.analyze('Array.<string>');
    test.done();
  },
  'Analyze a generic type has 2 parameters': function(test) {
    lexer.analyze('Object.<string, number>');
    test.done();
  },
  'Analyze a JsDoc-formal generic type': function(test) {
    lexer.analyze('String[]');
    test.done();
  },
  'Analyze a formal type union': function(test) {
    lexer.analyze('(number|boolean)');
    test.done();
  },
  'Analyze a informal type union': function(test) {
    lexer.analyze('number|boolean');
    test.done();
  },
  'Analyze a record type with an entry': function(test) {
    lexer.analyze('{myNum}');
    test.done();
  },
  'Analyze a record type with 2 entries': function(test) {
    lexer.analyze('{myNum: number, myObject}');
    test.done();
  },
  'Analyze a generic type has a parameter as a record type': function(test) {
    lexer.analyze('Array.<{length}>');
    test.done();
  },
  'Analyze a nullable type has a nullable type operator on the head': function(test) {
    lexer.analyze('?number');
    test.done();
  },
  'Analyze a nullable type has a nullable type operator on the tail': function(test) {
    lexer.analyze('goog.ui.Component?');
    test.done();
  },
  'Analyze a non-nullable type has a nullable type operator on the head': function(test) {
    lexer.analyze('!Object');
    test.done();
  },
  'Analyze a non-nullable type has a nullable type operator on the tail': function(test) {
    lexer.analyze('Object!');
    test.done();
  },
  'Analyze a function type': function(test) {
    lexer.analyze('Function');
    test.done();
  },
  'Analyze a function type has no parameters': function(test) {
    lexer.analyze('function()');
    test.done();
  },
  'Analyze a function type has a parameter': function(test) {
    lexer.analyze('function(string)');
    test.done();
  },
  'Analyze a function type has 2 parameters': function(test) {
    lexer.analyze('function(string, boolean)');
    test.done();
  },
  'Analyze a function type has a return': function(test) {
    lexer.analyze('function(): number');
    test.done();
  },
  'Analyze a function type has a context': function(test) {
    lexer.analyze('function(this:goog.ui.Menu, string)');
    test.done();
  },
  'Analyze a constructor type': function(test) {
    lexer.analyze('function(new:goog.ui.Menu, string)');
    test.done();
  },
  'Analyze a function type has a variable parameter': function(test) {
    lexer.analyze('function(string, ...[number]): number');
    test.done();
  },
  'Analyze a function type has parameters have some type operators': function(test) {
    lexer.analyze('function(?string=, number=)');
    test.done();
  },
  'Analyze a goog.ui.Component#forEachChild': function(test) {
    lexer.analyze('function(this:T,?,number):?');
    test.done();
  },
  'Analyze a goog.ui.Component#forEachChild without callbacks': function(test) {
    var lexer = new TypeLexer();
    lexer.analyze('function(this:T,?,number):?');
    test.done();
  },
  'Analyze a variable type': function(test) {
    lexer.analyze('...number');
    test.done();
  },
  'Analyze an optional type has an optional type operator on the head': function(test) {
    lexer.analyze('=number');
    test.done();
  },
  'Analyze an optional type has an optional type operator on the tail': function(test) {
    lexer.analyze('number=');
    test.done();
  },
  'Analyze an optional type with a "undefined" keyword': function(test) {
    lexer.analyze('Object|undefined');
    test.done();
  },
  'Analyze an optional type with a "void" keyword': function(test) {
    lexer.analyze('Object|void');
    test.done();
  },
  'Analyze an all type': function(test) {
    lexer.analyze('*');
    test.done();
  },
  'Analyze an unknown type': function(test) {
    lexer.analyze('?');
    test.done();
  },
  'Analyze an unknown type with an "unknown" keyword': function(test) {
    lexer.analyze('unknown');
    test.done();
  },
  'Analyze a module type': function(test) {
    lexer.analyze('module: foo/bar');
    test.done();
  },
  'Analyze a module type with a prefix nullable type operator': function(test) {
    lexer.analyze('?module: foo/bar');
    test.done();
  },
  'Analyze a module type with a postfix nullable type operator': function(test) {
    lexer.analyze('module: foo/bar?');
    test.done();
  },
  'Analyze a module type with a file extension': function(test) {
    lexer.analyze('module: foo/bar.js');
    test.done();
  },
  'Analyze a module type with a generic type': function(test) {
    lexer.analyze('module: foo/Bar.<string>');
    test.done();
  },
  'Analyze an illegal generic type': function(test) {
    test.throws(function() {
      lexer.analyze('Array.<a');
    }, TypeLexer.SyntaxError);
    test.done();
  },
  'Analyze an illegal function type': function(test) {
    test.throws(function() {
      lexer.analyze('function(string:');
    }, TypeLexer.SyntaxError);
    test.done();
  },
  'Analyze an illegal type union': function(test) {
    test.throws(function() {
      lexer.analyze('|string');
    }, TypeLexer.SyntaxError);
    test.done();
  }
};

module.exports = test;
