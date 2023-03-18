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
import matchName from './rules/matchName';
import multilineBlocks from './rules/multilineBlocks';
import newlineAfterDescription from './rules/newlineAfterDescription';
import noBadBlocks from './rules/noBadBlocks';
import noDefaults from './rules/noDefaults';
import noMissingSyntax from './rules/noMissingSyntax';
import noMultiAsterisks from './rules/noMultiAsterisks';
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
import sortTags from './rules/sortTags';
import tagLines from './rules/tagLines';
import textEscaping from './rules/textEscaping';
import validTypes from './rules/validTypes';

const index = {
  configs: {},
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
    'match-name': matchName,
    'multiline-blocks': multilineBlocks,
    'newline-after-description': newlineAfterDescription,
    'no-bad-blocks': noBadBlocks,
    'no-defaults': noDefaults,
    'no-missing-syntax': noMissingSyntax,
    'no-multi-asterisks': noMultiAsterisks,
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
    'sort-tags': sortTags,
    'tag-lines': tagLines,
    'text-escaping': textEscaping,
    'valid-types': validTypes,
  },
};

const createRecommendedRuleset = (warnOrError) => {
  return {
    plugins: [
      'jsdoc',
    ],
    rules: {
      'jsdoc/check-access': warnOrError,
      'jsdoc/check-alignment': warnOrError,
      'jsdoc/check-examples': 'off',
      'jsdoc/check-indentation': 'off',
      'jsdoc/check-line-alignment': 'off',
      'jsdoc/check-param-names': warnOrError,
      'jsdoc/check-property-names': warnOrError,
      'jsdoc/check-syntax': 'off',
      'jsdoc/check-tag-names': warnOrError,
      'jsdoc/check-types': warnOrError,
      'jsdoc/check-values': warnOrError,
      'jsdoc/empty-tags': warnOrError,
      'jsdoc/implements-on-classes': warnOrError,
      'jsdoc/match-description': 'off',
      'jsdoc/match-name': 'off',
      'jsdoc/multiline-blocks': warnOrError,
      'jsdoc/newline-after-description': warnOrError,
      'jsdoc/no-bad-blocks': 'off',
      'jsdoc/no-defaults': 'off',
      'jsdoc/no-missing-syntax': 'off',
      'jsdoc/no-multi-asterisks': warnOrError,
      'jsdoc/no-restricted-syntax': 'off',
      'jsdoc/no-types': 'off',
      'jsdoc/no-undefined-types': warnOrError,
      'jsdoc/require-asterisk-prefix': 'off',
      'jsdoc/require-description': 'off',
      'jsdoc/require-description-complete-sentence': 'off',
      'jsdoc/require-example': 'off',
      'jsdoc/require-file-overview': 'off',
      'jsdoc/require-hyphen-before-param-description': 'off',
      'jsdoc/require-jsdoc': warnOrError,
      'jsdoc/require-param': warnOrError,
      'jsdoc/require-param-description': warnOrError,
      'jsdoc/require-param-name': warnOrError,
      'jsdoc/require-param-type': warnOrError,
      'jsdoc/require-property': warnOrError,
      'jsdoc/require-property-description': warnOrError,
      'jsdoc/require-property-name': warnOrError,
      'jsdoc/require-property-type': warnOrError,
      'jsdoc/require-returns': warnOrError,
      'jsdoc/require-returns-check': warnOrError,
      'jsdoc/require-returns-description': warnOrError,
      'jsdoc/require-returns-type': warnOrError,
      'jsdoc/require-throws': 'off',
      'jsdoc/require-yields': warnOrError,
      'jsdoc/require-yields-check': warnOrError,
      'jsdoc/sort-tags': 'off',
      'jsdoc/tag-lines': warnOrError,
      'jsdoc/text-escaping': 'off',
      'jsdoc/valid-types': warnOrError,
    },
  };
};

const createRecommendedTypeScriptRuleset = (warnOrError) => {
  const ruleset = createRecommendedRuleset(warnOrError);

  return {
    ...ruleset,
    rules: {
      ...ruleset.rules,
      'jsdoc/no-types': warnOrError,
      'jsdoc/require-param-type': 'off',
      'jsdoc/require-property-type': 'off',
      'jsdoc/require-returns-type': 'off',
    },
  };
};

index.configs.recommended = createRecommendedRuleset('warn');
index.configs['recommended-error'] = createRecommendedRuleset('error');
index.configs['recommended-typescript'] = createRecommendedTypeScriptRuleset('warn');
index.configs['recommended-typescript-error'] = createRecommendedTypeScriptRuleset('error');

export default index;
