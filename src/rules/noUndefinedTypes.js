import _ from 'lodash';
import {parse as parseType, traverse} from 'jsdoctypeparser';
import iterateJsdoc, {parseComment} from '../iterateJsdoc';

const extraTypes = [
  'null', 'undefined', 'string', 'number', 'boolean', 'any', '*',
  'Array', 'Object', 'RegExp', 'Date', 'Function'
];
const tagsWithNames = [
  'callback',
  'class', 'constructor',
  'constant', 'const',
  'event',
  'external', 'host',
  'function', 'func', 'method',
  'interface',
  'member', 'var',
  'mixin',
  'name',
  'namespace',
  'type',
  'typedef'
];

export default iterateJsdoc(({
  context,
  jsdoc,
  report,
  sourceCode
}) => {
  const scopeManager = sourceCode.scopeManager;
  const globalScope = scopeManager.globalScope;

  const typedefDeclarations = _(context.getAllComments())
    .filter((comment) => {
      return _.startsWith(comment.value, '*');
    })
    .map(parseComment)
    .flatMap((doc) => {
      return (doc.tags || []).filter((tag) => {
        return _.includes(tagsWithNames, tag.tag);
      });
    })
    .map((tag) => {
      return tag.name;
    })
    .value();

  const definedTypes = globalScope.variables.map((variable) => {
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
    .concat(typedefDeclarations);

  _.forEach(jsdoc.tags, (tag) => {
    let parsedType;

    try {
      parsedType = parseType(tag.type);
    } catch (error) {
      // On syntax error, will be handled by valid-types.
      return;
    }

    traverse(parsedType, (node) => {
      if (node.type === 'NAME') {
        if (!_.includes(definedTypes, node.name)) {
          report('The type \'' + node.name + '\' is undefined.', null, tag);
        } else if (!_.includes(extraTypes, node.name)) {
          context.markVariableAsUsed(node.name);
        }
      }
    });
  });
});
