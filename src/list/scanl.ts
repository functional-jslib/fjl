import {curry} from "../function/curry";
import {length} from "../jsPlatform/object";

export const
    /**
     * scanl is similar to foldl, but returns a list of successive reduced values from the left:
     * ```
     * scanl f z [x1, x2, ...] == [z, z `f` x1, (z `f` x1) `f` x2, ...]
     * ```
     * Also note that:
     * ```
     * last (scanl f z xs) == foldl f z xs.
     * ```
     * @function module:list.scanl
     * @param fn {Function}
     * @param zero {*}
     * @param xs {Array}
     * @returns {Array|*}
     */
    scanl = curry((fn, zero, xs) => {
        if (!xs || !length(xs)) {
            return [];
        }
        const limit = length(xs);
        let ind = 0,
            result = zero,
            out: any[] = [];
        while (ind < limit) {
            result = fn(result, xs[ind], ind, xs);
            out.push(result);
            ind++;
        }
        return out;
    });
