import {findIndexWhereRight} from "./utils";
import {Slice, TernaryPred} from "../types";
import {negateF3} from "../function";

export const

  /**
   * Drops items off end of list while predicate holds.
   */
  dropWhileEnd = <T, TS extends Slice<T>>(
    pred: TernaryPred<T, number, TS>,
    xs: TS
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
  $dropWhileEnd = <T, TS extends Slice<T>>(
    p: TernaryPred<T, number, TS>
  ) =>
    (xs: TS): typeof xs =>
      dropWhileEnd(p, xs)

;
