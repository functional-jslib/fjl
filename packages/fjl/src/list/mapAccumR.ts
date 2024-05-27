import {MapAccumOp, Slice} from "../types";

export const

  /**
   * Performs a map and a reduce, all in one (from right-to-left), on each item, and returns the result of the reduce,
   * and the map, as a tuple.
   */
  mapAccumR = <A, B, C>(
    op: MapAccumOp<A, B, C>,
    zero: A,
    xs: Slice<B>
  ): [A, Slice<C>] => {
    const limit = xs.length;

    if (!limit) return [zero, xs.slice(0) as unknown as Slice<C>];

    const mapped = [];

    let agg = zero;

    for (let i = limit - 1; i >= 0; i--) {
      const tuple = op(agg, xs[i] as B, i);
      agg = tuple[0];
      mapped.push(tuple[1]);
    }

    return [agg, mapped];
  },

  /**
   * Curried version of `mapAccumR`.
   */
  $mapAccumR = <A, B, C>(op: MapAccumOp<A, B, C>) =>
    (zero: A) =>
      (xs: Slice<B>): [A, Slice] =>
        mapAccumR(op, zero, xs);
