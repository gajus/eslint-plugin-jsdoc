import checkAccess from './rules/checkAccess.js';
import checkAlignment from './rules/checkAlignment.js';
import checkExamples from './rules/checkExamples.js';
import checkIndentation from './rules/checkIndentation.js';
import checkLineAlignment from './rules/checkLineAlignment.js';
import checkParamNames from './rules/checkParamNames.js';
import checkPropertyNames from './rules/checkPropertyNames.js';
import checkSyntax from './rules/checkSyntax.js';
import checkTagNames from './rules/checkTagNames.js';
import checkTypes from './rules/checkTypes.js';
import checkValues from './rules/checkValues.js';
import emptyTags from './rules/emptyTags.js';
import implementsOnClasses from './rules/implementsOnClasses.js';
import importsAsDependencies from './rules/importsAsDependencies.js';
import informativeDocs from './rules/informativeDocs.js';
import matchDescription from './rules/matchDescription.js';
import matchName from './rules/matchName.js';
import multilineBlocks from './rules/multilineBlocks.js';
import noBadBlocks from './rules/noBadBlocks.js';
import noBlankBlockDescriptions from './rules/noBlankBlockDescriptions.js';
import noBlankBlocks from './rules/noBlankBlocks.js';
import noDefaults from './rules/noDefaults.js';
import noMissingSyntax from './rules/noMissingSyntax.js';
import noMultiAsterisks from './rules/noMultiAsterisks.js';
import noRestrictedSyntax from './rules/noRestrictedSyntax.js';
import noTypes from './rules/noTypes.js';
import noUndefinedTypes from './rules/noUndefinedTypes.js';
import requireAsteriskPrefix from './rules/requireAsteriskPrefix.js';
import requireDescription from './rules/requireDescription.js';
import requireDescriptionCompleteSentence from './rules/requireDescriptionCompleteSentence.js';
import requireExample from './rules/requireExample.js';
import requireFileOverview from './rules/requireFileOverview.js';
import requireHyphenBeforeParamDescription from './rules/requireHyphenBeforeParamDescription.js';
import requireJsdoc from './rules/requireJsdoc.js';
import requireParam from './rules/requireParam.js';
import requireParamDescription from './rules/requireParamDescription.js';
import requireParamName from './rules/requireParamName.js';
import requireParamType from './rules/requireParamType.js';
import requireProperty from './rules/requireProperty.js';
import requirePropertyDescription from './rules/requirePropertyDescription.js';
import requirePropertyName from './rules/requirePropertyName.js';
import requirePropertyType from './rules/requirePropertyType.js';
import requireReturns from './rules/requireReturns.js';
import requireReturnsCheck from './rules/requireReturnsCheck.js';
import requireReturnsDescription from './rules/requireReturnsDescription.js';
import requireReturnsType from './rules/requireReturnsType.js';
import requireThrows from './rules/requireThrows.js';
import requireYields from './rules/requireYields.js';
import requireYieldsCheck from './rules/requireYieldsCheck.js';
import sortTags from './rules/sortTags.js';
import tagLines from './rules/tagLines.js';
import textEscaping from './rules/textEscaping.js';
import validTypes from './rules/validTypes.js';

/**
 * @type {import('eslint').ESLint.Plugin & {
 *   configs: Record<
 *     "recommended"|"recommended-error"|"recommended-typescript"|
 *       "recommended-typescript-error"|"recommended-typescript-flavor"|
 *       "recommended-typescript-flavor-error"|"flat/recommended"|
 *       "flat/recommended-error"|"flat/recommended-typescript"|
 *       "flat/recommended-typescript-error"|
 *       "flat/recommended-typescript-flavor"|
 *       "flat/recommended-typescript-flavor-error",
 *     import('eslint').Linter.FlatConfig
 *   >
 * }}
 */
const index = {
  // @ts-expect-error Ok
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
    'imports-as-dependencies': importsAsDependencies,
    'informative-docs': informativeDocs,
    'match-description': matchDescription,
    'match-name': matchName,
    'multiline-blocks': multilineBlocks,
    'no-bad-blocks': noBadBlocks,
    'no-blank-block-descriptions': noBlankBlockDescriptions,
    'no-blank-blocks': noBlankBlocks,
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

/**
 * @param {"warn"|"error"} warnOrError
 * @param {boolean} [flat]
 * @returns {import('eslint').Linter.FlatConfig}
 */
const createRecommendedRuleset = (warnOrError, flat) => {
  return {
    // @ts-expect-error Ok
    plugins: flat ? {
      jsdoc: index,
    } : [
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
      'jsdoc/imports-as-dependencies': 'off',
      'jsdoc/informative-docs': 'off',
      'jsdoc/match-description': 'off',
      'jsdoc/match-name': 'off',
      'jsdoc/multiline-blocks': warnOrError,
      'jsdoc/no-bad-blocks': 'off',
      'jsdoc/no-blank-block-descriptions': 'off',
      'jsdoc/no-blank-blocks': 'off',
      'jsdoc/no-defaults': warnOrError,
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

/**
 * @param {"warn"|"error"} warnOrError
 * @param {boolean} [flat]
 * @returns {import('eslint').Linter.FlatConfig}
 */
const createRecommendedTypeScriptRuleset = (warnOrError, flat) => {
  const ruleset = createRecommendedRuleset(warnOrError, flat);

  return {
    ...ruleset,
    rules: {
      ...ruleset.rules,
      /* eslint-disable indent -- Extra indent to avoid use by auto-rule-editing */
        'jsdoc/check-tag-names': [
          warnOrError, {
            typed: true,
          },
        ],
        'jsdoc/no-types': warnOrError,
        'jsdoc/no-undefined-types': 'off',
        'jsdoc/require-param-type': 'off',
        'jsdoc/require-property-type': 'off',
        'jsdoc/require-returns-type': 'off',
      /* eslint-enable indent */
    },
  };
};

/**
 * @param {"warn"|"error"} warnOrError
 * @param {boolean} [flat]
 * @returns {import('eslint').Linter.FlatConfig}
 */
const createRecommendedTypeScriptFlavorRuleset = (warnOrError, flat) => {
  const ruleset = createRecommendedRuleset(warnOrError, flat);

  return {
    ...ruleset,
    rules: {
      ...ruleset.rules,
      /* eslint-disable indent -- Extra indent to avoid use by auto-rule-editing */
        'jsdoc/no-undefined-types': 'off',
      /* eslint-enable indent */
    },
  };
};

/* c8 ignore next 3 -- TS */
if (!index.configs) {
  throw new Error('TypeScript guard');
}

index.configs.recommended = createRecommendedRuleset('warn');
index.configs['recommended-error'] = createRecommendedRuleset('error');
index.configs['recommended-typescript'] = createRecommendedTypeScriptRuleset('warn');
index.configs['recommended-typescript-error'] = createRecommendedTypeScriptRuleset('error');
index.configs['recommended-typescript-flavor'] = createRecommendedTypeScriptFlavorRuleset('warn');
index.configs['recommended-typescript-flavor-error'] = createRecommendedTypeScriptFlavorRuleset('error');

index.configs['flat/recommended'] = createRecommendedRuleset('warn', true);
index.configs['flat/recommended-error'] = createRecommendedRuleset('error', true);
index.configs['flat/recommended-typescript'] = createRecommendedTypeScriptRuleset('warn', true);
index.configs['flat/recommended-typescript-error'] = createRecommendedTypeScriptRuleset('error', true);
index.configs['flat/recommended-typescript-flavor'] = createRecommendedTypeScriptFlavorRuleset('warn', true);
index.configs['flat/recommended-typescript-flavor-error'] = createRecommendedTypeScriptFlavorRuleset('error', true);

export default index;
