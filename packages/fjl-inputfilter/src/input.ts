/**
 * Created by Ely on 7/24/2014.
 */
import {
  assign, compose, defineEnumProps, isArray, isset,
  isString, Slice, Unary, error as defaultErrorHandler
} from 'fjl';
import {
  defaultValueObscurer,
  notEmptyValidator,
  toValidationOptions,
  toValidationResult,
  Validator,
  ValidatorOptions,
  ValidatorResult
} from 'fjl-validator';

export interface InputValidationResult<T = any> {
  result: boolean;
  name?: string;
  messages?: string[];
  value?: T;
  rawValue?: T;
  obscuredValue?: string;
  filteredValue?: T;
}

export interface InputOptions<T = any> extends ValidatorOptions<T> {
  name?: string;
  required?: boolean;
  breakOnFailure?: boolean;
  valueObscured?: boolean;
  valueObscurer?: Unary<T, string>;
  filters?: Unary<T, any>[];
  validators?: Unary<T, ValidatorResult>[];
}

export const

  noValidationRequired = <T>(input: InputOptions<T>, value: T): boolean =>
    !input.required && (
      !isset(value) || (
        (isString(value) || isArray(value)) &&
        !(value as Slice).length
      )
    ),

  /**
   * Validates an input object based.
   */
  validateInput = <T>(input: Input<T>, value: T): InputValidationResult<T> => {
    const {
      validators, filters, breakOnFailure,
      valueObscured, valueObscurer, name
    } = input;

    // If value is not required and is `null` or `undefined`
    if (noValidationRequired(input, value)) {
      return toInputValidationResult({
        result: true,
        name: name || '',
        rawValue: value,
        value,
        filteredValue: value,
        obscuredValue: value + ''
      });
    }

    // Run validation and filtering
    const vResult = runValidators(validators, breakOnFailure, value),
      fResult = runFilters(filters, value),
      oResult = valueObscured && valueObscurer ? valueObscurer(fResult) : fResult;

    return toInputValidationResult(assign(vResult, {
      name: name || '',
      rawValue: value,
      value: fResult,
      filteredValue: fResult,
      obscuredValue: oResult + ''
    }));
  },

  /**
   * Validates an input object that may have IOValidators.  Returns
   * a validation result wrapped in a promise.
   */
  validateIOInput = <T>(inputStruct: InputOptions<T>, value: T): Promise<InputValidationResult<T>> => {
    const {
      validators, filters, breakOnFailure,
      valueObscured, valueObscurer
    } = inputStruct;

    // If not required and value is `null` or `undefined` return truthy result
    if (noValidationRequired(inputStruct, value)) {
      return Promise.resolve(
        toInputValidationResult({
          result: true,
          name: inputStruct.name || '',
          rawValue: value,
          value,
          filteredValue: value,
          obscuredValue: value + ''
        })
      );
    }

    return (validators && validators.length ?
        runIOValidators(validators, breakOnFailure, value, inputStruct) :
        Promise.resolve({result: true} as InputValidationResult<T>)
    )
      .then(result =>
        runIOFilters(filters, value)
          .then(filteredValue => {
            result.rawValue = value;
            result.value = result.filteredValue = filteredValue;
            result.obscuredValue =
              valueObscured && valueObscurer ?
                valueObscurer(filteredValue) : filteredValue;
            return toInputValidationResult(result);
          })
      );
  },

  /**
   * Runs validator against given `value`.
   */
  runValidators = <T>(validators: Unary<T, ValidatorResult<T>>[], breakOnFailure: boolean, value: T): InputValidationResult<T> => {
    let result = true,
      i = 0;
    const messageResults = [];
    if (!validators || !validators.length) {
      return toValidationResult({result});
    }
    const limit = validators.length;
    for (; i < limit; i++) {
      const vResult = validators[i](value);
      if (!vResult.result) {
        messageResults.push(...vResult.messages);
        result = false;
        if (breakOnFailure) {
          break;
        }
      }
    }
    return toValidationResult({result, messages: messageResults});
  },

  /**
   * Runs (possibly) IOValidators against given `value`.
   */
  runIOValidators = <T>(
    validators: Validator<T>[],
    breakOnFailure: boolean,
    value?: T,
    errorCallback = defaultErrorHandler
  ): Promise<InputValidationResult> => {
    if (!validators || !validators.length) {
      return Promise.resolve(toValidationResult({result: true}));
    }
    const limit = validators.length,
      pendingResults = [];
    let i = 0,
      result = true;
    for (; i < limit; i++) {
      const validator = validators[i],
        vResult = validator(value);
      if (vResult instanceof Promise) {
        pendingResults.push(vResult.catch(errorCallback));
        continue;
      }
      pendingResults.push(vResult);
      if (!vResult.result) {
        result = false;
        if (breakOnFailure) {
          break;
        }
      }
    }

    return Promise.all(pendingResults)
      .then(results => {
        const failedResults = results.filter(rslt => !rslt.result),
          interimResult = {
            result,
            messages: failedResults.reduce((agg, item) =>
              agg.concat(item.messages), [])
          };
        if (failedResults.length) {
          interimResult.result = false;
        }
        return toValidationResult(interimResult);
      })
      .catch(errorCallback);
  },

  /**
   * Runs filters on value (successively).
   */
  runFilters = <T = any>(filters: Unary<T, any>[], value: T): T | any => filters && filters.length ?
    compose(...filters)(value) : value,

  /**
   * Runs filters on value (successively) and returns result wrapped in a promise.
   */
  runIOFilters = <T = any>(
    filters: Unary<T, any>[],
    value: T, errorCallback = defaultErrorHandler
  ): Promise<T | any> =>
    Promise.resolve(value)
      .then(x1 => runFilters(
      filters ? filters.map(filter => (x: any): Promise<any> =>
        Promise.resolve(x).then(filter)) : null,
      x1
    )).catch(errorCallback),

  /**
   * Returns an `InputOptions` object from given object and optionally turns the `out` object into
   * said `InputOptions` with firstParam assigned on top of it.
   * @function module:fjlInputFilter.toInput
   * @param inputObj {Object|*} - Object to build `InputOptions` object from.
   * @param [out = {}] {Object|*}
   * @returns {InputOptions}
   */
  toInput = <T = any>(inputObj?: InputOptions<T> | string, out = new Input()): Input<T> => {
    const _inputObj = defineEnumProps([
      [String, 'name', ''],
      [Boolean, 'required', false],
      [Array, 'filters', []],
      [Array, 'validators', []],
      [Boolean, 'breakOnFailure', false]
    ], toValidationOptions(out)) as Input<T>;
    if (isString(inputObj)) {
      _inputObj.name = inputObj as string;
    } else if (inputObj) {
      assign(_inputObj, inputObj);
    }
    if (_inputObj.required) {
      _inputObj.validators = _inputObj.validators.slice(0);
      _inputObj.validators.push(notEmptyValidator(null));
    }
    return _inputObj;
  },

  /**
   * Returns an input validation result object with values of given object
   * applied/assigned to it.
   * @function module:fjlInputFilter.toInputValidationResult
   * @param resultObj {Object|*}
   * @returns {InputValidationResult}
   */
  toInputValidationResult = <T>(resultObj?: InputValidationResult<T>): InputValidationResult<T> => {
    const _result = defineEnumProps([
      [String, 'name', ''],
      [Boolean, 'result', false],
      [Array, 'messages', []]
    ], {
      value: null,
      rawValue: null,
      obscuredValue: null,
      filteredValue: null
    });
    return assign(_result, resultObj);
  }
;

// @todo Remove the use of classes here (since the class isn't doing anything our functions are
//  already doing we shouldn't bother).
export class Input<T = any> implements InputOptions<T> {
  name = '';
  required = false;
  breakOnFailure = false;
  valueObscured = false;
  valueObscurer = defaultValueObscurer;
  filters: Unary<T, any>[];
  validators: Unary<T, ValidatorResult<T>>[];

  constructor(inputObj?: InputOptions<T>) {
    toInput(inputObj, this); // Gets applied to `this`
  }

  static of<X>(inputObj: Input<X>): Input<X> {
    return new Input<X>(inputObj);
  }

  validate(value): InputValidationResult<T> {
    return validateInput(this, value);
  }

  validateIO(value): Promise<InputValidationResult<T>> {
    return validateIOInput(this, value);
  }
}
