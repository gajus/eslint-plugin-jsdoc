/*
typeExpr ::= ( typeName / memberType / parenthesisTypeExpr / unionTypeExpr / variadicTypeExpr / recordTypeExpr / optionalTypeExpr / nullableTypeExpr / notNullableTypeExpr / moduleType / genericTypeExpr / funcTypeExpr )

typeName ::= 1*( ALPHA / DIGIT / "_" )

memberType ::= memberType "." typeName

parenthesisTypeExpr ::= "(" typeExpr ")"

unionTypeExpr ::= typeExpr "|" typeExpr

variadicTypeExpr ::= "..." typeExpr ; Be more restricted

recordTypeExpr ::= "{" recordKeyExpr ":" typeExpr "}"
recordKeyExpr ::= ( quotedRecordKey / bareRecordKey )
quotedRecordKey ::= '"' *( ALPHA / DIGIT / "_" / " " / "." / "-" ) '"'
bareRecordKey ::= 1*( ALPHA / DIGIT / "_" )

genericTypeExpr ::= ( genericTypeExprClosureFlavored / genericTypeExprEcmaFlavored / genericTypeExprJsdocFlavored )
genericTypeExprClosureFlavored ::= typeExpr "<" typeExpr ">"
genericTypeExprEcmaFlavored ::= typeExpr ".<" typeExpr ">"
genericTypeExprJsdocFlavored ::= typeExpr "[]"

optionalTypeExpr ::= ( optionalTypeExprJsdocFlavored / optionalTypeExprClosureFlavored / optionalTypeExprClosureFlavoredDeprecated )
optionalTypeExprClosureFlavored ::= typeExpr "="
optionalTypeExprClosureFlavoredDeprecated ::= "=" typeExpr
optionalTypeExprJsdocFlavored ::= "[" typeExpr "]"

nullableTypeExpr ::= ( nullableTypeExprClosureFlavored / nullableTypeExprClosureFlavoredDeprecated )
nullableTypeExprClosureFlavored ::= "?" typeExpr
nullableTypeExprClosureFlavoredDeprecated ::= typeExpr "?"

notNullableTypeExpr ::= "!" typeExpr

moduleType ::= ( bareModuleType / quotedModuleType )
bareModuleType ::= modulePrefix ":" 1*unambigousFilePathChar
quotedModuleType ::= modulePrefix ":" '"' 1*ambigousFilePathChar '"'

modulePrefix ::= "module"
unambigousFilePathChar ::= ( ALPHA / DIGIT / "_" / "-" / "~" / "/" / ":")
ambigousFilePathChar ::= ( unambigousFilePathChar / "."  / SP / "(" / ")" / "<" / ">" / "[" / "]" / "{" / "}" )

funcTypeExpr ::= "function("  [ paramPart ] ")" [ returnedTypeExpr ]
returnedTypeExpr ::= ":" typeExpr
paramPart ::= ( typeExpr / contextTypeExpr / constructionTypeExpr ) *[ "," typeExpr ] [ variadicParamTypeExpr ]
contextTypeExpr ::= "this:"
constructionTypeExpr ::= "new:"
variadicParamTypeExpr ::= "..." typeExpr
*/

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

  var buildByFirstAndRest = function(first, restsWithComma) {
    var rests = restsWithComma ? restsWithComma.map(byKey(1)) : [];
    return first ? [first].concat(rests) : [];
  };
}

/*

*/

start = typeExpr


typeExpr = prefixUnaryOpTokens:(prefixUnaryOperator)*
           priorExprPart:highestPriorityTypeExprPart
           postfixUnaryOpTokens:(postfixUnaryOperator)*
           infixParts:(infixBinaryOperator typeExpr)* {
  prefixUnaryOpTokens = prefixUnaryOpTokens || [];
  postfixUnaryOpTokens = postfixUnaryOpTokens || [];

  reversedPostfixUnaryOpTokens = [].concat(postfixUnaryOpTokens);
  postfixUnaryOpTokens.reverse();

  // Prefix operators are prior.
  var tokens = prefixUnaryOpTokens.concat(reversedPostfixUnaryOpTokens);

  var leftNode = tokens.reduce(function(prevNode, token) {
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

  var rootNode = infixParts.reduce(function(leftNode, infixPart) {
    var infixOpToken = infixPart[0];
    var rightNode = infixPart[1];

    switch (infixOpToken) {
      case TokenType.UNION_OPERATOR:
        return {
          type: NodeType.UNION,
          left: leftNode,
          right: rightNode
        };
      default:
        throw Error('Unexpected token: ' + token);
    }
  }, leftNode);

  return rootNode;
}
highestPriorityTypeExprPart = funcTypeExpr / parenthesisTypeExpr / recordTypeExpr / genericTypeExpr / typeNameExprOrMemberTypeExpr


typeName = name:$(jsIdentifier) {
    return {
      type: NodeType.NAME,
      value: name
    };
  }
jsIdentifier = [a-zA-Z_$][a-zA-Z0-9_$]*


moduleName = "module" ":" filePath:$(moduleNameFilePathPart) {
    return {
      type: NodeType.MODULE,
      value: filePath
    };
  }
moduleNameFilePathPart = [a-zA-Z_0-9_$./-]+


typeNameExprOrMemberTypeExpr = rootNode:(memberTypeExprRootPart) memberNamesWithOp:(memberTypeOperator memberName)* {
    var isJustTypeNameNode = memberNamesWithOp.length === 0;
    if (isJustTypeNameNode) {
      var typeNameNode = rootNode;
      return typeNameNode;
    }

    function createMemberTypeNode(memberName, parentNode) {
      return {
        type: NodeType.MEMBER,
        owner: parentNode,
        name: memberName
      };
    }

    // It is a member type.
    var memberNames = memberNamesWithOp.map(byKey(1));

    var prevNode = rootNode;
    memberNames.forEach(function(memberName) {
      var memberNode = createMemberTypeNode(memberName, prevNode);
      prevNode = memberNode;
    });

    return prevNode;
  }
memberTypeExprRootPart = moduleName / typeName
memberTypeOperator = "."
memberName = name:$(jsIdentifier) {
    return name;
  }

parenthesisTypeExpr = "(" wrapped:typeExpr ")" {
    return wrapped;
  }

genericTypeExpr = genericTypeExprTSFlavored / genericTypeExprTSFlavored
genericTypeExprESFlavored = subject:genericTypeExprSubjectivePart ".<" objects:genericTypeExprObjectivePart ">" {
    return {
      type: NodeType.GENERIC,
      subject: subject,
      objects: objects
    };
  }
genericTypeExprTSFlavored = subject:genericTypeExprSubjectivePart "<" objects:genericTypeExprObjectivePart ">" {
    return {
      type: NodeType.GENERIC,
      subject: subject,
      objects: objects
    };
  }
genericTypeExprSubjectivePart = subject:(funcTypeExpr / parenthesisTypeExpr / recordTypeExpr / typeNameExprOrMemberTypeExpr) {
    return subject;
  }
genericTypeExprObjectivePart = first:typeExpr restsWithComma:("," typeExpr)* {
    var objects = buildByFirstAndRest(first, restsWithComma);
    return objects;
  }

funcTypeExpr = "function(" modifiers:funcTypeExprModifiersPart params:funcTypeExprParamsPart ")" (":" typeExpr)? {
    return {
      type: NodeType.FUNCTION,
      modifiers: modifiers,
      params: params
    };
  }
funcTypeExprParamsPart = firstParam:typeExpr? restParamsWithComma:("," typeExpr)* {
    var params = buildByFirstAndRest(firstParam, restParamsWithComma);
    return params;
  }
funcTypeExprModifiersPart = firstModifier:funcTypeExprModifier? restModifiersWithComma:("," funcTypeExprModifier)* {
    var modifiers = buildByFirstAndRest(firstModifier, restModifiersWithComma);
    return modifiers;
  }
funcTypeExprModifier = contextTypeModifier / constructionTypeModifier
contextTypeModifier = "this" ":" value:typeExpr {
    return {
      modifierType: FunctionModifierType.THIS,
      value: value
    };
  }
constructionTypeModifier = "new" ":" value:typeExpr {
    return {
      modifierType: FunctionModifierType.NEW,
      value: value
    };
  }

recordTypeExpr = "{" firstEntry:recordEntry? restEntriesWithComma:("," recordEntry)* "}" {
    var entries = buildByFirstAndRest(firstEntry, restEntriesWithComma);

    return {
      type: NodeType.RECORD,
      entries: entries
    };
  }
recordEntry = key:$(jsIdentifier) ":" value:typeExpr {
    return {
      type: NodeType.RECORD_ENTRY,
      key: key,
      value: value
    };
  }

prefixUnaryOperator = nullableTypeOperator / notNullableTypeOperator / variadicTypeOperator / deprecatedOptionalTypeOperator
nullableTypeOperator = "?" {
    return TokenType.NULLABLE_OPERATOR;
  }
notNullableTypeOperator = "!" {
    return TokenType.NOT_NULLABLE_OPERATOR;
  }
deprecatedOptionalTypeOperator = optionalTypeOperator

postfixUnaryOperator = optionalTypeOperator / arrayOfGenericTypeOperatorJsDocFlavored / deprecatedNullableTypeOperator // Be careful about the left recursion
optionalTypeOperator = "=" {
    return TokenType.OPTIONAL_OPERATOR;
  }
variadicTypeOperator = "..." {
    return TokenType.VARIADIC_OPERATOR;
  }
arrayOfGenericTypeOperatorJsDocFlavored = "[]" {
    return TokenType.ARRAY_OPERATOR;
  }
deprecatedNullableTypeOperator = nullableTypeOperator

infixBinaryOperator = unionTypeOperator // Be careful about the left recursion
unionTypeOperator = "|" {
    return TokenType.UNION_OPERATOR;
  }
