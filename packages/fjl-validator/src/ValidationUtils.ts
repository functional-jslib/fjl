/**
 * Created by Ely on 7/21/2014.

 * Initial idea borrowed from Zend Framework 2's Zend/Validator
 * @module ValidationUtils
 */
import {
  assignDeep,
  call,
  curry,
  defineEnumProps,
  isFunction,
  isString,
  repeat,
  toTypeRefName,
  typeOf,
  TypeRef,
  UnaryOf
} from 'fjl';

export type MessageGetter<T = any> = (x?: T, options?: ValidatorOptions<T>) => string;

export type MessageTemplateRValue<T = any> = string | MessageGetter<T>;

export interface MessageTemplates<T = any> {
  [index: string]: MessageTemplateRValue<T>;
}

export interface ValidatorOptions<T = any> {
  messageTemplates?: MessageTemplates<T>;
  valueObscured?: boolean;
  valueObscurer?: <T>(x: T) => string;
}

export interface ValidatorResult<T = any> {
  result: boolean;
  messages?: string[];
  value?: T;
}

export type Validator<T> = UnaryOf<T, ValidatorResult>;

export const

  /**
   * Default value obscurer.
   */
  defaultValueObscurer = <T>(x: T): string => repeat((x + '').length, '*') as unknown as string,

  $getErrorMsgByKey = <T, Options extends ValidatorOptions<T>>(
    options: Options, key: keyof MessageTemplates<T> | MessageGetter<T>, value: T): string | undefined => {
    let message;
    const {messageTemplates, valueObscured, valueObscurer} = options,
      _value = valueObscured ? valueObscurer(value) : value,
      _keyAsKey = key as keyof MessageTemplates<T>;
    if (isFunction(key)) {
      message = call(key as MessageGetter<T>, _value, options);
    } else if (!isString(key) || !messageTemplates || !messageTemplates[_keyAsKey]) {
      return;
    } else if (isFunction(messageTemplates[_keyAsKey])) {
      message = call(messageTemplates[_keyAsKey] as MessageGetter<T>, _value, options);
    } else {
      message = messageTemplates[_keyAsKey];
    }
    return message;
  },

  /**
   * Gets an error message by `messageTemplates` key from `options` object.
   * @curried
   */
  getErrorMsgByKey = curry($getErrorMsgByKey),

  /**
   * Returns a strongly typed/normalized ValidatorOptions object.
   * @function module:ValidationUtils.toValidationOptions
   * @param options {...Object}
   * @returns {Object}
   */
  toValidationOptions = <T = any>(...options: ValidatorOptions<T>[]): ValidatorOptions<T> =>
    assignDeep(defineEnumProps([
      [Object, 'messageTemplates', {}],
      [Boolean, 'valueObscured', false],
      [Function, 'valueObscurer', defaultValueObscurer]
    ], {}), ...(options.length ? options : [{}])),

  /**
   * Returns a strongly typed, normalized validation result object.
   */
  toValidationResult = (...options: ValidatorResult[]): ValidatorResult =>
    assignDeep(defineEnumProps([
        [Boolean, 'result', false],
        [Array, 'messages', []]
      ], {}),
      {value: undefined},
      ...(options.length ? options : [{}])
    ),

  isOneOf = <T>(x: T, ...types: TypeRef[]): boolean => {
    const typeName = typeOf(x);
    return types
      .map(toTypeRefName)
      .some(name => typeName === name);
  }

;

export default toValidationResult;
