import {equal} from "../boolean";
import {NumberIndexable} from "../types";
import {isNullish} from "../object";

export const
  /**
   * Checks if all the items of list one occur, in order, in list two;  The items don't have to
   * occur consecutively.  Same as Haskell's `isSubsequenceOf`, so `isSubsequenceOf(xs1, xs2)` is
   * equivalent to checking that `xs1` is a member of `subsequences(xs2)`.  Unlike Haskell's,
   * returns `false` for nullish lists.
   *
   * ```javascript
   * isSubsequenceOf('ace', 'abcde') === true;
   * isSubsequenceOf('bad', 'abcdef') === false; // Out of order
   * isSubsequenceOf('', 'abc') === true;
   * ```
   *
   * @see https://hackage-content.haskell.org/package/base-4.22.0.0/docs/Data-List.html
   */
  isSubsequenceOf = <T>(xs1: NumberIndexable<T>, xs2: NumberIndexable<T>): boolean => {
    if (isNullish(xs1) || isNullish(xs2)) return false;
    const lenXs1 = xs1.length,
      lenXs2 = xs2.length;
    let foundLen = 0;
    for (let i = 0; i < lenXs2 && foundLen < lenXs1; i += 1) {
      if (equal(xs1[foundLen], xs2[i])) foundLen += 1;
    }
    return foundLen === lenXs1;
  },

  $isSubsequenceOf = <T>(xs1: NumberIndexable<T>) =>
    (xs2: NumberIndexable<T>): boolean => isSubsequenceOf(xs1, xs2)

;
