import {curry} from "../function/curry";
import {sliceCopy} from "./utils/sliceCopy";
import {length} from "./length";
import {Slice} from "../types";

export const

  /**
   * Performs a map and a reduce all in one (from right-to-left). Returns a tuple
   * containing the aggregated value and the result of mapping the passed in function on passed in list.
   */
  mapAccumR = <T>(op, zero, xs: Slice<T>): Slice<T> => {
    const list = sliceCopy(xs),
      limit = length(xs);
    if (!limit) {
      return [zero, list];
    }
    let ind = limit - 1,
      agg = zero,
      mapped = [],
      tuple;
    for (; ind >= 0; ind--) {
      tuple = op(agg, list[ind], ind);
      agg = tuple[0];
      mapped = tuple[1];
    }
    return [agg, mapped];
  },

  $mapAccumR = curry(mapAccumR);
