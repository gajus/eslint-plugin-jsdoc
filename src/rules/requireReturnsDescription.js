import reportValidateSourceCode from './../reportValidateSourceCode';

export default (context) => {
    reportValidateSourceCode(context, 'requireReturnDescription', true, (message) => {
        if (message === 'Missing return description') {
            return '@returns must have a description.';
        }

        throw new Error('Unexpected error message.');
    });

    return {};
};
