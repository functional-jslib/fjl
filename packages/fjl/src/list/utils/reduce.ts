import {$reduceUntil, reduceUntil} from "./reduceUntil";
import {alwaysFalse} from "../../boolean/alwaysFalse";
import {ReduceOp} from "../../platform/array";
import {Slice} from "../../platform/slice";

export const

  /**
   * Reduces a slice by given reduction function (same as [].reduce but also for strings).
   */
  $reduce = <T, T2>(op: ReduceOp<T, Slice<T>, T2>, agg: T2, xs: Slice<T>): T2 =>
    $reduceUntil(alwaysFalse, op, agg, xs),

  /**
   * Curried `reduce` combinator.
   */
  reduce = reduceUntil(alwaysFalse)

;
