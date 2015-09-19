import reportValidateSourceCode from './../reportValidateSourceCode';

export default (context) => {
    // let options;
    // options = context.options[0] || {};

    reportValidateSourceCode(context, 'requireParamDescription', true);

    return {};
};
