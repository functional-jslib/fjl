import {curry} from "../function/curry";
import {length} from "../jsPlatform/object";
import {Predicate} from "../jsPlatform/array";
import {SliceOf} from "../jsPlatform/slice";

export const
    /**
     * Returns true if any item in container passes predicate `p`.
     * @function module:list.any
     * @param p {Function} - Predicate.
     * @param xs {Array|String}
     * @returns {Boolean}
     */
        any = curry(
        <T>(p: Predicate<T, SliceOf<T>>, xs: SliceOf<T>): boolean => {
            let ind = 0;
            const limit = length(xs);
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
