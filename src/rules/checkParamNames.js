import reportValidateSourceCode from './../reportValidateSourceCode';

export default (context) => {
    reportValidateSourceCode(context, 'checkParamNames', true);

    return {};
};
