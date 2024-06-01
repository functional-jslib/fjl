import type {Quaternary} from "../types";

/**
 * Performs a `reduce` and a `map` all in one (from left-to-right);
 * Takes a reduce function that returns a tuple containing
 * the aggregated result, and the mapped value, in a tuple, and
 * returns a tuple containing the aggregated value,
 * and the collected mapped values.
 */
export const mapAccumL = <AccumVal, B, MapOfB, Bs extends B[], MapOfBs extends MapOfB[]>(
    op: Quaternary<AccumVal, B, number, Bs, [AccumVal, MapOfB]>,
    zero: AccumVal,
    xs: Bs
  ): [AccumVal, MapOfBs] => {
    const limit = xs.length;

    if (!limit) return [zero, xs.slice(0) as unknown as MapOfBs];

    const mapped = [];
    let agg = zero;

    for (let i = 0; i < limit; i++) {
      const tuple = op(agg, xs[i], i, xs);

      agg = tuple[0];
      mapped.push(tuple[1]);
    }

    return [agg, mapped as unknown as MapOfBs];
  },

  $mapAccumL = <AccumVal, B, MapOfB, Bs extends B[], MapOfBs extends MapOfB[]>(
    op: Quaternary<AccumVal, B, number, Bs, [AccumVal, MapOfB]>,
  ) =>
    (zero: AccumVal) =>
      (xs: Bs): [AccumVal, MapOfBs] =>
        mapAccumL(op, zero, xs);
