import {id} from '../../src/function/id';

describe ('#id', function () {
    it ('should be a function', function () {
        expect(id).toBeInstanceOf(Function);
    });
    it ('should return whatever you give it', function () {
        expect(id(1)).toEqual(1);
        expect(id(undefined)).toEqual(undefined);
    });
});
