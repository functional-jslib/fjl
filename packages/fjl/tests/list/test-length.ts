import {vowelsArray, vowelsString} from "../helpers";
import {length} from "../../src/list/length";
import {Lengthable} from "../../src/types";

describe('#lengths', () => {
  [
    [null, undefined],
    [undefined, undefined],
    [[], 0],
    [vowelsString, vowelsString.length],
    [vowelsArray, vowelsArray.length],
    [(a, b, c): number => a + b + c, 3],
    [function (a, b, c): number {
      return a + b + c;
    }, 3],
    [{}, undefined],
    [0, undefined],
    [false, undefined]
  ]
    .forEach(([item, expected]) => {
      it(`length(${JSON.stringify(item)}) === ${expected}`, () => {
        expect(length(item as Lengthable)).toEqual(expected);
      });
    });
});
