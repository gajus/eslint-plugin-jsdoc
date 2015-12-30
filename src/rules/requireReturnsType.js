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
        if (!jsdocTag.type) {
            report('Missing JSDoc @' + targetTagName + ' type.');
        }
    });
});
