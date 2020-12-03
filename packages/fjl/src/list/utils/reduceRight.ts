import {$reduceUntilRight, reduceUntilRight} from "./reduceUntilRight";
import {alwaysFalse} from "../../boolean/alwaysFalse";
import {Slice} from "../../platform/slice";
import {ReduceOp} from "../../platform/array";

export const

  $reduceRight = <T, T2>(op: ReduceOp<T, Slice<T>, T2>, agg: T2, arr: T[]): T2 =>
    $reduceUntilRight(alwaysFalse, op, agg, arr),

  /**
   * Reduces a list with given operation (`op`) function (from right-to-left).
   * @curried
   */
  reduceRight = reduceUntilRight(alwaysFalse)

;
