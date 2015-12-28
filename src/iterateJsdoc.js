import commentParser from 'comment-parser';

export default (iterator) => {
    return (context) => {
        let checkJsdoc,
            sourceCode;

        sourceCode = context.getSourceCode();

        checkJsdoc = (functionNode) => {
            let jsdoc,
                jsdocNode;

            jsdocNode = sourceCode.getJSDocComment(functionNode);

            if (!jsdocNode) {
                return;
            }

            jsdoc = commentParser('/*' + jsdocNode.value + '*/')[0] || {};

            iterator(functionNode, jsdocNode, jsdoc, (message) => {
                context.report(jsdocNode, message);
            }, context);
        };

        return {
            ArrowFunctionExpression: checkJsdoc,
            FunctionDeclaration: checkJsdoc,
            FunctionExpression: checkJsdoc
        };
    };
};
