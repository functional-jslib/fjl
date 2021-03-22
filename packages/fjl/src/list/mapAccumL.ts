import {curry} from "../function/curry";
import {sliceCopy} from "./utils/sliceCopy";
import {length} from "../platform/object";

export const

  $mapAccumL = (op, zero, xs) => {
    const list = sliceCopy(xs),
      limit = length(xs);
    if (!limit) {
      return [zero, list];
    }
    let ind = 0,
      agg = zero,
      mapped = [],
      tuple;
    for (; ind < limit; ind++) {
      tuple = op(agg, list[ind], ind);
      agg = tuple[0];
      mapped = tuple[1];
    }
    return [agg, mapped];
  },

  /**
   * Performs a map then a reduce all in one (from left-to-right). Returns a tuple
   * containing the aggregated value and the result of mapping the passed in function on passed in list.
   * @function module:list.mapAccumL
   * @param op {Function} - Function<aggregator, item, index> : [aggregated, mapResult]
   * @param zero {*} - An instance of the passed in list type used to aggregate on.
   * @param xs {Array} - list type.
   * @return {Array} - [aggregated, list]
   */
  mapAccumL = curry($mapAccumL);
