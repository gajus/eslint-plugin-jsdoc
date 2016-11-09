'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _includes2 = require('lodash/includes');

var _includes3 = _interopRequireDefault(_includes2);

var _get2 = require('lodash/get');

var _get3 = _interopRequireDefault(_get2);

var _commentParser = require('comment-parser');

var _commentParser2 = _interopRequireDefault(_commentParser);

var _jsdocUtils = require('./jsdocUtils');

var _jsdocUtils2 = _interopRequireDefault(_jsdocUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var curryUtils = function curryUtils(functionNode, jsdoc, tagNamePreference) {
    var utils = {};

    utils.getFunctionParameterNames = function () {
        return _jsdocUtils2.default.getFunctionParameterNames(functionNode);
    };

    utils.getJsdocParameterNamesDeep = function () {
        return _jsdocUtils2.default.getJsdocParameterNamesDeep(jsdoc, utils.getPreferredTagName('param'));
    };

    utils.getJsdocParameterNames = function () {
        return _jsdocUtils2.default.getJsdocParameterNames(jsdoc, utils.getPreferredTagName('param'));
    };

    utils.getPreferredTagName = function (name) {
        return _jsdocUtils2.default.getPreferredTagName(name, tagNamePreference);
    };

    utils.isValidTag = function (name) {
        return _jsdocUtils2.default.isValidTag(name);
    };

    return utils;
};

exports.default = function (iterator) {
    return function (context) {
        var sourceCode = context.getSourceCode();
        var tagNamePreference = (0, _get3.default)(context, 'settings.jsdoc.tagNamePreference') || {};

        var checkJsdoc = function checkJsdoc(functionNode) {
            var jsdocNode = sourceCode.getJSDocComment(functionNode);

            if (!jsdocNode) {
                return;
            }

            var jsdoc = (0, _commentParser2.default)('/*' + jsdocNode.value + '*/', {
                // @see https://github.com/yavorskiy/comment-parser/issues/21
                parsers: [_commentParser2.default.PARSERS.parse_tag, _commentParser2.default.PARSERS.parse_type, function (str, data) {
                    if ((0, _includes3.default)(['return', 'returns'], data.tag)) {
                        return null;
                    }
                    return _commentParser2.default.PARSERS.parse_name(str, data);
                }, _commentParser2.default.PARSERS.parse_description]
            })[0] || {};

            var report = function report(message) {
                context.report(jsdocNode, message);
            };

            var utils = curryUtils(functionNode, jsdoc, tagNamePreference);

            iterator({
                context: context,
                functionNode: functionNode,
                jsdoc: jsdoc,
                jsdocNode: jsdocNode,
                report: report,
                utils: utils
            });
        };

        return {
            ArrowFunctionExpression: checkJsdoc,
            FunctionDeclaration: checkJsdoc,
            FunctionExpression: checkJsdoc
        };
    };
};

module.exports = exports['default'];
//# sourceMappingURL=iterateJsdoc.js.map
