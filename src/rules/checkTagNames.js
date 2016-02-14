import _ from 'lodash';
import iterateJsdoc from './../iterateJsdoc';

export default iterateJsdoc(({
    jsdoc,
    report,
    utils
}) => {
    _.forEach(jsdoc.tags, (jsdocTag) => {
        if (utils.isValidTag(jsdocTag.tag)) {
            const preferredTagName = utils.getPreferredTagName(jsdocTag.tag);

            if (preferredTagName !== jsdocTag.tag) {
                report('Invalid JSDoc tag (preference). Replace "' + jsdocTag.tag + '" JSDoc tag with "' + preferredTagName + '".');
            }
        } else {
            report('Invalid JSDoc tag name "' + jsdocTag.tag + '".');
        }
    });
});
