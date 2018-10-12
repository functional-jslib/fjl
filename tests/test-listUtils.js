
import {sliceCopy, sliceFrom, sliceTo} from '../src/list/utils';

import {
    __,
    shallowCompareOnLeft,
    expectEqual,
    expectError,
    expectLength,
    expectTrue,
    expectFalse,
    alphabetString,
    alphabetArray,
    vowelsString,
    vowelsArray,
    alphabetCharCodeRange,
} from './helpers';

describe ('#listUtils', () => {
    describe('#sliceFrom', () => {
        it ('should be curried', () => {
            vowelsArray
                .map((_, ind) => sliceFrom(ind))
                .forEach((fn, ind) => {
                    const result = fn(vowelsArray);
                    // Compare slices
                    expect(result).toEqual(vowelsArray.slice(ind, vowelsArray.length)); // deep equal

                    // Compare lengths (calculated)
                    expect(vowelsArray.length - ind).toEqual(result.length);
                });
        });
        it ('should create a slice of an array "from" given index.', () => {
            alphabetArray.forEach((_, ind, list) => {
                const result = sliceFrom(ind, list);

                // Compare slices
                expect(result).toEqual(list.slice(ind, list.length)); // deep equal

                // Compare lengths (calculated)
                expect(alphabetArray.length - ind).toEqual(result.length);
            });
        });
        it ('should return an empty slice when given an empty slice', () => {
           expect(sliceFrom(99, [])).toEqual([]);
        });
        it ('should throw an error when not receiving a `List` (a sliceable, an array, and/or string).', () => {
            [null, undefined, {}, false, 0].forEach(x => {
                expect(() => sliceFrom(99, x)).toThrow(Error);
            });
        })
    });
    describe('#sliceTo', () => {
        it ('should create a slice of an array "from" given index.', () => {
            const alphabetArrayLen = alphabetArray.length;
            alphabetArray.forEach((_, ind, list) => {
                const result = sliceTo(alphabetArrayLen - ind, list);

                // Compare slices
                expect(result).toEqual(list.slice(0, alphabetArrayLen - ind)); // deep equal

                // Compare lengths (calculated)
                expect(alphabetArrayLen - ind).toEqual(result.length);
            });
        });
        it ('should be curried', () => {
            const vowelsLen = vowelsArray.length;
            vowelsArray
                .map((_, ind) => sliceTo(vowelsLen - ind))
                .forEach((fn, ind) => {
                    const result = fn(vowelsArray);

                    // Compare slices
                    expect(result).toEqual(vowelsArray.slice(0, vowelsLen - ind)); // deep equal

                    // Compare lengths (calculated)
                    expect(vowelsLen - ind).toEqual(result.length);
                });
        });
        it ('should return an empty slice when given an empty slice', () => {
            expect(sliceTo(99, [])).toEqual([]);
        });
        it ('should throw an error when not receiving a `List` (a sliceable, an array, and/or string).', () => {
            [null, undefined, {}, false, 0].forEach(x => {
                expect(() => sliceTo(99, x)).toThrow(Error);
            });
        })
    });
    describe('#sliceCopy', () => {
        it('should return a copy of given slice', () => {
            [[], vowelsArray, alphabetArray]
                .map(x => [x, sliceCopy(x)])
                .forEach(([original, result]) => {
                    expect(result).toEqual(original); // deep equal
                    expect(result !== original).toEqual(true); // strict check
                });

            // String variant
            ['', vowelsString, alphabetString]
                .map(x => [x, sliceCopy(x)])
                .forEach(([original, result]) => {
                    expect(result).toEqual(original);
                });
        });
        it ('should throw an error when receiving non `List` value (non-(string|array|slicable))', () => {
            [null, undefined, {}, () => undefined].forEach(x => {
                expect(() => sliceCopy(x)).toThrow(Error);
            });
        });

    });
});
