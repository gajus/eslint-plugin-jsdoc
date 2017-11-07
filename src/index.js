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
    'check-param-names': 0,
    'check-tag-names': 0,
    'check-types': 0,
    'newline-after-description': 0,
    'require-description-complete-sentence': 0,
    'require-example': 0,
    'require-hyphen-before-param-description': 0,
    'require-param': 0,
    'require-param-description': 0,
    'require-param-name': 0,
    'require-param-type': 0,
    'require-returns-description': 0,
    'require-returns-type': 0
  }
};
