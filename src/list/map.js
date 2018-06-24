import {length} from '../jsPlatform/object';
import {curry} from '../function/curry';

/**
 * @function module:list.map
 * @param fn {Function} - Function to map on array.
 * @param xs {Array}
 * @returns {Array}
 */
const map = curry((fn, xs) =>  {
    let ind = 0,
        limit = length(xs),
        out = [];
    if (!limit) { return out; }
    while (ind < limit) {
        out.push(fn(xs[ind], ind, xs));
        ind += 1;
    }
    return out;
});

export default map;
