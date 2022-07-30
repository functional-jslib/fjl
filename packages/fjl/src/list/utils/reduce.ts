import {reduceUntil} from "./reduceUntil";
import {alwaysFalse} from "../../boolean/alwaysFalse";
import {ReduceOp, Indexable} from "../../types";

export const

  /**
   * Reduces a slice by given reduction function (same as [].reduce but also for strings).
   */
  reduce = <T, RetT>(
    op: ReduceOp<T, Indexable<T>, RetT>,
    agg: RetT,
    xs: Indexable<T>
  ): RetT =>
    reduceUntil(alwaysFalse, op, agg, xs),

  /**
   * Curried `reduce` combinator.
   */
  $reduce = <T, RetT>(op: ReduceOp<T, Indexable<T>, RetT>) =>
    (agg: RetT) =>
      (xs: Indexable<T>): RetT => reduceUntil(alwaysFalse, op, agg, xs)

;
