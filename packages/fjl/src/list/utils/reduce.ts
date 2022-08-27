import {reduceUntil} from "./reduceUntil";
import {alwaysFalse} from "../../boolean/alwaysFalse";
import {ReduceOp} from "../../types";

export const

  /**
   * Reduces a "number indexable" by given reduction function (same as [].reduce but also for strings/arbitrary "number indexable" objects/etc.).
   */
  reduce = (op: ReduceOp, agg, xs) =>
    reduceUntil(alwaysFalse, op, agg, xs),

  /**
   * Curried `reduce` combinator.
   */
  $reduce = (op: ReduceOp) => agg => xs =>
    reduceUntil(alwaysFalse, op, agg, xs)

;
