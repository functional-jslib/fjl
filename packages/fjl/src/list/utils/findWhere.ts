import {curry, CurryOf2} from "../../function/curry";
import {length} from "../length";;
import {Slice, SlicePred} from "../../types/native";

export const

  /**
   * Finds an item by predicate or returns `undefined`.
   */
  findWhere = <T>(pred: SlicePred<T>, xs: Slice<T>): T | undefined => {
    let ind = 0;
    const limit = length(xs);
    if (!limit) {
      return;
    }
    for (; ind < limit; ind++) {
      const elm = xs[ind];
      if (pred(elm as T, ind, xs)) {
        return elm as T;
      }
    }
    return undefined;
  },

  /**
   * Curried version of `findWhere`.
   */
  $findWhere = curry(findWhere) as CurryOf2<SlicePred<any>, Slice<any>, any | undefined>

;
