import {NumberIndexable, ReduceOp} from "../../types";

export const

  /**
   * Reduces a "number indexable", from right-to-left, by given reduction function (same as [].reduceRight but also for strings and arbitrary "number indexable" objects/etc.).
   */
  reduceRight = (op: ReduceOp, agg: any, xs: NumberIndexable): ReturnType<typeof op> => {
    const limit = xs.length;
    if (!limit) return agg;
    let result = agg;
    for (let ind = limit - 1; ind >= 0; ind--) {
      result = op(result, xs[ind], ind, xs);
    }
    return result;
  },

  $reduceRight = (op: ReduceOp) =>
    (agg: any) =>
      (xs: NumberIndexable): ReturnType<typeof op> =>
        reduceRight(op, agg, xs)

;
