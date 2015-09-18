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

    checker.configure({
        "jsDoc": _defineProperty({}, ruleName, ruleOptions)
    });

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

    _lodash2['default'].forEach(errors, function (error) {
        var node = undefined;

        node = {
            loc: {
                start: {
                    line: error.line,
                    column: error.column
                }
            }
        };

        context.report(node, error.message);
    });
};

exports['default'] = {
    rules: {
        'require-param-description': function requireParamDescription(context) {
            // let options;
            // options = context.options[0] || {};

            reportValidateSourceCode(context, 'requireParamDescription', true);

            return {};
        }
    },
    rulesConfig: {
        'require-param-description': 0
    }
};
module.exports = exports['default'];