import reportValidateSourceCode from './../reportValidateSourceCode';

export default (context) => {
    reportValidateSourceCode(context, 'requireDescriptionCompleteSentence', true, (message) => {
        // @see https://github.com/jscs-dev/jscs-jsdoc/issues/166

        if (message === 'You started a new line with an upper case letter but previous line does not end with a period') {
            message += '.';
        }

        if (message === 'Sentence must end with a period') {
            message += '.';
        }

        if (message === 'Description must start with an upper case letter') {
            message += '.';
        }

        return message;
    });

    return {};
};
