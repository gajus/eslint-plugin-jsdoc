'use strict';


var util = require('util');
var lodash = require('lodash');
var NodeType = require('./NodeType.js');


/**
 * @name Node
 * @typedef {{ type: module:lib/NodeType }}
 */



/**
 * @name LegacyNode
 * @typedef {Object}
 */



/**
 * A class for transform errors.
 * @param {string} msg Error message.
 * @constructor
 * @extends {Error}
 */
function TransformationError(msg) {
  Error.captureStackTrace(this, this.constructor);
  this.name = this.constructor.name;
  this.message = util.format('TransformationError: %s', msg);
}
util.inherits(TransformationError, Error);



/**
 * A class for transforms to legacy.
 * It can transform strict type node structures from legacy type node.
 * @constructor
 */
function TransformForLegacy() {}


/**
 * Transform a strict type node structure to a legacy node.
 * @param {Node} nodeToTransform Node to transform.
 * @return {{ types: Array<Object> }} Root union type node.
 */
TransformForLegacy.prototype.transform = function(nodeToTransform) {
  // In legacy spec, root node is always an union type node.
  var rootUnionNode;

  // If the node is already union node, transform and return it.
  if (nodeToTransform.type === NodeType.UNION) {
    rootUnionNode = transformUnionTypeNode(nodeToTransform);
    return rootUnionNode;
  }

  // If the node is not union node, we should wrap by an implicit union node.
  rootUnionNode = createLegacyUnionType([]);
  rootUnionNode = wrapByLegacyUnionTypeNode(nodeToTransform, rootUnionNode);
  return rootUnionNode;
};


/**
 * @param {module:lib/NodeType} nodeType Node type.
 * @return {string} Node type name.
 */
function getNodeTypeName(nodeType) {
  return lodash.findKey(NodeType, function(nodeTypeCandidate) {
    return nodeType === nodeTypeCandidate;
  });
}


/**
 * @param {Node} node Node to test.
 * @param {module:lib/NodeType} expectedType Expected node type.
 * @throws {module:lib/TransformForLegacy/TransformationError}
 */
function assertNodeType(node, expectedType) {
  if (node.type === expectedType) return;

  var msg = util.format('Expected %s, but got %s: %j',
                        getNodeTypeName(expectedType),
                        getNodeTypeName(node.type),
                        node);

  throw new TransformationError(msg);
}


/**
 * @param {Node} node Node to be wrapped by a legacy
 *     union type node..
 * @param {LegacyNode=} opt_contextUnionTypeNode Optional
 *     legacy union type node. Modify the union type node in place, if the node
 *     is a member of the union type node family. Otherwise, a new union type
 *     node will be created and returned.
 */
function wrapByLegacyUnionTypeNode(node, opt_contextUnionTypeNode) {
  var contextUnionTypeNode = opt_contextUnionTypeNode || createLegacyUnionType([]);

  if (isUnionTypeNodeFamily(node)) {
    return transformNode(node, contextUnionTypeNode);
  }

  contextUnionTypeNode.types.push(transformNode(node));

  return contextUnionTypeNode;
}


/**
 * @param {Node} node Node to transform.
 * @param {LegacyNode=} opt_contextUnionTypeNode Optional
 *     context union type node. Modify the union type node in place, if the node
 *     is a member of union type node family.
 * @return {Object} Legacy node.
 */
function transformNode(node, opt_contextUnionTypeNode) {
  switch (node.type) {
    case NodeType.NAME:
      return transformTypeNameNode(node);
    case NodeType.MODULE:
      return transformModuleTypeNode(node);
    case NodeType.MEMBER:
      return transformMemberNode(node);
    case NodeType.RECORD:
      return transformRecordTypeNode(node);
    case NodeType.GENERIC:
      return transformGenericTypeNode(node);
    case NodeType.FUNCTION:
      return transformFunctionTypeNode(node);
    case NodeType.UNKNOWN:
      return transformUnknownTypeNode(node, opt_contextUnionTypeNode);
    case NodeType.ANY:
      return transformAnyTypeNode(node, opt_contextUnionTypeNode);
    case NodeType.OPTIONAL:
      return transformOptionalTypeNode(node, opt_contextUnionTypeNode);
    case NodeType.NULLABLE:
      return transformNullableTypeNode(node, opt_contextUnionTypeNode);
    case NodeType.NOT_NULLABLE:
      return transformNotNullableTypeNode(node, opt_contextUnionTypeNode);
    case NodeType.VARIADIC:
      return transformVariadicTypeNode(node, opt_contextUnionTypeNode);
    case NodeType.UNION:
      return transformUnionTypeNode(node, opt_contextUnionTypeNode);
  }

  throw new TransformationError('Unknown node type: %s, %j',
                                getNodeTypeName(node.type),
                                node);
}


/**
 * @param {Node} node Node to test.
 * @return {boolean} Whether the node is a member of the union type node family.
 *     In a legacy spec, some nodes are attribute of an legacy union type node.
 */
function isUnionTypeNodeFamily(node) {
  switch (node.type) {
    case NodeType.UNKNOWN:
    case NodeType.ANY:
    case NodeType.OPTIONAL:
    case NodeType.NULLABLE:
    case NodeType.NOT_NULLABLE:
    case NodeType.VARIADIC:
    case NodeType.UNION:
      return true;
  }

  return false;
}


/**
 * @param {Node} node Node to transform.
 * @param {LegacyNode=} opt_contextUnionTypeNode Optional
 *     legacy union type node. Modify the union type node in place, if the node
 *     is a member of the union type node family. Otherwise, a new union type
 *     node will be created and returned.
 * @return {Object} Legacy node.
 */
function transformUnionTypeNode(unionNode, opt_contextUnionTypeNode) {
  assertNodeType(unionNode, NodeType.UNION);

  var contextUnionTypeNode = opt_contextUnionTypeNode || createLegacyUnionType([]);

  contextUnionTypeNode = wrapByLegacyUnionTypeNode(unionNode.left,
                                                                contextUnionTypeNode);
  contextUnionTypeNode = wrapByLegacyUnionTypeNode(unionNode.right,
                                                                contextUnionTypeNode);

  return contextUnionTypeNode;
}


/**
 * @param {Node} node Node to transform.
 * @param {LegacyNode=} opt_contextUnionTypeNode Optional
 *     legacy union type node. Modify the union type node in place, if the node
 *     is a member of the union type node family. Otherwise, a new union type
 *     node will be created and returned.
 * @return {Object} Legacy node.
 */
function transformUnknownTypeNode(node, opt_contextUnionTypeNode) {
  assertNodeType(node, NodeType.UNKNOWN);
  var contextUnionTypeNode = opt_contextUnionTypeNode || createLegacyUnionType([]);

  defineLegacyUnionTypeNodeAttr(contextUnionTypeNode, true, 'unknown', true);

  return contextUnionTypeNode;
}


/**
 * @param {Node} node Node to transform.
 * @param {LegacyNode=} opt_contextUnionTypeNode Optional
 *     legacy union type node. Modify the union type node in place, if the node
 *     is a member of the union type node family. Otherwise, a new union type
 *     node will be created and returned.
 * @return {Object} Legacy node.
 */
function transformAnyTypeNode(node, opt_contextUnionTypeNode) {
  assertNodeType(node, NodeType.ANY);
  var contextUnionTypeNode = opt_contextUnionTypeNode || createLegacyUnionType([]);

  defineLegacyUnionTypeNodeAttr(contextUnionTypeNode, true, 'all', true);

  return contextUnionTypeNode;
}


/**
 * @param {Node} node Node to transform.
 * @param {LegacyNode=} opt_contextUnionTypeNode Optional
 *     legacy union type node. Modify the union type node in place, if the node
 *     is a member of the union type node family. Otherwise, a new union type
 *     node will be created and returned.
 * @return {Object} Legacy node.
 */
function transformVariadicTypeNode(node, opt_contextUnionTypeNode) {
  assertNodeType(node, NodeType.VARIADIC);
  var contextUnionTypeNode = opt_contextUnionTypeNode || createLegacyUnionType([]);

  defineLegacyUnionTypeNodeAttr(contextUnionTypeNode, true, 'variable', true);

  return wrapByLegacyUnionTypeNode(node.value, contextUnionTypeNode);
}


/**
 * @param {Node} node Node to transform.
 * @param {LegacyNode=} opt_contextUnionTypeNode Optional
 *     legacy union type node. Modify the union type node in place, if the node
 *     is a member of the union type node family. Otherwise, a new union type
 *     node will be created and returned.
 * @return {Object} Legacy node.
 */
function transformOptionalTypeNode(node, opt_contextUnionTypeNode) {
  assertNodeType(node, NodeType.OPTIONAL);
  var contextUnionTypeNode = opt_contextUnionTypeNode || createLegacyUnionType([]);

  defineLegacyUnionTypeNodeAttr(contextUnionTypeNode, true, 'optional', true);

  return wrapByLegacyUnionTypeNode(node.value, contextUnionTypeNode);
}


/**
 * @param {Node} node Node to transform.
 * @param {LegacyNode=} opt_contextUnionTypeNode Optional
 *     legacy union type node. Modify the union type node in place, if the node
 *     is a member of the union type node family. Otherwise, a new union type
 *     node will be created and returned.
 * @return {Object} Legacy node.
 */
function transformNullableTypeNode(node, opt_contextUnionTypeNode) {
  assertNodeType(node, NodeType.NULLABLE);
  var contextUnionTypeNode = opt_contextUnionTypeNode || createLegacyUnionType([]);

  defineLegacyUnionTypeNodeAttr(contextUnionTypeNode, true, 'nullable', true);
  defineLegacyUnionTypeNodeAttr(contextUnionTypeNode, true, 'nonNullable', false);

  return wrapByLegacyUnionTypeNode(node.value, contextUnionTypeNode);
}


/**
 * @param {Node} node Node to transform.
 * @param {LegacyNode=} opt_contextUnionTypeNode Optional
 *     legacy union type node. Modify the union type node in place, if the node
 *     is a member of the union type node family. Otherwise, a new union type
 *     node will be created and returned.
 * @return {Object} Legacy node.
 */
function transformNotNullableTypeNode(node, opt_contextUnionTypeNode) {
  assertNodeType(node, NodeType.NOT_NULLABLE);
  var contextUnionTypeNode = opt_contextUnionTypeNode || createLegacyUnionType([]);

  defineLegacyUnionTypeNodeAttr(contextUnionTypeNode, true, 'nullable', false);
  defineLegacyUnionTypeNodeAttr(contextUnionTypeNode, true, 'nonNullable', true);

  return wrapByLegacyUnionTypeNode(node.value, contextUnionTypeNode);
}


/**
 * @param {Node} node Node to transform.
 * @return {Object} Legacy node.
 */
function transformGenericTypeNode(node) {
  assertNodeType(node, NodeType.GENERIC);

  var subject = node.subject;
  var objects = node.objects;

  var genericTypeName = transformNode(subject);
  var legacyParameterTypeUnions = objects.map(function(objectNode) {
    return wrapByLegacyUnionTypeNode(objectNode, null);
  });

  return createLegacyGenericNodes(genericTypeName, legacyParameterTypeUnions);
}


/**
 * @param {Node} node Node to transform.
 * @return {Object} Legacy node.
 */
function transformMemberNode(node) {
  assertNodeType(node, NodeType.MEMBER);

  var memberNames = [];
  var currentNode = node;

  while (currentNode.type === NodeType.MEMBER) {
    var name = currentNode.name;
    memberNames.unshift(name);

    currentNode = currentNode.owner;
  }

  // In legacy spec, it must be a type name node.
  var rootOwnerNode = currentNode;
  assertNodeType(rootOwnerNode, NodeType.NAME);
  memberNames.unshift(rootOwnerNode.value);

  var legacyTypeName = memberNames.join('.');

  // Member type is a type name node in the legacy spec.
  return createLegacyNameNode(legacyTypeName);
}


/**
 * @param {Node} node Node to transform.
 * @return {Object} Legacy node.
 */
function transformTypeNameNode(node) {
  assertNodeType(node, NodeType.NAME);

  return createLegacyNameNode(node.value);
}


/**
 * @param {Node} node Node to transform.
 * @return {Object} Legacy node.
 */
function transformModuleTypeNode(node) {
  assertNodeType(node, NodeType.MODULE);

  // module type is a type name node in the legacy spec.
  return createLegacyNameNode(node.value);
}


/**
 * @param {Node} node Node to transform.
 * @return {Object} Legacy node.
 */
function transformRecordTypeNode(node) {
  assertNodeType(node, NodeType.RECORD);

  var legacyEntries = node.entries.map(function(entry) {
    var key = entry.key;
    var legacyUnionTypeNode = wrapByLegacyUnionTypeNode(entry.value, null);
    return createLegacyRecordEntryNode(key, legacyUnionTypeNode);
  });

  return createLegacyRecordTypeNode(legacyEntries);
}


/**
 * @param {Node} node Node to transform.
 * @return {Object} Legacy node.
 */
function transformFunctionTypeNode(node) {
  assertNodeType(node, NodeType.FUNCTION);
  var params = node.params;
  var returns = node.returns;
  var context = node.context;
  var newInstance = node.newInstance;

  var parameterTypeUnions = params.map(function(paramNode) {
    return wrapByLegacyUnionTypeNode(paramNode, null);
  });

  var returnTypeUnion = returns && wrapByLegacyUnionTypeNode(returns, null);

  var hasFuncContext = Boolean(context || newInstance);
  var isConstructor = Boolean(newInstance);
  var contextNode = isConstructor ? newInstance : context;
  var contextUnionTypeNode = hasFuncContext
    ? wrapByLegacyUnionTypeNode(contextNode, null)
    : null;

  return createLegacyFunctionTypeNode(parameterTypeUnions,
                                      returnTypeUnion,
                                      hasFuncContext,
                                      isConstructor,
                                      contextUnionTypeNode);
}


function createLegacyFunctionTypeNode(parameterTypeUnions, returnTypeUnion,
                                      hasFuncContext, isConstructor,
                                      contextUnionTypeNode) {

  var hasReturnTypeUnion = Boolean(returnTypeUnion);

  var legacyFunctionTypeNode = {};

  Object.defineProperties(legacyFunctionTypeNode, {
      parameterTypeUnions: {
      configurable: true,
      writable: true,
      value: parameterTypeUnions,
      enumerable: true,
    },
    returnTypeUnion: {
      configurable: true,
      writable: true,
      value: returnTypeUnion,
      enumerable: hasReturnTypeUnion,
    },
    isConstructor: {
      configurable: true,
      writable: true,
      value: isConstructor,
      enumerable: hasFuncContext,
    },
    contextTypeUnion: {
      configurable: true,
      writable: true,
      value: contextUnionTypeNode,
      enumerable: hasFuncContext,
    },
  });

  return legacyFunctionTypeNode;
}


function createLegacyRecordTypeNode(legacyEntries) {
  return {
    entries: legacyEntries,
  };
}


function createLegacyRecordEntryNode(name, legacyUnionTypeNode) {
  return {
    name: name,
    typeUnion: legacyUnionTypeNode,
  };
}


function createLegacyGenericNodes(genericTypeName, legacyParameterTypeUnions) {
  return {
    genericTypeName: genericTypeName,
    parameterTypeUnions: legacyParameterTypeUnions,
  };
}


function createLegacyNameNode(name) {
  return { name: name };
}


function createLegacyUnionType(types, opt_attrMap) {
  var legacyNode = { types: types };
  var attrMap = opt_attrMap || {};

  var unionTypeNodeAttrNames = [
    'optional',
    'variable',
    'nullable',
    'nonNullable',
    'unknown',
    'all',
  ];

  // The default legacy node attributes are on its prototype. This is a simple
  // emulation for the legacy behavior.
  unionTypeNodeAttrNames.forEach(function(attrName) {
    var isExplicit = attrName in attrMap;
    var attrVal = Boolean(attrMap[attrVal]);

    defineLegacyUnionTypeNodeAttr(legacyNode, isExplicit, attrName, attrVal);
  });

  return lodash.extend(legacyNode, attrMap);
}


function defineLegacyUnionTypeNodeAttr(legacyUnionTypeNode, isExplicit, attrName, attrVal) {
    Object.defineProperty(legacyUnionTypeNode, attrName, {
      writable: true,
      configurable: true,
      enumerable: isExplicit,
      value: attrVal,
    });
}


module.exports = {
  TransformForLegacy: TransformForLegacy,
  TransformationError: TransformationError,
};
