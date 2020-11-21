import { vowelsArray, isVowel, consonantsArray, nonAlphaNumsArray } from "../utils/test-utils";
import every from "./array/every";
describe('array.every', () => {
    [
        [vowelsArray, isVowel, true],
        [consonantsArray, isVowel, false],
        [nonAlphaNumsArray, isVowel, false]
    ]
        .forEach(([xs, pred, expected]) => {
        it(`every(${JSON.stringify(xs)}, isVowel) === ${expected}`, function () {
            const rslt = every(pred, xs);
            expect(rslt).toEqual(expected);
        });
    });
});
//# sourceMappingURL=index.test.js.map