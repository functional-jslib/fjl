import {add, expectEqual, expectFunction} from "../helpers";
import {apply} from '../../src/function/apply';

describe ('#apply', function () {
    it ('should be a function', function () {
        expectFunction(apply);
    });
    it ('should be curried', function () {
        const addAllInArray = apply(add);
        expectFunction (addAllInArray);
        expectEqual(addAllInArray([1, 2, 3, 4, 5]), 15);
    });
    it ('should call a function passed into it with args list passed in as second parameter', function () {
        expectEqual(apply(add, [1, 2, 3, 4, 5]), 15);
    });
    it ('should fail when argument `1` is not a function', () => {
        expect(() => apply(99, null)).toThrow(Error);
        expect(() => apply(undefined, undefined)).toThrow(Error);
    });
});
