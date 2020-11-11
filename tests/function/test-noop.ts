import {noop} from "../../packages/function";

describe('#noop', function () {
    it('should be a function', () => {
        expect(noop).toBeInstanceOf(Function);
    });
    it('should have no arity', () => {
        expect(noop.length).toEqual(0);
    });
    it ('should return `undefined`', () => {
        expect(noop()).toEqual(undefined);
    });
});
