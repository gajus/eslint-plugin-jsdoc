import reportValidateSourceCode from './../reportValidateSourceCode';

export default (context) => {
    reportValidateSourceCode(context, 'checkRedundantParams', true);

    return {};
};
