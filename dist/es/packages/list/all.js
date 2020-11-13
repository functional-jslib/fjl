import { curry } from "../function";
import { length } from "../platform/object";
import keys from "../platform/object/keys";
export const $all = (p, xs) => {
    const ks = keys(xs), limit = length(ks);
    let ind = 0;
    if (!limit) {
        return false;
    }
    for (; ind < limit; ind++) {
        if (!p(xs[ks[ind]], ind, xs)) {
            return false;
        }
    }
    return true;
};
/**
 * Returns true if all items in container return `true` for predicate `p`.
 * @function module:list.all
 * @param p {Function} - Predicate; `(x, i, xs) => boolean`.
 * @param xs {Array|Object|String}
 * @returns {Boolean}
 */
export const all = curry($all);
//# sourceMappingURL=all.js.map