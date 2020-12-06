import {isSubsequenceOf} from "../../src/list";
import {alphabetString, vowelsArray, vowelsString} from "../helpers";
import {Slice} from "../../src/platform";

describe('#isSubsequenceOf', () => {
  const firstSixOfAlphabet = alphabetString.slice(0, 6);
  (<[Slice, Slice, boolean][]>[
    ['abc', firstSixOfAlphabet, true],
    ['bad', firstSixOfAlphabet, true],
    ['cab', firstSixOfAlphabet, true],
    ['ace', firstSixOfAlphabet, true],
    ['#!@', vowelsString, false],
    ['!@#$%', 'abc', false],
    ['!@#$%'.split(''), 'abc'.split(''), false],
    [['!'], vowelsArray, false],
    [['!'], vowelsArray, false],
  ])
    .forEach(([xs1, xs2, expected]) => {
      it(`isSubsequenceOf(${JSON.stringify(xs1)}, ${JSON.stringify(xs2)} === ${expected}`, () => {
        const rslt = isSubsequenceOf(xs1, xs2);
        expect(rslt).toEqual(expected);
      });
    });
});
