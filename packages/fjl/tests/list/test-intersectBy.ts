import {expectEqual} from "../helpers";
import {intersectBy, length} from "../../src/list";

describe('#intersectBy', () => {
  const equality = (a, b) => a === b;
  // it ('should have more tests written');
  it('should return an empty list when receiving an empty list', () => {
    expectEqual(length(intersectBy(equality, [], [1, 2, 3])), 0);
  });
  it('should return an empty list when receiving an empty list as parameter 2', () => {
    expectEqual(length(intersectBy(equality, [1, 2, 3], [])), 0);
  });
  it('should return an empty list when both arrays passed are empty', () => {
    expectEqual(length(intersectBy(equality, [], [])), 0);
  });
  it('should return an intersection of the two arrays on equality function', () => {
    (<[number[], number[], number, number[]][]>[
      // subj1, subj2, expectLen, expectedElements
      [[1, 2, 3], [1, 2, 3, 4, 5], 3, [1, 2, 3]],
      [[1, 2, 3, 4, 5, 6, 7, 8], [1, 2, 3], 3, [1, 2, 3]],
      [[1, 2, 3, 4, 5], [1, 2, 3], 3, [1, 2, 3]]
    ])
      .forEach(([subj1, subj2, expectedLen, expectedElms]) => {
        const result = intersectBy(equality, subj1, subj2);
        expectEqual(result.length, expectedLen);
        result.forEach((elm, ind) => {
          expectEqual(elm, expectedElms[ind]);
        });
      });
  });
});
