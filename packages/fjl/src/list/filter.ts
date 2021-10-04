import {curry} from "../function/curry";
import {Slice, PredForSlice} from "../types";
import {typeOf} from "../object/typeOf";

export const

  /**
   * Filters a structure of elements using given predicate (`pred`) (same as `[].filter`).
   */
  filter = <T>(pred: PredForSlice<T>, xs: Slice<T>): Slice<T> => {
    let ind = 0;
    const limit = xs.length,
      isString = typeOf(xs) === 'String';
    let out = isString ? '' : [] as T[];
    if (!limit) {
      return out as Slice<T>;
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
    return out as Slice<T>;
  },

  $filter = curry(filter)

;
