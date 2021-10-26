import {
  getJSDocComment,
} from '@es-joy/jsdoccomment';
import {
  traverse, parse as parseType, tryParse as tryParseType,
} from 'jsdoc-type-pratt-parser';
import _ from 'lodash';
import iterateJsdoc, {
  parseComment,
} from '../iterateJsdoc';
import jsdocUtils from '../jsdocUtils';

const extraTypes = [
  'null', 'undefined', 'void', 'string', 'boolean', 'object',
  'function', 'symbol',
  'number', 'bigint', 'NaN', 'Infinity',
  'any', '*',
  'this', 'true', 'false',
  'Array', 'Object', 'RegExp', 'Date', 'Function',
];

const stripPseudoTypes = (str) => {
  return str && str.replace(/(?:\.|<>|\.<>|\[\])$/u, '');
};

export default iterateJsdoc(({
  context,
  node,
  report,
  settings,
  sourceCode,
  utils,
}) => {
  const {scopeManager} = sourceCode;
  const {globalScope} = scopeManager;

  const {definedTypes = []} = context.options[0] || {};

  let definedPreferredTypes = [];
  const {preferredTypes, structuredTags, mode} = settings;
  if (Object.keys(preferredTypes).length) {
    definedPreferredTypes = Object.values(preferredTypes).map((preferredType) => {
      if (typeof preferredType === 'string') {
        // May become an empty string but will be filtered out below
        return stripPseudoTypes(preferredType);
      }

      if (!preferredType) {
        return undefined;
      }

      if (typeof preferredType !== 'object') {
        utils.reportSettings(
          'Invalid `settings.jsdoc.preferredTypes`. Values must be falsy, a string, or an object.',
        );
      }

      return stripPseudoTypes(preferredType.replacement);
    })
      .filter((preferredType) => {
        return preferredType;
      });
  }

  const typedefDeclarations = _(context.getAllComments())
    .filter((comment) => {
      return comment.value.startsWith('*');
    })
    .map((commentNode) => {
      return parseComment(commentNode, '');
    })
    .flatMap((doc) => {
      return doc.tags.filter(({tag}) => {
        return utils.isNamepathDefiningTag(tag);
      });
    })
    .map((tag) => {
      return tag.name;
    })
    .value();

  const ancestorNodes = [];
  let currentScope = scopeManager.acquire(node);

  while (currentScope && currentScope.block.type !== 'Program') {
    ancestorNodes.push(currentScope.block);
    currentScope = currentScope.upper;
  }

  // `currentScope` may be `null` or `Program`, so in such a case,
  //  we look to present tags instead
  let templateTags = ancestorNodes.length ?
    _(ancestorNodes).flatMap((ancestorNode) => {
      const commentNode = getJSDocComment(sourceCode, ancestorNode, settings);
      if (!commentNode) {
        return [];
      }

      const jsdoc = parseComment(commentNode, '');

      return jsdocUtils.filterTags(jsdoc.tags, (tag) => {
        return tag.tag === 'template';
      });
    })
      .value() :
    utils.getPresentTags('template');

  const classJsdoc = utils.getClassJsdoc();
  if (classJsdoc?.tags) {
    templateTags = templateTags.concat(
      classJsdoc.tags
        .filter(({tag}) => {
          return tag === 'template';
        }),
    );
  }

  const closureGenericTypes = _.flatMap(templateTags, (tag) => {
    return utils.parseClosureTemplateTag(tag);
  });

  // In modules, including Node, there is a global scope at top with the
  //  Program scope inside
  const cjsOrESMScope = globalScope.childScopes[0]?.block.type === 'Program';

  const allDefinedTypes = new Set(globalScope.variables.map(({name}) => {
    return name;
  })

    // If the file is a module, concat the variables from the module scope.
    .concat(
      cjsOrESMScope ?
        _.flatMap(globalScope.childScopes, ({variables}) => {
          return variables;
        }, []).map(({name}) => {
          return name;
        }) : [],
    )
    .concat(extraTypes)
    .concat(typedefDeclarations)
    .concat(definedTypes)
    .concat(definedPreferredTypes)
    .concat(settings.mode === 'jsdoc' ? [] : closureGenericTypes));

  const jsdocTagsWithPossibleType = utils.filterTags(({tag}) => {
    return utils.tagMightHaveTypePosition(tag);
  });

  for (const tag of jsdocTagsWithPossibleType) {
    let parsedType;

    try {
      parsedType = mode === 'permissive' ? tryParseType(tag.type) : parseType(tag.type, mode);
    } catch {
      // On syntax error, will be handled by valid-types.
      continue;
    }

    traverse(parsedType, ({type, value}) => {
      if (type === 'JsdocTypeName') {
        const structuredTypes = structuredTags[tag.tag]?.type;
        if (!allDefinedTypes.has(value) &&
          (!Array.isArray(structuredTypes) || !structuredTypes.includes(value))
        ) {
          report(`The type '${value}' is undefined.`, null, tag);
        } else if (!extraTypes.includes(value)) {
          context.markVariableAsUsed(value);
        }
      }
    });
  }
}, {
  iterateAllJsdocs: true,
  meta: {
    docs: {
      description: 'Checks that types in jsdoc comments are defined.',
      url: 'https://github.com/gajus/eslint-plugin-jsdoc#eslint-plugin-jsdoc-rules-no-undefined-types',
    },
    schema: [
      {
        additionalProperties: false,
        properties: {
          definedTypes: {
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
