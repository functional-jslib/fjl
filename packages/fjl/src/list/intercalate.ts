import {curry} from "../function";
import {isString} from "../object/is";
import {intersperse} from "./intersperse";
import {concat} from "./concat";
import {Slice} from "../platform/slice";

export const
    /**
     * `intercalate(xs, xss))` is equivalent to (concat (intersperse (xs, xss)) -
     *   It inserts the list `xs` in between the lists in `xss` and concatenates
     *   the result.
     * @haskellType `intercalate :: [a] -> [[a]] -> [a]`
     * @function module:list.intercalate
     * @param xs {Slice<any>>}
     * @param xss {Slice<Slice<any>>}
     * @returns {Slice<any>}
     * @curried
     * @generic
     */
    intercalate = curry(<T>(xs: Slice<T>, xss: Slice<Slice<T>>): Slice<T> => {
        if (isString(xss)) {
            return intersperse(xs, xss) as Slice<T>;
        }
        return concat(intersperse(xs, xss) as Slice<T>[]);
    });
