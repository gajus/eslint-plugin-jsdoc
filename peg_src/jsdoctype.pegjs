{
  var NodeType = require('../src/NodeType.js');
  var TokenType = require('../src/TokenType.js');
  var FunctionModifierType = {
    CONTEXT: 0,
    NEW: 1
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
}

typeExpr =
  leftNode:typeExprWithoutNotUnaryOperators _
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


typeExprWithoutNotUnaryOperators =
  prefixUnaryOpTokens:(prefixUnaryOperator)*
  priorExprPart:highestPriorityTypeExprPart
  postfixUnaryOpTokens:(postfixUnaryOperator)* {
    prefixUnaryOpTokens = prefixUnaryOpTokens || [];
    postfixUnaryOpTokens = postfixUnaryOpTokens || [];

    reversedPostfixUnaryOpTokens = [].concat(postfixUnaryOpTokens);
    postfixUnaryOpTokens.reverse();

    // Prefix operators are prior.
    var tokens = prefixUnaryOpTokens.concat(reversedPostfixUnaryOpTokens);

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
              value: 'Array'
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
                              / typeName

parenthesisTypeExpr = "(" _ wrapped:typeExpr _ ")" {
  return wrapped;
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
      value: name
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
      value: filePath
    };
  }

moduleNameFilePathPart = [a-zA-Z_0-9_$./-]+


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
funcTypeExpr = "function" _ "(" _
               modifiers:funcTypeExprModifiersPart _
               params:funcTypeExprParamsPart _
               ")" _ returnedTypePart:(_ ":" _ typeExpr)? {
    var modifierMap = modifiers.reduce(function(prevModifierMap, modifier) {
      switch (modifier.modifierType) {
        case FunctionModifierType.THIS:
          prevModifierMap.context = modifier.value;
          break;
        case FunctionModifierType.NEW:
          prevModifierMap.newInstance = modifier.value;
          break;
        default:
          throw Error('Unexpected function modifier: ' + modifier.modifierType);
      }
      return prevModifierMap;
    }, {
      context: null,
      newInstance: null
    });

    var returnedTypeNode = returnedTypePart ? returnedTypePart[3] : null;

    return {
      type: NodeType.FUNCTION,
      params: params,
      returns: returnedTypeNode,
      context: modifierMap.context,
      newInstance: modifierMap.newInstance
    };
  }

funcTypeExprParamsPart = firstParam:typeExpr? restParamsWithComma:(_ "," _ typeExpr)* {
    var params = buildByFirstAndRest(firstParam, restParamsWithComma, 3);
    return params;
  }

funcTypeExprModifiersPart = firstModifier:funcTypeExprModifier?
                            restModifiersWithComma:(_ "," _ funcTypeExprModifier)* {
    var modifiers = buildByFirstAndRest(firstModifier, restModifiersWithComma, 3);
    return modifiers;
  }

funcTypeExprModifier = contextTypeModifier / newInstanceTypeModifier

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
 * White spaces.
 */
_  = [ \t\r\n ]*
