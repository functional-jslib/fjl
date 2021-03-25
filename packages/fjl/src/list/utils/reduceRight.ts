import {$reduceUntilRight, reduceUntilRight} from "./reduceUntilRight";
import {alwaysFalse} from "../../boolean/alwaysFalse";
import {ReduceOp} from "../../platform";
import {Indexable} from "../../types";

export const

  /**
   * Reduces a list with given operation (`op`) function (from right-to-left).
   */
  reduceRight = <T, RetT>(
    op: ReduceOp<T, Indexable<T>, RetT>,
    agg: RetT, arr: Indexable<T>): RetT =>
    reduceUntilRight(alwaysFalse, op, agg, arr),

  $reduceRight = $reduceUntilRight(alwaysFalse)

;
