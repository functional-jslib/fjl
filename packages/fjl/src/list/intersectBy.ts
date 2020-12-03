import {curry} from "../function/curry";
import {foldl} from "./foldl";
import {any} from "./any";

export const

    /**
     * Returns an intersection by predicate.
     */
    intersectBy = curry((pred, list1, list2) =>
        foldl((agg, a) =>
                any(b => pred(a, b), list2) ? (agg.push(a), agg) : agg
            , [], list1));
