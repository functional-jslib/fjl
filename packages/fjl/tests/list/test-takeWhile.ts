import {
  alphabetArray,
  alphabetString,
  isVowel,
  nonAlphaNums,
  nonAlphaNumsArray,
  vowelsArray,
  vowelsString
} from "../helpers";
import {range} from "../../src/list/range";
import {takeWhile} from "../../src/list";
import {Slice, PredForIndexable} from "../../src/types";

describe('#takeWhile', () => {
  it('should take elements while predicate is fulfilled and vice-versa', () => {
    (<[[PredForIndexable, Slice], Slice][]>[
      [[isVowel, vowelsString], vowelsString],
      [[isVowel, vowelsArray], vowelsArray],
      [[isVowel, alphabetString], 'a'],
      [[isVowel, alphabetArray], ['a']],
      [[isVowel, range(0, 5)], []],
      [[isVowel, nonAlphaNums], ''],
      [[isVowel, nonAlphaNumsArray], []],
      [[isVowel, ''], ''],
      [[isVowel, []], []],
    ])
      .forEach(([args, expected]) => {
        expect(takeWhile(args[0], args[1])).toEqual(expected);
      });
  });
  // @todo add failing case(s) here
});
