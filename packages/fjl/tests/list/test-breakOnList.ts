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
      [[isVowel, alphabetArray], [[], alphabetArray]],
      [[(x: number) => x > 3, [1, 2, 3, 4, 1]], [[1, 2, 3], [4, 1]]],
      [[(x: number) => x > 9, [1, 2, 3]], [[1, 2, 3], []]],
      [[(x: number) => x < 9, [1, 2, 3]], [[], [1, 2, 3]]],
      [[(x: string) => x === 'c', 'abcd'], ['ab', 'cd']],
    ]).forEach(([args, expected]) => {
      expect(breakOnList(...args)).toEqual(expected);
    });
  });
});
