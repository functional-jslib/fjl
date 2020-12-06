import {isInfixOf} from "../../src/list";
import {alphabetArray, alphabetString, vowelsArray, vowelsString} from "../helpers";
import {Slice} from "../../src/platform/slice";

describe('#isInfixOf', () => {
  (<[Slice, Slice, boolean][]>[
    ['', '', false],
    [[], [], false],
    [vowelsString, vowelsString, true],
    [vowelsArray, vowelsArray, true],
    [alphabetString, 'abc', true],
    [alphabetArray, ['x', 'y', 'z'], true],
    [alphabetString, 'efg', true],
    ['!@#', vowelsString, false],
    ['!@#'.split(''), vowelsArray, false],
  ])
    .forEach(([xs1, xs2, expected]) => {
      it(`isInfixOf(${JSON.stringify(xs1)}, ${JSON.stringify(xs2)} === ${expected}`, () => {
        const rslt = isInfixOf(xs1, xs2);
        expect(rslt).toEqual(expected);
      });
    });
});
