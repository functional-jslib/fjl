import {alphabetArray, alphabetString, expectFunction, vowelsArray, vowelsLen, vowelsString} from "../helpers";
import {CurryOf1, toShortest} from "../../src";
import {Slice} from "../../src/types/data";
import {Variadic} from "../../src/types";
import {$toShortest} from "../../src/list/utils";

describe('#toShortest', () => {
  it('should return a list of lists trimmed to the smallest', () => {
    (<[Slice, Slice, number][]>[
      [vowelsArray, alphabetArray, vowelsLen],
      [vowelsString, alphabetString, vowelsLen],
      ['', [], 0]
    ])
      .forEach(([xs1, xs2, expectedLen]) => {
        const lists = [xs1, xs2],
          result = toShortest(...lists);
        result.forEach((sliced, ind) => {
          expect(sliced.length).toEqual(expectedLen);
          expect(sliced).toEqual(lists[ind].slice(0, sliced.length));
        });
      });
  });

  it('should be curried up to 2 parameters', () => {
    (<[Slice, Slice, number][]>[
      [vowelsArray, alphabetArray, vowelsLen],
      [vowelsString, alphabetString, vowelsLen],
      ['', [], 0]
    ])
      .forEach(([xs1, xs2, expectedLen]) => {
        const lists = [xs1, xs2],
          fn = $toShortest(xs1) as CurryOf1<Slice, Slice[]>,
          result = fn(xs2) as Slice[];
        expectFunction(fn);
        result.forEach((sliced, ind) => {
          expect(sliced.length).toEqual(expectedLen);
          expect(sliced).toEqual(lists[ind].slice(0, sliced.length));
        });
      });
  });
});
