import {curry, CurryOf2} from "../function/curry";
import {Slice, SlicePred} from "../platform/slice";

type Filter<T> = CurryOf2<SlicePred<T>, Slice<T>, T[]>;

export const

  $filter = <T>(pred: SlicePred<T>, xs: Slice<T>): Slice<T> => {
    let ind = 0;
    const limit = xs.length,
      out: any[] = [];
    if (!limit) {
      return out;
    }
    for (; ind < limit; ind++) {
      if (pred(xs[ind] as T, ind, xs)) {
        out.push(xs[ind]);
      }
    }
    return out;
  },

  /**
   * Filters a structure of elements using given predicate (`pred`) (same as `[].filter`).
   */
  filter = curry($filter) as Filter<any>

;
