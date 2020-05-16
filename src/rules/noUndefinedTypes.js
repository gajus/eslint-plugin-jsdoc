import _ from 'lodash';
import {parse as parseType, traverse} from 'jsdoctypeparser';
import iterateJsdoc, {parseComment} from '../iterateJsdoc';
import jsdocUtils from '../jsdocUtils';

const extraTypes = [
  'null', 'undefined', 'void', 'string', 'boolean', 'object',
  'function', 'symbol',
  'number', 'bigint', 'NaN', 'Infinity',
  'any', '*',
  'Array', 'Object', 'RegExp', 'Date', 'Function',
];

const stripPseudoTypes = (str) => {
  return str && str.replace(/(?:\.|<>|\.<>|\[\])$/u, '');
};

export default iterateJsdoc(({
  context,
  report,
  settings,
  sourceCode: {scopeManager},
  utils,
}) => {
  const {globalScope} = scopeManager;

  const {definedTypes = []} = context.options[0] || {};

  let definedPreferredTypes = [];
  const {preferredTypes} = settings;
  if (Object.keys(preferredTypes).length) {
    // Replace `_.values` with `Object.values` when we may start requiring Node 7+
    definedPreferredTypes = _.values(preferredTypes).map((preferredType) => {
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
    }).filter((preferredType) => {
      return preferredType;
    });
  }

  const typedefDeclarations = _(context.getAllComments())
    .filter((comment) => {
      return comment.value.startsWith('*');
    })
    .map(parseComment)
    .flatMap((doc) => {
      return (doc.tags || []).filter(({tag}) => {
        return utils.isNamepathDefiningTag(tag);
      });
    })
    .map((tag) => {
      return tag.name;
    })
    .value();

  let templateTags = utils.getPresentTags('template');
  const classJsdoc = utils.getClassJsdoc();
  if (classJsdoc && classJsdoc.tags) {
    templateTags = templateTags.concat(
      classJsdoc.tags
        .filter((tag) => {
          return tag.tag === 'template';
        }),
    );
  }

  const closureGenericTypes = _.flatMap(templateTags, (tag) => {
    return jsdocUtils.parseClosureTemplateTag(tag);
  });

  const allDefinedTypes = new Set(globalScope.variables.map((variable) => {
    return variable.name;
  })

    // If the file is a module, concat the variables from the module scope.
    .concat(

      // This covers `commonjs` as well as `node`
      scopeManager.__options.nodejsScope ||
      scopeManager.isModule() ?
        _.flatMap(globalScope.childScopes, ({variables}) => {
          // Flatten
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

  const jsdocTagsWithPossibleType = utils.filterTags((tag) => {
    return utils.tagMightHaveTypePosition(tag.tag);
  });

  jsdocTagsWithPossibleType.forEach((tag) => {
    let parsedType;

    try {
      parsedType = parseType(tag.type);
    } catch {
      // On syntax error, will be handled by valid-types.
      return;
    }

    traverse(parsedType, ({type, name}) => {
      if (type === 'NAME') {
        if (!allDefinedTypes.has(name)) {
          report(`The type '${name}' is undefined.`, null, tag);
        } else if (!_.includes(extraTypes, name)) {
          context.markVariableAsUsed(name);
        }
      }
    });
  });
}, {
  iterateAllJsdocs: true,
  meta: {
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
