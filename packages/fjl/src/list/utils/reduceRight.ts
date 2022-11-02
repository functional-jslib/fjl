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
  ): RetT => {
    const limit = xs.length;
    if (!limit) return agg;
    let result = agg;
    for (let ind = limit - 1; ind >= 0; ind--) {
      result = op(result, xs[ind], ind, xs);
    }
    return result;
  },

  $reduceRight = <T, RetT>(op: ReduceOp<T, Slice<T>, RetT>) =>
    (agg: RetT) =>
      (xs: Slice<T>): RetT =>
        reduceRight(op, agg, xs)

;
