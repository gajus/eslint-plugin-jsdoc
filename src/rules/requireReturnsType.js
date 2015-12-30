import _ from 'lodash';
import iterateJsdoc from './../iterateJsdoc';

export default iterateJsdoc((functionNode, jsdocNode, jsdoc, report) => {
    let jsdocTags;

    jsdocTags = _.filter(jsdoc.tags, tag => /^returns?$/.test(tag.tag));

    _.forEach(jsdocTags, (jsdocTag) => {
        if (!jsdocTag.type) {
            report('Missing JSDoc @returns type.');
        }
    });
});
