define(['exports', '../../objectOps/of', './aggregation', '../jsPlatform/objectUncurried'], function (exports, _of, _aggregation, _objectUncurried) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.map = undefined;


    /**
     * @function module:listOps.map
     * @param fn {Function} - Function to map on functor item(s).
     * @param xs {Array|String|*} - Functor.
     * @returns {Array|String|*} - Functor type that is passed in.
     */
    const map = exports.map = (fn, xs) => {
        let ind = 0,
            limit = (0, _objectUncurried.length)(xs),
            out = (0, _of.of)(xs),
            aggregate = (0, _aggregation.aggregatorByType)(xs);
        if (!limit) {
            return out;
        }
        for (; ind < limit; ind += 1) {
            out = aggregate(out, fn(xs[ind], ind, xs), ind, xs);
        }
        return out;
    };
});