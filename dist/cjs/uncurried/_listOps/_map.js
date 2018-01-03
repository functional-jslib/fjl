'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.map = undefined;

var _of = require('../_objectOps/_of');

var _aggregation = require('./_aggregation');

var _object = require('../_jsPlatform/_object');

/**
 * @function module:_listOps.map
 * @param fn {Function} - Function to map on functor item(s).
 * @param xs {Array|String|*} - Functor.
 * @returns {Array|String|*} - Functor type that is passed in.
 */
var map = exports.map = function map(fn, xs) {
    var ind = 0,
        limit = (0, _object.length)(xs),
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