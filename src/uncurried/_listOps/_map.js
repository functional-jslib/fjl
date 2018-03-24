import {length} from '../_jsPlatform/_object';

/**
 * @function module:_listOps.map
 * @param fn {Function} - Function to map on array.
 * @param xs {Array}
 * @returns {Array}
 */
export const map = (fn, xs) => {
    let ind = 0,
        limit = length(xs),
        out = [];
    if (!limit) { return out; }
    for (; ind < limit; ind += 1) {
        out.push(fn(xs[ind], ind, xs));
    }
    return out;
};
