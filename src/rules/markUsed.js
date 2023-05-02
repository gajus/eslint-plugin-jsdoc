import {
  parse,
} from 'jsdoc-type-pratt-parser';
import iterateJsdoc from '../iterateJsdoc';

/**
 * Extracts the type names from parsed type declaration.
 */
const extractTypeNames = (parsed) => {
  if (typeof parsed !== 'object' || parsed.type === 'JsdocTypeImport' || parsed.type === 'JsdocTypeSpecialNamePath') {
    // We don't want this to fall through to the base-case
    return [];
  } else if (parsed.type === 'JsdocTypeName') {
    return [
      parsed.value,
    ];
  } else if (parsed.type === 'JsdocTypeGeneric') {
    return [
      ...extractTypeNames(parsed.left),
      ...parsed.elements.flatMap(extractTypeNames),
    ];
  } else if (parsed.type === 'JsdocTypeFunction') {
    return [
      ...parsed.parameters.flatMap(extractTypeNames),
      ...extractTypeNames(parsed.returnType),
    ];
  } else if (parsed.type === 'JsdocTypeNamePath') {
    return extractTypeNames(parsed.left);
  } else if (parsed.type === 'JsdocTypePredicate') {
    // We purposefully don't consider the left (subject of the predicate) used
    return extractTypeNames(parsed.right);
  } else if (parsed.type === 'JsdocTypeObjectField') {
    return [
      ...extractTypeNames(parsed.key),
      ...extractTypeNames(parsed.right),
    ];
  } else if (parsed.type === 'JsdocTypeJsdocObjectField') {
    return [
      ...extractTypeNames(parsed.left),
      ...extractTypeNames(parsed.right),
    ];
  } else if (
    parsed.type === 'JsdocTypeKeyValue' ||
    parsed.type === 'JsdocTypeIndexSignature' ||
    parsed.type === 'JsdocTypeMappedType') {
    return extractTypeNames(parsed.right);
  } else {
    const result = [];
    if (parsed.element) {
      result.push(...extractTypeNames(parsed.element));
    }

    if (parsed.elements) {
      result.push(...parsed.elements.flatMap(extractTypeNames));
    }

    return result;
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
