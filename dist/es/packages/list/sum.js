import { foldl } from "./foldl";
export const 
/**
 * Computes the sum of the numbers of a structure.
 * @function module:list.sum
 * @haskellType `sum :: (ListLike t, Num a) => t a -> a`
 * @param list {Array|String}
 * @returns {Number}
 */
sum = list => foldl((agg, x) => agg + x, 0, list);
//# sourceMappingURL=sum.js.map