(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', '../../objectOps/of', './aggregation', '../jsPlatform/object_'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('../../objectOps/of'), require('./aggregation'), require('../jsPlatform/object_'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.of, global.aggregation, global.object_);
        global.map = mod.exports;
    }
})(this, function (exports, _of, _aggregation, _object_) {
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
            limit = (0, _object_.length)(xs),
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