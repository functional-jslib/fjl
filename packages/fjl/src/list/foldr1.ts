import {unconsr} from "./unconsr";
import {reduceRight} from "./utils/reduceRight";
import {ReduceOp} from "../types";

export const

  /**
   * A variant of `foldr` except that this one doesn't require the starting point/value.  The starting value passed in
   * is the first item, from the right (end of given array).
   */
  foldr1 = <T>(op: ReduceOp<T, T[], T>, xs: T[]): T => {
    const parts = unconsr(xs);
    // If no pars return, else pass tail and head, of `unconsr` array.
    return !parts ? undefined : reduceRight(op, parts[1], parts[0]);
  },

  $foldr1 = <T>(op: ReduceOp<T, T[], T>) =>
    (xs: T[]): T => foldr1(op, xs)

;
