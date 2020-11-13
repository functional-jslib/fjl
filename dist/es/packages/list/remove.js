import { curry } from "../function/curry";
import { removeBy } from "./index";
export const 
/**
 * `remove(x, xs)` removes the first occurrence of `x` from `xs`.
 * For example, `remove('a', 'banana') === 'bnana';`
 * @function module:list.remove
 * @param x {*}
 * @param list {Array|String|*}
 * @returns {Array}
 */
remove = curry((x, list) => removeBy((a, b) => a === b, x, list));
//# sourceMappingURL=remove.js.map