import {isVowel} from "../helpers";
import {UnaryPred} from "../../src/types";
import {Slice} from "../../src/platform";
import {alphabetArray, alphabetString, expectEqual, nonAlphaNums, nonAlphaNumsArray} from "../helpers";
import {breakOnList} from "../../src";

describe('#breakOnList', () => {
  // @todo tabelize test message
  it('should take elements into first list while !predicate is fulfilled and elements ' +
    'that didn\'t match into second list', () => {
    const notIsVowel = (x: string): boolean => !isVowel(x);
    (<[[UnaryPred<string>, Slice<string>], [Slice<string>, Slice<string>]][]>[
      [[isVowel, ''], ['', '']],
      [[isVowel, []], [[], []]],
      [[isVowel, nonAlphaNums], [nonAlphaNums, '']],
      [[isVowel, nonAlphaNumsArray], [nonAlphaNumsArray, []]],
      [[notIsVowel, nonAlphaNums], ['', nonAlphaNums]],
      [[notIsVowel, nonAlphaNumsArray], [[], nonAlphaNumsArray]],
      [[isVowel, alphabetString], [alphabetString.slice(1), 'a']],
      [[isVowel, alphabetArray], [alphabetArray.slice(1), ['a']]],
    ]).forEach(([args, expected]) => {
      expectEqual(breakOnList(...args), expected);
    });
  });
});
