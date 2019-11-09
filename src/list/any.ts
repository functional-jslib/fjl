import {curry, CurryOf2} from "../function/curry";
import {length} from "../jsPlatform/object";
import {PredicateOf3} from "../jsPlatform/array";
import {PredForIndexable} from "./types";
import {Indexable} from "../types";

export type Any<Pred, Functor> = CurryOf2<Pred, Functor, boolean>;

/**
 * Returns true if any item in container passes predicate `p`.
 * @function module:list.any
 * @param p {Function} - Predicate; E.g, `(x, i, xs) => boolean`.
 * @param xs {Array|String}
 * @returns {Boolean}
 */
export const any: Any<PredForIndexable<any>, Indexable<any>> = curry(
    <T>(p: PredForIndexable<T>, xs: Indexable<T>): boolean => {
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
    }) as Any<PredForIndexable<any>, Indexable<any>>;
