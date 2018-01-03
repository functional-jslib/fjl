(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', '../_objectOps/of_', './aggregation_', '../_jsPlatform/object_'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('../_objectOps/of_'), require('./aggregation_'), require('../_jsPlatform/object_'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.of_, global.aggregation_, global.object_);
        global.map_ = mod.exports;
    }
})(this, function (exports, _of_, _aggregation_, _object_) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.map = undefined;


    /**
     * @function module:_listOps.map
     * @param fn {Function} - Function to map on functor item(s).
     * @param xs {Array|String|*} - Functor.
     * @returns {Array|String|*} - Functor type that is passed in.
     */
    var map = exports.map = function map(fn, xs) {
        var ind = 0,
            limit = (0, _object_.length)(xs),
            out = (0, _of_.of)(xs),
            aggregate = (0, _aggregation_.aggregatorByType)(xs);
        if (!limit) {
            return out;
        }
        for (; ind < limit; ind += 1) {
            out = aggregate(out, fn(xs[ind], ind, xs), ind, xs);
        }
        return out;
    };
});