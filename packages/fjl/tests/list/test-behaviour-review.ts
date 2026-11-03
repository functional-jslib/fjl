/**
 * Behaviours pinned by the #122 review, for methods whose edge cases weren't covered elsewhere.
 */
import {
  $zip4, all, and, any, breakOnList, inits, insert, isInfixOf, isPrefixOf, isSubsequenceOf, isSuffixOf, or,
  pushN, rangeIter, sortBy, stripPrefix, subsequences, tails, take, zip4, zipN, zipWithN
} from "../../src/list";

describe('list/ behaviour review', () => {
  describe('#subsequences', () => {
    it('should keep items in sequence order, for strings and arrays', () => {
      expect(subsequences('abc')).toEqual(['', 'a', 'b', 'ab', 'c', 'ac', 'bc', 'abc']);
      expect(subsequences('abc'.split(''))).toEqual(
        ['', 'a', 'b', 'ab', 'c', 'ac', 'bc', 'abc'].map(x => x.split(''))
      );
    });
  });

  describe('#isSubsequenceOf', () => {
    (<[string, string, boolean][]>[
      ['ac', 'abc', true],
      ['ca', 'abc', false],
      ['aa', 'abc', false],
      ['', 'abc', true],
      ['', '', true],
      ['a', '', false],
      ['abc', 'abc', true],
    ]).forEach(([xs1, xs2, expected]) => {
      it(`isSubsequenceOf('${xs1}', '${xs2}') === ${expected}`, () => {
        expect(isSubsequenceOf(xs1, xs2)).toEqual(expected);
      });
    });

    it('should handle lists longer than 32 items', () => {
      const xs = 'a'.repeat(1000);
      expect(isSubsequenceOf(xs, xs)).toEqual(true);
    });
  });

  describe('#insert', () => {
    (<[number, number[], number[]][]>[
      [1, [], [1]],
      [0, [1], [0, 1]],
      [2, [1], [1, 2]],
      [2, [1, 3], [1, 2, 3]],
      [9, [1, 3], [1, 3, 9]],
    ]).forEach(([x, xs, expected]) => {
      it(`insert(${x}, ${JSON.stringify(xs)}) === ${JSON.stringify(expected)}`, () => {
        expect(insert(x, xs)).toEqual(expected);
      });
    });
  });

  describe('#take', () => {
    it('should return an empty list for a zero or negative count', () => {
      expect(take(0, [1, 2])).toEqual([]);
      expect(take(-1, [1, 2])).toEqual([]);
    });
  });

  describe('#breakOnList', () => {
    it('should split on the first item satisfying the predicate', () => {
      expect(breakOnList((x: number) => x > 3, [1, 2, 3, 4, 1, 2, 3, 4]))
        .toEqual([[1, 2, 3], [4, 1, 2, 3, 4]]);
    });
  });

  describe('#zipWithN, #zipN', () => {
    it('should apply the operation for a single list', () => {
      const tuple = (...xs: number[]): number[] => xs;
      expect(zipWithN(tuple, [1, 2])).toEqual([[1], [2]]);
      expect(zipWithN(tuple, [1, 2])).toEqual(zipN([1, 2]));
    });
  });

  describe('#zip4', () => {
    it('should zip to the shortest list', () => {
      const expected = [[1, 3, 5, 7]];
      expect(zip4([1, 2], [3, 4], [5, 6], [7])).toEqual(expected);
      expect($zip4([1, 2])([3, 4])([5, 6])([7])).toEqual(expected);
    });
  });

  describe('#pushN', () => {
    it('should push all items on to, and return, given list', () => {
      const xs = [1];
      expect(pushN(xs, 2, 3)).toBe(xs);
      expect(xs).toEqual([1, 2, 3]);
    });
  });

  describe('#sortBy', () => {
    it('should sort a copy using the given ordering', () => {
      const xs = [1, 3, 2];
      expect(sortBy((a, b) => b - a, xs)).toEqual([3, 2, 1]);
      expect(xs).toEqual([1, 3, 2]);
    });

    it('should fall back to ascending order', () => {
      expect(sortBy(undefined, [2, 1])).toEqual([1, 2]);
    });
  });

  describe('#rangeIter', () => {
    it('should yield the same items as `range`', () => {
      expect(Array.from(rangeIter(1, 3))).toEqual([1, 2, 3]);
      expect(Array.from(rangeIter(3, 1))).toEqual([3, 2, 1]);
    });
  });

  describe('empty input', () => {
    it('#isPrefixOf, #isInfixOf, #isSuffixOf should accept an empty needle', () => {
      [isPrefixOf, isInfixOf, isSuffixOf].forEach(fn => {
        expect(fn('', 'abc')).toEqual(true);
        expect(fn('', '')).toEqual(true);
        expect(fn([], [1])).toEqual(true);
        expect(fn('a', '')).toEqual(false);
      });
    });

    it('#stripPrefix should handle an empty prefix', () => {
      expect(stripPrefix('', 'abc')).toEqual('abc');
    });

    it('#inits should match #tails for empty lists', () => {
      expect(inits('')).toEqual(['']);
      expect(inits([])).toEqual([[]]);
      expect(inits('')).toEqual(tails(''));
    });

    it('#all, #and should be vacuously true, and #any, #or should not', () => {
      expect(all(x => x, [])).toEqual(true);
      expect(and([])).toEqual(true);
      expect(any(x => x, [])).toEqual(false);
      expect(or([])).toEqual(false);
    });
  });
});
