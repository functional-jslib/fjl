import {all, foldl, length, splitAt, zip} from "../../src/list";
import {alphabetArray, expectEqual, expectTrue, vowelsArray} from "../helpers";
import {revVowelsArray} from "../../src/utils/test-utils";

describe('#zip', () => {
  (<[any[], any[], [any, any]][]>[
    [[], [], []],
    [vowelsArray, [], []],
    [[], vowelsArray, []],
    [vowelsArray, vowelsArray, vowelsArray.map(x => [x, x])],
    [vowelsArray, revVowelsArray, vowelsArray.map((x, i) => [x, revVowelsArray[i]])]
  ])
    .forEach(([xs1, xs2, expected]) => {
      it(`zip(${JSON.stringify(xs1)}, ${JSON.stringify(xs2)}) === ${JSON.stringify(expected)}`, () => {
        const rslt = zip(xs1, xs2);
        expect(rslt).toEqual(expected);
      });
    });
});
