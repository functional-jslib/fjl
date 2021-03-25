import {curry, CurryOf2} from "../function/curry";
import {length} from "./length";
import {findIndexWhere} from "./utils";
import {slice, Slice} from "../platform/slice";
import {PredForSlice} from "./types";
import {sliceFrom} from "./utils/sliceFrom";

type DropWhile<T> = CurryOf2<PredForSlice<T>, Slice<T>, Slice<T>>;

export const

  /**
   * Returns an list without elements that match predicate.
   */
  dropWhile = <T>(p: PredForSlice<T>, xs: Slice<T>): Slice<T> => {
    const limit = length(xs),
      splitPoint =
        findIndexWhere(
          (x: T, i: number | string, xs: Slice<T>) => !p(x, i, xs),
          xs
        ) as number;
    return splitPoint === -1 ?
      sliceFrom(limit, xs) as Slice<T> :
      slice(splitPoint, limit, xs) as Slice<T>;
  },

  $dropWhile = curry(dropWhile) as DropWhile<any>;
