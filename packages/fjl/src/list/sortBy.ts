import {genericAscOrdering, OrderingFunc} from "./utils";
import {sliceCopy} from "./utils/sliceCopy";

export const

  /**
   * The sortBy function is the non-overloaded (in haskell terms) version of sort.
   */
  sortBy = <T>(orderingFn: OrderingFunc<T>, xs: T[]): T[] => (sliceCopy(xs) as T[])
    .sort(orderingFn || genericAscOrdering),

  $sortBy = <T>(orderingFn: OrderingFunc<T>) =>
    (xs: T[]): T[] => sortBy(orderingFn, xs);
