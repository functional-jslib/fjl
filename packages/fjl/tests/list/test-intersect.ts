import {intersect} from "../../src";

describe('#intersect', () => {
  it('should return an empty list when either of the first, second ' +
    'or both params passed in are empty arrays, or falsy values', () => {
    (<[any[], any[]][]>[
      [[[], [1, 2, 3]], []],
      [[null, null], []],
      [[undefined, undefined], []],
      [['', ''], []],
      [['abc', ''], []],
      [['abc', null], []],
      [[null, 'abc'], []]
    ])
      .forEach(([args, expected]) => {
        expect(intersect(...args)).toEqual(expected);
      });
  });

  it('should return an intersection of the two arrays passed in', () => {
    (<[number[], number[], number, number[]][]>[
      // subj1, subj2, expectLen, expectedElements
      [[1, 2, 3], [1, 2, 3, 4, 5], 3, [1, 2, 3]],
      [[1, 2, 3, 4, 5, 6, 7, 8], [1, 2, 3], 3, [1, 2, 3]],
      [[1, 2, 3, 4, 5], [1, 2, 3], 3, [1, 2, 3]]
    ])
      .forEach(testCase => {
        const [subj1, subj2, expectedLen, expectedElms] = testCase,
          result = intersect(subj1, subj2) as any[];
        expect(result.length).toEqual(expectedLen);
        result.forEach((elm, ind) => {
          expect(elm).toEqual(expectedElms[ind]);
        });
      });
  });
});
