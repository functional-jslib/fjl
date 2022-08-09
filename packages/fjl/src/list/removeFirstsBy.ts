import {foldl} from "./foldl";
import {removeBy} from "./removeBy";

export const

  /**
   * The `removeFirstsBy` function takes a predicate and two lists and returns the first list with the first
   * occurrence of each element of the second list removed.
   */
  removeFirstsBy = (pred, xs1, xs2) =>
    foldl((agg, x) => removeBy(pred, x, agg), xs1, xs2),

  $removeFirstsBy = (pred) =>
    (xs1) =>
      (xs2) => removeFirstsBy(pred, xs1, xs2);
