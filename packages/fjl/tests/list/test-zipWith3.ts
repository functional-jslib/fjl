import {zipWith3} from "../../src/list";
import {vowelsArray} from "../helpers";
import {revVowelsArray} from "../helpers";
import {Unary} from "../../src/types";
import {Ternary} from "../../dist/es";

describe('#zipWith3', () => {
  const triplet = (a, b, c) => [a, b, c];
  (<[Ternary<any[], any[], any[]>, any[], any[], any[], [any, any, any]][]>[
    [triplet, [], [], [], []],
    [triplet, vowelsArray, [], [], []],
    [triplet, [], vowelsArray, [], []],
    [triplet, vowelsArray, vowelsArray, vowelsArray, vowelsArray.map(x => [x, x, x])],
    [triplet, vowelsArray, revVowelsArray, vowelsArray, vowelsArray.map((x, i) => [x, revVowelsArray[i], x])]
  ])
    .forEach(([op, xs1, xs2, xs3, expected]) => {
      it(`zipWith3(${JSON.stringify(xs1)}, ${JSON.stringify(xs2)}, ${JSON.stringify(xs3)}) === ${JSON.stringify(expected)}`, () => {
        const rslt = zipWith3(op, xs1, xs2, xs3);
        expect(rslt).toEqual(expected);
      });
    });
});

