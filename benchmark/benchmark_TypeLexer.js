// This script licensed under the MIT.
// http://orgachem.mit-license.org


var Benchmark = require('benchmark');
var jsdoctypelexer = require('../lib');
var TypeLexer = jsdoctypelexer.Lexer;

var suite = new Benchmark.Suite();
var util = require('../lib/util');

var lexer = new TypeLexer();

suite
    .add('Primitive type', function() {
      lexer.analize('boolean');
    })
    .add('Global Object', function() {
      lexer.analize('Window');
    })
    .add('User Object', function() {
      lexer.analize('goog.ui.Menu');
    })
    .add('Generics with a parameter', function() {
      lexer.analize('Array.<string>');
    })
    .add('Generics with two parameters', function() {
      lexer.analize('Object.<string, number>');
    })
    .add('Generics in Jsdoc style', function() {
      lexer.analize('String[]');
    })
    .add('Formal type union', function() {
      lexer.analize('(number|boolean)');
    })
    .add('Informal type union', function() {
      lexer.analize('number|boolean');
    })
    .add('Record type', function() {
      lexer.analize('{myNum: number, myObject}');
    })
    .add('Record type in generics', function() {
      lexer.analize('Array.<{length}>');
    })
    .add('NUllable type', function() {
      lexer.analize('?number');
    })
    .add('Nullable on a tail', function() {
      lexer.analize('goog.ui.Component?');
    })
    .add('Non nullable type', function() {
      lexer.analize('!Object');
    })
    .add('Non nullable type on a tail', function() {
      lexer.analize('Object!');
    })
    .add('Function type', function() {
      lexer.analize('Function');
    })
    .add('Function type with no parameter', function() {
      lexer.analize('function()');
    })
    .add('Function type with a parameter', function() {
      lexer.analize('function(string)');
    })
    .add('Function type with two parameters', function() {
      lexer.analize('function(string, boolean)');
    })
    .add('Function type with a return', function() {
      lexer.analize('function(): number');
    })
    .add('Function type with a context type', function() {
      lexer.analize('function(this:goog.ui.Menu, string)');
    })
    .add('Function type as a constructor', function() {
      lexer.analize('function(new:goog.ui.Menu, string)');
    })
    .add('Function type with variable parameters', function() {
      lexer.analize('function(string, ...[number]): number');
    })
    .add('Function type with nullable or optional parameters', function() {
      lexer.analize('function(?string=, number=)');
    })
    .add('Function type as goog.ui.Component#forEachChild', function() {
      lexer.analize('function(this:T,?,number):?');
    })
    .add('Variable type', function() {
      lexer.analize('...number');
    })
    .add('Optional type', function() {
      lexer.analize('number=');
    })
    .add('All type', function() {
      lexer.analize('*');
    })
    .add('Unknown type', function() {
      lexer.analize('?');
    })
    .add('Unknown type with a keyword', function() {
      lexer.analize('unknown');
    })
    .add('Optional type with a "undefined" keyword', function() {
      lexer.analize('Object|undefined');
    })
    .add('Optional type with a "void" keyword', function() {
      lexer.analize('Object|void');
    })
    .on('complete', function() {
      var elapsed = 0;
      for (var i = 0, l = this.length, benchmark; i < l; ++i) {
          benchmark = this[i];
          var name = benchmark.name;
          var whites = util.repeat(' ', 55 - name.length);

          console.log(name + whites + ': ' + (benchmark.times.period * 1000) + ' msec');
          elapsed += benchmark.times.elapsed;
      }
      console.log('Complete (' + benchmark.times.elapsed + ' sec)');
    })
    .run({ 'async': true });
