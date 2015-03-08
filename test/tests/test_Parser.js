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

  function createModuleNameNode(moduleName) {
    return {
      type: NodeType.MODULE,
      value: moduleName
    };
  }

  function createOptionalTypeNode(optionalTypeExpr) {
    return {
      type: NodeType.OPTIONAL,
      value: optionalTypeExpr
    };
  }

  function createNullableTypeNode(nullableTypeExpr) {
    return {
      type: NodeType.NULLABLE,
      value: nullableTypeExpr
    };
  }

  function createNotNullableTypeNode(nullableTypeExpr) {
    return {
      type: NodeType.NOT_NULLABLE,
      value: nullableTypeExpr
    };
  }

  function createMemberTypeNode(ownerTypeExpr, memberTypeName) {
    return {
      type: NodeType.MEMBER,
      owner: ownerTypeExpr,
      name: memberTypeName
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
      subject: genericTypeName,
      objects: paramExprs
    };
  }

  function createFunctionTypeNode(paramNodes, returnedNode, modifierMap) {
    return {
      type: NodeType.FUNCTION,
      params: paramNodes,
      returns: returnedNode,
      context: modifierMap.context,
      newInstance: modifierMap.newInstance
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


  it('should return a module name node when "module:path/to/file.js" arrived', function(){
    var typeExprStr = 'module:path/to/file.js';
    var node = parser.parse(typeExprStr);

    var expectedNode = createModuleNameNode('path/to/file.js');
    expect(node).to.deep.equal(expectedNode);
  });


  it('should return a module name node when "module : path/to/file.js" arrived', function(){
    var typeExprStr = 'module : path/to/file.js';
    var node = parser.parse(typeExprStr);

    var expectedNode = createModuleNameNode('path/to/file.js');
    expect(node).to.deep.equal(expectedNode);
  });


  it('should return a member node when "(module:path/to/file.js).member" arrived', function(){
    var typeExprStr = '(module:path/to/file.js).member';
    var node = parser.parse(typeExprStr);

    var expectedNode = createMemberTypeNode(
      createModuleNameNode('path/to/file.js'),
      'member'
    );
    expect(node).to.deep.equal(expectedNode);
  });


  it('should return a member type node when "owner.Member" arrived', function(){
    var typeExprStr = 'owner.Member';
    var node = parser.parse(typeExprStr);

    var expectedNode = createMemberTypeNode(
      createTypeNameNode('owner'),
      'Member');

    expect(node).to.deep.equal(expectedNode);
  });


  it('should return a member type node when "owner . Member" arrived', function(){
    var typeExprStr = 'owner . Member';
    var node = parser.parse(typeExprStr);

    var expectedNode = createMemberTypeNode(
      createTypeNameNode('owner'),
      'Member');

    expect(node).to.deep.equal(expectedNode);
  });


  it('should return a member type node when "superOwner.owner.Member" arrived', function(){
    var typeExprStr = 'superOwner.owner.Member';
    var node = parser.parse(typeExprStr);

    var expectedNode = createMemberTypeNode(
        createMemberTypeNode(
          createTypeNameNode('superOwner'), 'owner'),
        'Member');

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


  it('should return an union type when "(LeftType|RightType)" arrived', function() {
    var typeExprStr = '(LeftType|RightType)';
    var node = parser.parse(typeExprStr);

    var expectedNode = createUnionTypeNode(
      createTypeNameNode('LeftType'),
      createTypeNameNode('RightType')
    );

    expect(node).to.deep.equal(expectedNode);
  });


  it('should return an union type when "( LeftType | RightType )" arrived', function() {
    var typeExprStr = '( LeftType | RightType )';
    var node = parser.parse(typeExprStr);

    var expectedNode = createUnionTypeNode(
      createTypeNameNode('LeftType'),
      createTypeNameNode('RightType')
    );

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


  it('should return a record type node when "{key:ValueType}" arrived', function(){
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


  it('should return a record type node when "{ key1 : ValueType1 , key2 : ValueType2 }" arrived', function(){
    var typeExprStr = '{ key1 : ValueType1 , key2 : ValueType2 }';
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


  it('should return a generic type node when "Generic < ParamType1 , ParamType2 >" arrived', function(){
    var typeExprStr = 'Generic < ParamType1, ParamType2 >';
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


  it('should return a generic type node when "Generic.< ParamType1 , ParamType2 >" arrived', function(){
    var typeExprStr = 'Generic.< ParamType1 , ParamType2 >';
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


  it('should return a generic type node when "ParamType[][]" arrived', function(){
    var typeExprStr = 'ParamType[][]';
    var node = parser.parse(typeExprStr);

    var expectedNode = createGenericTypeNode(
      createTypeNameNode('Array'), [
        createGenericTypeNode(
          createTypeNameNode('Array'), [
            createTypeNameNode('ParamType')
        ])
      ]);

    expect(node).to.deep.equal(expectedNode);
  });


  it('should return an optional type node when "string=" arrived', function(){
    var typeExprStr = 'string=';
    var node = parser.parse(typeExprStr);

    var expectedNode = createOptionalTypeNode(
      createTypeNameNode('string')
    );

    expect(node).to.deep.equal(expectedNode);
  });


  it('should return a nullable type node when "?string" arrived', function(){
    var typeExprStr = '?string';
    var node = parser.parse(typeExprStr);

    var expectedNode = createNullableTypeNode(
      createTypeNameNode('string')
    );

    expect(node).to.deep.equal(expectedNode);
  });


  it('should return a not nullable type node when "!Object" arrived', function(){
    var typeExprStr = '!Object';
    var node = parser.parse(typeExprStr);

    var expectedNode = createNotNullableTypeNode(
      createTypeNameNode('Object')
    );

    expect(node).to.deep.equal(expectedNode);
  });


  it('should return a function type node when "function()" arrived', function(){
    var typeExprStr = 'function()';
    var node = parser.parse(typeExprStr);

    var expectedNode = createFunctionTypeNode(
      [], null,
      { context: null, newInstance: null }
    );

    expect(node).to.deep.equal(expectedNode);
  });


  it('should return a function type node with a param when "function(Param)" arrived', function(){
    var typeExprStr = 'function(Param)';
    var node = parser.parse(typeExprStr);

    var expectedNode = createFunctionTypeNode(
      [ createTypeNameNode('Param') ], null,
      { context: null, newInstance: null }
    );

    expect(node).to.deep.equal(expectedNode);
  });


  it('should return a function type node with several params when "function(Param1,Param2)" arrived', function(){
    var typeExprStr = 'function(Param1,Param2)';
    var node = parser.parse(typeExprStr);

    var expectedNode = createFunctionTypeNode(
      [ createTypeNameNode('Param1'), createTypeNameNode('Param2') ], null,
      { context: null, newInstance: null }
    );

    expect(node).to.deep.equal(expectedNode);
  });


  it('should return a function type node with returns when "function():Returned" arrived', function(){
    var typeExprStr = 'function():Returned';
    var node = parser.parse(typeExprStr);

    var expectedNode = createFunctionTypeNode(
      [], createTypeNameNode('Returned'),
      { context: null, newInstance: null }
    );

    expect(node).to.deep.equal(expectedNode);
  });


  it('should return a function type node with a context type when "function(this:ThisObject)" arrived', function(){
    var typeExprStr = 'function(this:ThisObject)';
    var node = parser.parse(typeExprStr);

    var expectedNode = createFunctionTypeNode(
      [], null,
      { context: createTypeNameNode('ThisObject'), newInstance: null }
    );

    expect(node).to.deep.equal(expectedNode);
  });


  it('should return a function type node as a constructor when "function(new:NewObject)" arrived', function(){
    var typeExprStr = 'function(new:NewObject)';
    var node = parser.parse(typeExprStr);

    var expectedNode = createFunctionTypeNode(
      [], null,
      { context: null, newInstance: createTypeNameNode('NewObject') }
    );

    expect(node).to.deep.equal(expectedNode);
  });


  it('should return a function type node when "function( Param1 , Param2 ) : Returned" arrived', function(){
    var typeExprStr = 'function( Param1 , Param2 ) : Returned';
    var node = parser.parse(typeExprStr);

    var expectedNode = createFunctionTypeNode(
      [ createTypeNameNode('Param1'), createTypeNameNode('Param2') ],
      createTypeNameNode('Returned'),
      { context: null, newInstance: null }
    );

    expect(node).to.deep.equal(expectedNode);
  });
});
