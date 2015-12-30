import _ from 'lodash';
import iterateJsdoc from './../iterateJsdoc';

export default iterateJsdoc((functionNode, jsdocNode, jsdoc, report) => {
    let jsdocTags;

    jsdocTags = _.filter(jsdoc.tags, tag => /^returns?$/.test(tag.tag));

    _.forEach(jsdocTags, (jsdocTag) => {
        let description;

        // @see https://github.com/yavorskiy/comment-parser/issues/21
        description = jsdocTag.name || jsdocTag.description;

        if (!description) {
            report('Missing JSDoc @returns description.');
        }
    });
});
