import commentParser from 'comment-parser';

export default (iterator) => {
    return (context) => {
        let checkJsdoc,
            sourceCode;

        sourceCode = context.getSourceCode();

        checkJsdoc = (functionNode) => {
            let jsdocNode,
                jsdoc;

            jsdocNode = sourceCode.getJSDocComment(functionNode);
            jsdoc = commentParser('/*' + jsdocNode.value + '*/')[0] || {};

            iterator(functionNode, jsdocNode, jsdoc, (message) => {
                context.report(jsdocNode, message);
            }, context);
        };

        return {
            'FunctionDeclaration': checkJsdoc,
            'FunctionExpression': checkJsdoc
        }
    }
};
