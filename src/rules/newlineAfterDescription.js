import reportValidateSourceCode from './../reportValidateSourceCode';

let schema;

schema = {
    enum: [
        'always',
        'never'
    ]
};

export default (context) => {
    let options;

    options = context.options[0];

    if (options == 'always') {
        reportValidateSourceCode(context, 'requireNewlineAfterDescription', true);
    } else {
        reportValidateSourceCode(context, 'disallowNewlineAfterDescription', true);
    }

    return {};
};

export {
    schema
};
