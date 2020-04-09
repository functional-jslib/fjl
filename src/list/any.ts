import {curry, CurryOf2} from "../function/curry";
import {length} from "../jsPlatform/object";
import {PredForIndexable} from "./types";
import {Indexable} from "../types";
import keys from "../jsPlatform/object/keys";

export type Any<Pred, Functor> = CurryOf2<Pred, Functor, boolean>;

/**
 * Returns true if any item in container passes predicate `p`.
 * @function module:list.any
 * @param p {Function} - Predicate; E.g, `(x, i, xs) => boolean`.
 * @param xs {Array|String}
 * @returns {Boolean}
 */
export const any = curry(
    <T>(p: PredForIndexable<T>, xs: Indexable<T>): boolean => {
        let ind = 0;
        const ks= keys(xs),
            limit = length(ks);
        if (!limit) {
            return false;
        }
        for (; ind < limit; ind += 1) {
            if (p(xs[ks[ind]])) {
                return true;
            }
        }
        return false;
    }) as Any<PredForIndexable<any>, Indexable<any>>;
