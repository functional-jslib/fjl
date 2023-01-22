import {Quaternary} from "../types";

/**
 * Performs a `reduce` and a `map` all in one (from left-to-right);
 * Takes a reduce function that returns a tuple containing
 * the aggregated result, and the mapped value, in a tuple, and
 * returns a tuple containing the aggregated value,
 * and the collected mapped values.
 */
export const mapAccumL = <Agg, X>(
    op: (agg?: Agg, x?: X, i?: number, xs?: X[]) => [Agg, X],
    zero: Agg,
    xs: X[]
  ): [Agg, typeof xs] => {
    const limit = xs.length;

    if (!limit) return [zero, xs.slice(0)];

    const mapped = xs.slice(0, 0);
    let agg = zero;

    for (let i = 0; i < limit; i++) {
      const tuple = op(agg, xs[i], i, xs);

      agg = tuple[0];
      mapped.push(tuple[1]);
    }

    return [agg, mapped];
  },

  $mapAccumL = <Agg, X>(
    op: Quaternary<Agg, X, number, X[], [Agg, X]>
  ) =>
    (zero: Agg) =>
      (xs: X[]): [Agg, typeof xs] =>
        mapAccumL(op, zero, xs);
