import iterateJsdoc from '../iterateJsdoc';

const defaultAliases = {
  a: [
    'an', 'our',
  ],
};

const defaultUselessWords = [
  'a', 'an', 'i', 'in', 'of', 's', 'the',
];

// eslint-disable-next-line complexity
const getNamesFromNode = (node) => {
  switch (node?.type) {
  case 'AccessorProperty':
  case 'MethodDefinition':
  case 'PropertyDefinition':
  case 'TSAbstractAccessorProperty':
  case 'TSAbstractMethodDefinition':
  case 'TSAbstractPropertyDefinition':
    return [
      ...getNamesFromNode(node.parent.parent),
      ...getNamesFromNode(node.key),
    ];
  case 'ClassDeclaration':
  case 'ClassExpression':
  case 'FunctionDeclaration':
  case 'FunctionExpression':
  case 'TSModuleDeclaration':
  case 'TSMethodSignature':
  case 'TSDeclareFunction':
  case 'TSEnumDeclaration':
  case 'TSEnumMember':
  case 'TSInterfaceDeclaration':
  case 'TSTypeAliasDeclaration':
    return getNamesFromNode(node.id);
  case 'Identifier':
    return [
      node.name,
    ];
  case 'Property':
    return getNamesFromNode(node.key);
  case 'VariableDeclaration':
    return getNamesFromNode(node.declarations[0]);
  case 'VariableDeclarator':
    return [
      ...getNamesFromNode(node.id),
      ...getNamesFromNode(node.init),
    ].filter(Boolean);
  default:
    return [];
  }
};

export default iterateJsdoc(({
  context,
  jsdoc,
  node,
  report,
  utils,
}) => {
  const {
    aliases = defaultAliases,
    uselessWords = defaultUselessWords,
  } = context.options[0] || {};
  const nodeNames = getNamesFromNode(node);

  const normalizeWord = (word) => {
    const wordLower = word.toLowerCase();

    return aliases[wordLower] ?? wordLower;
  };

  const splitTextIntoWords = (...names) => {
    return names.flatMap((name) => {
      return name
        .replace(/\W+/gu, ' ')
        .replace(/([a-z])([A-Z])/gu, '$1 $2')
        .trim()
        .split(' ');
    })
      .map(normalizeWord);
  };

  const descriptionIsRedundant = (text, extraName = '') => {
    if (!text) {
      return false;
    }

    const split = splitTextIntoWords(text);
    const words = new Set(split);

    for (const nameWord of splitTextIntoWords(...nodeNames, extraName)) {
      words.delete(nameWord);
    }

    for (const uselessWord of uselessWords) {
      words.delete(uselessWord);
    }

    return !words.size;
  };

  const {
    description,
    lastDescriptionLine,
  } = utils.getDescription();
  let descriptionReported = false;

  for (const tag of jsdoc.tags) {
    if (descriptionIsRedundant(tag.description, tag.name)) {
      utils.reportJSDoc(
        'This tag description only repeats the name it describes.',
        tag,
      );
    }

    descriptionReported ||= tag.description === description && tag.line === lastDescriptionLine;
  }

  if (!descriptionReported && descriptionIsRedundant(description)) {
    report('This description only repeats the name it describes.');
  }
}, {
  iterateAllJsdocs: true,
  meta: {
    docs: {
      description:
        'This rule reports doc comments that only restate their attached name.',
      url: 'https://github.com/gajus/eslint-plugin-jsdoc#informative-docs',
    },
    schema: [
      {
        additionalProperties: false,
        properties: {
          aliases: {
            items: {
              type: 'string',
            },
            type: 'array',
          },
          uselessWords: {
            items: {
              type: 'string',
            },
            type: 'array',
          },
        },
        type: 'object',
      },
    ],
    type: 'suggestion',
  },
});
