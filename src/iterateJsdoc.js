import _ from 'lodash';
import commentParser from 'comment-parser';
import jsdocUtils from './jsdocUtils';

const curryUtils = (functionNode, jsdoc, tagNamePreference) => {
    const utils = {};

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
    
    utils.hasTag = (name) => {
        return jsdocUtils.hasTag(jsdoc, name);
    };

    return utils;
};

export default (iterator) => {
    return (context) => {
        const sourceCode = context.getSourceCode();
        const tagNamePreference = _.get(context, 'settings.jsdoc.tagNamePreference') || {};

        const checkJsdoc = (functionNode) => {
            const jsdocNode = sourceCode.getJSDocComment(functionNode);

            if (!jsdocNode) {
                return;
            }

            const jsdoc = commentParser('/*' + jsdocNode.value + '*/', {
                // @see https://github.com/yavorskiy/comment-parser/issues/21
                parsers: [
                    commentParser.PARSERS.parse_tag,
                    commentParser.PARSERS.parse_type,
                    (str, data) => {
                        if (_.includes(['return', 'returns'], data.tag)) {
                            return null;
                        }
                        return commentParser.PARSERS.parse_name(str, data);
                    },
                    commentParser.PARSERS.parse_description
                ]
            })[0] || {};

            const report = (message) => {
                context.report(jsdocNode, message);
            };

            const utils = curryUtils(functionNode, jsdoc, tagNamePreference);

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
