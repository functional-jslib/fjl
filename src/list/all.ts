import {curry} from "../function";
import {length} from "../jsPlatform/object";

export const
    /**
     * Returns true if all items in container pass predicate `p`.
     * @function module:list.all
     * @param p {Function} - Predicate.
     * @param xs {Array|String}
     * @returns {Boolean}
     */
    all = curry((p, xs) => {
        const limit = length(xs);
        let ind = 0;
        if (!limit) {
            return false;
        }
        for (; ind < limit; ind++) {
            if (!p(xs[ind], ind, xs)) {
                return false;
            }
        }
        return true;
    });
