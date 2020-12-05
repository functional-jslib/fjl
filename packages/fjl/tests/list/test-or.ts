import {expectEqual, expectError} from "../helpers";
import {range, sum} from "../../src";

describe('#sum', () => {
  it('should be able sum up any given list of numbers list of numbers', () => {
    expectEqual(sum(range(1, 5)), 15);
    expectEqual(sum(range(-5, -1)), -15);
  });
  it('should return `0` when receiving an empty list', () => {
    expectEqual(sum([]), 0);
  });
  it('should throw an error when receiving nothing (`null` or `undefined`)', () => {
    expectError(() => sum(null));
    expectError(() => sum(undefined));
    expectError(sum);
  });
});
