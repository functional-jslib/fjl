import { expectEqual, nonAlphaNumsArray, vowelsArray, vowelsString } from "../helpers";
import { dropWhileEnd } from "../../packages/list/dropWhileEnd";
import { id } from "../../packages/function/id";
// @todo move test-case message(s) into loop
describe('#dropWhileEnd', () => {
    it('should drop elements while predicate is fulfilled', () => {
        const alnumRegex = /^[a-z]$/i, alnumPred = x => alnumRegex.test(x), nonAlnumPred = x => !alnumPred(x), getCharCodeGreaterThan = (greaterThanCharCode) => (x) => x.charCodeAt(0) > greaterThanCharCode, nonAlnumsAndVowelsArray = nonAlphaNumsArray.concat(vowelsArray), nonAlnumsAndVowels = nonAlnumsAndVowelsArray.join(''), vowelsAndNonAlnumsArray = vowelsArray.concat(nonAlphaNumsArray), vowelsAndNonAlnums = vowelsAndNonAlnumsArray.slice(0).join('');
        [
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
            .concat(vowelsArray.map((c, ind) => [[getCharCodeGreaterThan(c.charCodeAt(0)), vowelsArray], vowelsArray.slice(0, ind + 1)]), vowelsString.split('').map((c, ind) => [[getCharCodeGreaterThan(c.charCodeAt(0)), vowelsString], vowelsString.slice(0, ind + 1)]))
            .forEach(([args, expected]) => {
            const result = dropWhileEnd(args[0], args[1]);
            expectEqual(result, expected);
        });
    });
});
//# sourceMappingURL=test-dropWhileEnd.js.map