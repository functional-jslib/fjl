import {partition} from "../../packages/list";
import {alphabetArray, alphabetString, isVowel, vowelsArray} from "../../packages/utils/test-utils";
import {SliceOf} from "../../packages/platform/slice";
import {PredForSliceOf} from "../../packages/list/types";

describe('#partition', () => {
    const nonVowels = alphabetArray.filter(x => !isVowel(x));
    (<[SliceOf<any>, PredForSliceOf<any>, [any[], any[]]][]>[
        [[], isVowel, [[], []]],
        ['', isVowel, [[], []]],
        [alphabetArray, isVowel, [vowelsArray, nonVowels]],
        [alphabetString, isVowel, [vowelsArray, nonVowels]]
    ])
        .forEach(([xs, pred, expected]) => {
            it(`partition(${pred}, ${JSON.stringify(xs)}) === ${JSON.stringify(expected)}`, function () {
                const rslt = partition(pred, xs);
                expect(rslt).toEqual(expected);
            });
        });
});

