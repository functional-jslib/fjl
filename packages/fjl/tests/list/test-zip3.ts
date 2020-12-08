import {revVowelsArray, vowelsArray} from "../helpers";
import {zip3} from "../../src/list";

describe('#zip3', () => {
  (<[[any[], any[], any[]], any[]][]>[
    [[[], [], []], []],
    [[vowelsArray, [], []], []],
    [[[], [], vowelsArray], []],
    [[vowelsArray, vowelsArray, vowelsArray], vowelsArray.map(x => [x, x, x])],
    [[vowelsArray, revVowelsArray, vowelsArray], vowelsArray.map((x, i) => [x, revVowelsArray[i], x])]
  ])
    .forEach(([xss, expected]) => {
      it(`zip3(${xss.map(x => JSON.stringify(x)).join(', ')}) === ${JSON.stringify(expected)}`, () => {
        const rslt = zip3(...xss);
        expect(rslt).toEqual(expected);
      });
    });
});
