import checkAccess from './rules/checkAccess';
import checkAlignment from './rules/checkAlignment';
import checkExamples from './rules/checkExamples';
import checkIndentation from './rules/checkIndentation';
import checkLineAlignment from './rules/checkLineAlignment';
import checkParamNames from './rules/checkParamNames';
import checkPropertyNames from './rules/checkPropertyNames';
import checkSyntax from './rules/checkSyntax';
import checkTagNames from './rules/checkTagNames';
import checkTypes from './rules/checkTypes';
import checkValues from './rules/checkValues';
import emptyTags from './rules/emptyTags';
import implementsOnClasses from './rules/implementsOnClasses';
import matchDescription from './rules/matchDescription';
import multilineBlocks from './rules/multilineBlocks';
import newlineAfterDescription from './rules/newlineAfterDescription';
import noBadBlocks from './rules/noBadBlocks';
import noDefaults from './rules/noDefaults';
import noMissingSyntax from './rules/noMissingSyntax';
import noRestrictedSyntax from './rules/noRestrictedSyntax';
import noTypes from './rules/noTypes';
import noUndefinedTypes from './rules/noUndefinedTypes';
import requireAsteriskPrefix from './rules/requireAsteriskPrefix';
import requireDescription from './rules/requireDescription';
import requireDescriptionCompleteSentence from './rules/requireDescriptionCompleteSentence';
import requireExample from './rules/requireExample';
import requireFileOverview from './rules/requireFileOverview';
import requireHyphenBeforeParamDescription from './rules/requireHyphenBeforeParamDescription';
import requireJsdoc from './rules/requireJsdoc';
import requireParam from './rules/requireParam';
import requireParamDescription from './rules/requireParamDescription';
import requireParamName from './rules/requireParamName';
import requireParamType from './rules/requireParamType';
import requireProperty from './rules/requireProperty';
import requirePropertyDescription from './rules/requirePropertyDescription';
import requirePropertyName from './rules/requirePropertyName';
import requirePropertyType from './rules/requirePropertyType';
import requireReturns from './rules/requireReturns';
import requireReturnsCheck from './rules/requireReturnsCheck';
import requireReturnsDescription from './rules/requireReturnsDescription';
import requireReturnsType from './rules/requireReturnsType';
import requireThrows from './rules/requireThrows';
import requireYields from './rules/requireYields';
import requireYieldsCheck from './rules/requireYieldsCheck';
import tagLines from './rules/tagLines';
import validTypes from './rules/validTypes';

export default {
  configs: {
    recommended: {
      plugins: ['jsdoc'],
      rules: {
        'jsdoc/check-access': 'warn',
        'jsdoc/check-alignment': 'warn',
        'jsdoc/check-examples': 'off',
        'jsdoc/check-indentation': 'off',
        'jsdoc/check-line-alignment': 'off',
        'jsdoc/check-param-names': 'warn',
        'jsdoc/check-property-names': 'warn',
        'jsdoc/check-syntax': 'off',
        'jsdoc/check-tag-names': 'warn',
        'jsdoc/check-types': 'warn',
        'jsdoc/check-values': 'warn',
        'jsdoc/empty-tags': 'warn',
        'jsdoc/implements-on-classes': 'warn',
        'jsdoc/match-description': 'off',
        'jsdoc/multiline-blocks': 'off',
        'jsdoc/newline-after-description': 'warn',
        'jsdoc/no-bad-blocks': 'off',
        'jsdoc/no-defaults': 'off',
        'jsdoc/no-missing-syntax': 'off',
        'jsdoc/no-restricted-syntax': 'off',
        'jsdoc/no-types': 'off',
        'jsdoc/no-undefined-types': 'warn',
        'jsdoc/require-asterisk-prefix': 'off',
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
        'jsdoc/require-throws': 'off',
        'jsdoc/require-yields': 'warn',
        'jsdoc/require-yields-check': 'warn',
        'jsdoc/tag-lines': 'warn',
        'jsdoc/valid-types': 'warn',
      },
    },
  },
  rules: {
    'check-access': checkAccess,
    'check-alignment': checkAlignment,
    'check-examples': checkExamples,
    'check-indentation': checkIndentation,
    'check-line-alignment': checkLineAlignment,
    'check-param-names': checkParamNames,
    'check-property-names': checkPropertyNames,
    'check-syntax': checkSyntax,
    'check-tag-names': checkTagNames,
    'check-types': checkTypes,
    'check-values': checkValues,
    'empty-tags': emptyTags,
    'implements-on-classes': implementsOnClasses,
    'match-description': matchDescription,
    'multiline-blocks': multilineBlocks,
    'newline-after-description': newlineAfterDescription,
    'no-bad-blocks': noBadBlocks,
    'no-defaults': noDefaults,
    'no-missing-syntax': noMissingSyntax,
    'no-restricted-syntax': noRestrictedSyntax,
    'no-types': noTypes,
    'no-undefined-types': noUndefinedTypes,
    'require-asterisk-prefix': requireAsteriskPrefix,
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
    'require-throws': requireThrows,
    'require-yields': requireYields,
    'require-yields-check': requireYieldsCheck,
    'tag-lines': tagLines,
    'valid-types': validTypes,
  },
};
