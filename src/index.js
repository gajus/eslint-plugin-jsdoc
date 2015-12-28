import checkParamNames from './rules/checkParamNames';
import checkTagNames from './rules/checkTagNames';
import checkTypes from './rules/checkTypes';
import newlineAfterDescription from './rules/newlineAfterDescription';
import requireHyphenBeforeDescription from './rules/requireHyphenBeforeDescription';
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
        'require-hyphen-before-description': requireHyphenBeforeDescription,
        'require-param': requireParam,
        'require-param-description': requireParamDescription,
        'require-param-type': requireParamType,
        'require-returns-description': requireReturnsDescription,
        'require-returns-type': requireReturnsType
    },
    rulesConfig: {
        'check-param-names': 0,
        'check-tag-names': 0,
        'check-types': 0,
        'newline-after-description': 0,
        'require-hyphen-before-description': 0,
        'require-param': 0,
        'require-param-description': 0,
        'require-param-type': 0,
        'require-returns-description': 0,
        'require-returns-type': 0
    }
};
