import {revVowelsArray, vowelsArray} from "../helpers";
import {zipWithN} from "../../src/list";
import {Unary} from "../../src/types";

describe('#zipWithN', () => {
  const
    pair = (a, b) => [a, b],
    triplet = (a, b, c) => [a, b, c];
  (<[Unary<any[]>, any[][], any[][]][]>[
    [pair, [[], []], []],
    [triplet, [[], [], []], []],
    [triplet, [vowelsArray, [], []], []],
    [triplet, [[], vowelsArray, []], []],
    [triplet, [vowelsArray, vowelsArray, vowelsArray], vowelsArray.map(x => [x, x, x])],
    [triplet, [vowelsArray, revVowelsArray, vowelsArray], vowelsArray.map((x, i) => [x, revVowelsArray[i], x])]
  ])
    .forEach(([op, args, expected]) => {
      it(`zipWithN(${args.map(xs => JSON.stringify(xs)).join(',')}) === ${JSON.stringify(expected)}`, () => {
        const rslt = zipWithN(op, ...args);
        expect(rslt).toEqual(expected);
      });
    });
});
