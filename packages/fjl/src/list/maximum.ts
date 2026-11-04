import {last} from "./last";
import {genericAscOrdering} from "./utils";
import {sortBy} from "./sortBy";

export const
  /**
   * Returns the largest element in a non-empty structure of elements.
   *
   * @note Returns `undefined` for an empty list, where Haskell's raises an error.
   */
  maximum = <T>(list: T[]): T => last(sortBy(genericAscOrdering, list));
