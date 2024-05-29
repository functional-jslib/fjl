/**
 * Module for validating a value by regular expression.
 * @module regexValidator
 */
import {
  getErrorMsgByKey,
  toValidationOptions,
  toValidationResult,
  ValidatorOptions,
  ValidatorResult
} from './ValidationUtils';
import {assignDeep, curry, defineEnumProp} from 'fjl';

export interface RegexValidatorOptions<T=string> extends ValidatorOptions<T> {
  pattern?: RegExp;
}

export const

  /**
   * Normalizes `regexValidator` options.
   */
  toRegexValidatorOptions = <T = any>(options: ValidatorOptions<T>): RegexValidatorOptions<T> => {
    const [_options] = defineEnumProp(RegExp, toValidationOptions(), 'pattern', /./);
    _options.messageTemplates = {
      DOES_NOT_MATCH_PATTERN: <T = any>(value, ops: RegexValidatorOptions<T>): string =>
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
  regexValidatorNoNormalize = curry(<T>(options: RegexValidatorOptions<T>, value: T): ValidatorResult => {
    const result = options.pattern.test(value + ''),

      // If test failed
      messages = !result ?
        [getErrorMsgByKey(options, 'DOES_NOT_MATCH_PATTERN', value)] :
        [];

    return toValidationResult({result, messages, value});
  }),

  /**
   * Validates a value with the regex `pattern` option passed in.
   * @function module:regexValidator.regexValidator
   * @param options {Object}
   * @param value {*}
   * @returns {Object}
   */
  regexValidator = curry(<T>(options: RegexValidatorOptions<T>, value: T): ValidatorResult => regexValidatorNoNormalize(toRegexValidatorOptions(options), value))

;
