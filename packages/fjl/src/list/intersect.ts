import {intersectBy} from "./intersectBy";
import {equal} from "../boolean";
import {ListOf} from "./utils/items";

export const

  /**
   * Performs an intersection on list one with elements from list two.  Duplicates in list one
   * stay: `intersect('coot', 'heron')` gives `'oo'`.
   */
  intersect = <TS extends string | any[]>(xs1: TS, xs2: TS): ListOf<TS> =>
    intersectBy(equal, xs1, xs2),

  $intersect = <TS extends string | any[]>(xs1: TS) =>
    (xs2: TS): ListOf<TS> => intersect(xs1, xs2)
