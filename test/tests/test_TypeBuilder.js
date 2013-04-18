// This script licensed under the MIT.
// http://orgachem.mit-license.org


var TypeBuilder = require('../../lib/index.js').Builder;
var util = require('../../lib/util.js');
util.warn = function() {};


var builder;

var test = {
  setUp: function(callback) {
    builder = new TypeBuilder();
    callback();
  },
  'Build a primitive type name': function(test) {
    builder.setTypeString('boolean');
    union = builder.build();

    test.equal(union.types.length, 1);
    test.equal(union.types[0].name, 'boolean');
    test.equal(union.optional, false);
    test.equal(union.nullable, false);
    test.equal(union.nonNullable, false);
    test.equal(union.variable, false);
    test.equal(union.all, false);
    test.equal(union.unknown, false);

    test.equal(union.toString(), 'boolean');
    test.equal(union.toHtml(), '<code>boolean</code>');
    test.done();
  },
  'Build a global type name': function(test) {
    builder.setTypeString('Window');
    union = builder.build();

    test.equal(union.types.length, 1);
    test.equal(union.types[0].name, 'Window');
    test.equal(union.optional, false);
    test.equal(union.nullable, false);
    test.equal(union.nonNullable, false);
    test.equal(union.variable, false);
    test.equal(union.all, false);
    test.equal(union.unknown, false);

    test.equal(union.toString(), 'Window');
    test.equal(union.toHtml(), '<code>Window</code>');
    test.done();
  },
  'Build an user-defined type name': function(test) {
    builder.setTypeString('goog.ui.Menu');
    union = builder.build();

    test.equal(union.types.length, 1);
    test.equal(union.types[0].name, 'goog.ui.Menu');
    test.equal(union.optional, false);
    test.equal(union.nullable, false);
    test.equal(union.nonNullable, false);
    test.equal(union.variable, false);
    test.equal(union.all, false);
    test.equal(union.unknown, false);

    test.equal(union.toString(), 'goog.ui.Menu');
    test.equal(union.toHtml(), '<a href="goog.ui.Menu.html">goog.ui.Menu</a>');
    test.done();
  },
  'Build a generic type has a parameter': function(test) {
    builder.setTypeString('Array.<string>');
    union = builder.build();

    test.equal(union.types.length, 1);
    test.equal(union.optional, false);
    test.equal(union.nullable, false);
    test.equal(union.nonNullable, false);
    test.equal(union.variable, false);
    test.equal(union.all, false);
    test.equal(union.unknown, false);

    var generic = union.types[0];
    test.equal(generic.genericTypeName, 'Array');
    test.equal(generic.parameterTypeUnions.length, 1);

    var paramUnion = generic.parameterTypeUnions[0];
    test.equal(paramUnion.types.length, 1);
    test.equal(paramUnion.types[0], 'string');
    test.equal(paramUnion.optional, false);
    test.equal(paramUnion.nullable, false);
    test.equal(paramUnion.nonNullable, false);
    test.equal(paramUnion.variable, false);
    test.equal(paramUnion.all, false);
    test.equal(paramUnion.unknown, false);

    test.equal(union.toString(), 'Array.<string>');
    test.equal(union.toHtml(), '<code>Array</code>.&lt;<code>string</code>&gt;');
    test.done();
  },
  'Build a generic type has 2 parameters': function(test) {
    builder.setTypeString('Object.<string, number>');
    union = builder.build();

    test.equal(union.types.length, 1);
    test.equal(union.optional, false);
    test.equal(union.nullable, false);
    test.equal(union.nonNullable, false);
    test.equal(union.variable, false);
    test.equal(union.all, false);
    test.equal(union.unknown, false);

    var generic = union.types[0];
    test.equal(generic.genericTypeName, 'Object');
    test.equal(generic.parameterTypeUnions.length, 2);

    var paramUnion1 = generic.parameterTypeUnions[0];
    test.equal(paramUnion1.types.length, 1);
    test.equal(paramUnion1.types[0].name, 'string');
    test.equal(paramUnion1.optional, false);
    test.equal(paramUnion1.nullable, false);
    test.equal(paramUnion1.nonNullable, false);
    test.equal(paramUnion1.variable, false);
    test.equal(paramUnion1.all, false);
    test.equal(paramUnion1.unknown, false);

    var paramUnion2 = generic.parameterTypeUnions[1];
    test.equal(paramUnion2.types.length, 1);
    test.equal(paramUnion2.types[0], 'number');
    test.equal(paramUnion2.optional, false);
    test.equal(paramUnion2.nullable, false);
    test.equal(paramUnion2.nonNullable, false);
    test.equal(paramUnion2.variable, false);
    test.equal(paramUnion2.all, false);
    test.equal(paramUnion2.unknown, false);

    test.equal(union.toString(), 'Object.<string, number>');
    test.equal(union.toHtml(), '<code>Object</code>.&lt;<code>string</code>, <code>number</code>&gt;');
    test.done();
  },
  'Build a JsDoc-formal generic type': function(test) {
    builder.setTypeString('String[]');
    union = builder.build();

    test.equal(union.types.length, 1);
    test.equal(union.optional, false);
    test.equal(union.nullable, false);
    test.equal(union.nonNullable, false);
    test.equal(union.variable, false);
    test.equal(union.all, false);
    test.equal(union.unknown, false);

    var generic = union.types[0];
    test.equal(generic.genericTypeName, 'Array');
    test.equal(generic.parameterTypeUnions.length, 1);

    var paramUnion = generic.parameterTypeUnions[0];
    test.equal(paramUnion.types.length, 1);
    test.equal(paramUnion.types[0], 'String');
    test.equal(paramUnion.optional, false);
    test.equal(paramUnion.nullable, false);
    test.equal(paramUnion.nonNullable, false);
    test.equal(paramUnion.variable, false);
    test.equal(paramUnion.all, false);
    test.equal(paramUnion.unknown, false);

    test.equal(union.toString(), 'Array.<String>');
    test.equal(union.toHtml(), '<code>Array</code>.&lt;<code>String</code>&gt;');
    test.done();
  },
  'Build a formal type union': function(test) {
    builder.setTypeString('(number|boolean)');
    union = builder.build();

    test.equal(union.types.length, 2);
    test.equal(union.optional, false);
    test.equal(union.nullable, false);
    test.equal(union.nonNullable, false);
    test.equal(union.variable, false);
    test.equal(union.all, false);
    test.equal(union.unknown, false);

    test.equal(union.types[0], 'number');
    test.equal(union.optional, false);
    test.equal(union.nullable, false);
    test.equal(union.nonNullable, false);
    test.equal(union.variable, false);
    test.equal(union.all, false);
    test.equal(union.unknown, false);

    test.equal(union.types[1], 'boolean');
    test.equal(union.optional, false);
    test.equal(union.nullable, false);
    test.equal(union.nonNullable, false);
    test.equal(union.variable, false);
    test.equal(union.all, false);
    test.equal(union.unknown, false);

    test.equal(union.toString(), 'number|boolean');
    test.equal(union.toHtml(), '<code>number</code>|<code>boolean</code>');
    test.done();
  },
  'Build a informal type union': function(test) {
    builder.setTypeString('number|boolean');
    union = builder.build();

    test.equal(union.types.length, 2);
    test.equal(union.optional, false);
    test.equal(union.nullable, false);
    test.equal(union.nonNullable, false);
    test.equal(union.variable, false);
    test.equal(union.all, false);
    test.equal(union.unknown, false);

    test.equal(union.types[0], 'number');
    test.equal(union.optional, false);
    test.equal(union.nullable, false);
    test.equal(union.nonNullable, false);
    test.equal(union.variable, false);
    test.equal(union.all, false);
    test.equal(union.unknown, false);

    test.equal(union.types[1], 'boolean');
    test.equal(union.optional, false);
    test.equal(union.nullable, false);
    test.equal(union.nonNullable, false);
    test.equal(union.variable, false);
    test.equal(union.all, false);
    test.equal(union.unknown, false);

    test.equal(union.toString(), 'number|boolean');
    test.equal(union.toHtml(), '<code>number</code>|<code>boolean</code>');
    test.done();
  },
  'Build a record type with an entry': function(test) {
    builder.setTypeString('{myNum}');
    union = builder.build();

    test.equal(union.types.length, 1);
    test.equal(union.optional, false);
    test.equal(union.nullable, false);
    test.equal(union.nonNullable, false);
    test.equal(union.variable, false);
    test.equal(union.all, false);
    test.equal(union.unknown, false);

    var record = union.types[0];
    test.equal(record.entries.length, 1);

    var entry = record.entries[0];
    test.equal(entry.name, 'myNum');

    var valUnion = entry.typeUnion;
    test.equal(valUnion.types.length, 0);
    test.equal(valUnion.optional, false);
    test.equal(valUnion.nullable, false);
    test.equal(valUnion.nonNullable, false);
    test.equal(valUnion.variable, false);
    test.equal(valUnion.all, true);
    test.equal(valUnion.unknown, false);

    test.equal(union.toString(), '{ myNum: * }');
    test.equal(union.toHtml(), '{ myNum: <code>*</code> }');
    test.done();
  },
  'Build a record type with 2 entries': function(test) {
    builder.setTypeString('{myNum: number, myObject}');
    union = builder.build();

    test.equal(union.types.length, 1);
    test.equal(union.optional, false);
    test.equal(union.nullable, false);
    test.equal(union.nonNullable, false);
    test.equal(union.variable, false);
    test.equal(union.all, false);
    test.equal(union.unknown, false);

    var record = union.types[0];
    test.equal(record.entries.length, 2);

    var entry1 = record.entries[0];
    test.equal(entry1.name, 'myNum');

    var valUnion1 = entry1.typeUnion;
    test.equal(valUnion1.types.length, 1);
    test.equal(valUnion1.types[0], 'number');
    test.equal(valUnion1.optional, false);
    test.equal(valUnion1.nullable, false);
    test.equal(valUnion1.nonNullable, false);
    test.equal(valUnion1.variable, false);
    test.equal(valUnion1.all, false);
    test.equal(valUnion1.unknown, false);

    var entry2 = record.entries[1];
    test.equal(entry2.name, 'myObject');

    var valUnion2 = entry2.typeUnion;
    test.equal(valUnion2.types.length, 0);
    test.equal(valUnion2.optional, false);
    test.equal(valUnion2.nullable, false);
    test.equal(valUnion2.nonNullable, false);
    test.equal(valUnion2.variable, false);
    test.equal(valUnion2.all, true);
    test.equal(valUnion2.unknown, false);

    test.equal(union.toString(), '{ myNum: number, myObject: * }');
    test.equal(union.toHtml(), '{ myNum: <code>number</code>, myObject: <code>*</code> }');
    test.done();
  },
  'Build a generic type has a parameter as a record type': function(test) {
    builder.setTypeString('Array.<{length}>');
    union = builder.build();

    test.equal(union.types.length, 1);
    test.equal(union.optional, false);
    test.equal(union.nullable, false);
    test.equal(union.nonNullable, false);
    test.equal(union.variable, false);
    test.equal(union.all, false);
    test.equal(union.unknown, false);

    var generic = union.types[0];
    test.equal(generic.genericTypeName, 'Array');

    test.equal(generic.parameterTypeUnions.length, 1);
    var valUnion = generic.parameterTypeUnions[0];
    test.equal(valUnion.types.length, 1);
    test.equal(valUnion.optional, false);
    test.equal(valUnion.nullable, false);
    test.equal(valUnion.nonNullable, false);
    test.equal(valUnion.variable, false);
    test.equal(valUnion.all, false);
    test.equal(valUnion.unknown, false);

    var record = valUnion.types[0];
    test.equal(record.entries.length, 1);

    var entry = record.entries[0];
    test.equal(entry.name, 'length');

    var valUnion = entry.typeUnion;
    test.equal(valUnion.types.length, 0);
    test.equal(valUnion.optional, false);
    test.equal(valUnion.nullable, false);
    test.equal(valUnion.nonNullable, false);
    test.equal(valUnion.variable, false);
    test.equal(valUnion.all, true);
    test.equal(valUnion.unknown, false);

    test.equal(union.toString(), 'Array.<{ length: * }>');
    test.equal(union.toHtml(), '<code>Array</code>.&lt;{ length: <code>*</code> }&gt;');
    test.done();
  },
  'Build a nullable type has a nullable type operator on the head': function(test) {
    builder.setTypeString('?number');
    union = builder.build();

    test.equal(union.types.length, 1);
    test.equal(union.types[0], 'number');
    test.equal(union.optional, false);
    test.equal(union.nullable, true);
    test.equal(union.nonNullable, false);
    test.equal(union.variable, false);
    test.equal(union.all, false);
    test.equal(union.unknown, false);

    test.equal(union.toString(), 'number|null');
    test.equal(union.toHtml(), '<code>number</code>|<code>null</code>');
    test.done();
  },
  'Build a nullable type has a nullable type operator on the tail': function(test) {
    builder.setTypeString('goog.ui.Component?');
    union = builder.build();

    test.equal(union.types.length, 1);
    test.equal(union.types[0], 'goog.ui.Component');
    test.equal(union.optional, false);
    test.equal(union.nullable, true);
    test.equal(union.nonNullable, false);
    test.equal(union.variable, false);
    test.equal(union.all, false);
    test.equal(union.unknown, false);

    test.equal(union.toString(), 'goog.ui.Component|null');
    test.equal(union.toHtml(), '<a href="goog.ui.Component.html">goog.ui.Component</a>|<code>null</code>');
    test.done();
  },
  'Build a non-nullable type has a nullable type operator on the head': function(test) {
    builder.setTypeString('!Object');
    union = builder.build();

    test.equal(union.types.length, 1);
    test.equal(union.types[0], 'Object');
    test.equal(union.optional, false);
    test.equal(union.nullable, false);
    test.equal(union.nonNullable, true);
    test.equal(union.variable, false);
    test.equal(union.all, false);
    test.equal(union.unknown, false);

    test.equal(union.toString(), '!Object');
    test.equal(union.toHtml(), '!<code>Object</code>');
    test.done();
  },
  'Build a non-nullable type has a nullable type operator on the tail': function(test) {
    builder.setTypeString('Object!');
    union = builder.build();

    test.equal(union.types.length, 1);
    test.equal(union.types[0], 'Object');
    test.equal(union.optional, false);
    test.equal(union.nullable, false);
    test.equal(union.nonNullable, true);
    test.equal(union.variable, false);
    test.equal(union.all, false);
    test.equal(union.unknown, false);

    test.equal(union.toString(), '!Object');
    test.equal(union.toHtml(), '!<code>Object</code>');
    test.done();
  },
  'Build a function type': function(test) {
    builder.setTypeString('Function');
    union = builder.build();

    test.equal(union.types.length, 1);
    test.equal(union.types[0], 'Function');
    test.equal(union.optional, false);
    test.equal(union.nullable, false);
    test.equal(union.nonNullable, false);
    test.equal(union.variable, false);
    test.equal(union.all, false);
    test.equal(union.unknown, false);

    test.equal(union.toString(), 'Function');
    test.equal(union.toHtml(), '<code>Function</code>');
    test.done();
  },
  'Build a function type has no parameters': function(test) {
    builder.setTypeString('function()');
    union = builder.build();

    test.equal(union.types.length, 1);
    test.equal(union.optional, false);
    test.equal(union.nullable, false);
    test.equal(union.nonNullable, false);
    test.equal(union.variable, false);
    test.equal(union.all, false);
    test.equal(union.unknown, false);

    var func = union.types[0];
    test.equal(func.parameterTypeUnions.length, 0);
    test.equal(func.returnTypeUnion, null);
    test.equal(func.contextTypeUnion, null);
    test.equal(func.isConstructor, false);

    test.equal(union.toString(), 'function()');
    test.equal(union.toHtml(), 'function()');
    test.done();
  },
  'Build a function type has a parameter': function(test) {
    builder.setTypeString('function(string)');
    union = builder.build();

    test.equal(union.types.length, 1);
    test.equal(union.optional, false);
    test.equal(union.nullable, false);
    test.equal(union.nonNullable, false);
    test.equal(union.variable, false);
    test.equal(union.all, false);
    test.equal(union.unknown, false);

    var func = union.types[0];
    test.equal(func.parameterTypeUnions.length, 1);
    test.equal(func.returnTypeUnion, null);
    test.equal(func.contextTypeUnion, null);
    test.equal(func.isConstructor, false);

    var paramUnion = func.parameterTypeUnions[0];
    test.equal(paramUnion.types.length, 1);
    test.equal(paramUnion.types[0], 'string');
    test.equal(paramUnion.optional, false);
    test.equal(paramUnion.nullable, false);
    test.equal(paramUnion.nonNullable, false);
    test.equal(paramUnion.variable, false);
    test.equal(paramUnion.all, false);
    test.equal(paramUnion.unknown, false);

    test.equal(union.toString(), 'function(string)');
    test.equal(union.toHtml(), 'function(<code>string</code>)');
    test.done();
  },
  'Build a function type has 2 parameters': function(test) {
    builder.setTypeString('function(string, boolean)');
    union = builder.build();

    test.equal(union.types.length, 1);
    test.equal(union.optional, false);
    test.equal(union.nullable, false);
    test.equal(union.nonNullable, false);
    test.equal(union.variable, false);
    test.equal(union.all, false);
    test.equal(union.unknown, false);

    var func = union.types[0];
    test.equal(func.parameterTypeUnions.length, 2);
    test.equal(func.returnTypeUnion, null);
    test.equal(func.contextTypeUnion, null);
    test.equal(func.isConstructor, false);

    var paramUnion1 = func.parameterTypeUnions[0];
    test.equal(paramUnion1.types.length, 1);
    test.equal(paramUnion1.types[0], 'string');
    test.equal(paramUnion1.optional, false);
    test.equal(paramUnion1.nullable, false);
    test.equal(paramUnion1.nonNullable, false);
    test.equal(paramUnion1.variable, false);
    test.equal(paramUnion1.all, false);
    test.equal(paramUnion1.unknown, false);

    var paramUnion2 = func.parameterTypeUnions[1];
    test.equal(paramUnion2.types.length, 1);
    test.equal(paramUnion2.types[0], 'boolean');
    test.equal(paramUnion2.optional, false);
    test.equal(paramUnion2.nullable, false);
    test.equal(paramUnion2.nonNullable, false);
    test.equal(paramUnion2.variable, false);
    test.equal(paramUnion2.all, false);
    test.equal(paramUnion2.unknown, false);

    test.equal(union.toString(), 'function(string, boolean)');
    test.equal(union.toHtml(), 'function(<code>string</code>, <code>boolean</code>)');
    test.done();
  },
  'Build a function type has a return': function(test) {
    builder.setTypeString('function(): number');
    union = builder.build();

    test.equal(union.types.length, 1);
    test.equal(union.optional, false);
    test.equal(union.nullable, false);
    test.equal(union.nonNullable, false);
    test.equal(union.variable, false);
    test.equal(union.all, false);
    test.equal(union.unknown, false);

    var func = union.types[0];
    test.equal(func.parameterTypeUnions.length, 0);
    test.equal(func.contextTypeUnion, null);
    test.equal(func.isConstructor, false);

    var returnUnion = func.returnTypeUnion;
    test.equal(returnUnion.types.length, 1);
    test.equal(returnUnion.types[0], 'number');
    test.equal(returnUnion.optional, false);
    test.equal(returnUnion.nullable, false);
    test.equal(returnUnion.nonNullable, false);
    test.equal(returnUnion.variable, false);
    test.equal(returnUnion.all, false);
    test.equal(returnUnion.unknown, false);

    test.equal(union.toString(), 'function(): number');
    test.equal(union.toHtml(), 'function(): <code>number</code>');
    test.done();
  },
  'Build a function type has a context': function(test) {
    builder.setTypeString('function(this:goog.ui.Menu, string)');
    union = builder.build();

    test.equal(union.types.length, 1);
    test.equal(union.optional, false);
    test.equal(union.nullable, false);
    test.equal(union.nonNullable, false);
    test.equal(union.variable, false);
    test.equal(union.all, false);
    test.equal(union.unknown, false);

    var func = union.types[0];
    test.equal(func.parameterTypeUnions.length, 1);
    test.equal(func.returnTypeUnion, null);
    test.equal(func.isConstructor, false);

    var contextUnion = func.contextTypeUnion;
    test.equal(contextUnion.types.length, 1);
    test.equal(contextUnion.types[0], 'goog.ui.Menu');
    test.equal(contextUnion.optional, false);
    test.equal(contextUnion.nullable, false);
    test.equal(contextUnion.nonNullable, false);
    test.equal(contextUnion.variable, false);
    test.equal(contextUnion.all, false);
    test.equal(contextUnion.unknown, false);

    var paramUnion = func.parameterTypeUnions[0];
    test.equal(paramUnion.types.length, 1);
    test.equal(paramUnion.types[0], 'string');
    test.equal(paramUnion.optional, false);
    test.equal(paramUnion.nullable, false);
    test.equal(paramUnion.nonNullable, false);
    test.equal(paramUnion.variable, false);
    test.equal(paramUnion.all, false);
    test.equal(paramUnion.unknown, false);

    test.equal(union.toString(), 'function(this:goog.ui.Menu, string)');
    test.equal(union.toHtml(), 'function(this:<a href="goog.ui.Menu.html">goog.ui.Menu</a>, <code>string</code>)');
    test.done();
  },
  'Build a constructor type': function(test) {
    builder.setTypeString('function(new:goog.ui.Menu, string)');
    union = builder.build();

    test.equal(union.types.length, 1);
    test.equal(union.optional, false);
    test.equal(union.nullable, false);
    test.equal(union.nonNullable, false);
    test.equal(union.variable, false);
    test.equal(union.all, false);
    test.equal(union.unknown, false);

    var func = union.types[0];
    test.equal(func.parameterTypeUnions.length, 1);
    test.equal(func.returnTypeUnion, null);
    test.equal(func.isConstructor, true);

    var contextUnion = func.contextTypeUnion;
    test.equal(contextUnion.types.length, 1);
    test.equal(contextUnion.types[0], 'goog.ui.Menu');
    test.equal(contextUnion.optional, false);
    test.equal(contextUnion.nullable, false);
    test.equal(contextUnion.nonNullable, false);
    test.equal(contextUnion.variable, false);
    test.equal(contextUnion.all, false);
    test.equal(contextUnion.unknown, false);

    var paramUnion = func.parameterTypeUnions[0];
    test.equal(paramUnion.types.length, 1);
    test.equal(paramUnion.types[0], 'string');
    test.equal(paramUnion.optional, false);
    test.equal(paramUnion.nullable, false);
    test.equal(paramUnion.nonNullable, false);
    test.equal(paramUnion.variable, false);
    test.equal(paramUnion.all, false);
    test.equal(paramUnion.unknown, false);

    test.equal(union.toString(), 'function(new:goog.ui.Menu, string)');
    test.equal(union.toHtml(), 'function(new:<a href="goog.ui.Menu.html">goog.ui.Menu</a>, <code>string</code>)');
    test.done();
  },
  'Build a function type has a variable parameter': function(test) {
    builder.setTypeString('function(string, ...[number]): number');
    union = builder.build();

    test.equal(union.types.length, 1);
    test.equal(union.optional, false);
    test.equal(union.nullable, false);
    test.equal(union.nonNullable, false);
    test.equal(union.variable, false);
    test.equal(union.all, false);
    test.equal(union.unknown, false);

    var func = union.types[0];
    test.equal(func.parameterTypeUnions.length, 2);
    test.equal(func.contextTypeUnion, null);
    test.equal(func.isConstructor, false);

    var paramUnion1 = func.parameterTypeUnions[0];
    test.equal(paramUnion1.types.length, 1);
    test.equal(paramUnion1.types[0], 'string');
    test.equal(paramUnion1.optional, false);
    test.equal(paramUnion1.nullable, false);
    test.equal(paramUnion1.nonNullable, false);
    test.equal(paramUnion1.variable, false);
    test.equal(paramUnion1.all, false);
    test.equal(paramUnion1.unknown, false);

    var paramUnion2 = func.parameterTypeUnions[1];
    test.equal(paramUnion2.types.length, 1);
    test.equal(paramUnion2.types[0], 'number');
    test.equal(paramUnion2.optional, false);
    test.equal(paramUnion2.nullable, false);
    test.equal(paramUnion2.nonNullable, false);
    test.equal(paramUnion2.variable, true);
    test.equal(paramUnion2.all, false);
    test.equal(paramUnion2.unknown, false);

    var returnUnion = func.returnTypeUnion;
    test.equal(returnUnion.types.length, 1);
    test.equal(returnUnion.types[0], 'number');
    test.equal(returnUnion.optional, false);
    test.equal(returnUnion.nullable, false);
    test.equal(returnUnion.nonNullable, false);
    test.equal(returnUnion.variable, false);
    test.equal(returnUnion.all, false);
    test.equal(returnUnion.unknown, false);

    test.equal(union.toString(), 'function(string, ...number): number');
    test.equal(union.toHtml(), 'function(<code>string</code>, ...<code>number</code>): <code>number</code>');
    test.done();
  },
  'Build a function type has parameters have some type operators': function(test) {
    builder.setTypeString('function(?string=, number=)');
    union = builder.build();

    test.equal(union.types.length, 1);
    test.equal(union.optional, false);
    test.equal(union.nullable, false);
    test.equal(union.nonNullable, false);
    test.equal(union.variable, false);
    test.equal(union.all, false);
    test.equal(union.unknown, false);

    var func = union.types[0];
    test.equal(func.parameterTypeUnions.length, 2);
    test.equal(func.returnTypeUnion, null);
    test.equal(func.contextTypeUnion, null);
    test.equal(func.isConstructor, false);

    var paramUnion1 = func.parameterTypeUnions[0];
    test.equal(paramUnion1.types.length, 1);
    test.equal(paramUnion1.types[0], 'string');
    test.equal(paramUnion1.optional, true);
    test.equal(paramUnion1.nullable, true);
    test.equal(paramUnion1.nonNullable, false);
    test.equal(paramUnion1.variable, false);
    test.equal(paramUnion1.all, false);
    test.equal(paramUnion1.unknown, false);

    var paramUnion2 = func.parameterTypeUnions[1];
    test.equal(paramUnion2.types.length, 1);
    test.equal(paramUnion2.types[0], 'number');
    test.equal(paramUnion2.optional, true);
    test.equal(paramUnion2.nullable, false);
    test.equal(paramUnion2.nonNullable, false);
    test.equal(paramUnion2.variable, false);
    test.equal(paramUnion2.all, false);
    test.equal(paramUnion2.unknown, false);

    test.equal(union.toString(), 'function(string|undefined|null, number|undefined)');
    test.equal(union.toHtml(), 'function(<code>string</code>|<code>undefined</code>|<code>null</code>, <code>number</code>|<code>undefined</code>)');
    test.done();
  },
  'Build a goog.ui.Component#forEachChild': function(test) {
    builder.setTypeString('function(this:T,?,number):?');
    union = builder.build();

    test.equal(union.types.length, 1);
    test.equal(union.optional, false);
    test.equal(union.nullable, false);
    test.equal(union.nonNullable, false);
    test.equal(union.variable, false);
    test.equal(union.all, false);
    test.equal(union.unknown, false);

    var func = union.types[0];
    test.equal(func.parameterTypeUnions.length, 2);
    test.equal(func.isConstructor, false);

    var contextUnion = func.contextTypeUnion;
    test.equal(contextUnion.types.length, 1);
    test.equal(contextUnion.types[0], 'T');
    test.equal(contextUnion.optional, false);
    test.equal(contextUnion.nullable, false);
    test.equal(contextUnion.nonNullable, false);
    test.equal(contextUnion.variable, false);
    test.equal(contextUnion.all, false);
    test.equal(contextUnion.unknown, false);

    var paramUnion1 = func.parameterTypeUnions[0];
    test.equal(paramUnion1.types.length, 0);
    test.equal(paramUnion1.optional, false);
    test.equal(paramUnion1.nullable, false);
    test.equal(paramUnion1.nonNullable, false);
    test.equal(paramUnion1.variable, false);
    test.equal(paramUnion1.all, false);
    test.equal(paramUnion1.unknown, true);

    var paramUnion2 = func.parameterTypeUnions[1];
    test.equal(paramUnion2.types.length, 1);
    test.equal(paramUnion2.types[0].name, 'number');
    test.equal(paramUnion2.optional, false);
    test.equal(paramUnion2.nullable, false);
    test.equal(paramUnion2.nonNullable, false);
    test.equal(paramUnion2.variable, false);
    test.equal(paramUnion2.all, false);
    test.equal(paramUnion2.unknown, false);

    var returnUnion = func.returnTypeUnion;
    test.equal(returnUnion.types.length, 0);
    test.equal(returnUnion.optional, false);
    test.equal(returnUnion.nullable, false);
    test.equal(returnUnion.nonNullable, false);
    test.equal(returnUnion.variable, false);
    test.equal(returnUnion.all, false);
    test.equal(returnUnion.unknown, true);

    test.equal(union.toString(), 'function(this:T, ?, number): ?');
    test.equal(union.toHtml(), 'function(this:<a href="T.html">T</a>, <code>?</code>, <code>number</code>): <code>?</code>');
    test.done();
  },
  'Build a variable type': function(test) {
    builder.setTypeString('...number');
    union = builder.build();

    test.equal(union.types.length, 1);
    test.equal(union.types[0], 'number');
    test.equal(union.optional, false);
    test.equal(union.nullable, false);
    test.equal(union.nonNullable, false);
    test.equal(union.variable, true);
    test.equal(union.all, false);
    test.equal(union.unknown, false);

    test.equal(union.toString(), '...number');
    test.equal(union.toHtml(), '...<code>number</code>');
    test.done();
  },
  'Build an optional type has an optional type operator on the head': function(test) {
    builder.setTypeString('=number');
    union = builder.build();

    test.equal(union.types.length, 1);
    test.equal(union.types[0], 'number');
    test.equal(union.optional, true);
    test.equal(union.nullable, false);
    test.equal(union.nonNullable, false);
    test.equal(union.variable, false);
    test.equal(union.all, false);
    test.equal(union.unknown, false);

    test.equal(union.toString(), 'number|undefined');
    test.equal(union.toHtml(), '<code>number</code>|<code>undefined</code>');
    test.done();
  },
  'Build an optional type has an optional type operator on the tail': function(test) {
    builder.setTypeString('number=');
    union = builder.build();

    test.equal(union.types.length, 1);
    test.equal(union.types[0], 'number');
    test.equal(union.optional, true);
    test.equal(union.nullable, false);
    test.equal(union.nonNullable, false);
    test.equal(union.variable, false);
    test.equal(union.all, false);
    test.equal(union.unknown, false);

    test.equal(union.toString(), 'number|undefined');
    test.equal(union.toHtml(), '<code>number</code>|<code>undefined</code>');
    test.done();
  },
  'Build an optional type with a "undefined" keyword': function(test) {
    builder.setTypeString('Object|undefined');
    union = builder.build();

    test.equal(union.types.length, 1);
    test.equal(union.types[0], 'Object');
    test.equal(union.optional, true);
    test.equal(union.nullable, false);
    test.equal(union.nonNullable, false);
    test.equal(union.variable, false);
    test.equal(union.all, false);
    test.equal(union.unknown, false);

    test.equal(union.toString(), 'Object|undefined');
    test.equal(union.toHtml(), '<code>Object</code>|<code>undefined</code>');
    test.done();
  },
  'Build an optional type with a "void" keyword': function(test) {
    builder.setTypeString('Object|void');
    union = builder.build();

    test.equal(union.types.length, 1);
    test.equal(union.types[0], 'Object');
    test.equal(union.optional, true);
    test.equal(union.nullable, false);
    test.equal(union.nonNullable, false);
    test.equal(union.variable, false);
    test.equal(union.all, false);
    test.equal(union.unknown, false);

    test.equal(union.toString(), 'Object|undefined');
    test.equal(union.toHtml(), '<code>Object</code>|<code>undefined</code>');
    test.done();
  },
  'Build an all type': function(test) {
    builder.setTypeString('*');
    union = builder.build();

    test.equal(union.types.length, 0);
    test.equal(union.optional, false);
    test.equal(union.nullable, false);
    test.equal(union.nonNullable, false);
    test.equal(union.variable, false);
    test.equal(union.all, true);
    test.equal(union.unknown, false);

    test.equal(union.toString(), '*');
    test.equal(union.toHtml(), '<code>*</code>');
    test.done();
  },
  'Build an unknown type': function(test) {
    builder.setTypeString('?');
    union = builder.build();

    test.equal(union.types.length, 0);
    test.equal(union.optional, false);
    test.equal(union.nullable, false);
    test.equal(union.nonNullable, false);
    test.equal(union.variable, false);
    test.equal(union.all, false);
    test.equal(union.unknown, true);

    test.equal(union.toString(), '?');
    test.equal(union.toHtml(), '<code>?</code>');
    test.done();
  },
  'Build an unknown type with an "unknown" keyword': function(test) {
    builder.setTypeString('unknown');
    union = builder.build();

    test.equal(union.types.length, 0);
    test.equal(union.optional, false);
    test.equal(union.nullable, false);
    test.equal(union.nonNullable, false);
    test.equal(union.variable, false);
    test.equal(union.all, false);
    test.equal(union.unknown, true);

    test.equal(union.toString(), '?');
    test.equal(union.toHtml(), '<code>?</code>');
    test.done();
  },
  'Build an undefined type with an "undefined" keyword': function(test) {
    builder.setTypeString('undefined');
    union = builder.build();

    test.equal(union.types.length, 0);
    test.equal(union.optional, true);
    test.equal(union.nullable, false);
    test.equal(union.nonNullable, false);
    test.equal(union.variable, false);
    test.equal(union.all, false);
    test.equal(union.unknown, false);

    test.equal(union.toString(), 'undefined');
    test.equal(union.toHtml(), '<code>undefined</code>');
    test.done();
  },
  'Build a null type with an "null" keyword': function(test) {
    builder.setTypeString('null');
    union = builder.build();

    test.equal(union.types.length, 0);
    test.equal(union.optional, false);
    test.equal(union.nullable, true);
    test.equal(union.nonNullable, false);
    test.equal(union.variable, false);
    test.equal(union.all, false);
    test.equal(union.unknown, false);

    test.equal(union.toString(), 'null');
    test.equal(union.toHtml(), '<code>null</code>');
    test.done();
  },
  'Build a module type': function(test) {
    builder.setTypeString('module:foo/bar');
    union = builder.build();

    test.equal(union.types.length, 1);
    test.equal(union.optional, false);
    test.equal(union.nullable, false);
    test.equal(union.nonNullable, false);
    test.equal(union.variable, false);
    test.equal(union.all, false);
    test.equal(union.unknown, false);

    test.equal(union.toString(), 'module:foo/bar');
    test.equal(union.toHtml(), 'module:<a href="module%3Afoo%2Fbar.html">foo/bar</a>');
    test.done();
  },
  'Build a module type with a prefix nullable type operator': function(test) {
    builder.setTypeString('?module:foo/bar');
    union = builder.build();

    test.equal(union.types.length, 1);
    test.equal(union.optional, false);
    test.equal(union.nullable, true);
    test.equal(union.nonNullable, false);
    test.equal(union.variable, false);
    test.equal(union.all, false);
    test.equal(union.unknown, false);

    test.equal(union.toString(), 'module:foo/bar|null');
    test.equal(union.toHtml(), 'module:<a href="module%3Afoo%2Fbar.html">foo/bar</a>|<code>null</code>');
    test.done();
  },
  'Build a module type with a postfix nullable type operator': function(test) {
    builder.setTypeString('module:foo/bar?');
    union = builder.build();

    test.equal(union.types.length, 1);
    test.equal(union.optional, false);
    test.equal(union.nullable, true);
    test.equal(union.nonNullable, false);
    test.equal(union.variable, false);
    test.equal(union.all, false);
    test.equal(union.unknown, false);

    test.equal(union.toString(), 'module:foo/bar|null');
    test.equal(union.toHtml(), 'module:<a href="module%3Afoo%2Fbar.html">foo/bar</a>|<code>null</code>');
    test.done();
  },
  'Build a module type with a generic type operator': function(test) {
    builder.setTypeString('module:foo/bar.<string>');
    union = builder.build();

    test.equal(union.types.length, 1);
    test.equal(union.optional, false);
    test.equal(union.nullable, false);
    test.equal(union.nonNullable, false);
    test.equal(union.variable, false);
    test.equal(union.all, false);
    test.equal(union.unknown, false);

    test.equal(union.toString(), 'module:foo/bar.<string>');
    test.equal(union.toHtml(), 'module:<a href="module%3Afoo%2Fbar.html">foo/bar</a>.&lt;<code>string</code>&gt;');
    test.done();
  },
  'Build an illegal generic type': function(test) {
    builder.setTypeString('Array.<a');
    union = builder.build();

    test.equal(union.types.length, 0);
    test.equal(union.optional, false);
    test.equal(union.nullable, false);
    test.equal(union.nonNullable, false);
    test.equal(union.variable, false);
    test.equal(union.all, false);
    test.equal(union.unknown, true);
    test.done();
  },
  'Build an illegal function type': function(test) {
    builder.setTypeString('function(string:');
    union = builder.build();

    test.equal(union.types.length, 0);
    test.equal(union.optional, false);
    test.equal(union.nullable, false);
    test.equal(union.nonNullable, false);
    test.equal(union.variable, false);
    test.equal(union.all, false);
    test.equal(union.unknown, true);
    test.done();
  },
  'Build an illegal type union': function(test) {
    builder.setTypeString('|string');
    union = builder.build();

    test.equal(union.types.length, 0);
    test.equal(union.optional, false);
    test.equal(union.nullable, false);
    test.equal(union.nonNullable, false);
    test.equal(union.variable, false);
    test.equal(union.all, false);
    test.equal(union.unknown, true);
    test.done();
  }
};

module.exports = test;
