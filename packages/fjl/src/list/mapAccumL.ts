import {curry} from "../function/curry";
import {sliceCopy} from "./utils/sliceCopy";
import {length} from "./length";
import {Slice} from "../platform";
import {Indexable, MapAccumFunc} from "../types";

export const

  /**
   * Performs a map then a reduce all in one (from left-to-right). Returns a tuple
   * containing the aggregated value and the result of mapping the passed in function on passed in list.
   */
  mapAccumL = <T, ZeroT>(op: MapAccumFunc<T, ZeroT>, zero: ZeroT, xs: Slice<T>): [ZeroT, Slice<ZeroT>] => {
    const list = sliceCopy(xs),
      limit = length(xs);
    if (!limit) {
      return [zero, list as Slice<ZeroT>];
    }
    let ind = 0,
      agg = zero,
      mapped = [],
      tuple;
    for (; ind < limit; ind++) {
      tuple = op(agg, (list as Indexable<T>)[ind], ind);
      agg = tuple[0];
      mapped.push(tuple[1]);
    }
    return [agg, mapped];
  },

  $mapAccumL = curry(mapAccumL);
