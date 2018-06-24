import {length} from '../_jsPlatform/_object';

/**
 * @function module:_list.map
 * @param fn {Function} - Function to map on array.
 * @param xs {Array}
 * @returns {Array}
 */
export default function _map (fn, xs) {
    let ind = 0,
        limit = length(xs),
        out = [];
    if (!limit) { return out; }
    while (ind < limit) {
        out.push(fn(xs[ind], ind, xs));
        ind += 1;
    }
    return out;
}
