/**
 * Created by edelacruz on 7/28/2014.
 */
import {regexValidator, toRegexValidatorOptions} from '../src/regexValidator';
import {keys} from 'fjl';

describe('regexValidator`', function () {

    describe ('#toRegexValidatorOptions', function () {
        test ('should be an object with a `pattern` property', function () {
            expect(Object.hasOwn(toRegexValidatorOptions(undefined), 'pattern')).toEqual(true);
        });
        test ('should have error case(s) tests', () => {
          expect(true).toEqual(true);
        });
    });

    describe ('#regexValidator', function () {

        test ('should generate expected error message for failing values', function () {
            const exampleOps = {pattern: /[a-z]+/},
                {result, messages} = regexValidator(exampleOps, ''),
                expectedErrMsg = (value, ops) =>
                    'The value passed in does not match pattern"'
                    + ops.pattern + '".  Value passed in: "'
                    + value + '".';
            expect(result).toEqual(false);
            expect(messages[0]).toEqual(expectedErrMsg('', exampleOps));
        });

        const regexTest = (keyValMap, expected) => {
               keys(keyValMap).map(key => {
                    test ('should return ' + expected + ' when testing "' + key + '" with "' + keyValMap[key] + '".', function () {
                        const value = keyValMap[key],
                            {result} = regexValidator({pattern: new RegExp(key, 'i')}, value);
                        expect(result).toEqual(expected);
                    });
                });
            },

            truthyMap = {
                '^\\d+$': 199, // Unsigned Number
                '^[a-z]+$': 'abc', // Alphabetical
                '^(:?\\+|\\-)?\\d+$': -100 // Signed Number
            },
            falsyMap = {
                '^\\d+$': '-199edd1', // Unsigned Number
                '^[a-z]+$': '0123a12bc', // Alphabetical
                '^(:?\\+|\\-)?\\d+$': '-10sd0e+99' // Signed Number
            };

        // Run tests
        regexTest(truthyMap, true);
        regexTest(falsyMap, false);

    });

});
