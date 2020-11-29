import {range, reverse} from "../../packages/list";

describe('#range', () => {
    const zeroToNine = '0123456789'.split('').map(x => parseInt(x, 10)),
        zeroToNegativeNine = '0,-1,-2,-3,-4,-5,-6,-7,-8,-9'
            .split(',')
            .map(x => parseInt(x, 10)),
        negativeNineToZero = reverse(zeroToNegativeNine),
        nineToZero = reverse(zeroToNine),
        checkRanges = rangeSets => rangeSets.forEach(([result, expected]) => {
            expect(result.length).toEqual(expected.length);
            expect(result).toEqual(expected);
        })
    ;

    it('should be able to return a forward range (with and without `step`)', () => {
        checkRanges([
            [range(0, 9), zeroToNine],
            [range(-9, 0), negativeNineToZero],
            [range(0, 9, 1), zeroToNine],
            [range(-9, 0, 1), negativeNineToZero]
        ]);
    });
    it('should be able to return a negative (with and without `step`', () => {
        checkRanges([
            [range(9, 0), nineToZero],
            [range(0, -9), zeroToNegativeNine],
            [range(9, 0, -1), nineToZero],
            [range(0, -9, -1), zeroToNegativeNine]
        ]);
    });
    it('should still return a valid range even when range is unreachable given `step` (step gets normalized)', () => {
        checkRanges([
            [range(9, 0, 1), nineToZero],
            [range(0, -9, 1), zeroToNegativeNine],
            [range(-9, 0, -1), negativeNineToZero]
        ]);
    });
});

