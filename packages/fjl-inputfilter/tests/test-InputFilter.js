import {keys} from 'fjl';
import {runHasPropTypes, runHasPropTypesUnWrapped} from './utils';
import {
    toInputFilterResult,
    toInputFilter,
    validateInputFilter,
    validateIOInputFilter
} from '../src/InputFilter';

import {inputFilter1, truthyCasesForInputFilter1, falsyCasesForInputFilter1} from './fixtures/input-filter-1';

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

describe('#toInputFilter', function () {
    const case1Options = {
            name: {required: true},
            zipcode: {required: true},
            phonenumber: {required: true},
            alnum: {}
        },
        case1 = toInputFilter(case1Options),
        case1Keys = keys(case1);
    test('should return an object with all keys from passed in options', function () {
        expect(case1Keys.every(key => case1Options.hasOwnProperty(key)))
            .toEqual(true);
    });
    test('should return an object with properties which are un-writable', function () {
        case1Keys.map(key => expect(() => {
            case1[key] = 99;
        }).toThrow(Error));
    });
    test('should return an object with enumerable properties', function () {
        expect(case1Keys.every(key =>
            Object.getOwnPropertyDescriptor(case1, key).enumerable)).toEqual(true);
    });
    test('should return an object that contains input-options objects for all objects set on passed in options object', function () {
        const propNames = ['name', 'required', 'filters', 'validators', 'breakOnFailure'];
        expect(
            case1Keys.every(caseKey => {
                const inputObj = case1[caseKey];
                return propNames.every(propKey =>
                    inputObj.hasOwnProperty(propKey));
            })
        )
            .toEqual(true);
    });
    test('inputs should obey property types when converting from options to inputFilter', function () {
        // should throw error becase validators can only be of type array
        expect(() => toInputFilter(({
            name: {required: true, validators: {}}
        }))).toThrow(Error);

        // When types are okay shouldn't throw error
        expect(
            toInputFilter({name: {required: true, validators: []}})
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
                    // @todo messages should be null when `result.result` is
                    //  `true` might be better for the library
                }

                // Falsy cases
                // Expect found-invalid-field-keys to match required criteria for each..
                foundInvalidFieldKeys.forEach(key => {
                    expect(expectedInvalidInputs.hasOwnProperty(key)).toEqual(true);
                    expect(result.messages[key].length >= 1).toEqual(true); // has one or more messages
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
        [truthyCasesForInputFilter1, falsyCasesForInputFilter1].forEach(async casesAssocList => {
            casesAssocList.forEach(async ([data, expectedInvalidInputs]) => {
                const result = await validateIOInputFilter(inputFilter1, data),
                    foundInvalidFieldKeys = keys(expectedInvalidInputs);

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
                    expect(expectedInvalidInputs.hasOwnProperty(key)).toEqual(true);
                    expect(result.messages[key].length >= 1).toEqual(true);
                });
            });
        });
    }); // end of `test` case

    test('Ensure results have correctly typed property defined', async () => {
        // Should return a valid InputFilterResult
        await validateIOInputFilter(inputFilter1, truthyCasesForInputFilter1[0][0])
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
            .catch(console.error);
    });

});
