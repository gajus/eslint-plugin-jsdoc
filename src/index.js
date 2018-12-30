/* eslint-disable import/max-dependencies */
import checkExamples from './rules/checkExamples';
import checkParamNames from './rules/checkParamNames';
import checkTagNames from './rules/checkTagNames';
import checkTypes from './rules/checkTypes';
import newlineAfterDescription from './rules/newlineAfterDescription';
import noUndefinedTypes from './rules/noUndefinedTypes';
import requireDescriptionCompleteSentence from './rules/requireDescriptionCompleteSentence';
import requireDescription from './rules/requireDescription';
import requireExample from './rules/requireExample';
import requireHyphenBeforeParamDescription from './rules/requireHyphenBeforeParamDescription';
import requireParamName from './rules/requireParamName';
import requireParam from './rules/requireParam';
import requireParamDescription from './rules/requireParamDescription';
import requireParamType from './rules/requireParamType';
import requireReturns from './rules/requireReturns';
import requireReturnsDescription from './rules/requireReturnsDescription';
import requireReturnsType from './rules/requireReturnsType';
import validTypes from './rules/validTypes';

export default {
  configs: {
    recommended: {
      rules: {
        'jsdoc/check-examples': 'off',
        'jsdoc/check-param-names': 'warn',
        'jsdoc/check-tag-names': 'warn',
        'jsdoc/check-types': 'warn',
        'jsdoc/newline-after-description': 'warn',
        'jsdoc/no-undefined-types': 'warn',
        'jsdoc/require-description': 'off',
        'jsdoc/require-description-complete-sentence': 'off',
        'jsdoc/require-example': 'off',
        'jsdoc/require-hyphen-before-param-description': 'off',
        'jsdoc/require-param': 'warn',
        'jsdoc/require-param-description': 'warn',
        'jsdoc/require-param-name': 'warn',
        'jsdoc/require-param-type': 'warn',
        'jsdoc/require-returns': 'warn',
        'jsdoc/require-returns-description': 'warn',
        'jsdoc/require-returns-type': 'warn',
        'jsdoc/valid-types': 'warn'
      }
    }
  },
  rules: {
    'check-examples': checkExamples,
    'check-param-names': checkParamNames,
    'check-tag-names': checkTagNames,
    'check-types': checkTypes,
    'newline-after-description': newlineAfterDescription,
    'no-undefined-types': noUndefinedTypes,
    'require-description': requireDescription,
    'require-description-complete-sentence': requireDescriptionCompleteSentence,
    'require-example': requireExample,
    'require-hyphen-before-param-description': requireHyphenBeforeParamDescription,
    'require-param': requireParam,
    'require-param-description': requireParamDescription,
    'require-param-name': requireParamName,
    'require-param-type': requireParamType,
    'require-returns': requireReturns,
    'require-returns-description': requireReturnsDescription,
    'require-returns-type': requireReturnsType,
    'valid-types': validTypes
  }
};
