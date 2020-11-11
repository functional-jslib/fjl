import {fnOrError} from '../../packages/function/fnOrError';
import {falsyList} from '../helpers';

describe('#fnOrError', () => {
    it('should be a function', () => {
        expect(fnOrError).toBeInstanceOf(Function);
    });
    it('should have an arity of 2', () => {
        expect(fnOrError.length).toEqual(2);
    });
    it('should throw an error when not receiving a function', () => {
        falsyList.forEach(f => {
            expect(() => fnOrError('f', f)).toThrow();
        });
    });
    it ('should not throw an error when receiving a function', () => {
        const result = fnOrError('fnOrError', fnOrError);
        expect(result).toBeInstanceOf(Function);
    });
});
