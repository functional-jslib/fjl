import {$reduceUntilRight, reduceUntilRight} from "./reduceUntilRight";
import {alwaysFalse} from "../../boolean/alwaysFalse";
import {ReduceOp, Indexable} from "../../types";

export const

  /**
   * Reduces a list with given operation (`op`) function (from right-to-left).
   */
  reduceRight = <T, RetT>(
    op: ReduceOp<T, Indexable<T>, RetT>,
    agg: RetT, xs: Indexable<T>): RetT =>
    reduceUntilRight(alwaysFalse, op, agg, xs),

  $reduceRight = $reduceUntilRight(alwaysFalse)

;
