import {unfoldr} from "../../src/list/unfoldr";

describe('#unfoldr', () => {
  it('should be able to unfold any value from right to left.', () => {
    expect(
      unfoldr(minuend => {
        const diff = minuend - 1;
        return diff >= 0 ? [minuend, diff] : undefined;
      }, 10)
    ).toEqual([10, 9, 8, 7, 6, 5, 4, 3, 2, 1]);
  });
});
