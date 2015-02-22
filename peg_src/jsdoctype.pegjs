/*
typeExpr ::= ( typeName / memberType / parenthesisTypeExpr / unionTypeExpr / variadicTypeExpr / recordTypeExpr / optionalTypeExpr / nullableTypeExpr / notNullableTypeExpr / moduleType / genericTypeExpr / functionTypeExpr )

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

functionTypeExpr ::= "function("  [ paramPart ] ")" [ returnedTypeExpr ]
returnedTypeExpr ::= ":" typeExpr
paramPart ::= ( typeExpr / contextTypeExpr / constructionTypeExpr ) *[ "," typeExpr ] [ variadicParamTypeExpr ]
contextTypeExpr ::= "this:"
constructionTypeExpr ::= "new:"
variadicParamTypeExpr ::= "..." typeExpr
*/

{
  var NodeType = require('../src/NodeType.js');
}

start = typeExpr

typeExpr = genericType / recordType / variadicType / unionType / memberType / typeName
typeExprWithoutUnionType = genericType / recordType / variadicType / memberType / typeName
typeExprWithoutVariadicType = genericType / recordType / unionType /memberType / typeName
typeExprWithoutGenericType = recordType / variadicType / unionType / memberType / typeName


typeName = name:$(jsIdentifier) {
    return {
      type: NodeType.NAME,
      value: name
    };
  }

jsIdentifier = [a-zA-Z_$][a-zA-Z0-9_$]*

memberType = ownerTypeName:typeName "." memberTypeExpr:(memberType / typeName) {
    return {
      type: NodeType.MEMBER,
      owner: ownerTypeName,
      member: memberTypeExpr
    };
  }

unionType = leftTypeExpr:typeExprWithoutUnionType "|" rightTypeExpr:typeExpr {
    return {
      type: NodeType.UNION,
      left: leftTypeExpr,
      right: rightTypeExpr
    };
  }

variadicType = "..." variadicTypeExpr:typeExprWithoutVariadicType {
    return {
      type: NodeType.VARIADIC,
      value: variadicTypeExpr
    };
  }

recordType = "{" entries:recordEntriesCanBeEmpty "}" {
    return {
      type: NodeType.RECORD,
      entries: entries
    };
  }

recordEntriesCanBeEmpty = entries:( recordEntries )? {
  return entries || [];
}

recordEntries = firstEntry:recordEntry restEntries:( "," entries:recordEntries { return entries; } )? {
    return [firstEntry].concat(restEntries || []);
  }

recordEntry = key:recordKey ":" valueTypeExpr:typeExpr {
    return {
      type: NodeType.RECORD_ENTRY,
      key: key,
      value: valueTypeExpr
    };
  }

recordKey = $(jsIdentifier)

genericType = genericTypeClosureFlavored
/* genericType = genericTypeClosureFlavored / genericTypeJsdocFlavored */

genericTypeClosureFlavored = genericTypeNameExpr:genericTypeName "."? "<" firstTypeExpr:typeExpr restExprs:( "," restExpr:typeExpr { return restExpr; })* ">" {
    return {
      type: NodeType.GENERIC,
      generic: genericTypeNameExpr,
      params: [firstTypeExpr].concat(restExprs || [])
    };
  }

genericTypeName = memberType / typeName

genericTypeJsdocFlavored = paramTypeExpr:(recordType / variadicType /  memberType / typeName) arraySigns:"[]"+ {
    var nestingDepth = arraySigns.length;
    var node = paramTypeExpr;

    for (var i = nestingDepth; i > 0; i--) {
      node = {
        type: NodeType.GENERIC,
        generic: 'Array',
        params: node
      };
    }

    return node;
  }

optionalType = typeExprWithoutOptionalType "=" {
  
}
