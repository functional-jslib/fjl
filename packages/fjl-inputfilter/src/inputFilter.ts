import {assign, defineEnumProps, foldl, map, partition, error as defaultErrorHandler} from 'fjl';
import {Input, InputOptions, InputValidationResult, toInput, validateInput, validateIOInput} from './input';

export interface InputMap {
  [index: string]: Input;
}

export interface InputOptionsMap {
  [index: string]: InputOptions;
}

export interface ValuesMap {
  [index: string]: any;
}

export interface InputFilterResult {
  result: boolean;
  validInputs?: { [index: string]: Input };
  invalidInputs?: { [index: string]: Input };
  validResults?: [string, InputValidationResult][];
  invalidResults?: [string, InputValidationResult][];
  messages?: { [index: string]: string[] };
}

export const

  validateInputFilter = (inputsObj: InputMap | InputFilter, valuesObj: ValuesMap) => {
    if (!inputsObj || !valuesObj) {
      return toInputFilterResult({result: false});
    }

    // Extract inputs object entries
    const inputObjEntries = Object.entries(inputsObj),

      // Get validation results
      vResults = map(([key, inputObj]: [string, Input]) =>
          [key, validateInput(inputObj, valuesObj[key])],
        inputObjEntries
      ) as [string, InputValidationResult][],

      // Partition results
      [validResults, invalidResults] =
        partition(([_, result]) => result.result, vResults) as [string, InputValidationResult][][],

      // Extract messages
      messages = foldl((agg, [key, result]) => {
        agg[key] = result.messages;
        return agg;
      }, {}, invalidResults),

      // Extract valid inputs
      validInputs = validResults.reduce((agg, [key]) => {
        agg[key] = inputsObj[key];
        return agg;
      }, {}) as InputMap,

      // Extract invalid inputs
      invalidInputs = invalidResults.reduce((agg, [key]) => {
        agg[key] = inputsObj[key];
        return agg;
      }, {}) as InputMap,

      // Resolve result
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

  validateIOInputFilter = (inputsObj: InputMap | InputFilter, valuesObj, errorHandler = defaultErrorHandler) => {
    if (!inputsObj || !valuesObj) {
      return Promise.resolve(toInputFilterResult({result: false}));
    }

    return Promise.all(map(([key, inputObj]: [string, Input]) =>
        validateIOInputWithName(inputObj, key, valuesObj[key]),
      Object.entries(inputsObj)
    ) as [string, InputValidationResult][])
      .then(assocList => {

          // Extract results
          const [validResults, invalidResults] =
              partition(([_, result]) => result.result, assocList) as
                [string, InputValidationResult][][],

            // Extract messages
            messages = foldl((agg, [key, result]) => {
              agg[key] = result.messages;
              return agg;
            }, {}, invalidResults),

            // Extract valid inputs
            validInputs = validResults.reduce((agg, [key]) => {
              agg[key] = inputsObj[key];
              return agg;
            }, {}) as InputMap,

            // Extract invalid inputs
            invalidInputs = invalidResults.reduce((agg, [key]) => {
              agg[key] = inputsObj[key];
              return agg;
            }, {}) as InputMap,

            // Resolve result
            result = !invalidResults.length

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

  validateIOInputWithName = (
    input: Input,
    name: string,
    value: any,
    errorHandler = defaultErrorHandler
  ): Promise<[string, InputValidationResult]> =>
    validateIOInput(input, value)
      .then(result => [name, result], errorHandler),

  toInputMap = (inObj, breakOnFailure = false, outObj = {}): InputMap =>
    Object.defineProperties(outObj,
      foldl((agg, [key, inputOpsObj]) => {
          const inputObj = toInput(assign(inputOpsObj, {name: key}));
          inputObj.breakOnFailure = breakOnFailure;
          agg[key] = {
            value: inputObj,
            enumerable: true
          } as PropertyDescriptor;
          return agg;
        },
        {} as PropertyDescriptorMap,
        Object.entries(inObj || {})
      )
    ) as InputMap,

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
  };

export class InputFilter {
  constructor(inputsObj: InputOptionsMap, breakOnFailure = false) {
    toInputMap(inputsObj, breakOnFailure, this); // gets applied to `this`
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
