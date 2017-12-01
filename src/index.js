import checkParamNames from './rules/checkParamNames';
import checkTagNames from './rules/checkTagNames';
import checkTypes from './rules/checkTypes';
import newlineAfterDescription from './rules/newlineAfterDescription';
import requireDescriptionCompleteSentence from './rules/requireDescriptionCompleteSentence';
import requireExample from './rules/requireExample';
import requireHyphenBeforeParamDescription from './rules/requireHyphenBeforeParamDescription';
import requireParamName from './rules/requireParamName';
import requireParam from './rules/requireParam';
import requireParamDescription from './rules/requireParamDescription';
import requireParamType from './rules/requireParamType';
import requireReturnsDescription from './rules/requireReturnsDescription';
import requireReturnsType from './rules/requireReturnsType';

export default {
  configs: {
    recommended: {
      rules: {
        'jsdoc/check-param-names': 'warn',
        'jsdoc/check-tag-names': 'warn',
        'jsdoc/check-types': 'warn',
        'jsdoc/newline-after-description': 'warn',
        'jsdoc/require-description-complete-sentence': 'off',
        'jsdoc/require-example': 'off',
        'jsdoc/require-hyphen-before-param-description': 'off',
        'jsdoc/require-param': 'warn',
        'jsdoc/require-param-description': 'warn',
        'jsdoc/require-param-name': 'warn',
        'jsdoc/require-param-type': 'warn',
        'jsdoc/require-returns-description': 'warn',
        'jsdoc/require-returns-type': 'warn'
      }
    }
  },
  rules: {
    'check-param-names': checkParamNames,
    'check-tag-names': checkTagNames,
    'check-types': checkTypes,
    'newline-after-description': newlineAfterDescription,
    'require-description-complete-sentence': requireDescriptionCompleteSentence,
    'require-example': requireExample,
    'require-hyphen-before-param-description': requireHyphenBeforeParamDescription,
    'require-param': requireParam,
    'require-param-description': requireParamDescription,
    'require-param-name': requireParamName,
    'require-param-type': requireParamType,
    'require-returns-description': requireReturnsDescription,
    'require-returns-type': requireReturnsType
  },
  rulesConfig: {
    'check-param-names': 'off',
    'check-tag-names': 'off',
    'check-types': 'off',
    'newline-after-description': 'off',
    'require-description-complete-sentence': 'off',
    'require-example': 'off',
    'require-hyphen-before-param-description': 'off',
    'require-param': 'off',
    'require-param-description': 'off',
    'require-param-name': 'off',
    'require-param-type': 'off',
    'require-returns-description': 'off',
    'require-returns-type': 'off'
  }
};
