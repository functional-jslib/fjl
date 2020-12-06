import {$reduceUntil, reduceUntil} from "./reduceUntil";
import {alwaysFalse} from "../../boolean/alwaysFalse";
import {ReduceOp} from "../../platform/array";
import {SliceOf} from "../../platform/slice";

export const

  /**
   * Reduces a slice by given reduction function (same as [].reduce but also for strings).
   */
  $reduce = <T, T2>(op: ReduceOp<T, SliceOf<T>, T2>, agg: T2, xs: SliceOf<T>): T2 =>
    $reduceUntil(alwaysFalse, op, agg, xs),

  /**
   * Curried `reduce` combinator.
   */
  reduce = reduceUntil(alwaysFalse)

;
