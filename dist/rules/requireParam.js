'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _some2 = require('lodash/some');

var _some3 = _interopRequireDefault(_some2);

var _iterateJsdoc = require('./../iterateJsdoc');

var _iterateJsdoc2 = _interopRequireDefault(_iterateJsdoc);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _iterateJsdoc2.default)(function (_ref) {
    var report = _ref.report;
    var utils = _ref.utils;

    var functionParameterNames = utils.getFunctionParameterNames();
    var jsdocParameterNames = utils.getJsdocParameterNames();

    (0, _some3.default)(functionParameterNames, function (functionParameterName, index) {
        var jsdocParameterName = jsdocParameterNames[index];

        if (!jsdocParameterName) {
            report('Missing JSDoc @' + utils.getPreferredTagName('param') + ' "' + functionParameterName + '" declaration.');

            return true;
        }

        return false;
    });
});
module.exports = exports['default'];
//# sourceMappingURL=requireParam.js.map
