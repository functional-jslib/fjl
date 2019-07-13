import {curry} from "../function";
import {isString} from "../object/is";
import {intersperse} from "./intersperse";
import {concat} from "./concat";

export const
    /**
     * `intercalate xs xss` is equivalent to (concat (intersperse xs xss)). It inserts the list xs in between the lists in xss and concatenates the result.
     * @haskellType `intercalate :: [a] -> [[a]] -> [a]`
     * @function module:list.intercalate
     * @param xs {Array|String}
     * @param xss {Array|String}
     * @returns {Array|String}
     */
    intercalate = curry((xs, xss) => {
        if (isString(xss)) {
            return intersperse(xs, xss);
        }
        return concat(intersperse(xs, xss));
    });
