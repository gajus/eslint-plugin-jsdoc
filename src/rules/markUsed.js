import iterateJsdoc from '../iterateJsdoc';

/**
 * Extracts the type names from a type declaration string.
 *
 * @see https://jsdoc.app/tags-type.html
 */
const extractTypeNames = (type) => {
  if (type.startsWith('(') && type.endsWith(')')) {
    // Type union
    return type.slice(1, type.length - 1).split('|').flatMap(extractTypeNames);
  } else if (type.endsWith('[]')) {
    // Arrays
    return extractTypeNames(type.slice(0, Math.max(0, type.length - 2)));
  } else if (type.startsWith('!') || type.startsWith('?')) {
    // Nullable type or non-nullable type
    return extractTypeNames(type.slice(1));
  } else if (type.startsWith('...')) {
    // Variable number of that type
    return extractTypeNames(type.slice(3));
  } else if (type.endsWith('=')) {
    // Optional parameter
    return extractTypeNames(type.slice(0, Math.max(0, type.length - 1)));
  } else {
    return [
      type,
    ];
  }
};

export default iterateJsdoc(({
  jsdoc,
  jsdocNode,
  context,
}) => {
  const sourceCode = context.getSourceCode();
  for (const tag of jsdoc.tags) {
    const typeNames = extractTypeNames(tag.type);
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
