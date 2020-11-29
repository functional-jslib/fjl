import {curry} from "../function/curry";
import {scanl} from "./scanl";
import {head} from "./head";
import {tail} from "./tail";

export const
    /**
     * `scanl1` is a variant of `scanl` that has no starting value argument:
     * `shallowCompare(scanl1(fn, [x1, x2, ...]), [x1, fn(x1, x2), ...]) // true`
     * @function module:list.scanl1
     * @param fn {Function}
     * @param xs {Array}
     * @returns {Array|*}
     */
    scanl1 = curry((fn, xs) => {
        if (!xs || !xs.length) {
            return [];
        }
        return scanl(fn, head(xs), tail(xs));
    });
