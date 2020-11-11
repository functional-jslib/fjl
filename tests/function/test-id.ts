import {id} from '../../packages/function/id';

describe ('#id', function () {
    it ('should be a function', function () {
        expect(id).toBeInstanceOf(Function);
    });
    it ('should have arity of `1`', () => {
        expect(id.length).toEqual(1);
    });
    it ('should return whatever you give it', function () {
        expect(id(1)).toEqual(1);
        expect(id(undefined)).toEqual(undefined);
    });
});
