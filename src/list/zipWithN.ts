import {curry3} from "../function/curry";
import {apply} from "../jsPlatform/apply";
import {sliceTo} from "./utils";
import {length} from "../jsPlatform/object";
import {reduce, toShortest} from "./utils";
import {push} from "./push";
import {map} from "./map";

export const
    /**
     * Zips all given lists with tupling function. Note: Haskell types do not have
     *  a way (that I know of) to show one or more for params in a function so `@haskellType` below
     *  is left there for general purpose not for exactness as is told by aforementioned.
     * @haskellType `zipWithN :: (a -> b -> c) -> [a] -> [b] -> [c]` - Where `N` is the number
     *  of lists to zip.
     * @function module:list.zipWithN
     * @param op {Function} - Takes expected number of parts for tuple and returns a tuple
     *  of said parts:
     *  E.g., ` op :: a -> b -> c -> (a, b, c)`
     * @param lists ...{Array}
     * @returns {Array<Array<*,*>>}
     */
    zipWithN = curry3((op, ...lists) => {
        const trimmedLists = apply(toShortest, lists),
            lenOfTrimmed = length(trimmedLists);
        if (!lenOfTrimmed) {
            return [];
        } else if (lenOfTrimmed === 1) {
            return sliceTo(length(trimmedLists[0]), trimmedLists[0]);
        }
        return reduce((agg, item, ind) =>
                push(agg, apply(op, map(xs => xs[ind], trimmedLists))),
            [], trimmedLists[0]);
    });

