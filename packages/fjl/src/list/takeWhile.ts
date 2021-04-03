import {curry, CurryOf2} from "../function/curry";
import {negateF3} from "../function/negate";
import {reduceUntil} from "./utils";
import {isString} from "../object/is";
import {of} from "../object/of";
import {push} from "./push";
import {Slice, SlicePred} from "../types/native";
import {PredForSlice} from "./types";

export const

  /**
   * Gives an list with passed elements while predicate was true.
   */
  takeWhile = <T>(pred: SlicePred<T>, xs: Slice<T>): Slice<T> =>
    reduceUntil(
      negateF3(pred),                                     // predicate
      isString(xs) ? (agg: Slice<T>, x): string =>
        (agg as string) + x : (agg, x) => push(x, agg as T[]),  // operation
      of(xs),                                             // aggregate
      xs
    ),

  $takeWhile = curry(takeWhile) as CurryOf2<PredForSlice<any>, Slice<any>, Slice<any>>;
