import {reduceUntilRight} from "./reduceUntilRight";
import {alwaysFalse} from "../../boolean/alwaysFalse";
import {ReduceOp} from "../../types";

export const

  /**
   * Reduces a list with given operation (`op`) function (from right-to-left).
   */
  reduceRight = <T, RetT>(
    op: ReduceOp<T, T[], RetT>,
    agg: RetT, xs: T[]): RetT =>
    reduceUntilRight(alwaysFalse, op, agg, xs),

  $reduceRight = <T, RetT>(op: ReduceOp<T, T[], RetT>) =>
    (agg: RetT) =>
      (xs: T[]): RetT =>
        reduceUntilRight(alwaysFalse, op, agg, xs)

;
