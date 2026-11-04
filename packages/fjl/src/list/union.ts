import {unionBy} from "./unionBy";
import {equal} from "../boolean/equal";
import {ListOf} from "./utils/items";

/**
 * Returns `xs1` followed by the items of `xs2` that aren't already in it.  Duplicates in `xs2`
 * are dropped, while any in `xs1` stay: `union('coot', 'duck')` gives `'cootduk'`.
 */
export const union = <TS extends string | any[]>(xs1: TS, xs2: TS): ListOf<TS> =>
    unionBy(equal, xs1, xs2),

  /**
   * Curried version of `union`.
   */
  $union = <TS extends string | any[]>(xs1: TS) =>
    (xs2: TS): ListOf<TS> => union(xs1, xs2)
;
