import reportValidateSourceCode from './../reportValidateSourceCode';

export default (context) => {
    reportValidateSourceCode(context, 'checkTypes', 'strictNativeCase');

    return {};
};
