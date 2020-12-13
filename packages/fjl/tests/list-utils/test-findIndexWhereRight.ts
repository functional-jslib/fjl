import {findIndexWhereRight} from "../../src/list/utils";
import {PredForSlice} from "../../src/list/types";
import {Slice} from "../../src/platform/slice";
import {
  alphabetArray,
  vowelsArray,
  vowelsString
} from "../helpers";

describe(`#findIndexWhereRight`, () => {
    const getPredForEqualTo = <T>(a: T): PredForSlice<T> => (b: T): boolean => a === b;

    (<[PredForSlice<any>, Slice<any>, number][]>[]
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
            it(`findIndexWhereRight(${pred.toString()}, ${JSON.stringify(xs)}) === ${JSON.stringify(expectedIndex)}`, () => {
                const result = findIndexWhereRight(pred, xs);
                expect(result).toEqual(expectedIndex);
            });
        });
});
