import {length} from "./length";
import {sliceCopy} from "./utils/sliceCopy";
import {Slice} from "../types";
import {BinaryPred} from "../types";

export const

  /**
   * Groups given items by given predicate.
   */
  groupBy = <T, TS extends Slice<T>=T[]>(equalityOp: BinaryPred<T>, xs: TS): TS[] => {
    // Bail if empty list
    if (!xs) {
      return [];
    }

    const limit = length(xs);

    // Bail if empty list
    if (!limit) {
      return [sliceCopy(xs)];
    }

    // Groupings
    const groups: TS[] = [];

    // Initialize variables for tracking
    let ind = 1,
      prevItem = xs[0] as T,
      group: T[] = [prevItem];

    for (; ind < limit; ind += 1) {
      const x = xs[ind] as T;
      if (equalityOp(x, prevItem)) {
        group.push(x);
        prevItem = x;
        continue;
      }
      groups.push(group as unknown as TS);
      prevItem = x;
      group = [x];
    }

    // Push last group
    groups.push(group as unknown as TS);

    // If original incoming slice is a string, return a slice of strings.
    if(xs.constructor === String) {
      return groups.map(_xs => (_xs as T[]).join('')) as unknown as TS[];
    }

    return groups;
  },

  /**
   * Curried version of `$groupBy`.
   */
  $groupBy = <T, TS extends Slice<T>>(equalityOp: BinaryPred<T>) =>
    (xs: TS): TS[] => groupBy(equalityOp, xs)

;
