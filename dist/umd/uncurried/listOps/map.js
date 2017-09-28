(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', '../../objectOps/of', './listOpsUncurriedAggregation', '../jsPlatform/objectUncurried'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('../../objectOps/of'), require('./listOpsUncurriedAggregation'), require('../jsPlatform/objectUncurried'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.of, global.listOpsUncurriedAggregation, global.objectUncurried);
        global.map = mod.exports;
    }
})(this, function (exports, _of, _listOpsUncurriedAggregation, _objectUncurried) {
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
    var map = exports.map = function map(fn, xs) {
        var ind = 0,
            limit = (0, _objectUncurried.length)(xs),
            out = (0, _of.of)(xs),
            aggregate = (0, _listOpsUncurriedAggregation.aggregatorByType)(xs);
        if (!limit) {
            return out;
        }
        for (; ind < limit; ind += 1) {
            out = aggregate(out, fn(xs[ind], ind, xs), ind, xs);
        }
        return out;
    };
});