'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _some2 = require('lodash/some');

var _some3 = _interopRequireDefault(_some2);

var _forEach2 = require('lodash/forEach');

var _forEach3 = _interopRequireDefault(_forEach2);

var _includes2 = require('lodash/includes');

var _includes3 = _interopRequireDefault(_includes2);

var _filter2 = require('lodash/filter');

var _filter3 = _interopRequireDefault(_filter2);

var _iterateJsdoc = require('./../iterateJsdoc');

var _iterateJsdoc2 = _interopRequireDefault(_iterateJsdoc);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var targetTags = ['class', 'constant', 'enum', 'member', 'module', 'namespace', 'param', 'property', 'returns', 'throws', 'type', 'typedef'];

var targetTagAliases = ['constructor', 'const', 'var', 'arg', 'argument', 'prop', 'return', 'exception'];

targetTags = targetTags.concat(targetTagAliases);

var strictNativeTypes = ['boolean', 'number', 'string', 'Array', 'Object', 'RegExp', 'Date', 'Function'];

exports.default = (0, _iterateJsdoc2.default)(function (_ref) {
    var jsdoc = _ref.jsdoc;
    var report = _ref.report;

    var jsdocTags = (0, _filter3.default)(jsdoc.tags, function (tag) {
        return (0, _includes3.default)(targetTags, tag.tag);
    });

    (0, _forEach3.default)(jsdocTags, function (jsdocTag) {
        (0, _some3.default)(strictNativeTypes, function (strictNativeType) {
            if (strictNativeType.toLowerCase() === jsdocTag.type.toLowerCase() && strictNativeType !== jsdocTag.type) {
                report('Invalid JSDoc @' + jsdocTag.tag + ' "' + jsdocTag.name + '" type "' + jsdocTag.type + '".');

                return true;
            }
        });
    });
});
module.exports = exports['default'];
//# sourceMappingURL=checkTypes.js.map
