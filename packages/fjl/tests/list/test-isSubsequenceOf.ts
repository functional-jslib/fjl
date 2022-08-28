import {isSubsequenceOf} from "../../src/list";
import {alphabetString, vowelsArray, vowelsString} from "../helpers";

describe('#isSubsequenceOf', () => {
  const firstSixOfAlphabet = alphabetString.slice(0, 6);
  (<[Parameters<typeof isSubsequenceOf>, boolean][]>[
    [['abc', firstSixOfAlphabet], true],
    [['bad', firstSixOfAlphabet], true],
    [['cab', firstSixOfAlphabet], true],
    [['ace', firstSixOfAlphabet], true],
    [['ace'.split(''), firstSixOfAlphabet.split('')], true],
    [['xyz'.split(''), firstSixOfAlphabet.split('')], false],
    [['#!@'.split(''), vowelsArray], false],
    [['!@#$%'.split(''), 'abc'.split('')], false],
    [['!@#$%', 'abc'], false],
    [[[''], vowelsArray], false],
    [['', vowelsString], true],
    [['', ''], true],
    [[[], []], true],
  ])
    .forEach(([args, expected]) => {
      it(`isSubsequenceOf(${JSON.stringify(args)}) === ${expected}`, () => {
        const rslt = isSubsequenceOf(...args);
        expect(rslt).toEqual(expected);
      });
    });
});
