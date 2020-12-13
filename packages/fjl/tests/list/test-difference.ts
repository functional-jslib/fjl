import {Slice} from "../../src/platform";
import {expectEqual} from "../helpers";
import {difference} from "../../src";

describe('#difference', () => {
  // @todo tablelize test messages
  it('should return an empty list when first list passed in is empty, ' +
    ' there are no differences between passed in lists, ', () => {
    (<[[Slice<any>, Slice<any>], Slice<any>][]>[
      [[[], []], []],
      [['', ''], []],
      [[null, undefined], []]
    ])
      .forEach(([args, expected]) => {
        expectEqual(difference(...args), expected);
      });
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
