import {reduceUntilRight} from "./reduceUntilRight";
import {alwaysFalse} from "../../boolean/alwaysFalse";
import {ReduceOp, Slice} from "../../types";

export const

  /**
   * Reduces a list with given operation (`op`) function (from right-to-left).
   */
  reduceRight = <T, RetT>(
    op: ReduceOp<T, Slice<T>, RetT>,
    agg: RetT,
    xs: Slice<T>
  ): RetT =>
    reduceUntilRight(alwaysFalse, op, agg, xs),

  $reduceRight = <T, RetT>(op: ReduceOp<T, Slice<T>, RetT>) =>
    (agg: RetT) =>
      (xs: Slice<T>): RetT =>
        reduceUntilRight(alwaysFalse, op, agg, xs)

;
