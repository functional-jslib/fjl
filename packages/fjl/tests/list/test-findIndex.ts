import {SliceOf} from "../../src/platform";
import {PredForSliceOf} from "../../src/list/types";
import {isVowel, notIsVowel} from "../helpers";
import {alphabetArray, alphabetString, vowelsArray, vowelsString} from "../helpers";
import {findIndex} from "../../src";

describe('#findIndex', () => {
  (<[SliceOf<string>, PredForSliceOf<string>, number][]>[
    ['', isVowel, -1],
    [[], isVowel, -1],
    [vowelsArray, isVowel, 0],
    [vowelsString, isVowel, 0],
    [vowelsString, notIsVowel, -1],
    [alphabetString, notIsVowel, 1],
    [alphabetArray, notIsVowel, 1],
  ])
    .forEach(([word, pred, expected]) => {
      it(`findIndex(${pred}, ${JSON.stringify(word)}) === ${expected}`, () => {
        const rslt = findIndex(pred, word);
        expect(rslt).toEqual(expected);
      });
    });
});
