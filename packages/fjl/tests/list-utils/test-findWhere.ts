import {findWhere} from "../../src/list/utils/findWhere";
import {PredForSlice} from "../../src/list/types";
import {Slice} from "../../src/platform/slice";
import {alphabetArray, alphabetString, expectEqual, expectError, vowelsArray, vowelsString} from "../helpers";

describe(`#findWhere`, () => {
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
                        [pred, vowelsArray, undefined],
                        [pred, vowelsString, undefined],
                    ];
                }),

            // Truthy variations
            vowelsArray.flatMap((x) => {
                const pred = getPredForEqualTo(x);
                return [
                    [pred, vowelsArray, x],
                    [pred, vowelsString, x],
                ];
            })
        ))
        .forEach(([pred, slice, expected]) => {
            it(`findWhere(${pred.toString()}, ${JSON.stringify(slice)}) === ${JSON.stringify(expected)}`, () => {
                const result = findWhere(pred, slice);
                expect(result).toEqual(expected);
            });
        });
});
