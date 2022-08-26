import {reduceUntil} from "./reduceUntil";
import {alwaysFalse} from "../../boolean/alwaysFalse";
import {ReduceOp, Slice} from "../../types";

export const

  /**
   * Reduces a slice by given reduction function (same as [].reduce but also for strings).
   */
  reduce = <T, RetT>(
    op: ReduceOp<T, Slice<T>, RetT>,
    agg: RetT,
    xs: Slice<T>
  ): RetT =>
    reduceUntil(alwaysFalse, op, agg, xs),

  /**
   * Curried `reduce` combinator.
   */
  $reduce = <T, RetT>(op: ReduceOp<T, Slice<T>, RetT>) =>
    (agg: RetT) =>
      (xs: Slice<T>): RetT => reduceUntil(alwaysFalse, op, agg, xs)

;
