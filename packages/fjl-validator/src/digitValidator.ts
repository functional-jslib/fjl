/**
 * Created by Ely on 1/21/2015.
 * Module for validating digits.
 * @module digitValidator
 */
import {regexValidator} from './regexValidator';
import {curry, assignDeep} from 'fjl';

export const

    /**
     * @function module:digitValidator.digitValidator
     * @param options {Object}
     * @param value {*}
     * @returns {Object}
     */
    digitValidator = curry((options, value) => regexValidator(assignDeep({
        pattern: /^\d+$/,
        messageTemplates: {
            DOES_NOT_MATCH_PATTERN: x =>
                `The value passed in contains non digital characters.  ` +
                `Value received: "${x}".`
        }
    }, options), value)),

    /**
     * Same as `digitValidator` though doesn't-require/ignores `options` parameter.
     * @function module:digitValidator.digitValidator1
     * @param value {*}
     * @returns {Object}
     */
    digitValidator1 = value => digitValidator(null, value);

export default digitValidator;
