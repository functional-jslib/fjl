import {curry} from "../function/curry";
import {length} from "../jsPlatform/object";

export const
    /**
     * Returns true if any item in container passes predicate `p`.
     * @function module:list.any
     * @param p {Function} - Predicate.
     * @param xs {Array|String}
     * @returns {Boolean}
     */
        any = curry((p, xs) => {
        let ind = 0,
            limit = length(xs);
        if (!limit) {
            return false;
        }
        for (; ind < limit; ind += 1) {
            if (p(xs[ind])) {
                return true;
            }
        }
        return false;
    });
