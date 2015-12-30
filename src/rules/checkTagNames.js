import _ from 'lodash';
import iterateJsdoc from './../iterateJsdoc';

let validTags;

validTags = [
    'abstract',
    'access',
    'alias',
    'augments',
    'author',
    'borrows',
    'callback',
    'class',
    'classdesc',
    'constant',
    'constructs',
    'copyright',
    'default',
    'deprecated',
    'description',
    'enum',
    'event',
    'example',
    'exports',
    'external',
    'file',
    'fires',
    'func',
    'function',
    'global',
    'ignore',
    'implements',
    'inheritdoc',
    'inner',
    'instance',
    'interface',
    'kind',
    'lends',
    'license',
    'listens',
    'member',
    'memberof',
    'method',
    'mixes',
    'mixin',
    'module',
    'name',
    'namespace',
    'override',
    'param',
    'private',
    'property',
    'protected',
    'public',
    'readonly',
    'requires',
    'return',
    'returns',
    'see',
    'since',
    'static',
    'summary',
    'this',
    'throws',
    'todo',
    'tutorial',
    'type',
    'typedef',
    'variation',
    'version'
];

export default iterateJsdoc((functionNode, jsdocNode, jsdoc, report) => {
    _.forEach(jsdoc.tags, (jsdocTag) => {
        if (!_.includes(validTags, jsdocTag.tag)) {
            report('Invalid JSDoc tag name "' + jsdocTag.tag + '".');
        }
    });
});
