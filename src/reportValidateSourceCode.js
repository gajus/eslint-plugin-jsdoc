import jscs from 'jscs';
import _ from 'lodash';

let checker,
    reportValidateSourceCode,
    validateSourceCode;

checker = new jscs();
checker.configure({
    "esnext": true,
    "plugins": [
        require.resolve('jscs-jsdoc'),
    ]
});

/**
 * @typedef {Object} validateRule~error
 * @property {String} message
 * @property {Number} line
 * @property {Number} column
 */

/**
 * Validates a source code using a specific jscs-jsdoc rule and return an array of errors.
 *
 * @param {String} sourceCode
 * @param {String} ruleName
 * @param {Boolean|String|Object} ruleOptions
 * @returns {validateRule~error[]}
 */
validateSourceCode = (sourceCode, ruleName, ruleOptions) => {
    let results,
        errors;

    // console.log('ruleName', ruleName, 'ruleOptions', ruleOptions);

    checker.configure({
        "jsDoc": {
            [ruleName]: ruleOptions
        }
    });

    // console.log('checker._configuredRules', checker._configuredRules);

    results = checker.checkString(sourceCode);

    errors = results.getErrorList();

    // console.log('errors', errors);

    errors = _.map(errors, (error) => {
        return {
            message: error.message,
            line: error.line,
            column: error.column
        };
    });

    // console.log('errors', errors);

    return errors;
};

/**
 * @param {Object} context
 * @param {String} ruleName
 * @param {Boolean|String|Object} ruleOptions
 * @returns {undefined}
 */
reportValidateSourceCode = (context, ruleName, ruleOptions) => {
    let errors,
        sourceCode;

    sourceCode = context.getSourceCode().text;

    errors = validateSourceCode(sourceCode, ruleName, ruleOptions);

    // console.log('errors', errors, sourceCode, ruleName, ruleOptions);

    _.forEach(errors, (error) => {
        let node;

        node = {
            loc: {
                start: {
                    line: error.line,
                    // "Ah... the parser (espree) is using 0-based column and eslint is using 1-based column, so context.report is 0-based then eslint transforms it to 1-based."
                    // @see https://gitter.im/eslint/eslint?at=55fc8a81463feefb419d4798
                    column: error.column - 1
                }
            }
        };

        // console.log('node', node)

        context.report(node, error.message);
    });
};

export default reportValidateSourceCode;
