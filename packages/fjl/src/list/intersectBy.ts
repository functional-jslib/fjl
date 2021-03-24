import {curry} from "../function/curry";
import {foldl} from "./foldl";
import {any} from "./any";
import {BinaryPred} from "../types";

export const

  intersectBy = <T>(pred: BinaryPred<T>, list1: T[], list2: T[]): T[] =>
    foldl((agg: T[], a: T) =>
        any((b: T) => pred(a as T, b), list2) ?
          (agg.push(a), agg) : agg
      , [], list1
    ),

  /**
   * Returns an intersection by predicate.
   */
  $intersectBy = curry(intersectBy);
