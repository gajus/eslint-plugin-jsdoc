import {
  parse as parseType,
  traverse,
  tryParse as tryParseType,
} from '@es-joy/jsdoccomment';
import iterateJsdoc from '../iterateJsdoc.js';

export default iterateJsdoc(({
  context,
  utils,
  node,
  settings,
  report,
}) => {
  const {
    requireSeparateTemplates = false,
  } = context.options[0] || {};

  const {
    mode
  } = settings;

  const usedNames = new Set();
  const templateTags = utils.getTags('template');
  const templateNames = templateTags.flatMap(({name}) => {
    return name.split(/,\s*/);
  });

  for (const tag of templateTags) {
    const {name} = tag;
    const names = name.split(/,\s*/);
    if (requireSeparateTemplates && names.length > 1) {
      report(`Missing separate @template for ${names[1]}`, null, tag);
    }
  }

  /**
   * @param {import('@typescript-eslint/types').TSESTree.TSTypeAliasDeclaration} aliasDeclaration
   */
  const checkParameters = (aliasDeclaration) => {
    /* c8 ignore next -- Guard */
    const {params} = aliasDeclaration.typeParameters ?? {params: []};
    for (const {name: {name}} of params) {
      usedNames.add(name);
    }
    for (const usedName of usedNames) {
      if (!templateNames.includes(usedName)) {
        report(`Missing @template ${usedName}`);
      }
    }
  };

  const handleTypeAliases = () => {
    const nde = /** @type {import('@typescript-eslint/types').TSESTree.Node} */ (
      node
    );
    if (!nde) {
      return;
    }
    switch (nde.type) {
    case 'ExportNamedDeclaration':
      if (nde.declaration?.type === 'TSTypeAliasDeclaration') {
        checkParameters(nde.declaration);
      }
      break;
    case 'TSTypeAliasDeclaration':
      checkParameters(nde);
      break;
    }
  };

  const typedefTags = utils.getTags('typedef');
  if (!typedefTags.length || typedefTags.length >= 2) {
    handleTypeAliases();
    return;
  }

  const potentialType = typedefTags[0].type;
  const parsedType = mode === 'permissive' ?
    tryParseType(/** @type {string} */ (potentialType)) :
    parseType(/** @type {string} */ (potentialType), mode)

  traverse(parsedType, (nde) => {
    const {
      type,
      value,
    } = /** @type {import('jsdoc-type-pratt-parser').NameResult} */ (nde);
    if (type === 'JsdocTypeName' && (/^[A-Z]$/).test(value)) {
      usedNames.add(value);
    }
  });

  // Could check against whitelist/blacklist
  for (const usedName of usedNames) {
    if (!templateNames.includes(usedName)) {
      report(`Missing @template ${usedName}`, null, typedefTags[0]);
    }
  }
}, {
  iterateAllJsdocs: true,
  meta: {
    docs: {
      description: 'Requires template tags for each generic type parameter',
      url: 'https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/require-template.md#repos-sticky-header',
    },
    schema: [
      {
        additionalProperties: false,
        properties: {
          requireSeparateTemplates: {
            type: 'boolean'
          }
        },
        type: 'object',
      },
    ],
    type: 'suggestion',
  },
});
