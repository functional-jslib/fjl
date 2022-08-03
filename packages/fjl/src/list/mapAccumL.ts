import {sliceCopy} from "./utils/sliceCopy";
import {length} from "./length";
import {Slice} from "../types/data";
import {Indexable, MapAccumOp} from "../types";

export const

  /**
   * Performs a map then a reduce all in one (from left-to-right). Returns a tuple
   * containing the aggregated value and the result of mapping the passed in function on passed in list.
   * @haskellType mapAccumL :: Traversable t => (a -> b -> (a, c)) -> a -> t b -> (a, t c)
   */
  mapAccumL = <A = any, B = any, MapRetT = any>(op: MapAccumOp<A, B, MapRetT>, zero: A, xs: Slice<B>): [A, Slice<MapRetT>] => {
    const list = sliceCopy(xs),
      limit = length(xs);
    if (!limit) {
      return [zero, list as unknown as Slice<MapRetT>];
    }
    let ind = 0,
      agg = zero,
      mapped = [],
      tuple;
    for (; ind < limit; ind++) {
      tuple = op(agg, (list as Indexable<B>)[ind], ind);
      agg = tuple[0];
      mapped.push(tuple[1]);
    }
    return [agg, mapped];
  },

  $mapAccumL = <A = any, B = any, MapRetT = any>(op: MapAccumOp<A, B, MapRetT>) =>
    (zero: A) =>
      (xs: Slice<B>): [A, Slice<MapRetT>] =>
        mapAccumL(op, zero, xs);
