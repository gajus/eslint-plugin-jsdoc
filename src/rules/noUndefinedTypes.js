import _ from 'lodash';
import {parse as parseType, traverse} from 'jsdoctypeparser';
import iterateJsdoc, {parseComment} from '../iterateJsdoc';

const extraTypes = ['string', 'number', 'boolean', 'any', '*'];

export default iterateJsdoc(({
  context,
  jsdoc,
  report,
  sourceCode
}) => {
  const scopeManager = sourceCode.scopeManager;
  const globalScope = scopeManager.isModule() ? scopeManager.globalScope.childScopes[0] : scopeManager.globalScope;

  const typedefDeclarations = _(context.getAllComments())
    .filter((comment) => {
      return _.startsWith(comment.value, '*');
    })
    .map(parseComment)
    .flatMap((doc) => {
      return doc.tags.filter((tag) => {
        return tag.tag === 'typedef';
      });
    })
    .map((tag) => {
      return tag.name;
    })
    .value();

  const definedTypes = globalScope.variables.map((variable) => {
    return variable.name;
  })
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
          report('The type \'' + node.name + '\' is undefined.');
        } else if (!_.includes(extraTypes, node.name)) {
          context.markVariableAsUsed(node.name);
        }
      }
    });
  });
});
