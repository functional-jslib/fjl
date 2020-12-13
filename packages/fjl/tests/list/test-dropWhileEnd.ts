import {expectEqual, nonAlphaNumsArray, vowelsArray, vowelsString} from "../helpers";
import {dropWhileEnd} from "../../src/list/dropWhileEnd";
import {id} from "../../src/function/id";
import {UnaryPred} from "../../src/types";
import {Slice} from "../../src/platform/slice/types";

// @todo move test-case message(s) into loop
describe('#dropWhileEnd', () => {
    it('should drop elements while predicate is fulfilled', () => {
        const alnumRegex = /^[a-z]$/i,
            alnumPred: UnaryPred<string> = x => alnumRegex.test(x),
            nonAlnumPred: UnaryPred<string> = x => !alnumPred(x),
            getCharCodeGreaterThan = (greaterThanCharCode): UnaryPred<string> =>
                (x: string): boolean => x.charCodeAt(0) > greaterThanCharCode,
            nonAlnumsAndVowelsArray = nonAlphaNumsArray.concat(vowelsArray),
            nonAlnumsAndVowels = nonAlnumsAndVowelsArray.join(''),
            vowelsAndNonAlnumsArray = vowelsArray.concat(nonAlphaNumsArray),
            vowelsAndNonAlnums = vowelsAndNonAlnumsArray.slice(0).join('')
        ;
        (<[[UnaryPred<any>, Slice<any>], Slice<any>][]>[
            [[id, []], []],
            [[id, ''], ''],
            [[alnumPred, vowelsArray], []],
            [[alnumPred, vowelsString], ''],
            [[nonAlnumPred, vowelsArray], vowelsArray],
            [[nonAlnumPred, vowelsString], vowelsString],
            [[nonAlnumPred, nonAlnumsAndVowels], nonAlnumsAndVowels],
            [[nonAlnumPred, nonAlnumsAndVowelsArray], nonAlnumsAndVowelsArray],
            [[nonAlnumPred, vowelsAndNonAlnumsArray], vowelsArray],
            [[nonAlnumPred, vowelsAndNonAlnums], vowelsString],
        ]
            .concat(
                vowelsArray.map((c, ind) =>
                    [[getCharCodeGreaterThan(c.charCodeAt(0)), vowelsArray], vowelsArray.slice(0, ind + 1)]
                ),
                vowelsString.split('').map((c, ind) =>
                    [[getCharCodeGreaterThan(c.charCodeAt(0)), vowelsString], vowelsString.slice(0, ind + 1)]
                )
            ))
            .forEach(([args, expected]) => {
                const result = dropWhileEnd(args[0], args[1]);
                expectEqual(result, expected);
            });
    });
});
