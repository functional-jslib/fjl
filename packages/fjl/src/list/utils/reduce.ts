import {reduceUntil} from "./reduceUntil";
import {alwaysFalse} from "../../boolean/alwaysFalse";
import {ReduceOp} from "../../types";

export const

  /**
   * Reduces a slice by given reduction function (same as [].reduce but also for strings).
   */
  reduce = <T, RetT>(
    op: ReduceOp<T, T[], RetT>,
    agg: RetT,
    xs: T[]
  ): RetT =>
    reduceUntil(alwaysFalse, op, agg, xs),

  /**
   * Curried `reduce` combinator.
   */
  $reduce = <T, RetT>(op: ReduceOp<T, T[], RetT>) =>
    (agg: RetT) =>
      (xs: T[]): RetT => reduceUntil(alwaysFalse, op, agg, xs)

;
