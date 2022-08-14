import {Slice, PredForSlice} from "../types";
import {typeOf} from "../object/typeOf";

export const

  /**
   * Filters a structure of elements using given predicate (`pred`) (same as `[].filter`).
   */
  filter = <T, XS extends Slice<T>>(pred: PredForSlice<T>, xs: XS): XS => {
    let ind = 0;
    const limit = xs.length,
      isString = typeOf(xs) === 'String';
    let out = (isString ? '' : []) as unknown as typeof xs;
    if (!limit) {
      return out;
    }
    if (isString) {
      for (; ind < limit; ind++) {
        if (pred(xs[ind], ind, xs)) {
          // @ts-ignore
          out += xs[ind];
        }
      }
    } else {
      for (; ind < limit; ind++) {
        if (pred(xs[ind], ind, xs)) {
          (out as T[]).push(xs[ind] as T);
        }
      }
    }
    return out;
  },

  $filter = <T, XS extends Slice<T>>(pred: PredForSlice<T>) =>
    (xs: XS): XS => filter(pred, xs)

;
