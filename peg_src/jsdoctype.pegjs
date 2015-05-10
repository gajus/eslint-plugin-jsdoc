{
  var lodash = require('lodash');
  var NodeType = require('../lib/NodeType.js');
  var TokenType = require('../lib/TokenType.js');
  var FunctionModifierType = {
    NONE: 0,
    CONTEXT: 1,
    NEW: 2,
  };

  var byKey = function(key) {
    return function(obj) {
      return obj[key];
    };
  };

  var buildByFirstAndRest = function(first, restsWithComma, restIndex) {
    var rests = restsWithComma ? restsWithComma.map(byKey(restIndex)) : [];
    return first ? [first].concat(rests) : [];
  };

  var reportSemanticIssue = function(msg) {
    console.warn(msg);
  };
}

// unknownTypeExpr should be put here to avoid confusing with nullable type operators
typeExpr =
  leftNode:(typeExprWithoutNotUnaryOperators / unknownTypeExpr) _
  memberTypeExprParts:(_ memberTypeOperator _ memberName)* _
  genericObjects:genericTypeExpr? _
  unionTypeExprParts:(_ unionTypeOperator _ typeExpr)* {
    var rootNode = leftNode;

    if (memberTypeExprParts) {
      var memberNames = memberTypeExprParts.map(byKey(3));

      function createMemberTypeNode(memberName, ownerNode) {
        return {
          type: NodeType.MEMBER,
          owner: ownerNode,
          name: memberName
        };
      }

      var prevNode = leftNode;
      memberNames.forEach(function(memberName) {
        var memberNode = createMemberTypeNode(memberName, prevNode);
        prevNode = memberNode;
      });

      rootNode = leftNode = prevNode;
    }

    if (genericObjects) {
      rootNode = leftNode = {
        type: NodeType.GENERIC,
        subject: leftNode,
        objects: genericObjects
      };
    }

    if (unionTypeExprParts) {
      rootNode = unionTypeExprParts.reduce(function(leftNode, rightNodeWithOp) {
        var rightNode = rightNodeWithOp[3];
        return {
          type: NodeType.UNION,
          left: leftNode,
          right: rightNode
        };
      }, leftNode);
    }

    return rootNode;
  }


/*
 * Type expressions with only unary operators.
 *
 * Examples:
 *   - ?string
 *   - ?string=
 *   - ...!Object
 */
typeExprWithoutNotUnaryOperators =
  prefixUnaryOpTokens:(prefixUnaryOperator)*
  priorExprPart:highestPriorityTypeExprPart
  postfixUnaryOpTokens:(postfixUnaryOperator)* {
    prefixUnaryOpTokens = prefixUnaryOpTokens || [];
    postfixUnaryOpTokens = postfixUnaryOpTokens || [];

    reversedPrefixUnaryOpTokens = [].concat(prefixUnaryOpTokens);
    reversedPrefixUnaryOpTokens.reverse();

    // Postfix operators are prior.
    var tokens = postfixUnaryOpTokens.concat(reversedPrefixUnaryOpTokens);

    var node = tokens.reduce(function(prevNode, token) {
      switch (token) {
        case TokenType.OPTIONAL_OPERATOR:
          return {
            type: NodeType.OPTIONAL,
            value: prevNode
          };
        case TokenType.NULLABLE_OPERATOR:
          return {
            type: NodeType.NULLABLE,
            value: prevNode
          };
        case TokenType.NOT_NULLABLE_OPERATOR:
          return {
            type: NodeType.NOT_NULLABLE,
            value: prevNode
          };
        case TokenType.VARIADIC_OPERATOR:
          return {
            type: NodeType.VARIADIC,
            value: prevNode
          };
        case TokenType.ARRAY_OPERATOR:
          return {
            type: NodeType.GENERIC,
            subject: {
              type: NodeType.NAME,
              name: 'Array'
            },
            objects: [
              prevNode
            ]
          };
        default:
          throw Error('Unexpected token: ' + token);
      }
    }, priorExprPart);

    return node;
  }

highestPriorityTypeExprPart = funcTypeExpr
                              / recordTypeExpr
                              / parenthesisTypeExpr
                              / moduleName
                              / anyTypeExpr
                              / unknownTypeExpr
                              / typeName


/*
 * Parenthesis expressions.
 *
 * Examples:
 *   - (Foo|Bar)
 *   - (module: path/to/file).Module
 */
parenthesisTypeExpr = "(" _ wrapped:typeExpr _ ")" {
  return wrapped;
}


/*
 * Type name expressions.
 *
 * Examples:
 *   - string
 *   - null
 *   - Error
 *   - $
 *   - _
 */
typeName = name:$(jsIdentifier) {
    return {
      type: NodeType.NAME,
      name: name
    };
  }
jsIdentifier = [a-zA-Z_$][a-zA-Z0-9_$]*


/*
 * Module name expressions.
 *
 * Examples:
 *   - module:path/to/file
 *   - module:path/to/file.js
 */
moduleName = "module" _ ":" _ filePath:$(moduleNameFilePathPart) {
    return {
      type: NodeType.MODULE,
      path: filePath
    };
  }

moduleNameFilePathPart = [a-zA-Z_0-9_$./-]+


/*
 * Any type expressions.
 *
 * Examples:
 *   - *
 */
anyTypeExpr = "*" {
    return { type: NodeType.ANY };
  }


/*
 * Unknown type expressions.
 *
 * Examples:
 *   - ?
 */
unknownTypeExpr = "?" {
    return { type: NodeType.UNKNOWN };
  }


/*
 * Member type expressions.
 *
 * Examples:
 *   - owner.member
 *   - superOwner.owner.member
 */
memberTypeOperator = "."

memberName = name:$(jsIdentifier) {
    return name;
  }


/*
 * Function type expressions.
 *
 * Examples:
 *   - function(string)
 *   - function(string, ...string)
 *   - function():number
 *   - function(this:jQuery):jQuery
 *   - function(new:Error)
 */
funcTypeExpr = "function" _ "(" _ paramParts:funcTypeExprParamsPart _ ")" _
               returnedTypePart:(_ ":" _ typeExpr)? {
    var modifierGroups = lodash.groupBy(paramParts, lodash.property('modifierType'));

    var params = [];
    var noModifiers = modifierGroups[FunctionModifierType.NONE];
    if (noModifiers) {
      params = noModifiers.map(function(paramPartWithNoModifier) {
        return paramPartWithNoModifier.value;
      });
    }


    var context = null;
    var contextModifiers = modifierGroups[FunctionModifierType.THIS];
    if (contextModifiers) {
      if (contextModifiers.length > 1) {
        reportSemanticIssue('"this" keyword should be declared only once');
      }

      // Enable the only first context modifier.
      context = contextModifiers[0].value;
    }


    var newInstance = null;
    var newInstanceModifiers = modifierGroups[FunctionModifierType.NEW];
    if (newInstanceModifiers) {
      if (newInstanceModifiers.length > 1) {
        reportSemanticIssue('"new" keyword should be declared only once');
      }

      // Enable the only first new instance modifier.
      newInstance = newInstanceModifiers[0].value;
    }

    var returnedTypeNode = returnedTypePart ? returnedTypePart[3] : null;

    return {
      type: NodeType.FUNCTION,
      params: params,
      returns: returnedTypeNode,
      context: context,
      newInstance: newInstance,
    };
  }

funcTypeExprParamsPart = firstParam:funcTypeExprParam? restParamsWithComma:(_ "," _ funcTypeExprParam)* {
    var params = buildByFirstAndRest(firstParam, restParamsWithComma, 3);
    return params;
  }

funcTypeExprParam = contextTypeModifier / newInstanceTypeModifier / noModifier

contextTypeModifier = "this" _ ":" _ value:typeExpr {
    return {
      modifierType: FunctionModifierType.THIS,
      value: value
    };
  }

newInstanceTypeModifier = "new" _ ":" _ value:typeExpr {
    return {
      modifierType: FunctionModifierType.NEW,
      value: value
    };
  }

noModifier = value:typeExpr {
    return {
      modifierType: FunctionModifierType.NONE,
      value: value
    };
  }


/*
 * Record type expressions.
 *
 * Examples:
 *   - {}
 *   - {length:number}
 *   - {toString:Function,valueOf:Function}
 */
recordTypeExpr = "{" _ firstEntry:recordEntry? restEntriesWithComma:(_ "," _ recordEntry)* _ "}" {
    var entries = buildByFirstAndRest(firstEntry, restEntriesWithComma, 3);

    return {
      type: NodeType.RECORD,
      entries: entries
    };
  }

recordEntry = key:$(jsIdentifier) _ ":" _ value:typeExpr {
    return {
      type: NodeType.RECORD_ENTRY,
      key: key,
      value: value
    };
  }


/*
 * Prefix unary operators.
 */
prefixUnaryOperator = nullableTypeOperator
                      / notNullableTypeOperator
                      / variadicTypeOperator
                      / deprecatedOptionalTypeOperator


/*
 * Nullable type expressions.
 *
 * Examples:
 *   - ?string
 *   - string? (deprecated)
 */
nullableTypeOperator = "?" {
    return TokenType.NULLABLE_OPERATOR;
  }

deprecatedNullableTypeOperator = nullableTypeOperator


/*
 * Nullable type expressions.
 *
 * Examples:
 *   - !Object
 */
notNullableTypeOperator = "!" {
    return TokenType.NOT_NULLABLE_OPERATOR;
  }


/*
 * Postfix unary operators.
 */
postfixUnaryOperator = optionalTypeOperator
                       / arrayOfGenericTypeOperatorJsDocFlavored
                       / deprecatedNullableTypeOperator // Be careful about the left recursion


/*
 * Optional type expressions.
 *
 * Examples:
 *   - string=
 *   - =string (deprecated)
 */
optionalTypeOperator = "=" {
    return TokenType.OPTIONAL_OPERATOR;
  }

deprecatedOptionalTypeOperator = optionalTypeOperator


/*
 * Variadic type expressions.
 *
 * Examples:
 *   - ...string
 */
variadicTypeOperator = "..." {
    return TokenType.VARIADIC_OPERATOR;
  }


/*
 * JSDoc style array of a generic type expressions.
 *
 * Examples:
 *   - string[]
 *   - number[][]
 */
arrayOfGenericTypeOperatorJsDocFlavored = "[]" {
    return TokenType.ARRAY_OPERATOR;
  }


/*
 * Union type expressions.
 *
 * Examples:
 *   - number|undefined
 *   - Foo|Bar|Baz
 */
unionTypeOperator = "|" {
    return TokenType.UNION_OPERATOR;
  }


/*
 * Generic type expressions.
 *
 * Examples:
 *   - Function<T>
 *   - Array.<string>
 */
genericTypeExpr =
  genericTypeStartToken _
  objects:genericTypeExprObjectivePart _
  genericTypeEndToken {
    return objects;
  }

genericTypeStartToken =
  genericTypeEcmaScriptFlavoredStartToken /
  genericTypeTypeScriptFlavoredStartToken

genericTypeEcmaScriptFlavoredStartToken = ".<"

genericTypeTypeScriptFlavoredStartToken = "<"

genericTypeEndToken = ">"

genericTypeExprObjectivePart = first:typeExpr restsWithComma:(_ "," _ typeExpr)* {
    var objects = buildByFirstAndRest(first, restsWithComma, 3);
    return objects;
  }


/*
 * White spaces.
 */
_  = [ \t\r\n ]*
