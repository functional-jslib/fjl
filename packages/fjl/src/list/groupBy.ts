import {curry, CurryOf2} from "../function/curry";
import {length} from "../platform/object";
import {sliceCopy} from "./utils/sliceCopy";
import {$takeWhile} from "./takeWhile";
import {$slice, SliceOf} from "../platform/slice";
import {BinaryPred} from "../types";
import {PredForSliceOf} from "./types";

export const

  /**
   * Groups given items by given predicate.
   */
  $groupBy = <T>(equalityOp: PredForSliceOf<T>, xs: SliceOf<T>): SliceOf<T>[] => {
    const limit = length(xs);
    if (!limit) {
      return [sliceCopy(xs)];
    }
    let ind = 0,
      prevItem,
      item
    ;
    const _xs = (!(xs as T[]).push ? Array.from(xs as string) : xs) as SliceOf<T>,
      predOp: PredForSliceOf<T> = (x: T): boolean => {
        if (equalityOp(x, prevItem)) {
          ind++;
        }
        if (equalityOp(x, item)) {
          prevItem = x;
          return true;
        }
        return false;
      },
      agg: SliceOf<T>[] = []
    ;
    for (; ind < limit; ind += 1) {
      item = xs[ind];
      agg.push($takeWhile(predOp, $slice(ind, limit, _xs)) as SliceOf<T>);
    }
    return agg;
  },

  /**
   * Curried version of `$groupBy`.
   */
  groupBy = curry($groupBy) as CurryOf2<BinaryPred<any>, SliceOf<any>, SliceOf<any>[]>

;
