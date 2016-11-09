import _ from 'lodash';
import iterateJsdoc from './../iterateJsdoc';

export default iterateJsdoc(({
    jsdoc,
    report,
    utils,
    context
}) => {
    _.forEach(jsdoc.tags, (jsdocTag) => {
        const extraTags = 'extra';
        const tag = jsdocTag.tag;
        let customTags = [];

        // if we support more options we either need to enforce the order or search all the options
        if (_.has(context.options, 0) && _.has(context.options[0], extraTags)) {
            customTags = context.options[0][extraTags];
        }

        if (utils.isValidTag(tag) || _.indexOf(customTags, tag) !== -1) {
            const preferredTagName = utils.getPreferredTagName(jsdocTag.tag);

            if (preferredTagName !== jsdocTag.tag) {
                report('Invalid JSDoc tag (preference). Replace "' + jsdocTag.tag + '" JSDoc tag with "' + preferredTagName + '".');
            }
        } else {
            report('Invalid JSDoc tag name "' + jsdocTag.tag + '".');
        }
    });
});
