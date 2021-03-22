import {curry} from "../function/curry";
import {sliceCopy} from "./utils/sliceCopy";
import {length} from "../platform/object";
import {Slice} from "../types";

export const

  $mapAccumR = <T>(op, zero, xs: Slice<T>): Slice<T> => {
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

  /**
   * Performs a map and a reduce all in one (from right-to-left). Returns a tuple
   * containing the aggregated value and the result of mapping the passed in function on passed in list.
   * @function module:list.mapAccumR
   * @param op {Function} - Function<aggregator, item, index> : [aggregated, mapResult]
   * @param zero {*} - An instance of the passed in list type used to aggregate on.
   * @param xs {Array} - list type.
   * @return {Array} - [aggregated, list]
   */
  mapAccumR = curry($mapAccumR);
