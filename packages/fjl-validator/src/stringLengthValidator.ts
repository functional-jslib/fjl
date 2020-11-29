/**
 * Created by Ely on 1/21/2015.
 * @module stringLengthValidator
 */
import {toValidationResult, getErrorMsgByKey} from './ValidationUtils';
import {typeOf, isString, assignDeep, curry} from 'fjl';
import {toLengthOptions} from "./lengthValidator";

export const

    /**
     * Normalizes (ensures has expected properties) `stringLengthValidator`'s options.
     * @function module:stringLengthValidator.toStringLengthOptions
     * @param options {Object}
     * @returns {Object}
     */
    toStringLengthOptions = options => {
        const _options = {
            messageTemplates: {
                NOT_OF_TYPE: (value) => `Value is not a String.  ` +
                    `Value type received: ${typeOf(value)}.  ` +
                    `Value received: "${value}".`
            }
        };
        return toLengthOptions(
            options ? assignDeep(_options, options) : _options
        );
    },

    /**
     * Same as `stringLengthValidator` except doesn't normalize the incoming options.
     * Useful for cases where you have to call `toStringLengthValidator` options from outside of the `stringLengthValidator` call (
     *  helps eliminate one call in this case).  Also useful for extreme cases (cases where you have hundreds of validators
     *  and want to pull out every ounce of performance from them possible).
     * @function module:stringLengthValidator.stringLengthValidatorNoNormalize
     * @param options {Object}
     * @param value {*}
     * @returns {Object}
     */
    stringLengthValidatorNoNormalize = curry((options, value) => {
        const messages = [],
            isOfType = isString(value),
            valLength = isOfType ? value.length : 0,
            isWithinRange = valLength >= options.min && valLength <= options.max;
        if (!isOfType) {
            messages.push(getErrorMsgByKey(options, 'NOT_OF_TYPE', value));
        }
        else if (!isWithinRange) {
            messages.push(getErrorMsgByKey(options, 'NOT_WITHIN_RANGE', value));
        }
        return toValidationResult({
            result: isOfType && isWithinRange,
            messages,
            value
        });
    }),

    /**
     * @function module:stringLengthValidator.stringLengthValidator
     * @param options {Object}
     * @param value {*}
     * @returns {Object}
     */
    stringLengthValidator = curry((options, value) =>
        stringLengthValidatorNoNormalize(toStringLengthOptions(options), value))

;

export default stringLengthValidator;
