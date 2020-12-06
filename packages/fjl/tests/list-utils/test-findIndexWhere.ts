import {findIndexWhere} from "../../src/list/utils/findexIndexWhere";
import {PredForSliceOf} from "../../src/list/types";
import {SliceOf} from "../../src/platform/slice";
import {alphabetArray, vowelsArray, vowelsString} from "../helpers";

describe(`#findIndexWhere`, () => {
  const getPredForEqualTo = <T>(a: T): PredForSliceOf<T> => (b: T): boolean => a === b;

  (<[PredForSliceOf<any>, SliceOf<any>, number][]>[]
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
      it(`findIndexWhere(${pred.toString()}, ${JSON.stringify(xs)}) === ${JSON.stringify(expectedIndex)}`, () => {
        const result = findIndexWhere(pred, xs);
        expect(result).toEqual(expectedIndex);
      });
    });
});
