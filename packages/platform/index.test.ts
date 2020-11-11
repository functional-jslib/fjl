import {vowelsArray, isVowel, consonantsArray, nonAlphaNumsArray} from "../utils/test-utils";
import every from "./array/every";
import {ArrayPred} from "./array/types";

describe('array.every', () => {
    (<[any[], ArrayPred<any>, boolean][]>[
        [vowelsArray, isVowel, true],
        [consonantsArray, isVowel, false],
        [nonAlphaNumsArray, isVowel, false]
    ])
        .forEach(([xs, pred, expected]) => {
            it(`every(${JSON.stringify(xs)}, isVowel) === ${expected}`, function () {
                const rslt = every(pred, xs);
                expect(rslt).toEqual(expected);
            });
        });
});
