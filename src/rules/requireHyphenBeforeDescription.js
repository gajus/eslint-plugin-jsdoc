import _ from 'lodash';
import iterateJsdoc from './../iterateJsdoc';

export default iterateJsdoc(({
    jsdoc,
    report
}) => {
    let jsdocTags;

    jsdocTags = _.filter(jsdoc.tags, {
        tag: 'param'
    });

    _.forEach(jsdocTags, (jsdocTag) => {
        if (jsdocTag.description && !_.startsWith(jsdocTag.description, '-')) {
            report('There must be a hyphen before @param description.');
        }
    });
});
