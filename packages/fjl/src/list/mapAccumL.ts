import {MapAccumOp} from "../types";

export const

  /**
   * Performs a `map`, then a `reduce`, all in one (from left-to-right). Returns a tuple
   * containing the aggregated value and the result of mapping the passed in
   * function on passed in list.
   */
  mapAccumL = <A, B, MapRetT>(
    op: MapAccumOp<A, B, MapRetT>,
    zero: A,
    xs: string | B[]
  ): [A, string | MapRetT[] | undefined] => {
    const limit = xs.length;

    if (!limit) return [zero, xs.slice(0) as string | MapRetT[]];

    const mapped = [];

    let agg = zero;

    for (let i = 0; i < limit; i++) {
      const tuple = op(agg, xs[i] as B, i);
      agg = tuple[0];
      mapped.push(tuple[1]);
    }

    return [agg, mapped];
  },

  $mapAccumL = <A, B, MapRetT>(op: MapAccumOp<A, B, MapRetT>) =>
    (zero: A) =>
      (xs: string | B[]): [A, string | MapRetT[]] =>
        mapAccumL(op, zero, xs);
