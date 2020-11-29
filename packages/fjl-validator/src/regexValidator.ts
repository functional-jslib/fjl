/**
 * Created by Ely on 7/21/2014.
 * Module for validating a value by regular expression.
 * @module regexValidator
 */
import {toValidationResult, toValidationOptions, getErrorMsgByKey}
    from './ValidationUtils';
import {curry, assignDeep, defineEnumProp} from 'fjl';

export const

    /**
     * Normalizes `regexValidator` options.
     * @function module:regexValidator.toRegexValidatorOptions
     * @param options {Object}
     * @returns {Object}
     */
    toRegexValidatorOptions = options => {
        const [_options] = defineEnumProp(RegExp, toValidationOptions(), 'pattern', /./);
        _options.messageTemplates = {
            DOES_NOT_MATCH_PATTERN: (value, ops) =>
                'The value passed in does not match pattern"'
                + ops.pattern + '".  Value passed in: "'
                + value + '".'
        };
        return options ? assignDeep(_options, options) : _options;
    },

    /**
     * Same as `regexValidator` except this version is not curried and doesn't normalize incoming `options` parameter.
     * @note Useful when the user has a need for calling `toRegexValidatorOptions`
     *  externally/from-outside-the-`regexValidator` call (helps to remove that one extra call in this case (since
     *  `regexValidator` calls `toRegexValidatorOptions` internally)).
     * @function module:regexValidator.regexValidatorNoNormalize
     * @param options {Object}
     * @param value {*}
     * @returns {*}
     */
    regexValidatorNoNormalize = curry((options, value) => {
        const result = options.pattern.test(value),

            // If test failed
            messages = !result ?
                [getErrorMsgByKey(options, 'DOES_NOT_MATCH_PATTERN', value)] :
                [];

        return toValidationResult({ result, messages, value });
    }),

    /**
     * Validates a value with the regex `pattern` option passed in.
     * @function module:regexValidator.regexValidator
     * @param options {Object}
     * @param value {*}
     * @returns {Object}
     */
    regexValidator = curry((options, value) => regexValidatorNoNormalize(toRegexValidatorOptions(options), value))

;

export default regexValidator;
