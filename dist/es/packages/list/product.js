import { foldl } from "./foldl";
export const 
/**
 * Computes the product of the numbers of a structure.
 * @function module:list.product
 * @haskellType `product :: (ListLike t, Num a) => t a -> a`
 * @param list {Array|String}
 * @returns {Number}
 */
product = list => foldl((agg, x) => agg * x, 1, list);
//# sourceMappingURL=product.js.map