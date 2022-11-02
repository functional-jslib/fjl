import {error, keys} from 'fjl';
import {runHasPropTypes, runHasPropTypesUnWrapped} from './utils';
import {
  InputFilter,
  InputOptionsMap,
  toInputFilterResult,
  toInputMap,
  validateInputFilter,
  validateIOInputFilter
} from '../src/inputFilter';

import {falsyCasesForInputFilter1, inputFilter1, truthyCasesForInputFilter1} from './fixtures/input-filter-1';
import {Input} from "../src";

describe('#toInputFilterResult', function () {
  // Ensure properties on inputFilter default
  [toInputFilterResult({result: true}), toInputFilterResult()]
    .forEach(inputObj => runHasPropTypes([
      [Boolean, 'result', [false, 99]],
      [Object, 'messages', [{}, 99]],
      [Object, 'validInputs', [{}, 99]],
      [Object, 'invalidInputs', [{}, 99]]
    ], inputObj));
});

describe('#toInputMap', function () {
  const case1Options = {
      name: {required: true},
      zipcode: {required: true},
      phonenumber: {required: true},
      alnum: {}
    },
    case1 = toInputMap(case1Options),
    case1Keys = keys(case1);

  (<[string, InputOptionsMap, InputFilter][]>[
    ['populated input map', case1Options, new InputFilter(case1Options)],
    ['un-populated input map', {}, new InputFilter({})],
    ['void', null, new InputFilter(null)],
  ])
    .forEach(([testName, inputOpsMap, expected]) => {
      it(testName, () => {
        const rslt = toInputMap(inputOpsMap);

        if (!inputOpsMap) {
          expect(Object.entries(rslt)).toHaveLength(0);
        } else {
          // Ensure (serialized) entries in each match
          Object.entries(inputOpsMap).forEach(([k]) => {
            expect(JSON.stringify(rslt[k])).toEqual(JSON.stringify(expected[k]));
          });
        }
      });
    });

  test('should return an object with all keys from passed in options', function () {
    case1Keys.forEach(key => expect(case1Options).toHaveProperty(key));
  });

  test('should return an object with properties which are un-writable', function () {
    case1Keys.map(key => expect(() => {
      case1[key] = 99 as unknown as Input;
    }).toThrow(Error));
  });

  test('should return an object with enumerable properties', function () {
    expect(case1Keys.every(key =>
      Object.getOwnPropertyDescriptor(case1, key).enumerable)).toEqual(true);
  });

  test('should return an object that contains input-options objects for all objects set on passed in options object', function () {
    const propNames = ['name', 'required', 'filters', 'validators', 'breakOnFailure'];
    case1Keys.forEach(caseKey => {
      const inputObj = case1[caseKey];
      propNames.every(propKey => expect(inputObj).toHaveProperty(propKey));
    });
  });

  test('inputs should obey property types when converting from options to inputFilter', function () {
    // should throw error becase validators can only be of type array
    expect(() => toInputMap(({
      name: {required: true, validators: {}}
    }))).toThrow(Error);

    // When types are okay shouldn't throw error
    expect(
      toInputMap({name: {required: true, validators: []}})
        .name.validators
    )
      .toBeInstanceOf(Array);
  });
});

describe('#validateInputFilter', function () {
  test('should return expected result given both data that passes and fails input filter validation', function () {
    [truthyCasesForInputFilter1, falsyCasesForInputFilter1].forEach(casesAssocList => {
      casesAssocList.forEach(([data, expectedInvalidInputs]) => {
        const result = validateInputFilter(inputFilter1, data),
          foundInvalidFieldKeys = keys(expectedInvalidInputs);

        // Truthy cases
        if (foundInvalidFieldKeys.length === 0) {
          expect(result.result).toEqual(true);
          expect(keys(result.messages).length).toEqual(0);
          // @todo messages should be null when `result.result` is `true` (better for ergonomics)
        }

        // Falsy cases
        // Expect found-invalid-field-keys to match required criteria for each..
        foundInvalidFieldKeys.forEach(key => {
          expect(expectedInvalidInputs).toHaveProperty(key);
          expect(result.messages[key].length).toBeGreaterThanOrEqual(1); // has one or more messages
        });
      });
    });

  }); // end of `test` case

  // Should return a valid InputFilterResult
  runHasPropTypes([
    [Boolean, 'result', [false, 99]],
    [Object, 'messages', [{}, 99]],
    [Object, 'validInputs', [{}, 99]],
    [Object, 'invalidInputs', [{}, 99]]
  ], validateInputFilter(inputFilter1, {}));
});

describe('#validateIOInputFilter', function () {
  test('should return expected result given both data that passes and fails input filter validation', async () => {
    return Promise.all([truthyCasesForInputFilter1, falsyCasesForInputFilter1].flatMap(casesAssocList => {
      return casesAssocList.map(([data, expectedInvalidInputs]) => validateIOInputFilter(inputFilter1, data)
        .then(result => {
          const foundInvalidFieldKeys = keys(expectedInvalidInputs);

          // Truthy cases
          if (foundInvalidFieldKeys.length === 0) {
            expect(result.result).toEqual(true);
            expect(keys(result.messages).length).toEqual(0);
            // @todo messages should be null when `result.result` is
            //  `true` might be better for the library
          }

          // Falsy cases
          // Expect found-invalid-field-keys to match required criteria for each..
          foundInvalidFieldKeys.forEach(key => {
            expect(expectedInvalidInputs).toHaveProperty(key);
            expect(result.messages[key].length).toBeGreaterThanOrEqual(1);
          });
        }));
    })).catch(error);
  }); // end of `test` case

  test('Ensure results have correctly typed property defined', async () => {
    // Should return a valid InputFilterResult
    return validateIOInputFilter(inputFilter1, truthyCasesForInputFilter1[0][0])
      .then(results =>
        runHasPropTypesUnWrapped([
          [Boolean, 'result', [false, 99]],
          [Object, 'messages', [{}, 99]],
          [Array, 'validResults', [[], 99]],
          [Object, 'validInputs', [{}, 99]],
          [Object, 'invalidResults', [[], 99]],
          [Object, 'invalidInputs', [{}, 99]]
        ], results)
      )
      .catch(error);
  });

});
