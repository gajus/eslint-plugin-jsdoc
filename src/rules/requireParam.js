import reportValidateSourceCode from './../reportValidateSourceCode';

export default (context) => {
    reportValidateSourceCode(context, 'checkParamExistence', true);

    return {};
};
