import {$unfoldr, $unfoldrIter, unfoldr, unfoldrIter, UnfoldrOp} from "../../src/list/unfoldr";
import {take} from "../../src/list/take";

const countdownFrom: UnfoldrOp<number, number> = minuend => {
    const diff = minuend - 1;
    return diff >= 0 ? [minuend, diff] : undefined;
  },

  // Operation that never returns `undefined` - unusable with the eager `unfoldr`
  countUpFrom: UnfoldrOp<number, number> = x => [x, x + 1];

describe('#unfoldr', () => {
  it('should be able to unfold any value from right to left.', () => {
    expect(unfoldr(countdownFrom, 10)).toEqual([10, 9, 8, 7, 6, 5, 4, 3, 2, 1]);
  });

  it('should return an empty list when the operation returns `undefined` immediately', () => {
    expect(unfoldr(() => undefined, 10)).toEqual([]);
  });

  it('should pass the list accumulated so far to the operation', () => {
    const seen = [] as number[][];

    unfoldr((x: number, _i, as: number[]) => {
      seen.push(as.slice(0));
      return x < 3 ? [x, x + 1] : undefined;
    }, 0);

    expect(seen).toEqual([[], [0], [0, 1], [0, 1, 2]]);
  });

  it('should be curried via `$unfoldr`', () => {
    expect($unfoldr(countdownFrom)(3)).toEqual([3, 2, 1]);
  });
});

describe('#unfoldrIter', () => {
  it('should yield the items of the list `unfoldr` builds', () => {
    expect([...unfoldrIter(countdownFrom, 10)]).toEqual(unfoldr(countdownFrom, 10));
  });

  it('should yield nothing when the operation returns `undefined` immediately', () => {
    expect([...unfoldrIter(() => undefined, 10)]).toEqual([]);
  });

  it('should be lazy - it should not call the operation until pulled from', () => {
    let calls = 0;

    const gen = unfoldrIter((x: number) => {
      calls += 1;
      return [x, x + 1] as [number, number];
    }, 0);

    // Nothing runs on construction
    expect(calls).toEqual(0);

    gen.next();
    expect(calls).toEqual(1);

    gen.next();
    expect(calls).toEqual(2);
  });

  it('should allow the caller to stop early on a non-terminating operation', () => {
    // The motivating case:  the eager `unfoldr` would loop forever here.
    expect(take(3, unfoldrIter(countUpFrom, 0))).toEqual([0, 1, 2]);
  });

  it('should support the fibonacci example from Haskell\'s docs', () => {
    expect(take(8, unfoldrIter(
      ([x, y]: [number, number]) => [x, [y, x + y]] as [number, [number, number]],
      [0, 1] as [number, number]
    ))).toEqual([0, 1, 1, 2, 3, 5, 8, 13]);
  });

  it('should be curried via `$unfoldrIter`', () => {
    expect([...$unfoldrIter(countdownFrom)(3)]).toEqual([3, 2, 1]);
  });
});
