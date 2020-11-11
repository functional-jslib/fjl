import {
    alphabetArray,
    alphabetString, expectEqual,
    isVowel,
    nonAlphaNums,
    nonAlphaNumsArray,
    vowelsArray,
    vowelsString
} from "../helpers";
import {range} from "../../packages/list/range";
import {takeWhile} from "../../packages/list";

describe('#takeWhile', () => {
    it('should take elements while predicate is fulfilled and vice-versa', () => {
        [
            [[isVowel, vowelsString], vowelsString],
            [[isVowel, vowelsArray], vowelsArray],
            [[isVowel, alphabetString], 'a'],
            [[isVowel, alphabetArray], ['a']],
            [[isVowel, range(0, 5)], []],
            [[isVowel, nonAlphaNums], ''],
            [[isVowel, nonAlphaNumsArray], []],
            [[isVowel, ''], ''],
            [[isVowel, []], []],
        ]
            .forEach(([args, expected]) => {
                expectEqual(takeWhile(args[0], args[1]), expected);
            });
    });
    // @todo add failing case(s) here
});
