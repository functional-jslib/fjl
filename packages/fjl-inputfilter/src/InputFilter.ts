import {partition, foldl, map, assign, keys, toAssocList, fromAssocList, defineEnumProps} from 'fjl';
import {validateInput, validateIOInput, toInput, InputValidationResult} from './Input';
import {defaultErrorHandler} from './Utils';

/**
 * @interface InputFilter {Object.<String, (Input|InputOptions)>}
 * @desc Contains input objects to validate against (key-value pair object).
 */


// export interface InputMap {
//   [index: string]: InputValidationResult;
// }

/**
 * @interface InputFilterResult
 * @property {Boolean} result - Result of validation.
 * @property {Object.<String,InputValidationResult>} validInputs - Valid input results object.
 * @property {Object.<String,InputValidationResult>} invalidInputs - Invalid input results object.
 * @property {Array.<String,InputValidationResult>} validResults - Valid input results associative array.
 * @property {Array.<String,InputValidationResult>} invalidResults - Invalid input results associative array.
 * @property {Object.<String,Array.<String>>} messages - Error messages (if any) mapped to input names.
 */
export interface InputFilterResult {
  result: boolean;
}

export const

  /**
   * @function module:fjlInputFilter.validateInputFilter
   * @param inputsObj {InputFilter}
   * @param valuesObj {Object.<String,*>}
   * @returns {InputFilterResult}
   */
  validateInputFilter = (inputsObj, valuesObj) => {
    if (!inputsObj || !valuesObj) {
      return toInputFilterResult({result: false});
    }
    const [validResults, invalidResults] =
        partition(([_, result]) => result.result,
          map(([key, inputObj]) =>
              [key, validateInput(inputObj, valuesObj[key])],
            toAssocList(inputsObj)
          )) as [InputValidationResult[], InputValidationResult[]],
      messages = foldl((agg, [key, result]) => {
        agg[key] = result.messages;
        return agg;
      }, {}, invalidResults),
      validInputs = fromAssocList(validResults),
      invalidInputs = fromAssocList(invalidResults),
      result = !invalidResults.length
    ;
    return toInputFilterResult({
      result,
      validInputs,
      invalidInputs,
      validResults,
      invalidResults,
      messages
    });
  },

  /**
   * @function module:fjlInputFilter.validateIOInputFilter
   * @param inputsObj {InputFilter}
   * @param valuesObj {Object.<String, *>}
   * @param errorHandler {Function}
   * @returns {Promise.<InputFilterResult>}
   */
  validateIOInputFilter = (inputsObj, valuesObj, errorHandler = defaultErrorHandler) => {
    if (!inputsObj || !valuesObj) {
      return Promise.resolve(toInputFilterResult({result: false}));
    }

    return Promise.all(map(([key, inputObj]) =>
        validateIOInputWithName(inputObj, key, valuesObj[key]),
      toAssocList(inputsObj)
    )).then(assocList => {
        const [validResults, invalidResults] =
            partition(([_, result]) => result.result, assocList) as [InputValidationResult[], InputValidationResult[]],
          messages = foldl((agg, [key, result]) => {
            agg[key] = result.messages;
            return agg;
          }, {}, invalidResults),
          validInputs = fromAssocList(validResults),
          invalidInputs = fromAssocList(invalidResults),
          result = !invalidResults.length
        ;

        return toInputFilterResult({
          result,
          validInputs,
          invalidInputs,
          validResults,
          invalidResults,
          messages
        });
      },
      errorHandler);
  },

  /**
   * @function module:fjlInputFilter.validateIOInputWithName
   * @param input {Input|InputOptions}
   * @param name {String}
   * @param value {*}
   * @param errorHandler {Function}
   * @returns {Promise.<Array.<String,InputValidationResult>>}
   */
  validateIOInputWithName = (input, name, value, errorHandler = defaultErrorHandler) =>
    validateIOInput(input, value)
      .then(result => Promise.resolve([name, result]), errorHandler),

  /**
   * @function module:fjlInputFilter.toInputFilter
   * @param inObj {Object.<String, Object>}
   * @param breakOnFailure {Boolean}
   * @param outObj {Object|*}
   * @returns {InputFilter}
   */
  toInputFilter = (inObj, breakOnFailure = false, outObj = {}) =>
    Object.defineProperties(outObj,
      foldl((agg, [key, inputOpsObj]) => {
        const inputObj = toInput(assign(inputOpsObj, {name: key}));
        inputObj.breakOnFailure = breakOnFailure;
        agg[key] = {
          value: inputObj,
          enumerable: true
        };
        return agg;
      }, {}, map(key =>
          [key, inObj[key]],
        keys(inObj)
      ))
    ),

  /**
   * @function module:fjlInputFilter.toInputFilterResult
   * @param inResult {Object}
   * @param outResult {Object|*}
   * @returns {InputFilterResult}
   */
  toInputFilterResult = (inResult?: InputFilterResult, outResult: InputFilterResult = {result: false}) => {
    const _outResult = defineEnumProps([
      [Boolean, 'result', false],
      [Object, 'messages', {}],
      [Object, 'validInputs', {}],
      [Object, 'invalidInputs', {}],
      [Array, 'validResults', []],
      [Array, 'invalidResults', []]
    ], outResult);
    return inResult ? assign(_outResult, inResult) : _outResult;
  }

;

/**
 * @class InputFilter
 */
export class InputFilter {
  constructor(inputsObj, breakOnFailure = false) {
    toInputFilter(inputsObj, breakOnFailure, this);
  }

  static of(inputsObj, breakOnFailure) {
    return new InputFilter(inputsObj, breakOnFailure);
  }

  validate(data) {
    return validateInputFilter(this, data);
  }

  validateIO(data) {
    return validateIOInputFilter(this, data);
  }
}
