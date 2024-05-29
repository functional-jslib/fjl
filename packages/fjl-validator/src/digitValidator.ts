/**
 * Module for validating digits.
 * @module digitValidator
 */
import {regexValidator} from './regexValidator';
import {assignDeep, curry2} from 'fjl';
import {ValidatorOptions, ValidatorResult} from "./ValidationUtils";

export const

  $digitValidator = <T>(options: ValidatorOptions<T>, value: T): ValidatorResult => regexValidator(assignDeep({
    pattern: /^\d+$/,
    messageTemplates: {
      DOES_NOT_MATCH_PATTERN: x =>
        `The value passed in contains non digital characters.  ` +
        `Value received: "${x}".`
    }
  }, options), value),

  digitValidator = curry2($digitValidator),

  /**
   * Same as `digitValidator` though doesn't-require/ignores `options` parameter.
   * @function module:digitValidator.digitValidator1
   * @param value {*}
   * @returns {Object}
   */
  digitValidator1 = value => digitValidator(null, value);
