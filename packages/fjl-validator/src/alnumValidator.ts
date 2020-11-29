/**
 * Created by Ely on 1/21/2015.
 * Module for validating alpha-numeric values.
 * @module alnumValidator
 */
import {regexValidator} from './regexValidator';
import {curry, assignDeep} from 'fjl';

export const

    /**
     * @function module:alnumValidator.alnumValidator
     * @param options {Object}
     * @param value {*}
     * @returns {Object}
     */
    alnumValidator = curry((options, value) =>
        regexValidator(assignDeep({
            pattern: /^[\da-z]+$/i,
            messageTemplates: {
                DOES_NOT_MATCH_PATTERN: x =>
                    `Value is not alpha-numeric.  Value received: '${x}'.`
            }
        }, options), value)
    ),

    /**
     * Same as `alnumValidator` though doesn't-require-`options`/ignores parameter.
     * @function module:alnumValidator.alnumValidator1
     * @param value {*}
     * @returns {Object}
     */
    alnumValidator1 = value => alnumValidator(null, value)

;

export default alnumValidator;
