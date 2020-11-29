import {expectEqual, expectError, expectInstanceOf, vowelsArray, vowelsString} from "../helpers";
import Functor from "../helpers/functor";
import map from "../../list/map";

describe('#map', () => {
    const addCharA = char => char + 'a';
    it('should be able to map a function over a list.', () => {
        const vowelsObj = vowelsArray.reduce((agg, x, ind) => {
                agg[ind] = x;
                return agg;
            }, {}),
            augmentedVowelsObj = vowelsArray.reduce((agg, x, ind) => {
                agg[ind] = x + 'a';
                return agg;
            }, {})
        ;
        [
            [addCharA, vowelsArray, vowelsArray.map(addCharA)],
            [addCharA, vowelsString, vowelsString.split('').map(addCharA).join('')],
            [addCharA, vowelsObj, augmentedVowelsObj],
            [x => x, [], []],
            [x => x, '', ''],
            [x => x, {}, {}],
            [x => x, new Functor(undefined), new Functor(undefined)]
        ]
            .forEach(([fn, list, expected]) => {
                expect(map(fn, list)).toEqual(expected);
            });
    });
    it('should work on custom functors', () => {
        const
            newSomeFunctor = x => new Functor(x),
            rslt = map(addCharA, newSomeFunctor('a')),
            expectedFunctor = newSomeFunctor(addCharA('a'))
        ;
        expectInstanceOf(Functor, rslt);
        expectEqual(rslt.value, expectedFunctor.valueOf());
    });
    it('should throw an error when incoming value is not a functor instance', () => {
        expectError(() => map(x => x, null));
        expectError(() => map(x => x, undefined)); // curried so requires second parameter (even if undefined).
    });
});
