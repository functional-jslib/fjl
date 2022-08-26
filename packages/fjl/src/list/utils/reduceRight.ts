import {reduceUntilRight} from "./reduceUntilRight";
import {alwaysFalse} from "../../boolean/alwaysFalse";
import {ReduceOp, NumberIndexable} from "../../types";

export const

  /**
   * Reduces a list with given operation (`op`) function (from right-to-left).
   */
  reduceRight = <T, RetT>(
    op: ReduceOp<T, NumberIndexable<T>, RetT>,
    agg: RetT, xs: NumberIndexable<T>): RetT =>
    reduceUntilRight(alwaysFalse, op, agg, xs),

  $reduceRight = <T, RetT>(op: ReduceOp<T, NumberIndexable<T>, RetT>) =>
    (agg: RetT) =>
      (xs: NumberIndexable<T>): RetT =>
        reduceUntilRight(alwaysFalse, op, agg, xs)

;
