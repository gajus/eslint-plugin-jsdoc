'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _startsWith2 = require('lodash/startsWith');

var _startsWith3 = _interopRequireDefault(_startsWith2);

var _has2 = require('lodash/has');

var _has3 = _interopRequireDefault(_has2);

var _iterateJsdoc = require('./../iterateJsdoc');

var _iterateJsdoc2 = _interopRequireDefault(_iterateJsdoc);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _iterateJsdoc2.default)(function (_ref) {
    var jsdoc = _ref.jsdoc;
    var report = _ref.report;
    var context = _ref.context;

    var always = void 0;

    if (!jsdoc.description || !jsdoc.tags.length) {
        return;
    }

    if ((0, _has3.default)(context.options, 0)) {
        always = context.options[0] === 'always';
    } else {
        always = true;
    }

    // The contents of the jsdoc.source and of jsdoc.description is left trimmed.
    // The contents of the jsdoc.description is right trimmed.
    // This gets the text following the description.
    var descriptionEndsWithANewline = (0, _startsWith3.default)(jsdoc.source.slice(jsdoc.description.length), '\n\n');

    if (always) {
        if (!descriptionEndsWithANewline) {
            report('There must be a newline after the description of the JSDoc block.');
        }
    } else {
        if (descriptionEndsWithANewline) {
            report('There must be no newline after the description of the JSDoc block.');
        }
    }
});
module.exports = exports['default'];
//# sourceMappingURL=newlineAfterDescription.js.map
