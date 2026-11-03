import {TernaryPred} from "../../src/types";
import {isVowel, notIsVowel} from "../helpers";
import {alphabetArray, alphabetString, vowelsArray, vowelsString} from "../helpers";
import {findIndex} from "../../src";

describe('#findIndex', () => {
  (<[string | string[], TernaryPred<string, number>, number][]>[
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

  const getPredForEqualTo = <T>(a: T): TernaryPred => (b: T): boolean => a === b;

  (<[Parameters<typeof findIndex>, number][]>[]
    .concat(
      // Falsy variations
      alphabetArray.slice(0)
        .filter(x => vowelsString.indexOf(x) === -1)
        .slice(0, vowelsString.length) // take only enough for tests
        .flatMap(x => {
          const pred = getPredForEqualTo(x);
          return [
            [[pred, vowelsArray], -1],
            [[pred, vowelsString], -1],
          ];
        }),

      // Truthy variations
      vowelsArray.flatMap((x, i) => {
        const pred = getPredForEqualTo(x);
        return [
          [[pred, vowelsArray], i],
          [[pred, vowelsString], i],
        ];
      })
    ))
    .forEach(([[pred, xs], expectedIndex]) => {
      it(`findIndex(${pred.toString()}, ${JSON.stringify(xs)}) === ${JSON.stringify(expectedIndex)}`, () => {
        const result = findIndex(pred, xs);
        expect(result).toEqual(expectedIndex);
      });
    });
});
