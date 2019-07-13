import {curry} from "../function";
import {of} from "../object/of";
import {isString} from "../object/is";

/**
 * Takes an element and a list and `intersperses' that element between the
 *  elements of the list.
 * @function module:list.intersperse
 * @note In our version of the function javascript is loosely typed so,
 *  so is our function (to much overhead to make it typed) so `between` can be any value.
 * @param between {*} - Should be of the same type of elements contained in list.
 * @param arr {Array|String} - ListLike.
 * @returns {Array|String}
 */
export const intersperse = curry((between, xs) => {
    if (!xs || !xs.length) {
        return xs;
    }
    const limit = xs.length,
        lastInd = limit - 1;
    let out = of(xs),
        i = 0;
    if (isString(xs)) {
        for (; i < limit; i += 1) {
            out += i === lastInd ?
                xs[i] : xs[i] + between;
        }
        return out;
    }
    for (; i < limit; i += 1) {
        if (i === lastInd) {
            out.push(xs[i]);
        }
        else {
            out.push(xs[i], between);
        }
    }
    return out;
});
