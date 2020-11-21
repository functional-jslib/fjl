import { curry } from "../function/curry";
export const 
/**
 * Filters a structure of elements using given predicate (`pred`) (same as `[].filter`).
 * @function module:list.filter
 * @param pred {Function}
 * @param xs {SliceOf<any>}
 * @returns {Array}
 * @todo Update this to return `SliceOf<any>`
 */
filter = curry((pred, xs) => {
    let ind = 0;
    const limit = xs.length, out = [];
    if (!limit) {
        return out;
    }
    for (; ind < limit; ind++) {
        if (pred(xs[ind], ind, xs)) {
            out.push(xs[ind]);
        }
    }
    return out;
});
//# sourceMappingURL=filter.js.map