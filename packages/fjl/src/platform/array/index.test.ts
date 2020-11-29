import {vowelsArray, isVowel, consonantsArray, nonAlphaNumsArray} from "../../utils/test-utils";
import {every, ArrayPred} from "./index";

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
            it(`every(${JSON.stringify(xs)})(isVowel) === ${expected}`, function () {
                const prepared = every(pred) as unknown as (_xs: any[]) => boolean,
                    rslt = prepared(xs);
                expect(rslt).toEqual(expected);
            });
        });
});
