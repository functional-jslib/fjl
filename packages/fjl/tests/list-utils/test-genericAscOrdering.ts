import {expectFunction, vowelsArray} from "../helpers";
import {genericAscOrdering} from "../../src";

describe('#genericAscOrdering', () => {
  it('should return `-1` when ordering of `a` should be less than ordering of `b`', () => {
    vowelsArray.reduceRight((next, curr) => {
      if (!next) {
        return curr;
      }
      expect(genericAscOrdering(curr, next)).toEqual(-1);
      return curr;
    });

  });
  it('should return `1` when ordering of `a` should be greater than ordering of `b`', () => {
    vowelsArray.reduce((prev, curr) => {
      if (!prev) {
        return curr;
      }
      expect(genericAscOrdering(curr, prev)).toEqual(1);
      return curr;
    });
  });
  it('should return `0` when ordering of both `a` and `b` are equal', () => {
    vowelsArray.reduce((out, curr) => {
      out.push([curr, curr]);
      return out;
    }, [])
      .forEach(([a, b]) => {
        expect(genericAscOrdering(a, b)).toEqual(0);
      });
  });
  it ('should be curried', () => {
    vowelsArray.reduce((prev, curr) => {
      if (!prev) {
        return curr;
      }
      const fn = genericAscOrdering(curr);
      expectFunction(fn);
      expect(fn(prev)).toEqual(1);
      return curr;
    });
  });
});
