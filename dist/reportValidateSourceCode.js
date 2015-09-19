'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _jscs = require('jscs');

var _jscs2 = _interopRequireDefault(_jscs);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var checker = undefined,
    reportValidateSourceCode = undefined,
    validateSourceCode = undefined;

checker = new _jscs2['default']();
checker.configure({
    "plugins": [require.resolve('jscs-jsdoc')]
});

/**
 * @typedef {Object} validateRule~error
 * @property {String} message
 * @property {Number} line
 * @property {Number} column
 */

/**
 * Validates a source code using a specific jscs-jsdoc rule and return an array of errors.
 *
 * @param {String} sourceCode
 * @param {String} ruleName
 * @param {Boolean|String|Object} ruleOptions
 * @returns {validateRule~error[]}
 */
validateSourceCode = function (sourceCode, ruleName, ruleOptions) {
    var results = undefined,
        errors = undefined;

    // console.log('ruleName', ruleName, 'ruleOptions', ruleOptions);

    checker.configure({
        "jsDoc": _defineProperty({}, ruleName, ruleOptions)
    });

    // console.log('checker._configuredRules', checker._configuredRules);

    results = checker.checkString(sourceCode);

    errors = results.getErrorList();

    // console.log('errors', errors);

    errors = _lodash2['default'].map(errors, function (error) {
        return {
            message: error.message,
            line: error.line,
            column: error.column
        };
    });

    // console.log('errors', errors);

    return errors;
};

/**
 * @param {Object} context
 * @param {String} ruleName
 * @param {Boolean|String|Object} ruleOptions
 * @returns {undefined}
 */
reportValidateSourceCode = function (context, ruleName, ruleOptions) {
    var errors = undefined,
        sourceCode = undefined;

    sourceCode = context.getSourceCode().text;

    errors = validateSourceCode(sourceCode, ruleName, ruleOptions);

    // console.log('errors', errors, sourceCode, ruleName, ruleOptions);

    _lodash2['default'].forEach(errors, function (error) {
        var node = undefined;

        node = {
            loc: {
                start: {
                    line: error.line,
                    // "Ah... the parser (espree) is using 0-based column and eslint is using 1-based column, so context.report is 0-based then eslint transforms it to 1-based."
                    // @see https://gitter.im/eslint/eslint?at=55fc8a81463feefb419d4798
                    column: error.column - 1
                }
            }
        };

        // console.log('node', node)

        context.report(node, error.message);
    });
};

exports['default'] = reportValidateSourceCode;
module.exports = exports['default'];