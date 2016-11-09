'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _startsWith2 = require('lodash/startsWith');

var _startsWith3 = _interopRequireDefault(_startsWith2);

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

    var jsdocTags = (0, _filter3.default)(jsdoc.tags, {
        tag: 'param'
    });

    (0, _forEach3.default)(jsdocTags, function (jsdocTag) {
        if (jsdocTag.description && !(0, _startsWith3.default)(jsdocTag.description, '-')) {
            report('There must be a hyphen before @param description.');
        }
    });
});
module.exports = exports['default'];
//# sourceMappingURL=requireHyphenBeforeParamDescription.js.map
