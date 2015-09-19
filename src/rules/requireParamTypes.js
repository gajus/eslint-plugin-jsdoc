import reportValidateSourceCode from './../reportValidateSourceCode';

export default (context) => {
    reportValidateSourceCode(context, 'requireParamTypes', true);

    return {};
};
