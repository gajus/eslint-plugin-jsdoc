import _ from 'lodash';
import iterateJsdoc from './../iterateJsdoc';

let targetTags,
    strictNativeTypes;

targetTags = [
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

strictNativeTypes = [
    'boolean',
    'number',
    'string',
    'Array',
    'Object',
    'RegExp',
    'Date',
    'Function'
];

export default iterateJsdoc((functionNode, jsdocNode, jsdoc, report) => {
    let jsdocTags;

    jsdocTags = _.filter(jsdoc.tags, (tag) => {
        return _.includes(targetTags, tag.tag)
    });

    _.forEach(jsdocTags, (jsdocTag) => {
        _.some(strictNativeTypes, (strictNativeType) => {
            if (strictNativeType.toLowerCase() === jsdocTag.type.toLowerCase() && strictNativeType !== jsdocTag.type) {
                report('Invalid JSDoc @' + jsdocTag.tag + ' "' + jsdocTag.name + '" type "' + jsdocTag.type + '".');

                return true;
            }
        });
    });
});
