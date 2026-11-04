import {reduceRight} from "./foldr";
import {NumberIndexable, Quaternary} from "../types";
import {unconsr} from "./unconsr";

export const

  /**
   * A variant of `foldr` except that this one doesn't require the starting point/value.  The starting value passed in
   * is the first item, from the right (end of given list).
   *
   * @note `op` is called as `op(acc, x, i, xs)`, like `foldr`, and an empty list gives `undefined`, where
   * Haskell's raises an error.
   */
  foldr1 = <T>(op: Quaternary<T, T, number, NumberIndexable<T>, T>, xs: T[]): T => {
    const parts = unconsr(xs) as [T[], T];
    // If no parts return, else pass tail and head, of `unconsr` array to `reduceRight` func..
    return !parts ? undefined : reduceRight(op, parts[1], parts[0]);
  },

  $foldr1 = <T>(op: Quaternary<T, T, number, NumberIndexable<T>, T>) =>
    (xs: T[]): T => foldr1(op, xs)

;

export type Foldr1 = typeof foldr1;
