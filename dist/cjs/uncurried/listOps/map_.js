'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.map = undefined;

var _of_ = require('../objectOps/of_');

var _aggregation_ = require('./aggregation_');

var _object_ = require('../jsPlatform/object_');

/**
 * @function module:listOps.map
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