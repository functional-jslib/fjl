import {curry, CurryOf2} from "../function/curry";
import {Slice, PredForSlice} from "../types";
import {typeOf} from "../object/typeOf";

type Filter<T> = CurryOf2<PredForSlice<T>, Slice<T>, T[]>;

export const

  /**
   * Filters a structure of elements using given predicate (`pred`) (same as `[].filter`).
   */
  filter = <T>(pred: PredForSlice<T>, xs: Slice<T>): Slice<T> => {
    let ind = 0;
    const limit = xs.length,
      isString = typeOf(xs) === 'String';
    let out = isString ? '' : [] as Slice<T>;
    if (!limit) {
      return out;
    }
    if (typeof xs === 'string') {
      for (; ind < limit; ind++) {
        if (pred(xs[ind] as unknown as T, ind, xs)) {
          out += xs[ind];
        }
      }
    } else {
      for (; ind < limit; ind++) {
        if (pred(xs[ind] as T, ind, xs)) {
          (out as T[]).push(xs[ind] as T);
        }
      }
    }
    return out;
  },

  $filter = curry(filter) as Filter<any>

;
