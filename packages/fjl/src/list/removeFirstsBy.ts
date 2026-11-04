import {foldl} from "./foldl";
import {removeBy} from "./removeBy";
import {sliceCopy} from "./utils/sliceCopy";
import {ListOf, toItems} from "./utils/items";
import {BinaryPred} from "../types";

export const

  /**
   * The `removeFirstsBy` function takes a predicate and two lists and returns the first list with the first
   * occurrence of each element of the second list removed.
   */
  removeFirstsBy = <TS extends string | any[]>(pred: BinaryPred<TS[number]>, xs1: TS, xs2: TS): ListOf<TS> =>
    foldl((agg: TS, x: TS[number]) => removeBy(pred, x, agg) as TS, sliceCopy(xs1), toItems(xs2)) as ListOf<TS>,

  $removeFirstsBy = <T>(pred: BinaryPred<T>) =>
    <TS extends string | T[]>(xs1: TS) =>
      (xs2: TS): ListOf<TS> => removeFirstsBy(pred, xs1, xs2);
