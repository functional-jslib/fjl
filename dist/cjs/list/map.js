'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _object = require('../jsPlatform/object');

var _curry = require('../function/curry');

/**
 * @function module:list.map
 * @param fn {Function} - Function to map on array.
 * @param xs {Array}
 * @returns {Array}
 */
var map = (0, _curry.curry)(function (fn, xs) {
    var ind = 0,
        limit = (0, _object.length)(xs),
        out = [];
    if (!limit) {
        return out;
    }
    while (ind < limit) {
        out.push(fn(xs[ind], ind, xs));
        ind += 1;
    }
    return out;
});

exports.default = map;
module.exports = exports['default'];