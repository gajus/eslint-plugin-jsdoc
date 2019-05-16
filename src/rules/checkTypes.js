import {parse, traverse, publish} from 'jsdoctypeparser';
import iterateJsdoc from '../iterateJsdoc';

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
  'undefined',
  'null',
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
  const jsdocTags = jsdoc.tags.filter((tag) => {
    return targetTags.includes(tag.tag);
  });

  jsdocTags.forEach((jsdocTag) => {
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

      invalidTypes.forEach((invalidType) => {
        const fix = (fixer) => {
          return fixer.replaceText(jsdocNode, sourceCode.getText(jsdocNode).replace('{' + jsdocTag.type + '}', '{' + fixedType + '}'));
        };

        const name = jsdocTag.name ? ' "' + jsdocTag.name + '"' : '';

        report('Invalid JSDoc @' + jsdocTag.tag + name + ' type "' + invalidType + '".', fix, jsdocTag);
      });
    }
  });
});
