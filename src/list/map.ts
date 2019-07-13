import {length} from '../jsPlatform/object';
import {curry} from '../function/curry';
import {typeOf} from '../object/typeOf';
import {of} from '../object/of';
import {isFunctor} from '../object/is';
import {isset} from '../object/isset';

/**
 * Maps a function onto a ListLike (string or array) or a functor (value containing a map method).
 * @function module:list.map
 * @param fn {Function} - Function to map on given value.
 * @param xs {Array|String|*}
 * @returns {Array|String|*}
 */
export const map = curry((fn, xs) =>  {
    if (!isset(xs)) { return xs; }
    let out = of(xs),
        limit,
        i = 0;
    switch (typeOf(xs)) {
        case 'Array':
            limit = length(xs);
            if (!limit) { return out; }
            for (; i < limit; i += 1) {
                out.push(fn(xs[i], i, xs));
            }
            return out;
        case 'String':
            limit = length(xs);
            if (!xs) { return out; }
            for (; i < limit; i += 1) {
                out += fn(xs[i], i, xs);
            }
            return out;
        default:
            if (isFunctor(xs)) { return xs.map(fn); }

            // Other objects
            return Object.keys(xs).reduce((agg, key) => {
                out[key] = fn(xs[key], key, xs);
                return out;
            }, out);
    }
});

export default map;
