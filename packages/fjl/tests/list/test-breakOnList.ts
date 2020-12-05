import {isVowel} from "../../src/utils/test-utils";
import {UnaryPred} from "../../src/types";
import {SliceOf} from "../../src/platform";
import {alphabetArray, alphabetString, expectEqual, nonAlphaNums, nonAlphaNumsArray} from "../helpers";
import {breakOnList} from "../../src";

describe('#breakOnList', () => {
  // @todo tabelize test message
  it('should take elements into first list while !predicate is fulfilled and elements ' +
    'that didn\'t match into second list', () => {
    const notIsVowel = (x: string): boolean => !isVowel(x);
    (<[[UnaryPred<string>, SliceOf<string>], [SliceOf<string>, SliceOf<string>]][]>[
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
