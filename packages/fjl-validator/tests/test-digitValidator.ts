import {digitValidator} from '../src/digitValidator';

describe('digitValidator', function () {

    test ('should return `true` if value contains only digits.', function () {
        const validator = digitValidator(null),
            values = [
                [true, '999'],
                [true, '123'],
                [true, 12345],
                [true, 0x009900],
                [false, false],
                [false, true],
                [false, ['a', 'b', 'c']],
                [false, 'hello[]world99'],
                [false, '99 bottles of beer on the wall']
            ];

        // Validate values and expect value[0] to be return value of validation check
        values.forEach(function (value) {
            const {result, messages} = validator(value[1]);
            expect(result).toEqual(value[0]);
            if (value[0] === false) {
                expect(messages.length >= 1).toEqual(true);
            }
        });
    });

});
