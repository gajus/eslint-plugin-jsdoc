import _ from 'lodash';
import iterateJsdoc from './../iterateJsdoc';

let targetTags = [
  'class',
  'constant',
  'enum',
  'member',
  'module',
  'namespace',
  'param',
  'property',
  'returns',
  'throws',
  'type',
  'typedef'
];

const targetTagAliases = [
  'constructor',
  'const',
  'var',
  'arg',
  'argument',
  'prop',
  'return',
  'exception'
];

targetTags = targetTags.concat(targetTagAliases);

const strictNativeTypes = [
  'boolean',
  'number',
  'string',
  'Array',
  'Object',
  'RegExp',
  'Date',
  'Function'
];

export default iterateJsdoc(({
  jsdoc,
  jsdocNode,
  sourceCode,
  report
}) => {
  const jsdocTags = _.filter(jsdoc.tags, (tag) => {
    return _.includes(targetTags, tag.tag);
  });

  _.forEach(jsdocTags, (jsdocTag) => {
    _.some(strictNativeTypes, (strictNativeType) => {
      if (strictNativeType.toLowerCase() === jsdocTag.type.toLowerCase() && strictNativeType !== jsdocTag.type) {
        report('Invalid JSDoc @' + jsdocTag.tag + ' "' + jsdocTag.name + '" type "' + jsdocTag.type + '".', (fixer) => {
          return fixer.replaceText(jsdocNode, sourceCode.getText(jsdocNode).replace('{' + jsdocTag.type + '}', '{' + strictNativeType + '}'));
        });

        return true;
      }

      return false;
    });
  });
});
