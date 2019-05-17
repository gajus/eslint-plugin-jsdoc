import {parse, traverse, publish} from 'jsdoctypeparser';
import iterateJsdoc from '../iterateJsdoc';

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
  jsdocNode,
  sourceCode,
  report,
  utils
}) => {
  const jsdocTags = utils.filterTags((tag) => {
    return utils.isTagWithType(tag.tag);
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
