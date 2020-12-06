import {all, filter, length, range, splitAt, take, unfoldr, zipWith} from "../../src/list";
import {alphabetArray, expectEqual, expectTrue, vowelsArray} from "../helpers";
import {TuplizeOp} from "../../src/list/zipWith";
import {revVowelsArray} from "../helpers";

describe('#zipWith', () => {
  const pair = (a, b) => [a, b];
  (<[TuplizeOp<any, any>, any[], any[], [any, any]][]>[
    [pair, [], [], []],
    [pair, vowelsArray, [], []],
    [pair, [], vowelsArray, []],
    [pair, vowelsArray, vowelsArray, vowelsArray.map(x => [x, x])],
    [pair, vowelsArray, revVowelsArray, vowelsArray.map((x, i) => [x, revVowelsArray[i]])]
  ])
    .forEach(([op, xs1, xs2, expected]) => {
      it(`zipWith(${JSON.stringify(xs1)}, ${JSON.stringify(xs2)}) === ${JSON.stringify(expected)}`, () => {
        const rslt = zipWith(op, xs1, xs2);
        expect(rslt).toEqual(expected);
      });
    });
});
