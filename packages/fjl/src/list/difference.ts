import {removeFirstsBy} from "./removeFirstsBy";
import {equal} from "../boolean/equal";
import {ListOf} from "./utils/items";

export const

  /**
   * List difference, like Haskell's `(\\)`: the first occurrence of each item of `xs2`, in turn,
   * is removed from `xs1`, so `difference(append(xs, ys), xs)` equals `ys`.  Other occurrences
   * stay: `difference([1, 1, 2], [1])` gives `[1, 2]`.
   */
  difference = <TS extends string | any[]>(xs1: TS, xs2: TS): ListOf<TS> =>
    removeFirstsBy(equal, xs1, xs2),

  /**
   * Curried version of `difference`.
   */
  $difference = <TS extends string | any[]>(xs1: TS) =>
    (xs2: TS): ListOf<TS> => difference(xs1, xs2);
