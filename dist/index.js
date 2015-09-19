'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _rulesCheckParamNames = require('./rules/checkParamNames');

var _rulesCheckParamNames2 = _interopRequireDefault(_rulesCheckParamNames);

var _rulesCheckRedundantParams = require('./rules/checkRedundantParams');

var _rulesCheckRedundantParams2 = _interopRequireDefault(_rulesCheckRedundantParams);

var _rulesCheckRedundantReturns = require('./rules/checkRedundantReturns');

var _rulesCheckRedundantReturns2 = _interopRequireDefault(_rulesCheckRedundantReturns);

var _rulesCheckReturnTypes = require('./rules/checkReturnTypes');

var _rulesCheckReturnTypes2 = _interopRequireDefault(_rulesCheckReturnTypes);

var _rulesNewlineAfterDescription = require('./rules/newlineAfterDescription');

var _rulesNewlineAfterDescription2 = _interopRequireDefault(_rulesNewlineAfterDescription);

var _rulesRequireDescriptionCompleteSentence = require('./rules/requireDescriptionCompleteSentence');

var _rulesRequireDescriptionCompleteSentence2 = _interopRequireDefault(_rulesRequireDescriptionCompleteSentence);

var _rulesRequireParamDescription = require('./rules/requireParamDescription');

var _rulesRequireParamDescription2 = _interopRequireDefault(_rulesRequireParamDescription);

var _rulesRequireParamTypes = require('./rules/requireParamTypes');

var _rulesRequireParamTypes2 = _interopRequireDefault(_rulesRequireParamTypes);

var _rulesRequireReturnTypes = require('./rules/requireReturnTypes');

var _rulesRequireReturnTypes2 = _interopRequireDefault(_rulesRequireReturnTypes);

exports['default'] = {
    rules: {
        'check-param-names': _rulesCheckParamNames2['default'],
        'check-redundant-params': _rulesCheckRedundantParams2['default'],
        'check-redundant-returns': _rulesCheckRedundantReturns2['default'],
        'check-return-types': _rulesCheckReturnTypes2['default'],
        'newline-after-description': _rulesNewlineAfterDescription2['default'],
        'require-description-complete-sentence': _rulesRequireDescriptionCompleteSentence2['default'],
        'require-param-description': _rulesRequireParamDescription2['default'],
        'require-param-types': _rulesRequireParamTypes2['default'],
        'require-return-types': _rulesRequireReturnTypes2['default']
    },
    rulesConfig: {
        'check-param-names': 0,
        'check-redundant-params': 0,
        'check-redundant-returns': 0,
        'check-return-types': 0,
        'newline-after-description': 0,
        'require-description-complete-sentence': 0,
        'require-param-description': 0,
        'require-param-types': 0,
        'require-return-types': 0
    }
};
module.exports = exports['default'];