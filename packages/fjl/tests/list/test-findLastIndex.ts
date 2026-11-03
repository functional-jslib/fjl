import {findLastIndex} from "../../src/list/findLastIndex";
import {NumberIndexable, TernaryPred} from "../../src/types";
import {
  alphabetArray,
  vowelsArray,
  vowelsString
} from "../helpers";

describe(`#findLastIndex`, () => {
    const getPredForEqualTo = <T>(a: T): TernaryPred<T, number> => (b: T): boolean => a === b;

    (<[TernaryPred, NumberIndexable, number][]>[]
        .concat(
            // Falsy variations
            alphabetArray.slice(0)
                .filter(x => vowelsString.indexOf(x) === -1)
                .slice(0, vowelsString.length) // take only enough for tests
                .flatMap(x => {
                    const pred = getPredForEqualTo(x);
                    return [
                        [pred, vowelsArray, -1],
                        [pred, vowelsString, -1],
                    ];
                }),

            // Truthy variations
            vowelsArray.flatMap((x, i) => {
                const pred = getPredForEqualTo(x);
                return [
                    [pred, vowelsArray, i],
                    [pred, vowelsString, i],
                ];
            })
        ))
        .forEach(([pred, xs, expectedIndex]) => {
            it(`findLastIndex(${pred.toString()}, ${JSON.stringify(xs)}) === ${JSON.stringify(expectedIndex)}`, () => {
                const result = findLastIndex(pred, xs);
                expect(result).toEqual(expectedIndex);
            });
        });

    it('should return the last match when more than one element matches', () => {
        expect(findLastIndex((x: string) => x === 'a', ['a', 'b', 'a', 'c'])).toEqual(2);
        expect(findLastIndex((x: string) => x === 'a', 'abac')).toEqual(2);
    });
});
