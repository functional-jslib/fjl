import {add} from "../helpers";
import {apply} from '../../packages/function/apply';

describe('#apply', function () {
    it('should be a function', function () {
        expect(apply).toBeInstanceOf(Function);
    });
    it('should be curried', function () {
        const addAllInArray = apply(add);
        expect(addAllInArray).toBeInstanceOf(Function);
        expect(addAllInArray([1, 2, 3, 4, 5])).toEqual(15);
    });
    it('should call a function passed into it with args list passed in as second parameter', function () {
        expect(apply(add, [1, 2, 3, 4, 5])).toEqual(15);
    });
    it('should fail when argument `1` is not a function', () => {
        expect(() => apply(99, null)).toThrow(Error);
        expect(() => apply(undefined, undefined)).toThrow(Error);
    });
});
