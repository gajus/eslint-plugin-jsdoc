import _ from 'lodash';
import jsdocUtils from './../jsdocUtils';
import iterateJsdoc from './../iterateJsdoc';

let extractParagraphs,
    validateDescription,
    isNewLinePrecededByAPeriod;

extractParagraphs = (text) => {
    return text.split(/\n\n/);
};

isNewLinePrecededByAPeriod = (text) => {
    let lines,
        lastLineEndsSentence;

    lines = text.split('\n');

    return !_.some(lines, (line) => {
        if (_.isBoolean(lastLineEndsSentence) && !lastLineEndsSentence && /^[A-Z]/.test(line)) {
            return true;
        }

        lastLineEndsSentence = /\.$/.test(line);
    });
};

validateDescription = (description, report) => {
    let isError,
        paragraphs;

    if (!description) {
        return true;
    }

    paragraphs = extractParagraphs(description);

    return _.some(paragraphs, (paragraph, i) => {
        if (!/^[A-Z]/.test(paragraph)) {
            if (i === 0) {
                report('Description must start with an uppercase character.');
            } else {
                report('Paragraph must start with an uppercase character.');
            }

            return true;
        }

        if (!/\.$/.test(paragraph)) {
            report('Sentence must end with a period.');

            return true;
        }

        if (!isNewLinePrecededByAPeriod(paragraph)) {
            report('A line of text is started with an uppercase character, but preceding line does not end the sentence.');

            return true;
        }
    });
};

export default iterateJsdoc((functionNode, jsdocNode, jsdoc, report) => {
    validateDescription(jsdoc.description, report);
});
