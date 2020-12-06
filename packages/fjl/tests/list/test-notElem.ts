import {notElem} from "../../src/list";
import {Slice} from "../../src/platform/slice";
import {vowelsArray, vowelsString} from "../helpers";

describe('#notElem', () => {
  (<[Slice, any, boolean][]>[
    [vowelsArray, 'z', true],
    [vowelsString, 'z', true],
    [vowelsString, null, true],
    [vowelsArray, null, true],
    [vowelsString, undefined, true],
    [vowelsArray, undefined, true],
    ['', null, true],
    [[], undefined, true],
  ]
    .concat(vowelsArray.flatMap(c => [[vowelsArray, c, false], [vowelsString, c, false]])))
    .forEach(([xs, x, expected]) => {
      it(`notElem(${JSON.stringify(xs)}, ${JSON.stringify(x)} === ${expected}`, () => {
        const rslt = notElem(x, xs);
        expect(rslt).toEqual(expected);
      });
    });
});
