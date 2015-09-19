import checkParamNames from './rules/checkParamNames';
import checkRedundantParams from './rules/checkRedundantParams';
import checkRedundantReturns from './rules/checkRedundantReturns';
import checkReturnTypes from './rules/checkReturnTypes';
import newlineAfterDescription from './rules/newlineAfterDescription';
import requireDescriptionCompleteSentence from './rules/requireDescriptionCompleteSentence';
import requireParamDescription from './rules/requireParamDescription';
import requireParamTypes from './rules/requireParamTypes';
import requireReturnTypes from './rules/requireReturnTypes';

export default {
    rules: {
        'check-param-names': checkParamNames,
        'check-redundant-params': checkRedundantParams,
        'check-redundant-returns': checkRedundantReturns,
        'check-return-types': checkReturnTypes,
        'newline-after-description': newlineAfterDescription,
        'require-description-complete-sentence': requireDescriptionCompleteSentence,
        'require-param-description': requireParamDescription,
        'require-param-types': requireParamTypes,
        'require-return-types': requireReturnTypes,
    },
    rulesConfig: {
        'check-param-names': 0,
        'check-redundant-params': 0,
        'check-redundant-returns': 0,
        'check-return-types': 0,
        'newline-after-description': 0,
        'require-description-complete-sentence': 0,
        'require-param-description': 0,
        'require-param-types': 0,
        'require-return-types': 0,
    }
};
