import {curry} from "../function/curry";
import {length} from "../jsPlatform/object";
import {reduce, toShortest} from "./utils";
import {push} from "./push";

export const
    /**
     * zipWith :: (a -> b -> c) -> [a] -> [b] -> [c]
     * zipWith generalises zip by zipping with the function given as the
     * first argument, instead of a function tupling function (function that returns a tuple). For example,
     * zipWith (+) is applied to two lists to produce the list of corresponding sums.
     * @note `_|_` means bottom or perpetual (@see
     *  - https://wiki.haskell.org/Bottom
     *  - https://stackoverflow.com/questions/19794681/what-does-this-syntax-mean-in-haskell-or
     *  )
     * @example
     * ```
     * zipWith f [] _|_ = []
     * ```
     * @haskellType `zipWith :: (a -> b -> c) -> [a] -> [b] -> [c]`
     * @function module:list.zipWith
     * @param op {Function} - Takes two parts of a tuple and returns a tuple.
     *  E.g., ` op :: a -> b -> (a, b)`
     * @param xs1 {Array}
     * @param xs2 {Array}
     * @returns {Array<Array<*,*>>}
     */
    zipWith = curry((op, xs1, xs2) => {
        if (!length(xs1) || !length(xs2)) {
            return [];
        }
        const [a1, a2] = toShortest(xs1, xs2);
        return reduce((agg, item, ind) =>
                push(agg, op(item, a2[ind])),
            [], a1);
    });
