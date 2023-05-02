import {
  parse,
} from 'jsdoc-type-pratt-parser';
import iterateJsdoc from '../iterateJsdoc';

/**
 * Extracts the type names from parsed type declaration.
 */
const extractTypeNames = (parsed) => { // eslint-disable-line complexity
  if (typeof parsed !== 'object') {
    return [];
  }

  switch (parsed.type) {
  case 'JsdocTypeName':
    return [
      parsed.value,
    ];
  case 'JsdocTypeOptional':
  case 'JsdocTypeNullable':
  case 'JsdocTypeNotNullable':
  case 'JsdocTypeTypeof':
  case 'JsdocTypeKeyof':
  case 'JsdocTypeParenthesis':
  case 'JsdocTypeVariadic':
    return extractTypeNames(parsed.element);
  case 'JsdocTypeUnion':
  case 'JsdocTypeObject':
  case 'JsdocTypeTuple':
  case 'JsdocTypeIntersection':
    return parsed.elements.flatMap(extractTypeNames);
  case 'JsdocTypeGeneric':
    return [
      ...extractTypeNames(parsed.left),
      ...parsed.elements.flatMap(extractTypeNames),
    ];
  case 'JsdocTypeFunction':
    return [
      ...parsed.parameters.flatMap(extractTypeNames),
      ...extractTypeNames(parsed.returnType),
    ];
  case 'JsdocTypeNamePath':
    return extractTypeNames(parsed.left);
  case 'JsdocTypePredicate':
    // We purposefully don't consider the left (subject of the predicate) used
    return extractTypeNames(parsed.right);
  case 'JsdocTypeObjectField':
    return [
      ...extractTypeNames(parsed.key),
      ...extractTypeNames(parsed.right),
    ];
  case 'JsdocTypeJsdocObjectField':
    return [
      ...extractTypeNames(parsed.left),
      ...extractTypeNames(parsed.right),
    ];
  case 'JsdocTypeKeyValue':
  case 'JsdocTypeIndexSignature':
  case 'JsdocTypeMappedType':
    return extractTypeNames(parsed.right);
  default:
    return [];
  }
};

export default iterateJsdoc(({
  jsdoc,
  jsdocNode,
  context,
  settings,
}) => {
  const {
    mode,
  } = settings;

  const sourceCode = context.getSourceCode();
  for (const tag of jsdoc.tags) {
    const parsedType = parse(tag.type, mode);
    const typeNames = extractTypeNames(parsedType);
    for (const typeName of typeNames) {
      sourceCode.markVariableAsUsed(typeName, jsdocNode);
    }
  }
}, {
  iterateAllJsdocs: true,
  meta: {
    docs: {
      description: 'Marks all types referenced in {@link} tags as used',
      url: 'https://github.com/gajus/eslint-plugin-jsdoc#eslint-plugin-jsdoc-rules-mark-used',
    },
    fixable: 'code',
    schema: [
      {
        additionalProperties: false,
        properties: {},
      },
    ],
    type: 'suggestion',
  },
});
