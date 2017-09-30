import {of} from   '../../objectOps/of';

import {aggregatorByType}   from './aggregation_';

import {length}              from '../jsPlatform/object_';

/**
 * @function module:listOps.map
 * @param fn {Function} - Function to map on functor item(s).
 * @param xs {Array|String|*} - Functor.
 * @returns {Array|String|*} - Functor type that is passed in.
 */
export const map = (fn, xs) => {
    let ind = 0,
        limit = length(xs),
        out = of(xs),
        aggregate = aggregatorByType(xs);
    if (!limit) { return out; }
    for (; ind < limit; ind += 1) {
        out = aggregate(out, fn(xs[ind], ind, xs), ind, xs);
    }
    return out;
};
