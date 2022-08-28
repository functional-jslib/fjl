import {BinaryPred, Slice} from "../types";
import {of} from "../object";

export const

  /**
   * `groupBy` Groups given items by given predicate;  Similar to `group` but with 'equality check' predicate.
   *
   * ```javascript
   * groupBy((a, b) => a === b, "Mississippi".slice(0)) ===
   *  [["M"], ["i"], ["s", "s"], ["i"], ["s", "s"], ["i"], ["p", "p"], "i"]
   * ```
   */
  groupBy = <T>(equalityOp: BinaryPred<T>, xs: Slice<T>): Slice<T>[] => {
    if (!xs) return [];

    const limit = xs.length,
      groupIsArray = Array.isArray(xs);

    // Initialize variables for tracking
    let prevItem = xs[0],
      group = of(xs, prevItem);

    if (!limit) return [group];

    // Groupings
    const groups: Slice<T>[] = [];

    // Group remainder of items
    for (let ind = 1; ind < limit; ind += 1) {
      const x = xs[ind];

      // If equality check passed group item, and continue to next
      if (equalityOp(x, prevItem)) {
        if (groupIsArray) (group as T[]).push(x);
        else group = group.concat(x);
        prevItem = x;
        continue;
      }

      // Items for previous group 'grouped'.  Move to next group.
      groups.push(group);
      prevItem = x;
      group = of(group, x);
    }

    // Push last group
    groups.push(group);

    return groups;
  },

  /**
   * Curried version of `$groupBy`.
   */
  $groupBy = <T>(equalityOp: BinaryPred<T>) =>
    (xs: Slice<T>): Slice<T>[] => groupBy(equalityOp, xs)

;

export type GroupBy = typeof groupBy;
