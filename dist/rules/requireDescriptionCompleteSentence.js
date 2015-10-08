'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _reportValidateSourceCode = require('./../reportValidateSourceCode');

var _reportValidateSourceCode2 = _interopRequireDefault(_reportValidateSourceCode);

exports['default'] = function (context) {
    (0, _reportValidateSourceCode2['default'])(context, 'requireDescriptionCompleteSentence', true, function (message) {
        // @see https://github.com/jscs-dev/jscs-jsdoc/issues/166

        if (message === 'You started a new line with an upper case letter but previous line does not end with a period') {
            message += '.';
        }

        if (message === 'Sentence must end with a period') {
            message += '.';
        }

        if (message === 'Description must start with an upper case letter') {
            message += '.';
        }

        return message;
    });

    return {};
};

module.exports = exports['default'];