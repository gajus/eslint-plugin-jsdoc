import _ from 'lodash';
import jsdocUtils from './../jsdocUtils';
import iterateJsdoc from './../iterateJsdoc';

export default iterateJsdoc((functionNode, jsdocNode, jsdoc, report) => {
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
