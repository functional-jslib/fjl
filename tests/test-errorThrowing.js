import {
    getTypeName,
    multiTypesToString,
    defaultErrorMessageCall,
    getErrorIfNotTypeThrower,
    getErrorIfNotTypesThrower,
    errorIfNotType,
    errorIfNotTypes
} from '../src/uncurried/_objectOps/_errorThrowing';

import {expectError} from './helpers';

describe ('#errorThrowing', () => {

    const someValue = 'someValue',
        someValueArray = someValue.split('');

    describe ('#getTypeName', () => {
        it ('should return the type name of the assumed type/type-name passed in', () => {
            expect(getTypeName(String)).toEqual('String');
            expect(getTypeName('String')).toEqual('String');
        });
        it ('should throw an error when receiving anything other than a string or ' +
            'a constructor as it\'s first parameter', () => {
            expectError(getTypeName);
            expectError(_ => getTypeName(null));
        });
    });

    describe ('#multiTypesToString', () => {
        it ('should return all types/type-names in passed in array surrounded by ' +
            'back-tick characters in a string', () => {
            const
                // Test subjects
                someTypeCtors = [Array, String, Function, Object, Boolean],
                someTypeNames = someTypeCtors.map(x => x.name),
                mixedTypeVals = someTypeCtors.concat(someTypeNames),
                mixedTypeNames = someTypeNames.concat(someTypeNames),

                // Expected
                expectedOutput = someTypeCtors.map(x => `\`${x.name}\``).join(', '),

                // Results
                strFromTypeNames = multiTypesToString(someTypeNames),
                strFromTypeCtors = multiTypesToString(someTypeCtors),
                strFromMixed = multiTypesToString(mixedTypeVals);

            // log(expectedOutput, strFromMixed);

            // Ensure outputs are equal
            expect([strFromTypeNames, strFromTypeCtors, strFromMixed]
                .every(x => x.indexOf(expectedOutput) === 0))
                .toEqual(true);

            expect(strFromMixed.split(', ')
                .every((x, ind) => x === `\`${mixedTypeNames[ind]}\``))
                .toEqual(true);

        });

        it ('should return an empty string when receiving an empty array', () => {
            expect(multiTypesToString([])).toEqual('');
        });
    });

    describe ('#defaultErrorMessageCall', () => {
        it ('should return a string when receiving a value', () => {
            expect(typeof defaultErrorMessageCall(0)).toEqual('string');
        });
        it ('should be able to compose it\'s string using props from passed in context', () => {
            const result = defaultErrorMessageCall({
                contextName: 'hello',
                valueName: 'someString',
                value: 'hello world',
                expectedTypeName: 'String',
                foundTypeName: 'String'
            });
            expect(typeof result).toEqual('string');
            expect(result).toEqual(
                    '`hello.someString` is not of one of the types: String.  ' +
                    'Type received: String.  Value: hello world;'
                );
        });
        it ('should throw an error when receiving `null` or `undefined`', () => {
            expectError(defaultErrorMessageCall);
            expectError(_ => defaultErrorMessageCall(null));
        });
    });

    describe ('#getErrorIfNotTypeThrower', () => {
        it ('should return a function', () => {
            const result = getErrorIfNotTypeThrower(defaultErrorMessageCall)(Array, 'SomeContext');
            expect(result).toBeInstanceOf(Function);
        });
        it ('It\'s returned function should throw an error when not able to match' +
            'value to passed in type', () => {
            expectError(
                _ => getErrorIfNotTypeThrower(defaultErrorMessageCall)(
                    Array, 'SomeContext')(
                        'someValueName', someValue
                    )
            );
        });
        it ('It\'s returned function should not throw an error when passed in value ' +
            'matches passed in type', () => {
            expect(getErrorIfNotTypeThrower(defaultErrorMessageCall)(
                Array, 'SomeContext')('someValueName', someValueArray)
            ).toEqual(someValueArray); // should return undefined
        });
    });

    describe ('#getErrorIfNotTypesThrower', () => {
        it ('should return a function', () => {
            const result = getErrorIfNotTypesThrower(defaultErrorMessageCall)([], 'SomeContext');
            expect(result).toBeInstanceOf(Function);
        });
        it ('It\'s returned function should throw an error when not able to match' +
            'value to passed in type', () => {
            expectError(
                _ => getErrorIfNotTypesThrower(defaultErrorMessageCall)(
                    [Array, Function, Boolean], 'SomeContext')(
                        'someValueName', someValue
                    ));
        });
        it ('It\'s returned function should not throw an error when passed in value ' +
            'matches one of passed in types', () => {
            expect(getErrorIfNotTypesThrower(defaultErrorMessageCall)(
                [Function, Array, Boolean], 'SomeContext')(
                        'someValueName', someValueArray
                    )).toEqual(someValueArray);
        });
    });

    describe ('#errorIfNotType', () => {
        it ('should return a function', () => {
            const result = errorIfNotType(String, 'SomeContext');
            expect(result).toBeInstanceOf(Function);
        });
        it ('It\'s returned function should throw an error when not able to match' +
            'value to passed in type', () => {
            expectError(
                _ => errorIfNotType(Array, 'SomeContext')(
                        'someValueName', someValue
                    )
            );
        });
        it ('It\'s returned function should not throw an error when passed in value ' +
            'matches passed in type', () => {
            expect(errorIfNotType(Array, 'SomeContext')(
                    'someValueName', someValueArray
                )).toEqual(someValueArray); // should return undefined
        });
    });

    describe ('#errorIfNotTypes', () => {
        it ('should return a function', () => {
            const result = errorIfNotTypes([], 'SomeContext');
            expect(result).toBeInstanceOf(Function);
        });
        it ('It\'s returned function should throw an error when not able to match' +
            'value to passed in type', () => {
            expectError(
                _ => errorIfNotTypes([Array, Function, Boolean], 'SomeContext')(
                        'someValueName', someValue
                    ));
        });
        it ('It\'s returned function should not throw an error when passed in value ' +
            'matches one of passed in types', () => {
            expect(errorIfNotTypes([Function, Array, Boolean], 'SomeContext',
                    'someValueName', someValueArray
                )).toEqual(someValueArray); // should return undefined
        });
    });

});
