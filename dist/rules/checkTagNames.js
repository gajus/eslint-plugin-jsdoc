'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _indexOf2 = require('lodash/indexOf');

var _indexOf3 = _interopRequireDefault(_indexOf2);

var _has2 = require('lodash/has');

var _has3 = _interopRequireDefault(_has2);

var _forEach2 = require('lodash/forEach');

var _forEach3 = _interopRequireDefault(_forEach2);

var _iterateJsdoc = require('./../iterateJsdoc');

var _iterateJsdoc2 = _interopRequireDefault(_iterateJsdoc);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _iterateJsdoc2.default)(function (_ref) {
    var jsdoc = _ref.jsdoc;
    var report = _ref.report;
    var utils = _ref.utils;
    var context = _ref.context;

    (0, _forEach3.default)(jsdoc.tags, function (jsdocTag) {
        var extraTags = 'extra';
        var tag = jsdocTag.tag;
        var customTags = [];

        // if we support more options we either need to enforce the order or search all the options
        if ((0, _has3.default)(context.options, 0) && (0, _has3.default)(context.options[0], extraTags)) {
            customTags = context.options[0][extraTags];
        }

        if (utils.isValidTag(tag) || (0, _indexOf3.default)(customTags, tag) !== -1) {
            var preferredTagName = utils.getPreferredTagName(jsdocTag.tag);

            if (preferredTagName !== jsdocTag.tag) {
                report('Invalid JSDoc tag (preference). Replace "' + jsdocTag.tag + '" JSDoc tag with "' + preferredTagName + '".');
            }
        } else {
            report('Invalid JSDoc tag name "' + jsdocTag.tag + '".');
        }
    });
});
module.exports = exports['default'];
//# sourceMappingURL=checkTagNames.js.map
