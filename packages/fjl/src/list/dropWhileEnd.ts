import {findLastIndex} from "./findLastIndex";
import {TernaryPred} from "../types";
import {negateF3} from "../function";

export const

  /**
   * Drops items off end of list while predicate holds.
   */
  dropWhileEnd = <T, TS extends string | T[]>(
    pred: TernaryPred<T, number, TS>,
    xs: TS
  ): typeof xs => {
    const splitPoint: number =
      findLastIndex(negateF3(pred) as TernaryPred, xs);
    if (splitPoint === -1) {
      return xs.constructor() as TS;
    }
    return xs.slice(0, splitPoint + 1) as TS;
  },

  /**
   * Curried version of `dropWhileEnd`.
   */
  $dropWhileEnd = <T, TS extends string | T[]>(
    p: TernaryPred<T, number, TS>
  ) =>
    (xs: TS): typeof xs =>
      dropWhileEnd(p, xs)

;
