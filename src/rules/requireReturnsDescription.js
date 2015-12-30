import _ from 'lodash';
import iterateJsdoc from './../iterateJsdoc';

export default iterateJsdoc(({
    jsdoc,
    report,
    utils
}) => {
    let jsdocTags,
        targetTagName;

    targetTagName = utils.getPreferredTagName('returns');

    jsdocTags = _.filter(jsdoc.tags, {
        tag: targetTagName
    });

    _.forEach(jsdocTags, (jsdocTag) => {
        let description;

        // @see https://github.com/yavorskiy/comment-parser/issues/21
        description = jsdocTag.name || jsdocTag.description;

        if (!description) {
            report('Missing JSDoc @' + targetTagName + ' description.');
        }
    });
});
