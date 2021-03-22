import {last} from "./last";
import {genericAscOrdering} from "./utils";
import {$sortBy} from "./sortBy";

export const
  /**
   * Returns the largest element in a non-empty structure of elements.
   * @function module:list.maximum
   * @haskellType `maximum :: forall a . Ord a => t a -> a`
   * @param list {Array|String}
   * @returns {*} - Whatever type the array is made of (if any).
   */
  maximum = <T>(list: T[]): T => last($sortBy(genericAscOrdering, list));
