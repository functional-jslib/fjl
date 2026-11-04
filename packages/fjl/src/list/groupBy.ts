import {BinaryPred} from "../types";
import {pushN} from "./pushN";
import {append} from "./append";

export const

  /**
   * `groupBy` Groups given items by given predicate;  Similar to `group` but with 'equality check' predicate.
   * Each item is checked against the first item of its group - `equalityOp(first, item)` - not against the
   * item before it, as with Haskell's `groupBy`.
   *
   * ```javascript
   * groupBy((a, b) => a === b, "Mississippi".slice(0)) ===
   *  [["M"], ["i"], ["s", "s"], ["i"], ["s", "s"], ["i"], ["p", "p"], ["i"]]
   * ```
   */
  groupBy = <X = any, XS extends string | X[] = X[]>(
    equalityOp: BinaryPred<X, X>, xs: XS
  ): XS[] => {
    if (!xs?.length) return [];

    // Groupings
    const groups: XS[] = [],
      // `pushN` and `append` have incompatible signatures (array-only vs.
      // "sliceable"), so widen to their common shape - a container plus items.
      appender = (Array.isArray(xs) ? pushN : append) as
        (xs: any, ...items: any[]) => any;

    // Initialize variables for tracking
    let firstItem = xs[0] as X,
      group = appender(xs.slice(0, 0), firstItem); // new group with `firstItem` as first item

    const xsToIterate = xs.slice(1) as unknown as Iterable<X>;

    // Group remainder of items
    for (const x of xsToIterate) { // @todo should use 'for i less than' loop here

      // If equality check passed group item, and continue to next
      if (equalityOp(firstItem, x)) {
        group = appender(group, x);
        continue;
      }

      // Items for previous group 'grouped'.  Move to next group.
      groups.push(group);
      firstItem = x;
      group = appender(group.slice(0, 0), x);
    }

    // Push last group
    groups.push(group);

    return groups;
  },

  /**
   * Curried version of `$groupBy`.
   */
  $groupBy = <X = any, XS extends string | X[] = X[]>(
    equalityOp: BinaryPred<X, X>
  ) =>
    (xs: XS): XS[] =>
      groupBy(equalityOp, xs)

;

export type GroupBy = typeof groupBy;
