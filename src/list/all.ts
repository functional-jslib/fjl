import {curry, CurryOf2} from "../function";
import {length} from "../jsPlatform/object";
import {Indexable} from "../types";
import {PredForIndexableOf} from "./types";

export type All<Pred, Functor> = CurryOf2<Pred, Functor, boolean>

/**
 * Returns true if all items in container pass predicate `p`.
 * @function module:list.all
 * @param p {Function} - Predicate; `(x, i, xs) => boolean`.
 * @param xs {Array|String}
 * @returns {Boolean}
 */
export const all: All<PredForIndexableOf<any>, Indexable<any>> =
    curry(<T>(p: PredForIndexableOf<T>, xs: Indexable<T>): boolean => {
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
    }) as All<PredForIndexableOf<any>, Indexable<any>>;
