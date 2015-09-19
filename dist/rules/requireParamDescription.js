'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _reportValidateSourceCode = require('./../reportValidateSourceCode');

var _reportValidateSourceCode2 = _interopRequireDefault(_reportValidateSourceCode);

exports['default'] = function (context) {
    // let options;
    // options = context.options[0] || {};

    (0, _reportValidateSourceCode2['default'])(context, 'requireParamDescription', true);

    return {};
};

module.exports = exports['default'];