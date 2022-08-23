import {BinaryPred, Slice} from "../types";

export const

  /**
   * `groupBy` Groups given items by given predicate;  Similar to `group` but with 'equality check' predicate.
   *
   * ```javascript
   * groupBy((a, b) => a === b, "Mississippi".slice(0)) ===
   *  [["M"], ["i"], ["s", "s"], ["i"], ["s", "s"], ["i"], ["p", "p"], "i"]
   * ```
   */
  groupBy = <T, TS extends Slice<T>>(equalityOp: BinaryPred<T>, xs: TS): T[][] => {
    // Bail if empty list
    if (!xs) return [];

    const limit = xs.length;

    // Bail if empty list
    if (!limit) return [[]];

    // Groupings
    const groups: T[][] = [];

    // Initialize variables for tracking
    let ind = 1,
      prevItem = xs[0] as T,
      group: T[] = [prevItem];

    // Group remainder of items
    for (; ind < limit; ind += 1) {
      const x = xs[ind] as T;

      // If equality check passed group item, and continue to next
      if (equalityOp(x, prevItem)) {
        group.push(x);
        prevItem = x;
        continue;
      }

      // Items for previous group 'grouped'.  Move to next group.
      groups.push(group);
      prevItem = x;
      group = [x];
    }

    // Push last group
    groups.push(group);

    return groups;
  },

  /**
   * Curried version of `$groupBy`.
   */
  $groupBy = <T, TS extends Slice<T>>(equalityOp: BinaryPred<T>) =>
    (xs: TS): T[][] => groupBy(equalityOp, xs)

;

export type GroupBy = typeof groupBy;
