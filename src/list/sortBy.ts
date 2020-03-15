import {curry} from "../function/curry";
import {genericAscOrdering, sliceCopy} from "./utils";

export const
    /**
     * The sortBy function is the non-overloaded (in haskell terms) version of sort.
     * @haskellExample ```
     *  >>> sortBy (\(a,_) (b,_) -> compare a b) [(2, "world"), (4, "!"), (1, "Hello")]
     *  [(1,"Hello"),(2,"world"),(4,"!")]
     * ```
     * @function module:list.sortBy
     * @param orderingFn {Function}
     * @param xs {Array|String|*}
     * @returns {Array|String|*}
     */
    sortBy = curry(<T>(orderingFn, xs: T[]) => (sliceCopy(xs) as T[])
        .sort(orderingFn || genericAscOrdering));
