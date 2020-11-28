import {add} from "../utils/test-utils";
import {apply} from './apply';

describe('#apply', function () {
    it('apply instanceof Function', function () {
        expect(apply).toBeInstanceOf(Function);
    });
    it('Can do `apply(fn)(args)` (is curried)', function () {
        const addAllInArray = apply(add);
        expect(addAllInArray).toBeInstanceOf(Function);
        expect(addAllInArray([1, 2, 3, 4, 5])).toEqual(15);
    });
    it('should call a function passed into it with args list passed in as second parameter', function () {
        expect(apply(add, [1, 2, 3, 4, 5])).toEqual(15);
    });
    it('should fail when argument `1` is not a function', () => {
        expect(() => apply(null, null)).toThrow(Error);
        expect(() => apply(undefined, undefined)).toThrow(Error);
    });
});
