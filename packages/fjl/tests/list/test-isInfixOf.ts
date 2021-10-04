import {isInfixOf} from "../../src/list";
import {alphabetArray, alphabetString, vowelsArray, vowelsString} from "../helpers";
import {Slice} from "../../src/types/data";

describe('#isInfixOf', () => {
  (<[Slice, Slice, boolean][]>[
    ['', '', false],
    [[], [], false],
    [vowelsString, vowelsString, true],
    [vowelsArray, vowelsArray, true],
    ['abc', alphabetString, true],
    [['x', 'y', 'z'], alphabetArray, true],
    ['efg', alphabetString, true],
    ['!@#', vowelsString, false],
    ['!@#'.split(''), vowelsArray, false],
    [vowelsString, 'aei', false],
    [vowelsArray, 'aei'.split(''), false],

  ])
    .forEach(([xs1, xs2, expected]) => {
      it(`isInfixOf(${JSON.stringify(xs1)}, ${JSON.stringify(xs2)} === ${expected}`, () => {
        const rslt = isInfixOf(xs1, xs2);
        expect(rslt).toEqual(expected);
      });
    });
});
