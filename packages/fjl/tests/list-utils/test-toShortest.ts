import {alphabetArray, alphabetString, expectFunction, vowelsArray, vowelsLen, vowelsString} from "../helpers";
import {toShortest} from "../../src";

describe('#toShortest', () => {
  it('should return a list of lists trimmed to the smallest', () => {
    [
      [vowelsArray, alphabetArray, vowelsLen],
      [vowelsString, alphabetString, vowelsLen],
      ['', [], 0]
    ]
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
    [
      [vowelsArray, alphabetArray, vowelsLen],
      [vowelsString, alphabetString, vowelsLen],
      ['', [], 0]
    ]
      .forEach(([xs1, xs2, expectedLen]) => {
        const lists = [xs1, xs2],
          fn = toShortest(xs1),
          result = fn(xs2);
        expectFunction(fn);
        result.forEach((sliced, ind) => {
          expect(sliced.length).toEqual(expectedLen);
          expect(sliced).toEqual(lists[ind].slice(0, sliced.length));
        });
      });
  });
});
