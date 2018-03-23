import _ from 'lodash';
import {parse as parseType, traverse} from 'jsdoctypeparser';
import iterateJsdoc from '../iterateJsdoc';

const extraTypes = ['string', 'number', 'boolean', 'any'];

export default iterateJsdoc(({
  context,
  jsdoc,
  report,
  sourceCode
}) => {
  const scopeManager = sourceCode.scopeManager;
  const globalScope = scopeManager.isModule() ? scopeManager.globalScope.childScopes[0] : scopeManager.globalScope;
  const definedTypes = globalScope.variables.map((variable) => {
    return variable.name;
  }).concat(extraTypes);

  _.forEach(jsdoc.tags, (tag) => {
    const parsedType = parseType(tag.type);

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
