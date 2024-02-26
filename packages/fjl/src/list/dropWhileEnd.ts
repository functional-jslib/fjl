import {findIndexWhereRight} from "./utils";
import {TernaryPred} from "../types";
import {negateF3} from "../function";

export const

  /**
   * Drops items off end of list while predicate holds.
   */
  dropWhileEnd = <T>(
    pred: TernaryPred,
    xs: string | T[]
  ): typeof xs => {
    const splitPoint: number =
      findIndexWhereRight(negateF3(pred), xs);
    if (splitPoint === -1) {
      return xs.constructor();
    }
    return xs.slice(0, splitPoint + 1);
  },

  /**
   * Curried version of `dropWhileEnd`.
   */
  $dropWhileEnd = <T>(p: TernaryPred) =>
    (xs: string | T[]): typeof xs =>
      dropWhileEnd(p, xs)

;
