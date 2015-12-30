import _ from 'lodash';
import commentParser from 'comment-parser';
import jsdocUtils from './jsdocUtils';

let curryUtils;

curryUtils = (functionNode, jsdoc, tagNamePreference) => {
    let utils;

    utils = {};

    utils.getFunctionParameterNames = () => {
        return jsdocUtils.getFunctionParameterNames(functionNode);
    };

    utils.getJsdocParameterNamesDeep = () => {
        return jsdocUtils.getJsdocParameterNamesDeep(jsdoc, utils.getPreferredTagName('param'));
    };

    utils.getJsdocParameterNames = () => {
        return jsdocUtils.getJsdocParameterNames(jsdoc, utils.getPreferredTagName('param'));
    };

    utils.getPreferredTagName = (name) => {
        return jsdocUtils.getPreferredTagName(name, tagNamePreference);
    };

    utils.isValidTag = (name) => {
        return jsdocUtils.isValidTag(name);
    };

    return utils;
};

export default (iterator) => {
    return (context) => {
        let checkJsdoc,
            sourceCode,
            tagNamePreference;

        sourceCode = context.getSourceCode();

        tagNamePreference = _.get(context, 'settings.jsdoc.tagNamePreference') || {};

        checkJsdoc = (functionNode) => {
            let jsdoc,
                jsdocNode,
                report,
                utils;

            jsdocNode = sourceCode.getJSDocComment(functionNode);

            if (!jsdocNode) {
                return;
            }

            jsdoc = commentParser('/*' + jsdocNode.value + '*/')[0] || {};

            report = (message) => {
                context.report(jsdocNode, message);
            };

            utils = curryUtils(functionNode, jsdoc, tagNamePreference);

            iterator({
                context,
                functionNode,
                jsdoc,
                jsdocNode,
                report,
                utils
            });
        };

        return {
            ArrowFunctionExpression: checkJsdoc,
            FunctionDeclaration: checkJsdoc,
            FunctionExpression: checkJsdoc
        };
    };
};
