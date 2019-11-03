import {add} from '../helpers';
import {call} from '../../src/function/call';

describe('#call', () => {
    it('should be a function', () => {
        expect(call).toBeInstanceOf(Function);
    });
    it('should be curried', () => {
        const adder = call(add);
        expect(adder()).toBeInstanceOf(Function);
        expect(adder(1, 2, 3, 4, 5)).toEqual(15);
    });
    it('should call a function passed into it along with passed in arguments', () => {
        expect(call(add, 1, 2, 3, 4, 5)).toEqual(15);
    });
    it('should fail when argument `1` is not a function', () => {
        // @ts-ignore
        expect(() => call(99, null)).toThrow(Error);
        expect(() => call(undefined, undefined)).toThrow(Error);
    });
});
