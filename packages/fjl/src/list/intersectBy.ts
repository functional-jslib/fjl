import {curry} from "../function/curry";
import {$foldl} from "./foldl";
import {any} from "./any";
import {PredForSlice} from "./types";

export const

  $intersectBy = <T>(pred: PredForSlice<T>, list1: T[], list2: T[]): T[] =>
    $foldl((agg, a) =>
        any(b => pred(a, b), list2) ? (agg.push(a), agg) : agg
      , [], list1),

  /**
   * Returns an intersection by predicate.
   */
  intersectBy = curry($intersectBy);
