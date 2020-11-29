/**
 * Created by Ely on 7/21/2014.
 * Initial idea borrowed from Zend Framework 2's Zend/Validator
 * @module ValidationUtils
 */
import {assignDeep, call, isFunction, isString, repeat,
    curry, toTypeRefName, typeOf, defineEnumProps} from 'fjl';

export const

    /**
     * Default value obscurator.
     * @function module:ValidationUtils.defaultValueObscurator
     * @param x {*} - Value to obscurate.
     * @returns {String} - Obscurated value.
     */
    defaultValueObscurator = x => repeat((x + '').length, '*'),

    /**
     * Gets an error message by `messageTemplates` key from `options` object.
     * @function module:ValidationUtils.getErrorMsgByKey
     * @param options {Object}
     * @param key {(String|Function)}
     * @param value {*}
     * @returns {String|undefined} - Error message if successfully resolved one else `undefined`.
     * @curried
     */
    getErrorMsgByKey = curry((options, key, value) => {
        let message;
        const {messageTemplates, valueObscured, valueObscurator} = options,
            _value = valueObscured ? valueObscurator(value) : value;
        if (isFunction(key)) {
            message = call(key, _value, options);
        }
        else if (!isString(key) || !messageTemplates || !messageTemplates[key]) {
            return;
        }
        else if (isFunction(messageTemplates[key])) {
            message = call(messageTemplates[key], _value, options);
        }
        else {
            message = messageTemplates[key];
        }
        return message;
    }),

    /**
     * Returns a strongly typed/normalized ValidatorOptions object.
     * @function module:ValidationUtils.toValidationOptions
     * @param options {...Object}
     * @returns {Object}
     */
    toValidationOptions = (...options) =>
        assignDeep(defineEnumProps([
            [Object, 'messageTemplates', {}],
            [Boolean, 'valueObscured', false],
            [Function, 'valueObscurator', defaultValueObscurator]
        ], {}), ...(options.length ? options : [{}])),

    /**
     * Returns a strongly typed, normalized validation result object.
     * @function module:ValidationUtils.toValidationResult
     * @param options {...Object}
     * @returns {*}
     */
    toValidationResult = (...options) =>
        assignDeep(defineEnumProps([
                [Boolean, 'result', false],
                [Array, 'messages', []]
            ], {}),
            {value: undefined},
            ...(options.length ? options : [{}])
        ),

    isOneOf = (x, ...types) => {
        const typeName = typeOf(x);
        return types
            .map(toTypeRefName)
            .some(name => typeName === name);
    }

;

export default toValidationResult;
