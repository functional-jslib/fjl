import {expect, assert} from 'chai';

import {
    getTypeName,
    multiTypesToString,
    defaultErrorMessageCall,
    getErrorIfNotTypeThrower,
    getErrorIfNotTypesThrower,
    errorIfNotType,
    errorIfNotTypes
} from '../src/object/errorThrowing';

describe ('#errorThrowing', () => {

    const someValue = 'someValue',
        someValueArray = someValue.split('');

    describe ('#getTypeName', () => {
        it ('should return the type name of the assumed type/type-name passed in', () => {
            expect(getTypeName(String)).to.equal('String');
            expect(getTypeName('String')).to.equal('String');
        });
        it ('should throw an error when receiving anything other than a string or ' +
            'a constructor as it\'s first parameter', () => {
            assert.throws(getTypeName, Error);
            assert.throws(_ => getTypeName(null), Error);
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
                .to.equal(true);

            expect(strFromMixed.split(', ')
                .every((x, ind) => x === `\`${mixedTypeNames[ind]}\``))
                .to.equal(true);

        });

        it ('should return an empty string when receiving an empty array', () => {
            expect(multiTypesToString([])).to.equal('');
        });
    });

    describe ('#defaultErrorMessageCall', () => {
        it ('should return a string when receiving a value', () => {
            expect(typeof defaultErrorMessageCall(0)).to.equal('string');
        });
        it ('should be able to compose it\'s string using props from passed in context', () => {
            const result = defaultErrorMessageCall({
                contextName: 'hello',
                valueName: 'someString',
                value: 'hello world',
                expectedTypeName: 'String',
                foundTypeName: 'String'
            });
            expect(typeof result).to.equal('string');
            expect(result).to.equal(
                    '`hello.someString` is not of one of the types: String.  ' +
                    'Type received: String.  Value: hello world;'
                );
        });
        it ('should throw an error when receiving `null` or `undefined`', () => {
            assert.throws(defaultErrorMessageCall, Error);
            assert.throws(_ => defaultErrorMessageCall(null), Error);
        });
    });

    describe ('#getErrorIfNotTypeThrower', () => {
        it ('should return a function', () => {
            const result = getErrorIfNotTypeThrower(defaultErrorMessageCall)(Array, 'SomeContext');
            expect(result).to.be.instanceOf(Function);
        });
        it ('It\'s returned function should throw an error when not able to match' +
            'value to passed in type', () => {
            assert.throws(
                _ => getErrorIfNotTypeThrower(defaultErrorMessageCall)(
                    Array, 'SomeContext')(
                        'someValueName', someValue
                    ), Error
            );
        });
        it ('It\'s returned function should not throw an error when passed in value ' +
            'matches passed in type', () => {
            expect(getErrorIfNotTypeThrower(defaultErrorMessageCall)(
                Array, 'SomeContext')('someValueName', someValueArray)
            ).to.equal(someValueArray); // should return undefined
        });
    });

    describe ('#getErrorIfNotTypesThrower', () => {
        it ('should return a function', () => {
            const result = getErrorIfNotTypesThrower(defaultErrorMessageCall)([], 'SomeContext');
            expect(result).to.be.instanceOf(Function);
        });
        it ('It\'s returned function should throw an error when not able to match' +
            'value to passed in type', () => {
            assert.throws(
                _ => getErrorIfNotTypesThrower(defaultErrorMessageCall)(
                    [Array, Function, Boolean], 'SomeContext')(
                        'someValueName', someValue
                    ), Error);
        });
        it ('It\'s returned function should not throw an error when passed in value ' +
            'matches one of passed in types', () => {
            expect(getErrorIfNotTypesThrower(defaultErrorMessageCall)(
                [Function, Array, Boolean], 'SomeContext')(
                        'someValueName', someValueArray
                    )).to.equal(someValueArray);
        });
    });

    describe ('#errorIfNotType', () => {
        it ('should return a function', () => {
            const result = errorIfNotType(String, 'SomeContext');
            expect(result).to.be.instanceOf(Function);
        });
        it ('It\'s returned function should throw an error when not able to match' +
            'value to passed in type', () => {
            assert.throws(
                _ => errorIfNotType(Array, 'SomeContext')(
                        'someValueName', someValue
                    ), Error
            );
        });
        it ('It\'s returned function should not throw an error when passed in value ' +
            'matches passed in type', () => {
            expect(errorIfNotType(Array, 'SomeContext')(
                    'someValueName', someValueArray
                )).to.equal(someValueArray); // should return undefined
        });
    });

    describe ('#errorIfNotTypes', () => {
        it ('should return a function', () => {
            const result = errorIfNotTypes([], 'SomeContext');
            expect(result).to.be.instanceOf(Function);
        });
        it ('It\'s returned function should throw an error when not able to match' +
            'value to passed in type', () => {
            assert.throws(
                _ => errorIfNotTypes([Array, Function, Boolean], 'SomeContext')(
                        'someValueName', someValue
                    ), Error);
        });
        it ('It\'s returned function should not throw an error when passed in value ' +
            'matches one of passed in types', () => {
            expect(errorIfNotTypes([Function, Array, Boolean], 'SomeContext',
                    'someValueName', someValueArray
                )).to.equal(someValueArray); // should return undefined
        });
    });

});
