'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _trimStart2 = require('lodash/trimStart');

var _trimStart3 = _interopRequireDefault(_trimStart2);

var _includes2 = require('lodash/includes');

var _includes3 = _interopRequireDefault(_includes2);

var _filter2 = require('lodash/filter');

var _filter3 = _interopRequireDefault(_filter2);

var _isBoolean2 = require('lodash/isBoolean');

var _isBoolean3 = _interopRequireDefault(_isBoolean2);

var _some2 = require('lodash/some');

var _some3 = _interopRequireDefault(_some2);

var _iterateJsdoc = require('./../iterateJsdoc');

var _iterateJsdoc2 = _interopRequireDefault(_iterateJsdoc);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var extractParagraphs = function extractParagraphs(text) {
    return text.split(/\n\n/);
};

var isNewLinePrecededByAPeriod = function isNewLinePrecededByAPeriod(text) {
    var lastLineEndsSentence = void 0;

    var lines = text.split('\n');

    return !(0, _some3.default)(lines, function (line) {
        if ((0, _isBoolean3.default)(lastLineEndsSentence) && !lastLineEndsSentence && /^[A-Z]/.test(line)) {
            return true;
        }

        lastLineEndsSentence = /\.$/.test(line);

        return false;
    });
};

var validateDescription = function validateDescription(description, report) {
    if (!description) {
        return false;
    }

    var paragraphs = extractParagraphs(description);

    return (0, _some3.default)(paragraphs, function (paragraph, index) {
        if (!/^[A-Z]/.test(paragraph)) {
            if (index === 0) {
                report('Description must start with an uppercase character.');
            } else {
                report('Paragraph must start with an uppercase character.');
            }

            return true;
        }

        if (!/\.$/.test(paragraph)) {
            report('Sentence must end with a period.');

            return true;
        }

        if (!isNewLinePrecededByAPeriod(paragraph)) {
            report('A line of text is started with an uppercase character, but preceding line does not end the sentence.');

            return true;
        }

        return false;
    });
};

exports.default = (0, _iterateJsdoc2.default)(function (_ref) {
    var jsdoc = _ref.jsdoc;
    var report = _ref.report;

    if (validateDescription(jsdoc.description, report)) {
        return;
    }

    var tags = (0, _filter3.default)(jsdoc.tags, function (tag) {
        return (0, _includes3.default)(['param', 'returns'], tag.tag);
    });

    (0, _some3.default)(tags, function (tag) {
        var description = (0, _trimStart3.default)(tag.description, '- ');

        return validateDescription(description, report);
    });
});
module.exports = exports['default'];
//# sourceMappingURL=requireDescriptionCompleteSentence.js.map
