import {alphabetArray, alphabetString, expectEqual, isVowel, nonAlphaNums, nonAlphaNumsArray} from "../helpers";
import {breakOnList} from "../../src/list/breakOnList";

describe('#breakOnList', () => {
    it('should take elements into first list while !predicate is fulfilled and elements ' +
        'that didn\'t match into second list', () => {
        const notIsVowel = x => !isVowel(x);
        [
            [[isVowel, ''], ['', '']],
            [[isVowel, []], [[], []]],
            [[isVowel, nonAlphaNums], [nonAlphaNums, '']],
            [[isVowel, nonAlphaNumsArray], [nonAlphaNumsArray, []]],
            [[notIsVowel, nonAlphaNums], ['', nonAlphaNums]],
            [[notIsVowel, nonAlphaNumsArray], [[], nonAlphaNumsArray]],
            [[isVowel, alphabetString], [alphabetString.slice(1), 'a']],
            [[isVowel, alphabetArray], [alphabetArray.slice(1), ['a']]],
        ].forEach(([args, expected]) => {
            expectEqual(breakOnList(...args), expected);
        });
    });
});
