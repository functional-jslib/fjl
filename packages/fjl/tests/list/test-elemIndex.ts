import {$elemIndex, elemIndex} from "../../src/list/elemIndex";
import {vowelsArray, vowelsString} from "../helpers";

describe('#elemIndex', () => {
  (<[string, string | string[], number | undefined][]>[
    ['', vowelsArray, undefined],
    ['x', vowelsArray, undefined],
    ['x', vowelsString, undefined],
    ['i', vowelsArray, 2],
    ['i', vowelsString, 2],
  ])
    .forEach(([x, xs, expected]) => {
      it(`elemIndex("${x}", ${JSON.stringify(xs)}) === ${expected}`, () => {
        expect(elemIndex(x, xs)).toEqual(expected);
        expect($elemIndex(x)(xs)).toEqual(expected);
      });
    });
});
