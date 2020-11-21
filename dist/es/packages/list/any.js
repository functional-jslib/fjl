import { curry } from "../function/curry";
import { length } from "../platform/object";
import keys from "../platform/object/keys";
/**
 * Returns true if any item in container passes predicate `p`.
 * @function module:list.any
 * @param p {Function} - Predicate; E.g, `(x, i, xs) => boolean`.
 * @param xs {Array|String}
 * @returns {Boolean}
 */
export const any = curry((p, xs) => {
    let ind = 0;
    const ks = keys(xs), limit = length(ks);
    if (!limit) {
        return false;
    }
    for (; ind < limit; ind += 1) {
        if (p(xs[ks[ind]])) {
            return true;
        }
    }
    return false;
});
//# sourceMappingURL=any.js.map