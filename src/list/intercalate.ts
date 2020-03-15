import {curry} from "../function";
import {isString} from "../object/is";
import {intersperse} from "./intersperse";
import {concat} from "./concat";
import {SliceOf} from "../jsPlatform/slice";

export const
    /**
     * `intercalate(xs, xss))` is equivalent to (concat (intersperse (xs, xss)) -
     *   It inserts the list `xs` in between the lists in `xss` and concatenates
     *   the result.
     * @haskellType `intercalate :: [a] -> [[a]] -> [a]`
     * @function module:list.intercalate
     * @param xs {SliceOf<any>>}
     * @param xss {SliceOf<SliceOf<any>>}
     * @returns {SliceOf<any>}
     * @curried
     * @generic
     */
    intercalate = curry(<T>(xs: SliceOf<T>, xss: SliceOf<SliceOf<T>>): SliceOf<T> => {
        if (isString(xss)) {
            return intersperse(xs, xss) as SliceOf<T>;
        }
        return concat(intersperse(xs, xss) as SliceOf<T>[]);
    });
