/**
 * Created by Ely on 1/21/2015.
 * @module lengthValidator
 * @todo Allow validator option generators to receive `zero` object (object on which to extend on).
 * @todo Allow validator option generators to receive more than one options object.
 */
import {toValidationResult, getErrorMsgByKey, toValidationOptions, isOneOf} from './ValidationUtils';
import {typeOf, assignDeep, curry, defineEnumProps} from 'fjl';

export const

    /**
     * Normalizes `lengthValidator` options.
     * @function module:lengthValidator.toLengthOptions
     * @param options {Object}
     * @returns {Object}
     */
    toLengthOptions = options => {
        const _options = defineEnumProps([
            [Number, 'min', 0],
            [Number, 'max', Number.MAX_SAFE_INTEGER]
        ], toValidationOptions());
        _options.messageTemplates = {
            NOT_OF_TYPE: value => `Value does not have a \`length\` property.  ` +
                `Type received: \`${typeOf(value)}\`.  ` +
                `Value received: \`${value}\`.`,
            NOT_WITHIN_RANGE: (value, ops) => `Value's length is not within range ` +
                `${ops.min} to ${ops.max}.  ` +
                `Evaluated length is \`${value.length}\`.  ` +
                `Value received: \`${value}\`.`
        };
        return options ? assignDeep(_options, options) : _options;
    },

    /**
     * Validates whether given value has a length and whether length is between
     *  given range (if given) but doesn't normalize options.
     *  (@see `toLengthOptions` for range props).
     * @function module:lengthValidator.lengthValidatorNoNormalize
     * @param options {Object}
     * @param value {*}
     * @returns {Object}
     */
    lengthValidatorNoNormalize = curry((options, value) => {
        const messages = [];
        let valLength,
            isWithinRange,
            result = false
        ;
        if (isOneOf(value, 'Null', 'Undefined', 'NaN', 'Symbol') || !value.hasOwnProperty('length')) {
            messages.push(getErrorMsgByKey(options, 'NOT_OF_TYPE', value));
            return toValidationResult({result, messages, value});
        }
        valLength = value.length;
        isWithinRange = valLength >= options.min && valLength <= options.max;
        if (!isWithinRange) {
            messages.push(getErrorMsgByKey(options, 'NOT_WITHIN_RANGE', value));
        }
        else {
            result = true;
        }
        return toValidationResult({
            result,
            messages,
            value
        });
    }),

    /**
     * Validates whether given value has a length and whether length is between
     *  given range (if given).  Same as `lengthValidatorNoNormalize` except normalizes incoming options.
     *  (@see `toLengthOptions` for more on options).
     * @function module:lengthValidator.lengthValidator
     * @param options {Object}
     * @param value {*}
     * @returns {Object}
     */
    lengthValidator = curry((options, value) => {
        return lengthValidatorNoNormalize(toLengthOptions(options), value);
    })
;

export default lengthValidator;
