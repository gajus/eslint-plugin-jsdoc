import checkParamNames from './rules/checkParamNames';
import checkRedundantParams from './rules/checkRedundantParams';
import checkRedundantReturns from './rules/checkRedundantReturns';
import checkReturnsTypes from './rules/checkReturnsTypes';
import checkTypes from './rules/checkTypes';
import newlineAfterDescription from './rules/newlineAfterDescription';
import requireDescriptionCompleteSentence from './rules/requireDescriptionCompleteSentence';
import requireParam from './rules/requireParam';
import requireParamDescription from './rules/requireParamDescription';
import requireParamTypes from './rules/requireParamTypes';
import requireReturnsDescription from './rules/requireReturnsDescription';
import requireReturnsTypes from './rules/requireReturnsTypes';

export default {
    rules: {
        'check-param-names': checkParamNames,
        'check-redundant-params': checkRedundantParams,
        'check-redundant-returns': checkRedundantReturns,
        'check-returns-types': checkReturnsTypes,
        'check-types': checkTypes,
        'newline-after-description': newlineAfterDescription,
        'require-description-complete-sentence': requireDescriptionCompleteSentence,
        'require-param': requireParam,
        'require-param-description': requireParamDescription,
        'require-param-types': requireParamTypes,
        'require-returns-description': requireReturnsDescription,
        'require-returns-types': requireReturnsTypes,
    },
    rulesConfig: {
        'check-param-names': 0,
        'check-redundant-params': 0,
        'check-redundant-returns': 0,
        'check-returns-types': 0,
        'check-types': 0,
        'newline-after-description': 0,
        'require-description-complete-sentence': 0,
        'require-param': 0,
        'require-param-description': 0,
        'require-param-types': 0,
        'require-returns-description': 0,
        'require-returns-types': 0
    }
};
