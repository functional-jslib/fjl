import {MapAccumOp, Slice} from "../types";
import {of} from "../object";

export const

  /**
   * Performs a map and a reduce all in one (from right-to-left). Returns a tuple
   * containing the aggregated value and the result of mapping the passed in function on passed in list.
   */
  mapAccumR = <A, B, C>(
    op: MapAccumOp<A, B, C>,
    zero: A,
    xs: Slice<B>
  ): [A, Slice<C>] => {
    const list = xs.slice(0),
      limit = xs.length;
    if (!limit) {
      return [zero, of(list) as Slice<C>];
    }
    const mapped = [];
    let ind = limit - 1,
      agg = zero,
      tuple;
    for (; ind >= 0; ind--) {
      tuple = op(agg,(list as Slice<B>)[ind], ind);
      agg = tuple[0];
      mapped.push(tuple[1]);
    }
    return [agg, mapped];
  },

  $mapAccumR = <A, B, C>(op: MapAccumOp<A, B, C>) =>
    (zero: A) =>
      (xs: Slice<B>): [A, Slice<C>] =>
        mapAccumR(op, zero, xs);
