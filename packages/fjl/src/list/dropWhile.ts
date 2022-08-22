import {length} from "./length";
import {findIndexWhere} from "./utils";
import {slice} from "../platform/slice";
import {sliceFrom} from "./utils/sliceFrom";
import {PredForSlice, Slice} from "../types";

export const

  /**
   * Returns a list without elements that match predicate.
   */
  dropWhile = <T, XS extends Slice<T>>(p: PredForSlice<T>, xs: XS): XS => {
    const limit = xs.length,
      splitPoint: number =
        findIndexWhere(
                   (x: T, i: number | string, xs: XS) => !p(x, i, xs),
          xs
        );
    return splitPoint === -1 ? sliceFrom(limit, xs) :
      slice(splitPoint, limit, xs);
  },

  $dropWhile = <T, XS extends Slice<T>>(p: PredForSlice<T>) =>
    (xs: XS): XS => dropWhile(p, xs)

;
