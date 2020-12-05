import {filter, length, range, splitAt, take, unfoldr, zipN} from "../../src/list";
import {alphabetArray, expectEqual, vowelsArray} from "../helpers";
import {revVowelsArray} from "../../src/utils/test-utils";

describe('#zipN', () => {
  (<[any[][], any[]][]>[
    [[[], [], []], []],
    [[vowelsArray, [], []], []],
    [[[], [], vowelsArray, []], []],
    [[vowelsArray, vowelsArray], vowelsArray.map(x => [x, x])],
    [[vowelsArray, revVowelsArray], vowelsArray.map((x, i) => [x, revVowelsArray[i]])]
  ])
    .forEach(([xss, expected]) => {
      it(`zipN(${xss.map(x => JSON.stringify(x)).join(', ')}) === ${JSON.stringify(expected)}`, () => {
        const rslt = zipN(...xss);
        expect(rslt).toEqual(expected);
      });
    });
});
