'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _reportValidateSourceCode = require('./../reportValidateSourceCode');

var _reportValidateSourceCode2 = _interopRequireDefault(_reportValidateSourceCode);

var schema = undefined;

exports.schema = schema = {
    'enum': ['always', 'never']
};

exports['default'] = function (context) {
    var options = undefined;

    options = context.options[0];

    if (options == 'always') {
        (0, _reportValidateSourceCode2['default'])(context, 'requireNewlineAfterDescription', true);
    } else {
        (0, _reportValidateSourceCode2['default'])(context, 'disallowNewlineAfterDescription', true);
    }

    return {};
};

exports.schema = schema;