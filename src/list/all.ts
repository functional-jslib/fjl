import {curry, CurryOf2} from "../function";
import {length} from "../jsPlatform/object";
import {Predicate} from "../jsPlatform/array";
import {SliceOf} from "../jsPlatform/slice";

export const
    /**
     * Returns true if all items in container pass predicate `p`.
     * @function module:list.all
     * @param p {Function} - Predicate; `(x, i, xs) => boolean`.
     * @param xs {Array|String}
     * @returns {Boolean}
     */
    all = curry(<T>(p: Predicate<T, SliceOf<T>>, xs: SliceOf<T>): boolean => {
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
        }) as CurryOf2<Predicate<any, SliceOf<any>>, SliceOf<any>, boolean>;
