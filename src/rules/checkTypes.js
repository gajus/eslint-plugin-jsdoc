import _ from 'lodash';
import {parse, traverse, publish} from 'jsdoctypeparser';
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
    const invalidTypes = [];
    let typeAst;

    try {
      typeAst = parse(jsdocTag.type);
    } catch (error) {
      return;
    }

    traverse(typeAst, (node) => {
      if (node.type === 'NAME') {
        for (const strictNativeType of strictNativeTypes) {
          if (strictNativeType.toLowerCase() === node.name.toLowerCase() && strictNativeType !== node.name) {
            invalidTypes.push(node.name);
            node.name = strictNativeType;
          }
        }
      }
    });

    if (invalidTypes) {
      const fixedType = publish(typeAst);

      _.forEach(invalidTypes, (invalidType) => {
        const fix = (fixer) => {
          return fixer.replaceText(jsdocNode, sourceCode.getText(jsdocNode).replace('{' + jsdocTag.type + '}', '{' + fixedType + '}'));
        };

        report('Invalid JSDoc @' + jsdocTag.tag + ' "' + jsdocTag.name + '" type "' + invalidType + '".', fix);
      });
    }
  });
});
