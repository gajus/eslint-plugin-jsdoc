'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _forEach2 = require('lodash/forEach');

var _forEach3 = _interopRequireDefault(_forEach2);

var _filter2 = require('lodash/filter');

var _filter3 = _interopRequireDefault(_filter2);

var _iterateJsdoc = require('./../iterateJsdoc');

var _iterateJsdoc2 = _interopRequireDefault(_iterateJsdoc);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _iterateJsdoc2.default)(function (_ref) {
    var jsdoc = _ref.jsdoc;
    var report = _ref.report;
    var utils = _ref.utils;

    var targetTagName = utils.getPreferredTagName('param');

    var jsdocParameters = (0, _filter3.default)(jsdoc.tags, {
        tag: targetTagName
    });

    (0, _forEach3.default)(jsdocParameters, function (jsdocParameter) {
        if (!jsdocParameter.type) {
            report('Missing JSDoc @' + targetTagName + ' "' + jsdocParameter.name + '" type.');
        }
    });
});
module.exports = exports['default'];
//# sourceMappingURL=requireParamType.js.map
