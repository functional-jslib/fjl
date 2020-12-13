/**
 * Created by Ely on 1/21/2015.
 * @module stringLengthValidator
 */
import {getErrorMsgByKey, toValidationResult, ValidatorResult} from './ValidationUtils';
import {assignDeep, curry, curry2, isString, typeOf} from 'fjl';
import {LenValidatorOptions, toLengthOptions} from "./lengthValidator";

export const

  /**
   * Normalizes (ensures has expected properties) `stringLengthValidator`'s options.
   */
  toStringLengthOptions = (options?: LenValidatorOptions<string>): LenValidatorOptions<string> => {
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
   */
  $stringLengthValidatorNoNormalize = <T>(options: LenValidatorOptions<T>, value: T): ValidatorResult => {
    const messages = [],
      isOfType = isString(value),
      valLength = isOfType ? (value as unknown as string).length : 0,
      isWithinRange = valLength >= options.min && valLength <= options.max;
    if (!isOfType) {
      messages.push(getErrorMsgByKey(options, 'NOT_OF_TYPE', value));
    } else if (!isWithinRange) {
      messages.push(getErrorMsgByKey(options, 'NOT_WITHIN_RANGE', value));
    }
    return toValidationResult({
      result: isOfType && isWithinRange,
      messages,
      value
    });
  },

  stringLengthValidatorNoNormalize = curry2($stringLengthValidatorNoNormalize),

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
