import {append, range, union} from "../../src/list";
import {expectEqual} from "../helpers";

describe('#union', () => {
  const mixedMatchRange = range(13, 8, -1).concat(range(1, 3));
  // ascRangeArgs = [[1, 2], [3, 5], [8, 13], [21, 24]],
  // descRangeArgs = reverse(map(tuple => append(reverse(tuple), [-1]), ascRangeArgs)),
  // [ascRanges, descRanges] =
  //     map(argsSet =>
  //         map(rangeArgs => apply(range, rangeArgs), argsSet),
  //         [ascRangeArgs, descRangeArgs]
  //     ),
  // [rl1, rl2, rl3, rl4] = ascRanges,
  // [lr1, lr2, lr3, lr4] = descRanges;
  it('should return a union on list 1 with list two', () => {
    (<[number[], number[], number, number[]][]>[// subj1, subj2, expectResultLen, expectedResultElements
      [[1, 2, 3], [1, 2, 3, 4, 5], 5, [1, 2, 3, 4, 5]],
      [[1, 2, 3, 4, 5, 6, 7, 8], [1, 2, 3], 8, [1, 2, 3, 4, 5, 6, 7, 8]],
      [[1, 2, 3, 4, 5], [1, 2, 3], 5, [1, 2, 3, 4, 5]],
      [mixedMatchRange, range(18, 21), 13, mixedMatchRange.concat(range(18, 21))]
    ])
      .forEach(testCase => {
        const [subj1, subj2, expectedLen, expectedElms] = testCase,
          result = union(subj1, subj2);
        expectEqual(result.length, expectedLen);
        expectEqual(result, expectedElms);
      });
  });
  it('should return a copy of left-most array when right-most list is empty', () => {
    (<[number[], [], number, number[]][]>[// subj1, subj2, expectResultLen, expectedResultElements
      [range(1, 5), [], 5, range(1, 5)],
      [range(1, 8), [], 8, range(1, 8)],
      [range(1, 13), [], 13, range(1, 13)],
      [mixedMatchRange, [], 9, mixedMatchRange]
    ])
      .forEach(testCase => {
        const [subj1, subj2, expectedLen, expectedElms] = testCase,
          result = union(subj1, subj2);
        expectEqual(result.length, expectedLen);
        expectEqual(result, expectedElms);
      });
  });
  it('should return a copy of right-most list when left-most list is empty', () => {
    (<[number[], [], number, number[]][]>[// subj1, subj2, expectResultLen, expectedResultElements
      [range(1, 5), [], 5, range(1, 5)],
      [range(1, 8), [], 8, range(1, 8)],
      [range(1, 13), [], 13, range(1, 13)],
      [mixedMatchRange, [], 9, mixedMatchRange]
    ])
      .forEach(testCase => {
        const [subj1, subj2, expectedLen, expectedElms] = testCase,
          result = union(subj1, subj2);
        expectEqual(result.length, expectedLen);
        expectEqual(result, expectedElms);
      });
  });
  it('should return an empty list when receiving empty lists', () => {
    expectEqual(union('', ''), '');
    expectEqual(union([], []), []);
  });
});
