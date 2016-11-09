'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _flatten2 = require('lodash/flatten');

var _flatten3 = _interopRequireDefault(_flatten2);

var _keys2 = require('lodash/keys');

var _keys3 = _interopRequireDefault(_keys2);

var _findKey2 = require('lodash/findKey');

var _findKey3 = _interopRequireDefault(_findKey2);

var _values2 = require('lodash/values');

var _values3 = _interopRequireDefault(_values2);

var _includes2 = require('lodash/includes');

var _includes3 = _interopRequireDefault(_includes2);

var _filter2 = require('lodash/filter');

var _filter3 = _interopRequireDefault(_filter2);

var _has2 = require('lodash/has');

var _has3 = _interopRequireDefault(_has2);

var _map2 = require('lodash/map');

var _map3 = _interopRequireDefault(_map2);

var _tagNames = require('./tagNames');

var _tagNames2 = _interopRequireDefault(_tagNames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getFunctionParameterNames = function getFunctionParameterNames(functionNode) {
    return (0, _map3.default)(functionNode.params, function (param) {
        if ((0, _has3.default)(param, 'name')) {
            return param.name;
        }

        if ((0, _has3.default)(param, 'left.name')) {
            return param.left.name;
        }

        if (param.type === 'ObjectPattern') {
            return '<ObjectPattern>';
        }

        if (param.type === 'RestElement') {
            return param.argument.name;
        }

        throw new Error('Unsupported function signature format.');
    });
};

/**
 * Gets all parameter names, including those that refer to a path, e.g. "@param foo; @param foo.bar".
 */
var getJsdocParameterNamesDeep = function getJsdocParameterNamesDeep(jsdoc, targetTagName) {
    var jsdocParameterNames = void 0;

    jsdocParameterNames = (0, _filter3.default)(jsdoc.tags, {
        tag: targetTagName
    });

    jsdocParameterNames = (0, _map3.default)(jsdocParameterNames, 'name');

    return jsdocParameterNames;
};

var getJsdocParameterNames = function getJsdocParameterNames(jsdoc, targetTagName) {
    var jsdocParameterNames = void 0;

    jsdocParameterNames = getJsdocParameterNamesDeep(jsdoc, targetTagName);

    jsdocParameterNames = (0, _filter3.default)(jsdocParameterNames, function (name) {
        return name.indexOf('.') === -1;
    });

    return jsdocParameterNames;
};

var getPreferredTagName = function getPreferredTagName(name) {
    var tagPreference = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    if ((0, _includes3.default)((0, _values3.default)(tagPreference), name)) {
        return name;
    }

    var preferredTagName = (0, _findKey3.default)(_tagNames2.default, function (aliases) {
        return (0, _includes3.default)(aliases, name);
    });

    if (preferredTagName) {
        return preferredTagName;
    }

    return (0, _has3.default)(tagPreference, name) ? tagPreference[name] : name;
};

var isValidTag = function isValidTag(name) {
    var validTagNames = (0, _keys3.default)(_tagNames2.default).concat((0, _flatten3.default)((0, _values3.default)(_tagNames2.default)));

    return (0, _includes3.default)(validTagNames, name);
};

exports.default = {
    getFunctionParameterNames: getFunctionParameterNames,
    getJsdocParameterNames: getJsdocParameterNames,
    getJsdocParameterNamesDeep: getJsdocParameterNamesDeep,
    getPreferredTagName: getPreferredTagName,
    isValidTag: isValidTag
};
module.exports = exports['default'];
//# sourceMappingURL=jsdocUtils.js.map
