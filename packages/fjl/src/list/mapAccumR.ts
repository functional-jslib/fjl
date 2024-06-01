import {Quaternary, Slice} from "../types";

export const

  /**
   * Performs a map and a reduce, all in one (from right-to-left), on each item in the given array, and
   * returns the result of the reduce, and the map, as a tuple, respectively.
   */
  mapAccumR = <AccumVal, B, MapOfB, Bs extends Slice<B>, MapOfBs extends Slice<MapOfB>>(
    op: Quaternary<AccumVal, B, number, Bs, [AccumVal, MapOfB]>,
    zero: AccumVal,
    bs: Bs
  ): [AccumVal, MapOfBs] => {
    const limit = bs.length;

    if (!limit) return [zero, bs.slice(0) as unknown as MapOfBs];

    const mapped = [];

    let agg = zero;

    for (let i = limit - 1; i >= 0; i--) {
      const tuple = op(agg, bs[i] as B, i, bs);
      agg = tuple[0];
      mapped.push(tuple[1]);
    }

    return [agg, mapped as unknown as MapOfBs];
  },

  /**
   * Curried version of `mapAccumR`.
   */
  $mapAccumR = <AccumVal, B, MapOfB, Bs extends Slice<B>, MapOfBs extends Slice<MapOfB>>(
    op: Quaternary<AccumVal, B, number, Bs, [AccumVal, MapOfB]>,
  ) =>
    (zero: AccumVal) =>
      (bs: Bs): [AccumVal, MapOfBs] =>
        mapAccumR(op, zero, bs);
