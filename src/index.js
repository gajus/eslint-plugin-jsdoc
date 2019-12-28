/* eslint-disable import/max-dependencies */
import checkAccess from './rules/checkAccess';
import checkAlignment from './rules/checkAlignment';
import checkExamples from './rules/checkExamples';
import checkIndentation from './rules/checkIndentation';
import checkParamNames from './rules/checkParamNames';
import checkPropertyNames from './rules/checkPropertyNames';
import checkSyntax from './rules/checkSyntax';
import checkTagNames from './rules/checkTagNames';
import checkTypes from './rules/checkTypes';
import checkValues from './rules/checkValues';
import emptyTags from './rules/emptyTags';
import implementsOnClasses from './rules/implementsOnClasses';
import matchDescription from './rules/matchDescription';
import newlineAfterDescription from './rules/newlineAfterDescription';
import noTypes from './rules/noTypes';
import noUndefinedTypes from './rules/noUndefinedTypes';
import requireDescriptionCompleteSentence from './rules/requireDescriptionCompleteSentence';
import requireDescription from './rules/requireDescription';
import requireExample from './rules/requireExample';
import requireFileOverview from './rules/requireFileOverview';
import requireHyphenBeforeParamDescription from './rules/requireHyphenBeforeParamDescription';
import requireParamName from './rules/requireParamName';
import requireParam from './rules/requireParam';
import requireParamDescription from './rules/requireParamDescription';
import requireParamType from './rules/requireParamType';
import requireProperty from './rules/requireProperty';
import requirePropertyDescription from './rules/requirePropertyDescription';
import requirePropertyName from './rules/requirePropertyName';
import requirePropertyType from './rules/requirePropertyType';
import requireReturns from './rules/requireReturns';
import requireReturnsCheck from './rules/requireReturnsCheck';
import requireReturnsDescription from './rules/requireReturnsDescription';
import requireReturnsType from './rules/requireReturnsType';
import validTypes from './rules/validTypes';
import requireJsdoc from './rules/requireJsdoc';

export default {
  configs: {
    recommended: {
      plugins: ['jsdoc'],
      rules: {
        'jsdoc/check-access': 'warn',
        'jsdoc/check-alignment': 'warn',
        'jsdoc/check-examples': 'off',
        'jsdoc/check-indentation': 'off',
        'jsdoc/check-param-names': 'warn',
        'jsdoc/check-property-names': 'warn',
        'jsdoc/check-syntax': 'off',
        'jsdoc/check-tag-names': 'warn',
        'jsdoc/check-types': 'warn',
        'jsdoc/check-values': 'warn',
        'jsdoc/empty-tags': 'warn',
        'jsdoc/implements-on-classes': 'warn',
        'jsdoc/match-description': 'off',
        'jsdoc/newline-after-description': 'warn',
        'jsdoc/no-types': 'off',
        'jsdoc/no-undefined-types': 'warn',
        'jsdoc/require-description': 'off',
        'jsdoc/require-description-complete-sentence': 'off',
        'jsdoc/require-example': 'off',
        'jsdoc/require-file-overview': 'off',
        'jsdoc/require-hyphen-before-param-description': 'off',
        'jsdoc/require-jsdoc': 'warn',
        'jsdoc/require-param': 'warn',
        'jsdoc/require-param-description': 'warn',
        'jsdoc/require-param-name': 'warn',
        'jsdoc/require-param-type': 'warn',
        'jsdoc/require-property': 'warn',
        'jsdoc/require-property-description': 'warn',
        'jsdoc/require-property-name': 'warn',
        'jsdoc/require-property-type': 'warn',
        'jsdoc/require-returns': 'warn',
        'jsdoc/require-returns-check': 'warn',
        'jsdoc/require-returns-description': 'warn',
        'jsdoc/require-returns-type': 'warn',
        'jsdoc/valid-types': 'warn',
      },
    },
  },
  rules: {
    'check-access': checkAccess,
    'check-alignment': checkAlignment,
    'check-examples': checkExamples,
    'check-indentation': checkIndentation,
    'check-param-names': checkParamNames,
    'check-property-names': checkPropertyNames,
    'check-syntax': checkSyntax,
    'check-tag-names': checkTagNames,
    'check-types': checkTypes,
    'check-values': checkValues,
    'empty-tags': emptyTags,
    'implements-on-classes': implementsOnClasses,
    'match-description': matchDescription,
    'newline-after-description': newlineAfterDescription,
    'no-types': noTypes,
    'no-undefined-types': noUndefinedTypes,
    'require-description': requireDescription,
    'require-description-complete-sentence': requireDescriptionCompleteSentence,
    'require-example': requireExample,
    'require-file-overview': requireFileOverview,
    'require-hyphen-before-param-description': requireHyphenBeforeParamDescription,
    'require-jsdoc': requireJsdoc,
    'require-param': requireParam,
    'require-param-description': requireParamDescription,
    'require-param-name': requireParamName,
    'require-param-type': requireParamType,
    'require-property': requireProperty,
    'require-property-description': requirePropertyDescription,
    'require-property-name': requirePropertyName,
    'require-property-type': requirePropertyType,
    'require-returns': requireReturns,
    'require-returns-check': requireReturnsCheck,
    'require-returns-description': requireReturnsDescription,
    'require-returns-type': requireReturnsType,
    'valid-types': validTypes,
  },
};
