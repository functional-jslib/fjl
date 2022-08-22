import {isVowel} from "../helpers";
import {alphabetArray, nonAlphaNums, nonAlphaNumsArray} from "../helpers";
import {breakOnList} from "../../src/list/breakOnList";

describe('#breakOnList', () => {
  // @todo tabelize test message
  it('should take elements into first list while !predicate is fulfilled and elements ' +
    'that didn\'t match into second list', () => {
    const notIsVowel = (x: string): boolean => !isVowel(x);
    (<[Parameters<typeof breakOnList>, ReturnType<typeof breakOnList>][]>[
      [[isVowel, []], [[], []]],
      [[isVowel, nonAlphaNums], [nonAlphaNums, '']],
      [[isVowel, nonAlphaNumsArray], [nonAlphaNumsArray, []]],
      [[notIsVowel, nonAlphaNumsArray], [[], nonAlphaNumsArray]],
      [[isVowel, alphabetArray], [alphabetArray.slice(1), ['a']]],
    ]).forEach(([args, expected]) => {
      expect(breakOnList(...args)).toEqual(expected);
    });
  });
});
