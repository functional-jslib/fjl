import {notElem} from "../../src/list";
import {vowelsArray, vowelsString} from "../helpers";

describe('#notElem', () => {
  (<[string | any[], any, boolean][]>[
      [vowelsArray, 'z', true],
      [vowelsString, 'z', true],
      [vowelsString, null, true],
      [vowelsArray, null, true],
      [vowelsString, undefined, true],
      [vowelsArray, undefined, true],
      ['', null, true],
      [[], undefined, true],
    ]
      .concat(vowelsArray.flatMap(c => [
        [vowelsArray, c, false], [vowelsString, c, false]
      ]))
  )
    .forEach(([xs, x, expected]) => {
      it(`notElem(${JSON.stringify(x)}, ${JSON.stringify(xs)}) === ${expected}`, () => {
        const rslt = notElem(x, xs);
        expect(rslt).toEqual(expected);
      });
    });
});
