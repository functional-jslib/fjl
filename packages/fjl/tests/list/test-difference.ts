import {expectEqual} from "../helpers";
import {append, difference} from "../../src";

describe('#difference', () => {
  // @todo tablelize test messages
  it('should return an empty list when first list passed in is empty, ' +
    ' there are no differences between passed in lists, ', () => {
    (<[Parameters<typeof difference>, any[]][]>[
      [[[], []], []],
    ])
      .forEach(([args, expected]) => {
        expectEqual(difference(...args), expected);
      });
  });
  it('should remove one occurrence per item of the second list', () => {
    expectEqual(difference([1, 1, 2], [1]), [1, 2]);
    expectEqual(difference([1, 1, 2], [1, 1, 1]), [2]);
    expectEqual(difference('Hello World!', 'ell W'), 'Hoorld!');
  });
  it('should satisfy `difference(append(xs, ys), xs)` equals `ys`', () => {
    (<[number[], number[]][]>[
      [[], []], [[1], []], [[], [1]], [[1, 2], [3]], [[1, 2], [1, 2]], [[1, 1, 2], [2, 1, 1, 3]],
    ]).forEach(([xs, ys]) => expectEqual(difference(append(xs, ys), xs), ys));
  });
  it('should not give back the same array', () => {
    const xs = [1, 2];
    expect(difference(xs, [])).not.toBe(xs);
    expectEqual(difference(xs, []), xs);
  });
  it('should return the difference between two arrays passed in', () => {
    const testCases: [number[], number[], number, number[]][] = [
      // subj1, subj2, expectLen, expectedElements
      [[1, 2, 3], [1, 2, 3, 4, 5], 0, []],
      [[1, 2, 3, 4, 5, 6, 7, 8], [1, 2, 3], 5, [4, 5, 6, 7, 8]],
      [[1, 2, 3, 4, 5], [1, 2, 3], 2, [4, 5]]
    ];
    testCases.forEach(([subj1, subj2, expectedLen, expectedElms]) => {
      const result = difference(subj1, subj2) as number[];
      expectEqual(result.length, expectedLen);
      result.forEach((elm, ind) => {
        expectEqual(elm, expectedElms[ind]);
      });
    });
  });
});
