import {vowelsArray, vowelsString} from "../helpers";
import {uncons} from "../../src/list/uncons";

describe('#uncons', () => {
  (<[any[], any[] | any][]>[
    [[], undefined],
    [null, undefined],
    [undefined, undefined],
    [false, undefined],
    [0, undefined],
    ['', undefined],
    ['a', ['a', '']],
    [['a'], ['a', []]],
    [vowelsString, [vowelsString[0], vowelsString.slice(1)]],
    [vowelsArray, [vowelsArray[0], vowelsArray.slice(1)]],
  ])
    .forEach(([xs, expected]) => {
      it(`uncons(${JSON.stringify(xs)}) === ${JSON.stringify(expected)}`, () => {
        expect(uncons(xs)).toEqual(expected);
      });
    });
});
