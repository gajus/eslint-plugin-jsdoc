import reportValidateSourceCode from './../reportValidateSourceCode';

export default (context) => {
    reportValidateSourceCode(context, 'checkRedundantReturns', true);

    return {};
};
