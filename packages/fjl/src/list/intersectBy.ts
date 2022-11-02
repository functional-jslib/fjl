import {foldl} from "./foldl";
import {any} from "./any";
import {BinaryPred} from "../types";

/**
 * Returns an intersection by predicate.
 */
export const

  intersectBy = <T>(pred: BinaryPred<T>, list1: T[], list2: T[]): T[] =>
    foldl((agg: T[], a: T) =>
        any((b: T) => pred(a as T, b), list2) ?
          (agg.push(a), agg) : agg
      , [], list1
    ),

  $intersectBy = <T>(pred: BinaryPred<T>) =>
    (list1: T[]) =>
      (list2: T[]): T[] => intersectBy(pred, list1, list2);
