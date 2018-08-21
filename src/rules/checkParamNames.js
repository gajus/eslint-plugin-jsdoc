import _ from 'lodash';
import iterateJsdoc from '../iterateJsdoc';
import { getFunctionParameterName } from '../jsdocUtils';

function getTreeItemByPath(tree : Array<Object>, path : string = '') {
  let currentTree = tree || [];
  const currentPath = [];
  let finalItem;
  const pathParts = path.split('.');
  pathParts.forEach((pathItem) => {
    currentPath.push(pathItem);
    for (let i = 0; i < currentTree.length; ++ i) {
      const item = currentTree[i];
      if (item.name === path) {
        finalItem = item;
      }
      if (item.name === currentPath.join('.')) {
        currentTree = item.children;
        break;
      }
    }
  });
  return finalItem;
}

function parsePathName(path : string) {
  const pathParts = path.split('.');
  const name = pathParts.pop();
  const basePath = pathParts.join('.');

  return { name, basePath };
}

// Function capable of parsing different AST items including function definitions and destructured objects
function getIterableNames(functionASTItem) {
  switch (functionASTItem.type) {
    case 'ArrowFunctionExpression':
    case 'FunctionDeclaration':
    case 'FunctionExpression':
      return functionASTItem.params;
    case 'ObjectPattern':
      return functionASTItem.properties;
    default:
      return [];
  }
}

const validateParameterNames = (targetTagName : string, report : Function) => {
  return function validateParameterNamesBound(functionNode: Object, nestedParams : Array<string>, pathPrefix : string) {
    const iterableParameters = getIterableNames(functionNode);
    iterableParameters.forEach((functionParameter, index) => {
      if (!nestedParams[index]) {
        // Doesn't seem to be the job of this rule
        // report(`@${targetTagName} "${functionParameterName}" does not have corresponding definition.`);
        return;
      }
      const jsdocParameterName = nestedParams[index].name;
      const jsdocParameterPath = jsdocParameterName;
      const functionParameterName = getFunctionParameterName(functionParameter);
      const functionParameterPath = pathPrefix ? `${pathPrefix}.${functionParameterName}` : functionParameterName;

      if (functionParameterName === '<ObjectPattern>') {
        validateParameterNamesBound(functionParameter, nestedParams[index].children, jsdocParameterPath);
        return;
      }

      if (functionParameterPath !== jsdocParameterPath) {
        report(`Expected @${targetTagName} name to be "${functionParameterPath}". Got "${jsdocParameterPath}".`, null, nestedParams[index]);
      }
    });
    if (nestedParams.length > iterableParameters.length) {
      for (let i = iterableParameters.length; i < nestedParams.length; i++) {
        report(`@${targetTagName} "${nestedParams[i].name}" does not match an existing function parameter.`, null, nestedParams[i]);
      }
    }
  };
};

const nestParametersWithValidation = (targetTagName : string, jsdocTags: Array<Object> = [], report : Function) => {
  const errorPrefix = `@${targetTagName} path declaration`;

  return jsdocTags.filter((item) => item.tag === targetTagName).reduce((acc, jsdocLine) => {
    const isPropertyPath = jsdocLine.name.includes('.');

    if (isPropertyPath) {
        const { basePath } = parsePathName(jsdocLine.name);
        const parent = getTreeItemByPath(acc, basePath);

        if (parent) {
          parent.children.push(Object.assign({}, jsdocLine, { children: [] }));
        } else {
          report(`${errorPrefix} "${jsdocLine.name}" requires previous definition of "${basePath}".`, null, jsdocLine);
        }
    } else {
      acc.push(Object.assign({}, jsdocLine, { children: [] }));
    }
    return acc;
  }, []);
};

export default iterateJsdoc(({
  functionNode,
  jsdoc,
  report,
  utils
}) => {
  const targetTagName = utils.getPreferredTagName('param');
  const nestedParams = nestParametersWithValidation(targetTagName, jsdoc.tags, report);
  validateParameterNames(targetTagName, report)(functionNode, nestedParams);
});
