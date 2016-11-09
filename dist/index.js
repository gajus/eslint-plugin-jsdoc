'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _checkParamNames = require('./rules/checkParamNames');

var _checkParamNames2 = _interopRequireDefault(_checkParamNames);

var _checkTagNames = require('./rules/checkTagNames');

var _checkTagNames2 = _interopRequireDefault(_checkTagNames);

var _checkTypes = require('./rules/checkTypes');

var _checkTypes2 = _interopRequireDefault(_checkTypes);

var _newlineAfterDescription = require('./rules/newlineAfterDescription');

var _newlineAfterDescription2 = _interopRequireDefault(_newlineAfterDescription);

var _requireDescriptionCompleteSentence = require('./rules/requireDescriptionCompleteSentence');

var _requireDescriptionCompleteSentence2 = _interopRequireDefault(_requireDescriptionCompleteSentence);

var _requireHyphenBeforeParamDescription = require('./rules/requireHyphenBeforeParamDescription');

var _requireHyphenBeforeParamDescription2 = _interopRequireDefault(_requireHyphenBeforeParamDescription);

var _requireParam = require('./rules/requireParam');

var _requireParam2 = _interopRequireDefault(_requireParam);

var _requireParamDescription = require('./rules/requireParamDescription');

var _requireParamDescription2 = _interopRequireDefault(_requireParamDescription);

var _requireParamType = require('./rules/requireParamType');

var _requireParamType2 = _interopRequireDefault(_requireParamType);

var _requireReturnsDescription = require('./rules/requireReturnsDescription');

var _requireReturnsDescription2 = _interopRequireDefault(_requireReturnsDescription);

var _requireReturnsType = require('./rules/requireReturnsType');

var _requireReturnsType2 = _interopRequireDefault(_requireReturnsType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    rules: {
        'check-param-names': _checkParamNames2.default,
        'check-tag-names': _checkTagNames2.default,
        'check-types': _checkTypes2.default,
        'newline-after-description': _newlineAfterDescription2.default,
        'require-description-complete-sentence': _requireDescriptionCompleteSentence2.default,
        'require-hyphen-before-param-description': _requireHyphenBeforeParamDescription2.default,
        'require-param': _requireParam2.default,
        'require-param-description': _requireParamDescription2.default,
        'require-param-type': _requireParamType2.default,
        'require-returns-description': _requireReturnsDescription2.default,
        'require-returns-type': _requireReturnsType2.default
    },
    rulesConfig: {
        'check-param-names': 0,
        'check-tag-names': 0,
        'check-types': 0,
        'newline-after-description': 0,
        'require-description-complete-sentence': 0,
        'require-hyphen-before-param-description': 0,
        'require-param': 0,
        'require-param-description': 0,
        'require-param-type': 0,
        'require-returns-description': 0,
        'require-returns-type': 0
    }
};
module.exports = exports['default'];
//# sourceMappingURL=index.js.map
