import {partition} from "../../src/list";
import {alphabetArray, alphabetString, isVowel, vowelsArray} from "../helpers";
import {Slice} from "../../src/platform/slice";
import {PredForSlice} from "../../src/list/types";

describe('#partition', () => {
    const nonVowels = alphabetArray.filter(x => !isVowel(x));
    (<[Slice<any>, PredForSlice<any>, [any[], any[]]][]>[
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

