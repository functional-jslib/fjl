/**
 * @description Tests for 'errorThrowing' module.
 */
import { typeRefsToStringOrError, defaultErrorMessageCall, getErrorIfNotTypeThrower, getErrorIfNotTypesThrower, errorIfNotType, errorIfNotTypes } from '../packages/errorThrowing';
import { expectError } from './helpers';
describe('#errorThrowing', () => {
    const someValue = 'someValue', someValueArray = someValue.split('');
    describe('#typeRefsToStringOrError', () => {
        it('should return all types/type-names in passed in array surrounded by ' +
            'back-tick characters in a string', () => {
            const 
            // Test subjects
            someTypeCtors = [Array, String, Function, Object, Boolean], someTypeNames = someTypeCtors.map(x => x.name), mixedTypeVals = someTypeCtors.concat(someTypeNames), mixedTypeNames = someTypeNames.concat(someTypeNames), 
            // Expected
            expectedOutput = someTypeCtors.map(x => `\`${x.name}\``).join(', '), 
            // Results
            strFromTypeNames = typeRefsToStringOrError(someTypeNames), strFromTypeCtors = typeRefsToStringOrError(someTypeCtors), strFromMixed = typeRefsToStringOrError(mixedTypeVals);
            // Ensure outputs are equal
            expect([strFromTypeNames, strFromTypeCtors, strFromMixed]
                .every(x => x.indexOf(expectedOutput) === 0))
                .toEqual(true);
            expect(strFromMixed.split(', ')
                .every((x, ind) => x === `\`${mixedTypeNames[ind]}\``))
                .toEqual(true);
        });
        it('should return an empty string when receiving an empty array', () => {
            expect(typeRefsToStringOrError([])).toEqual('');
        });
    });
    describe('#defaultErrorMessageCall', () => {
        it('should return a string when receiving a value', () => {
            expect(typeof defaultErrorMessageCall(0)).toEqual('string');
        });
        it('should be able to compose it\'s string using props from passed in context', () => {
            const result = defaultErrorMessageCall({
                contextName: 'hello',
                valueName: 'someString',
                value: 'hello world',
                expectedTypeName: 'String',
                foundTypeName: 'String'
            });
            expect(typeof result).toEqual('string');
            expect(result).toEqual('`hello.someString` is not of one of the types: String.  ' +
                'Type received: String.  Value: hello world;');
        });
        it('should throw an error when receiving `null` or `undefined`', () => {
            expectError(defaultErrorMessageCall);
            expectError(() => defaultErrorMessageCall(null));
        });
    });
    describe('#getErrorIfNotTypeThrower', () => {
        it('should return a function', () => {
            const result = getErrorIfNotTypeThrower(defaultErrorMessageCall)(Array, 'SomeContext');
            expect(result).toBeInstanceOf(Function);
        });
        it('It\'s returned function should throw an error when not able to match' +
            'value to passed in type', () => {
            expectError(() => getErrorIfNotTypeThrower(defaultErrorMessageCall)(Array, 'SomeContext')('someValueName', someValue));
        });
        it('It\'s returned function should not throw an error when passed in value ' +
            'matches passed in type', () => {
            expect(getErrorIfNotTypeThrower(defaultErrorMessageCall)(Array, 'SomeContext')('someValueName', someValueArray)).toEqual(someValueArray); // should return undefined
        });
    });
    describe('#getErrorIfNotTypesThrower', () => {
        it('should return a function', () => {
            const result = getErrorIfNotTypesThrower(defaultErrorMessageCall)([], 'SomeContext');
            expect(result).toBeInstanceOf(Function);
        });
        it('It\'s returned function should throw an error when not able to match' +
            'value to passed in type', () => {
            expectError(() => getErrorIfNotTypesThrower(defaultErrorMessageCall)([Array, Function, Boolean], 'SomeContext')('someValueName', someValue));
        });
        it('It\'s returned function should not throw an error when passed in value ' +
            'matches one of passed in types', () => {
            expect(getErrorIfNotTypesThrower(defaultErrorMessageCall)([Function, Array, Boolean], 'SomeContext')('someValueName', someValueArray)).toEqual(someValueArray);
        });
    });
    describe('#errorIfNotType', () => {
        it('should throw an error when not able to match' +
            'value to passed in type', () => {
            expectError(() => errorIfNotType(Array, 'SomeContext', 'someValueName', someValue));
        });
        it('should not throw an error when passed in value ' +
            'matches passed in type', () => {
            expect(errorIfNotType(Array, 'SomeContext', 'someValueName', someValueArray))
                .toEqual(someValueArray);
        });
    });
    describe('#errorIfNotTypes', () => {
        it('should throw an error when not able to match value to passed in type', () => {
            expectError(() => errorIfNotTypes([Array, Function, Boolean], 'SomeContext', 'someValueName', someValue));
        });
        it('should not throw an error when passed in value matches one of passed in types', () => {
            expect(errorIfNotTypes([Function, Array, Boolean], 'SomeContext', 'someValueName', someValueArray))
                .toEqual(someValueArray);
        });
    });
});
//# sourceMappingURL=test-errorThrowing.js.map