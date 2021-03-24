import {last} from "./last";
import {genericAscOrdering} from "./utils";
import {$sortBy} from "./sortBy";

export const
  /**
   * Returns the largest element in a non-empty structure of elements.
   */
  maximum = <T>(list: T[]): T => last($sortBy(genericAscOrdering, list));
