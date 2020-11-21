import { curry } from "../function";
import { concat } from "./concat";
import { map } from "./map";
export const 
/**
 * Map a function over all the elements of a container and concatenate the resulting lists.
 * @haskellType `concatMap :: Foldable t => (a -> [b]) -> t a -> [b]`
 * @function module:list.concatMap
 * @param fn {Function} - Mapping function;  E.g., `(x, i, xs) => y`.
 * @param foldable {Array|String|*}
 * @returns {Array|String|*}
 */
concatMap = curry((fn, foldable) => concat(map(fn, foldable)));
//# sourceMappingURL=concatMap.js.map