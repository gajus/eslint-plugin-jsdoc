import _ from 'lodash';
import {parse as parseType, traverse} from 'jsdoctypeparser';
import iterateJsdoc, {parseComment} from '../iterateJsdoc';

const extraTypes = [
  'null', 'undefined', 'string', 'boolean',
  'number', 'NaN', 'Infinity',
  'any', '*',
  'Array', 'Object', 'RegExp', 'Date', 'Function'
];

export default iterateJsdoc(({
  context,
  report,
  sourceCode,
  utils
}) => {
  const {scopeManager} = sourceCode;
  const {globalScope} = scopeManager;

  const {preferredTypesDefined, definedTypes = []} = context.options[0] || {};

  let definedPreferredTypes = [];
  if (preferredTypesDefined) {
    const preferredTypes = _.get(context, 'settings.jsdoc.preferredTypes');
    if (preferredTypes) {
      // Replace `_.values` with `Object.values` when we may start requiring Node 7+
      definedPreferredTypes = _.values(preferredTypes).map((preferredType) => {
        if (typeof preferredType === 'string') {
          return preferredType;
        }
        if (!preferredType || typeof preferredType !== 'object') {
          return undefined;
        }

        return preferredType.replacement;
      }).filter((preferredType) => {
        return preferredType;
      });
    }
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

  const allDefinedTypes = globalScope.variables.map((variable) => {
    return variable.name;
  })

    // If the file is a module, concat the variables from the module scope.
    .concat(

      // This covers `commonjs` as well as `node`
      scopeManager.__options.nodejsScope ||
      scopeManager.isModule() ?
        globalScope.childScopes.reduce((arr, {variables}) => {
          // Flatten
          arr.push(...variables);

          return arr;
        }, []).map(({name}) => {
          return name;
        }) : []
    )
    .concat(extraTypes)
    .concat(typedefDeclarations)
    .concat(definedTypes)
    .concat(definedPreferredTypes);

  const jsdocTags = utils.filterTags((tag) => {
    return utils.isTagWithType(tag.tag);
  });

  jsdocTags.forEach((tag) => {
    let parsedType;

    try {
      parsedType = parseType(tag.type);
    } catch (error) {
      // On syntax error, will be handled by valid-types.
      return;
    }

    traverse(parsedType, ({type, name}) => {
      if (type === 'NAME') {
        if (!allDefinedTypes.includes(name)) {
          report('The type \'' + name + '\' is undefined.', null, tag);
        } else if (!_.includes(extraTypes, name)) {
          context.markVariableAsUsed(name);
        }
      }
    });
  });
}, {
  meta: {
    type: 'suggestion'
  }
});
