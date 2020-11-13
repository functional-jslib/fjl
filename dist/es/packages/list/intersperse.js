import { curry } from "../function/curry";
import { of } from "../object/of";
import { isString } from "../object/is";
export const $intersperse = (between, xs) => {
    if (!xs || !xs.length) {
        return xs;
    }
    const limit = xs.length, lastInd = limit - 1;
    let i = 0;
    if (isString(xs)) {
        let out = '';
        for (; i < limit; i += 1) {
            out += i === lastInd ?
                xs[i] :
                xs[i] + // @todo type conversion cleanup
                    between; // @todo ""
        }
        return out;
    }
    const out = of(xs);
    for (; i < limit; i += 1) {
        if (i === lastInd) {
            out.push(xs[i]);
        }
        else {
            out.push(xs[i], between);
        }
    }
    return out;
}, 
/**
 * Takes an element and a list and `intersperses' that element between the
 *  elements of the list.
 * @function module:list.intersperse
 * @param between {any} - Should be of the same type of elements contained in list.
 * @param arr {SliceOf<any>} - Array|String.
 * @returns {SliceOf<any>>} - "".
 * @curried
 * @generic
 */
intersperse = curry($intersperse);
//# sourceMappingURL=intersperse.js.map