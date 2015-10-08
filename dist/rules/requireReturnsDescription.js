'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _reportValidateSourceCode = require('./../reportValidateSourceCode');

var _reportValidateSourceCode2 = _interopRequireDefault(_reportValidateSourceCode);

exports['default'] = function (context) {
    (0, _reportValidateSourceCode2['default'])(context, 'requireReturnDescription', true, function (message) {
        if (message === 'Missing return description') {
            return '@returns must have a description.';
        }

        throw new Error('Unexpected error message.');
    });

    return {};
};

module.exports = exports['default'];