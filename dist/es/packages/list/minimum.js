import { head } from "./head";
import { sortBy } from "./sortBy";
import { genericAscOrdering } from "./utils";
export const 
/**
 * Returns the smallest element in a non-empty structure of elements.
 * @function module:list.minimum
 * @haskellType `minimum :: forall a . Ord a => t a -> a`
 * @param list {Array|String}
 * @returns {*} - Whatever type the array is made of (if any).
 */
minimum = list => head(sortBy(genericAscOrdering, list));
//# sourceMappingURL=minimum.js.map