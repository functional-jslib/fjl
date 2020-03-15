import {curry} from "../function/curry";
import {ArrayPred} from "../jsPlatform/array";

export const
    /**
     * Filters a structure of elements using given predicate (`pred`) (same as `[].filter`).
     * @function module:list.filter
     * @param pred {Function}
     * @param xs {Array} - list or list like.
     * @returns {Array} - Structure of filtered elements.
     */
    filter = curry(<T>(pred: ArrayPred<T>, xs: T[]): T[] => {
        let ind = 0;
        const limit = xs.length,
            out: any[] = [];
        if (!limit) {
            return out;
        }
        for (; ind < limit; ind++) {
            if (pred(xs[ind], ind, xs)) {
                out.push(xs[ind]);
            }
        }
        return out;
    });
