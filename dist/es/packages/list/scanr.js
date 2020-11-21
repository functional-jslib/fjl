import { curry } from "../function/curry";
import { length } from "../platform/object";
export const 
/**
 * Same as `scanl` but from the right (similiar to `foldr`'s relationship to 'foldl').
 * Note also `scanr`'s relationship ot `foldr`:
 * `head (scanr(fn, z, xs)) === foldr(fn, z, xs).
 * @function module:list.scanr
 * @param fn {Function}
 * @param zero {*}
 * @param xs {Array}
 * @returns {Array|*}
 */
scanr = curry((fn, zero, xs) => {
    if (!xs || !length(xs)) {
        return [];
    }
    const limit = length(xs);
    let ind = limit - 1, result = xs[0], out = [];
    while (ind > -1) {
        result = fn(result, xs[ind], ind, xs);
        out.push(result);
        ind--;
    }
    return out;
});
//# sourceMappingURL=scanr.js.map