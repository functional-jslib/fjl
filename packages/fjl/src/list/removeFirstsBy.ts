import {foldl} from "./foldl";
import {removeBy} from "./removeBy";
import {BinaryPred} from "../types";

export const

  /**
   * The `removeFirstsBy` function takes a predicate and two lists and returns the first list with the first
   * occurrence of each element of the second list removed.
   */
  removeFirstsBy = <TS extends string | any[]>(pred: BinaryPred<TS[number]>, xs1: TS, xs2: TS): TS =>
    foldl((agg: TS, x: TS[number]) => removeBy(pred, x, agg) as TS, xs1, xs2),

  $removeFirstsBy = <TS extends string | any[]>(pred: BinaryPred<TS[number]>) =>
    (xs1: TS) =>
      (xs2: TS): TS => removeFirstsBy(pred, xs1, xs2);
