import {alphabetArray, alphabetString, expectFunction, vowelsArray, vowelsLen, vowelsString} from "../helpers";
import {toShortest} from "../../src";
import {Slice} from "../../src/platform";
import {Variadic} from "../../src/types";
import {$toShortest} from "../../src/list/utils";

describe('#toShortest', () => {
  it('should return a list of lists trimmed to the smallest', () => {
    (<[Slice<any>, Slice<any>, Slice<any>]>[
      [vowelsArray, alphabetArray, vowelsLen],
      [vowelsString, alphabetString, vowelsLen],
      ['', [], 0]
    ])
      .forEach(([xs1, xs2, expectedLen]) => {
        const lists = [xs1, xs2],
          result = toShortest(...lists) as any[][];
        result.forEach((sliced, ind) => {
          expect(sliced.length).toEqual(expectedLen);
          expect(sliced).toEqual(lists[ind].slice(0, sliced.length));
        });
      });
  });
  it('should be curried up to 2 parameters', () => {
    (<[Slice<any>, Slice<any>, Slice<any>]>[
      [vowelsArray, alphabetArray, vowelsLen],
      [vowelsString, alphabetString, vowelsLen],
      ['', [], 0]
    ])
      .forEach(([xs1, xs2, expectedLen]) => {
        const lists = [xs1, xs2],
          fn = $toShortest(xs1) as Variadic<any[]>,
          result = fn(xs2);
        expectFunction(fn);
        result.forEach((sliced, ind) => {
          expect(sliced.length).toEqual(expectedLen);
          expect(sliced).toEqual(lists[ind].slice(0, sliced.length));
        });
      });
  });
});
