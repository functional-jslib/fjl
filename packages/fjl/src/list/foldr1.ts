import {reduceRight} from "./utils/reduceRight";
import {ReduceOp, Slice} from "../types";
import {unconsr} from "./unconsr";

export const

  /**
   * A variant of `foldr` except that this one doesn't require the starting point/value.  The starting value passed in
   * is the first item, from the right (end of given list).
   */
  foldr1 = <T>(op: ReduceOp<T, Slice<T>, T>, xs: Slice<T>): T => {
    const parts = unconsr(xs) as [Slice<T>, T];
    // If no parts return, else pass tail and head, of `unconsr` array to `reduceRight` func..
    return !parts ? undefined : reduceRight(op, parts[1], parts[0]);
  },

  $foldr1 = <T>(op: ReduceOp<T, Slice<T>, T>) =>
    (xs: Slice<T>): T => foldr1(op, xs)

;

  export type Foldr1 = typeof foldr1;
