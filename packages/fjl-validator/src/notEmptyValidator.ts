/**
 * Created by Ely on 7/21/2014.
 * @module notEmptyValidator
 */
import {toValidationResult, toValidationOptions, getErrorMsgByKey} from './ValidationUtils';
import {isEmpty, curry} from 'fjl';

export const

    /**
     * Normalizes incoming options so that they are valid `notEmptyValidator` options.
     * @note currently `notEmptyValidator` only takes the `messageTemplates` option (may
     *  have more options in the future).
     * @function module:notEmptyValidator.toNotEmptyOptions
     * @param options {Object}
     * @returns {Object}
     */
    toNotEmptyOptions = options =>
        toValidationOptions({
            messageTemplates: {
                EMPTY_NOT_ALLOWED: () =>
                    'Empty values are not allowed.'
            }
        }, options),

    /**
     * Validates whether incoming `value` is empty* or not also doesn't normalize the passed in
     * options parameter (since currently `notEmptyValidator` has no options other than it's `messageTemplates`
     * field). * 'empty' in our context means one of `null`, `undefined`, empty lists (strings/arrays) (`x.length === 0`), `false`, empty object (obj with `0` enumerable props), and empty collection/iterable object (`Map`, `Set` etc.), NaN,
     * Also this method is useful when the user, themselves, have to call `toNotEmptyOptions` for a specific reason.
     * @function module:notEmptyValidator.notEmptyValidatorNoNormalize
     * @param options {Object}
     * @param value {*}
     * @returns {*}
     */
    notEmptyValidatorNoNormalize = curry((options, value) => {
        const result = isEmpty(value),
            // If test failed
            messages = result ? [getErrorMsgByKey(
                options, 'EMPTY_NOT_ALLOWED', value
            )] : [];
        return toValidationResult({result: !result, messages, value});
    }),

    /**
     * Returns a validation result indicating whether give `value`
     * is an empty* value or not (*@see `notEmptyValidatorNoNormalize` for more about
     * empties).
     * @function module:notEmptyValidator.notEmptyValidator
     * @param options {Object}
     * @param value {*}
     * @returns {Object}
     */
    notEmptyValidator = curry((options, value) =>
        notEmptyValidatorNoNormalize(toNotEmptyOptions(options), value)),

    /**
     * Same as `notEmptyValidator` except doesn't require first parameter ("options" parameter). (*@see `notEmptyValidatorNoNormalize` for more about
     * empties).
     * @function module:notEmptyValidator.notEmptyValidator1
     * @param value {*}
     * @returns {Object}
     */
    notEmptyValidator1 = value => notEmptyValidatorNoNormalize(null, value)

;

export default notEmptyValidator;
