/*eslint-env mocha*/
'use strict';

var chai = require('chai');
var expect = chai.expect;

var NodeType = require('../../src/NodeType.js');

// var Parser = require('../../lib/NewParser');
var parser = require('../../peg_lib/jsdoctype.js');

describe('Parser', function(){
  function createTypeNameNode(typeName) {
    return {
      type: NodeType.NAME,
      value: typeName
    };
  }

  function createMemberTypeNode(ownerTypeExpr, memberTypeExpr) {
    return {
      type: NodeType.MEMBER,
      owner: ownerTypeExpr,
      member: memberTypeExpr
    };
  }

  function createUnionTypeNode(leftTypeExpr, rightTypeExpr) {
    return {
      type: NodeType.UNION,
      left: leftTypeExpr,
      right: rightTypeExpr
    };
  }

  function createVariadicTypeNode(variadicTypeExpr) {
    return {
      type: NodeType.VARIADIC,
      value: variadicTypeExpr
    };
  }

  function createRecordTypeNode(recordEntries) {
    return {
      type: NodeType.RECORD,
      entries: recordEntries
    };
  }

  function createRecordEntryNode(key, valueTypeExpr) {
    return {
      type: NodeType.RECORD_ENTRY,
      key: key,
      value: valueTypeExpr
    };
  }

  function createGenericTypeNode(genericTypeName, paramExprs) {
    return {
      type: NodeType.GENERIC,
      generic: genericTypeName,
      params: paramExprs
    };
  }


  it('should return a type name node when "TypeName" arrived', function(){
    var typeExprStr = 'TypeName';
    var node = parser.parse(typeExprStr);

    var expectedNode = createTypeNameNode(typeExprStr);
    expect(node).to.deep.equal(expectedNode);
  });


  it('should return a type name node when "$" arrived', function(){
    var typeExprStr = '$';
    var node = parser.parse(typeExprStr);

    var expectedNode = createTypeNameNode(typeExprStr);
    expect(node).to.deep.equal(expectedNode);
  });


  it('should return a type name node when "_" arrived', function(){
    var typeExprStr = '_';
    var node = parser.parse(typeExprStr);

    var expectedNode = createTypeNameNode(typeExprStr);
    expect(node).to.deep.equal(expectedNode);
  });


  it('should return a member type node when "owner.Member" arrived', function(){
    var typeExprStr = 'owner.Member';
    var node = parser.parse(typeExprStr);

    var expectedNode = createMemberTypeNode(
      createTypeNameNode('owner'),
      createTypeNameNode('Member'));

    expect(node).to.deep.equal(expectedNode);
  });


  it('should return a member type node when "superOwner.owner.Member" arrived', function(){
    var typeExprStr = 'superOwner.owner.Member';
    var node = parser.parse(typeExprStr);

    var expectedNode = createMemberTypeNode(
      createTypeNameNode('superOwner'),
      createMemberTypeNode(
        createTypeNameNode('owner'),
        createTypeNameNode('Member')
      ));

    expect(node).to.deep.equal(expectedNode);
  });


  it('should return an union type when "LeftType|RightType" arrived', function() {
    var typeExprStr = 'LeftType|RightType';
    var node = parser.parse(typeExprStr);

    var expectedNode = createUnionTypeNode(
      createTypeNameNode('LeftType'),
      createTypeNameNode('RightType')
    );

    expect(node).to.deep.equal(expectedNode);
  });


  it('should return an union type when "LeftType|MiddleType|RightType" arrived', function() {
    var typeExprStr = 'LeftType|MiddleType|RightType';
    var node = parser.parse(typeExprStr);

    var expectedNode = createUnionTypeNode(
      createTypeNameNode('LeftType'),
      createUnionTypeNode(
        createTypeNameNode('MiddleType'),
        createTypeNameNode('RightType')
      ));

    expect(node).to.deep.equal(expectedNode);
  });


  it('should return a variadic type node when "...variadicType" arrived', function(){
    var typeExprStr = '...variadicType';
    var node = parser.parse(typeExprStr);

    var expectedNode = createVariadicTypeNode(
      createTypeNameNode('variadicType'));

    expect(node).to.deep.equal(expectedNode);
  });


  it('should return a record type node when "{}" arrived', function(){
    var typeExprStr = '{}';
    var node = parser.parse(typeExprStr);

    var expectedNode = createRecordTypeNode([]);

    expect(node).to.deep.equal(expectedNode);
  });


  it('should return a record type node when "{Key:ValueType}" arrived', function(){
    var typeExprStr = '{key:ValueType}';
    var node = parser.parse(typeExprStr);

    var expectedNode = createRecordTypeNode([
      createRecordEntryNode('key', createTypeNameNode('ValueType'))
    ]);

    expect(node).to.deep.equal(expectedNode);
  });


  it('should return a record type node when "{key1:ValueType1,key2:ValueType2}" arrived', function(){
    var typeExprStr = '{key1:ValueType1,key2:ValueType2}';
    var node = parser.parse(typeExprStr);

    var expectedNode = createRecordTypeNode([
      createRecordEntryNode('key1', createTypeNameNode('ValueType1')),
      createRecordEntryNode('key2', createTypeNameNode('ValueType2'))
    ]);

    expect(node).to.deep.equal(expectedNode);
  });


  it('should return a generic type node when "Generic<ParamType>" arrived', function(){
    var typeExprStr = 'Generic<ParamType>';
    var node = parser.parse(typeExprStr);

    var expectedNode = createGenericTypeNode(
      createTypeNameNode('Generic'), [
        createTypeNameNode('ParamType')
      ]);

    expect(node).to.deep.equal(expectedNode);
  });


  it('should return a generic type node when "Generic<ParamType1,ParamType2>" arrived', function(){
    var typeExprStr = 'Generic<ParamType1,ParamType2>';
    var node = parser.parse(typeExprStr);

    var expectedNode = createGenericTypeNode(
      createTypeNameNode('Generic'), [
        createTypeNameNode('ParamType1'),
        createTypeNameNode('ParamType2')
      ]);

    expect(node).to.deep.equal(expectedNode);
  });


  it('should return a generic type node when "Generic.<ParamType>" arrived', function(){
    var typeExprStr = 'Generic.<ParamType>';
    var node = parser.parse(typeExprStr);

    var expectedNode = createGenericTypeNode(
      createTypeNameNode('Generic'), [
        createTypeNameNode('ParamType')
      ]);

    expect(node).to.deep.equal(expectedNode);
  });


  it('should return a generic type node when "Generic.<ParamType1,ParamType2>" arrived', function(){
    var typeExprStr = 'Generic.<ParamType1,ParamType2>';
    var node = parser.parse(typeExprStr);

    var expectedNode = createGenericTypeNode(
      createTypeNameNode('Generic'), [
        createTypeNameNode('ParamType1'),
        createTypeNameNode('ParamType2')
      ]);

    expect(node).to.deep.equal(expectedNode);
  });


  it('should return a generic type node when "ParamType[]" arrived', function(){
    var typeExprStr = 'ParamType[]';
    var node = parser.parse(typeExprStr);

    var expectedNode = createGenericTypeNode(
      createTypeNameNode('Array'), [
        createTypeNameNode('ParamType')
      ]);

    expect(node).to.deep.equal(expectedNode);
  });
});
