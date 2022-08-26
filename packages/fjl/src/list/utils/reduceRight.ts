import {reduceUntilRight} from "./reduceUntilRight";
import {alwaysFalse} from "../../boolean/alwaysFalse";
import {ReduceOp, NumberIndexable, ArrayType} from "../../types";

export const

  /**
   * Reduces a list with given operation (`op`) function (from right-to-left).
   */
  reduceRight = <T, RetT>(
    op: ReduceOp<T, ArrayType<T>, RetT>,
    agg: RetT, xs: ArrayType<T>): RetT =>
    reduceUntilRight(alwaysFalse, op, agg, xs),

  $reduceRight = <T, RetT>(op: ReduceOp<T, ArrayType<T>, RetT>) =>
    (agg: RetT) =>
      (xs: ArrayType<T>): RetT =>
        reduceUntilRight(alwaysFalse, op, agg, xs)

;
