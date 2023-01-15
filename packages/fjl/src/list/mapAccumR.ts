import {MapAccumOp} from "../types";

export const

  /**
   * Performs a map and a reduce all in one (from right-to-left). Returns a tuple
   * containing the aggregated value and the result of mapping the passed in function on passed in list.
   */
  mapAccumR = <A, B, C>(
    op: MapAccumOp<A, B, C>,
    zero: A,
    xs: string | B[]
  ): [A, string | C[]] => {
    const limit = xs.length;

    if (!limit) return [zero, xs.slice(0) as string | C[]];

    const mapped = [];

    let agg = zero;

    for (let i = limit - 1; i >= 0; i--) {
      const tuple = op(agg, xs[i] as B, i);
      agg = tuple[0];
      mapped.push(tuple[1]);
    }

    return [agg, mapped];
  },

  $mapAccumR = <A, B, C>(op: MapAccumOp<A, B, C>) =>
    (zero: A) =>
      (xs: string | B[]): [A, string | C[]] =>
        mapAccumR(op, zero, xs);
