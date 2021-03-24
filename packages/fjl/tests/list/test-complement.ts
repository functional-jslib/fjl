import {expectEqual, expectFunction} from "../helpers";
import {complement, Curry1} from "../../src";
import {Slice} from "../../src/platform";

describe('#complement', () => {
  it('should be a function', () => {
    expectFunction(complement);
  });
  it('should return an empty list when receiving 2 or more values consisting of ' +
    '`null`, `undefined` and/or empty list (`\'\'`, `[]`).', () => {
    (<Slice<any>[]>[
      [undefined, undefined],
      [null, null, '', null],
      [[], null, undefined],
      [undefined, null, []],
      [[], [], []],
      [[], []],
      ['', ''],
      ['', undefined, ''],
      [undefined, '', [], null]
    ])
      .forEach(args => expectEqual(complement(...args), []));
  });
  it('should return elements not in first list passed to it', () => {
    const testCases: Array<[number[][], number, number[]]> = [
      [[[1, 2, 3], [1, 2, 3, 4, 5]], 2, [4, 5]],
      [[[1, 2, 3], [1, 2, 3, 4, 5], [1, 2, 3, 4, 5, 6, 7, 8]], 7, [4, 5, 4, 5, 6, 7, 8]],
      [[[1, 2, 3], [1, 2, 3, 4, 5], [1, 2, 3, 4, 5, 1, 2, 3]], 4, [4, 5, 4, 5]]
    ];
    testCases.forEach(testCase => {
      const [subjects, expectedLen, expectedElms] = testCase,
        result = complement(...subjects) as number[];
      expectEqual(result.length, expectedLen);
      result.forEach((elm, ind) => {
        expectEqual(elm, expectedElms[ind]);
      });
    });
  });
});
