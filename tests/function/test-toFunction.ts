import {toFunction} from '../../packages/function';
import {falsyList, truthyList} from '../helpers';

describe('#toFunction', () => {
    truthyList.concat(falsyList).forEach(x => {
        const f = toFunction(x);
        it(`should return a function when given ${x}`, () => {
            expect(f).toBeInstanceOf(Function);
        });
        if (!(x instanceof Function)) {
            it('should return given value when value is not a function', () => {
                expect(f()).toEqual(x);
            });
        }
    });
});
