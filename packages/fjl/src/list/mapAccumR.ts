import {curry} from "../function/curry";
import {sliceCopy} from "./utils/sliceCopy";
import {length} from "./length";
import {Indexable, MapAccumFunc, Slice} from "../types";

export const

  /**
   * Performs a map and a reduce all in one (from right-to-left). Returns a tuple
   * containing the aggregated value and the result of mapping the passed in function on passed in list.
   */
  mapAccumR = <T, ZeroT>(op: MapAccumFunc<T, ZeroT>, zero: ZeroT, xs: Slice<T>): [ZeroT, Slice<ZeroT>] => {
    const list = sliceCopy(xs),
      limit = length(xs);
    if (!limit) {
      return [zero, list as Slice<ZeroT>];
    }
    let ind = limit - 1,
      agg = zero,
      mapped = [],
      tuple;
    for (; ind >= 0; ind--) {
      tuple = op(agg, (list as Indexable<T>)[ind], ind);
      agg = tuple[0];
      mapped.push(tuple[1]);
    }
    return [agg, mapped];
  },

  $mapAccumR = curry(mapAccumR);
