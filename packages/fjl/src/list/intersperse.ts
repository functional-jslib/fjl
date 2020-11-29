import {curry, CurryOf2} from "../function/curry";
import {of} from "../object/of";
import {isString} from "../object/is";
import {SliceOf} from "../platform/slice";

export const

    $intersperse = <T>(between: T, xs: SliceOf<T>): SliceOf<T> => {
        if (!xs || !xs.length) {
            return xs;
        }
        const limit = xs.length,
            lastInd = limit - 1;
        let i = 0;
        if (isString(xs)) {
            let out = '';
            for (; i < limit; i += 1) {
                out += i === lastInd ?
                    xs[i] :
                    (xs[i] as unknown as string) +  // @todo type conversion cleanup
                    (between as unknown as string); // @todo ""
            }
            return out as unknown as SliceOf<T>;
        }
        const out = of(xs) as Array<T>;
        for (; i < limit; i += 1) {
            if (i === lastInd) {
                out.push(xs[i]);
            } else {
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
    intersperse = curry($intersperse) as CurryOf2<any, SliceOf<any>, SliceOf<any>>;
