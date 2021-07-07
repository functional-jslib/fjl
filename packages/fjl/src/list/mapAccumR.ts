import {curry} from "../function/curry";
import {sliceCopy} from "./utils/sliceCopy";
import {length} from "./length";
import {Indexable, MapAccumOp, Slice} from "../types";

export const

  /**
   * Performs a map and a reduce all in one (from right-to-left). Returns a tuple
   * containing the aggregated value and the result of mapping the passed in function on passed in list.
   */
  mapAccumR = <A = any, B = any, C = any>(op: MapAccumOp<A, B, C>, zero: A, xs: Slice<B>): [A, Slice<C>] => {
    const list = sliceCopy(xs),
      limit = length(xs);
    if (!limit) {
      return [zero, list as unknown as Slice<C>];
    }
    let ind = limit - 1,
      agg = zero,
      mapped = [],
      tuple;
    for (; ind >= 0; ind--) {
      tuple = op(agg, (list as Indexable<B>)[ind], ind);
      agg = tuple[0];
      mapped.push(tuple[1]);
    }
    return [agg, mapped];
  },

  $mapAccumR = curry(mapAccumR);
