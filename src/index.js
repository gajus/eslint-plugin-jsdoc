/* eslint-disable import/max-dependencies */
import checkAlignment from './rules/checkAlignment';
import checkExamples from './rules/checkExamples';
import checkIndentation from './rules/checkIndentation';
import checkParamNames from './rules/checkParamNames';
import checkSyntax from './rules/checkSyntax';
import checkTagNames from './rules/checkTagNames';
import checkTypes from './rules/checkTypes';
import implementsOnClasses from './rules/implementsOnClasses';
import matchDescription from './rules/matchDescription';
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
import requireReturnsCheck from './rules/requireReturnsCheck';
import requireReturnsDescription from './rules/requireReturnsDescription';
import requireReturnsType from './rules/requireReturnsType';
import validTypes from './rules/validTypes';
import requireJsdoc from './rules/requireJsdoc';

export default {
  configs: {
    recommended: {
      rules: {
        'jsdoc/check-alignment': 'warn',
        'jsdoc/check-examples': 'off',
        'jsdoc/check-indentation': 'off',
        'jsdoc/check-param-names': 'warn',
        'jsdoc/check-syntax': 'off',
        'jsdoc/check-tag-names': 'warn',
        'jsdoc/check-types': 'warn',
        'jsdoc/implements-on-classes': 'warn',
        'jsdoc/match-description': 'off',
        'jsdoc/newline-after-description': 'warn',
        'jsdoc/no-undefined-types': 'warn',
        'jsdoc/require-description': 'off',
        'jsdoc/require-description-complete-sentence': 'off',
        'jsdoc/require-example': 'off',
        'jsdoc/require-hyphen-before-param-description': 'off',
        'jsdoc/require-jsdoc': 'warn',
        'jsdoc/require-param': 'warn',
        'jsdoc/require-param-description': 'warn',
        'jsdoc/require-param-name': 'warn',
        'jsdoc/require-param-type': 'warn',
        'jsdoc/require-returns': 'warn',
        'jsdoc/require-returns-check': 'warn',
        'jsdoc/require-returns-description': 'warn',
        'jsdoc/require-returns-type': 'warn',
        'jsdoc/valid-types': 'warn'
      }
    }
  },
  rules: {
    'check-alignment': checkAlignment,
    'check-examples': checkExamples,
    'check-indentation': checkIndentation,
    'check-param-names': checkParamNames,
    'check-syntax': checkSyntax,
    'check-tag-names': checkTagNames,
    'check-types': checkTypes,
    'implements-on-classes': implementsOnClasses,
    'match-description': matchDescription,
    'newline-after-description': newlineAfterDescription,
    'no-undefined-types': noUndefinedTypes,
    'require-description': requireDescription,
    'require-description-complete-sentence': requireDescriptionCompleteSentence,
    'require-example': requireExample,
    'require-hyphen-before-param-description': requireHyphenBeforeParamDescription,
    'require-jsdoc': requireJsdoc,
    'require-param': requireParam,
    'require-param-description': requireParamDescription,
    'require-param-name': requireParamName,
    'require-param-type': requireParamType,
    'require-returns': requireReturns,
    'require-returns-check': requireReturnsCheck,
    'require-returns-description': requireReturnsDescription,
    'require-returns-type': requireReturnsType,
    'valid-types': validTypes
  }
};
