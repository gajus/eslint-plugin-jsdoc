'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _includes2 = require('lodash/includes');

var _includes3 = _interopRequireDefault(_includes2);

var _some2 = require('lodash/some');

var _some3 = _interopRequireDefault(_some2);

var _iterateJsdoc = require('./../iterateJsdoc');

var _iterateJsdoc2 = _interopRequireDefault(_iterateJsdoc);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var validateParameterNames = function validateParameterNames(targetTagName, functionParameterNames, jsdocParameterNames, report) {
    return (0, _some3.default)(jsdocParameterNames, function (jsdocParameterName, index) {
        var functionParameterName = functionParameterNames[index];

        if (!functionParameterName) {
            report('@' + targetTagName + ' "' + jsdocParameterName + '" does not match an existing function parameter.');

            return true;
        }

        if (functionParameterName === '<ObjectPattern>') {
            return;
        }

        if (functionParameterName !== jsdocParameterName) {
            report('Expected @' + targetTagName + ' names to be "' + functionParameterNames.join(', ') + '". Got "' + jsdocParameterNames.join(', ') + '".');

            return true;
        }

        return false;
    });
};

var validateParameterNamesDeep = function validateParameterNamesDeep(targetTagName, jsdocParameterNames, report) {
    var lastRealParameter = void 0;

    return (0, _some3.default)(jsdocParameterNames, function (jsdocParameterName) {
        var isPropertyPath = (0, _includes3.default)(jsdocParameterName, '.');

        if (isPropertyPath) {
            if (!lastRealParameter) {
                report('@' + targetTagName + ' path declaration ("' + jsdocParameterName + '") appears before any real parameter.');

                return true;
            }

            var pathRootNodeName = jsdocParameterName.slice(0, jsdocParameterName.indexOf('.'));

            if (pathRootNodeName !== lastRealParameter) {
                report('@' + targetTagName + ' path declaration ("' + jsdocParameterName + '") root node name ("' + pathRootNodeName + '") does not match previous real parameter name ("' + lastRealParameter + '").');

                return true;
            }
        } else {
            lastRealParameter = jsdocParameterName;
        }

        return false;
    });
};

exports.default = (0, _iterateJsdoc2.default)(function (_ref) {
    var report = _ref.report;
    var utils = _ref.utils;

    var functionParameterNames = utils.getFunctionParameterNames();
    var jsdocParameterNames = utils.getJsdocParameterNames();
    var jsdocParameterNamesDeep = utils.getJsdocParameterNamesDeep();
    var targetTagName = utils.getPreferredTagName('param');
    var isError = validateParameterNames(targetTagName, functionParameterNames, jsdocParameterNames, report);

    if (isError) {
        return;
    }

    validateParameterNamesDeep(targetTagName, jsdocParameterNamesDeep, report);
});
module.exports = exports['default'];
//# sourceMappingURL=checkParamNames.js.map
