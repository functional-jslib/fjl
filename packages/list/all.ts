import {curry, CurryOf2} from "../function";
import {length} from "../platform/object";
import {Indexable} from "../types";
import {PredForIndexable} from "./types";
import keys from "../platform/object/keys";

export type All<Pred, Functor> = CurryOf2<Pred, Functor, boolean>

export const $all = <T>(p: PredForIndexable<T>, xs: Indexable<T>): boolean => {
    const ks = keys(xs),
        limit = length(ks);
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
export const all = curry($all) as All<PredForIndexable<any>, Indexable<any>>;
