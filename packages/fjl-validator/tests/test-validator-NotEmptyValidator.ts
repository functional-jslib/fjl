/**
 * Created by elyde on 1/15/2016.
 */
import {notEmptyValidator} from '../src/notEmptyValidator';

describe('notEmptyValidator', function () {

    test ('should return `true` if value is not `empty`.', function () {
        let validator = notEmptyValidator({});
        ['hello', 99, true, [1], {a: 1}].forEach(function (value) {
            expect(validator(value).result).toEqual(true);
        });
    });

    test ('should return `false` if value is `empty`.', function () {
        let validator = notEmptyValidator({});
        ['', 0, false, [], {}].forEach(function (value) {
            expect(validator(value).result).toEqual(false);
        });
    });

    test ('should have messages when value is empty.', function () {
        let validator = notEmptyValidator({});
        ['', 0, false, [], {}].forEach(function (value) {
            const {result, messages} = validator(value);
            expect(result).toEqual(false);
            expect(messages.length > 0).toEqual(true);
        });
    });

});
