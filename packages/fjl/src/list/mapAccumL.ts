import {MapAccumOp, Slice} from "../types";

export const

  /**
   * Performs a map then a reduce all in one (from left-to-right). Returns a tuple
   * containing the aggregated value and the result of mapping the passed in function on passed in list.
   * @haskellType mapAccumL :: Traversable t => (a -> b -> (a, c)) -> a -> t b -> (a, t c)
   */
  mapAccumL = <A, B, MapRetT>(op: MapAccumOp<A, B, MapRetT>, zero: A, xs: Slice<B>): [A, Slice<MapRetT>] => {
    const list = xs.slice(0),
      limit = xs.length;
    if (!limit) {
      return [zero, list as Slice<MapRetT>];
    }
    const mapped = [];
    let ind = 0,
      agg = zero,
      tuple;
    for (; ind < limit; ind++) {
      tuple = op(agg, (list as Slice<B>)[ind], ind);
      agg = tuple[0];
      mapped.push(tuple[1]);
    }
    return [agg, mapped];
  },

  $mapAccumL = <A, B, MapRetT>(op: MapAccumOp<A, B, MapRetT>) =>
    (zero: A) =>
      (xs: Slice<B>): [A, Slice<MapRetT>] =>
        mapAccumL(op, zero, xs);
