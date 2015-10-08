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

var _rulesCheckReturnsTypes = require('./rules/checkReturnsTypes');

var _rulesCheckReturnsTypes2 = _interopRequireDefault(_rulesCheckReturnsTypes);

var _rulesCheckTypes = require('./rules/checkTypes');

var _rulesCheckTypes2 = _interopRequireDefault(_rulesCheckTypes);

var _rulesNewlineAfterDescription = require('./rules/newlineAfterDescription');

var _rulesNewlineAfterDescription2 = _interopRequireDefault(_rulesNewlineAfterDescription);

var _rulesRequireDescriptionCompleteSentence = require('./rules/requireDescriptionCompleteSentence');

var _rulesRequireDescriptionCompleteSentence2 = _interopRequireDefault(_rulesRequireDescriptionCompleteSentence);

var _rulesRequireParam = require('./rules/requireParam');

var _rulesRequireParam2 = _interopRequireDefault(_rulesRequireParam);

var _rulesRequireParamDescription = require('./rules/requireParamDescription');

var _rulesRequireParamDescription2 = _interopRequireDefault(_rulesRequireParamDescription);

var _rulesRequireParamTypes = require('./rules/requireParamTypes');

var _rulesRequireParamTypes2 = _interopRequireDefault(_rulesRequireParamTypes);

var _rulesRequireReturnsDescription = require('./rules/requireReturnsDescription');

var _rulesRequireReturnsDescription2 = _interopRequireDefault(_rulesRequireReturnsDescription);

var _rulesRequireReturnsTypes = require('./rules/requireReturnsTypes');

var _rulesRequireReturnsTypes2 = _interopRequireDefault(_rulesRequireReturnsTypes);

exports['default'] = {
    rules: {
        'check-param-names': _rulesCheckParamNames2['default'],
        'check-redundant-params': _rulesCheckRedundantParams2['default'],
        'check-redundant-returns': _rulesCheckRedundantReturns2['default'],
        'check-returns-types': _rulesCheckReturnsTypes2['default'],
        'check-types': _rulesCheckTypes2['default'],
        'newline-after-description': _rulesNewlineAfterDescription2['default'],
        'require-description-complete-sentence': _rulesRequireDescriptionCompleteSentence2['default'],
        'require-param': _rulesRequireParam2['default'],
        'require-param-description': _rulesRequireParamDescription2['default'],
        'require-param-types': _rulesRequireParamTypes2['default'],
        'require-returns-description': _rulesRequireReturnsDescription2['default'],
        'require-returns-types': _rulesRequireReturnsTypes2['default']
    },
    rulesConfig: {
        'check-param-names': 0,
        'check-redundant-params': 0,
        'check-redundant-returns': 0,
        'check-returns-types': 0,
        'check-types': 0,
        'newline-after-description': 0,
        'require-description-complete-sentence': 0,
        'require-param': 0,
        'require-param-description': 0,
        'require-param-types': 0,
        'require-returns-description': 0,
        'require-returns-types': 0
    }
};
module.exports = exports['default'];