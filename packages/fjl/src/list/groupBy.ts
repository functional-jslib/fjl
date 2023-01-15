import {BinaryPred} from "../types";
import {pushN} from "./pushN";
import {append} from "./append";

export const

  /**
   * `groupBy` Groups given items by given predicate;  Similar to `group` but with 'equality check' predicate.
   *
   * ```javascript
   * groupBy((a, b) => a === b, "Mississippi".slice(0)) ===
   *  [["M"], ["i"], ["s", "s"], ["i"], ["s", "s"], ["i"], ["p", "p"], ["i"]]
   * ```
   */
  groupBy = <X = string | any, XS extends string | X[] = X[]>(
    equalityOp: BinaryPred, xs: XS
  ): XS[] => {
    if (!xs?.length) return [];

    // Groupings
    const groups: XS[] = [],
      appender = Array.isArray(xs) ? pushN : append;

    // Initialize variables for tracking
    let prevItem = xs[0],
      group = appender(xs.slice(0, 0), prevItem); // new group with `prevItem` as first item`

    const xsToIterate = xs.slice(1);

    // Group remainder of items
    for (const x of xsToIterate) { // @todo should use 'for i less than' loop here

      // If equality check passed group item, and continue to next
      if (equalityOp(x, prevItem)) {
        group = appender(group, x);
        prevItem = x;
        continue;
      }

      // Items for previous group 'grouped'.  Move to next group.
      groups.push(group);
      prevItem = x;
      group = appender(group.slice(0, 0), x);
    }

    // Push last group
    groups.push(group);

    return groups;
  },

  /**
   * Curried version of `$groupBy`.
   */
  $groupBy = <X = string | any, XS extends string | X[] = X[]>(
    equalityOp: BinaryPred
  ) =>
    (xs: XS): XS[] =>
      groupBy(equalityOp, xs)

;

export type GroupBy = typeof groupBy;
